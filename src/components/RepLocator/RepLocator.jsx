import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as turf from '@turf/turf';
import { REPS, DEFAULT_REP, STATE_ALIASES, STATES, DIRECTIONS } from './repData';
import './RepLocator.css';

// Rep Locator portado a React. Toda la lógica del widget original vive dentro
// de un useEffect (mapa imperativo de Leaflet) con su limpieza al desmontar.
function RepLocator() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    // Helper para consultar dentro de este widget (permite múltiples instancias).
    const $ = (id) => root.querySelector('#' + id);

    const state = {
      map: null,
      areaLayer: null,
      autocompleteTimer: null,
      suggestions: [],
      activeIdx: -1,
      suppressNextInput: false,
      lastRequestId: 0,
      stateGeoJsonCache: {},
    };

    /* ── Map ── */
    function initMap() {
      state.map = L.map($('ig-map'), {
        center: [39, -96],
        zoom: 4,
        minZoom: 2,
        maxBounds: [[-85, -180], [85, 180]],
        maxBoundsViscosity: 1.0,
        zoomControl: true,
      });
      // Basemap gris claro sin API key (Esri Light Gray Canvas).
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles © Esri — Esri, HERE, Garmin, © OpenStreetMap contributors',
          minZoom: 2,
          maxZoom: 16,
          noWrap: true,
        }
      ).addTo(state.map);

      setTimeout(() => state.map && state.map.invalidateSize(true), 100);
      setTimeout(() => state.map && state.map.invalidateSize(true), 500);
      setTimeout(() => state.map && state.map.invalidateSize(true), 1000);
    }

    function onResize() {
      if (state.map) state.map.invalidateSize(true);
    }
    function onOrient() {
      setTimeout(() => state.map && state.map.invalidateSize(true), 200);
    }

    function clearArea() {
      if (state.areaLayer) {
        state.map.removeLayer(state.areaLayer);
        state.areaLayer = null;
      }
    }

    /* ── Helpers ── */
    const normalize = (str) =>
      String(str || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .trim();

    function escapeHtml(str) {
      const d = document.createElement('div');
      d.appendChild(document.createTextNode(String(str || '')));
      return d.innerHTML;
    }

    function highlightMatch(text, query) {
      const t = String(text || '');
      const q = String(query || '').trim();
      if (!q) return escapeHtml(t);
      const idx = t.toLowerCase().indexOf(q.toLowerCase());
      if (idx === -1) return escapeHtml(t);
      return (
        escapeHtml(t.substring(0, idx)) +
        '<mark class="ig-match">' +
        escapeHtml(t.substring(idx, idx + q.length)) +
        '</mark>' +
        escapeHtml(t.substring(idx + q.length))
      );
    }

    function parseDirectionalQuery(query) {
      const q = normalize(query);
      const words = q.split(/\s+/);
      if (words.length < 2) return null;
      const dir = DIRECTIONS[words[0]];
      if (!dir) return null;
      const baseArea = words.slice(1).join(' ').trim();
      if (!baseArea) return null;
      return { direction: dir.key, directionLabel: dir.label, baseArea };
    }

    function isDirectionOnly(normalizedQuery) {
      const directionWords = Object.keys(DIRECTIONS);
      if (directionWords.indexOf(normalizedQuery) !== -1) return true;
      if (normalizedQuery.indexOf(' ') !== -1) return false;
      for (let i = 0; i < directionWords.length; i++) {
        if (directionWords[i].indexOf(normalizedQuery) === 0) return true;
      }
      return false;
    }

    function parseServiceArea(str) {
      const s = String(str || '').trim();
      const idx = s.indexOf(':');
      if (idx === -1) return { area: s, subdivision: null };
      return {
        area: s.substring(0, idx).trim(),
        subdivision: s.substring(idx + 1).trim().toLowerCase(),
      };
    }

    function searchLocalStates(query) {
      const q = normalize(query);
      if (!q) return [];
      if (STATE_ALIASES[q]) return [{ name: STATE_ALIASES[q], type: 'state', priority: 100 }];
      const results = [];
      STATES.forEach((name) => {
        const nName = normalize(name);
        let score = 0;
        if (nName === q) score = 1000;
        else if (nName.indexOf(q) === 0) score = 500;
        else if (nName.indexOf(q) !== -1) score = 200;
        if (score > 0) results.push({ name, type: 'state', priority: score });
      });
      results.sort((a, b) => b.priority - a.priority);
      return results;
    }

    /* ── Autocomplete ── */
    function updateAutocomplete(query) {
      if (!query || query.length < 2) return hideAutocomplete();
      const q = normalize(query);
      if (isDirectionOnly(q)) return hideAutocomplete();

      const parsed = parseDirectionalQuery(query);
      const searchTerm = parsed ? parsed.baseArea : query;
      const localMatches = searchLocalStates(searchTerm);

      if (localMatches.length > 0) {
        const top = localMatches[0];
        const displayName = parsed ? parsed.directionLabel + ' ' + top.name : top.name;
        const suggestion = {
          name: displayName,
          secondary: 'United States',
          display: displayName + ', United States',
          _stateName: top.name,
          _subdivision: parsed ? parsed.direction : null,
        };
        state.suggestions = [suggestion];
        state.activeIdx = -1;
        renderAutocomplete([suggestion], query);
        return;
      }

      state.lastRequestId++;
      const thisId = state.lastRequestId;
      fetchPhoton(searchTerm, thisId, (results) => {
        if (!results || !results.length) return hideAutocomplete();
        const top = results[0];
        const displayName = parsed ? parsed.directionLabel + ' ' + top.name : top.name;
        const suggestion = {
          name: displayName,
          secondary: top.secondary,
          display: displayName + (top.secondary ? ', ' + top.secondary : ''),
          _stateName: top.state,
          _photonLat: top.lat,
          _photonLon: top.lon,
          _subdivision: parsed ? parsed.direction : null,
        };
        state.suggestions = [suggestion];
        state.activeIdx = -1;
        renderAutocomplete([suggestion], query);
      });
    }

    function fetchPhoton(query, requestId, callback) {
      const url =
        'https://photon.komoot.io/api/?q=' +
        encodeURIComponent(query) +
        '&limit=8&lang=en&layer=city&layer=state&layer=country&layer=district&layer=locality&layer=county';
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          if (requestId !== state.lastRequestId) return;
          if (!data || !data.features) return callback([]);
          const results = data.features
            .map((f) => {
              const p = f.properties || {};
              const coords = f.geometry && f.geometry.coordinates;
              if (!coords) return null;
              const secondaryParts = [];
              if (p.state && p.state !== p.name) secondaryParts.push(p.state);
              else if (p.county && p.county !== p.name) secondaryParts.push(p.county);
              if (p.country && p.country !== p.name) secondaryParts.push(p.country);
              return {
                name: p.name || '',
                secondary: secondaryParts.join(', '),
                lat: coords[1],
                lon: coords[0],
                state: p.state || '',
                country: p.country || '',
              };
            })
            .filter(Boolean);
          callback(results);
        })
        .catch(() => {
          if (requestId !== state.lastRequestId) return;
          callback([]);
        });
    }

    function renderAutocomplete(results, query) {
      const box = $('ig-autocomplete');
      box.innerHTML = results
        .map(
          (r, i) =>
            '<button type="button" class="ig-suggestion" role="option" data-idx="' +
            i +
            '"><strong class="ig-sugg-primary">' +
            highlightMatch(r.name, query) +
            '</strong>' +
            (r.secondary
              ? '<span class="ig-sugg-secondary">' + escapeHtml(r.secondary) + '</span>'
              : '') +
            '</button>'
        )
        .join('');
      box.classList.remove('ig-hidden');
      box.querySelectorAll('.ig-suggestion').forEach((btn) => {
        btn.addEventListener('click', () => selectSuggestion(parseInt(btn.dataset.idx, 10)));
        btn.addEventListener('mouseenter', () => setActive(parseInt(btn.dataset.idx, 10)));
      });
    }

    function hideAutocomplete() {
      const box = $('ig-autocomplete');
      if (box) {
        box.classList.add('ig-hidden');
        box.innerHTML = '';
      }
      state.suggestions = [];
      state.activeIdx = -1;
    }

    function setActive(idx) {
      root.querySelectorAll('.ig-suggestion').forEach((el, i) => {
        el.classList.toggle('ig-active', i === idx);
      });
      state.activeIdx = idx;
    }

    function selectSuggestion(idx) {
      const s = state.suggestions[idx];
      if (!s) return;
      const input = $('ig-search');
      state.suppressNextInput = true;
      input.value = s.display;
      hideAutocomplete();

      const rep = findRepForSelection(s);
      if (!rep.rep) {
        showRepCard(DEFAULT_REP);
        hideNoResult();
        clearArea();
        return;
      }
      showRepCard(rep.rep);
      hideNoResult();
      highlightRepArea(rep.rep, rep.matchedArea, s);
    }

    /* ── Rep matching ── */
    function findRepForSelection(suggestion) {
      const explicitSubdivision = suggestion._subdivision;
      const stateName = suggestion._stateName;
      if (!stateName) return { rep: null };
      const nState = normalize(stateName);

      const candidates = [];
      REPS.forEach((rep) => {
        rep.areas.forEach((areaStr) => {
          const parsed = parseServiceArea(areaStr);
          if (normalize(parsed.area) === nState) {
            candidates.push({
              rep,
              matchedArea: areaStr,
              baseArea: parsed.area,
              subdivision: parsed.subdivision,
            });
          }
        });
      });
      if (!candidates.length) return { rep: null };

      if (explicitSubdivision) {
        for (let i = 0; i < candidates.length; i++) {
          if (candidates[i].subdivision === explicitSubdivision) {
            return { rep: candidates[i].rep, matchedArea: candidates[i].matchedArea };
          }
        }
        const c0 = candidates[0];
        return { rep: c0.rep, matchedArea: c0.baseArea + ':' + explicitSubdivision };
      }

      if (candidates.length > 1 && suggestion._photonLat != null) {
        const match = pickBySubdivision(
          candidates,
          suggestion._photonLat,
          suggestion._photonLon,
          stateName
        );
        if (match) return match;
      }

      for (let k = 0; k < candidates.length; k++) {
        if (!candidates[k].subdivision) {
          return { rep: candidates[k].rep, matchedArea: candidates[k].matchedArea };
        }
      }
      return { rep: candidates[0].rep, matchedArea: candidates[0].matchedArea };
    }

    function pickBySubdivision(candidates, lat, lon, stateName) {
      const geo = state.stateGeoJsonCache[normalize(stateName)];
      if (!geo || !geo.bbox) return null;
      const midLat = (geo.bbox[1] + geo.bbox[3]) / 2;
      const midLng = (geo.bbox[0] + geo.bbox[2]) / 2;
      for (let i = 0; i < candidates.length; i++) {
        const sub = candidates[i].subdivision;
        if (!sub) continue;
        const parts = sub.split('-');
        let ok = true;
        parts.forEach((p) => {
          if (p === 'north' && lat < midLat) ok = false;
          if (p === 'south' && lat >= midLat) ok = false;
          if (p === 'east' && lon < midLng) ok = false;
          if (p === 'west' && lon >= midLng) ok = false;
        });
        if (ok) return { rep: candidates[i].rep, matchedArea: candidates[i].matchedArea };
      }
      return null;
    }

    /* ── Map highlight ── */
    function highlightRepArea(rep, matchedArea) {
      clearArea();
      if (!matchedArea) return;
      const color = rep.color || '#7c6ce8';
      const areasToRender = rep.areas.slice();
      if (areasToRender.indexOf(matchedArea) === -1) areasToRender.push(matchedArea);

      const group = L.featureGroup().addTo(state.map);
      state.areaLayer = group;

      let pending = areasToRender.length;
      areasToRender.forEach((areaStr) => {
        const parsed = parseServiceArea(areaStr);
        fetchStatePolygon(parsed.area, (geoJson) => {
          pending--;
          if (!geoJson) {
            if (pending === 0) fitGroup(group);
            return;
          }
          let toRender = geoJson;
          if (parsed.subdivision) {
            const clipped = clipToSubdivision(geoJson, parsed.subdivision);
            if (clipped) toRender = clipped;
          }
          L.geoJSON(toRender, {
            style: {
              color,
              weight: 1.5,
              opacity: 0.85,
              fillColor: color,
              fillOpacity: 0.4,
              interactive: false,
            },
          }).addTo(group);
          if (pending === 0) fitGroup(group);
        });
      });
    }

    function fitGroup(group) {
      try {
        const b = group.getBounds();
        if (b.isValid()) state.map.fitBounds(b, { padding: [40, 40], animate: true });
      } catch {
        /* noop */
      }
    }

    function fetchStatePolygon(stateName, callback) {
      const key = normalize(stateName);
      if (state.stateGeoJsonCache[key]) return callback(state.stateGeoJsonCache[key].geometry);

      try {
        const cached = localStorage.getItem('ig_state_' + key);
        if (cached) {
          const parsed = JSON.parse(cached);
          state.stateGeoJsonCache[key] = parsed;
          return callback(parsed.geometry);
        }
      } catch {
        /* noop */
      }

      const url =
        'https://nominatim.openstreetmap.org/search?format=json&polygon_geojson=1&limit=5&q=' +
        encodeURIComponent(stateName + ', United States');
      fetch(url, { headers: { 'Accept-Language': 'en' } })
        .then((r) => r.json())
        .then((results) => {
          if (!Array.isArray(results) || !results.length) return callback(null);
          let best = null;
          for (let i = 0; i < results.length; i++) {
            const r = results[i];
            if (
              r.geojson &&
              (r.geojson.type === 'Polygon' || r.geojson.type === 'MultiPolygon') &&
              (r.class === 'boundary' || r.type === 'administrative')
            ) {
              best = r;
              break;
            }
          }
          if (!best) {
            for (let j = 0; j < results.length; j++) {
              if (
                results[j].geojson &&
                (results[j].geojson.type === 'Polygon' ||
                  results[j].geojson.type === 'MultiPolygon')
              ) {
                best = results[j];
                break;
              }
            }
          }
          if (!best) return callback(null);
          const bbox = geoJsonBBox(best.geojson);
          const entry = { geometry: best.geojson, bbox };
          state.stateGeoJsonCache[key] = entry;
          try {
            localStorage.setItem('ig_state_' + key, JSON.stringify(entry));
          } catch {
            /* noop */
          }
          callback(best.geojson);
        })
        .catch(() => callback(null));
    }

    function geoJsonBBox(gj) {
      let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;
      function walk(coords) {
        if (typeof coords[0] === 'number') {
          if (coords[0] < minLng) minLng = coords[0];
          if (coords[0] > maxLng) maxLng = coords[0];
          if (coords[1] < minLat) minLat = coords[1];
          if (coords[1] > maxLat) maxLat = coords[1];
          return;
        }
        coords.forEach(walk);
      }
      walk(gj.coordinates);
      return [minLng, minLat, maxLng, maxLat];
    }

    function clipToSubdivision(geoJson, subdivision) {
      try {
        const feature = { type: 'Feature', geometry: geoJson, properties: {} };
        const bbox = turf.bbox(feature);
        const midLng = (bbox[0] + bbox[2]) / 2;
        const midLat = (bbox[1] + bbox[3]) / 2;
        let minLng = bbox[0], maxLng = bbox[2], minLat = bbox[1], maxLat = bbox[3];
        subdivision.split('-').forEach((p) => {
          if (p === 'north') minLat = midLat;
          else if (p === 'south') maxLat = midLat;
          else if (p === 'east') minLng = midLng;
          else if (p === 'west') maxLng = midLng;
        });
        const clipBox = turf.bboxPolygon([minLng, minLat, maxLng, maxLat]);
        const intersection = turf.intersect(feature, clipBox);
        if (intersection && intersection.geometry) return intersection.geometry;
      } catch {
        /* noop */
      }
      return null;
    }

    /* ── Rep card ── */
    function showRepCard(rep) {
      $('ig-rep-name').textContent = rep.name || '';
      const lines = [];
      if (rep.contact) lines.push(rep.contact);
      if (rep.email) lines.push(rep.email);
      if (rep.phone) lines.push(rep.phone);

      const l1 = $('ig-rep-line1'), l2 = $('ig-rep-line2'), l3 = $('ig-rep-line3');
      l1.textContent = lines[0] || ''; l1.style.display = lines[0] ? '' : 'none';
      l2.textContent = lines[1] || ''; l2.style.display = lines[1] ? '' : 'none';
      l3.textContent = lines[2] || ''; l3.style.display = lines[2] ? '' : 'none';

      const comp = $('ig-rep-company');
      comp.textContent = rep.company || '';
      comp.style.display = rep.company ? '' : 'none';

      const contact = $('ig-contact-btn');
      if (rep.phone) {
        contact.href = 'tel:' + rep.phone.replace(/[^0-9+]/g, '');
        contact.classList.remove('ig-hidden');
      } else if (rep.email) {
        contact.href = 'mailto:' + rep.email;
        contact.classList.remove('ig-hidden');
      } else {
        contact.classList.add('ig-hidden');
      }
      $('ig-rep-card').classList.remove('ig-hidden');
    }
    const hideRepCard = () => $('ig-rep-card').classList.add('ig-hidden');
    const hideNoResult = () => $('ig-no-result').classList.add('ig-hidden');

    function clearAll() {
      const input = $('ig-search');
      if (input) input.value = '';
      hideAutocomplete();
      hideRepCard();
      hideNoResult();
      clearArea();
      state.map.setView([39, -96], 4, { animate: true });
    }

    /* ── Events ── */
    const input = $('ig-search');
    const clearBtn = $('ig-clear');

    function onInput() {
      if (state.suppressNextInput) {
        state.suppressNextInput = false;
        return;
      }
      clearTimeout(state.autocompleteTimer);
      const val = this.value.trim();
      if (!val) {
        hideAutocomplete();
        hideRepCard();
        hideNoResult();
        clearArea();
        return;
      }
      const self = this;
      state.autocompleteTimer = setTimeout(() => updateAutocomplete(self.value), 150);
    }

    function onKeydown(e) {
      const items = root.querySelectorAll('.ig-suggestion');
      if (e.key === 'ArrowDown' && items.length) {
        e.preventDefault();
        setActive(Math.min(state.activeIdx + 1, items.length - 1));
      } else if (e.key === 'ArrowUp' && items.length) {
        e.preventDefault();
        setActive(Math.max(state.activeIdx - 1, 0));
      } else if (e.key === 'Enter' && state.activeIdx >= 0) {
        e.preventDefault();
        selectSuggestion(state.activeIdx);
      } else if (e.key === 'Enter' && state.suggestions.length === 1) {
        e.preventDefault();
        selectSuggestion(0);
      } else if (e.key === 'Escape') {
        hideAutocomplete();
      }
    }

    function onDocClick(e) {
      const box = $('ig-autocomplete');
      if (!box || !input) return;
      if (box.contains(e.target) || input.contains(e.target)) return;
      hideAutocomplete();
    }

    if (input) {
      input.addEventListener('input', onInput);
      input.addEventListener('keydown', onKeydown);
    }
    if (clearBtn) clearBtn.addEventListener('click', clearAll);
    document.addEventListener('click', onDocClick);
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onOrient);

    initMap();

    /* ── Cleanup ── */
    return () => {
      clearTimeout(state.autocompleteTimer);
      if (input) {
        input.removeEventListener('input', onInput);
        input.removeEventListener('keydown', onKeydown);
      }
      if (clearBtn) clearBtn.removeEventListener('click', clearAll);
      document.removeEventListener('click', onDocClick);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onOrient);
      if (state.map) {
        state.map.remove();
        state.map = null;
      }
    };
  }, []);

  return (
    <div id="ig-rep-locator" ref={rootRef}>
      <aside className="ig-sidebar">
        <div className="ig-sidebar-inner">
          <h1 className="ig-title">Find your friendly rep today</h1>
          <p className="ig-intro">
            Your rep can help you tailor and select all of your project needs.
            Enter your location to find your designated rep&apos;s area of service.
          </p>

          <div className="ig-search-block">
            <div className="ig-input-wrap">
              <input
                type="text"
                id="ig-search"
                className="ig-input"
                placeholder="Enter Your Location"
                autoComplete="off"
                spellCheck="false"
              />
              <button type="button" id="ig-clear" className="ig-clear-btn">
                Clear
              </button>
            </div>
            <div id="ig-autocomplete" className="ig-autocomplete ig-hidden" role="listbox" />
          </div>

          <div id="ig-no-result" className="ig-no-result ig-hidden">
            <p>No designated rep found for this area.</p>
          </div>
        </div>
      </aside>

      <main className="ig-map-wrap">
        <div id="ig-map" className="ig-map" />

        <div id="ig-rep-card" className="ig-rep-card ig-hidden">
          <h2 id="ig-rep-name" />
          <p id="ig-rep-company" className="ig-rep-company" />
          <p id="ig-rep-line1" className="ig-rep-line" />
          <p id="ig-rep-line2" className="ig-rep-line" />
          <p id="ig-rep-line3" className="ig-rep-line" />
          <a id="ig-contact-btn" className="ig-contact-btn" href="#">
            Contact
          </a>
        </div>
      </main>
    </div>
  );
}

export default RepLocator;
