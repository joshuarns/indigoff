import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DW_CATS, DW_FIN, ifoSetPending } from "../../lib/nav.js";
import { usePageChrome } from "../../hooks/usePageChrome.js";
import { useMergeState } from "../../hooks/useMergeState.js";
import "./FindRep.css";

import REPS from "../../data/reps.json";
import TERRITORIES from "../../data/territories.json";
import SiteHeader from "../../components/layout/SiteHeader.jsx";
import SideMenu from "../../components/layout/SideMenu.jsx";
import CompactFooter from "../../components/layout/CompactFooter.jsx";
import Intro from "./sections/Intro.jsx";
import UsMap from "./sections/UsMap.jsx";
import CanadaMap from "./sections/CanadaMap.jsx";
import MexicoMap from "./sections/MexicoMap.jsx";
import MapLegend from "./sections/MapLegend.jsx";
import ResultPanel from "./sections/ResultPanel.jsx";
import AllReps from "./sections/AllReps.jsx";
import css from "./FindRep.module.css";
const DEFAULT_REP = {
  name: "Indigoff",
  contactKey: "findRep.directTeam",
  email: "info@indigoff.com",
  phone: "848-8844-1258",
  areas: [],
};
// Claves de territorio del mapa (estado, mitad de estado o estado de México), nombres y abreviaturas.
const KEYS = TERRITORIES.keys;
const AB = TERRITORIES.states;
const KLABEL = TERRITORIES.labels;
const NAMES = {};
Object.keys(AB).forEach(function (n) {
  NAMES[AB[n]] = n;
});
function keyName(k) {
  if (KLABEL[k]) return KLABEL[k];
  const p = k.split("_");
  const n = NAMES[p[0]];
  return p[1] ? (p[1] === "n" ? "North " : "South ") + n : n;
}
const KEYREP = {};
REPS.forEach(function (r, i) {
  r.areas.forEach(function (a) {
    KEYREP[a] = i;
  });
});
function territory(r, t) {
  if (
    r.areas.length &&
    r.areas.every(function (a) {
      return /^MX[A-Z]{3}$/.test(a);
    })
  )
    return t("findRep.mexicoStates", { count: r.areas.length });
  return r.areas.length ? r.areas.map(keyName).join(" · ") : t("findRep.allOtherTerritories");
}
function contactOf(r, t) {
  return r.contactKey ? t(r.contactKey) : r.contact;
}
function card(r, t, navigate, listItems, selectedPlace) {
  const repInfo = {
    name: r.name,
    email: r.email,
    phone: r.phone,
    selectedPlace: selectedPlace || "",
  };
  return {
    name: r.name,
    contact: contactOf(r, t),
    hasContact: !!contactOf(r, t),
    email: r.email,
    mail: "mailto:" + r.email,
    phone: r.phone,
    hasPhone: !!r.phone,
    tel: "tel:" + (/^\s*\+/.test(r.phone) ? "+" : "+1") + r.phone.replace(/[^0-9]/g, ""),
    territory: territory(r, t),
    sendToRep: function () {
      navigate("/contact", { state: { intent: "rep", repInfo, listItems } });
    },
  };
}
function keysForState(abbr) {
  if (abbr === "MEX")
    return KEYS.filter(function (k) {
      return /^MX[A-Z]{3}$/.test(k);
    });
  return KEYS.filter(function (k) {
    return k.split("_")[0] === abbr;
  });
}

const NAV = { DW_CATS, DW_FIN, ifoSetPending };

export default function FindRep() {
  const [st, setSt] = useMergeState({ sel: null, rep: null, q: "", noMatch: false });
  // Pestaña del mapa: se deriva de la selección, pero el usuario también puede elegirla.
  const mapTab = useRef({ tab: "us", last: undefined });
  const { chrome } = usePageChrome({ nav: NAV });
  const navigate = useNavigate();
  const location = useLocation();
  const listItems = location.state?.listItems || [];
  const v = { ...repVals(st, setSt, chrome.t, navigate, listItems), ...mapVals(st, setSt, mapTab.current, chrome.t), ...chrome };
  return template(v);
}

