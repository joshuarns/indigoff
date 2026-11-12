import fs from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const read = (f) => JSON.parse(fs.readFileSync(new URL(f, import.meta.url), "utf8"));

/** Chunk de `entry`, sus imports estáticos y su CSS (sin el entry principal, que ya carga index.html). */
function chunkFiles(bundle, entry) {
  const chunks = Object.values(bundle).filter((c) => c.type === "chunk");
  const start = chunks.find((c) => c.facadeModuleId?.endsWith(entry));
  const files = new Set();
  const visit = (c) => {
    if (!c || c.isEntry || files.has(c.fileName)) return;
    files.add(c.fileName);
    c.viteMetadata?.importedCss.forEach((f) => files.add(f));
    c.imports.forEach((f) => visit(bundle[f]));
  };
  visit(start);
  return [...files];
}

/**
 * Precarga lo que la home necesita para pintar el hero, solo en "/":
 * - la foto principal (el elemento más grande de la pantalla, LCP), que sin esto el navegador no descubre
 *   hasta que React renderiza la página. Usa el mismo srcset/sizes que <Hero> (ver src/lib/images.js);
 * - en build, el código de la home (se carga con lazy() en App.jsx), para no esperar a que index.js lo pida.
 */
function preloadHome() {
  return {
    name: "preload-home",
    transformIndexHtml(html, ctx) {
      const { src } = read("./src/data/hero.json");
      const hash = /([0-9a-f]{32})/.exec(src)[1];
      const widths = read("./src/data/image-manifest.json")[hash] || [];
      const srcset = widths.map((w) => `/img/opt/${hash}-${w}.webp ${w}w`).join(", ");
      const modules = ctx.bundle ? chunkFiles(ctx.bundle, "/src/pages/Main/Main.jsx").map((f) => "/" + f) : [];
      // La foto se pide antes que fuentes y JS (es lo que más tarda en llegar y lo primero que se ve), pero después
      // del <meta viewport>: antes de él el navegador supone 980px de ancho y elegiría la versión más grande.
      const image =
        `if (location.pathname === "/") {` +
        `var l = document.createElement("link");` +
        `l.rel = "preload"; l.as = "image"; l.setAttribute("fetchpriority", "high");` +
        (srcset
          ? `l.setAttribute("imagesrcset", ${JSON.stringify(srcset)}); l.setAttribute("imagesizes", "100vw");`
          : "") +
        `l.href = ${JSON.stringify(src)}; document.head.appendChild(l); }`;
      const code =
        `if (location.pathname === "/") {` +
        `${JSON.stringify(modules)}.forEach(function (h) {` +
        `var m = document.createElement("link"); m.href = h;` +
        `if (h.slice(-4) === ".css") { m.rel = "preload"; m.as = "style"; m.crossOrigin = "anonymous"; } else m.rel = "modulepreload";` +
        `document.head.appendChild(m); }); }`;
      // Esqueleto del hero: la foto se pinta con el HTML, sin esperar a que React arranque.
      // Va fuera de #root y detrás de la página (z-index -1): cuando React renderiza, el fondo de la página lo tapa.
      // No se quita del DOM a propósito: Chrome descarta el LCP de un elemento que se elimina y contaría la foto
      // de React, que se pinta hasta que carga el JS.
      // Mismo tamaño y posición que el hero real: header de --hd-h y hero de --hero-h (tokens de src/global.css).
      const img =
        `<img src="${src}"` +
        (srcset ? ` srcset="${srcset}" sizes="100vw"` : "") +
        // scale(1.04): el zoom con el que arranca la primera foto del carrusel (keyframes hsx en Main.css).
        ` fetchpriority="high" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;` +
        `transform:scale(1.04);transform-origin:50% 60%">`;
      const shell =
        `<div id="hero-shell" aria-hidden="true" style="position:absolute;top:0;left:0;width:100%;z-index:-1">` +
        `<div style="height:var(--hd-h);box-sizing:border-box;border-bottom:1px solid #ece9e4;background:#fff"></div>` +
        `<div style="position:relative;height:var(--hero-h);overflow:hidden;background:#1a1917">${img}` +
        `<div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(17,17,17,.55) 0%,rgba(17,17,17,.25) 50%,rgba(17,17,17,.05) 85%)"></div>` +
        `</div></div>`;
      const fill = `if (location.pathname === "/") document.body.insertAdjacentHTML("afterbegin", ${JSON.stringify(shell)});`;
      return {
        html: html
          .replace(/(<meta name="viewport"[^>]*>)/, `$1\n    <script>${image}</script>`)
          .replace('<div id="root"></div>', `<div id="root"></div>\n    <script>${fill}</script>`),
        tags: [{ tag: "script", children: code, injectTo: "head" }],
      };
    },
  };
}

/**
 * En build, incrusta el CSS principal (index-*.css, ~2 KiB) en un <style>: así no es una petición que bloquee
 * el primer render. El CSS de cada página sigue en archivos aparte (se cargan con su chunk).
 */
function inlineEntryCss() {
  return {
    name: "inline-entry-css",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        return html.replace(/<link rel="stylesheet"[^>]*href="\/(assets\/index-[^"]+\.css)"[^>]*>/, (tag, file) => {
          const asset = ctx.bundle[file];
          return asset ? `<style>${asset.source}</style>` : tag;
        });
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), preloadHome(), inlineEntryCss()],
});