function repVals(st, setSt, t, navigate, listItems) {
  const sel = st.sel || [];
  const repSel = st.rep;
  let reps = [];
  if (repSel !== null) reps = [repSel];
  else
    sel.forEach(function (k) {
      let i = KEYREP[k];
      if (i === undefined) i = -1;
      if (reps.indexOf(i) < 0) reps.push(i);
    });
  const hi = {};
  reps.forEach(function (i) {
    if (i >= 0)
      REPS[i].areas.forEach(function (a) {
        hi[a] = 1;
      });
  });
  const fill = {};
  const pick = {};
  KEYS.forEach(function (k) {
    const isSel = sel.indexOf(k) >= 0 && repSel === null;
    fill[k] = hi[k]
      ? isSel
        ? "#1E125C"
        : "#645DC5"
      : isSel
        ? "#A9A296"
        : KEYREP[k] !== undefined
          ? "#B7B3E6"
          : "#E4DFD5";
    pick[k] = function () {
      setSt({ sel: [k], rep: null, noMatch: false, q: keyName(k) });
    };
  });
  let place = t("findRep.result.selectState");
  let label = t("findRep.result.yourRep");
  if (repSel !== null) {
    place = repSel >= 0 ? REPS[repSel].name : "Indigoff";
    label = t("findRep.result.rep");
  } else if (sel.length) {
    place =
      sel.length > 1
        ? /^MX[A-Z]{3}$/.test(sel[0])
          ? t("findRep.countries.mx")
          : NAMES[sel[0].split("_")[0]]
        : sel[0] === "CAN"
          ? t("findRep.countries.ca")
          : keyName(sel[0]);
  }
  var selectedPlace = "";
  if (sel.length) {
    if (sel.length > 1) {
      selectedPlace = /^MX[A-Z]{3}$/.test(sel[0])
        ? t("findRep.countries.mx")
        : NAMES[sel[0].split("_")[0]];
    } else if (sel[0] === "CAN") {
      selectedPlace = t("findRep.countries.ca");
    } else {
      selectedPlace = keyName(sel[0]);
    }
  }
  const results = reps.map(function (i) {
    return card(i >= 0 ? REPS[i] : DEFAULT_REP, t, navigate, listItems, selectedPlace);
  });
  const all = REPS.map(function (r, i) {
    return { i: i, r: r };
  })
    .concat([{ i: -1, r: DEFAULT_REP }])
    .map(function (o) {
      const on = repSel === o.i;
      return {
        name: o.r.name,
        contact: contactOf(o.r, t) || "\u00a0",
        territory: territory(o.r, t),
        on: on ? "true" : "false",
        style:
          "flex: 1 1 300px; min-height: 200px; display: flex; flex-direction: column; align-items: flex-start; gap: 4px; padding: 28px; text-align: left; cursor: pointer; font-family: inherit; color: #111111; border: 1px solid " +
          (on ? "#111111" : "#E4DFD7") +
          "; background: " +
          (on ? "#FFFFFF" : "transparent"),
        pick: function () {
          // The result panel sits above this list: bring it into view so the pick is visible.
          setSt({ rep: o.i, sel: null, q: "" });
          requestAnimationFrame(function () {
            const el = document.getElementById("rep-result");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        },
      };
    });
  return {
    fill: fill,
    pick: pick,
    results: results,
    showHint: results.length === 0,
    resultPlace: place,
    resultLabel: label,
    all: all,
    q: st.q,
    noMatch: st.noMatch,
    onQuery: function (e) {
      const v = String(e.target.value || "").trim();
      const n = v.toLowerCase();
      let abbr = null;
      if (!n) {
        setSt({ q: "", sel: null, rep: null, noMatch: false });
        return;
      }
      if (n.length === 2 && NAMES[n.toUpperCase()]) abbr = n.toUpperCase();
      else
        Object.keys(AB).forEach(function (name) {
          if (!abbr && name.toLowerCase() === n) abbr = AB[name];
        });
      if (!abbr && n.length >= 3)
        Object.keys(AB).forEach(function (name) {
          if (!abbr && name.toLowerCase().indexOf(n) === 0) abbr = AB[name];
        });
      if (abbr) setSt({ q: v, sel: keysForState(abbr), rep: null, noMatch: false });
      else setSt({ q: v, noMatch: true });
    },
  };
}

function mapVals(st, setSt, mt, t) {
  const v = {};
  const sel = st.sel || [];
  let tab = mt.tab;
  if (sel.indexOf("CAN") >= 0 && mt.last !== "CAN") {
    tab = "ca";
  } else if (
    sel.some(function (k) {
      return /^MX[A-Z]{3}$/.test(k);
    }) &&
    mt.last !== "MX"
  ) {
    tab = "mx";
  } else if (sel.length && sel[0] !== "CAN" && !/^MX[A-Z]{3}$/.test(sel[0]) && mt.last !== sel[0]) {
    tab = "us";
  }
  mt.last = /^MX[A-Z]{3}$/.test(sel[0] || "") ? "MX" : sel[0] || "";
  mt.tab = tab;
  const defs = [
    ["us", t("findRep.countries.us"), null],
    ["ca", t("findRep.countries.ca"), "CAN"],
    ["mx", t("findRep.countries.mx"), "MX"],
  ];
  v.mapTabs = defs.map(function (d) {
    const on = d[0] === tab;
    return {
      label: d[1],
      on: on ? "true" : "false",
      cls: "mt-t" + (on ? " on" : ""),
      pick: function () {
        if (d[2]) {
          mt.last = d[2];
          mt.tab = d[0];
          setSt({
            sel: d[2] === "MX" ? keysForState("MEX") : [d[2]],
            rep: null,
            noMatch: false,
            q: d[1],
          });
        } else {
          mt.last = "";
          mt.tab = "us";
          setSt({ sel: [], rep: null, noMatch: false, q: "" });
        }
      },
    };
  });
  v.mapUS = tab === "us";
  v.mapCA = tab === "ca";
  v.mapMX = tab === "mx";
  return v;
}

function template(v) {
  return (
    <>
      <div className={css.box}>
        <a className="skip" href="#content">
          {v.t("common.skipToContent")}
        </a>
        <SiteHeader
          v={v}
          labels={{ downloads: v.t("common.downloads"), findRep: v.t("common.findRep") }}
          current="find-a-rep"
        />
        <Intro v={v} />
        <section className={css.section}>
          <div className={css.box2}>
            <div className="mt-tabs" role="tablist" aria-label={v.t("findRep.countryLabel")}>
              {(v.mapTabs || []).map((t, t__i) => (
                <React.Fragment key={t__i}>
                  <button type="button" role="tab" aria-selected={t.on} className={t.cls} onClick={t.pick}>
                    {t.label}
                  </button>
                </React.Fragment>
              ))}
            </div>
            <UsMap v={v} />
            <CanadaMap v={v} />
            <MexicoMap v={v} />
            <MapLegend v={v} />
          </div>
          <ResultPanel v={v} />
        </section>
        <AllReps v={v} />
        <CompactFooter
          homeLabel={v.t("common.backToHome")}
          legal={{ privacy: v.t("common.privacy"), terms: v.t("common.terms") }}
          background="#FFFFFF"
        />
        <SideMenu v={v} labels={{ downloads: v.t("common.downloads"), findRep: v.t("common.findRep") }} />
      </div>
    </>
  );
}
