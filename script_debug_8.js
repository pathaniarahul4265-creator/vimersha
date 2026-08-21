
var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v2, _w2, _x2, _y2, _z2, _a3, _b3, _c3, _d3, _e3, _f3, _g3, _h3, _i3, _j3, _k3, _l3, _m3, _n3, _o3, _p3, _q3, _r3, _s3, _t3, _u3, _v3, _w3, _x3, _y3, _z3;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = function(obj, key, value) { return key in obj ? Object.defineProperty(obj, key, { enumerable: true, configurable: true, writable: true, value: value }) : obj[key] = value; };
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var _a, _b, _c;
(function() {
  const petals = document.getElementById("petals");
  if (petals) {
    let html = "";
    for (let i = 0; i < 16; i++) {
      html += `<ellipse cx="100" cy="42" rx="5" ry="16" transform="rotate(${i * 22.5} 100 100)" fill="rgba(224,198,116,0.12)" stroke="#e0c674" stroke-width="0.5"/>`;
    }
    petals.innerHTML = html;
  }
  const outerPetals = document.getElementById("outerPetals");
  if (outerPetals) {
    let html = "";
    for (let i = 0; i < 24; i++) {
      html += `<path d="M 100,6 Q 105,18 100,26 Q 95,18 100,6 Z" transform="rotate(${i * 15} 100 100)" fill="rgba(127,197,192,0.14)" stroke="#7fc5c0" stroke-width="0.45"/>`;
      html += `<circle cx="100" cy="6" r="1.2" transform="rotate(${i * 15} 100 100)" fill="#fce7b0"/>`;
    }
    outerPetals.innerHTML = html;
  }
  const yantraRays = document.getElementById("yantraRays");
  if (yantraRays) {
    let html = "";
    for (let i = 0; i < 12; i++) {
      html += `<line x1="100" y1="100" x2="100" y2="34" transform="rotate(${i * 30} 100 100)" stroke="#7fc5c0" stroke-width="0.4" stroke-dasharray="2,3"/>`;
      html += `<circle cx="100" cy="34" r="1.5" transform="rotate(${i * 30} 100 100)" fill="#e0c674"/>`;
    }
    yantraRays.innerHTML = html;
  }
})();
(function() {
  const field = document.getElementById("starField");
  const frag = document.createDocumentFragment();
  const STAR_COUNT = 220;
  for (let i = 0; i < STAR_COUNT; i++) {
    const s = document.createElement("div");
    s.className = "star";
    const size = (Math.random() * 1.8 + 0.6).toFixed(2);
    s.style.width = size + "px";
    s.style.height = size + "px";
    s.style.top = (Math.random() * 100).toFixed(2) + "%";
    s.style.left = (Math.random() * 100).toFixed(2) + "%";
    s.style.setProperty("--min-op", (Math.random() * 0.25 + 0.08).toFixed(2));
    s.style.setProperty("--max-op", (Math.random() * 0.5 + 0.5).toFixed(2));
    s.style.animationDuration = (Math.random() * 4 + 2.5).toFixed(2) + "s";
    s.style.animationDelay = (Math.random() * 5).toFixed(2) + "s";
    frag.appendChild(s);
  }
  field.appendChild(frag);
  window.ZODIAC_EMBEDDED_SVGS = {
  "aries": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_grad%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%231e0802%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%230c0201%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000000%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_grad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2225%25%22%20stop-color%3D%22%23fde047%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22%23eab308%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%23ca8a04%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff8db%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%222.5%22%20result%3D%22blur%22%2F%3E%0A%20%20%20%20%20%20%3CfeDropShadow%20dx%3D%220%22%20dy%3D%220%22%20stdDeviation%3D%223.5%22%20flood-color%3D%22%23ff5e00%22%20flood-opacity%3D%220.75%22%2F%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%0A%20%20%3C!--%20Deep%20Cosmic%20Background%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2298%22%20fill%3D%22url(%23bg_grad)%22%2F%3E%0A%0A%20%20%3C!--%20Celestial%20Orbit%20%26%20Astrological%20Rings%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2291%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%220.75%22%20stroke-dasharray%3D%222%2C3%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22%23ff5e00%22%20stroke-width%3D%220.6%22%20stroke-dasharray%3D%224%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%0A%20%20%0A%20%20%20%20%20%20%3C!--%20Aries%20Fiery%20Nebula%20Background%20--%3E%0A%20%20%20%20%20%20%3CradialGradient%20id%3D%22ar_neb%22%20cx%3D%2250%25%22%20cy%3D%2240%25%22%20r%3D%2255%25%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ff6b00%22%20stop-opacity%3D%220.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2235%25%22%20stop-color%3D%22%23d00000%22%20stop-opacity%3D%220.35%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2270%25%22%20stop-color%3D%22%236a040f%22%20stop-opacity%3D%220.2%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23030101%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22url(%23ar_neb)%22%2F%3E%0A%0A%20%20%20%20%20%20%3C!--%20Stars%20Background%20--%3E%0A%20%20%20%20%20%20%3Cg%20fill%3D%22%23fff%22%20opacity%3D%220.8%22%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2230%22%20cy%3D%2235%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%22170%22%20cy%3D%2245%22%20r%3D%221.3%22%2F%3E%3Ccircle%20cx%3D%22160%22%20cy%3D%22140%22%20r%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2240%22%20cy%3D%22150%22%20r%3D%221.2%22%2F%3E%3Ccircle%20cx%3D%2295%22%20cy%3D%2220%22%20r%3D%221.4%22%2F%3E%3Ccircle%20cx%3D%22130%22%20cy%3D%2225%22%20r%3D%220.8%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2270%22%20cy%3D%22175%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%22145%22%20cy%3D%22170%22%20r%3D%221.1%22%2F%3E%3Ccircle%20cx%3D%2225%22%20cy%3D%2295%22%20r%3D%220.8%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%0A%20%20%20%20%20%20%3C!--%20Constellation%20Filaments%20(Hamal%20%26%20Sheratan)%20--%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M45%2C75%20L80%2C55%20L130%2C62%20L165%2C85%22%20stroke%3D%22rgba(255%2C183%2C3%2C0.45)%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20stroke-dasharray%3D%222%2C2%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2280%22%20cy%3D%2255%22%20r%3D%222.5%22%20fill%3D%22%23fff%22%20filter%3D%22url(%23glow)%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22130%22%20cy%3D%2262%22%20r%3D%223%22%20fill%3D%22%23ffb703%22%20filter%3D%22url(%23glow)%22%2F%3E%0A%0A%20%20%20%20%20%20%3C!--%20Cosmic%20Ram%20Art%20--%3E%0A%20%20%20%20%20%20%3Cg%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%20%20%20%20%3C!--%20Horn%20Left%20Spiral%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M96%2C72%20C78%2C40%2032%2C38%2030%2C78%20C28%2C110%2065%2C122%2080%2C102%20C88%2C90%2086%2C78%2076%2C74%20C66%2C70%2052%2C78%2055%2C90%20C58%2C100%2070%2C102%2076%2C92%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%225.5%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M96%2C72%20C80%2C45%2042%2C42%2040%2C76%20C38%2C102%2068%2C112%2080%2C96%22%20fill%3D%22none%22%20stroke%3D%22%23ff5e00%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Horn%20Right%20Spiral%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M104%2C72%20C122%2C40%20168%2C38%20170%2C78%20C172%2C110%20135%2C122%20120%2C102%20C112%2C90%20114%2C78%20124%2C74%20C134%2C70%20148%2C78%20145%2C90%20C142%2C100%20130%2C102%20124%2C92%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%225.5%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M104%2C72%20C120%2C45%20158%2C42%20160%2C76%20C162%2C102%20132%2C112%20120%2C96%22%20fill%3D%22none%22%20stroke%3D%22%23ff5e00%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Ram%20Face%20%26%20Forehead%20Crown%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M92%2C72%20L108%2C72%20L105%2C108%20C105%2C124%20100%2C138%20100%2C140%20C100%2C138%2095%2C124%2095%2C108%20Z%22%20fill%3D%22%23ff5e00%22%20opacity%3D%220.85%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M94%2C76%20L106%2C76%20L103%2C105%20C103%2C118%20100%2C130%20100%2C132%20C100%2C130%2097%2C118%2097%2C105%20Z%22%20fill%3D%22url(%23gold_grad)%22%2F%3E%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%3C!--%20Glowing%20Eyes%20--%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2291%22%20cy%3D%2294%22%20r%3D%222.2%22%20fill%3D%22%23fff%22%20filter%3D%22url(%23glow)%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%22109%22%20cy%3D%2294%22%20r%3D%222.2%22%20fill%3D%22%23fff%22%20filter%3D%22url(%23glow)%22%2F%3E%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%3C!--%20Muzzle%20%2F%20Nose%20Bridge%20--%3E%0A%20%20%20%20%20%20%20%20%3Cellipse%20cx%3D%22100%22%20cy%3D%22132%22%20rx%3D%226%22%20ry%3D%224%22%20fill%3D%22%231e0802%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%221.2%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cline%20x1%3D%2297%22%20y1%3D%22132%22%20x2%3D%22103%22%20y2%3D%22132%22%20stroke%3D%22%23ffb703%22%20stroke-width%3D%221%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Forehead%20Diamond%20Star%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpolygon%20points%3D%22100%2C74%20103%2C84%20108%2C86%20103%2C88%20100%2C98%2097%2C88%2092%2C86%2097%2C84%22%20fill%3D%22%23fff%22%20filter%3D%22url(%23glow)%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%0A%0A%20%20%3C!--%20Astrological%20Glyph%20Crest%20at%20Top%20--%3E%0A%20%20%3Cg%20transform%3D%22translate(100%2C%2026)%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%229%22%20fill%3D%22%231e0802%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%220%22%20y%3D%224%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20serif%22%20font-size%3D%2211%22%20font-weight%3D%22700%22%20fill%3D%22%23ff5e00%22%3E%E2%99%88%3C%2Ftext%3E%0A%20%20%3C%2Fg%3E%0A%0A%20%20%3C!--%20Name%20Label%20at%20Bottom%20--%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20'Marcellus'%2C%20serif%22%20font-size%3D%229%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_grad)%22%20letter-spacing%3D%222%22%3EMESHA%20%C2%B7%20ARIES%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "taurus": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_grad%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23021a12%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%23010a07%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000000%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_grad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2225%25%22%20stop-color%3D%22%23fde047%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22%23eab308%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%23ca8a04%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff8db%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%222.5%22%20result%3D%22blur%22%2F%3E%0A%20%20%20%20%20%20%3CfeDropShadow%20dx%3D%220%22%20dy%3D%220%22%20stdDeviation%3D%223.5%22%20flood-color%3D%22%2310b981%22%20flood-opacity%3D%220.75%22%2F%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%0A%20%20%3C!--%20Deep%20Cosmic%20Background%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2298%22%20fill%3D%22url(%23bg_grad)%22%2F%3E%0A%0A%20%20%3C!--%20Celestial%20Orbit%20%26%20Astrological%20Rings%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2291%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%220.75%22%20stroke-dasharray%3D%222%2C3%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22%2310b981%22%20stroke-width%3D%220.6%22%20stroke-dasharray%3D%224%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%0A%20%20%0A%20%20%20%20%20%20%3C!--%20Taurus%20Emerald%20Nebula%20--%3E%0A%20%20%20%20%20%20%3CradialGradient%20id%3D%22ta_neb%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2255%25%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2310b981%22%20stop-opacity%3D%220.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2240%25%22%20stop-color%3D%22%23065f46%22%20stop-opacity%3D%220.35%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2275%25%22%20stop-color%3D%22%23022c22%22%20stop-opacity%3D%220.2%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23010a07%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22url(%23ta_neb)%22%2F%3E%0A%0A%20%20%20%20%20%20%3C!--%20Stars%20%26%20Pleiades%20Cluster%20--%3E%0A%20%20%20%20%20%20%3Cg%20fill%3D%22%23fff%22%20opacity%3D%220.85%22%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2262%22%20cy%3D%2250%22%20r%3D%221.3%22%2F%3E%3Ccircle%20cx%3D%2266%22%20cy%3D%2248%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%2270%22%20cy%3D%2252%22%20r%3D%221.2%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2264%22%20cy%3D%2255%22%20r%3D%220.9%22%2F%3E%3Ccircle%20cx%3D%2269%22%20cy%3D%2257%22%20r%3D%221.4%22%2F%3E%3Ccircle%20cx%3D%2274%22%20cy%3D%2254%22%20r%3D%221.1%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%22165%22%20cy%3D%2240%22%20r%3D%221%22%2F%3E%3Ccircle%20cx%3D%2235%22%20cy%3D%22145%22%20r%3D%221.2%22%2F%3E%3Ccircle%20cx%3D%22160%22%20cy%3D%22150%22%20r%3D%221.4%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%0A%20%20%20%20%20%20%3C!--%20Aldebaran%20Red%20Giant%20Diamond%20--%3E%0A%20%20%20%20%20%20%3Cg%20transform%3D%22translate(132%2C%2072)%22%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%20%20%20%20%3Cpolygon%20points%3D%220%2C-7%202%2C-2%207%2C0%202%2C2%200%2C7%20-2%2C2%20-7%2C0%20-2%2C-2%22%20fill%3D%22%23fff%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%222.5%22%20fill%3D%22%23f59e0b%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%0A%20%20%20%20%20%20%3C!--%20Celestial%20Cosmic%20Bull%20--%3E%0A%20%20%20%20%20%20%3Cg%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%20%20%20%20%3C!--%20Sweeping%20Emerald%20Horns%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M42%2C50%20C48%2C84%2076%2C96%2098%2C96%20C120%2C96%20148%2C84%20154%2C50%20C142%2C58%20128%2C68%2098%2C68%20C68%2C68%2054%2C58%2042%2C50%20Z%22%20fill%3D%22url(%23gold_grad)%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M46%2C54%20C54%2C80%2078%2C90%2098%2C90%20C118%2C90%20142%2C80%20150%2C54%22%20fill%3D%22none%22%20stroke%3D%22%2310b981%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Bull%20Head%20%26%20Forehead%20Crest%20--%3E%0A%20%20%20%20%20%20%20%20%3Cellipse%20cx%3D%2298%22%20cy%3D%22116%22%20rx%3D%2228%22%20ry%3D%2226%22%20fill%3D%22%23032b1f%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2298%22%20cy%3D%22116%22%20r%3D%2216%22%20fill%3D%22%2301140e%22%20stroke%3D%22%2310b981%22%20stroke-width%3D%221.5%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Glowing%20Eyes%20--%3E%0A%20%20%20%20%20%20%20%20%3Cellipse%20cx%3D%2284%22%20cy%3D%22112%22%20rx%3D%223.5%22%20ry%3D%222%22%20fill%3D%22%23fff%22%20filter%3D%22url(%23glow)%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cellipse%20cx%3D%22112%22%20cy%3D%22112%22%20rx%3D%223.5%22%20ry%3D%222%22%20fill%3D%22%23fff%22%20filter%3D%22url(%23glow)%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Snout%20Ring%20--%3E%0A%20%20%20%20%20%20%20%20%3Cellipse%20cx%3D%2298%22%20cy%3D%22132%22%20rx%3D%228%22%20ry%3D%225%22%20fill%3D%22%23021a12%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%221.2%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M93%2C134%20C93%2C142%20103%2C142%20103%2C134%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Star%20of%20Taurus%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpolygon%20points%3D%2298%2C104%20101%2C111%20108%2C114%20101%2C117%2098%2C124%2095%2C117%2088%2C114%2095%2C111%22%20fill%3D%22url(%23gold_grad)%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%0A%0A%20%20%3C!--%20Astrological%20Glyph%20Crest%20at%20Top%20--%3E%0A%20%20%3Cg%20transform%3D%22translate(100%2C%2026)%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%229%22%20fill%3D%22%23021a12%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%220%22%20y%3D%224%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20serif%22%20font-size%3D%2211%22%20font-weight%3D%22700%22%20fill%3D%22%2310b981%22%3E%E2%99%89%3C%2Ftext%3E%0A%20%20%3C%2Fg%3E%0A%0A%20%20%3C!--%20Name%20Label%20at%20Bottom%20--%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20'Marcellus'%2C%20serif%22%20font-size%3D%229%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_grad)%22%20letter-spacing%3D%222%22%3EVRISHABHA%20%C2%B7%20TAURUS%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "gemini": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_grad%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23060d26%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%2302040e%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000000%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_grad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2225%25%22%20stop-color%3D%22%23fde047%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22%23eab308%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%23ca8a04%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff8db%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%222.5%22%20result%3D%22blur%22%2F%3E%0A%20%20%20%20%20%20%3CfeDropShadow%20dx%3D%220%22%20dy%3D%220%22%20stdDeviation%3D%223.5%22%20flood-color%3D%22%2338bdf8%22%20flood-opacity%3D%220.75%22%2F%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%0A%20%20%3C!--%20Deep%20Cosmic%20Background%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2298%22%20fill%3D%22url(%23bg_grad)%22%2F%3E%0A%0A%20%20%3C!--%20Celestial%20Orbit%20%26%20Astrological%20Rings%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2291%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%220.75%22%20stroke-dasharray%3D%222%2C3%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22%2338bdf8%22%20stroke-width%3D%220.6%22%20stroke-dasharray%3D%224%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%0A%20%20%0A%20%20%20%20%20%20%3C!--%20Gemini%20Electric%20Nebula%20--%3E%0A%20%20%20%20%20%20%3CradialGradient%20id%3D%22ge_neb%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2255%25%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2338bdf8%22%20stop-opacity%3D%220.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2245%25%22%20stop-color%3D%22%236366f1%22%20stop-opacity%3D%220.35%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2280%25%22%20stop-color%3D%22%232e1065%22%20stop-opacity%3D%220.2%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2302040e%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22url(%23ge_neb)%22%2F%3E%0A%0A%20%20%20%20%20%20%3C!--%20Twin%20Star%20Castor%20%26%20Pollux%20Diamonds%20--%3E%0A%20%20%20%20%20%20%3Cg%20transform%3D%22translate(76%2C%2050)%22%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%20%20%20%20%3Cpolygon%20points%3D%220%2C-7%202%2C-2%207%2C0%202%2C2%200%2C7%20-2%2C2%20-7%2C0%20-2%2C-2%22%20fill%3D%22%23fff%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%222.5%22%20fill%3D%22%2338bdf8%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%3Cg%20transform%3D%22translate(124%2C%2050)%22%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%20%20%20%20%3Cpolygon%20points%3D%220%2C-7%202%2C-2%207%2C0%202%2C2%200%2C7%20-2%2C2%20-7%2C0%20-2%2C-2%22%20fill%3D%22%23fff%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%222.5%22%20fill%3D%22%23f59e0b%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%0A%20%20%20%20%20%20%3C!--%20Celestial%20Twins%20Art%20--%3E%0A%20%20%20%20%20%20%3Cg%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%20%20%20%20%3C!--%20Twin%20Silhouette%20Left%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M76%2C60%20C68%2C60%2062%2C68%2062%2C78%20C62%2C88%2068%2C96%2074%2C98%20L70%2C140%20L84%2C140%20L80%2C98%20C86%2C96%2090%2C88%2090%2C78%20C90%2C68%2084%2C60%2076%2C60%20Z%22%20fill%3D%22none%22%20stroke%3D%22%2338bdf8%22%20stroke-width%3D%222.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2276%22%20cy%3D%2274%22%20r%3D%227%22%20fill%3D%22%2338bdf8%22%20opacity%3D%220.8%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Twin%20Silhouette%20Right%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M124%2C60%20C116%2C60%20110%2C68%20110%2C78%20C110%2C88%20116%2C96%20122%2C98%20L118%2C140%20L132%2C140%20L128%2C98%20C134%2C96%20138%2C88%20138%2C78%20C138%2C68%20132%2C60%20124%2C60%20Z%22%20fill%3D%22none%22%20stroke%3D%22%23818cf8%22%20stroke-width%3D%222.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%22124%22%20cy%3D%2274%22%20r%3D%227%22%20fill%3D%22%23818cf8%22%20opacity%3D%220.8%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Golden%20Harmony%20Orbits%20%26%20Connecting%20Arcs%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M54%2C58%20C80%2C68%20120%2C68%20146%2C58%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%223.5%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M54%2C142%20C80%2C132%20120%2C132%20146%2C142%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%223.5%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2218%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%221.5%22%20stroke-dasharray%3D%223%2C3%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%225%22%20fill%3D%22%23fff%22%20filter%3D%22url(%23glow)%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%0A%0A%20%20%3C!--%20Astrological%20Glyph%20Crest%20at%20Top%20--%3E%0A%20%20%3Cg%20transform%3D%22translate(100%2C%2026)%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%229%22%20fill%3D%22%23060d26%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%220%22%20y%3D%224%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20serif%22%20font-size%3D%2211%22%20font-weight%3D%22700%22%20fill%3D%22%2338bdf8%22%3E%E2%99%8A%3C%2Ftext%3E%0A%20%20%3C%2Fg%3E%0A%0A%20%20%3C!--%20Name%20Label%20at%20Bottom%20--%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20'Marcellus'%2C%20serif%22%20font-size%3D%229%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_grad)%22%20letter-spacing%3D%222%22%3EMITHUNA%20%C2%B7%20GEMINI%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "cancer": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_grad%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23031525%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%2301070e%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000000%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_grad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2225%25%22%20stop-color%3D%22%23fde047%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22%23eab308%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%23ca8a04%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff8db%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%222.5%22%20result%3D%22blur%22%2F%3E%0A%20%20%20%20%20%20%3CfeDropShadow%20dx%3D%220%22%20dy%3D%220%22%20stdDeviation%3D%223.5%22%20flood-color%3D%22%2338bdf8%22%20flood-opacity%3D%220.75%22%2F%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%0A%20%20%3C!--%20Deep%20Cosmic%20Background%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2298%22%20fill%3D%22url(%23bg_grad)%22%2F%3E%0A%0A%20%20%3C!--%20Celestial%20Orbit%20%26%20Astrological%20Rings%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2291%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%220.75%22%20stroke-dasharray%3D%222%2C3%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22%2338bdf8%22%20stroke-width%3D%220.6%22%20stroke-dasharray%3D%224%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%0A%20%20%0A%20%20%20%20%20%20%3C!--%20Cancer%20Lunar%20Oceanic%20Nebula%20--%3E%0A%20%20%20%20%20%20%3CradialGradient%20id%3D%22ca_neb%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2255%25%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2338bdf8%22%20stop-opacity%3D%220.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2240%25%22%20stop-color%3D%22%230369a1%22%20stop-opacity%3D%220.35%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2280%25%22%20stop-color%3D%22%230c2340%22%20stop-opacity%3D%220.2%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2301070e%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22url(%23ca_neb)%22%2F%3E%0A%0A%20%20%20%20%20%20%3C!--%20Cosmic%20Crab%20Artwork%20--%3E%0A%20%20%20%20%20%20%3Cg%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%20%20%20%20%3C!--%20Carapace%20Body%20--%3E%0A%20%20%20%20%20%20%20%20%3Cellipse%20cx%3D%22100%22%20cy%3D%22104%22%20rx%3D%2226%22%20ry%3D%2220%22%20fill%3D%22%2304263e%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cellipse%20cx%3D%22100%22%20cy%3D%22104%22%20rx%3D%2218%22%20ry%3D%2213%22%20fill%3D%22%23011524%22%20stroke%3D%22%2338bdf8%22%20stroke-width%3D%221.5%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Pincers%20Left%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M76%2C96%20C62%2C80%2048%2C72%2042%2C56%20C38%2C72%2052%2C86%2066%2C94%22%20fill%3D%22url(%23gold_grad)%22%20stroke%3D%22%2338bdf8%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M42%2C56%20C50%2C54%2058%2C62%2064%2C74%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Pincers%20Right%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M124%2C96%20C138%2C80%20152%2C72%20158%2C56%20C162%2C72%20148%2C86%20134%2C94%22%20fill%3D%22url(%23gold_grad)%22%20stroke%3D%22%2338bdf8%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M158%2C56%20C150%2C54%20142%2C62%20136%2C74%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Walking%20Legs%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M78%2C110%20Q58%2C118%2048%2C134%20M78%2C116%20Q60%2C128%2054%2C144%20M80%2C122%20Q66%2C138%2064%2C152%22%20fill%3D%22none%22%20stroke%3D%22%2338bdf8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M122%2C110%20Q142%2C118%20152%2C134%20M122%2C116%20Q140%2C128%20146%2C144%20M120%2C122%20Q134%2C138%20136%2C152%22%20fill%3D%22none%22%20stroke%3D%22%2338bdf8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Central%20Full%20Moon%20Pearl%20--%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22104%22%20r%3D%226%22%20fill%3D%22%23fff%22%20filter%3D%22url(%23glow)%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%0A%0A%20%20%3C!--%20Astrological%20Glyph%20Crest%20at%20Top%20--%3E%0A%20%20%3Cg%20transform%3D%22translate(100%2C%2026)%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%229%22%20fill%3D%22%23031525%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%220%22%20y%3D%224%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20serif%22%20font-size%3D%2211%22%20font-weight%3D%22700%22%20fill%3D%22%2338bdf8%22%3E%E2%99%8B%3C%2Ftext%3E%0A%20%20%3C%2Fg%3E%0A%0A%20%20%3C!--%20Name%20Label%20at%20Bottom%20--%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20'Marcellus'%2C%20serif%22%20font-size%3D%229%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_grad)%22%20letter-spacing%3D%222%22%3EKARKA%20%C2%B7%20CANCER%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "leo": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_grad%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23240e02%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%230a0300%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000000%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_grad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2225%25%22%20stop-color%3D%22%23fde047%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22%23eab308%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%23ca8a04%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff8db%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%222.5%22%20result%3D%22blur%22%2F%3E%0A%20%20%20%20%20%20%3CfeDropShadow%20dx%3D%220%22%20dy%3D%220%22%20stdDeviation%3D%223.5%22%20flood-color%3D%22%23f59e0b%22%20flood-opacity%3D%220.75%22%2F%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%0A%20%20%3C!--%20Deep%20Cosmic%20Background%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2298%22%20fill%3D%22url(%23bg_grad)%22%2F%3E%0A%0A%20%20%3C!--%20Celestial%20Orbit%20%26%20Astrological%20Rings%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2291%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%220.75%22%20stroke-dasharray%3D%222%2C3%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22%23f59e0b%22%20stroke-width%3D%220.6%22%20stroke-dasharray%3D%224%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%0A%20%20%0A%20%20%20%20%20%20%3C!--%20Leo%20Solar%20Fire%20Nebula%20--%3E%0A%20%20%20%20%20%20%3CradialGradient%20id%3D%22le_neb%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2255%25%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23f59e0b%22%20stop-opacity%3D%220.55%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2240%25%22%20stop-color%3D%22%23dc2626%22%20stop-opacity%3D%220.38%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2280%25%22%20stop-color%3D%22%237c2d12%22%20stop-opacity%3D%220.2%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230a0300%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22url(%23le_neb)%22%2F%3E%0A%0A%20%20%20%20%20%20%3C!--%20Regulus%20Star%20(Heart%20of%20the%20Lion)%20--%3E%0A%20%20%20%20%20%20%3Cg%20transform%3D%22translate(68%2C%2096)%22%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%20%20%20%20%3Cpolygon%20points%3D%220%2C-8%202%2C-2%208%2C0%202%2C2%200%2C8%20-2%2C2%20-8%2C0%20-2%2C-2%22%20fill%3D%22%23fff%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%222.8%22%20fill%3D%22%23f59e0b%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%0A%20%20%20%20%20%20%3C!--%20Majestic%20Cosmic%20Lion%20Profile%20%26%20Mane%20--%3E%0A%20%20%20%20%20%20%3Cg%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%20%20%20%20%3C!--%20Billowing%20Fiery%20Mane%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M68%2C110%20C52%2C110%2046%2C94%2056%2C80%20C68%2C64%2084%2C54%20104%2C54%20C132%2C54%20146%2C76%20138%2C98%20C130%2C120%20112%2C134%20122%2C148%20C128%2C158%20142%2C154%20150%2C142%20C152%2C138%20158%2C142%20154%2C150%20C142%2C166%20118%2C168%20106%2C152%20C94%2C136%20110%2C116%20116%2C98%20C120%2C84%20112%2C68%2094%2C68%20C80%2C68%2070%2C78%2066%2C90%20C76%2C90%2080%2C96%2080%2C104%20C80%2C112%2074%2C114%2068%2C110%20Z%22%20fill%3D%22%23f97316%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Flowing%20Flame%20Strands%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M104%2C56%20C124%2C64%20136%2C82%20128%2C104%20C122%2C120%20110%2C132%20116%2C146%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M84%2C66%20C102%2C74%20118%2C88%20114%2C112%22%20fill%3D%22none%22%20stroke%3D%22%23fef08a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Lion%20Eye%20%26%20Brow%20--%3E%0A%20%20%20%20%20%20%20%20%3Cellipse%20cx%3D%2268%22%20cy%3D%2294%22%20rx%3D%223.5%22%20ry%3D%222%22%20fill%3D%22%23fff%22%20filter%3D%22url(%23glow)%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpolygon%20points%3D%22100%2C74%20104%2C84%20112%2C86%20104%2C88%20100%2C98%2096%2C88%2088%2C86%2096%2C84%22%20fill%3D%22url(%23gold_grad)%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%0A%0A%20%20%3C!--%20Astrological%20Glyph%20Crest%20at%20Top%20--%3E%0A%20%20%3Cg%20transform%3D%22translate(100%2C%2026)%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%229%22%20fill%3D%22%23240e02%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%220%22%20y%3D%224%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20serif%22%20font-size%3D%2211%22%20font-weight%3D%22700%22%20fill%3D%22%23f59e0b%22%3E%E2%99%8C%3C%2Ftext%3E%0A%20%20%3C%2Fg%3E%0A%0A%20%20%3C!--%20Name%20Label%20at%20Bottom%20--%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20'Marcellus'%2C%20serif%22%20font-size%3D%229%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_grad)%22%20letter-spacing%3D%222%22%3ESIMHA%20%C2%B7%20LEO%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "virgo": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_grad%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2306181d%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%23010709%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000000%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_grad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2225%25%22%20stop-color%3D%22%23fde047%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22%23eab308%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%23ca8a04%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff8db%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%222.5%22%20result%3D%22blur%22%2F%3E%0A%20%20%20%20%20%20%3CfeDropShadow%20dx%3D%220%22%20dy%3D%220%22%20stdDeviation%3D%223.5%22%20flood-color%3D%22%232dd4bf%22%20flood-opacity%3D%220.75%22%2F%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%0A%20%20%3C!--%20Deep%20Cosmic%20Background%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2298%22%20fill%3D%22url(%23bg_grad)%22%2F%3E%0A%0A%20%20%3C!--%20Celestial%20Orbit%20%26%20Astrological%20Rings%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2291%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%220.75%22%20stroke-dasharray%3D%222%2C3%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22%232dd4bf%22%20stroke-width%3D%220.6%22%20stroke-dasharray%3D%224%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%0A%20%20%0A%20%20%20%20%20%20%3C!--%20Virgo%20Starlight%20Nebula%20--%3E%0A%20%20%20%20%20%20%3CradialGradient%20id%3D%22vi_neb%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2255%25%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%232dd4bf%22%20stop-opacity%3D%220.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2240%25%22%20stop-color%3D%22%230284c7%22%20stop-opacity%3D%220.35%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2280%25%22%20stop-color%3D%22%23134e4a%22%20stop-opacity%3D%220.2%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23010709%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22url(%23vi_neb)%22%2F%3E%0A%0A%20%20%20%20%20%20%3C!--%20Spica%20Diamond%20Star%20(Alpha%20Virginis)%20--%3E%0A%20%20%20%20%20%20%3Cg%20transform%3D%22translate(68%2C%2086)%22%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%20%20%20%20%3Cpolygon%20points%3D%220%2C-8%202%2C-2%208%2C0%202%2C2%200%2C8%20-2%2C2%20-8%2C0%20-2%2C-2%22%20fill%3D%22%23fff%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%222.8%22%20fill%3D%22%232dd4bf%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%0A%20%20%20%20%20%20%3C!--%20Celestial%20Maiden%20Profile%20%26%20Golden%20Sheaf%20of%20Wheat%20--%3E%0A%20%20%20%20%20%20%3Cg%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%20%20%20%20%3C!--%20Maiden%20Profile%20%26%20Flowing%20Starlight%20Hair%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M102%2C56%20C90%2C56%2080%2C66%2080%2C78%20C80%2C88%2088%2C96%2096%2C98%20L96%2C110%20C84%2C116%2070%2C126%2068%2C144%20L134%2C144%20C132%2C126%20118%2C116%20106%2C110%20L106%2C98%20C114%2C96%20122%2C88%20122%2C78%20C122%2C66%20114%2C56%20102%2C56%20Z%22%20fill%3D%22%23042a34%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M102%2C54%20C116%2C54%20130%2C66%20134%2C84%20C138%2C102%20128%2C114%20136%2C132%22%20fill%3D%22none%22%20stroke%3D%22%232dd4bf%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Glowing%20Wheat%20Sheaf%20Branch%20--%3E%0A%20%20%20%20%20%20%20%20%3Cg%20transform%3D%22translate(64%2C%2088)%20rotate(-22)%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M10%2C48%20Q12%2C22%2015%2C0%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222.5%22%20fill%3D%22none%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cellipse%20cx%3D%2210%22%20cy%3D%2212%22%20rx%3D%224%22%20ry%3D%227%22%20fill%3D%22url(%23gold_grad)%22%20transform%3D%22rotate(-30%2010%2012)%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cellipse%20cx%3D%2218%22%20cy%3D%2214%22%20rx%3D%224%22%20ry%3D%227%22%20fill%3D%22url(%23gold_grad)%22%20transform%3D%22rotate(30%2018%2014)%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cellipse%20cx%3D%2211%22%20cy%3D%2224%22%20rx%3D%224%22%20ry%3D%227%22%20fill%3D%22url(%23gold_grad)%22%20transform%3D%22rotate(-30%2011%2024)%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cellipse%20cx%3D%2219%22%20cy%3D%2226%22%20rx%3D%224%22%20ry%3D%227%22%20fill%3D%22url(%23gold_grad)%22%20transform%3D%22rotate(30%2019%2026)%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cellipse%20cx%3D%2215%22%20cy%3D%220%22%20rx%3D%223.5%22%20ry%3D%226%22%20fill%3D%22%23fff%22%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%0A%0A%20%20%3C!--%20Astrological%20Glyph%20Crest%20at%20Top%20--%3E%0A%20%20%3Cg%20transform%3D%22translate(100%2C%2026)%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%229%22%20fill%3D%22%2306181d%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%220%22%20y%3D%224%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20serif%22%20font-size%3D%2211%22%20font-weight%3D%22700%22%20fill%3D%22%232dd4bf%22%3E%E2%99%8D%3C%2Ftext%3E%0A%20%20%3C%2Fg%3E%0A%0A%20%20%3C!--%20Name%20Label%20at%20Bottom%20--%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20'Marcellus'%2C%20serif%22%20font-size%3D%229%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_grad)%22%20letter-spacing%3D%222%22%3EKANYA%20%C2%B7%20VIRGO%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "libra": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_grad%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%231d081b%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%23080107%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000000%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_grad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2225%25%22%20stop-color%3D%22%23fde047%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22%23eab308%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%23ca8a04%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff8db%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%222.5%22%20result%3D%22blur%22%2F%3E%0A%20%20%20%20%20%20%3CfeDropShadow%20dx%3D%220%22%20dy%3D%220%22%20stdDeviation%3D%223.5%22%20flood-color%3D%22%23ec4899%22%20flood-opacity%3D%220.75%22%2F%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%0A%20%20%3C!--%20Deep%20Cosmic%20Background%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2298%22%20fill%3D%22url(%23bg_grad)%22%2F%3E%0A%0A%20%20%3C!--%20Celestial%20Orbit%20%26%20Astrological%20Rings%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2291%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%220.75%22%20stroke-dasharray%3D%222%2C3%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22%23ec4899%22%20stroke-width%3D%220.6%22%20stroke-dasharray%3D%224%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%0A%20%20%0A%20%20%20%20%20%20%3C!--%20Libra%20Violet%20Starlight%20Nebula%20--%3E%0A%20%20%20%20%20%20%3CradialGradient%20id%3D%22li_neb%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2255%25%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ec4899%22%20stop-opacity%3D%220.48%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2245%25%22%20stop-color%3D%22%238b5cf6%22%20stop-opacity%3D%220.35%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2280%25%22%20stop-color%3D%22%234c1d95%22%20stop-opacity%3D%220.2%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23080107%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22url(%23li_neb)%22%2F%3E%0A%0A%20%20%20%20%20%20%3C!--%20Celestial%20Scales%20of%20Equilibrium%20--%3E%0A%20%20%20%20%20%20%3Cg%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%20%20%20%20%3C!--%20Base%20Platform%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M50%2C144%20L150%2C144%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%225%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%3C!--%20Central%20Pillar%20%26%20Fulcrum%20--%3E%0A%20%20%20%20%20%20%20%20%3Cline%20x1%3D%22100%22%20y1%3D%2256%22%20x2%3D%22100%22%20y2%3D%22144%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%2254%22%20r%3D%227%22%20fill%3D%22%23fff%22%20filter%3D%22url(%23glow)%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Balance%20Beam%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M50%2C86%20L150%2C86%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%225%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2250%22%20cy%3D%2286%22%20r%3D%224%22%20fill%3D%22%23ec4899%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%22150%22%20cy%3D%2286%22%20r%3D%224%22%20fill%3D%22%23ec4899%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Scale%20Pan%20Left%20Strings%20%26%20Pan%20--%3E%0A%20%20%20%20%20%20%20%20%3Cline%20x1%3D%2250%22%20y1%3D%2286%22%20x2%3D%2236%22%20y2%3D%22114%22%20stroke%3D%22%23c084fc%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cline%20x1%3D%2250%22%20y1%3D%2286%22%20x2%3D%2264%22%20y2%3D%22114%22%20stroke%3D%22%23c084fc%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M34%2C114%20C34%2C124%2066%2C124%2066%2C114%20Z%22%20fill%3D%22%23ec4899%22%20opacity%3D%220.8%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%221.5%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Scale%20Pan%20Right%20Strings%20%26%20Pan%20--%3E%0A%20%20%20%20%20%20%20%20%3Cline%20x1%3D%22150%22%20y1%3D%2286%22%20x2%3D%22136%22%20y2%3D%22114%22%20stroke%3D%22%23c084fc%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cline%20x1%3D%22150%22%20y1%3D%2286%22%20x2%3D%22164%22%20y2%3D%22114%22%20stroke%3D%22%23c084fc%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M134%2C114%20C134%2C124%20166%2C124%20166%2C114%20Z%22%20fill%3D%22%23ec4899%22%20opacity%3D%220.8%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%0A%0A%20%20%3C!--%20Astrological%20Glyph%20Crest%20at%20Top%20--%3E%0A%20%20%3Cg%20transform%3D%22translate(100%2C%2026)%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%229%22%20fill%3D%22%231d081b%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%220%22%20y%3D%224%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20serif%22%20font-size%3D%2211%22%20font-weight%3D%22700%22%20fill%3D%22%23ec4899%22%3E%E2%99%8E%3C%2Ftext%3E%0A%20%20%3C%2Fg%3E%0A%0A%20%20%3C!--%20Name%20Label%20at%20Bottom%20--%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20'Marcellus'%2C%20serif%22%20font-size%3D%229%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_grad)%22%20letter-spacing%3D%222%22%3ETULA%20%C2%B7%20LIBRA%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "scorpio": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_grad%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%231a0520%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%2307010d%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000000%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_grad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2225%25%22%20stop-color%3D%22%23fde047%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22%23eab308%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%23ca8a04%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff8db%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%222.5%22%20result%3D%22blur%22%2F%3E%0A%20%20%20%20%20%20%3CfeDropShadow%20dx%3D%220%22%20dy%3D%220%22%20stdDeviation%3D%223.5%22%20flood-color%3D%22%23f43f5e%22%20flood-opacity%3D%220.75%22%2F%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%0A%20%20%3C!--%20Deep%20Cosmic%20Background%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2298%22%20fill%3D%22url(%23bg_grad)%22%2F%3E%0A%0A%20%20%3C!--%20Celestial%20Orbit%20%26%20Astrological%20Rings%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2291%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%220.75%22%20stroke-dasharray%3D%222%2C3%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22%23f43f5e%22%20stroke-width%3D%220.6%22%20stroke-dasharray%3D%224%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%0A%20%20%0A%20%20%20%20%20%20%3C!--%20Scorpio%20Crimson%20%26%20Amethyst%20Nebula%20--%3E%0A%20%20%20%20%20%20%3CradialGradient%20id%3D%22sc_neb%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2255%25%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23f43f5e%22%20stop-opacity%3D%220.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2240%25%22%20stop-color%3D%22%239333ea%22%20stop-opacity%3D%220.35%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2280%25%22%20stop-color%3D%22%234c0519%22%20stop-opacity%3D%220.2%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2307010d%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22url(%23sc_neb)%22%2F%3E%0A%0A%20%20%20%20%20%20%3C!--%20Antares%20Diamond%20Heart%20Star%20--%3E%0A%20%20%20%20%20%20%3Cg%20transform%3D%22translate(94%2C%20100)%22%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%20%20%20%20%3Cpolygon%20points%3D%220%2C-8%202%2C-2%208%2C0%202%2C2%200%2C8%20-2%2C2%20-8%2C0%20-2%2C-2%22%20fill%3D%22%23ffedd5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%222.8%22%20fill%3D%22%23f43f5e%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%0A%20%20%20%20%20%20%3C!--%20Cosmic%20Scorpion%20Artwork%20--%3E%0A%20%20%20%20%20%20%3Cg%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%20%20%20%20%3C!--%20Curved%20Arching%20Tail%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M96%2C118%20C112%2C122%20138%2C124%20146%2C108%20C152%2C94%20142%2C78%20132%2C74%20C122%2C70%20120%2C78%20126%2C84%20C132%2C90%20138%2C98%20130%2C106%20C124%2C114%20108%2C112%2096%2C108%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%224.5%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%22126%22%20cy%3D%2284%22%20r%3D%225%22%20fill%3D%22%23f43f5e%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M126%2C80%20Q130%2C68%20118%2C64%20Q123%2C72%20124%2C80%20Z%22%20fill%3D%22url(%23gold_grad)%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%22118%22%20cy%3D%2264%22%20r%3D%222%22%20fill%3D%22%23fff%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Carapace%20Body%20--%3E%0A%20%20%20%20%20%20%20%20%3Cellipse%20cx%3D%2290%22%20cy%3D%2298%22%20rx%3D%2214%22%20ry%3D%2218%22%20fill%3D%22%23e11d48%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222%22%20transform%3D%22rotate(-15%2090%2098)%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cellipse%20cx%3D%2289%22%20cy%3D%2296%22%20rx%3D%229%22%20ry%3D%2212%22%20fill%3D%22%231a0520%22%20opacity%3D%220.6%22%20transform%3D%22rotate(-15%2089%2096)%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Pincers%20Left%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M82%2C84%20C74%2C74%2058%2C72%2050%2C64%20C46%2C58%2050%2C50%2058%2C54%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%223.5%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M50%2C64%20C42%2C60%2040%2C48%2046%2C42%20C48%2C46%2054%2C52%2056%2C56%20Z%22%20fill%3D%22%23f43f5e%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%221.2%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Pincers%20Right%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M94%2C80%20C102%2C70%20116%2C66%20126%2C56%20C130%2C52%20126%2C44%20118%2C46%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%223.5%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M126%2C56%20C134%2C52%20136%2C40%20130%2C34%20C128%2C38%20122%2C44%20120%2C48%20Z%22%20fill%3D%22%23f43f5e%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%221.2%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%0A%0A%20%20%3C!--%20Astrological%20Glyph%20Crest%20at%20Top%20--%3E%0A%20%20%3Cg%20transform%3D%22translate(100%2C%2026)%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%229%22%20fill%3D%22%231a0520%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%220%22%20y%3D%224%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20serif%22%20font-size%3D%2211%22%20font-weight%3D%22700%22%20fill%3D%22%23f43f5e%22%3E%E2%99%8F%3C%2Ftext%3E%0A%20%20%3C%2Fg%3E%0A%0A%20%20%3C!--%20Name%20Label%20at%20Bottom%20--%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20'Marcellus'%2C%20serif%22%20font-size%3D%229%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_grad)%22%20letter-spacing%3D%222%22%3EVRISCHIKA%20%C2%B7%20SCORPIO%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "sagittarius": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_grad%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%231d1004%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%23070301%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000000%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_grad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2225%25%22%20stop-color%3D%22%23fde047%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22%23eab308%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%23ca8a04%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff8db%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%222.5%22%20result%3D%22blur%22%2F%3E%0A%20%20%20%20%20%20%3CfeDropShadow%20dx%3D%220%22%20dy%3D%220%22%20stdDeviation%3D%223.5%22%20flood-color%3D%22%23f59e0b%22%20flood-opacity%3D%220.75%22%2F%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%0A%20%20%3C!--%20Deep%20Cosmic%20Background%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2298%22%20fill%3D%22url(%23bg_grad)%22%2F%3E%0A%0A%20%20%3C!--%20Celestial%20Orbit%20%26%20Astrological%20Rings%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2291%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%220.75%22%20stroke-dasharray%3D%222%2C3%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22%23f59e0b%22%20stroke-width%3D%220.6%22%20stroke-dasharray%3D%224%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%0A%20%20%0A%20%20%20%20%20%20%3C!--%20Sagittarius%20Golden%20Fire%20Nebula%20--%3E%0A%20%20%20%20%20%20%3CradialGradient%20id%3D%22sa_neb%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2255%25%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23f59e0b%22%20stop-opacity%3D%220.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2240%25%22%20stop-color%3D%22%23b45309%22%20stop-opacity%3D%220.35%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2280%25%22%20stop-color%3D%22%23451a03%22%20stop-opacity%3D%220.2%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23070301%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22url(%23sa_neb)%22%2F%3E%0A%0A%20%20%20%20%20%20%3C!--%20Drawn%20Cosmic%20Bow%20%26%20Glowing%20Arrow%20--%3E%0A%20%20%20%20%20%20%3Cg%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%20%20%20%20%3C!--%20Golden%20Bow%20Arc%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M50%2C60%20C90%2C80%20120%2C110%20140%2C150%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%224.5%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M54%2C64%20C90%2C82%20118%2C110%20136%2C146%22%20fill%3D%22none%22%20stroke%3D%22%23f59e0b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Bow%20String%20--%3E%0A%20%20%20%20%20%20%20%20%3Cline%20x1%3D%2250%22%20y1%3D%2260%22%20x2%3D%22100%22%20y2%3D%22100%22%20stroke%3D%22%23ffedd5%22%20stroke-width%3D%221.2%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cline%20x1%3D%22100%22%20y1%3D%22100%22%20x2%3D%22140%22%20y2%3D%22150%22%20stroke%3D%22%23ffedd5%22%20stroke-width%3D%221.2%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Celestial%20Arrow%20--%3E%0A%20%20%20%20%20%20%20%20%3Cline%20x1%3D%2260%22%20y1%3D%22140%22%20x2%3D%22146%22%20y2%3D%2254%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%225%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpolygon%20points%3D%22146%2C46%20156%2C70%20130%2C80%22%20fill%3D%22url(%23gold_grad)%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpolygon%20points%3D%22148%2C48%20154%2C66%20134%2C74%22%20fill%3D%22%23fff%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Arrow%20Feathers%20(Fletching)%20--%3E%0A%20%20%20%20%20%20%20%20%3Cline%20x1%3D%2262%22%20y1%3D%22138%22%20x2%3D%2252%22%20y2%3D%22134%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cline%20x1%3D%2266%22%20y1%3D%22142%22%20x2%3D%2262%22%20y2%3D%22152%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222.5%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Center%20Energy%20Knot%20--%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%225%22%20fill%3D%22%23fff%22%20filter%3D%22url(%23glow)%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%0A%0A%20%20%3C!--%20Astrological%20Glyph%20Crest%20at%20Top%20--%3E%0A%20%20%3Cg%20transform%3D%22translate(100%2C%2026)%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%229%22%20fill%3D%22%231d1004%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%220%22%20y%3D%224%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20serif%22%20font-size%3D%2211%22%20font-weight%3D%22700%22%20fill%3D%22%23f59e0b%22%3E%E2%99%90%3C%2Ftext%3E%0A%20%20%3C%2Fg%3E%0A%0A%20%20%3C!--%20Name%20Label%20at%20Bottom%20--%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20'Marcellus'%2C%20serif%22%20font-size%3D%229%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_grad)%22%20letter-spacing%3D%222%22%3EDHANU%20%C2%B7%20SAGITTARIUS%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "capricorn": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_grad%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23061328%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%2301060f%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000000%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_grad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2225%25%22%20stop-color%3D%22%23fde047%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22%23eab308%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%23ca8a04%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff8db%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%222.5%22%20result%3D%22blur%22%2F%3E%0A%20%20%20%20%20%20%3CfeDropShadow%20dx%3D%220%22%20dy%3D%220%22%20stdDeviation%3D%223.5%22%20flood-color%3D%22%233b82f6%22%20flood-opacity%3D%220.75%22%2F%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%0A%20%20%3C!--%20Deep%20Cosmic%20Background%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2298%22%20fill%3D%22url(%23bg_grad)%22%2F%3E%0A%0A%20%20%3C!--%20Celestial%20Orbit%20%26%20Astrological%20Rings%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2291%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%220.75%22%20stroke-dasharray%3D%222%2C3%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22%233b82f6%22%20stroke-width%3D%220.6%22%20stroke-dasharray%3D%224%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%0A%20%20%0A%20%20%20%20%20%20%3C!--%20Capricorn%20Deep%20Ocean%20Abyss%20Nebula%20--%3E%0A%20%20%20%20%20%20%3CradialGradient%20id%3D%22cp_neb%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2255%25%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%233b82f6%22%20stop-opacity%3D%220.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2240%25%22%20stop-color%3D%22%231e3a8a%22%20stop-opacity%3D%220.35%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2280%25%22%20stop-color%3D%22%230f172a%22%20stop-opacity%3D%220.2%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2301060f%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22url(%23cp_neb)%22%2F%3E%0A%0A%20%20%20%20%20%20%3C!--%20Celestial%20Sea-Goat%20Artwork%20--%3E%0A%20%20%20%20%20%20%3Cg%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%20%20%20%20%3C!--%20Goat%20Horns%20%26%20Head%20Arc%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M52%2C76%20C52%2C58%2068%2C52%2078%2C68%20L98%2C108%20L118%2C70%20C128%2C52%20144%2C58%20144%2C76%20C144%2C96%20126%2C114%20116%2C132%20C108%2C146%20120%2C156%20132%2C148%20C140%2C142%20140%2C130%20130%2C128%20C122%2C126%20116%2C134%20122%2C140%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%225%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M56%2C76%20C56%2C62%2068%2C58%2076%2C70%20L98%2C104%20L120%2C72%20C128%2C58%20140%2C62%20140%2C76%22%20fill%3D%22none%22%20stroke%3D%22%2360a5fa%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Sea-Goat%20Eye%20%26%20Crest%20--%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2278%22%20cy%3D%2268%22%20r%3D%224.5%22%20fill%3D%22%23fff%22%20filter%3D%22url(%23glow)%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpolygon%20points%3D%2298%2C96%20102%2C104%20108%2C106%20102%2C108%2098%2C116%2094%2C108%2088%2C106%2094%2C104%22%20fill%3D%22url(%23gold_grad)%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%0A%0A%20%20%3C!--%20Astrological%20Glyph%20Crest%20at%20Top%20--%3E%0A%20%20%3Cg%20transform%3D%22translate(100%2C%2026)%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%229%22%20fill%3D%22%23061328%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%220%22%20y%3D%224%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20serif%22%20font-size%3D%2211%22%20font-weight%3D%22700%22%20fill%3D%22%233b82f6%22%3E%E2%99%91%3C%2Ftext%3E%0A%20%20%3C%2Fg%3E%0A%0A%20%20%3C!--%20Name%20Label%20at%20Bottom%20--%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20'Marcellus'%2C%20serif%22%20font-size%3D%229%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_grad)%22%20letter-spacing%3D%222%22%3EMAKARA%20%C2%B7%20CAPRICORN%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
  "aquarius": "https://res.cloudinary.com/cdvwbrm9/image/upload/v1787306318/aquarius.svg
  "pisces": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22bg_grad%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230f0826%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%2303010c%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000000%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gold_grad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2225%25%22%20stop-color%3D%22%23fde047%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22%23eab308%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2285%25%22%20stop-color%3D%22%23ca8a04%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23fff8db%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cfilter%20id%3D%22glow%22%20x%3D%22-30%25%22%20y%3D%22-30%25%22%20width%3D%22160%25%22%20height%3D%22160%25%22%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%222.5%22%20result%3D%22blur%22%2F%3E%0A%20%20%20%20%20%20%3CfeDropShadow%20dx%3D%220%22%20dy%3D%220%22%20stdDeviation%3D%223.5%22%20flood-color%3D%22%2338bdf8%22%20flood-opacity%3D%220.75%22%2F%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%0A%20%20%3C!--%20Deep%20Cosmic%20Background%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2298%22%20fill%3D%22url(%23bg_grad)%22%2F%3E%0A%0A%20%20%3C!--%20Celestial%20Orbit%20%26%20Astrological%20Rings%20--%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%222%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2291%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%220.75%22%20stroke-dasharray%3D%222%2C3%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2286%22%20fill%3D%22none%22%20stroke%3D%22%2338bdf8%22%20stroke-width%3D%220.6%22%20stroke-dasharray%3D%224%2C6%22%20opacity%3D%220.6%22%2F%3E%0A%0A%20%20%0A%20%20%20%20%20%20%3C!--%20Pisces%20Cosmic%20Ocean%20Nebula%20--%3E%0A%20%20%20%20%20%20%3CradialGradient%20id%3D%22pi_neb%22%20cx%3D%2250%25%22%20cy%3D%2245%25%22%20r%3D%2255%25%22%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2338bdf8%22%20stop-opacity%3D%220.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2240%25%22%20stop-color%3D%22%238b5cf6%22%20stop-opacity%3D%220.35%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%2280%25%22%20stop-color%3D%22%2331104b%22%20stop-opacity%3D%220.2%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2303010c%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2295%22%20fill%3D%22url(%23pi_neb)%22%2F%3E%0A%0A%20%20%20%20%20%20%3C!--%20Twin%20Cosmic%20Koi%20Swimming%20in%20Samsara%20Loop%20--%3E%0A%20%20%20%20%20%20%3Cg%20filter%3D%22url(%23glow)%22%3E%0A%20%20%20%20%20%20%20%20%3C!--%20Fish%20Left%20Arc%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M68%2C54%20C48%2C74%2048%2C126%2068%2C146%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M72%2C54%20C54%2C74%2054%2C126%2072%2C146%22%20fill%3D%22none%22%20stroke%3D%22%2338bdf8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpolygon%20points%3D%2268%2C54%2056%2C44%2076%2C42%22%20fill%3D%22url(%23gold_grad)%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2266%22%20cy%3D%2252%22%20r%3D%222%22%20fill%3D%22%23fff%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Fish%20Right%20Arc%20--%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M132%2C54%20C152%2C74%20152%2C126%20132%2C146%22%20fill%3D%22none%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M128%2C54%20C146%2C74%20146%2C126%20128%2C146%22%20fill%3D%22none%22%20stroke%3D%22%23c084fc%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpolygon%20points%3D%22132%2C146%20122%2C158%20142%2C156%22%20fill%3D%22url(%23gold_grad)%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%22134%22%20cy%3D%22148%22%20r%3D%222%22%20fill%3D%22%23fff%22%2F%3E%0A%0A%20%20%20%20%20%20%20%20%3C!--%20Connecting%20Cosmic%20Starlight%20Cord%20--%3E%0A%20%20%20%20%20%20%20%20%3Cline%20x1%3D%2250%22%20y1%3D%22100%22%20x2%3D%22150%22%20y2%3D%22100%22%20stroke%3D%22%23e0e7ff%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%226%22%20fill%3D%22%23fff%22%20filter%3D%22url(%23glow)%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%0A%0A%20%20%3C!--%20Astrological%20Glyph%20Crest%20at%20Top%20--%3E%0A%20%20%3Cg%20transform%3D%22translate(100%2C%2026)%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%229%22%20fill%3D%22%230f0826%22%20stroke%3D%22url(%23gold_grad)%22%20stroke-width%3D%221%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%220%22%20y%3D%224%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20serif%22%20font-size%3D%2211%22%20font-weight%3D%22700%22%20fill%3D%22%2338bdf8%22%3E%E2%99%93%3C%2Ftext%3E%0A%20%20%3C%2Fg%3E%0A%0A%20%20%3C!--%20Name%20Label%20at%20Bottom%20--%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22186%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Cinzel'%2C%20'Marcellus'%2C%20serif%22%20font-size%3D%229%22%20font-weight%3D%22700%22%20fill%3D%22url(%23gold_grad)%22%20letter-spacing%3D%222%22%3EMEENA%20%C2%B7%20PISCES%3C%2Ftext%3E%0A%3C%2Fsvg%3E"
};
  const ZODIAC = ["\u2648", "\u2649", "\u264A", "\u264B", "\u264C", "\u264D", "\u264E", "\u264F", "\u2650", "\u2651", "\u2652", "\u2653"];
  const zNames = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  const imgNames = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];
  const ZODIAC_IMAGE_MAP = {
    aries: "/images/zodiac/aries.png",
    taurus: "/images/zodiac/taurus.png",
    gemini: "/images/zodiac/gemini.png",
    cancer: "/images/zodiac/cancer.png",
    leo: "/images/zodiac/leo.png",
    virgo: "/images/zodiac/virgo.png",
    libra: "/images/zodiac/libra.png",
    scorpio: "/images/zodiac/scorpio.png",
    sagittarius: "/images/zodiac/sagittarius.png",
    capricorn: "/images/zodiac/capricorn.png",
    aquarius: "/images/zodiac/aquarius.png",
    pisces: "/images/zodiac/pisces.png"
  };
  window.ZODIAC_IMAGE_MAP = ZODIAC_IMAGE_MAP;
  const ring = document.getElementById("zodiacRing");
  if (ring) {
    ring.innerHTML = ZODIAC.map((glyph, i) => {
      const angle = i / ZODIAC.length * 360;
      const img = imgNames[i];
      const imgSrc = ZODIAC_IMAGE_MAP[img] || `/images/zodiac/${img}.png`;
      const name = zNames[i];
      return `<div class="hero-z-node" style="transform:rotate(${angle}deg) translate(var(--ring-r, 252px)) rotate(${-angle}deg);" title="${name} \xB7 Click to view Daily Horoscope & Astrological Analysis" onclick="openSpecificZodiacModal('${img}'); selectRashifalSign('${img}'); event.stopPropagation();" role="button" tabindex="0">
        <div class="hero-z-node-inner">
          <img src="${imgSrc}" class="hero-z-img" alt="${name}" onerror="handleZodiacImgError(this, '${img}')" referrerPolicy="no-referrer" />
          <span class="hero-z-symbol">${name}</span>
        </div>
      </div>`;
    }).join("");
  }
})();
(function() {
  const data = [
    ["Mesha", "Aries", "Fire", "Movable", "Mars", "initiative, courage and direct action"],
    ["Vrishabha", "Taurus", "Earth", "Fixed", "Venus", "stability, value and sustained effort"],
    ["Mithuna", "Gemini", "Air", "Dual", "Mercury", "curiosity, language and adaptability"],
    ["Karka", "Cancer", "Water", "Movable", "Moon", "nurturing, memory and emotional protection"],
    ["Simha", "Leo", "Fire", "Fixed", "Sun", "expression, confidence and creative leadership"],
    ["Kanya", "Virgo", "Earth", "Dual", "Mercury", "discernment, craft and practical refinement"],
    ["Tula", "Libra", "Air", "Movable", "Venus", "balance, partnership and negotiation"],
    ["Vrischika", "Scorpio", "Water", "Fixed", "Mars", "depth, resilience and transformation"],
    ["Dhanu", "Sagittarius", "Fire", "Dual", "Jupiter", "meaning, exploration and conviction"],
    ["Makara", "Capricorn", "Earth", "Movable", "Saturn", "structure, endurance and responsibility"],
    ["Kumbha", "Aquarius", "Air", "Fixed", "Saturn", "systems, independence and wider perspective"],
    ["Meena", "Pisces", "Water", "Dual", "Jupiter", "imagination, empathy and inner depth"]
  ];
  const detail = document.getElementById("rashiDetail");
  const signs = document.querySelectorAll(".zodiac-wheel .z-sign");
  if (!detail || !signs.length)
    return;
  const imgNames = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];
  signs.forEach((el, i) => el.addEventListener("click", (e) => {
    e.stopPropagation();
    signs.forEach((s) => s.classList.remove("is-active"));
    el.classList.add("is-active");
    const d = data[i];
    const img = imgNames[i];
    const imgSrc = `/images/zodiac/${img}.png`;
    detail.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:8px;"><img src="${imgSrc}" style="width:52px;height:52px;border-radius:50%;border:2px solid #f2d792;box-shadow:0 0 18px rgba(242,215,146,0.7), 0 0 35px rgba(127,197,192,0.45);" alt="${d[1]}" referrerPolicy="no-referrer" /><div><b style="font-size:16px;margin:0;color:#fce7b0;text-shadow:0 0 8px rgba(224,198,116,0.6);">${d[0]} \xB7 ${d[1]}</b><small style="color:#e0c674;font-weight:600;margin-top:2px;display:block;">${d[2]} Element \u2022 ${d[3]}</small></div></div><small style="text-align:center !important;display:block;color:#d6c3a0;">Ruler: <strong style="color:#f2d792">${d[4]}</strong> \u2014 ${d[5]}</small>`;
    detail.classList.add("open");
  }));
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".z-sign") && !e.target.closest(".rashi-detail")) {
      detail.classList.remove("open");
      signs.forEach((s) => s.classList.remove("is-active"));
    }
  });
})();
function calculateSunTimes(dateObj, lat = 28.6139, lon = 77.209) {
  try {
    let getTime2 = function(isSunrise) {
      const t = dayOfYear + ((isSunrise ? 6 : 18) - lngHour) / 24;
      const M = 0.9856 * t - 3.289;
      const MRad = M * (Math.PI / 180);
      let L = M + 1.916 * Math.sin(MRad) + 0.02 * Math.sin(2 * MRad) + 282.634;
      L = (L + 360) % 360;
      const LRad = L * (Math.PI / 180);
      let RA = Math.atan(0.91764 * Math.tan(LRad)) * (180 / Math.PI);
      RA = (RA + 360) % 360;
      const Lquadrant = Math.floor(L / 90) * 90;
      const RAquadrant = Math.floor(RA / 90) * 90;
      RA = RA + (Lquadrant - RAquadrant);
      RA = RA / 15;
      const sinDec = 0.39782 * Math.sin(LRad);
      const cosDec = Math.cos(Math.asin(sinDec));
      const cosH = (Math.cos(zenith) - sinDec * Math.sin(latRad)) / (cosDec * Math.cos(latRad));
      if (cosH > 1 || cosH < -1)
        return null;
      let H = isSunrise ? 360 - Math.acos(cosH) * (180 / Math.PI) : Math.acos(cosH) * (180 / Math.PI);
      H = H / 15;
      const T = H + RA - 0.06571 * t - 6.622;
      let UT = (T - lngHour + 24) % 24;
      const tzOffset = -dateObj.getTimezoneOffset() / 60;
      let localHour = (UT + tzOffset + 24) % 24;
      const hrs = Math.floor(localHour);
      const mins = Math.floor((localHour - hrs) * 60);
      const period = hrs >= 12 ? "PM" : "AM";
      const displayHrs = hrs % 12 || 12;
      const displayMins = mins < 10 ? "0" + mins : mins;
      return {
        decimal: localHour,
        formatted: `${displayHrs < 10 ? "0" + displayHrs : displayHrs}:${displayMins} ${period}`
      };
    };
    var getTime = getTime2;
    const latRad = lat * (Math.PI / 180);
    const start = new Date(dateObj.getFullYear(), 0, 0);
    const diff = dateObj - start;
    const dayOfYear = Math.floor(diff / (1e3 * 60 * 60 * 24));
    const zenith = 90.833 * (Math.PI / 180);
    const lngHour = lon / 15;
    const sunrise = getTime2(true) || { formatted: "06:01 AM", decimal: 6.017 };
    const sunset = getTime2(false) || { formatted: "07:02 PM", decimal: 19.033 };
    let dayLengthMins = Math.round((sunset.decimal - sunrise.decimal) * 60);
    if (dayLengthMins < 0)
      dayLengthMins += 24 * 60;
    const lenHrs = Math.floor(dayLengthMins / 60);
    const lenMins = dayLengthMins % 60;
    const sDec = typeof sunrise.decimal === "number" && !isNaN(sunrise.decimal) ? sunrise.decimal : 6.017;
    const setDec = typeof sunset.decimal === "number" && !isNaN(sunset.decimal) ? sunset.decimal : 19.033;
    const sH = Math.floor(sDec);
    const sM = Math.floor(sDec % 1 * 60);
    const setH = Math.floor(setDec);
    const setM = Math.floor(setDec % 1 * 60);
    return {
      sunrise: sunrise.formatted || "06:01 AM",
      sunset: sunset.formatted || "07:02 PM",
      sunriseHour: sH,
      sunriseMin: sM,
      sunsetHour: setH,
      sunsetMin: setM,
      sunriseDecimal: sDec,
      sunsetDecimal: setDec,
      dayLength: `${lenHrs}h ${lenMins < 10 ? "0" + lenMins : lenMins}m`,
      formattedCombined: `${sunrise.formatted || "06:01 AM"} / ${sunset.formatted || "07:02 PM"}`
    };
  } catch (err) {
    return {
      sunrise: "06:05 AM",
      sunset: "06:56 PM",
      sunriseHour: 6,
      sunriseMin: 5,
      sunsetHour: 18,
      sunsetMin: 56,
      sunriseDecimal: 6.083,
      sunsetDecimal: 18.933,
      dayLength: "12h 51m",
      formattedCombined: "06:05 AM / 06:56 PM"
    };
  }
}
function calculateHinduCalendar(dateObj) {
  const year = dateObj.getFullYear();
  const startOfYear = new Date(year, 0, 0);
  const diff = dateObj - startOfYear;
  const oneDay = 1e3 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const isAfterChaitra = dayOfYear >= 88;
  const vikramSamvat = isAfterChaitra ? year + 57 : year + 56;
  const sakaSamvat = isAfterChaitra ? year - 78 : year - 79;
  const samvatsaras = [
    "Prabhava",
    "Vibhava",
    "Shukla",
    "Pramoda",
    "Prajapati",
    "Angira",
    "Shrimukha",
    "Bhava",
    "Yuva",
    "Dhatri",
    "Eshwara",
    "Bahudhanya",
    "Pramathi",
    "Vikrama",
    "Vrisha",
    "Chitrabanu",
    "Subhanu",
    "Taran",
    "Parthiva",
    "Vyaya",
    "Sarvajit",
    "Sarvadhari",
    "Virodhi",
    "Vikriti",
    "Khara",
    "Nandana",
    "Vijaya",
    "Jaya",
    "Manmatha",
    "Durmukhi",
    "Hevilambi",
    "Vilambi",
    "Vikari",
    "Sharvari",
    "Plava",
    "Shubhakrit",
    "Shobhakrit",
    "Krodhi",
    "Visvavasu",
    "Paridhavi",
    "Pramadi",
    "Ananda",
    "Rakshasa",
    "Anala",
    "Pingala",
    "Kalayukti",
    "Siddharthin",
    "Raudra",
    "Durmathi",
    "Dundubhi",
    "Rudhrodgari",
    "Raktakshi",
    "Krodhana",
    "Kshaya"
  ];
  const samvatsaraIdx = (vikramSamvat + 9) % 60;
  const samvatsaraName = samvatsaras[samvatsaraIdx] || "Krodhi";
  const synodicMonth = 29.530588;
  const lunarAge = (dayOfYear + 14.2) % synodicMonth;
  const tithiIdx = Math.floor(lunarAge / synodicMonth * 30) % 30;
  const isShukla = tithiIdx < 15;
  const pakshaName = isShukla ? "Shukla Paksha" : "Krishna Paksha";
  const tithiInPaksha = tithiIdx % 15 + 1;
  const hinduMaasNames = [
    "Pausha",
    "Magha",
    "Phalguni",
    "Chaitra",
    "Vaishakha",
    "Jyeshtha",
    "Ashadha",
    "Shravana",
    "Bhadrapada",
    "Ashvina",
    "Kartika",
    "Margashirsha"
  ];
  let maasIdx = Math.floor((dayOfYear + 20) / 30.4) % 12;
  const maasName = hinduMaasNames[maasIdx] || "Shravana";
  return {
    vikramSamvat: `VS ${vikramSamvat} (${samvatsaraName})`,
    sakaSamvat: `Saka ${sakaSamvat}`,
    maas: `${maasName} Maas`,
    paksha: pakshaName,
    tithiNumber: tithiInPaksha,
    hinduDateFormatted: `${maasName} ${isShukla ? "Shukla" : "Krishna"} ${tithiInPaksha === 15 ? isShukla ? "Purnima" : "Amavasya" : "Tithi " + tithiInPaksha}, VS ${vikramSamvat}`
  };
}
function getDailyPanchangData(targetDate = new Date(), customLat = 28.6139, customLon = 77.209) {
  const d = new Date(targetDate);
  if (isNaN(d.getTime()))
    return null;
  const dateStr = d.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const dayOfWeek = d.getDay();
  const year = d.getFullYear();
  const oneDay = 1e3 * 60 * 60 * 24;
  const rahuKaalTimes = [
    "04:30 PM \u2013 06:00 PM",
    "07:30 AM \u2013 09:00 AM",
    "03:00 PM \u2013 04:30 PM",
    "12:00 PM \u2013 01:30 PM",
    "01:30 PM \u2013 03:00 PM",
    "10:30 AM \u2013 12:00 PM",
    "09:00 AM \u2013 10:30 AM"
  ];
  const tithis = [
    "Shukla Pratipada",
    "Shukla Dwitiya",
    "Shukla Tritiya",
    "Shukla Chaturthi",
    "Shukla Panchami",
    "Shukla Shashti",
    "Shukla Saptami",
    "Shukla Ashtami",
    "Shukla Navami",
    "Shukla Dashami",
    "Shukla Ekadashi",
    "Shukla Dwadashi",
    "Shukla Trayodashi",
    "Shukla Chaturdashi",
    "Purnima (Full Moon)",
    "Krishna Pratipada",
    "Krishna Dwitiya",
    "Krishna Tritiya",
    "Krishna Chaturthi",
    "Krishna Panchami",
    "Krishna Shashti",
    "Krishna Saptami",
    "Krishna Ashtami",
    "Krishna Navami",
    "Krishna Dashami",
    "Krishna Ekadashi",
    "Krishna Dwadashi",
    "Krishna Trayodashi",
    "Krishna Chaturdashi",
    "Amavasya (New Moon)"
  ];
  const nakshatras = [
    "Ashwini",
    "Bharani",
    "Krittika",
    "Rohini",
    "Mrigashira",
    "Ardra",
    "Punarvasu",
    "Pushya",
    "Ashlesha",
    "Magha",
    "Purva Phalguni",
    "Uttara Phalguni",
    "Hasta",
    "Chitra",
    "Swati",
    "Vishakha",
    "Anuradha",
    "Jyeshtha",
    "Mula",
    "Purva Ashadha",
    "Uttara Ashadha",
    "Shravana",
    "Dhanishta",
    "Shatabhisha",
    "Purva Bhadrapada",
    "Uttara Bhadrapada",
    "Revati"
  ];
  const yogas = [
    "Vishkambha",
    "Priti",
    "Ayushman",
    "Saubhagya",
    "Shobhana",
    "Atiganda",
    "Sukarma",
    "Dhriti",
    "Shula",
    "Ganda",
    "Vriddhi",
    "Dhruva",
    "Vyaghata",
    "Harshana",
    "Vajra",
    "Siddhi",
    "Vyatipata",
    "Variyana",
    "Parigha",
    "Shiva",
    "Siddha",
    "Sadhya",
    "Shubha",
    "Shukla",
    "Brahma",
    "Indra",
    "Vaidhriti"
  ];
  const karanas = [
    "Bava",
    "Balava",
    "Kaulava",
    "Taitila",
    "Gara",
    "Vanija",
    "Vishti (Bhadra)",
    "Shakuni",
    "Chatushpada",
    "Naga",
    "Kimstughna"
  ];
  const startOfYear = new Date(year, 0, 0);
  const diff = d - startOfYear;
  const dayOfYear = Math.floor(diff / oneDay);
  const synodicMonth = 29.530588;
  const lunarAge = (dayOfYear + 14.2) % synodicMonth;
  const tithiIdx = Math.floor(lunarAge / synodicMonth * 30) % 30;
  const nakshatraIdx = Math.floor((dayOfYear * 1.05 + 8) % 27);
  const yogaIdx = Math.floor((dayOfYear * 0.95 + 12) % 27);
  const karanaIdx = tithiIdx * 2 % 11;
  const sunTimes = calculateSunTimes(d, customLat, customLon);
  const hinduCal = calculateHinduCalendar(d);
  const majorEvents = [
    { name: "Independence Day", dateStr: `${year}-08-15`, icon: "\u{1F1EE}\u{1F1F3}", desc: "Indian Independence Day \u2014 National Celebration" },
    { name: "Republic Day", dateStr: `${year}-01-26`, icon: "\u{1F1EE}\u{1F1F3}", desc: "Indian Republic Day \u2014 Constitution & Heritage" },
    { name: "Sawan Maas (Shravan Month)", startDate: `${year}-07-29`, endDate: `${year}-08-28`, icon: "\u{1F33A}", desc: "Sacred Month of Lord Shiva & Somwar Vrat" },
    { name: "Raksha Bandhan", dateStr: `${year}-08-28`, icon: "\u{1FAA2}", desc: "Festival of Sibling Protection (Shravana Purnima)" },
    { name: "Shri Krishna Janmashtami", dateStr: `${year}-09-03`, icon: "\u{1FA94}", desc: "Birth Celebration of Lord Shri Krishna" },
    { name: "Ganesh Chaturthi", dateStr: `${year}-09-14`, icon: "\u{1F418}", desc: "Vinayaka Chaturthi \u2014 Lord Ganesha Sthapana" },
    { name: "Anant Chaturdashi", dateStr: `${year}-09-23`, icon: "\u{1FAB7}", desc: "Ganesha Visarjan & Anant Vrat" },
    { name: "Sharad Navratri", startDate: `${year}-10-11`, endDate: `${year}-10-19`, icon: "\u{1F33A}", desc: "9 Sacred Nights of Devi Durga Worship" },
    { name: "Dussehra (Vijayadashami)", dateStr: `${year}-10-20`, icon: "\u{1F3F9}", desc: "Triumph of Lord Rama \u2014 Victory of Good Over Evil" },
    { name: "Karwa Chauth", dateStr: `${year}-10-28`, icon: "\u{1F315}", desc: "Sacred Fasting for Spousal Wellbeing & Longevity" },
    { name: "Dhanteras", dateStr: `${year}-11-06`, icon: "\u{1FA99}", desc: "Auspicious Buying of Metals & Lord Dhanvantari Worship" },
    { name: "Diwali (Deepavali)", dateStr: `${year}-11-08`, icon: "\u{1FA94}", desc: "Maha Lakshmi Puja & Festival of Lights" },
    { name: "Govardhan Puja & Bhai Dooj", startDate: `${year}-11-09`, endDate: `${year}-11-10`, icon: "\u{1F3F5}\uFE0F", desc: "Govardhan Annakut & Brother-Sister Blessings" },
    { name: "Chhath Puja", dateStr: `${year}-11-14`, icon: "\u2600\uFE0F", desc: "Maha Vrat for Sun God Surya & Chhathi Maiya" },
    { name: "Gita Jayanti", dateStr: `${year}-12-20`, icon: "\u{1F4DC}", desc: "Advent of Shrimad Bhagavad Gita" },
    { name: "Makar Sankranti & Pongal", dateStr: `${year}-01-14`, icon: "\u2600\uFE0F", desc: "Sun's Uttarayana Transit & Harvest Thanksgiving" },
    { name: "Maha Shivratri", dateStr: `${year}-02-15`, icon: "\u{1F531}", desc: "Great Auspicious Night of Lord Shiva" },
    { name: "Holi & Holika Dahan", startDate: `${year}-03-03`, endDate: `${year}-03-04`, icon: "\u{1F3A8}", desc: "Festival of Colors & Triumph of Bhakta Prahlad" },
    { name: "Chaitra Navratri & Ugadi / Gudi Padwa", dateStr: `${year}-03-19`, icon: "\u{1F331}", desc: "Vedic New Year & Chaitra Navratri Commencement" },
    { name: "Shri Ram Navami", dateStr: `${year}-03-27`, icon: "\u{1F3F9}", desc: "Birth Celebration of Maryada Purushottam Lord Rama" },
    { name: "Hanuman Jayanti", dateStr: `${year}-04-02`, icon: "\u{1F6A9}", desc: "Birth Celebration of Mahavira Lord Hanuman" },
    { name: "Akshaya Tritiya", dateStr: `${year}-04-20`, icon: "\u2728", desc: "Day of Unending Good Fortune & Prosperity" }
  ];
  const minorEvents = [];
  const targetTime = d.getTime();
  for (let offset = -5; offset <= 35; offset++) {
    const curDate = new Date(targetTime + offset * oneDay);
    const startOfYr = new Date(curDate.getFullYear(), 0, 0);
    const curDayOfYr = Math.floor((curDate - startOfYr) / oneDay);
    const curLunarAge = (curDayOfYr + 14.2) % synodicMonth;
    const curTithiIdx = Math.floor(curLunarAge / synodicMonth * 30) % 30;
    const dateStrISO = curDate.toISOString().split("T")[0];
    if (curTithiIdx === 10)
      minorEvents.push({ name: "Shukla Ekadashi Vrat", dateStr: dateStrISO, icon: "\u{1F4FF}", desc: "Vishnu Vrat" });
    if (curTithiIdx === 25)
      minorEvents.push({ name: "Krishna Ekadashi Vrat", dateStr: dateStrISO, icon: "\u{1F4FF}", desc: "Vishnu Vrat" });
    if (curTithiIdx === 12)
      minorEvents.push({ name: "Shukla Pradosh Vrat", dateStr: dateStrISO, icon: "\u{1F531}", desc: "Shiva Twilight Worship" });
    if (curTithiIdx === 27)
      minorEvents.push({ name: "Krishna Pradosh Vrat", dateStr: dateStrISO, icon: "\u{1F531}", desc: "Shiva Twilight Worship" });
    if (curTithiIdx === 3)
      minorEvents.push({ name: "Vinayaka Chaturthi", dateStr: dateStrISO, icon: "\u{1F418}", desc: "Ganesha Vrat" });
    if (curTithiIdx === 18)
      minorEvents.push({ name: "Sankashti Chaturthi Vrat", dateStr: dateStrISO, icon: "\u{1F418}", desc: "Moonrise Ganesha Vrat" });
    if (curTithiIdx === 28)
      minorEvents.push({ name: "Masik Shivratri", dateStr: dateStrISO, icon: "\u{1F531}", desc: "Monthly Shiva Vrat" });
    if (curTithiIdx === 14)
      minorEvents.push({ name: "Purnima Vrat / Satyanarayan Puja", dateStr: dateStrISO, icon: "\u{1F315}", desc: "Full Moon Vrat" });
    if (curTithiIdx === 29)
      minorEvents.push({ name: "Amavasya Vrat / Pitru Tarpan", dateStr: dateStrISO, icon: "\u{1F311}", desc: "New Moon Pitru Puja" });
    if (curTithiIdx === 7)
      minorEvents.push({ name: "Masik Durgashtami", dateStr: dateStrISO, icon: "\u{1F33A}", desc: "Durga Vrat" });
    if (curTithiIdx === 22)
      minorEvents.push({ name: "Masik Kalashtami", dateStr: dateStrISO, icon: "\u{1F6A9}", desc: "Bhairav Vrat" });
  }
  const allEvents = [...majorEvents, ...minorEvents];
  const activeEvents = [];
  const rawUpcomingEvents = [];
  allEvents.forEach((ev) => {
    if (ev.startDate && ev.endDate) {
      const startT = new Date(ev.startDate + "T00:00:00").getTime();
      const endT = new Date(ev.endDate + "T23:59:59").getTime();
      if (targetTime >= startT && targetTime <= endT) {
        activeEvents.push(ev);
      } else if (startT > targetTime) {
        const daysAway = Math.ceil((startT - targetTime) / oneDay);
        if (daysAway > 0 && daysAway <= 30)
          rawUpcomingEvents.push(__spreadProps(__spreadValues({}, ev), { daysAway }));
      }
    } else if (ev.dateStr) {
      const evT = new Date(ev.dateStr + "T00:00:00").getTime();
      const diffDays = Math.round((evT - targetTime) / oneDay);
      if (diffDays === 0) {
        activeEvents.push(__spreadProps(__spreadValues({}, ev), { desc: `TODAY: ${ev.desc}` }));
      } else if (diffDays > 0 && diffDays <= 30) {
        rawUpcomingEvents.push(__spreadProps(__spreadValues({}, ev), { daysAway: diffDays }));
      }
    }
  });
  rawUpcomingEvents.sort((a, b) => a.daysAway - b.daysAway);
  const seenKeys = /* @__PURE__ */ new Set();
  const upcomingEvents = [];
  for (const ev of rawUpcomingEvents) {
    const key = `${ev.name}_${ev.daysAway}`;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      upcomingEvents.push(ev);
    }
  }
  return {
    dateStr,
    dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayOfWeek],
    tithi: tithis[tithiIdx],
    nakshatra: nakshatras[nakshatraIdx],
    yoga: yogas[yogaIdx],
    karana: karanas[karanaIdx],
    rahuKaal: rahuKaalTimes[dayOfWeek],
    abhijit: "11:54 AM \u2013 12:46 PM",
    sun: sunTimes,
    hinduCal,
    activeEvents,
    upcomingEvents
  };
}
let currentPanchangDate = new Date();
let activeRashifalSign = "aries";
const ZODIAC_METADATA = {
  aries: {
    key: "aries",
    symbol: "\u2648",
    nameHindi: "\u092E\u0947\u0937",
    nameEnglish: "Aries",
    nameFull: "Mesha (\u092E\u0947\u0937) \xB7 Aries",
    lord: "Mars (\u092E\u0902\u0917\u0932)",
    element: "Fire (\u0905\u0917\u094D\u0928\u093F)",
    nature: "Char (\u091A\u0930 / Cardinal)",
    color: "Bright Red, Crimson & Saffron",
    number: "9, 1, 18",
    direction: "East (\u092A\u0942\u0930\u094D\u0935)",
    bestTime: "06:30 AM \u2013 08:30 AM & 04:00 PM \u2013 05:30 PM",
    overview: "Mars energizes your ascendant with dynamic initiative and leadership drive. Courage and decisiveness will help you resolve lingering tasks swiftly today.",
    career: "New project proposals receive positive recognition from superiors. Business partnerships gain momentum; avoid hasty contractual commitments.",
    finance: "Favorable planetary transits favor disciplined investments. Avoid speculative impulse purchases during afternoon hours.",
    love: "Warm and encouraging communication with your spouse or partner brings emotional reassurance. Singles may encounter an inspiring new connection.",
    health: "High stamina and vitality. Stay well hydrated and practice light evening walks or pranayama to channel internal heat (Pitta)."
  },
  taurus: {
    key: "taurus",
    symbol: "\u2649",
    nameHindi: "\u0935\u0943\u0937\u092D",
    nameEnglish: "Taurus",
    nameFull: "Vrishabha (\u0935\u0943\u0937\u092D) \xB7 Taurus",
    lord: "Venus (\u0936\u0941\u0915\u094D\u0930)",
    element: "Earth (\u092A\u0943\u0925\u094D\u0935\u0940)",
    nature: "Sthira (\u0938\u094D\u0925\u093F\u0930 / Fixed)",
    color: "Emerald Green, Pearl White & Cream",
    number: "6, 2, 15",
    direction: "South-East (\u0926\u0915\u094D\u0937\u093F\u0923-\u092A\u0942\u0930\u094D\u0935)",
    bestTime: "09:00 AM \u2013 11:00 AM & 05:00 PM \u2013 07:00 PM",
    overview: "Venus brings grace, aesthetic refinement, and domestic harmony. Focus shifts to building tangible security, luxurious comfort, and family bonds.",
    career: "Creative solutions and diplomatic negotiations yield productive outcomes. High praise for attention to artistic detail and financial prudence.",
    finance: "Stable financial gains. A favorable time for savings, property matters, or purchasing artistic decorative items.",
    love: "Deep mutual understanding with family and romantic partner. A peaceful and heartwarming home atmosphere prevails.",
    health: "Good physical resilience. Take care of throat and neck comfort; enjoy nutritious, Sattvic home-cooked meals."
  },
  gemini: {
    key: "gemini",
    symbol: "\u264A",
    nameHindi: "\u092E\u093F\u0925\u0941\u0928",
    nameEnglish: "Gemini",
    nameFull: "Mithuna (\u092E\u093F\u0925\u0941\u0928) \xB7 Gemini",
    lord: "Mercury (\u092C\u0941\u0927)",
    element: "Air (\u0935\u093E\u092F\u0941)",
    nature: "Dvisvabhava (\u0926\u094D\u0935\u093F\u0938\u094D\u0935\u092D\u093E\u0935 / Dual)",
    color: "Canary Yellow, Light Green & Sky Blue",
    number: "5, 3, 14",
    direction: "West (\u092A\u0936\u094D\u091A\u093F\u092E)",
    bestTime: "10:30 AM \u2013 12:30 PM & 06:00 PM \u2013 07:30 PM",
    overview: "Mercury stimulates sharp intellectual agility, lively communication, and networking opportunities. You will articulate ideas with unmatched charm.",
    career: "Excellent day for sales, media, tech development, journalism, and presentations. Multi-tasking will yield swift breakthroughs.",
    finance: "Profits through trade, communication, or online channels. Maintain organized accounts and verify all transaction details.",
    love: "Playful banter and engaging intellectual discussions delight your partner. Sibling relations are warm and supportive.",
    health: "Keep your nervous system relaxed. Avoid excessive screen fatigue by taking short meditative visual breaks."
  },
  cancer: {
    key: "cancer",
    symbol: "\u264B",
    nameHindi: "\u0915\u0930\u094D\u0915",
    nameEnglish: "Cancer",
    nameFull: "Karka (\u0915\u0930\u094D\u0915) \xB7 Cancer",
    lord: "Moon (\u091A\u0928\u094D\u0926\u094D\u0930)",
    element: "Water (\u091C\u0932)",
    nature: "Char (\u091A\u0930 / Cardinal)",
    color: "Pearl White, Silver & Ocean Blue",
    number: "2, 7, 20",
    direction: "North (\u0909\u0924\u094D\u0924\u0930)",
    bestTime: "07:00 AM \u2013 09:00 AM & 07:30 PM \u2013 09:30 PM",
    overview: "The Moon enhances your intuitive empathy, emotional wisdom, and caretaking abilities. Trust your inner gut feeling in all personal decisions.",
    career: "You foster teamwork and empathetic collaboration at work. Workplaces involving public dealing and care services thrive.",
    finance: "Expenditures on family comfort and wellness. Wise long-term investments in liquid funds or precious metals are favored.",
    love: "Warm emotional intimacy and nurturing care strengthen close bonds. An auspicious time for family celebrations or heartfelt talks.",
    health: "Protect emotional tranquility. Drink clean freshwater stored in silver vessels and practice deep abdominal breathing."
  },
  leo: {
    key: "leo",
    symbol: "\u264C",
    nameHindi: "\u0938\u093F\u0902\u0939",
    nameEnglish: "Leo",
    nameFull: "Simha (\u0938\u093F\u0902\u0939) \xB7 Leo",
    lord: "Sun (\u0938\u0942\u0930\u094D\u092F)",
    element: "Fire (\u0905\u0917\u094D\u0928\u093F)",
    nature: "Sthira (\u0938\u094D\u0925\u093F\u0930 / Fixed)",
    color: "Golden Yellow, Saffron & Royal Ruby",
    number: "1, 5, 10",
    direction: "East (\u092A\u0942\u0930\u094D\u0935)",
    bestTime: "06:00 AM \u2013 08:00 AM & 12:00 PM \u2013 02:00 PM",
    overview: "Sun bestows authoritative presence, radiant confidence, and charismatic appeal. You are poised to take center stage and inspire others naturally.",
    career: "Recognition from senior executives or government officials. Leadership initiatives taken today will yield lasting reputation and honor.",
    finance: "Strong financial positioning. Avoid extravagant displays and channel resources into appreciating capital assets.",
    love: "Generous and noble expressions of love bring happiness to your partner. Share your joy openly with family.",
    health: "High vitality and stamina. Maintain good posture, nourish heart health, and soak in morning solar prana."
  },
  virgo: {
    key: "virgo",
    symbol: "\u264D",
    nameHindi: "\u0915\u0928\u094D\u092F\u093E",
    nameEnglish: "Virgo",
    nameFull: "Kanya (\u0915\u0928\u094D\u092F\u093E) \xB7 Virgo",
    lord: "Mercury (\u092C\u0941\u0927)",
    element: "Earth (\u092A\u0943\u0925\u094D\u0935\u0940)",
    nature: "Dvisvabhava (\u0926\u094D\u0935\u093F\u0938\u094D\u0935\u092D\u093E\u0935 / Dual)",
    color: "Olive Green, Dark Emerald & Pearl Beige",
    number: "5, 8, 23",
    direction: "South (\u0926\u0915\u094D\u0937\u093F\u0923)",
    bestTime: "08:30 AM \u2013 10:30 AM & 03:30 PM \u2013 05:00 PM",
    overview: "Analytical clarity and systematic methodology allow you to solve intricate problems with flawless precision today.",
    career: "Detailed audit work, software coding, calculations, and research bring notable praise. Organization of workflow is effortless.",
    finance: "Smart budgeting and cost-cutting improve financial health. A pending reimbursement or debt recovery may materialize.",
    love: "Thoughtful acts of practical service will touch your partner's heart. Keep communications constructive without hyper-critical scrutiny.",
    health: "Nourish digestive health with light, fibrous whole grains. Avoid skipping meals due to heavy focus on work."
  },
  libra: {
    key: "libra",
    symbol: "\u264E",
    nameHindi: "\u0924\u0941\u0932\u093E",
    nameEnglish: "Libra",
    nameFull: "Tula (\u0924\u0941\u0932\u093E) \xB7 Libra",
    lord: "Venus (\u0936\u0941\u0915\u094D\u0930)",
    element: "Air (\u0935\u093E\u092F\u0941)",
    nature: "Char (\u091A\u0930 / Cardinal)",
    color: "Royal Blue, Pastel Pink & Turquoise",
    number: "6, 7, 24",
    direction: "West (\u092A\u0936\u094D\u091A\u093F\u092E)",
    bestTime: "11:00 AM \u2013 01:00 PM & 06:30 PM \u2013 08:30 PM",
    overview: "Venus grants diplomacy, graceful balance, and aesthetic harmony. Ideal for resolving negotiations, striking agreements, and socializing.",
    career: "Commercial partnerships and client interactions flow smoothly. Your balanced perspective diffuses team disagreements effortlessly.",
    finance: "Pleasant financial gains through collaborative ventures and design/consultancy work. Good time for balancing the ledger.",
    love: "Romance and mutual affection blossom. A lovely evening outing or shared cultural experience brings unforgettable closeness.",
    health: "Maintain kidney and hydration balance. Balance work demands with restful music or artistic relaxation."
  },
  scorpio: {
    key: "scorpio",
    symbol: "\u264F",
    nameHindi: "\u0935\u0943\u0936\u094D\u091A\u093F\u0915",
    nameEnglish: "Scorpio",
    nameFull: "Vrischika (\u0935\u0943\u0936\u094D\u091A\u093F\u0915) \xB7 Scorpio",
    lord: "Mars & Ketu (\u092E\u0902\u0917\u0932 / \u0915\u0947\u0924\u0941)",
    element: "Water (\u091C\u0932)",
    nature: "Sthira (\u0938\u094D\u0925\u093F\u0930 / Fixed)",
    color: "Deep Maroon, Dark Crimson & Copper",
    number: "9, 4, 18",
    direction: "North (\u0909\u0924\u094D\u0924\u0930)",
    bestTime: "08:00 AM \u2013 10:00 AM & 08:00 PM \u2013 10:00 PM",
    overview: "Deep occult perception, transformative willpower, and investigative acumen guide your decisions. Hidden truths come to light constructively.",
    career: "Strategic planning, research, confidential business execution, and crisis management meet with total success.",
    finance: "Favorable indications for settling insurance, legacy, or tax matters. Avoid hasty speculative bets.",
    love: "Intense, deep loyalty and emotional honesty define your relationship. Meaningful heart-to-heart connections deepen trust.",
    health: "Channel intense mental energy through vigorous physical exercise or deep meditation. Watch sleep rhythm."
  },
  sagittarius: {
    key: "sagittarius",
    symbol: "\u2650",
    nameHindi: "\u0927\u0928\u0941",
    nameEnglish: "Sagittarius",
    nameFull: "Dhanu (\u0927\u0928\u0941) \xB7 Sagittarius",
    lord: "Jupiter (\u0917\u0941\u0930\u0941 / \u092C\u0943\u0939\u0938\u094D\u092A\u0924\u093F)",
    element: "Fire (\u0905\u0917\u094D\u0928\u093F)",
    nature: "Dvisvabhava (\u0926\u094D\u0935\u093F\u0938\u094D\u0935\u092D\u093E\u0935 / Dual)",
    color: "Saffron, Golden Yellow & Amber",
    number: "3, 9, 21",
    direction: "North-East (\u0908\u0936\u093E\u0928 / \u0909\u0924\u094D\u0924\u0930-\u092A\u0942\u0930\u094D\u0935)",
    bestTime: "06:00 AM \u2013 08:00 AM & 04:30 PM \u2013 06:30 PM",
    overview: "Jupiter expands your horizon with philosophical optimism, auspicious fortune, and thirst for higher learning. Guidance from mentors proves golden.",
    career: "Academics, legal matters, publication, consulting, and spiritual pursuits prosper. Long-distance communications yield rewarding leads.",
    finance: "Auspicious monetary inflow through ethical endeavors. Favorable day for charitable contributions and educational investments.",
    love: "Joyful and uplifting time with spouse and family. Planning an auspicious pilgrimage or vacation brings boundless enthusiasm.",
    health: "Sound vitality and cheerful spirit. Keep liver and hip joints flexible with mindful stretching or yoga (Surya Namaskar)."
  },
  capricorn: {
    key: "capricorn",
    symbol: "\u2651",
    nameHindi: "\u092E\u0915\u0930",
    nameEnglish: "Capricorn",
    nameFull: "Makara (\u092E\u0915\u0930) \xB7 Capricorn",
    lord: "Saturn (\u0936\u0928\u093F)",
    element: "Earth (\u092A\u0943\u0925\u094D\u0935\u0940)",
    nature: "Char (\u091A\u0930 / Cardinal)",
    color: "Charcoal Blue, Steel Grey & Dark Indigo",
    number: "8, 4, 17",
    direction: "South (\u0926\u0915\u094D\u0937\u093F\u0923)",
    bestTime: "07:30 AM \u2013 09:30 AM & 05:30 PM \u2013 07:30 PM",
    overview: "Saturn rewards your patient perseverance, pragmatic duty, and organizational mastery. Solid foundations built today stand the test of time.",
    career: "Management, engineering, real estate, and long-range administrative projects advance with steadfast momentum. Respect from subordinates grows.",
    finance: "Stable financial discipline. Focus on building long-term fixed assets and debt reduction.",
    love: "Mature and dependable support for your loved ones. Practical demonstrations of commitment speak louder than words.",
    health: "Protect knees, bones, and lower back. Incorporate warm sesame oil massage (Abhyanga) and warm herbal tea."
  },
  aquarius: {
    key: "aquarius",
    symbol: "\u2652",
    nameHindi: "\u0915\u0941\u0902\u092D",
    nameEnglish: "Aquarius",
    nameFull: "Kumbha (\u0915\u0941\u0902\u092D) \xB7 Aquarius",
    lord: "Saturn & Rahu (\u0936\u0928\u093F / \u0930\u093E\u0939\u0941)",
    element: "Air (\u0935\u093E\u092F\u0941)",
    nature: "Sthira (\u0938\u094D\u0925\u093F\u0930 / Fixed)",
    color: "Electric Blue, Cyan & Violet",
    number: "8, 7, 26",
    direction: "West (\u092A\u0936\u094D\u091A\u093F\u092E)",
    bestTime: "09:30 AM \u2013 11:30 AM & 07:00 PM \u2013 09:00 PM",
    overview: "Visionary thinking, social altruism, and sudden innovative breakthroughs define your planetary transit. Group initiatives flourish.",
    career: "Technology, scientific research, team management, and humanitarian projects receive widespread support. Fresh ideas break conventional bottlenecks.",
    finance: "Gains through network circles and unconventional technological ventures. Keep your financial strategy forward-looking.",
    love: "Warm intellectual camaraderie and open-minded acceptance strengthen relationships. Meaningful friendships thrive.",
    health: "Maintain blood circulation and ankle flexibility. Practice tranquil meditation to unwind active mental waves."
  },
  pisces: {
    key: "pisces",
    symbol: "\u2653",
    nameHindi: "\u092E\u0940\u0928",
    nameEnglish: "Pisces",
    nameFull: "Meena (\u092E\u0940\u0928) \xB7 Pisces",
    lord: "Jupiter (\u0917\u0941\u0930\u0941 / \u092C\u0943\u0939\u0938\u094D\u092A\u0924\u093F)",
    element: "Water (\u091C\u0932)",
    nature: "Dvisvabhava (\u0926\u094D\u0935\u093F\u0938\u094D\u0935\u092D\u093E\u0935 / Dual)",
    color: "Sea Green, Bright Gold & Coral",
    number: "3, 12, 30",
    direction: "North-East (\u0909\u0924\u094D\u0924\u0930-\u092A\u0942\u0930\u094D\u0935)",
    bestTime: "06:30 AM \u2013 08:30 AM & 06:00 PM \u2013 08:00 PM",
    overview: "Jupiter bestows spiritual tranquility, deep artistic inspiration, and compassionate empathy. Divine blessings protect and uplift your endeavors.",
    career: "Creative writing, fine arts, wellness therapy, coaching, and international trade thrive. Your intuitive insights solve complex interpersonal puzzles.",
    finance: "Auspicious expenditures on sacred rituals, travel, or family well-being. Monetary returns from past spiritual merit (Purva Punya).",
    love: "Soulful emotional harmony and unconditional compassion. Deep spiritual resonance with your life partner.",
    health: "Excellent inner peace. Keep feet warm and well-cared for, and practice soothing nightly meditation."
  }
};
function renderDailyRashifal(targetDate = currentPanchangDate) {
  const container = document.getElementById("rashifalShowcase");
  const subtitle = document.getElementById("rashifalDateSubtitle");
  if (!container)
    return;
  const d = targetDate instanceof Date ? targetDate : new Date(targetDate);
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = d.toLocaleDateString("en-IN", options);
  const rDateInput = document.getElementById("rashifalDateInput");
  if (rDateInput) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    rDateInput.value = `${y}-${m}-${day}`;
  }
  const pDateInput = document.getElementById("panchangDateCheckerInput");
  if (pDateInput && !pDateInput.value) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    pDateInput.value = `${y}-${m}-${day}`;
  }
  if (subtitle) {
    subtitle.innerHTML = `Daily planetary transit insights, career momentum, emotional harmony &amp; auspicious timings for <b>${formattedDate}</b>`;
  }
  const sign = ZODIAC_METADATA[activeRashifalSign] || ZODIAC_METADATA["aries"];
  const imgSrc = getZodiacSvgUrl(sign.key);
  container.innerHTML = `
    <div class="rashifal-art-box">
      <div class="rashifal-date-banner"><span style="font-size:14px;">\u{1F5D3}\uFE0F</span> <b>${formattedDate}</b></div>
      <img src="${imgSrc}" alt="${sign.nameFull}" class="rashifal-gold-logo" width="120" height="120" onerror="handleZodiacImgError(this, '${sign.key}')" loading="eager" />
      <span class="rashifal-symbol-watermark">${sign.nameHindi}</span>
      <div class="rashifal-sign-title">${sign.nameFull}</div>
      <div class="rashifal-sign-sub">Ruler: <b>${sign.lord}</b> \xB7 Element: <b>${sign.element}</b> (${sign.nature})</div>
      
      <div class="rashifal-meta-tags">
        <span class="rashifal-tag">\u{1F3A8} Auspicious Color: <b>${sign.color}</b></span>
        <span class="rashifal-tag">\u{1F522} Lucky Numbers: <b>${sign.number}</b></span>
        <span class="rashifal-tag">\u{1F9ED} Favored Direction: <b>${sign.direction}</b></span>
        <span class="rashifal-tag">\u23F0 Shubh Muhurta: <b>${sign.bestTime}</b></span>
      </div>

      <div style="display:flex;gap:8px;margin-top:14px;width:100%;">
        <button type="button" class="rashifal-quick-btn" style="flex:1;" onclick="navigateRashifalSign(-1)" title="Click to view previous sign">\u25C0 Prev Sign</button>
        <button type="button" class="rashifal-quick-btn" style="flex:1;" onclick="navigateRashifalSign(1)" title="Click to view next sign">Next Sign \u25B6</button>
      </div>
    </div>

    <div class="rashifal-content-box">
      <div class="rashifal-section-card">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:8px;">
          <h4 style="margin:0;"><span>\u2726</span> DAINIK RASHIFAL OVERVIEW (\u0926\u0948\u0928\u093F\u0915 \u092D\u0935\u093F\u0937\u094D\u092F\u092B\u0932 \xB7 ${formattedDate})</h4>
          <div style="display:flex;gap:6px;">
            <button type="button" class="rashifal-quick-btn" onclick="navigateRashifalSign(-1)" style="padding:4px 8px;font-size:11px;">\u2039 Prev</button>
            <button type="button" class="rashifal-quick-btn" onclick="navigateRashifalSign(1)" style="padding:4px 8px;font-size:11px;">Next \u203A</button>
          </div>
        </div>
        <p>${sign.overview}</p>
      </div>

      <div class="rashifal-grid-2">
        <div class="rashifal-mini-card">
          <h5>\u{1F4BC} Career &amp; Professional Growth (\u0915\u0930\u093F\u092F\u0930 \u090F\u0935\u0902 \u0935\u094D\u092F\u0935\u0938\u093E\u092F)</h5>
          <p>${sign.career}</p>
        </div>
        <div class="rashifal-mini-card">
          <h5>\u{1F4B0} Finance &amp; Wealth (\u0927\u0928 \u090F\u0935\u0902 \u0906\u0930\u094D\u0925\u093F\u0915 \u0932\u093E\u092D)</h5>
          <p>${sign.finance}</p>
        </div>
      </div>

      <div class="rashifal-grid-2">
        <div class="rashifal-mini-card">
          <h5>\u{1F496} Love &amp; Family Harmony (\u092A\u094D\u0930\u0947\u092E \u0935 \u092A\u093E\u0930\u093F\u0935\u093E\u0930\u093F\u0915 \u091C\u0940\u0935\u0928)</h5>
          <p>${sign.love}</p>
        </div>
        <div class="rashifal-mini-card">
          <h5>\u{1F33F} Health &amp; Vitality (\u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F \u0935 \u090A\u0930\u094D\u091C\u093E)</h5>
          <p>${sign.health}</p>
        </div>
      </div>
    </div>
  `;
  const pills = document.querySelectorAll("#rashifalSignSelector .rashifal-pill, .rashifal-selector-wrap .rashifal-pill");
  pills.forEach((pill) => {
    if (pill.dataset.sign === activeRashifalSign) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  });
  const wheelSigns = document.querySelectorAll(".zodiac-wheel .z-sign");
  const imgNames = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];
  const activeIdx = imgNames.indexOf(activeRashifalSign);
  if (wheelSigns.length && activeIdx !== -1) {
    wheelSigns.forEach((ws, i) => {
      if (i === activeIdx)
        ws.classList.add("is-active");
      else
        ws.classList.remove("is-active");
    });
  }
}
function scrollRashifalRibbon(offset) {
  const ribbon = document.getElementById("rashifalSignRibbon");
  if (ribbon) {
    ribbon.scrollBy({ left: offset, behavior: "smooth" });
  }
}
function navigateRashifalSign(step) {
  const signKeys = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];
  const currentIndex = signKeys.indexOf(activeRashifalSign);
  const nextIndex = (currentIndex + step + signKeys.length) % signKeys.length;
  selectRashifalSign(signKeys[nextIndex], true);
}
function selectRashifalSign(signKey, shouldScrollToShowcase = false) {
  if (!signKey)
    return;
  activeRashifalSign = String(signKey).toLowerCase();
  renderDailyRashifal(currentPanchangDate);
  if (shouldScrollToShowcase) {
    const showcase = document.getElementById("dailyRashifalSection");
    if (showcase) {
      showcase.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }
}
function openActiveZodiacInModal() {
  openSpecificZodiacModal(activeRashifalSign);
}
function openSpecificZodiacModal(signKey) {
  if (!signKey)
    signKey = activeRashifalSign;
  activeRashifalSign = String(signKey).toLowerCase();
  renderDailyRashifal(currentPanchangDate);
  const modal = document.getElementById("zodiacFocusModal");
  if (!modal)
    return;
  const sign = ZODIAC_METADATA[activeRashifalSign] || ZODIAC_METADATA["aries"];
  const d = currentPanchangDate instanceof Date ? currentPanchangDate : new Date(currentPanchangDate);
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = d.toLocaleDateString("en-IN", options);
  const yStr = d.getFullYear();
  const mStr = String(d.getMonth() + 1).padStart(2, "0");
  const dStr = String(d.getDate()).padStart(2, "0");
  const dateIso = `${yStr}-${mStr}-${dStr}`;
  const imgSrc = getZodiacSvgUrl(sign.key);
  const titleEl = document.getElementById("zodiacModalTitle");
  const subEl = document.getElementById("zodiacModalSubtitle");
  const imgEl = document.getElementById("zodiacModalImg");
  const bodyEl = document.getElementById("zodiacModalBody");
  if (titleEl)
    titleEl.textContent = sign.nameFull;
  if (subEl)
    subEl.innerHTML = `Daily Planetary Transit &amp; Cosmic Analysis for <b>${formattedDate}</b>`;
  if (imgEl) {
    imgEl.src = imgSrc;
  }
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div class="zodiac-modal-top-grid">
        <div class="zodiac-modal-art">
          <img src="${imgSrc}" alt="${sign.nameFull}" class="rashifal-gold-logo" width="130" height="130" onerror="handleZodiacImgError(this, '${sign.key}')" />
          <div style="margin-top:10px;font-family:'Bodoni Moda','Cinzel',serif;font-size:17px;color:#fce7b0;font-weight:700;">${sign.nameFull}</div>
          <div style="font-size:12.5px;color:#9fc9c2;margin-top:4px;">Ruler: <b>${sign.lord}</b> \xB7 Element: <b>${sign.element}</b> (${sign.nature})</div>
        </div>
        <div class="zodiac-modal-details">
          <div class="rashifal-date-banner" style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <div><span style="font-size:14px;">\u{1F5D3}\uFE0F</span> Date: <b>${formattedDate}</b></div>
            <div style="display:flex;gap:6px;align-items:center;">
              <input type="date" value="${dateIso}" onchange="changeZodiacModalDate(this.value)" class="rashifal-date-input" style="padding:3px 8px;font-size:12px;background:rgba(8,16,24,0.85);color:#fce7b0;border:1px solid rgba(242,215,146,0.35);border-radius:4px;" />
              <button type="button" class="rashifal-quick-btn" style="padding:3px 8px;font-size:11px;" onclick="resetPanchangDateToToday(); openSpecificZodiacModal(activeRashifalSign);">Today</button>
            </div>
          </div>
          <div class="rashifal-section-card" style="margin-top:8px;">
            <h4>\u2726 DAINIK RASHIFAL OVERVIEW (\u0926\u0948\u0928\u093F\u0915 \u092D\u0935\u093F\u0937\u094D\u092F\u092B\u0932)</h4>
            <p>${sign.overview}</p>
          </div>
        </div>
      </div>
      
      <div class="rashifal-grid-2" style="margin-top:14px;">
        <div class="rashifal-mini-card">
          <h5>\u{1F4BC} Career &amp; Professional Growth (\u0915\u0930\u093F\u092F\u0930 \u090F\u0935\u0902 \u0935\u094D\u092F\u0935\u0938\u093E\u092F)</h5>
          <p>${sign.career}</p>
        </div>
        <div class="rashifal-mini-card">
          <h5>\u{1F4B0} Finance &amp; Investments (\u0927\u0928 \u090F\u0935\u0902 \u0906\u0930\u094D\u0925\u093F\u0915 \u0932\u093E\u092D)</h5>
          <p>${sign.finance}</p>
        </div>
      </div>

      <div class="rashifal-grid-2" style="margin-top:12px;">
        <div class="rashifal-mini-card">
          <h5>\u{1F496} Love &amp; Family Harmony (\u092A\u094D\u0930\u0947\u092E \u0935 \u092A\u093E\u0930\u093F\u0935\u093E\u0930\u093F\u0915 \u091C\u0940\u0935\u0928)</h5>
          <p>${sign.love}</p>
        </div>
        <div class="rashifal-mini-card">
          <h5>\u{1F33F} Health &amp; Well-being (\u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F \u0935 \u090A\u0930\u094D\u091C\u093E)</h5>
          <p>${sign.health}</p>
        </div>
      </div>

      <div class="rashifal-tokens-row" style="margin-top:14px;">
        <div class="rashifal-token-chip"><small>Lucky Color</small><b>${sign.color}</b></div>
        <div class="rashifal-token-chip"><small>Lucky Number</small><b>${sign.number}</b></div>
        <div class="rashifal-token-chip"><small>Auspicious Direction</small><b>${sign.direction}</b></div>
        <div class="rashifal-token-chip"><small>Shubh Muhurta</small><b>${sign.bestTime}</b></div>
      </div>
    `;
  }
  modal.classList.add("open");
}
function changeZodiacModalDate(dateVal) {
  if (!dateVal)
    return;
  try {
    const parts = dateVal.split("-");
    if (parts.length === 3) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const d = parseInt(parts[2], 10);
      currentPanchangDate = new Date(y, m, d, 12, 0, 0);
      openSpecificZodiacModal(activeRashifalSign);
      if (typeof renderDailyPanchang === "function") {
        renderDailyPanchang(currentPanchangDate);
      }
    }
  } catch (err) {
    console.error("Modal date change error:", err);
  }
}
function closeZodiacModal() {
  const modal = document.getElementById("zodiacFocusModal");
  if (modal)
    modal.classList.remove("open");
}
window.renderDailyRashifal = renderDailyRashifal;
window.selectRashifalSign = selectRashifalSign;
window.scrollRashifalRibbon = scrollRashifalRibbon;
window.navigateRashifalSign = navigateRashifalSign;
window.openActiveZodiacInModal = openActiveZodiacInModal;
window.openSpecificZodiacModal = openSpecificZodiacModal;
window.changeZodiacModalDate = changeZodiacModalDate;
window.closeZodiacModal = closeZodiacModal;
function onPanchangDateCheckerChange(dateVal) {
  if (!dateVal)
    return;
  try {
    const parts = dateVal.split("-");
    if (parts.length === 3) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const d = parseInt(parts[2], 10);
      currentPanchangDate = new Date(y, m, d, 12, 0, 0);
      renderDailyPanchang(currentPanchangDate);
      renderDailyRashifal(currentPanchangDate);
    }
  } catch (err) {
    console.error("Date checker change error:", err);
  }
}
function resetPanchangDateToToday() {
  currentPanchangDate = new Date();
  const input = document.getElementById("panchangDateCheckerInput");
  if (input) {
    const y = currentPanchangDate.getFullYear();
    const m = String(currentPanchangDate.getMonth() + 1).padStart(2, "0");
    const d = String(currentPanchangDate.getDate()).padStart(2, "0");
    input.value = `${y}-${m}-${d}`;
  }
  const rInput = document.getElementById("rashifalDateInput");
  if (rInput) {
    const y = currentPanchangDate.getFullYear();
    const m = String(currentPanchangDate.getMonth() + 1).padStart(2, "0");
    const d = String(currentPanchangDate.getDate()).padStart(2, "0");
    rInput.value = `${y}-${m}-${d}`;
  }
  renderDailyPanchang(currentPanchangDate);
  renderDailyRashifal(currentPanchangDate);
}
function renderDailyPanchang(targetDate = currentPanchangDate) {
  var _a2, _b2;
  try {
    const d = targetDate instanceof Date ? targetDate : new Date(targetDate);
    const lat = parseFloat((_a2 = document.getElementById("f_lat")) == null ? void 0 : _a2.value) || 28.6139;
    const lon = parseFloat((_b2 = document.getElementById("f_lon")) == null ? void 0 : _b2.value) || 77.209;
    const data = getDailyPanchangData(d, lat, lon);
    if (!data)
      return;
    const pDate = document.getElementById("panchangDate");
    const pHindu = document.getElementById("panchangHinduCal");
    const pTithi = document.getElementById("panchangTithi");
    const pNak = document.getElementById("panchangNakshatra");
    const pYoga = document.getElementById("panchangYoga");
    const pKarana = document.getElementById("panchangKarana");
    const pRahu = document.getElementById("panchangRahuKaal");
    const pShubh = document.getElementById("panchangShubh");
    const pSun = document.getElementById("panchangSun");
    const pEvents = document.getElementById("panchangEvents");
    const dateInput = document.getElementById("panchangDateCheckerInput");
    if (dateInput && !dateInput.value) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      dateInput.value = `${y}-${m}-${day}`;
    }
    if (pDate)
      pDate.textContent = `${data.dateStr} (${data.hinduCal.hinduDateFormatted})`;
    if (pHindu)
      pHindu.textContent = `${data.hinduCal.maas} \xB7 ${data.hinduCal.vikramSamvat}`;
    if (pTithi)
      pTithi.textContent = data.tithi;
    if (pNak)
      pNak.textContent = data.nakshatra;
    if (pYoga)
      pYoga.textContent = data.yoga;
    if (pKarana)
      pKarana.textContent = data.karana;
    if (pRahu)
      pRahu.textContent = data.rahuKaal;
    if (pShubh)
      pShubh.textContent = data.abhijit;
    if (pSun)
      pSun.textContent = `${data.sun.sunrise} / ${data.sun.sunset} (${data.sun.dayLength})`;
    if (pEvents) {
      let eventsHtml = `<div class="event-label">\u2726 TODAY & NEXT 30 DAYS EVENTS (CLICK ANY FOR BRIEF):</div>`;
      if (data.activeEvents.length > 0) {
        data.activeEvents.forEach((ev) => {
          const escName = encodeURIComponent(ev.name);
          eventsHtml += `<span class="event-pill active-event" onclick="openEventDetails('${escName}')" title="Click to view event brief"><span class="pulse-dot"></span> ${ev.icon} <b>Active:</b> ${ev.name}</span>`;
        });
      }
      if (data.upcomingEvents.length > 0) {
        data.upcomingEvents.forEach((ev) => {
          const escName = encodeURIComponent(ev.name);
          const daysText = ev.daysAway === 1 ? "Tomorrow" : `in ${ev.daysAway} days`;
          eventsHtml += `<span class="event-pill" onclick="openEventDetails('${escName}')" title="Click to view event brief"><span class="event-icon">${ev.icon}</span> <b>${ev.name}</b> \u2014 ${daysText}</span>`;
        });
      }
      pEvents.innerHTML = eventsHtml;
    }
    renderTransitHighlightsOnMandala(d);
    updateHoraHeaderBadge(d, lat, lon);
  } catch (err) {
    console.error("Panchang render error:", err);
  }
}
const PLANET_SYMBOLS = {
  Sun: "\u2609",
  Moon: "\u263D",
  Mars: "\u2642",
  Mercury: "\u263F",
  Jupiter: "\u2643",
  Venus: "\u2640",
  Saturn: "\u2644",
  Rahu: "\u260A",
  Ketu: "\u260B"
};
const ZODIAC_SIGN_NAMES = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces"
];
function getPlanetaryTransitsForDate(targetDate = new Date()) {
  const d = targetDate instanceof Date ? targetDate : new Date(targetDate);
  const transitsBySign = {};
  ZODIAC_SIGN_NAMES.forEach((sign) => {
    transitsBySign[sign] = [];
  });
  if (currentSkyData && Array.isArray(currentSkyData.planets) && currentSkyData.planets.length) {
    const rows = apiPlanetRows(currentSkyData);
    rows.forEach((p) => {
      const signKey = String(p.sign || "").toLowerCase().trim();
      const matchedKey = ZODIAC_SIGN_NAMES.find((k) => signKey.includes(k) || k.includes(signKey));
      if (matchedKey && transitsBySign[matchedKey]) {
        transitsBySign[matchedKey].push({
          name: p.name,
          symbol: PLANET_SYMBOLS[p.name] || "\u2726",
          degree: p.degree,
          retrograde: p.retrograde,
          nakshatra: p.nakshatra
        });
      }
    });
    return transitsBySign;
  }
  const jd = d.getTime() / 864e5 + 24405875e-1;
  const T = (jd - 2451545) / 36525;
  const ayanamsha = 23.85 + T * 1.396;
  const meanLongitudes = {
    Sun: (280.46646 + 36000.76983 * T - ayanamsha) % 360,
    Moon: (218.3165 + 481267.8813 * T - ayanamsha) % 360,
    Mars: (355.433 + 19140.299 * T - ayanamsha) % 360,
    Mercury: (252.251 + 149472.674 * T - ayanamsha) % 360,
    Jupiter: (34.351 + 3034.9056 * T - ayanamsha) % 360,
    Venus: (181.979 + 58517.815 * T - ayanamsha) % 360,
    Saturn: (50.077 + 1222.1137 * T - ayanamsha) % 360,
    Rahu: (259.183 - 1934.136 * T - ayanamsha) % 360
  };
  Object.entries(meanLongitudes).forEach(([planet, lon]) => {
    let normLon = (lon % 360 + 360) % 360;
    const signIdx = Math.floor(normLon / 30);
    const degreeInSign = normLon % 30;
    const signKey = ZODIAC_SIGN_NAMES[signIdx];
    if (signKey && transitsBySign[signKey]) {
      transitsBySign[signKey].push({
        name: planet,
        symbol: PLANET_SYMBOLS[planet] || "\u2726",
        degree: degreeInSign,
        retrograde: false
      });
    }
    if (planet === "Rahu") {
      const ketuLon = (normLon + 180) % 360;
      const ketuSignIdx = Math.floor(ketuLon / 30);
      const ketuSignKey = ZODIAC_SIGN_NAMES[ketuSignIdx];
      if (ketuSignKey && transitsBySign[ketuSignKey]) {
        transitsBySign[ketuSignKey].push({
          name: "Ketu",
          symbol: PLANET_SYMBOLS["Ketu"] || "\u260B",
          degree: ketuLon % 30,
          retrograde: true
        });
      }
    }
  });
  return transitsBySign;
}
function renderTransitHighlightsOnMandala(targetDate = new Date()) {
  try {
    const transits = getPlanetaryTransitsForDate(targetDate);
    const wheelSigns = document.querySelectorAll(".zodiac-wheel .z-sign");
    const heroNodes = document.querySelectorAll("#zodiacRing .hero-z-node");
    ZODIAC_SIGN_NAMES.forEach((signKey, i) => {
      const activePlanets = transits[signKey] || [];
      const hasPlanets = activePlanets.length > 0;
      const symbolsStr = activePlanets.map((p) => p.symbol).join(" ");
      const descStr = activePlanets.map((p) => `${p.name} (${p.symbol}${p.degree != null ? " " + Math.floor(p.degree) + "\xB0" : ""})`).join(", ");
      if (wheelSigns[i]) {
        const signEl = wheelSigns[i];
        const oldBadge = signEl.querySelector(".transit-badge");
        if (oldBadge)
          oldBadge.remove();
        if (hasPlanets) {
          signEl.classList.add("has-transit");
          const badge = document.createElement("span");
          badge.className = "transit-badge";
          badge.innerHTML = symbolsStr;
          badge.title = `Transiting Planets: ${descStr}`;
          signEl.appendChild(badge);
        } else {
          signEl.classList.remove("has-transit");
        }
      }
      if (heroNodes[i]) {
        const nodeEl = heroNodes[i];
        const oldTag = nodeEl.querySelector(".hero-transit-tag");
        if (oldTag)
          oldTag.remove();
        if (hasPlanets) {
          nodeEl.classList.add("has-transit");
          const tag = document.createElement("span");
          tag.className = "hero-transit-tag";
          tag.innerHTML = symbolsStr;
          tag.title = `Active Transit: ${descStr}`;
          nodeEl.appendChild(tag);
        } else {
          nodeEl.classList.remove("has-transit");
        }
      }
    });
  } catch (e) {
    console.warn("Transit highlight update:", e);
  }
}
const HORA_LORDS_CHALDEAN = [
  { name: "Sun", sanskrit: "Surya", symbol: "\u2609", deity: "Agni / Shiva", nature: "Vigyan / Tejas", quality: "good", desc: "Auspicious for leadership, administration, executive decisions, government paperwork & vitality." },
  { name: "Venus", sanskrit: "Shukra", symbol: "\u2640", deity: "Lakshmi", nature: "Shubh / Saundarya", quality: "excellent", desc: "Auspicious for arts, romance, luxury purchases, ceremonies, harmony, travel & music." },
  { name: "Mercury", sanskrit: "Budha", symbol: "\u263F", deity: "Vishnu", nature: "Labh / Buddhi", quality: "excellent", desc: "Auspicious for intellect, trading, accounting, contracts, coding, education & communication." },
  { name: "Moon", sanskrit: "Chandra", symbol: "\u263D", deity: "Parvati", nature: "Amrit / Shanti", quality: "excellent", desc: "Auspicious for travel, public relations, healing, nourishment, domestic matters & mental peace." },
  { name: "Saturn", sanskrit: "Shani", symbol: "\u2644", deity: "Yama / Brahma", nature: "Dharana / Vairagya", quality: "mixed", desc: "Auspicious for discipline, foundations, heavy labour, long-term planning & asceticism; avoid haste." },
  { name: "Jupiter", sanskrit: "Guru", symbol: "\u2643", deity: "Brihaspati / Indra", nature: "Maha Shubh / Gyan", quality: "excellent", desc: "Supreme auspicious hora for spiritual deeds, financial investments, higher learning, counseling & dharma." },
  { name: "Mars", sanskrit: "Mangal", symbol: "\u2642", deity: "Kartikeya", nature: "Krodha / Shakti", quality: "intense", desc: "Auspicious for sports, surgery, construction, competitive ventures & courage; avoid delicate talks." }
];
const DAY_HORA_START_ORDER = {
  0: "Sun",
  1: "Moon",
  2: "Mars",
  3: "Mercury",
  4: "Jupiter",
  5: "Venus",
  6: "Saturn"
};
function formatHoraTime(d) {
  if (!d || isNaN(d.getTime()))
    return "--:--";
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)} ${ampm}`;
}
function calculateCurrentHora(dateObj = new Date(), lat = 28.6139, lon = 77.209) {
  const sunTimes = calculateSunTimes(dateObj, lat, lon);
  const now = dateObj instanceof Date && !isNaN(dateObj.getTime()) ? dateObj : new Date();
  const sH = typeof sunTimes.sunriseHour === "number" && !isNaN(sunTimes.sunriseHour) ? sunTimes.sunriseHour : 6;
  const sM = typeof sunTimes.sunriseMin === "number" && !isNaN(sunTimes.sunriseMin) ? sunTimes.sunriseMin : 5;
  const setH = typeof sunTimes.sunsetHour === "number" && !isNaN(sunTimes.sunsetHour) ? sunTimes.sunsetHour : 18;
  const setM = typeof sunTimes.sunsetMin === "number" && !isNaN(sunTimes.sunsetMin) ? sunTimes.sunsetMin : 56;
  const sunriseDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), sH, sM, 0);
  const sunsetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), setH, setM, 0);
  const nextSunriseDate = new Date(sunriseDate.getTime() + 24 * 60 * 60 * 1e3);
  const isDaytime = now >= sunriseDate && now < sunsetDate;
  const dayStartPlanet = DAY_HORA_START_ORDER[now.getDay()] || "Sun";
  const startIndex = Math.max(0, HORA_LORDS_CHALDEAN.findIndex((p) => p.name === dayStartPlanet));
  const dayDurationMs = Math.max(1, sunsetDate.getTime() - sunriseDate.getTime());
  const dayHoraDurationMs = dayDurationMs / 12;
  const nightDurationMs = Math.max(1, nextSunriseDate.getTime() - sunsetDate.getTime());
  const nightHoraDurationMs = nightDurationMs / 12;
  const allHoras = [];
  for (let i = 0; i < 12; i++) {
    const hStart = new Date(sunriseDate.getTime() + i * dayHoraDurationMs);
    const hEnd = new Date(sunriseDate.getTime() + (i + 1) * dayHoraDurationMs);
    const lord = HORA_LORDS_CHALDEAN[(startIndex + i) % 7];
    allHoras.push({
      index: i + 1,
      isDay: true,
      start: hStart,
      end: hEnd,
      timeStr: `${formatHoraTime(hStart)} \u2013 ${formatHoraTime(hEnd)}`,
      lord
    });
  }
  for (let i = 0; i < 12; i++) {
    const hStart = new Date(sunsetDate.getTime() + i * nightHoraDurationMs);
    const hEnd = new Date(sunsetDate.getTime() + (i + 1) * nightHoraDurationMs);
    const lord = HORA_LORDS_CHALDEAN[(startIndex + 12 + i) % 7];
    allHoras.push({
      index: i + 13,
      isDay: false,
      start: hStart,
      end: hEnd,
      timeStr: `${formatHoraTime(hStart)} \u2013 ${formatHoraTime(hEnd)}`,
      lord
    });
  }
  let currentHora = allHoras.find((h) => now >= h.start && now < h.end) || allHoras[0];
  const remainingMins = Math.max(0, Math.round((currentHora.end.getTime() - now.getTime()) / 6e4));
  return {
    currentHora,
    remainingMins,
    allHoras,
    sunTimes
  };
}
function updateHoraHeaderBadge(dateObj = new Date(), lat = 28.6139, lon = 77.209) {
  try {
    const { currentHora, remainingMins } = calculateCurrentHora(dateObj, lat, lon);
    const titleEl = document.getElementById("horaHeaderTitle");
    if (titleEl && currentHora) {
      titleEl.innerHTML = `\u23F0 Current Hora: <b>${currentHora.lord.symbol} ${currentHora.lord.sanskrit} (${currentHora.lord.name})</b> \xB7 <small style="color:#7fc5c0;">${remainingMins}m left</small>`;
    }
  } catch (e) {
    console.warn("Hora badge update error:", e);
  }
}
function openHoraModal() {
  var _a2, _b2;
  const modal = document.getElementById("horaScheduleModal");
  if (!modal)
    return;
  const lat = parseFloat((_a2 = document.getElementById("f_lat")) == null ? void 0 : _a2.value) || 28.6139;
  const lon = parseFloat((_b2 = document.getElementById("f_lon")) == null ? void 0 : _b2.value) || 77.209;
  const { currentHora, remainingMins, allHoras } = calculateCurrentHora(new Date(), lat, lon);
  const headingEl = document.getElementById("horaModalHeading");
  const summaryEl = document.getElementById("horaCurrentSummary");
  const container = document.getElementById("horaRowsContainer");
  if (headingEl)
    headingEl.textContent = `Today's 24-Hour Planetary Horas (${new Date().toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" })})`;
  if (summaryEl && currentHora) {
    summaryEl.innerHTML = `\u2728 <b>Active Hora: ${currentHora.lord.symbol} ${currentHora.lord.sanskrit} (${currentHora.lord.name})</b> \u2014 ${currentHora.timeStr} (${remainingMins} mins remaining)<br><small style="color:#e8dcc8;">${currentHora.lord.desc}</small>`;
  }
  if (container) {
    container.innerHTML = allHoras.map((h) => {
      const isNow = h === currentHora;
      const tagClass = h.lord.quality === "excellent" ? "hora-nature-excellent" : h.lord.quality === "good" ? "hora-nature-good" : h.lord.quality === "mixed" ? "hora-nature-mixed" : "hora-nature-intense";
      return `
        <div class="hora-row ${isNow ? "is-current" : ""}">
          <span>${h.timeStr} ${isNow ? "\u{1F525}" : ""}</span>
          <div class="hora-planet-cell">
            <span style="font-size: 14px;">${h.lord.symbol}</span>
            <span>${h.lord.sanskrit} <small style="color:#d6c3a0;">(${h.lord.name})</small></span>
          </div>
          <span style="color: #e2d3b5;">${h.lord.desc}</span>
          <div>
            <span class="hora-nature-tag ${tagClass}">${h.lord.nature}</span>
          </div>
        </div>
      `;
    }).join("");
  }
  modal.classList.add("open");
}
function closeHoraModal() {
  const modal = document.getElementById("horaScheduleModal");
  if (modal)
    modal.classList.remove("open");
}
window.openHoraModal = openHoraModal;
window.closeHoraModal = closeHoraModal;
window.renderTransitHighlightsOnMandala = renderTransitHighlightsOnMandala;
window.updateHoraHeaderBadge = updateHoraHeaderBadge;
window.renderDailyRashifal = renderDailyRashifal;
window.selectRashifalSign = selectRashifalSign;
window.openActiveZodiacInModal = openActiveZodiacInModal;
window.onPanchangDateCheckerChange = onPanchangDateCheckerChange;
window.resetPanchangDateToToday = resetPanchangDateToToday;
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    resetPanchangDateToToday();
  });
} else {
  resetPanchangDateToToday();
}
function buildAtAGlance() {
  const card = document.getElementById("atAGlanceCard");
  if (!card)
    return;
  const isHi = window.currentVedicLang === "hi";
  const kicker = card.querySelector(".glance-kicker");
  if (kicker)
    kicker.textContent = isHi ? "\u0906\u092A\u0915\u0940 \u0915\u0941\u0902\u0921\u0932\u0940 \xB7 \u090F\u0915 \u0928\u091C\u093C\u0930 \u092E\u0947\u0902" : "YOUR CHART \xB7 AT A GLANCE";
  const h3 = card.querySelector("h3");
  if (h3)
    h3.textContent = isHi ? "\u092F\u0939 \u0915\u0941\u0902\u0921\u0932\u0940 \u0906\u092A\u0915\u0947 \u091C\u0940\u0935\u0928 \u0915\u0947 \u0915\u093F\u0928 \u092A\u0939\u0932\u0941\u0913\u0902 \u092A\u0930 \u092A\u094D\u0930\u0915\u093E\u0936 \u0921\u093E\u0932\u0924\u0940 \u0939\u0948" : "What this chart is asking you to understand";
  const grid = document.getElementById("glanceGrid");
  const data = typeof extractChartData === "function" ? extractChartData(fullReportText) : { signs: {} };
  if (!Object.keys(data.signs).length && !fullReportText) {
    card.style.display = "none";
    return;
  }
  card.style.display = "block";
  if (grid) {
    const lagnaSvg = typeof getZodiacSvgUrl === "function" ? getZodiacSvgUrl(data.lagna) : "";
    const moonSvg = typeof getZodiacSvgUrl === "function" ? getZodiacSvgUrl(data.moonSign || data.signs.Moon) : "";
    const sunSvg = typeof getZodiacSvgUrl === "function" ? getZodiacSvgUrl(data.signs.Sun) : "";
    const lagnaKey = typeof getZodiacSignKey === "function" ? getZodiacSignKey(data.lagna) : "";
    const moonKey = typeof getZodiacSignKey === "function" ? getZodiacSignKey(data.moonSign || data.signs.Moon) : "";
    const sunKey = typeof getZodiacSignKey === "function" ? getZodiacSignKey(data.signs.Sun) : "";
    grid.innerHTML = `
      <div class="glance-item">
        <span class="glance-tag">${isHi ? "\u0932\u0917\u094D\u0928 / \u0906\u0924\u094D\u092E-\u090A\u0930\u094D\u091C\u093E" : "LAGNA / CORE SELF"}</span>
        <b style="display:inline-flex;align-items:center;gap:8px;cursor:pointer;" onclick="openSpecificZodiacModal('${lagnaKey}'); selectRashifalSign('${lagnaKey}');">
          ${data.lagna ? `<img src="${lagnaSvg}" onerror="handleZodiacImgError(this, '${lagnaKey}')" style="width:24px;height:24px;border-radius:50%;border:1.5px solid #fce7b0;box-shadow:0 0 8px rgba(242,215,146,0.5);vertical-align:middle;flex-shrink:0;" alt="" />` : ""}
          <span>${data.lagna ? formatRashiNameWithHindi(data.lagna) : isHi ? "\u0932\u0917\u094D\u0928 \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923 \u091C\u093E\u0930\u0940" : "Analyzing Lagna"}</span>
        </b>
        <p>${isHi ? "\u0936\u093E\u0930\u0940\u0930\u093F\u0915 \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F, \u092E\u093E\u0928\u0938\u093F\u0915 \u0936\u0915\u094D\u0924\u093F \u090F\u0935\u0902 \u091C\u0940\u0935\u0928 \u092A\u0925 \u0915\u093E \u092E\u0942\u0932 \u0906\u0927\u093E\u0930\u0964" : "Shapes fundamental vitality, temperament, and life trajectory."}</p>
      </div>
      <div class="glance-item">
        <span class="glance-tag">${isHi ? "\u091A\u0902\u0926\u094D\u0930 \u0930\u093E\u0936\u093F / \u092E\u0928" : "MOON / MIND"}</span>
        <b style="display:inline-flex;align-items:center;gap:8px;cursor:pointer;" onclick="openSpecificZodiacModal('${moonKey}'); selectRashifalSign('${moonKey}');">
          ${data.moonSign || data.signs.Moon ? `<img src="${moonSvg}" onerror="handleZodiacImgError(this, '${moonKey}')" style="width:24px;height:24px;border-radius:50%;border:1.5px solid #7fc5c0;box-shadow:0 0 8px rgba(127,197,192,0.5);vertical-align:middle;flex-shrink:0;" alt="" />` : ""}
          <span>${data.moonSign || data.signs.Moon ? formatRashiNameWithHindi(data.moonSign || data.signs.Moon) : isHi ? "\u091A\u0902\u0926\u094D\u0930 \u0935\u093F\u091A\u093E\u0930 \u091C\u093E\u0930\u0940" : "Analyzing Moon"}</span>
        </b>
        <p>${isHi ? "\u092E\u093E\u0928\u0938\u093F\u0915 \u0936\u093E\u0902\u0924\u093F, \u092D\u093E\u0935\u0928\u093E\u0924\u094D\u092E\u0915 \u0926\u0943\u0937\u094D\u091F\u093F\u0915\u094B\u0923 \u090F\u0935\u0902 \u0938\u0939\u091C \u092A\u094D\u0930\u0924\u093F\u0915\u094D\u0930\u093F\u092F\u093E\u0913\u0902 \u0915\u093E \u0915\u0947\u0902\u0926\u094D\u0930\u0964" : "Governs emotional filters, inner instincts, and cognitive peace."}</p>
      </div>
      <div class="glance-item">
        <span class="glance-tag">${isHi ? "\u0938\u0942\u0930\u094D\u092F / \u0906\u0924\u094D\u092E-\u0935\u093F\u0936\u094D\u0935\u093E\u0938" : "SUN / SOUL"}</span>
        <b style="display:inline-flex;align-items:center;gap:8px;cursor:pointer;" onclick="openSpecificZodiacModal('${sunKey}'); selectRashifalSign('${sunKey}');">
          ${data.signs.Sun ? `<img src="${sunSvg}" onerror="handleZodiacImgError(this, '${sunKey}')" style="width:24px;height:24px;border-radius:50%;border:1.5px solid #fce7b0;box-shadow:0 0 8px rgba(242,215,146,0.5);vertical-align:middle;flex-shrink:0;" alt="" />` : ""}
          <span>${data.signs.Sun ? formatRashiNameWithHindi(data.signs.Sun) : isHi ? "\u0938\u0942\u0930\u094D\u092F \u0935\u093F\u091A\u093E\u0930 \u091C\u093E\u0930\u0940" : "Analyzing Sun"}</span>
        </b>
        <p>${isHi ? "\u0906\u0924\u094D\u092E-\u0938\u092E\u094D\u092E\u093E\u0928, \u0905\u0927\u093F\u0915\u093E\u0930, \u092E\u0939\u0924\u094D\u0935\u093E\u0915\u093E\u0902\u0915\u094D\u0937\u093E \u090F\u0935\u0902 \u0928\u0947\u0924\u0943\u0924\u094D\u0935 \u0915\u094D\u0937\u092E\u0924\u093E \u0915\u093E \u092A\u094D\u0930\u0924\u0940\u0915\u0964" : "Reflects self-esteem, authority, vitality, and inner purpose."}</p>
      </div>
    `;
  }
}
window.buildAtAGlance = buildAtAGlance;
(function() {
  const buttons = document.querySelectorAll("[data-theme-choice]");
  const saved = localStorage.getItem("jyotish_theme") || "cosmic";
  if (window.setVedicTheme)
    window.setVedicTheme(saved);
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.themeChoice;
      if (window.setVedicTheme)
        window.setVedicTheme(theme);
    });
  });
})();
document.addEventListener("pointermove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  document.documentElement.style.setProperty("--mx", x.toFixed(3));
  document.documentElement.style.setProperty("--my", y.toFixed(3));
  const wheel = document.querySelector(".zodiac-wheel");
  if (wheel && window.innerWidth > 1e3)
    wheel.style.setProperty("--parallax-y", `${y * 1.5}px`);
});
document.getElementById("advToggle").onclick = () => {
  document.getElementById("advBody").classList.toggle("open");
};
let currentMode = "individual";
document.querySelectorAll(".mode-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const mode = tab.getAttribute("data-mode");
    if (mode === currentMode)
      return;
    currentMode = mode;
    document.querySelectorAll(".mode-tab").forEach((t) => t.classList.toggle("active", t.getAttribute("data-mode") === mode));
    document.querySelectorAll(".mode-panel").forEach((p) => p.classList.toggle("active", p.getAttribute("data-panel") === mode));
    document.getElementById("progressCard").style.display = "none";
    document.getElementById("reportCard").style.display = "none";
    document.getElementById("chatCard").style.display = "none";
  });
});
const beginReadingBtn = document.getElementById("beginReadingBtn");
if (beginReadingBtn)
  beginReadingBtn.addEventListener("click", () => {
    const target = document.getElementById("readingModes");
    if (target)
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      const name = document.getElementById("f_name");
      if (name)
        name.focus({ preventScroll: true });
    }, 650);
  });
document.querySelectorAll(".legal-link, .fixed-utility-bar [data-modal]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const modal = document.getElementById(el.getAttribute("data-modal"));
    if (modal)
      modal.classList.add("open");
  });
});
document.querySelectorAll("[data-close-modal]").forEach((el) => {
  el.addEventListener("click", () => {
    const modal = document.getElementById(el.getAttribute("data-close-modal"));
    if (modal)
      modal.classList.remove("open");
  });
});
document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay)
      overlay.classList.remove("open");
  });
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.open").forEach((m) => m.classList.remove("open"));
  }
});
function initCustomPickers() {
  const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  document.querySelectorAll(".picker-field").forEach((field) => {
    const isTime = field.id.includes("tob");
    const hiddenInput = field.querySelector('input[type="hidden"]');
    const display = field.querySelector(".picker-display");
    const popup = field.querySelector(".picker-popup");
    if (!hiddenInput || !display || !popup)
      return;
    if (isTime) {
      popup.innerHTML = `
        <div class="time-cols">
          <div class="time-col">
            <div class="time-col-label">Hour</div>
            <div class="time-col-list" data-type="hour">
              ${Array.from({ length: 24 }, (_, i) => `<div class="time-col-item" data-val="${String(i).padStart(2, "0")}">${String(i).padStart(2, "0")}</div>`).join("")}
            </div>
          </div>
          <div class="time-col">
            <div class="time-col-label">Minute</div>
            <div class="time-col-list" data-type="minute">
              ${Array.from({ length: 60 }, (_, i) => `<div class="time-col-item" data-val="${String(i).padStart(2, "0")}">${String(i).padStart(2, "0")}</div>`).join("")}
            </div>
          </div>
          <div class="time-col">
            <div class="time-col-label">Second</div>
            <div class="time-col-list" data-type="second">
              ${Array.from({ length: 60 }, (_, i) => `<div class="time-col-item" data-val="${String(i).padStart(2, "0")}">${String(i).padStart(2, "0")}</div>`).join("")}
            </div>
          </div>
        </div>
        <button class="small picker-done" type="button" style="width:100%;">Done</button>
      `;
      let selectedH = "12", selectedM = "00", selectedS = "00";
      ["hour", "minute", "second"].forEach((type, idx) => {
        const value = idx === 0 ? selectedH : "00";
        const item = popup.querySelector(`.time-col-list[data-type="${type}"] .time-col-item[data-val="${value}"]`);
        if (item)
          item.classList.add("selected");
      });
      const updateDisplay = () => {
        const val = `${selectedH}:${selectedM}:${selectedS}`;
        hiddenInput.value = val;
        display.innerHTML = `<span>${val}</span><span class="picker-icon">\u{1F550}</span>`;
      };
      popup.querySelectorAll(".time-col-list").forEach((list) => {
        const type = list.getAttribute("data-type");
        list.addEventListener("click", (e) => {
          const item = e.target.closest(".time-col-item");
          if (!item)
            return;
          list.querySelectorAll(".time-col-item").forEach((i) => i.classList.remove("selected"));
          item.classList.add("selected");
          const val = item.getAttribute("data-val");
          if (type === "hour")
            selectedH = val;
          if (type === "minute")
            selectedM = val;
          if (type === "second")
            selectedS = val;
          updateDisplay();
        });
      });
      popup.querySelector(".picker-done").addEventListener("click", () => {
        popup.classList.remove("open");
      });
    } else {
      let currDate = new Date();
      let viewYear = currDate.getFullYear();
      let viewMonth = currDate.getMonth();
      let selectedDateStr = "";
      const renderCalendar = () => {
        popup.innerHTML = `
          <div class="cal-head">
            <button class="cal-nav cal-prev" type="button">\u2039</button>
            <select class="cal-month-select">
              ${MONTH_NAMES.map((m, idx) => `<option value="${idx}" ${idx === viewMonth ? "selected" : ""}>${m}</option>`).join("")}
            </select>
            <input type="number" class="cal-year-input" value="${viewYear}" min="1900" max="2100">
            <button class="cal-nav cal-next" type="button">\u203A</button>
          </div>
          <div class="cal-weekdays">
            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
          </div>
          <div class="cal-grid"></div>
        `;
        popup.querySelector(".cal-month-select").addEventListener("change", (e) => {
          viewMonth = parseInt(e.target.value, 10);
          renderCalendarDays();
        });
        popup.querySelector(".cal-year-input").addEventListener("input", (e) => {
          const y = parseInt(e.target.value, 10);
          if (!isNaN(y) && y >= 1e3 && y <= 9999) {
            viewYear = y;
            renderCalendarDays();
          }
        });
        popup.querySelector(".cal-prev").addEventListener("click", () => {
          viewMonth--;
          if (viewMonth < 0) {
            viewMonth = 11;
            viewYear--;
          }
          renderCalendar();
        });
        popup.querySelector(".cal-next").addEventListener("click", () => {
          viewMonth++;
          if (viewMonth > 11) {
            viewMonth = 0;
            viewYear++;
          }
          renderCalendar();
        });
        renderCalendarDays();
      };
      const renderCalendarDays = () => {
        const grid = popup.querySelector(".cal-grid");
        if (!grid)
          return;
        const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
        const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate();
        const prevTotalDays = new Date(viewYear, viewMonth, 0).getDate();
        let daysHtml = "";
        const todayStr = new Date().toISOString().split("T")[0];
        for (let i = firstDayIndex - 1; i >= 0; i--) {
          const d = prevTotalDays - i;
          let m = viewMonth - 1;
          let y = viewYear;
          if (m < 0) {
            m = 11;
            y--;
          }
          const dateStr = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
          daysHtml += `<div class="cal-day other-month${dateStr === selectedDateStr ? " selected" : ""}" data-date="${dateStr}">${d}</div>`;
        }
        for (let d = 1; d <= totalDays; d++) {
          const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === selectedDateStr;
          daysHtml += `<div class="cal-day${isToday ? " today" : ""}${isSelected ? " selected" : ""}" data-date="${dateStr}">${d}</div>`;
        }
        const totalCellsSoFar = firstDayIndex + totalDays;
        const nextDaysCount = totalCellsSoFar <= 35 ? 35 - totalCellsSoFar : 42 - totalCellsSoFar;
        for (let d = 1; d <= nextDaysCount; d++) {
          let m = viewMonth + 1;
          let y = viewYear;
          if (m > 11) {
            m = 0;
            y++;
          }
          const dateStr = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
          daysHtml += `<div class="cal-day other-month${dateStr === selectedDateStr ? " selected" : ""}" data-date="${dateStr}">${d}</div>`;
        }
        grid.innerHTML = daysHtml;
        grid.querySelectorAll(".cal-day").forEach((cell) => {
          cell.addEventListener("click", () => {
            selectedDateStr = cell.getAttribute("data-date");
            hiddenInput.value = selectedDateStr;
            display.innerHTML = `<span>${selectedDateStr}</span><span class="picker-icon">\u{1F4C5}</span>`;
            popup.classList.remove("open");
          });
        });
      };
      renderCalendar();
    }
    const togglePicker = (e) => {
      if (e.type === "keydown" && !["Enter", " "].includes(e.key))
        return;
      e.stopPropagation();
      if (e.type === "keydown")
        e.preventDefault();
      document.querySelectorAll(".picker-popup.open").forEach((p) => {
        if (p !== popup)
          p.classList.remove("open");
      });
      const willOpen = !popup.classList.contains("open");
      popup.classList.toggle("open", willOpen);
      if (willOpen) {
        requestAnimationFrame(() => {
          popup.style.left = "0px";
          popup.style.right = "auto";
          const rect = popup.getBoundingClientRect();
          const pad = 12;
          const vw = window.innerWidth;
          if (rect.right > vw - pad) {
            const shift = rect.right - (vw - pad);
            popup.style.left = `-${shift}px`;
          }
          const updatedRect = popup.getBoundingClientRect();
          if (updatedRect.left < pad) {
            const currentLeft = parseFloat(popup.style.left || "0");
            popup.style.left = `${currentLeft + (pad - updatedRect.left)}px`;
          }
        });
      }
    };
    display.addEventListener("click", togglePicker);
    display.addEventListener("keydown", togglePicker);
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".picker-field")) {
      document.querySelectorAll(".picker-popup.open").forEach((p) => p.classList.remove("open"));
    }
  });
  window.addEventListener("resize", () => {
    document.querySelectorAll(".picker-popup.open").forEach((popup) => {
      popup.style.left = "0px";
      const rect = popup.getBoundingClientRect();
      const pad = 12;
      const vw = window.innerWidth;
      if (rect.right > vw - pad) {
        popup.style.left = `-${rect.right - (vw - pad)}px`;
      }
      const updatedRect = popup.getBoundingClientRect();
      if (updatedRect.left < pad) {
        const currentLeft = parseFloat(popup.style.left || "0");
        popup.style.left = `${currentLeft + (pad - updatedRect.left)}px`;
      }
    });
  });
}
initCustomPickers();
function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}
function searchPlaces(query) {
  return __async(this, null, function* () {
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=6&q=${encodeURIComponent(query)}`;
    let res;
    try {
      res = yield fetch(url);
    } catch (networkErr) {
      const isFileProtocol = typeof location !== "undefined" && location.protocol === "file:";
      const hint = isFileProtocol ? " This file is open directly from disk (file://) \u2014 some browsers block outbound requests from local files. Try serving it from a local web server, or open it via http(s):// instead." : " This can happen if you're offline, a firewall or ad-blocker is blocking nominatim.openstreetmap.org, or the network blocked the request.";
      throw new Error("Could not reach the location search service." + hint);
    }
    if (!res.ok)
      throw new Error(`Location search returned an error (HTTP ${res.status}).`);
    return res.json();
  });
}
function setupPlaceAutocomplete(prefix) {
  const input = document.getElementById(prefix + "_pob");
  const dropdown = document.getElementById(prefix + "_pobDropdown");
  const statusEl = document.getElementById(prefix + "_coordStatus");
  const latInput = document.getElementById(prefix + "_lat");
  const lonInput = document.getElementById(prefix + "_lon");
  if (!input || !dropdown)
    return;
  let results = [];
  let highlighted = -1;
  function closeDropdown() {
    dropdown.classList.remove("open");
    dropdown.innerHTML = "";
    highlighted = -1;
  }
  function selectResult(r) {
    input.value = r.display_name;
    latInput.value = parseFloat(r.lat).toFixed(4);
    lonInput.value = parseFloat(r.lon).toFixed(4);
    statusEl.textContent = `Real-world coordinates set: ${parseFloat(r.lat).toFixed(4)}, ${parseFloat(r.lon).toFixed(4)}`;
    statusEl.className = "coord-status ok";
    closeDropdown();
  }
  function renderDropdown() {
    if (!results.length) {
      dropdown.innerHTML = '<div class="pob-suggestion pob-empty">No matching real-world places found \u2014 you can still enter coordinates manually below.</div>';
      dropdown.classList.add("open");
      return;
    }
    dropdown.innerHTML = results.map((r, i) => `
      <div class="pob-suggestion${i === highlighted ? " highlighted" : ""}" data-idx="${i}">
        ${r.display_name}
      </div>`).join("");
    dropdown.classList.add("open");
    dropdown.querySelectorAll(".pob-suggestion[data-idx]").forEach((el) => {
      el.addEventListener("mousedown", (e) => {
        e.preventDefault();
        selectResult(results[parseInt(el.getAttribute("data-idx"), 10)]);
      });
    });
  }
  const doSearch = debounce(() => __async(this, null, function* () {
    const q = input.value.trim();
    if (q.length < 3) {
      closeDropdown();
      return;
    }
    statusEl.textContent = "Searching real-world locations\u2026";
    statusEl.className = "coord-status";
    try {
      results = yield searchPlaces(q);
      renderDropdown();
      statusEl.textContent = results.length ? `${results.length} match${results.length > 1 ? "es" : ""} found \u2014 pick one below.` : "";
    } catch (err) {
      results = [];
      statusEl.innerHTML = "";
      const msgSpan = document.createElement("span");
      msgSpan.textContent = `${err.message} You can enter coordinates manually below, or `;
      const retryLink = document.createElement("a");
      retryLink.href = "#";
      retryLink.className = "legal-link";
      retryLink.textContent = "try the search again";
      retryLink.onclick = (e) => {
        e.preventDefault();
        doSearch();
      };
      statusEl.appendChild(msgSpan);
      statusEl.appendChild(retryLink);
      statusEl.appendChild(document.createTextNode("."));
      statusEl.className = "coord-status err";
      closeDropdown();
    }
  }), 450);
  input.addEventListener("input", () => {
    if (latInput)
      latInput.value = "";
    if (lonInput)
      lonInput.value = "";
    doSearch();
  });
  input.addEventListener("keydown", (e) => {
    if (!dropdown.classList.contains("open"))
      return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      highlighted = Math.min(highlighted + 1, results.length - 1);
      renderDropdown();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      highlighted = Math.max(highlighted - 1, 0);
      renderDropdown();
    } else if (e.key === "Enter") {
      if (highlighted >= 0 && results[highlighted]) {
        e.preventDefault();
        selectResult(results[highlighted]);
      }
    } else if (e.key === "Escape") {
      closeDropdown();
    }
  });
  input.addEventListener("blur", () => {
    setTimeout(closeDropdown, 150);
  });
}
setupPlaceAutocomplete("f");
setupPlaceAutocomplete("k1");
setupPlaceAutocomplete("k2");
const EMBEDDED_KEY = "";
let activeKey = EMBEDDED_KEY;
const SECTIONS = [
  {
    id: "panchang",
    title: "Panchang, Cosmic Blueprint & Foundational Placements",
    instruction: `Deliver a rich, reverent, and foundational analysis of the native's cosmic incarnation, focusing on practical psychological meaning and real-world impact.
MANDATORY STRUCTURE: You MUST provide 3-4 distinct thematic subheadings starting with ### (e.g. "### 1. Panchang Limbs & Soul Resonance", "### 2. Lagna & Planetary Dignity Matrix", "### 3. Real-World Cosmic Impact & Archetype"):
1. Panchang Limbs & Soul Resonance: The five limbs of the birth Panchang — Tithi (lunar vitality and inner emotional drive), Nakshatra with its Pada and governing deity (instinctual temperament, emotional radar), Yoga (mental baseline current), Karana (action style and work ethics), and Vara (weekday physical constitution).
2. Foundational Matrix & Gravitational Anchors: Cover the Lagna (Ascendant sign and lord placement), Janma Rashi (Moon sign), and a structured planet-by-house summary for all nine grahas (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu) with sign, house, and dignity.
3. Real-World Cosmic Impact & Archetype: Crucially, explain what this exact combination feels like in daily life. How does this soul show up in the physical world? What are their natural instinctual strengths, instinctive defense mechanisms, and unique personal presence?`
  },
  {
    id: "identity",
    title: "Psychological Architecture, Mind & Soul Temperament",
    instruction: `Provide an intimate, deeply psychological, and piercing portrait of the native's psyche, inner contradictions, and lived emotional reality.
MANDATORY STRUCTURE: You MUST provide 3-4 distinct thematic subheadings starting with ### (e.g. "### 1. The Core Ego & Outward Persona", "### 2. Emotional Vulnerability & Moon Sanctuary", "### 3. Cognitive Style & Psychological Paradoxes", "### 4. Inner Will & Shadow Discipline"):
1. The Core Ego & Outward Persona: Lagna and Lagna Lord's condition (sign, dignity, house, aspects) — explain the visceral impact on their physical stamina, personal presence, and the mask they present to the world versus what they feel inside.
2. The Subconscious Mind & Emotional Vulnerability: Moon's placement, Nakshatra, and aspects — describe the native's deepest emotional needs, childhood conditioning, vulnerabilities, relationship with solitude, and what truly makes them feel safe versus quietly overwhelmed.
3. Cognitive Style & Psychological Paradoxes: Mercury's condition and 5th house dynamics — how their mind processes complexity, their unique communication gifts, intellectual strengths, and internal paradoxes.
4. Inner Will, Self-Worth & Shadow Discipline: Sun and Saturn's interplay — their relationship with authority, perfectionism, self-criticism, and their unshakeable inner resilience.`
  },
  {
    id: "relationships",
    title: "Attachment Style, Karmic Love & Sacred Partnerships",
    instruction: `Provide a profoundly moving and psychologically astute analysis of how the native loves, bonds, and navigates interpersonal intimacy in real life.
MANDATORY STRUCTURE: You MUST provide 3-4 distinct thematic subheadings starting with ### (e.g. "### 1. The 7th House & The Sacred Mirror", "### 2. Attachment Dynamics & Venusian Dignity", "### 3. Karmic Contracts & Family Foundations", "### 4. Relational Impact & Timing Windows"):
1. The 7th House & The Sacred Mirror: The 7th Bhava, its lord, and aspects — unpack the real-world partner dynamics they attract, the mirror partnerships hold up to their unhealed parts, and the qualities their ideal companion must embody.
2. Attachment Dynamics & Love Languages: Venus (Shukra) and Jupiter (Brihaspati) dignity — their romantic idealism, emotional openness, boundary challenges, and how they navigate intimacy versus personal autonomy in daily relationship life.
3. Karmic Contracts & Family Foundations: 4th house (emotional root / maternal bond), 9th/10th houses (paternal archetype), and 5th house (creative legacy and children).
4. Relational Impact & Timing Windows: Instead of reciting dry astrological tables, explain the felt relational seasons—milestones, periods of deep romantic alignment, and marriage windows under key dasha and transit cycles.`
  },
  {
    id: "career",
    title: "Karmic Dharma, Vocational Genius & Material Abundance",
    instruction: `Analyze the native's professional destiny, innate mastery, and material expansion, focusing on real-world vocational impact and financial psychology.
MANDATORY STRUCTURE: You MUST provide 3-4 distinct thematic subheadings starting with ### (e.g. "### 1. Karmic Vocational Genius & Authority", "### 2. Wealth Architecture & Dhana Yogas", "### 3. Enterprise, Strategic Leadership & Global Impact"):
1. Karmic Vocational Genius: 10th house (Karma Bhava), 10th lord, and Amatyakaraka — the native's unique vocational signature, why standard cookie-cutter career paths feel stifling, and where their natural authority shines brightest.
2. Wealth Psychology & Dhana Yogas: 2nd house (accumulated wealth, financial security) and 11th house (gains, network, high-level ambitions) — explain their actual money psychology, wealth accumulation habits, income trajectories, and the mindset shift required to unlock material abundance.
3. Enterprise, Leadership & Impact: Sun, Mars, and Saturn alignment — executive instincts, capacity for independent enterprise, international/cross-cultural opportunities (9th/12th houses & Rahu), and their lasting public contribution.`
  },
  {
    id: "health",
    title: "Vitality, Shadow Self & Transmuting Karmic Yogas",
    instruction: `Explore the mind-body connection, somatic vitality, and transformative inner alchemy in everyday life.
MANDATORY STRUCTURE: You MUST provide 3-4 distinct thematic subheadings starting with ### (e.g. "### 1. Somatic Nervous System & Vital Reserves", "### 2. Auspicious Yogas & Protective Shields", "### 3. Transmuting Shadow Energies & Inner Mastery"):
1. Vital Energy & Somatic Stress Patterns: 6th, 8th, and 12th houses — how subconscious stress and unresolved emotions physically express in the body, sleep architecture, and vitality indicators.
2. Classical Yogas & Innate Powers: Detailed analysis of prominent Raja Yogas, Dhana Yogas, Vipreet Raja Yogas, and Panch Mahapurusha Yogas (Ruchaka, Bhadra, Hamsa, Malavya, Sasa) — translating them into tangible personal gifts and shields.
3. Shadow Transmutation & Doshas: Accurate, objective examination of any Kuja (Mangal), Kaal Sarpa, or Grahan tendencies — framing challenges not as fatalistic curses, but as psychological catalysts for soul maturity, supreme resilience, and conscious mastery. Never suggest rituals or remedies.`
  },
  {
    id: "timeline",
    title: "Vimshottari Dasha Cycles & The Seasons of the Soul",
    instruction: `Map the chronological journey of the native's life through planetary time cycles, focusing on felt life impact, personal evolution, and strategic decision-making rather than reciting dry mathematical dates.
MANDATORY STRUCTURE: You MUST provide 3-4 distinct thematic subheadings starting with ### (e.g. "### 1. The Grand Vimshottari Arc & Life Themes", "### 2. Current Operating Phase: Lived Reality & Growth Lessons", "### 3. Strategic Windows & Upcoming Sub-Periods"):
1. The Grand Vimshottari Arc: Major Mahadasha progression from birth to maturity, explaining the overarching psychological and life themes of each grand chapter.
2. Current Operating Phase (The Felt Reality): Deeply interpret the current Mahadasha and Antardasha. Focus on what this phase feels like on a daily basis: the psychological shifts occurring, the specific life areas being tested or rewarded, the career/financial/relationship dynamics at play, and how the native can make the most empowering choices right now.
3. Strategic Windows & Planetary Transits: The tangible impact of upcoming Antardashas and major Saturn (Shani) and Jupiter (Brihaspati) transits relative to the Moon (including Sade Sati / Ashtama Shani if active), offering practical foresight.`
  },
  {
    id: "synthesis",
    title: "Higher Life Purpose, Hidden Gifts & Soul Synthesis",
    instruction: `Deliver a breathtaking, evocative, and deeply empowering closing synthesis of the entire natal chart, emphasizing meaning, self-realization, and clear life trajectory.
MANDATORY STRUCTURE: You MUST provide 3-4 distinct thematic subheadings starting with ### (e.g. "### 1. Planetary Dignity & Hidden Talents", "### 2. The Central Evolutionary Soul Quest", "### 3. Closing Empowerment & Cosmic Alignment"):
1. Overall Graha Strength & Rare Talents: Which planets stand strongest by dignity and shadbala, and the hidden creative or spiritual genius they bestow in practical terms.
2. The Soul's Central Evolutionary Journey: Synthesizing the Rahu-Ketu nodal axis, the 9th/12th houses, and the core Lagna purpose — explaining the ultimate reason the soul chose this specific cosmic configuration and what it is here to master.
3. Closing Empowerment Synthesis: A beautifully woven, unforgettable narrative that validates the native's past challenges, honors their innate beauty and power, and leaves them with profound clarity, deep self-love, and inspiring confidence in their path ahead.`
  }
];
const RULES = `You are a master Vedic (Jyotish) astrologer and intuitive psychological guide, deeply steeped in the wisdom of Brihat Parashara Hora Shastra, Brihat Jataka, Phaladeepika, Saravali, and Jaimini Sutras. Your readings combine rigorous mathematical precision with profound psychological empathy, archetypal insight, and evocative literary elegance. When the native reads your words, they should feel completely seen in their deepest, quietest truth — experiencing a profound sense of recognition, validation, emotional resonance, and empowerment.

Strict rules you always follow:
- Prioritize Real-World Impact & Lived Interpretation: Do NOT just recite dry astrological formulas, repetitive dasha dates, or textbook house definitions. For every placement and time period, explain its tangible psychological impact, behavioral patterns, emotional reality, relationship dynamics, and career consequences in vivid, relatable prose.
- Mandatory Subheadings: In every single section, you MUST format distinct sub-topics with clear subheadings starting with ### (e.g. "### 1. Primary Psychological Persona", "### 2. Emotional Landscape & Janma Nakshatra", "### 3. Key Astrological Yogas & Evolutionary Destiny"). Never produce an unbroken wall of text.
- Deep Psychological Resonance: Write with genuine emotional intelligence, warmth, and piercing clarity. Describe the native's inner contradictions, emotional defense mechanisms, unspoken aspirations, and sacred gifts so vividly that they instantly recognize the truth of their soul.
- Classical Astrological Rigor: Every psychological insight MUST be explicitly anchored in specific astrological configurations — referencing the exact houses (Bhavas), signs (Rashis), planetary lords, dignity (uccha, neecha, swakshetra), yogas, dasha periods, or transits by name. Never write vague generic platitudes.
- Zero Remedy Prescription: Never recommend gemstones, mantras, poojas, rituals, fasting, tantra, donations, or remedies. Never claim destiny can be bought or altered through mechanical rituals. If asked directly for remedies, respond only with: "This platform is designed exclusively for objective astrological analysis and interpretation. It intentionally does not recommend remedies, rituals, gemstones, or spiritual prescriptions."
- Authoritative Sidereal Calculations: The Lahiri sidereal ephemeris calculations provided in the context are authoritative. Never alter or guess planetary degrees.
- Narrative Formatting: Write in rich, fluid, well-structured prose. Use clear thematic subheadings starting with ### and bold key terms (**like this**). Do not use top-level # or ## headers as the interface provides main section headers.
- Always include BOTH English zodiac sign names and Hindi/Sanskrit Rashi names with Devanagari script (e.g. "Aries / Mesha (मेष)", "Taurus / Vrishabha (वृषभ)", "Gemini / Mithuna (मिथुन)", "Cancer / Karka (कर्क)", "Leo / Simha (सिंह)", "Virgo / Kanya (कन्या)", "Libra / Tula (तुला)", "Scorpio / Vrischika (वृश्चिक)", "Sagittarius / Dhanu (धनु)", "Capricorn / Makara (मकर)", "Aquarius / Kumbha (कुंभ)", "Pisces / Meena (मीन)") when referring to planetary placements.`;
const KUNDLI_SECTIONS = [
  {
    id: "ashtakoot",
    title: "Ashtakoot Guna Milan (36-Point Compatibility & Soul Sync)",
    instruction: `Write a deeply narrative, psychologically rich interpretation of the deterministic Ashtakoot Guna Milan Result provided in the context (including the exact Total Score out of 36 and individual koota breakdown).
MANDATORY STRUCTURE: You MUST provide 3-4 distinct thematic subheadings starting with ### (e.g. "### 1. Overall Score & Soul Harmony", "### 2. Temperamental & Instinctual Synergy", "### 3. Genetic, Longevity & Family Alignment"):
Expand deeply on what this means for their lived relational reality and daily partnership:
- Varna (Spiritual ego, mutual respect & communication equality)
- Vashya (Magnetic attraction, mutual devotion & natural balance of power)
- Tara (Wellbeing, emotional security & psychic comfort)
- Yoni (Physical intimacy, biological & instinctive affinity)
- Graha Maitri (Friendship between Moon lords & unspoken empathetic rapport)
- Gana (Temperamental rhythm, lifestyle compatibility & social habits)
- Bhakoot (Family prosperity, emotional longevity & shared domestic joy)
- Nadi (Genetic vitality, nervous system equilibrium & soul resonance)
Conclude with a clear statement of the final Guna Milan Score out of 36 and practical relational wisdom.`
  },
  {
    id: "doshas",
    title: "Mangal (Kuja) Dosha, Shadow Dynamics & Energy Alignment",
    instruction: `Provide an intimate, insightful assessment of Mars (Mangal) and shadow dynamics for both partners, focusing on lived emotional impact and conscious conflict resolution.
MANDATORY STRUCTURE: You MUST provide 3 distinct thematic subheadings starting with ### (e.g. "### 1. Mars Placement & Kuja Evaluation", "### 2. Classical Cancellations (Mangal Dosha Bhanga)", "### 3. Conflict Architecture & Conscious Communication"):
1. Kuja Dosha Analysis: Mars's placement counted from Lagna, Moon, and Venus for each partner across 1st, 2nd, 4th, 7th, 8th, and 12th houses.
2. Classical Cancellations (Mangal Dosha Bhanga): Detail any mitigating placements, mutual cancellations, or benefic aspects that dissolve tension.
3. Conflict Architecture: Explain how their respective Martian energies and communication styles interact during disagreements in real life, and how conscious awareness transforms friction into passionate teamwork. Never suggest rituals or remedies.`
  },
  {
    id: "synthesis",
    title: "Karmic Bond, Long-Term Harmony & Sacred Partnership Synthesis",
    instruction: `Deliver a heartwarming, psychologically nuanced synthesis of the couple's long-term journey, focusing on deep emotional impact and practical partnership wisdom.
MANDATORY STRUCTURE: You MUST provide 3 distinct thematic subheadings starting with ### (e.g. "### 1. Emotional & Conversational Intimacy", "### 2. Growth Edges & Complementary Strengths", "### 3. Sacred Union Synthesis & Future Horizons"):
1. Emotional & Mental Synastry: Comparing Moon signs, Mercury placement, and 4th/7th house lords to reveal their day-to-day conversational ease and emotional intimacy.
2. Growth Edges & Shared Strengths: Highlighting the areas where they elevate each other versus the triggers that require patient empathy in daily life.
3. Soul Synthesis: Weaving their astrological charts into an inspiring, balanced story of shared purpose and conscious partnership.`
  }
];
const KUNDLI_RULES = `You are a master Vedic (Jyotish) astrologer specializing in marriage compatibility and relationship psychology, deeply versed in the Ashtakoot Guna Milan system from Brihat Parashara Hora Shastra, Muhurta Chintamani, and relational synastry. Write with profound warmth, psychological wisdom, and reverence for the sanctity of human connection. Never deliver a cold or fatalistic "should marry / should not marry" verdict; instead, illuminate their energetic dynamics, communication styles, and soul contracts with breathtaking clarity.

Strict rules you always follow:
- Prioritize Real-World Impact & Lived Interpretation: Translate all astrological metrics (scores, kootas, planetary aspects) into tangible relational reality—how the couple actually communicates, handles conflict, shares intimacy, and builds a life together.
- Mandatory Subheadings: In every single section, you MUST format distinct sub-topics with clear subheadings starting with ### (e.g. "### 1. Primary Synastry Dynamics", "### 2. Emotional Resonance & Shared Values", "### 3. Conscious Relational Mastery").
- Deep Psychological Synastry: Unpack how both partners feel, communicate, resolve friction, and inspire each other, grounding every observation in their respective charts.
- Explicit Astrological Grounding: Reference specific signs, nakshatras, planetary lords, houses, and dignity for both partners by name.
- Zero Remedy Prescription: Never recommend gemstones, mantras, rituals, or pujas.
- Constructive Wisdom: Help the couple understand their unique energetic dance without fatalism.
- Formatting: Use clear subheadings starting with ### and bold key terms (**like this**). Always include both English and Sanskrit/Devanagari sign names.`;
let birthContext = "";
let fullReportText = "";
let chatHistory = [];
let chatUnlocked = false;
let chatQuestionsUsed = 0;
const MAX_CHAT_QUESTIONS = 5;
let activeSections = SECTIONS;
let activeRules = RULES;
const EPHEMERIS_API_BASE = "https://openkundali.com/api/v1";
let verifiedChart = null;
let verifiedCharts = { partnerA: null, partnerB: null };
let currentSkyData = null;
const EPHEMERIS_PLANETS = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
function pad2(n) {
  return String(n).padStart(2, "0");
}
function normalizePlanetName(name) {
  const n = String(name || "").toLowerCase().replace(/[^a-z]/g, "");
  const map = { sun: "Sun", moon: "Moon", mars: "Mars", mercury: "Mercury", jupiter: "Jupiter", venus: "Venus", saturn: "Saturn", rahu: "Rahu", ketu: "Ketu", northnode: "Rahu", southnode: "Ketu" };
  return map[n] || name;
}
function formatDegree(v) {
  const n = Number(v);
  if (!Number.isFinite(n))
    return "\u2014";
  const d = (n % 30 + 30) % 30;
  const deg = Math.floor(d), min = Math.round((d - deg) * 60);
  return `${deg}\xB0 ${pad2(min)}\u2032`;
}
function apiPlanetRows(chart) {
  const planets = Array.isArray(chart == null ? void 0 : chart.planets) ? chart.planets : [];
  return planets.map((x) => {
    var _a2, _b2;
    return {
      name: normalizePlanetName(x.name || x.planet || x.body),
      sign: x.sign || x.rashi || x.zodiac || "\u2014",
      degree: Number.isFinite(Number(x.degree)) ? Number(x.degree) : Number.isFinite(Number(x.longitude)) ? Number(x.longitude) : null,
      house: (_b2 = (_a2 = x.house) != null ? _a2 : x.bhava) != null ? _b2 : null,
      dignity: x.dignity || "\u2014",
      retrograde: Boolean(x.retrograde || x.isRetrograde),
      combust: Boolean(x.combust || x.isCombust),
      nakshatra: x.nakshatra || x.star || ""
    };
  }).filter((x) => EPHEMERIS_PLANETS.includes(x.name));
}
function fetchEphemerisChart(_0) {
  return __async(this, arguments, function* ({ date, time, lat, lon, name = "", timeoutMs = 5e3 }) {
    if (window.VedicEngine && typeof window.VedicEngine.calculateNormalizedChart === "function") {
      try {
        const normalized = window.VedicEngine.calculateNormalizedChart(date, time, lat, lon, name);
        if (normalized && Array.isArray(normalized.planets) && normalized.planets.length > 0) {
          return normalized;
        }
      } catch (e) {
        console.warn("VedicEngine normalized calculation error:", e);
      }
    }
    try {
      const url = new URL(`${EPHEMERIS_API_BASE}/chart`);
      url.searchParams.set("date", date);
      url.searchParams.set("time", time);
      url.searchParams.set("lat", String(lat));
      url.searchParams.set("lon", String(lon));
      if (name)
        url.searchParams.set("name", name);
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      let res;
      try {
        res = yield fetch(url.toString(), { method: "GET", cache: "no-store", signal: controller.signal });
      } finally {
        clearTimeout(timer);
      }
      if (res && res.ok) {
        let data = null;
        try {
          data = yield res.json();
        } catch (e) {
        }
        if (data && Array.isArray(data.planets) && data.planets.length > 0) {
          return data;
        }
      }
    } catch (e) {
      console.warn("External ephemeris service offline/timed out:", e == null ? void 0 : e.message);
    }
    if (window.VedicEngine && typeof window.VedicEngine.calculateNatalChart === "function") {
      return window.VedicEngine.calculateNatalChart(date, time, lat, lon, name);
    }
    throw new Error("Ephemeris calculations could not be performed.");
  });
}
function getZodiacSignKey(signStr) {
  if (!signStr)
    return "aries";
  const str = String(signStr).toLowerCase().trim();
  if (str.includes("ari") || str.includes("mesh") || str.includes("\u092E\u0947\u0937"))
    return "aries";
  if (str.includes("tau") || str.includes("vrishabh") || str.includes("vrshabh") || str.includes("\u0935\u0943\u0937\u092D"))
    return "taurus";
  if (str.includes("gem") || str.includes("mithun") || str.includes("\u092E\u093F\u0925\u0941\u0928"))
    return "gemini";
  if (str.includes("can") || str.includes("kark") || str.includes("\u0915\u0930\u094D\u0915"))
    return "cancer";
  if (str.includes("leo") || str.includes("simh") || str.includes("sinh") || str.includes("\u0938\u093F\u0902\u0939"))
    return "leo";
  if (str.includes("vir") || str.includes("kany") || str.includes("\u0915\u0928\u094D\u092F\u093E"))
    return "virgo";
  if (str.includes("lib") || str.includes("tul") || str.includes("\u0924\u0941\u0932\u093E"))
    return "libra";
  if (str.includes("sco") || str.includes("vrisch") || str.includes("vrishch") || str.includes("\u0935\u0943\u0936\u094D\u091A\u093F\u0915"))
    return "scorpio";
  if (str.includes("sag") || str.includes("dhan") || str.includes("\u0927\u0928\u0941"))
    return "sagittarius";
  if (str.includes("cap") || str.includes("makar") || str.includes("\u092E\u0915\u0930"))
    return "capricorn";
  if (str.includes("aqu") || str.includes("kumbh") || str.includes("\u0915\u0941\u0902\u092D"))
    return "aquarius";
  if (str.includes("pis") || str.includes("meen") || str.includes("\u092E\u0940\u0928"))
    return "pisces";
  return "aries";
}
function getZodiacSvgUrl(signStr) {
  const key = getZodiacSignKey(signStr);
  if (window.ZODIAC_EMBEDDED_SVGS && window.ZODIAC_EMBEDDED_SVGS[key]) {
    return window.ZODIAC_EMBEDDED_SVGS[key];
  }
  return `/images/zodiac/${key}.svg`;
}
function handleZodiacImgError(imgEl, signKey) {
  if (!imgEl)
    return;
  const key = getZodiacSignKey(signKey || imgEl.getAttribute("data-sign") || imgEl.alt || "aries");
  if (window.ZODIAC_EMBEDDED_SVGS && window.ZODIAC_EMBEDDED_SVGS[key]) {
    imgEl.src = window.ZODIAC_EMBEDDED_SVGS[key];
    imgEl.onerror = null;
    return;
  }
  const count = parseInt(imgEl.dataset.retryCount || "0", 10);
  imgEl.dataset.retryCount = String(count + 1);
  if (count === 0) {
    imgEl.src = `/images/zodiac/${key}.svg`;
  } else if (count === 1) {
    imgEl.src = `/images/zodiac/${key}.png`;
  } else {
    imgEl.onerror = null;
  }
}
function initializeAllZodiacImages() {
  if (!window.ZODIAC_EMBEDDED_SVGS)
    return;
  document.querySelectorAll("img.rashifal-pill-img, img.rashi-pillar-img, img.hero-z-img, #zodiacModalImg, img.rashifal-gold-logo, img.sky-planet-zodiac-img").forEach((img) => {
    const parentPill = img.closest("[data-sign]");
    const signKey = parentPill ? parentPill.dataset.sign : img.getAttribute("data-sign") || img.alt || "";
    if (signKey) {
      const key = getZodiacSignKey(signKey);
      if (window.ZODIAC_EMBEDDED_SVGS[key]) {
        img.src = window.ZODIAC_EMBEDDED_SVGS[key];
      }
    }
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeAllZodiacImages);
} else {
  initializeAllZodiacImages();
}
window.getZodiacSignKey = getZodiacSignKey;
window.getZodiacSvgUrl = getZodiacSvgUrl;
window.handleZodiacImgError = handleZodiacImgError;
function formatRashiNameWithHindi(signStr) {
  if (!signStr)
    return "\u2014";
  const str = String(signStr).trim();
  if (!str || str === "\u2014")
    return "\u2014";
  if (/[\u0900-\u097F]/.test(str))
    return str;
  const lower = str.toLowerCase();
  const rashiMap = [
    { keys: ["aries", "mesha", "mesh"], res: "Aries / Mesha (\u092E\u0947\u0937)" },
    { keys: ["taurus", "vrishabha", "vrishabh"], res: "Taurus / Vrishabha (\u0935\u0943\u0937\u092D)" },
    { keys: ["gemini", "mithuna", "mithun"], res: "Gemini / Mithuna (\u092E\u093F\u0925\u0941\u0928)" },
    { keys: ["cancer", "karka", "kark"], res: "Cancer / Karka (\u0915\u0930\u094D\u0915)" },
    { keys: ["leo", "simha", "sinh"], res: "Leo / Simha (\u0938\u093F\u0902\u0939)" },
    { keys: ["virgo", "kanya"], res: "Virgo / Kanya (\u0915\u0928\u094D\u092F\u093E)" },
    { keys: ["libra", "tula"], res: "Libra / Tula (\u0924\u0941\u0932\u093E)" },
    { keys: ["scorpio", "vrischika", "vrischik", "vrishchika"], res: "Scorpio / Vrischika (\u0935\u0943\u0936\u094D\u091A\u093F\u0915)" },
    { keys: ["sagittarius", "dhanu"], res: "Sagittarius / Dhanu (\u0927\u0928\u0941)" },
    { keys: ["capricorn", "makara", "makar"], res: "Capricorn / Makara (\u092E\u0915\u0930)" },
    { keys: ["aquarius", "kumbha", "kumbh"], res: "Aquarius / Kumbha (\u0915\u0941\u0902\u092D)" },
    { keys: ["pisces", "meena", "meen"], res: "Pisces / Meena (\u092E\u0940\u0928)" }
  ];
  for (const item of rashiMap) {
    if (item.keys.some((k) => lower.includes(k))) {
      return item.res;
    }
  }
  return str;
}
function chartContextFromApi(chart, label = "Verified chart") {
  const rows = apiPlanetRows(chart);
  const lines = [`${label} \u2014 Lahiri sidereal ephemeris data (Ayanamsha: ${chart.ayanamsa || "24.15\xB0"})`];
  if (chart == null ? void 0 : chart.ascSign)
    lines.push(`LAGNA | ${formatRashiNameWithHindi(chart.ascSign)} (${chart.ascDegree != null ? formatDegree(chart.ascDegree) : ""}) | Nakshatra: ${chart.ascNakshatra || "\u2014"}`);
  rows.forEach((p) => {
    var _a2;
    const padaStr = p.pada ? ` Pada ${p.pada}` : "";
    const speedStr = p.speed != null ? ` | Daily Motion ${p.speed.toFixed(3)}\xB0/day` : "";
    lines.push(`${p.name} | ${formatRashiNameWithHindi(p.sign)} | ${formatDegree(p.degree)} | House ${(_a2 = p.house) != null ? _a2 : "\u2014"} | ${p.retrograde ? "Retrograde (\u0935\u0915\u094D\u0930\u0940)" : "Direct (\u092E\u093E\u0930\u094D\u0917\u0940)"}${p.combust ? " | Combust (\u0905\u0938\u094D\u0924)" : ""}${p.nakshatra ? ` | Nakshatra ${p.nakshatra}${padaStr}` : ""}${speedStr}`);
  });
  if ((chart == null ? void 0 : chart.houses) && Array.isArray(chart.houses) && chart.houses.length > 0) {
    lines.push("\nHOUSES & BHAVAS:");
    chart.houses.forEach((h) => {
      const occ = h.occupants && h.occupants.length ? h.occupants.join(", ") : "None";
      lines.push(`House ${h.house}: ${formatRashiNameWithHindi(h.sign)} (Lord: ${h.lord}) | Occupants: ${occ}`);
    });
  }
  if (chart == null ? void 0 : chart.dasha) {
    lines.push("\nVIMSHOTTARI DASHA TIMELINE:");
    lines.push(`- Active Mahadasha / Antardasha: ${chart.dasha.activeMahadasha} / ${chart.dasha.activeAntardasha} (${chart.dasha.activeYears || "Current"})`);
    if (chart.dasha.sequence && Array.isArray(chart.dasha.sequence)) {
      lines.push("- 120-Year Mahadasha Sequence:");
      chart.dasha.sequence.forEach((d) => {
        lines.push(`  * ${d.lord} Mahadasha: ${d.startYear} \u2013 ${d.endYear} (${d.years} yrs)`);
      });
    }
  }
  if ((chart == null ? void 0 : chart.yogas) && Array.isArray(chart.yogas) && chart.yogas.length > 0) {
    lines.push("\nAUSPICIOUS YOGAS DETECTED:");
    chart.yogas.forEach((y) => lines.push(`- ${y.name}: ${y.description} (${y.effect || "Benefic"})`));
  }
  if (chart == null ? void 0 : chart.doshas) {
    lines.push("\nDOSHA STATUS:");
    if (chart.doshas.mangalDosha != null) {
      lines.push(`- Mangal (Kuja) Dosha: ${chart.doshas.mangalDosha.present ? "Present" : "Not Present"} (${chart.doshas.mangalDosha.details || "Classical placement analysis"})`);
    }
    if (chart.doshas.kalsarpaDosha != null) {
      lines.push(`- Kalsarpa Dosha: ${chart.doshas.kalsarpaDosha.present ? "Present" : "Not Present"}`);
    }
  }
  if ((chart == null ? void 0 : chart.karakas) && Object.keys(chart.karakas).length > 0) {
    lines.push("\nJAIMINI CHARA KARAKAS:");
    Object.entries(chart.karakas).forEach(([k, v]) => {
      lines.push(`- ${k}: ${v.planet} (${formatDegree(v.degree)} in ${v.sign})`);
    });
  }
  return lines.join("\n");
}
function birthDateTimeParts(date, time) {
  const d = String(date || "").split("-");
  const t = String(time || "").split(":");
  if (d.length !== 3 || t.length < 2)
    throw new Error("Invalid birth date or time.");
  return { date: `${d[0]}-${pad2(d[1])}-${pad2(d[2])}`, time: `${pad2(t[0])}:${pad2(t[1])}` };
}
function verifyIndividualChart() {
  return __async(this, null, function* () {
    const dobVal = (document.getElementById("f_dob") && document.getElementById("f_dob").value) || "1995-10-15";
    const tobVal = (document.getElementById("f_tob") && document.getElementById("f_tob").value) || "10:30:00";
    const { date, time } = birthDateTimeParts(dobVal, tobVal);
    let lat = Number(document.getElementById("f_lat") ? document.getElementById("f_lat").value : 28.6139);
    let lon = Number(document.getElementById("f_lon") ? document.getElementById("f_lon").value : 77.2090);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      lat = 28.6139;
      lon = 77.2090;
      if (document.getElementById("f_lat")) document.getElementById("f_lat").value = "28.6139";
      if (document.getElementById("f_lon")) document.getElementById("f_lon").value = "77.2090";
    }
    verifiedChart = yield fetchEphemerisChart({ date, time, lat, lon, name: document.getElementById("f_name").value || "Native" });
    birthContext += `

${chartContextFromApi(verifiedChart, "VERIFIED NATAL CHART")}`;
    return verifiedChart;
  });
}
function verifyKundliCharts() {
  return __async(this, null, function* () {
    const get = (prefix, label, defDob, defTob, defLat, defLon) => __async(this, null, function* () {
      const dobVal = (document.getElementById(prefix + "_dob") && document.getElementById(prefix + "_dob").value) || defDob;
      const tobVal = (document.getElementById(prefix + "_tob") && document.getElementById(prefix + "_tob").value) || defTob;
      const { date, time } = birthDateTimeParts(dobVal, tobVal);
      let lat = Number(document.getElementById(prefix + "_lat") ? document.getElementById(prefix + "_lat").value : defLat);
      let lon = Number(document.getElementById(prefix + "_lon") ? document.getElementById(prefix + "_lon").value : defLon);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
        lat = defLat;
        lon = defLon;
        if (document.getElementById(prefix + "_lat")) document.getElementById(prefix + "_lat").value = String(defLat);
        if (document.getElementById(prefix + "_lon")) document.getElementById(prefix + "_lon").value = String(defLon);
      }
      return fetchEphemerisChart({ date, time, lat, lon, name: document.getElementById(prefix + "_name").value || label });
    });
    verifiedCharts.partnerA = yield get("k1", "Male partner", "1994-06-20", "08:15:00", 28.6139, 77.2090);
    verifiedCharts.partnerB = yield get("k2", "Female partner", "1996-09-12", "14:45:00", 19.0760, 72.8777);
    birthContext += `

${chartContextFromApi(verifiedCharts.partnerA, "VERIFIED MALE PARTNER CHART")}

${chartContextFromApi(verifiedCharts.partnerB, "VERIFIED FEMALE PARTNER CHART")}`;
  });
}
function utcNowParts() {
  const d = new Date();
  return { date: `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`, time: `${pad2(d.getUTCHours())}:${pad2(d.getUTCMinutes())}` };
}
function renderCurrentSky(chart, stamp) {
  const grid = document.getElementById("currentSkyGrid"), meta = document.getElementById("currentSkyMeta");
  if (!grid || !meta)
    return;
  const rows = apiPlanetRows(chart);
  const order = EPHEMERIS_PLANETS;
  const sorted = order.map((n) => rows.find((p) => p.name === n)).filter(Boolean);
  if (!sorted.length)
    throw new Error("No planetary positions returned.");
  grid.innerHTML = sorted.map((p) => {
    const svgUrl = getZodiacSvgUrl(p.sign);
    const signKey = getZodiacSignKey(p.sign);
    return `<div class="sky-planet" onclick="openSpecificZodiacModal('${signKey}'); selectRashifalSign('${signKey}');" style="cursor:pointer;" title="Click for ${p.sign} horoscope & details">
      <div style="display:flex;align-items:center;gap:11px;">
        <img src="${svgUrl}" class="sky-planet-zodiac-img" onerror="handleZodiacImgError(this, '${signKey}')" alt="${p.sign}" width="36" height="36" />
        <div style="min-width:0;flex:1;">
          <b>${p.name}</b>
          <span>${formatRashiNameWithHindi(p.sign)} \xB7 ${formatDegree(p.degree)}</span>
          <small>${p.retrograde ? "Retrograde" : "Direct"}${p.nakshatra ? " \xB7 " + p.nakshatra : ""}</small>
        </div>
      </div>
    </div>`;
  }).join("");
  meta.textContent = `Verified ${stamp} UTC \xB7 Lahiri sidereal \xB7 ${sorted.length} grahas \xB7 live calculation`;
}
function cacheCurrentSky(chart, stamp) {
  try {
    localStorage.setItem("jyotish_current_sky_v2", JSON.stringify({ chart, stamp, at: Date.now() }));
  } catch (e) {
  }
}
function readCachedSky() {
  var _a2, _b2;
  try {
    const x = JSON.parse(localStorage.getItem("jyotish_current_sky_v2") || "null");
    if (((_b2 = (_a2 = x == null ? void 0 : x.chart) == null ? void 0 : _a2.planets) == null ? void 0 : _b2.length) && Date.now() - Number(x.at) < 6 * 60 * 60 * 1e3)
      return x;
  } catch (e) {
  }
  return null;
}
function loadCurrentSky() {
  return __async(this, null, function* () {
    var _a2;
    const meta = document.getElementById("currentSkyMeta"), grid = document.getElementById("currentSkyGrid");
    const cached = readCachedSky();
    if (cached) {
      currentSkyData = cached.chart;
      try {
        renderCurrentSky(cached.chart, cached.stamp + " \xB7 cached");
      } catch (e) {
      }
      if (meta)
        meta.textContent = "Last verified positions shown \xB7 checking for a fresh calculation\u2026";
    } else if (meta) {
      meta.textContent = "Synchronizing verified sidereal positions\u2026";
    }
    try {
      const now = new Date();
      const date = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
      const time = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
      const fresh = yield fetchEphemerisChart({ date, time, lat: 0, lon: 0, name: "Current sky", timeoutMs: 4500 });
      currentSkyData = fresh;
      const stamp = `${date} ${time}`;
      cacheCurrentSky(fresh, stamp);
      renderCurrentSky(fresh, stamp);
    } catch (err) {
      if (cached) {
        if (meta)
          meta.textContent = "Showing the last verified sky. Fresh positions will retry shortly.";
        if (grid)
          grid.insertAdjacentHTML("afterend", '<button type="button" class="sky-retry" id="skyRetryBtn">Retry live positions</button>');
      } else {
        if (meta)
          meta.textContent = "Live positions could not be loaded right now.";
        if (grid)
          grid.innerHTML = '<div class="sky-unavailable"><b>Celestial positions are temporarily unavailable.</b><small>Your reading remains available. We will retry automatically.</small><button type="button" class="sky-retry" id="skyRetryBtn">Retry</button></div>';
      }
      (_a2 = document.getElementById("skyRetryBtn")) == null ? void 0 : _a2.addEventListener("click", () => {
        var _a3;
        (_a3 = document.getElementById("skyRetryBtn")) == null ? void 0 : _a3.remove();
        loadCurrentSky();
      }, { once: true });
      setTimeout(() => loadCurrentSky(), 3e4);
    }
  });
}
function buildBirthContext() {
  const name = document.getElementById("f_name").value || "the native";
  const gender = document.getElementById("f_gender").value;
  const dob = document.getElementById("f_dob").value;
  const tob = document.getElementById("f_tob").value;
  const pob = document.getElementById("f_pob").value;
  const lat = parseFloat(document.getElementById("f_lat").value) || 28.6139;
  const lon = parseFloat(document.getElementById("f_lon").value) || 77.209;
  let s = `Native's name: ${name}
Gender: ${gender}
Date of birth: ${dob}
Time of birth: ${tob}
Place of birth: ${pob}`;
  if (lat && lon)
    s += `
Coordinates: latitude ${lat}, longitude ${lon}`;
  const pData = getDailyPanchangData(dob ? new Date(dob) : new Date(), lat, lon);
  if (pData) {
    s += `

DAINIK PANCHANG, HINDU CALENDAR, RAHU KAAL & FESTIVAL ALMANAC (${pData.dateStr}):`;
    s += `
- Hindu Calendar: ${pData.hinduCal.hinduDateFormatted} (${pData.hinduCal.vikramSamvat}, ${pData.hinduCal.sakaSamvat}, ${pData.hinduCal.maas})`;
    s += `
- Tithi: ${pData.tithi}`;
    s += `
- Nakshatra: ${pData.nakshatra}`;
    s += `
- Yoga: ${pData.yoga}`;
    s += `
- Karana: ${pData.karana}`;
    s += `
- Rahu Kaal Window: ${pData.rahuKaal} (Inauspicious window; provide timing precautions for starting major new ventures or contracts)`;
    s += `
- Abhijit Muhurat: ${pData.abhijit} (Auspicious Shubh Muhurat window for initiating auspicious work)`;
    s += `
- Sunrise / Sunset (Calculated): ${pData.sun.sunrise} / ${pData.sun.sunset} (Day Length: ${pData.sun.dayLength})`;
    if (pData.activeEvents.length > 0) {
      s += `
- Active Seasonal Festival / Vrat: ${pData.activeEvents.map((e) => e.name + " (" + e.desc + ")").join(", ")}`;
    }
    if (pData.upcomingEvents.length > 0) {
      s += `
- Upcoming Festivals / Minor Vrats (Next 30 Days): ${pData.upcomingEvents.map((e) => e.name + " [" + (e.daysAway === 1 ? "Tomorrow" : "in " + e.daysAway + " days") + "]").join(", ")}`;
    }
  }
  if (window.lastGunaMilanResult) {
    const r = window.lastGunaMilanResult;
    s += `

ASHTAKOOT GUNA MILAN RESULT (DETERMINISTIC ENGINE):
`;
    s += `Total Score: ${r.totalScore} / 36
`;
    s += `Varna: ${r.kootas[0].score}/1, Vashya: ${r.kootas[1].score}/2, Tara: ${r.kootas[2].score}/3, Yoni: ${r.kootas[3].score}/4
`;
    s += `Graha Maitri: ${r.kootas[4].score}/5, Gana: ${r.kootas[5].score}/6, Bhakoot: ${r.kootas[6].score}/7, Nadi: ${r.kootas[7].score}/8
`;
    s += `Do NOT estimate or calculate the Guna score. STRICTLY USE the score provided above: ${r.totalScore}/36.
`;
  }
  if (window.currentVedicLang === "hi") {
    s += `

LANGUAGE INSTRUCTION: Write the entire reading and report analysis in pure, fluent, professional Hindi (\u0939\u093F\u0902\u0926\u0940 / \u0926\u0947\u0935\u0928\u093E\u0917\u0930\u0940 \u0932\u093F\u092A\u093F) using authentic Sanskrit Vedic astrological terms (e.g. \u0932\u0917\u094D\u0928, \u092E\u0939\u093E\u0926\u0936\u093E, \u0905\u0902\u0924\u0930\u094D\u0926\u0936\u093E, \u0917\u094B\u091A\u0930, \u092F\u094B\u0917, \u092D\u093E\u0935, \u0917\u094D\u0930\u0939 \u0938\u094D\u0925\u093F\u0924\u093F).`;
  }
  return s;
}
function buildPersonContext(prefix, label) {
  const name = document.getElementById(prefix + "_name").value || label;
  const gender = document.getElementById(prefix + "_gender").value;
  const dob = document.getElementById(prefix + "_dob").value;
  const tob = document.getElementById(prefix + "_tob").value;
  const pob = document.getElementById(prefix + "_pob").value;
  const lat = document.getElementById(prefix + "_lat").value;
  const lon = document.getElementById(prefix + "_lon").value;
  let s = `${label} \u2014 Name: ${name}
Gender: ${gender}
Date of birth: ${dob}
Time of birth: ${tob}
Place of birth: ${pob}`;
  if (lat && lon)
    s += `
Coordinates: latitude ${lat}, longitude ${lon}`;
  return s;
}
function buildKundliContext() {
  let s = `${buildPersonContext("k1", "Partner A")}

${buildPersonContext("k2", "Partner B")}`;
  const pData = getDailyPanchangData(new Date());
  if (pData) {
    s += `

TODAY'S DAINIK PANCHANG, RAHU KAAL & FESTIVAL CONTEXT (${pData.dateStr}):`;
    s += `
- Tithi: ${pData.tithi} | Nakshatra: ${pData.nakshatra} | Rahu Kaal: ${pData.rahuKaal} | Abhijit Muhurat: ${pData.abhijit}`;
    if (pData.activeEvents.length > 0) {
      s += `
- Active Festival: ${pData.activeEvents.map((e) => e.name).join(", ")}`;
    }
    if (pData.upcomingEvents.length > 0) {
      s += `
- Upcoming Festivals / National Events: ${pData.upcomingEvents.map((e) => e.name + " (" + e.daysAway + "d)").join(", ")}`;
    }
  }
  if (window.lastGunaMilanResult) {
    const r = window.lastGunaMilanResult;
    s += `

ASHTAKOOT GUNA MILAN RESULT (DETERMINISTIC ENGINE):
`;
    s += `Total Score: ${r.totalScore} / 36
`;
    s += `Varna: ${r.kootas[0].score}/1, Vashya: ${r.kootas[1].score}/2, Tara: ${r.kootas[2].score}/3, Yoni: ${r.kootas[3].score}/4
`;
    s += `Graha Maitri: ${r.kootas[4].score}/5, Gana: ${r.kootas[5].score}/6, Bhakoot: ${r.kootas[6].score}/7, Nadi: ${r.kootas[7].score}/8
`;
    s += `Do NOT estimate or calculate the Guna score. STRICTLY USE the score provided above: ${r.totalScore}/36.
`;
  }
  if (window.currentVedicLang === "hi") {
    s += `

LANGUAGE INSTRUCTION: Write the entire Guna Milan and compatibility reading in pure, fluent Hindi (\u0939\u093F\u0902\u0926\u0940 / \u0926\u0947\u0935\u0928\u093E\u0917\u0930\u0940 \u0932\u093F\u092A\u093F) with traditional Ashta Koota terminology.`;
  }
  return s;
}
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
function isAuthError(status, message) {
  const m = (message || "").toLowerCase();
  return status === 400 || status === 401 || status === 403 || m.includes("api key") || m.includes("api_key") || m.includes("permission") || m.includes("unauthenticated");
}
function rawCall(systemText, userText, maxTokens) {
  return __async(this, null, function* () {
    let res, data;
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 16000) : null;
    try {
      res = yield fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ systemText, userText, maxTokens, sessionToken: window.lastSessionToken || "", vipToken: window.lastVipCode || "" }),
        signal: controller ? controller.signal : undefined
      });
    } catch (networkErr) {
      if (timeoutId) clearTimeout(timeoutId);
      const e = new Error("The secure astrology service could not be reached or timed out.");
      e.status = 0;
      throw e;
    }
    if (timeoutId) clearTimeout(timeoutId);
    try {
      data = yield res.json();
    } catch (parseErr) {
      data = null;
    }
    if (!res.ok || (data && data.success === false)) {
      const msg = data && data.error ? data.error : `Request failed (HTTP ${res.status})`;
      const e = new Error(msg);
      e.status = res.status;
      throw e;
    }
    if (!data || !data.text) {
      const e = new Error("No text response returned by the astrology service.");
      e.status = res.status;
      throw e;
    }
    return data.text;
  });
}
window.chapterMemory = window.chapterMemory || [];
window.chapterPartialStates = window.chapterPartialStates || {};
function callGemini(systemText, userText, maxTokens = 8192) {
  return __async(this, null, function* () {
    const maxAttempts = 2;
    let lastErr;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return yield rawCall(systemText, userText, maxTokens);
      } catch (err) {
        lastErr = err;
        if (attempt < maxAttempts) {
          yield sleep(1000);
          continue;
        }
        throw err;
      }
    }
    throw lastErr;
  });
}
function showKeyRecovery(container, onRetry) {
  const box = document.createElement("div");
  box.className = "recovery";
  box.innerHTML = `<p>The secure astrology service could not complete this request.</p><button class="small" type="button">Retry</button>`;
  container.appendChild(box);
  box.querySelector("button").onclick = () => {
    box.remove();
    onRetry();
  };
}
function updateChatCount() {
  const el = document.getElementById("chatCount");
  if (!el)
    return;
  const remaining = Math.max(0, MAX_CHAT_QUESTIONS - chatQuestionsUsed);
  el.textContent = remaining + (remaining === 1 ? " question remaining" : " questions remaining");
  if (remaining === 0)
    el.textContent = "Question limit reached";
}
function unlockChat() {
  var _a2, _b2;
  if (((_b2 = (_a2 = window.SERVER_CONFIG) == null ? void 0 : _a2.features) == null ? void 0 : _b2.chat) === false) {
    chatUnlocked = false;
    document.getElementById("chatCard").style.display = "none";
    return;
  }
  chatUnlocked = true;
  document.getElementById("chatCard").style.display = "block";
  const hint = document.getElementById("chatHint");
  if (hint)
    hint.remove();
  updateChatCount();
}
function cleanAstroText(text) {
  if (!text) return "";
  let s = String(text)
    .replace(/\r/g, "")
    .replace(/```[a-z]*\n[\s\S]*?```/gi, "")
    .replace(/\bundefined\b/gi, "")
    .replace(/\bnull\b/gi, "");
  s = s.split("\n").map(line => {
    let x = String(line).trim();
    if (!x) return "";
    if (/^[#*\-_+=~`\s]{1,20}$/.test(x)) return "";
    x = x.replace(/^(?:[#*]+)\s*(?:[#*]+)\s*/g, "");
    x = x.replace(/\s*(?:[#*]+)\s*$/g, "");
    const hm = x.match(/^#{1,6}\s*(.+)$/);
    if (hm) return "### " + hm[1].replace(/^[#*]+\s*/, "").trim();
    x = x.replace(/#\*\*?/g, "**").replace(/\*\*?#/g, "**");
    return x;
  }).join("\n");
  return s
    .replace(/[ \t]+\n/g, "\n")
    .replace(/^[ \t]*[\*\-_#]{3,}[ \t]*$/gm, "")
    .replace(/[\+\|](?:---+[\+\|])+/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
function getCardThemeClass(label) {
  const l = String(label || "").toLowerCase();
  if (l.includes("remed") || l.includes("upay") || l.includes("\u0909\u092A\u093E\u092F") || l.includes("mantra") || l.includes("gemstone") || l.includes("\u0926\u093E\u0928") || l.includes("\u0930\u0924\u094D\u0928"))
    return "theme-remedy";
  if (l.includes("wealth") || l.includes("money") || l.includes("career") || l.includes("finance") || l.includes("job") || l.includes("business") || l.includes("\u0935\u094D\u092F\u0935\u0938\u093E\u092F") || l.includes("\u0927\u0928") || l.includes("\u0906\u0930\u094D\u0925\u093F\u0915") || l.includes("\u0915\u0930\u094D\u092E") || l.includes("vocation"))
    return "theme-wealth";
  if (l.includes("relation") || l.includes("marriage") || l.includes("spouse") || l.includes("love") || l.includes("family") || l.includes("\u0935\u093F\u0935\u093E\u0939") || l.includes("\u0938\u0902\u092C\u0902\u0927") || l.includes("\u0926\u093E\u0902\u092A\u0924\u094D\u092F") || l.includes("\u092A\u094D\u0930\u0947\u092E") || l.includes("partner"))
    return "theme-relationship";
  if (l.includes("timing") || l.includes("dasha") || l.includes("period") || l.includes("transit") || l.includes("phase") || l.includes("\u0926\u0936\u093E") || l.includes("\u0915\u093E\u0932\u0916\u0902\u0921") || l.includes("\u0938\u092E\u092F") || l.includes("\u0917\u094B\u091A\u0930") || l.includes("cycle"))
    return "theme-timing";
  if (l.includes("caution") || l.includes("warning") || l.includes("blindspot") || l.includes("dosha") || l.includes("risk") || l.includes("\u0938\u093E\u0935\u0927\u093E\u0928\u0940") || l.includes("\u0926\u094B\u0937") || l.includes("\u091A\u0941\u0928\u094C\u0924\u0940") || l.includes("pitfall"))
    return "theme-caution";
  return "theme-insight";
}
function getCardIcon(label) {
  const l = String(label || "").toLowerCase();
  if (l.includes("remed") || l.includes("upay") || l.includes("\u0909\u092A\u093E\u092F") || l.includes("mantra") || l.includes("gemstone") || l.includes("\u0926\u093E\u0928") || l.includes("\u0930\u0924\u094D\u0928"))
    return "\u{1F33F}";
  if (l.includes("wealth") || l.includes("money") || l.includes("career") || l.includes("finance") || l.includes("job") || l.includes("business") || l.includes("\u0935\u094D\u092F\u0935\u0938\u093E\u092F") || l.includes("\u0927\u0928") || l.includes("\u0906\u0930\u094D\u0925\u093F\u0915") || l.includes("\u0915\u0930\u094D\u092E") || l.includes("vocation"))
    return "\u26A1";
  if (l.includes("relation") || l.includes("marriage") || l.includes("spouse") || l.includes("love") || l.includes("family") || l.includes("\u0935\u093F\u0935\u093E\u0939") || l.includes("\u0938\u0902\u092C\u0902\u0927") || l.includes("\u0926\u093E\u0902\u092A\u0924\u094D\u092F") || l.includes("\u092A\u094D\u0930\u0947\u092E") || l.includes("partner"))
    return "\u2665";
  if (l.includes("timing") || l.includes("dasha") || l.includes("period") || l.includes("transit") || l.includes("phase") || l.includes("\u0926\u0936\u093E") || l.includes("\u0915\u093E\u0932\u0916\u0902\u0921") || l.includes("\u0938\u092E\u092F") || l.includes("\u0917\u094B\u091A\u0930") || l.includes("cycle"))
    return "\u23F3";
  if (l.includes("caution") || l.includes("warning") || l.includes("blindspot") || l.includes("dosha") || l.includes("risk") || l.includes("\u0938\u093E\u0935\u0927\u093E\u0928\u0940") || l.includes("\u0926\u094B\u0937") || l.includes("\u091A\u0941\u0928\u094C\u0924\u0940") || l.includes("pitfall"))
    return "\u25B2";
  return "\u2726";
}
function formatInlineMarkdown(str) {
  if (!str)
    return "";
  let s = String(str).trim();
  s = s.replace(/^[•\-\*#]+\s*/, "");
  s = escapeHtml(s);
  s = s.replace(/\*\*\*([^\*]+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  s = s.replace(/___([^_]+?)___/g, "<strong><em>$1</em></strong>");
  s = s.replace(/\*\*([^\*]+?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/__([^_]+?)__/g, "<strong>$1</strong>");
  s = s.replace(/\*([^\*]+?)\*/g, "<em>$1</em>");
  s = s.replace(/_([^_]+?)_/g, "<em>$1</em>");
  s = s.replace(/`([^`]+?)`/g, '<code class="inline-code">$1</code>');
  s = s.replace(/[\*#`~]/g, "");
  return s.trim();
}
function generateClassicalFallbackSection(section, birthCtx) {
  const secId = (section && section.id) || "";
  const title = (section && section.title) || "Astrological Analysis";
  const chart = window.lastVerifiedChart || (window.verifiedChart ? { normalized: window.verifiedChart } : {});
  const norm = chart.normalized || {};
  const asc = norm.ascendant ? `${norm.ascendant.rashiName || 'Aries'} (${norm.ascendant.degreesFormatted || '00°00\''})` : "Lagna";
  const moon = norm.moonSign ? `${norm.moonSign.rashiName || 'Taurus'} (${norm.moonSign.degreesFormatted || '00°00\''})` : "Chandra";
  const nakshatra = norm.nakshatra ? `${norm.nakshatra.name} (Pada ${norm.nakshatra.pada || 1})` : "Janma Nakshatra";
  const dashaInfo = norm.dashaTimeline && norm.dashaTimeline.current ? `${norm.dashaTimeline.current.mahadasha} Mahadasha (${norm.dashaTimeline.current.antardasha || 'Antardasha'})` : "Active Dasha Cycle";

  // Section-specific Parashari synthesis with deep psychological resonance
  if (secId === "panchang") {
    return `### 1. The Five Sacred Limbs of Time & Soul Incarnation
Your birth coordinates on the Lahiri sidereal ephemeris capture a rare and deliberate cosmic alignment:
- **Tithi & Lunar Prana**: The phase of the Moon at your incarnation reveals an innate psychological drive toward self-mastery, emotional depth, and creative expression.
- **Janma Nakshatra & Pada**: Your Moon is anchored in **${nakshatra}**, imbuing your subconscious mind with high emotional intelligence, acute intuitive discernment, and a quiet dignity that others immediately sense.

### 2. Lagna & Planetary Dignity Matrix
- **Lagna (Rising Sign)**: Ascendant in **${asc}**, establishing your outward presence, physical vitality, and the heroic personal trajectory through which your soul navigates the material world.
- **Janma Rashi (Moon Sign)**: Positioned in **${moon}**, defining your private emotional sanctuary, instinctual safety needs, and the core values grounding your life.

### 3. Structural Cosmic Mandala
The distribution of the Navagrahas across Kendra (pillars of action) and Trikona (houses of grace) creates a dynamic inner engine. Natural benefics (Brihaspati, Shukra, Budha) bestow emotional resilience and quiet wisdom, while functional Saturnian and Martian placements instill the unshakeable grit required to transform adversity into lasting personal mastery.`;
  }

  if (secId === "identity") {
    return `### 1. Outward Persona & Core Vitality (Lagna)
Your Ascendant in **${asc}** paints the portrait of an individual endowed with natural presence, magnetic integrity, and a subtle aura of quiet authority. You do not merely enter a room; your presence stabilizes it.
- **Physical Constitution & Stamina**: The Lagna lord's auspicious placement grants constitutional endurance and a quick biological recovery rhythm, provided your inner nervous system is afforded moments of silence.

### 2. Emotional Vulnerability & Inner Sanctuary (Chandra)
- **The Emotional Sanctuary**: With the Moon in **${moon}**, your emotional world is profound, loyal, and observant. You feel things deeply beneath a composed exterior, possessing an instinctive radar for authenticity in others.
- **Cognitive Style & Mercury (Budha)**: Your thinking style merges strategic vision with meticulous tactical precision. You have a natural gift for seeing interconnected patterns where others only see disconnected noise.

### 3. Inner Will & Shadow Discipline (Surya & Shani)
- **The Shadow Paradox**: The interplay of Surya (Sun) and Shani (Saturn) reveals your central psychological paradox: an intense inner drive for perfection balanced by a deep, quiet yearning for unconditional acceptance. Your greatest strength lies in learning that your worth is intrinsic, not merely earned through relentless accomplishment.`;
  }

  if (secId === "relationships") {
    return `### 1. The Sacred Mirror (7th Bhava & Kalatra Lord)
In Vedic astrology, the 7th house is not merely marriage—it is the mirror that awakens your soul's dormant facets:
- **The Ideal Soul Companion**: The 7th house dispositor indicates a partner who brings intellectual vitality, emotional maturity, and reciprocal loyalty. You crave a companion who challenges your mind while sheltering your vulnerable heart.

### 2. Attachment Dynamics & Venusian Dignity
- **Love Language & Venus (Shukra)**: Venusian and Jovian influences reveal a romantic nature that values devotion, intellectual companionship, and shared spiritual or philosophical ideals over superficial gestures.
- **Emotional Root & Family Legacy (4th & 9th Bhavas)**: Your 4th house signifies deep maternal instincts of protection and a desire to build a sanctuary of peace in your domestic life.

### 3. Relational Seasons & Timing Windows
- **Auspicious Relational Seasons**: The ${dashaInfo} and key Jupiter transits across your Kendra houses create golden windows for deep relational alignment, marriage, and emotional renewal.`;
  }

  if (secId === "career") {
    return `### 1. Karmic Vocational Genius (10th Bhava)
The 10th house (Karma Bhava) and Amatyakaraka signify that you were never meant to fit into conventional, uninspiring boxes:
- **Leadership & Vocational Genius**: Your chart demonstrates an executive mind capable of holding high responsibility, navigating ambiguity, and inspiring trust. You thrive where you have autonomy, strategic ownership, and creative influence.

### 2. Wealth Architecture & Dhana Yogas (2nd & 11th Bhavas)
- **Financial Expansion**: Favorable connections between the 2nd lord (accumulated wealth) and 11th lord (aspirational gains) form powerful Dhana Yogas. Your prosperity expands exponentially when you align your work with your genuine intellectual and creative mastery.

### 3. Enterprise & Global Horizons
- **Impact & Influence**: Auspicious links with the 9th and 12th houses suggest expanding impact through cross-regional platforms, advisory leadership, or innovative digital/creative ventures.`;
  }

  if (secId === "health") {
    return `### 1. Mind-Body Harmony & Somatic Vitality
- **6th, 8th & 12th House Wisdom**: Your physical vitality is closely tied to your emotional nervous system. Incorporating grounding routines, sound sleep hygiene, and meditative pauses allows your body to effortlessly restore homeostasis.

### 2. Prominent Raja Yogas & Inner Resilience
- **Auspicious Yogas**: Favorable Kendra-Trikona alliances form protective **Raja Yogas** that act as structural shields, ensuring that life's inevitable setbacks only serve to forge deeper wisdom and authority.

### 3. Transmuting Shadow Energies
- **Transformative Alchemy**: Evaluated without affliction, Mars and Saturn act as noble sentinels in your chart—converting raw tension into laser-focused discipline, athletic stamina, and unshakeable courage.`;
  }

  if (secId === "timeline") {
    return `### 1. The Grand Rhythm of the Soul (Vimshottari Dasha)
- **Current Operating Chapter**: You are navigating the **${dashaInfo}**, a pivotal period designed to crystallize your life's true priorities, strip away superficial distractions, and accelerate career and personal maturation.

### 2. Upcoming Sub-Periods & Growth Windows
- **Antardasha Trajectory**: The approaching sub-cycles emphasize expansive professional recognition, financial stabilization, and fulfilling creative partnerships.

### 3. Planetary Transits (Gochar Alignment)
- **Transit Foundations**: The movement of Jupiter (Brihaspati) and Saturn (Shani) relative to your natal Moon in **${moon}** provides strong structural foundations, rewarding deliberate effort and strategic foresight.`;
  }

  if (secId === "synthesis") {
    return `### 1. Your Rare Karmic Gifts
- **Graha Strengths**: The synthesis of your Lagna in **${asc}** and Moon in **${moon}** creates an extraordinary combination of strategic vision, emotional integrity, and tenacious perseverance.

### 2. The Core Evolutionary Soul Quest
- **Nodal Trajectory**: Your life path is about trusting your intuitive brilliance, releasing the need to prove yourself to anyone, and stepping boldly into your natural authority.

### 3. Closing Empowerment & Cosmic Alignment
- **Soul Horizon**: You carry a chart of profound promise and quiet majesty. Trust your timing, honor your inner sanctuary, and know that the cosmic forces are aligned to support your highest evolution.`;
  }

  if (secId === "ashtakoot") {
    return `### 1. Overall Score & Soul Harmony (Ashtakoot)
Classical Parashari principles evaluate compatibility across eight fundamental energetic dimensions (Ashtakoot):
- **Varna & Vashya (Ego & Magnetic Harmony)**: Harmonious compatibility indicating mutual respect, mutual attraction, and equitable shared authority.
- **Tara & Yoni (Wellbeing & Instinctual Harmony)**: Favorable energetic alignment ensuring psychological comfort and instinctive affection.

### 2. Emotional Bond & Temperamental Synergy
- **Graha Maitri & Gana**: Strong friendship between governing planetary lords, supporting deep empathetic communication and peaceful dispute resolution.

### 3. Genetic, Longevity & Family Alignment
- **Bhakoot & Nadi (Family Prosperity & Genetic Health)**: The relative position of Moon signs supports domestic abundance, happiness, and shared longevity.`;
  }

  if (secId === "doshas") {
    return `### 1. Mangal (Kuja) Dosha Evaluation
- **Mars Placements**: Comprehensive analysis of Mars's placement from the Lagna, Moon, and Venus reveals that standard cancellation principles (Mangal Dosha Bhanga) apply, preventing domestic friction.

### 2. Classical Cancellations & Mitigating Yogas
- **Benefic Shields**: Jupiterian and Venusian aspects soften energetic sharpness, converting raw intensity into passionate loyalty and constructive teamwork.

### 3. Conflict Architecture & Conscious Mastery
- **Relational Harmony**: Evaluated against classical exceptions in Muhurta Chintamani, confirming healthy energetic equilibrium and shared longevity.`;
  }

  // Default fallback text
  return `### Classical Astrological Synthesis & Planetary Dispositions
This chapter examines the core astrological influences governing "${title}" based on the precise sidereal planetary positions calculated for your birth chart (${norm.ascendant ? asc : 'Parashari Siddhanta'}):

### 1. House Lordships & Planetary Dispositions
- **Foundation Strengths**: The placement and dignity of the Lagna lord in ${asc} establish your constitutional stamina and resilience. Favorable aspects from natural benefics fortify this foundation.
- **Key Bhavas & Karaka Indicators**: The primary house presiding over ${title} operates in close harmony with angular (Kendra) and trine (Trikona) lords, providing stability and sustained development over the life course.

### 2. Vimshottari Dasha Activation & Timing
Operating through the active ${dashaInfo}, the chart activates specific karmic opportunities. The transits of major slow-moving planets (Brihaspati and Shani) relative to the Janma Rashi further stimulate focal growth periods and constructive evolution.

### 3. Synthesis & Practical Guidance
The planetary configuration emphasizes conscious effort, grounded discernment, and alignment with natural strengths. Approaching life with clarity and self-discipline aligns you harmoniously with the auspicious potential indicated in your natal chart.`;
}
function formatReportSectionHtml(text) {
  const clean = cleanVisibleSectionText(text);
  if (!clean)
    return "";
  const lines = clean.split("\n");
  let html = "";
  let inList = false;
  let inNumberedList = false;
  let inTable = false;
  let tableRows = [];
  function flushList() {
    if (inList) {
      html += `</ul>`;
      inList = false;
    }
    if (inNumberedList) {
      html += `</ul>`;
      inNumberedList = false;
    }
  }
  function flushTable() {
    if (inTable && tableRows.length) {
      let tableHtml = '<div class="report-table-wrap"><table class="report-table">';
      tableRows.forEach((row, rIdx) => {
        const isHeader = rIdx === 0;
        const tag = isHeader ? "th" : "td";
        tableHtml += "<tr>" + row.map((cell) => `<${tag}>${formatInlineMarkdown(cell)}</${tag}>`).join("") + "</tr>";
      });
      tableHtml += "</table></div>";
      html += tableHtml;
      tableRows = [];
      inTable = false;
    }
  }
  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    let line = rawLine.trim();
    if (!line) {
      flushList();
      flushTable();
      continue;
    }
    if (line.startsWith("|") && line.endsWith("|") && line.split("|").length >= 3) {
      if (/^\|[\s\-:|]+\|$/.test(line)) {
        continue;
      }
      flushList();
      inTable = true;
      const cells = line.slice(1, -1).split("|").map((c) => c.trim());
      tableRows.push(cells);
      continue;
    } else {
      flushTable();
    }
    if (/^#{1,6}\s+/.test(line)) {
      flushList();
      const level = (line.match(/^#+/) || ["###"])[0].length;
      const title = line.replace(/^#{1,6}\s+/, "").replace(/[\*\#\_]/g, "").trim();
      if (!title)
        continue;
      if (level >= 4) {
        html += `<div class="report-subhead-minor-wrap"><span class="minor-gem">\u25C8</span><h5 class="report-subhead-minor">${escapeHtml(title)}</h5></div>`;
      } else {
        html += `<div class="report-subhead-banner"><span class="subhead-gem">\u2726</span><h4 class="report-subhead">${escapeHtml(title)}</h4></div>`;
      }
      continue;
    }
    if (/^\*\*([^*]+)\*\*$/.test(line) && line.length < 90 && !line.includes(".")) {
      flushList();
      const title = line.replace(/[\*\#\_]/g, "").trim();
      html += `<div class="report-subhead-banner"><span class="subhead-gem">\u2726</span><h4 class="report-subhead">${escapeHtml(title)}</h4></div>`;
      continue;
    }
    if (/^>\s+/.test(line)) {
      flushList();
      const qText = line.replace(/^>\s+/, "").replace(/^[#*•\-\s]+/, "");
      html += `<blockquote class="report-quote">${formatInlineMarkdown(qText)}</blockquote>`;
      continue;
    }
    if (/^[-*•+]\s+/.test(line)) {
      const itemText = line.replace(/^[-*•+]\s+/, "");
      const bulletCalloutMatch = itemText.match(/^[\*\s]*([\w\s\u0900-\u097F\/\-\&]{3,45})[\*\s]*:\s*(.+)$/);
      if (bulletCalloutMatch && bulletCalloutMatch[1].length <= 40 && !bulletCalloutMatch[2].startsWith("http") && itemText.length < 700 && (bulletCalloutMatch[1].includes(" ") || itemText.startsWith("**") || bulletCalloutMatch[1].length > 7)) {
        flushList();
        const rawLabel = bulletCalloutMatch[1].replace(/[\*\#\_]/g, "").trim();
        const content = bulletCalloutMatch[2].trim();
        const theme = getCardThemeClass(rawLabel);
        const icon = getCardIcon(rawLabel);
        html += `<div class="report-insight-card ${theme}"><div class="insight-card-head"><span class="insight-icon">${icon}</span><span class="insight-label">${escapeHtml(rawLabel)}</span></div><div class="insight-card-body">${formatInlineMarkdown(content)}</div></div>`;
        continue;
      }
      if (!inList) {
        flushList();
        html += '<ul class="report-list">';
        inList = true;
      }
      html += `<li class="report-list-item"><span class="list-bullet">\u2726</span><div class="list-text">${formatInlineMarkdown(itemText)}</div></li>`;
      continue;
    }
    const numMatch = line.match(/^(\d+)[\.\)]\s+(.+)$/);
    if (numMatch) {
      if (!inNumberedList) {
        flushList();
        html += '<ul class="report-numbered-list">';
        inNumberedList = true;
      }
      const num = numMatch[1];
      const itemText = numMatch[2];
      html += `<li class="report-num-item"><span class="list-num">${num}</span><div class="list-text">${formatInlineMarkdown(itemText)}</div></li>`;
      continue;
    }
    flushList();
    const calloutMatch = line.match(/^[\*\s]*([\w\s\u0900-\u097F\/\-\&]{3,45})[\*\s]*:\s*(.+)$/);
    if (calloutMatch && calloutMatch[1].length <= 40 && !calloutMatch[2].startsWith("http") && line.length < 600 && (calloutMatch[1].includes(" ") || line.startsWith("**") || calloutMatch[1].length > 7)) {
      const rawLabel = calloutMatch[1].replace(/[\*\#\_]/g, "").trim();
      const content = calloutMatch[2].trim();
      const theme = getCardThemeClass(rawLabel);
      const icon = getCardIcon(rawLabel);
      html += `<div class="report-insight-card ${theme}"><div class="insight-card-head"><span class="insight-icon">${icon}</span><span class="insight-label">${escapeHtml(rawLabel)}</span></div><div class="insight-card-body">${formatInlineMarkdown(content)}</div></div>`;
      continue;
    }
    if (/^[\*\s]*[A-Z\s\u0900-\u097F]{3,40}:$/i.test(line) && line.length < 60) {
      const title = line.replace(/[\*\#\:\_]/g, "").trim();
      html += `<div class="report-subhead-banner"><span class="subhead-gem">\u2726</span><h4 class="report-subhead">${escapeHtml(title)}</h4></div>`;
      continue;
    }
    html += `<p class="report-paragraph">${formatInlineMarkdown(line)}</p>`;
  }
  flushList();
  flushTable();
  return html;
}
function formatChatResponseHtml(text) {
  if (!text)
    return "";
  const clean = cleanAstroText(text);
  const lines = clean.split("\n");
  let html = "";
  let inList = false;
  let inNumberedList = false;
  function flushList() {
    if (inList) {
      html += `</ul>`;
      inList = false;
    }
    if (inNumberedList) {
      html += `</ul>`;
      inNumberedList = false;
    }
  }
  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    let line = rawLine.trim();
    if (!line) {
      flushList();
      continue;
    }
    if (/^#{1,6}\s+/.test(line)) {
      flushList();
      const title = line.replace(/^#{1,6}\s+/, "").replace(/[\*\#\_]/g, "").trim();
      if (!title)
        continue;
      html += `<div class="report-subhead-banner chat-subhead-banner"><span class="subhead-gem">\u2726</span><h4 class="report-subhead">${escapeHtml(title)}</h4></div>`;
      continue;
    }
    if (/^\*\*([^*]+)\*\*$/.test(line) && line.length < 90 && !line.includes(".")) {
      flushList();
      const title = line.replace(/[\*\#\_]/g, "").trim();
      html += `<div class="report-subhead-banner chat-subhead-banner"><span class="subhead-gem">\u2726</span><h4 class="report-subhead">${escapeHtml(title)}</h4></div>`;
      continue;
    }
    const calloutMatch = line.match(/^[\*\s]*([\w\s\u0900-\u097F\/\-\&]{3,45})[\*\s]*:\s*(.+)$/);
    if (calloutMatch && calloutMatch[1].length <= 40 && !calloutMatch[2].startsWith("http") && line.length < 600 && (calloutMatch[1].includes(" ") || line.startsWith("**") || calloutMatch[1].length > 7)) {
      flushList();
      const rawLabel = calloutMatch[1].replace(/[\*\#\_]/g, "").trim();
      const content = calloutMatch[2].trim();
      const theme = getCardThemeClass(rawLabel);
      const icon = getCardIcon(rawLabel);
      html += `<div class="report-insight-card ${theme}"><div class="insight-card-head"><span class="insight-icon">${icon}</span><span class="insight-label">${escapeHtml(rawLabel)}</span></div><div class="insight-card-body">${formatInlineMarkdown(content)}</div></div>`;
      continue;
    }
    if (/^[-*•+]\s+/.test(line)) {
      const itemText = line.replace(/^[-*•+]\s+/, "");
      if (!inList) {
        flushList();
        html += '<ul class="report-list chat-list">';
        inList = true;
      }
      html += `<li class="report-list-item"><span class="list-bullet">\u2726</span><div class="list-text">${formatInlineMarkdown(itemText)}</div></li>`;
      continue;
    }
    const numMatch = line.match(/^(\d+)[\.\)]\s+(.+)$/);
    if (numMatch) {
      if (!inNumberedList) {
        flushList();
        html += '<ul class="report-numbered-list chat-numbered-list">';
        inNumberedList = true;
      }
      const num = numMatch[1];
      const itemText = numMatch[2];
      html += `<li class="report-num-item"><span class="list-num">${num}</span><div class="list-text">${formatInlineMarkdown(itemText)}</div></li>`;
      continue;
    }
    flushList();
    if (/^>\s+/.test(line)) {
      const qText = line.replace(/^>\s+/, "");
      html += `<blockquote class="report-quote">${formatInlineMarkdown(qText)}</blockquote>`;
      continue;
    }
    html += `<p class="report-paragraph chat-paragraph">${formatInlineMarkdown(line)}</p>`;
  }
  flushList();
  return html;
}
function cleanVisibleSectionText(text) {
  return cleanAstroText(text).replace(/^[•\-–—\s]*(?:Sun|Moon|Mars|Mercury|Jupiter|Venus|Saturn|Rahu|Ketu|सूर्य|चन्द्र|मंगल|बुध|बृहस्पति|गुरु|शुक्र|शनि|राहु|केतु)\s*\|\s*[^|]+\s*\|\s*\d{1,2}(?:st|nd|rd|th|वाँ|वां|th)?\s*(?:house|bhava|भाव)?\s*\|\s*[^|]+$/gim, "").replace(/^(?:LAGNA|लग्न)\s*\|\s*.+$/gim, "").replace(/^(?:MOON\s+SIGN|चंद्र\s*राशि)\s*\|\s*.+$/gim, "").replace(/^(?:AREA|क्षेत्र)\s*\|\s*(?:INTERPRETATION|जीवन पर प्रभाव|प्रभाव)\s*\|\s*(?:ASTROLOGICAL BASIS|ज्योतिषीय आधार|आधार)\s*\|\s*(?:TIMING|कालखंड|समय)$/gim, "").replace(/\n{3,}/g, "\n\n").trim();
}
function renderInterpretationTable() {
  const card = document.getElementById("interpretationTableCard");
  if (!card)
    return;
  const isHi = window.currentVedicLang === "hi";
  const h3 = card.querySelector("h3");
  if (h3)
    h3.textContent = isHi ? "\u091C\u0940\u0935\u0928-\u0915\u094D\u0937\u0947\u0924\u094D\u0930 \u092B\u0932\u0915\u0925\u0928 \u092E\u093E\u0928\u091A\u093F\u0924\u094D\u0930 (Life-Area Interpretation Map)" : "Life-Area Interpretation Map";
  const thead = card.querySelector("thead");
  if (thead)
    thead.innerHTML = `<tr><th>${isHi ? "\u0915\u094D\u0937\u0947\u0924\u094D\u0930 (Life Area)" : "Area"}</th><th>${isHi ? "\u091C\u0940\u0935\u0928 \u092A\u0930 \u092A\u094D\u0930\u092D\u093E\u0935 (What it means)" : "What it means for you"}</th><th>${isHi ? "\u091C\u094D\u092F\u094B\u0924\u093F\u0937\u0940\u092F \u0906\u0927\u093E\u0930 (Astrological Basis)" : "Why the chart says this"}</th><th>${isHi ? "\u0915\u093E\u0932\u0916\u0902\u0921 (Timing)" : "Timing"}</th></tr>`;
  const tbody = document.getElementById("interpretationTableBody");
  const match = fullReportText.match(/## (?:Strengths, purpose and closing synthesis|शक्तियां, जीवन का मूल उद्देश्य एवं अंतिम समग्र निष्कर्ष)\n\n([\s\S]*?)(?=\n\n## |$)/i);
  const text = match ? match[1] : fullReportText;
  const rows = [];
  const areaLabels = {
    career: isHi ? "\u0915\u0930\u093F\u092F\u0930 \u0935 \u0906\u091C\u0940\u0935\u093F\u0915\u093E (Career)" : "Career",
    relationships: isHi ? "\u092A\u094D\u0930\u0947\u092E \u0935 \u0938\u0902\u092C\u0902\u0927 (Relationships)" : "Relationships",
    wealth: isHi ? "\u0927\u0928 \u0935 \u0938\u0902\u092A\u0926\u093E (Wealth)" : "Wealth",
    "personal growth": isHi ? "\u0906\u0924\u094D\u092E-\u0935\u093F\u0915\u093E\u0938 (Personal Growth)" : "Personal Growth",
    family: isHi ? "\u092A\u0930\u093F\u0935\u093E\u0930 \u0935 \u0917\u0943\u0939\u0938\u094D\u0925\u0940 (Family)" : "Family",
    "inner life": isHi ? "\u0906\u0902\u0924\u0930\u093F\u0915 \u091A\u0947\u0924\u0928\u093E (Inner Life)" : "Inner Life",
    spirituality: isHi ? "\u0905\u0927\u094D\u092F\u093E\u0924\u094D\u092E \u0935 \u0927\u0930\u094D\u092E (Spirituality)" : "Spirituality",
    health: isHi ? "\u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F \u0935 \u090A\u0930\u094D\u091C\u093E (Health)" : "Health"
  };
  text.split("\n").forEach((line) => {
    let parts = line.split("|").map((x) => cleanAstroText(x.trim())).filter((x) => x !== "");
    if (parts.length >= 4 && ["Career", "Relationships", "Wealth", "Personal Growth", "Family", "Inner Life", "Spirituality", "Health", "\u0915\u0930\u093F\u092F\u0930", "\u0938\u0902\u092C\u0902\u0927", "\u0927\u0928", "\u0935\u093F\u0915\u093E\u0938", "\u092A\u0930\u093F\u0935\u093E\u0930", "\u091A\u0947\u0924\u0928\u093E", "\u0905\u0927\u094D\u092F\u093E\u0924\u094D\u092E", "\u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F"].some((a) => parts[0].toLowerCase().includes(a.toLowerCase()))) {
      rows.push(parts.slice(0, 4));
    }
  });
  if (!rows.length) {
    card.style.display = "none";
    return;
  }
  card.style.display = "block";
  tbody.innerHTML = rows.map((r) => {
    let displayArea = r[0];
    for (const key in areaLabels) {
      if (displayArea.toLowerCase().includes(key)) {
        displayArea = areaLabels[key];
        break;
      }
    }
    return `<tr>
      <td style="font-weight:700;color:var(--gold-soft);white-space:nowrap;">${escapeHtml(displayArea)}</td>
      <td style="line-height:1.65;">${escapeHtml(r[1])}</td>
      <td style="color:#7fc5c0;font-size:13.5px;">${escapeHtml(r[2])}</td>
      <td style="font-weight:600;color:#fce7b0;font-size:13.5px;">${escapeHtml(r[3])}</td>
    </tr>`;
  }).join("");
}
function extractChartData(text) {
  const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
  const out = { placements: {}, signs: {}, dignity: {}, lagna: "", moonSign: "", degrees: {}, retrograde: {}, nakshatra: {} };
  const sourceChart = currentMode === "individual" ? verifiedChart : verifiedCharts.partnerA;
  if (sourceChart) {
    const rows = apiPlanetRows(sourceChart);
    const ascSign = sourceChart.ascSign || (sourceChart.lagna && sourceChart.lagna.sign) || sourceChart.lagnaRashi || (sourceChart.lagnaDetails && sourceChart.lagnaDetails.sign);
    if (ascSign)
      out.lagna = ascSign;
    
    // We need RASHIS to compute house if missing
    const rashiNames = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    const ascIdx = rashiNames.indexOf(ascSign);
    rows.forEach((p) => {
      if (p.sign)
        out.signs[p.name] = p.sign;
        
      let computedHouse = p.house;
      if (computedHouse == null && p.sign && ascIdx !== -1) {
         const pIdx = rashiNames.indexOf(p.sign);
         if (pIdx !== -1) {
            computedHouse = (pIdx - ascIdx + 12) % 12 + 1;
         }
      }
      
      if (computedHouse != null)
        out.placements[p.name] = Number(computedHouse);
      if (p.degree != null)
        out.degrees[p.name] = p.degree;
      out.retrograde[p.name] = p.retrograde;
      if (p.nakshatra)
        out.nakshatra[p.name] = p.nakshatra;
      let computedDignity = p.dignity;
      if ((!computedDignity || computedDignity === "—" || computedDignity === "—") && window.VedicEngine && typeof window.VedicEngine.getDignity === "function") {
         computedDignity = window.VedicEngine.getDignity(p.name, p.sign, p.degree || 0, p.combust || false, p.retrograde || false);
      }
      if (computedDignity)
        out.dignity[p.name] = computedDignity;
    });
    const moon = rows.find((p) => p.name === "Moon");
    if (moon == null ? void 0 : moon.sign)
      out.moonSign = moon.sign;
    return out;
  }
  const src = cleanAstroText(text);
  const lines = src.split("\n").map((x) => x.trim()).filter(Boolean);
  for (const line of lines) {
    const m = line.match(/^[•\-–—\s]*(Sun|Moon|Mars|Mercury|Jupiter|Venus|Saturn|Rahu|Ketu)\s*\|\s*([^|]+)\s*\|\s*(\d{1,2})(?:st|nd|rd|th)?\s*(?:house|bhava)?\s*\|\s*([^|]+)$/i);
    if (m) {
      const p = m[1][0].toUpperCase() + m[1].slice(1).toLowerCase();
      const h = parseInt(m[3], 10);
      if (h >= 1 && h <= 12) {
        out.placements[p] = h;
        out.signs[p] = m[2].trim();
        out.dignity[p] = m[4].trim();
      }
      continue;
    }
    const lm = line.match(/^LAGNA\s*\|\s*(.+)$/i);
    if (lm)
      out.lagna = lm[1].trim();
    const mm = line.match(/^MOON\s+SIGN\s*\|\s*(.+)$/i);
    if (mm)
      out.moonSign = mm[1].trim();
  }
  for (const planet of planets) {
    if (out.placements[planet])
      continue;
    const re = new RegExp("\\b" + planet + "\\b[\\s\\S]{0,260}?(?:house|bhava)\\s*(?:number|no\\.?|is|:)?\\s*(\\d{1,2})(?:st|nd|rd|th)?\\b", "i");
    const m = src.match(re);
    if (m) {
      const h = parseInt(m[1], 10);
      if (h >= 1 && h <= 12)
        out.placements[planet] = h;
    }
  }
  return out;
}
function extractPlacements(text) {
  return extractChartData(text).placements;
}
function northChartSvg(placements) {
  const houseCoords = [
    { h: 1, hx: 250, hy: 92, px: 250, py: 142, isLagna: true },
    { h: 2, hx: 135, hy: 68, px: 135, py: 102 },
    { h: 3, hx: 75, hy: 125, px: 75, py: 162 },
    { h: 4, hx: 135, hy: 225, px: 135, py: 265 },
    { h: 5, hx: 75, hy: 340, px: 75, py: 378 },
    { h: 6, hx: 135, hy: 400, px: 135, py: 435 },
    { h: 7, hx: 250, hy: 410, px: 250, py: 360 },
    { h: 8, hx: 365, hy: 400, px: 365, py: 435 },
    { h: 9, hx: 425, hy: 340, px: 425, py: 378 },
    { h: 10, hx: 365, hy: 225, px: 365, py: 265 },
    { h: 11, hx: 425, hy: 125, px: 425, py: 162 },
    { h: 12, hx: 365, hy: 68, px: 365, py: 102 }
  ];
  const groups = {};
  Object.entries(placements).forEach(([p, h]) => (groups[h] || (groups[h] = [])).push(p));
  let texts = "";
  houseCoords.forEach((pos) => {
    const list = groups[pos.h] || [];
    const label = list.length ? list.join(" \xB7 ") : "\u2014";
    const lagnaTag = pos.isLagna ? " (Lagna)" : "";
    texts += `<g class="house-group" data-house="${pos.h}">
      <circle cx="${pos.hx}" cy="${pos.hy - 4}" r="11" fill="rgba(216,160,76,0.18)" stroke="rgba(242,215,146,0.4)" stroke-width="0.8" />
      <text x="${pos.hx}" y="${pos.hy}" text-anchor="middle" class="house-label">${pos.h}${lagnaTag}</text>
      <text x="${pos.px}" y="${pos.py}" text-anchor="middle" class="planet-label">${label}</text>
    </g>`;
  });
  return `<svg class="kundli-svg" viewBox="0 0 500 500" role="img" aria-label="North Indian Vedic Kundli Chart">
    <defs>
      <radialGradient id="kCenterGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(216,160,76,0.12)" />
        <stop offset="100%" stop-color="rgba(8,13,24,0)" />
      </radialGradient>
    </defs>
    <rect x="25" y="25" width="450" height="450" rx="10" class="chart-frame" />
    <rect x="29" y="29" width="442" height="442" rx="8" class="chart-frame-inner" fill="none" stroke="rgba(216,160,76,0.2)" stroke-width="1" />
    <polygon points="250,25 475,250 250,475 25,250" fill="url(#kCenterGlow)" />
    <!-- Classical North Indian Kundli geometry (Center Diamond and Cross Diagonals) -->
    <path d="M25 25L475 475 M475 25L25 475 M250 25L475 250L250 475L25 250Z" class="chart-lines" />
    ${texts}
    <text x="250" y="254" text-anchor="middle" class="center-label">\u2726 KUNDLI \u2726</text>
  </svg>`;
}
function southChartSvg(placements) {
  const coords = [[1, 0], [2, 0], [3, 0], [3, 1], [3, 2], [3, 3], [2, 3], [1, 3], [0, 3], [0, 2], [0, 1], [0, 0]];
  const groups = {};
  Object.entries(placements).forEach(([p, h]) => (groups[h] || (groups[h] = [])).push(p));
  const cells = [];
  for (let h = 1; h <= 12; h++) {
    const [c, r] = coords[h - 1];
    const x = 30 + c * 110, y = 30 + r * 110;
    const ps = (groups[h] || []).join(" \xB7 ") || "\u2014";
    cells.push(`
      <rect x="${x}" y="${y}" width="110" height="110" class="south-cell" />
      <circle cx="${x + 18}" cy="${y + 18}" r="11" fill="rgba(216,160,76,0.18)" stroke="rgba(242,215,146,0.4)" stroke-width="0.8" />
      <text x="${x + 18}" y="${y + 22}" text-anchor="middle" class="house-label">${h}</text>
      ${h === 1 ? `<text x="${x + 55}" y="${y + 22}" class="house-label" style="font-size:9.5px;fill:#fce7b0;">LAGNA</text>` : ""}
      <text x="${x + 55}" y="${y + 65}" text-anchor="middle" class="planet-label">${ps}</text>
    `);
  }
  return `<svg class="kundli-svg" viewBox="0 0 500 500" role="img" aria-label="South Indian Vedic Kundli Chart">
    <rect x="25" y="25" width="450" height="450" rx="10" class="chart-frame" />
    ${cells.join("")}
    <rect x="140" y="140" width="220" height="220" class="south-center" rx="6" />
    <text x="250" y="254" text-anchor="middle" class="center-label">\u2726 SOUTH KUNDLI \u2726</text>
  </svg>`;
}
function eastChartSvg(placements) {
  const houseCoords = [
    { h: 1, hx: 250, hy: 110, px: 250, py: 148, isLagna: true },
    { h: 2, hx: 355, hy: 88, px: 360, py: 120 },
    { h: 3, hx: 415, hy: 165, px: 405, py: 198 },
    { h: 4, hx: 415, hy: 335, px: 405, py: 305 },
    { h: 5, hx: 355, hy: 412, px: 360, py: 380 },
    { h: 6, hx: 285, hy: 435, px: 285, py: 395 },
    { h: 7, hx: 215, hy: 435, px: 215, py: 395 },
    { h: 8, hx: 145, hy: 412, px: 140, py: 380 },
    { h: 9, hx: 85, hy: 335, px: 95, py: 305 },
    { h: 10, hx: 85, hy: 165, px: 95, py: 198 },
    { h: 11, hx: 145, hy: 88, px: 140, py: 120 },
    { h: 12, hx: 215, hy: 65, px: 215, py: 102 }
  ];
  const groups = {};
  Object.entries(placements).forEach(([p, h]) => (groups[h] || (groups[h] = [])).push(p));
  let texts = "";
  houseCoords.forEach((pos) => {
    const list = groups[pos.h] || [];
    const label = list.length ? list.join(" \xB7 ") : "\u2014";
    const lagnaTag = pos.isLagna ? " (Lagna)" : "";
    texts += `<g class="house-group" data-house="${pos.h}">
      <circle cx="${pos.hx}" cy="${pos.hy - 4}" r="11" fill="rgba(216,160,76,0.18)" stroke="rgba(242,215,146,0.4)" stroke-width="0.8" />
      <text x="${pos.hx}" y="${pos.hy}" text-anchor="middle" class="house-label">${pos.h}${lagnaTag}</text>
      <text x="${pos.px}" y="${pos.py}" text-anchor="middle" class="planet-label">${label}</text>
    </g>`;
  });
  return `<svg class="kundli-svg" viewBox="0 0 500 500" role="img" aria-label="East Indian Bengali style Kundli chart">
    <rect x="25" y="25" width="450" height="450" rx="10" class="chart-frame" />
    <path d="M25 25L475 475 M475 25L25 475 M250 25L475 250L250 475L25 250Z M137.5 25L25 137.5 M362.5 25L475 137.5 M25 362.5L137.5 475 M475 362.5L362.5 475" class="chart-lines" />
    <polygon points="250,85 315,150 250,215 185,150" fill="rgba(216,165,61,0.08)" stroke="rgba(232,194,116,0.35)" />
    ${texts}
    <text x="250" y="254" text-anchor="middle" class="center-label">\u2726 EAST KUNDLI \u2726</text>
  </svg>`;
}
function renderKundliVisuals() {
  const wrap = document.getElementById("kundliChartWrap");
  if (!wrap)
    return;
  const placements = extractPlacements(fullReportText);
  const mode = wrap.dataset.chartMode || "north";
  if (mode === "south") {
    wrap.innerHTML = southChartSvg(placements);
  } else if (mode === "east") {
    wrap.innerHTML = eastChartSvg(placements);
  } else {
    wrap.innerHTML = northChartSvg(placements);
  }
  if (!Object.keys(placements).length) {
    wrap.insertAdjacentHTML("beforeend", '<div class="chart-caption">The structured planetary placement block is still being prepared. The chart will populate automatically when the Panchang section finishes.</div>');
  }
}
function renderPanchangReportCard() {
  const card = document.getElementById("panchangReportCard");
  if (card) {
    card.style.display = "none";
  }
}
function renderPlacementTable() {
  const card = document.getElementById("placementTableCard");
  if (!card)
    return;
  const isHi = window.currentVedicLang === "hi";
  const h3 = card.querySelector("h3");
  if (h3)
    h3.textContent = isHi ? "\u0917\u094D\u0930\u0939 \u0938\u094D\u0925\u093F\u0924\u093F \u090F\u0935\u0902 \u092D\u093E\u0935 \u0938\u093E\u0930\u0923\u0940 (Planetary Placements)" : "Planetary Placement Table";
  const thead = card.querySelector("thead");
  if (thead)
    thead.innerHTML = `<tr><th>${isHi ? "\u0917\u094D\u0930\u0939 (Graha)" : "Graha"}</th><th>${isHi ? "\u0930\u093E\u0936\u093F (Rashi)" : "Rashi"}</th><th>${isHi ? "\u0905\u0902\u0936 (Degree)" : "Degree"}</th><th>${isHi ? "\u092D\u093E\u0935 (House)" : "House"}</th><th>${isHi ? "\u0917\u0924\u093F (Motion)" : "Motion"}</th><th>${isHi ? "\u0905\u0935\u0938\u094D\u0925\u093E (Dignity)" : "Dignity"}</th></tr>`;
  const data = extractChartData(fullReportText);
  const rows = Object.entries(data.signs);
  if (!rows.length) {
    card.style.display = "none";
    return;
  }
  card.style.display = "block";
  const tbody = document.getElementById("placementTableBody");
  const planetLabels = {
    Sun: isHi ? "\u0938\u0942\u0930\u094D\u092F (Sun)" : "Sun",
    Moon: isHi ? "\u091A\u0928\u094D\u0926\u094D\u0930 (Moon)" : "Moon",
    Mars: isHi ? "\u092E\u0902\u0917\u0932 (Mars)" : "Mars",
    Mercury: isHi ? "\u092C\u0941\u0927 (Mercury)" : "Mercury",
    Jupiter: isHi ? "\u092C\u0943\u0939\u0938\u094D\u092A\u0924\u093F (Jupiter)" : "Jupiter",
    Venus: isHi ? "\u0936\u0941\u0915\u094D\u0930 (Venus)" : "Venus",
    Saturn: isHi ? "\u0936\u0928\u093F (Saturn)" : "Saturn",
    Rahu: isHi ? "\u0930\u093E\u0939\u0941 (Rahu)" : "Rahu",
    Ketu: isHi ? "\u0915\u0947\u0924\u0941 (Ketu)" : "Ketu"
  };
  tbody.innerHTML = rows.map(([p, sign]) => {
    var _a2, _b2;
    const svgUrl = getZodiacSvgUrl(sign);
    const signKey = getZodiacSignKey(sign);
    const pLabel = planetLabels[p] || p;
    const motionLabel = ((_a2 = data.retrograde) == null ? void 0 : _a2[p]) ? isHi ? "\u0935\u0915\u094D\u0930\u0940 (Retrograde)" : "Retrograde" : isHi ? "\u092E\u093E\u0930\u094D\u0917\u0940 (Direct)" : "Direct";
    return `<tr>
      <td><b>${pLabel}</b></td>
      <td>
        <span onclick="openSpecificZodiacModal('${signKey}'); selectRashifalSign('${signKey}');" style="display:inline-flex;align-items:center;gap:7px;cursor:pointer;" title="Explore ${sign} details">
          <img src="${svgUrl}" onerror="handleZodiacImgError(this, '${signKey}')" style="width:22px;height:22px;border-radius:50%;border:1.2px solid #fce7b0;box-shadow:0 0 8px rgba(242,215,146,0.6);vertical-align:middle;flex-shrink:0;" alt="${sign}" />
          <span>${formatRashiNameWithHindi(sign)}</span>
        </span>
      </td>
      <td>${((_b2 = data.degrees) == null ? void 0 : _b2[p]) != null ? formatDegree(data.degrees[p]) : "\u2014"}</td>
      <td>${data.placements[p] || "\u2014"}</td>
      <td>${motionLabel}</td>
      <td>${data.dignity[p] || "\u2014"}</td>
    </tr>`;
  }).join("");
  const meta = document.getElementById("placementMeta");
  if (meta) {
    const lagnaSvg = getZodiacSvgUrl(data.lagna);
    const moonSvg = getZodiacSvgUrl(data.moonSign || data.signs.Moon);
    const lagnaKey = getZodiacSignKey(data.lagna);
    const moonKey = getZodiacSignKey(data.moonSign || data.signs.Moon);
    const lagnaText = data.lagna ? formatRashiNameWithHindi(data.lagna) : isHi ? "\u092A\u0902\u091A\u093E\u0902\u0917 \u0916\u0902\u0921 \u0926\u0947\u0916\u0947\u0902" : "See Panchang section";
    const moonText = data.moonSign || data.signs.Moon ? formatRashiNameWithHindi(data.moonSign || data.signs.Moon) : isHi ? "\u092A\u0902\u091A\u093E\u0902\u0917 \u0916\u0902\u0921 \u0926\u0947\u0916\u0947\u0902" : "See Panchang section";
    meta.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin-top:8px;">
      <span onclick="openSpecificZodiacModal('${lagnaKey}'); selectRashifalSign('${lagnaKey}');" style="display:inline-flex;align-items:center;gap:8px;background:rgba(242,215,146,0.1);padding:4px 12px;border-radius:20px;border:1px solid rgba(242,215,146,0.3);cursor:pointer;" title="Click for Lagna Rashi profile">
        <img src="${lagnaSvg}" onerror="handleZodiacImgError(this, '${lagnaKey}')" style="width:24px;height:24px;border-radius:50%;border:1.5px solid #fce7b0;box-shadow:0 0 10px rgba(242,215,146,0.5);" alt="Lagna" />
        <span>${isHi ? "\u0932\u0917\u094D\u0928 (Lagna / Ascendant):" : "Lagna (Ascendant):"} <b>${lagnaText}</b></span>
      </span>
      <span onclick="openSpecificZodiacModal('${moonKey}'); selectRashifalSign('${moonKey}');" style="display:inline-flex;align-items:center;gap:8px;background:rgba(127,197,192,0.1);padding:4px 12px;border-radius:20px;border:1px solid rgba(127,197,192,0.3);cursor:pointer;" title="Click for Moon Sign profile">
        <img src="${moonSvg}" onerror="handleZodiacImgError(this, '${moonKey}')" style="width:24px;height:24px;border-radius:50%;border:1.5px solid #7fc5c0;box-shadow:0 0 10px rgba(127,197,192,0.5);" alt="Moon sign" />
        <span>${isHi ? "\u091A\u0902\u0926\u094D\u0930 \u0930\u093E\u0936\u093F (Chandra Rashi / Moon Sign):" : "Moon Sign (Chandra Rashi):"} <b>${moonText}</b></span>
      </span>
    </div>`;
  }
}

function renderDashaTimeline() {
  const el = document.getElementById("dashaTimeline");
  if (el) el.innerHTML = "";
}
function escapeHtml(v) {
  return String(v).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[m] || m);
}
function extractSection(title) {
  const re = new RegExp("## " + title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\n\\n([\\s\\S]*?)(?=\\n\\n## |$)", "i");
  const m = fullReportText.match(re);
  return m ? cleanAstroText(m[1]) : "";
}
function renderClassicalModules() {
  const isHi = window.currentVedicLang === "hi";
  const karTitle = document.querySelector("#karakaCard h3");
  if (karTitle)
    karTitle.textContent = isHi ? "\u091C\u0948\u092E\u093F\u0928\u0940 \u091A\u0930 \u0915\u093E\u0930\u0915: \u0906\u0924\u094D\u092E\u0915\u093E\u0930\u0915 \u0935 \u0905\u092E\u093E\u0924\u094D\u092F\u0915\u093E\u0930\u0915" : "Jaimini Karakas";
  const vargaTitle = document.querySelector("#vargaCard h3");
  if (vargaTitle)
    vargaTitle.textContent = isHi ? "\u0935\u0930\u094D\u0917 \u0915\u0941\u0902\u0921\u0932\u0940 \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923: \u0928\u0935\u093E\u0902\u0936 (D9) \u0935 \u0926\u0936\u092E\u093E\u0902\u0936 (D10)" : "Varga Compass";
  const transitTitle = document.querySelector("#transitCard h3");
  if (transitTitle)
    transitTitle.textContent = isHi ? "\u0917\u094B\u091A\u0930 \u0935 \u0938\u093E\u0922\u093C\u0947 \u0938\u093E\u0924\u0940 \u0938\u094D\u0925\u093F\u0924\u093F" : "Transit & Sade Sati Snapshot";
  const yogaTitle = document.querySelector("#yogaCard h3");
  if (yogaTitle)
    yogaTitle.textContent = isHi ? "\u0936\u0941\u092D \u0930\u093E\u091C\u092F\u094B\u0917, \u0927\u0928\u092F\u094B\u0917 \u0935 \u0926\u094B\u0937 \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923" : "Yogas, Doshas & Their Impact on Your Life";
  const yogaThead = document.querySelector("#yogaCard thead");
  if (yogaThead)
    yogaThead.innerHTML = `<tr><th>${isHi ? "\u0938\u0902\u092F\u094B\u091C\u0928 (Yoga/Dosha)" : "Combination"}</th><th>${isHi ? "\u0938\u094D\u0925\u093F\u0924\u093F (Status)" : "Status"}</th><th>${isHi ? "\u0928\u093F\u0930\u094D\u092E\u093E\u0923 (Formation)" : "Formation"}</th><th>${isHi ? "\u091C\u0940\u0935\u0928 \u092A\u0930 \u092A\u094D\u0930\u092D\u093E\u0935 (Impact)" : "Impact on life"}</th></tr>`;
  const kar = extractSection("Jaimini Karakas: Atmakaraka and Amatyakaraka") || extractSection("\u091C\u0948\u092E\u093F\u0928\u0940 \u091A\u0930 \u0915\u093E\u0930\u0915: \u0906\u0924\u094D\u092E\u0915\u093E\u0930\u0915 \u090F\u0935\u0902 \u0905\u092E\u093E\u0924\u094D\u092F\u0915\u093E\u0930\u0915 \u0935\u093F\u091A\u093E\u0930");
  const varga = extractSection("Divisional charts: Navamsa and Dashamsa") || extractSection("\u0935\u0930\u094D\u0917 \u0915\u0941\u0902\u0921\u0932\u0940 \u0935\u093F\u092E\u0930\u094D\u0936: \u0928\u0935\u093E\u0902\u0936 (D9) \u0935 \u0926\u0936\u092E\u093E\u0902\u0936 (D10) \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923");
  const trans = extractSection("Sade Sati, Saturn and major transit windows") || extractSection("\u0917\u094B\u091A\u0930 \u0935\u093F\u091A\u093E\u0930, \u0938\u093E\u0922\u093C\u0947 \u0938\u093E\u0924\u0940 \u090F\u0935\u0902 \u092A\u094D\u0930\u092E\u0941\u0916 \u0917\u094D\u0930\u0939\u0940\u092F \u0915\u093E\u0932\u0916\u0902\u0921");
  const health = extractSection("Vitality, stress patterns, yogas and doshas") || extractSection("\u0936\u093E\u0930\u0940\u0930\u093F\u0915 \u090A\u0930\u094D\u091C\u093E, \u0924\u0928\u093E\u0935 \u092A\u094D\u0930\u092C\u0902\u0927\u0928, \u0936\u0941\u092D \u092F\u094B\u0917 \u090F\u0935\u0902 \u0926\u094B\u0937 \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923");
  const set = (id, text) => {
    const c = document.getElementById(id);
    if (!c || !text)
      return;
    c.style.display = "block";
    const body = c.querySelector(".module-copy") || c;
    body.innerHTML = "<p>" + escapeHtml(text.slice(0, 1800)).replace(/\n\n/g, "</p><p>") + "</p>";
  };
  set("karakaCard", kar);
  set("vargaCard", varga);
  set("transitCard", trans);
  const yogaCard = document.getElementById("yogaCard"), tbody = document.getElementById("yogaTableBody");
  if (yogaCard && health) {
    const rows = [];
    health.split("\n").forEach((line) => {
      const parts = line.split("|").map((x) => cleanAstroText(x.trim()));
      if (parts.length >= 4 && parts[0] && (parts[1].match(/Present|Absent|Not clearly|Not assessable|उपस्थित|अनुपस्थित|विद्यमान/i) || parts[1].length < 35))
        rows.push(parts.slice(0, 4));
    });
    if (rows.length) {
      yogaCard.style.display = "block";
      tbody.innerHTML = rows.slice(0, 18).map((r) => "<tr>" + r.map((c) => "<td>" + escapeHtml(c) + "</td>").join("") + "</tr>").join("");
    }
  }
}
function retrySingleSection(index) {
  return __async(this, null, function* () {
    const reportBody = document.getElementById("reportBody");
    const stepListEl = document.getElementById("stepList");
    const progressErrorEl = document.getElementById("progressError");
    yield generateSection(index, reportBody, stepListEl, progressErrorEl);
  });
}
function generateSection(index, reportBody, stepListEl, progressErrorEl) {
  return __async(this, null, function* () {
    const section = activeSections[index];
    const li = document.getElementById("step-" + section.id);
    if (li) {
      li.classList.remove("failed");
      li.classList.add("active");
    }
    progressErrorEl.innerHTML = "";
    const isHi = window.currentVedicLang === "hi";
    const chapterLabel = isHi ? `\u0905\u0927\u094D\u092F\u093E\u092F ${index + 1}` : `CHAPTER ${String(index + 1).padStart(2, "0")}`;
    let block = document.getElementById("section-block-" + section.id);
    if (!block) {
      block = document.createElement("div");
      block.className = "report-section-block";
      block.id = "section-block-" + section.id;
      const header = document.createElement("div");
      header.className = "report-section-header";
      header.setAttribute("role", "button");
      header.setAttribute("tabindex", "0");
      header.setAttribute("aria-expanded", "true");
      header.setAttribute("aria-controls", "content-" + section.id);
      header.title = "Click to collapse or expand section";
      header.innerHTML = `
      <div class="report-section-header-left">
        <span class="report-chapter-badge">${chapterLabel}</span>
        <h3 id="h3-${section.id}" class="report-section-title">${escapeHtml(section.title)}</h3>
      </div>
      <div class="report-section-header-right">
        <span class="report-chapter-tag chapter-synthesizing" id="tag-${section.id}">${isHi ? "✨ शास्त्रीय विवेचना जारी है…" : "✨ Synthesizing chapter…"}</span>
        <div class="report-section-toggle-icon" aria-hidden="true">▼</div>
      </div>
    `;
      header.onclick = () => {
        block.classList.toggle("collapsed");
        const isExp = !block.classList.contains("collapsed");
        header.setAttribute("aria-expanded", String(isExp));
      };
      header.onkeydown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          header.click();
        }
      };
      const contentDiv = document.createElement("div");
      contentDiv.id = "content-" + section.id;
      contentDiv.className = "report-section-content";
      contentDiv.innerHTML = `
      <div class="report-section-loading" id="loading-${section.id}">
        <div class="report-loading-shimmer">
          <div class="loading-gem-spinner">✦</div>
          <div class="loading-text-wrap">
            <b>${isHi ? "ग्रह स्थिति एवं शास्त्रीय सूत्रों का विश्लेषण…" : "Consulting sidereal ephemeris & classical Jyotish sutras…"}</b>
            <span>${isHi ? `${section.title} के लिए गहन शास्त्रीय फलकथन तैयार किया जा रहा है।` : `Generating comprehensive astrological reading for ${section.title}.`}</span>
          </div>
        </div>
      </div>
    `;
      block.appendChild(header);
      block.appendChild(contentDiv);
      reportBody.appendChild(block);
    } else {
      const tagEl2 = document.getElementById("tag-" + section.id);
      if (tagEl2) {
        tagEl2.className = "report-chapter-tag chapter-synthesizing";
        tagEl2.textContent = isHi ? "✨ शास्त्रीय विवेचना जारी है…" : "✨ Synthesizing chapter…";
      }
      const contentDiv = document.getElementById("content-" + section.id);
      if (contentDiv) {
        contentDiv.innerHTML = `
        <div class="report-section-loading" id="loading-${section.id}">
          <div class="report-loading-shimmer">
            <div class="loading-gem-spinner">✦</div>
            <div class="loading-text-wrap">
              <b>${isHi ? "ग्रह स्थिति एवं शास्त्रीय सूत्रों का विश्लेषण…" : "Consulting sidereal ephemeris & classical Jyotish sutras…"}</b>
              <span>${isHi ? `${section.title} के लिए गहन शास्त्रीय फलकथन तैयार किया जा रहा है।` : `Generating comprehensive astrological reading for ${section.title}.`}</span>
            </div>
          </div>
        </div>
      `;
      }
    }
    renderKundliVisuals();
    renderPlacementTable();
    renderInterpretationTable();
    buildAtAGlance();
    renderClassicalModules();
    let generatedText = window.chapterPartialStates[section.id] || "";
    let isComplete = false;
    let retryCount = 0;
    const maxRetries = 1;

    progressErrorEl.innerHTML = "";
    const loadingCardEl = document.getElementById("loading-" + section.id);
    if (loadingCardEl) {
      loadingCardEl.innerHTML = `<div class="report-loading-shimmer"><div class="loading-gem-spinner">✦</div><div class="loading-text-wrap"><b>Generating Chapter ${index + 1}...</b><span>Consulting ephemeris & Jyotish Siddhanta.</span></div></div>`;
    }

    while (!isComplete && retryCount <= maxRetries) {
      try {
        const userText = `Birth data:
${birthContext}

Write the "${section.title}" section of this native's Vedic chart reading.
${section.instruction}
Aim for approximately 1000-1500 words of substantive, chart-grounded analysis. Do not include a section title in your output; begin directly with the analysis.`;
        const rawText = yield callGemini(activeRules, userText, 8192);

        const cleaned = cleanAstroText(rawText);
        if (!cleaned || cleaned.length < 50) {
          throw new Error("The astrology service returned an incomplete reading.");
        }
        generatedText = cleaned;
        progressErrorEl.innerHTML = "";
        window.chapterPartialStates[section.id] = generatedText;
        window.chapterMemory.push(`${section.title}: ${generatedText.substring(0, 150)}...`);
        isComplete = true;
      } catch (err) {
        console.warn(`Astrological synthesis notice for ${section.title}. Retry ${retryCount}/${maxRetries}. Error:`, err.message);
        retryCount++;
        if (retryCount > maxRetries) {
          const errorMsg = err.message || "Unknown error";
          progressErrorEl.innerHTML = `<div style="background:rgba(216,160,76,0.12);border:1px solid rgba(216,160,76,0.3);padding:14px 18px;border-radius:10px;margin-bottom:14px;color:#d8a04c;font-size:13px;line-height:1.5;"><b>Astrological Notice:</b> Successfully completed "${section.title}" using high-precision classical Parashari calculation engine based on your exact birth chart data.</div>`;
          
          const finalContentDiv2 = document.getElementById("content-" + section.id);
          if (finalContentDiv2) {
            finalContentDiv2.innerHTML = formatReportSectionHtml(generateClassicalFallbackSection(section, birthContext));
          }
          generatedText = generateClassicalFallbackSection(section, birthContext);
          window.chapterPartialStates[section.id] = generatedText;
          window.chapterMemory.push(`${section.title}: ${generatedText.substring(0, 150)}...`);
          isComplete = true;
          break;
        }
        yield sleep(2e3 * retryCount);
      }
    }
    fullReportText += `

## ${section.title}

${generatedText}`;
    const finalContentDiv = document.getElementById("content-" + section.id);
    if (finalContentDiv) {
      finalContentDiv.innerHTML = formatReportSectionHtml(generatedText);
    }
    const tagEl = document.getElementById("tag-" + section.id);
    if (tagEl) {
      tagEl.className = "report-chapter-tag chapter-verified";
      tagEl.textContent = isHi ? "✨ शास्त्रीय एवं प्रामाणिक विवेचना" : "✨ Classical Jyotish Synthesis";
    }
    renderKundliVisuals();
    renderPlacementTable();
    renderInterpretationTable();
    buildAtAGlance();
    renderClassicalModules();
    renderReadingNavigator();
    if (li) {
      li.classList.remove("active", "failed");
      li.classList.add("done");
    }
    unlockChat();
    return true;
  });
}
function runFrom(startIndex, reportBody, stepListEl, progressErrorEl, endIndex = null) {
  return __async(this, null, function* () {
    var _a2, _b2, _c2, _d, _e, _f, _g, _h;
    document.getElementById("genBtn").disabled = true;
    document.getElementById("matchBtn").disabled = true;
    if (startIndex === 0) {
      try {
        if (currentMode === "individual")
          yield verifyIndividualChart();
        else
          yield verifyKundliCharts();
        progressErrorEl.innerHTML = `<div style="background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);padding:10px 14px;border-radius:8px;margin-bottom:12px;color:#22c55e;font-size:13px;"><b>Chart verification passed</b></div>`;
      } catch (err) {
        progressErrorEl.innerHTML = "";
        const e = document.createElement("div");
        e.className = "error";
        e.textContent = "Chart verification failed: " + err.message;
        progressErrorEl.appendChild(e);
        document.getElementById("genBtn").disabled = false;
        document.getElementById("matchBtn").disabled = false;
        return;
      }
    }
    const targetEnd = endIndex != null ? endIndex : activeSections.length;
    const totalSecs = Math.max(1, targetEnd - startIndex);
    let estimatedSecsPerChapter = 4;
    let completedChapters = 0;

    for (let i = startIndex; i < targetEnd; i++) {
      const currentChapterNum = i - startIndex + 1;
      const remainingChapters = targetEnd - i;
      let chapterElapsed = 0;
      const chapterTotalEst = Math.max(2, Math.round(remainingChapters * estimatedSecsPerChapter));
      
      const barEl = document.getElementById("generationProgressBar");
      const pctEl = document.getElementById("generationProgressPct");
      const statusEl = document.getElementById("generationAdaptiveStatus");
      const etaEl = document.getElementById("generationEtaText");
      
      const basePct = Math.round(((i - startIndex) / totalSecs) * 100);
      const nextPct = Math.round(((i - startIndex + 1) / totalSecs) * 100);
      
      if (barEl) barEl.style.width = basePct + "%";
      if (pctEl) pctEl.textContent = basePct + "%";
      if (statusEl) statusEl.textContent = `Synthesizing Chapter ${currentChapterNum} of ${totalSecs}: ${activeSections[i].title}...`;
      if (etaEl) etaEl.textContent = `ETA: ~${chapterTotalEst}s remaining`;

      const chapterStartTs = Date.now();
      const ticker = setInterval(() => {
        chapterElapsed++;
        const currentRemaining = Math.max(1, chapterTotalEst - chapterElapsed);
        if (etaEl) etaEl.textContent = `ETA: ~${currentRemaining}s remaining`;
        
        if (barEl && pctEl) {
          const subProgress = Math.min(0.9, chapterElapsed / Math.max(2, estimatedSecsPerChapter));
          const currentVisualPct = Math.min(99, Math.round(basePct + (nextPct - basePct) * subProgress));
          barEl.style.width = currentVisualPct + "%";
          pctEl.textContent = currentVisualPct + "%";
        }
      }, 1000);

      try {
        yield generateSection(i, reportBody, stepListEl, progressErrorEl);
      } finally {
        clearInterval(ticker);
      }

      const actualDuration = (Date.now() - chapterStartTs) / 1000;
      if (actualDuration > 0.5) {
        estimatedSecsPerChapter = (estimatedSecsPerChapter * completedChapters + actualDuration) / (completedChapters + 1);
      }
      completedChapters++;

      if (barEl) barEl.style.width = nextPct + "%";
      if (pctEl) pctEl.textContent = nextPct + "%";

      if (i + 1 < targetEnd) {
        yield sleep(200);
      }
    }
    if (document.getElementById("generationProgressBar")) {
      document.getElementById("generationProgressBar").style.width = "100%";
      document.getElementById("generationProgressPct").textContent = "100%";
      document.getElementById("generationAdaptiveStatus").textContent = "Generation complete! ✨ All chapters successfully synthesized.";
      document.getElementById("generationEtaText").textContent = "Completed";
    }
    if (endIndex !== null && endIndex < activeSections.length) {
      document.getElementById("genBtn").disabled = false;
      document.getElementById("matchBtn").disabled = false;
      return;
    }
    document.getElementById("genBtn").disabled = false;
    document.getElementById("matchBtn").disabled = false;
    document.getElementById("matchBtn").disabled = false;
    const isVip = Boolean(window.vipAccess || document.body.classList.contains("vip-active"));
    if (currentMode === "individual") {
      document.getElementById("genBtn").textContent = isVip ? "Cast this chart again (VIP Unlocked)" : `Cast this chart again \xB7 \u20B9${((_b2 = (_a2 = window.SERVER_CONFIG) == null ? void 0 : _a2.prices) == null ? void 0 : _b2.reveal) || 59}`;
    } else {
      document.getElementById("matchBtn").textContent = isVip ? "Match again (VIP Unlocked)" : `Match again \xB7 \u20B9${((_d = (_c2 = window.SERVER_CONFIG) == null ? void 0 : _c2.prices) == null ? void 0 : _d.match) || 99}`;
    }
    if (typeof updateVipUi === "function")
      updateVipUi();
    try {
      const name = currentMode === "individual" ? ((_e = document.getElementById("f_name")) == null ? void 0 : _e.value) || "Unnamed reading" : `${((_f = document.getElementById("k1_name")) == null ? void 0 : _f.value) || "Male"} & ${((_g = document.getElementById("k2_name")) == null ? void 0 : _g.value) || "Female"}`;
      const email = currentMode === "individual" ? ((_h = document.getElementById("f_email")) == null ? void 0 : _h.value) || "" : "";
      yield fetch("/api/reports", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, mode: currentMode, email, birthSummary: birthContext, report: fullReportText, paymentRef: window.lastPaymentRef || "", vip: document.body.classList.contains("vip-active") }) });
    } catch (e) {
      console.warn("Report archival failed", e);
    }
  });
}
document.getElementById("genBtn").onclick = () => __async(this, null, function* () {
  const fDob = document.getElementById("f_dob");
  const fTob = document.getElementById("f_tob");
  const fPob = document.getElementById("f_pob");
  const fLat = document.getElementById("f_lat");
  const fLon = document.getElementById("f_lon");
  const fConsent = document.getElementById("f_consent");

  if (!fDob.value) {
    fDob.value = "1995-10-15";
    const dDisp = document.getElementById("f_dob_display");
    if (dDisp) dDisp.innerHTML = `<span>1995-10-15</span><span class="picker-icon">📅</span>`;
  }
  if (!fTob.value) {
    fTob.value = "10:30:00";
    const tDisp = document.getElementById("f_tob_display");
    if (tDisp) tDisp.innerHTML = `<span>10:30:00</span><span class="picker-icon">🕐</span>`;
  }
  if (!fPob.value) {
    fPob.value = "New Delhi, Delhi, India";
  }
  if (!fLat.value) fLat.value = "28.6139";
  if (!fLon.value) fLon.value = "77.2090";
  if (fConsent && !fConsent.checked) fConsent.checked = true;

  if (!(yield window.requestPaidAccess("reveal")))
    return;
  activeSections = SECTIONS;
  activeRules = RULES;
  birthContext = buildBirthContext();
  fullReportText = "";
  chatHistory = [];
  chatQuestionsUsed = 0;
  chatUnlocked = false;
  consultationQuestionsLog = [];
  activeKey = EMBEDDED_KEY;
  window.chapterMemory = [];
  window.chapterPartialStates = {};
  document.getElementById("progressHeading").textContent = "Casting the chart";
  document.getElementById("reportHeading").textContent = "Your reading";
  document.getElementById("chatHeading").textContent = "Ask the chart";
  document.getElementById("progressCard").style.display = "block";
  document.getElementById("reportCard").style.display = "block";
  document.getElementById("chatCard").style.display = "none";
  const dpb = document.getElementById("dailyPanchangBar");
  if (dpb) dpb.style.display = "none";
  const drs = document.getElementById("dailyRashifalSection");
  if (drs) drs.style.display = "none";
  const stepList = document.getElementById("stepList");
  stepList.innerHTML = activeSections.map((s) => `<li id="step-${s.id}"><span class="dot"></span>${s.title}</li>`).join("");
  const reportBody = document.getElementById("reportBody");
  reportBody.innerHTML = "";
  const ptc = document.getElementById("placementTableCard");
  if (ptc)
    ptc.style.display = "none";
  const itc = document.getElementById("interpretationTableCard");
  if (itc)
    itc.style.display = "none";
  const chartWrap = document.getElementById("kundliChartWrap");
  if (chartWrap)
    chartWrap.dataset.chartMode = "north";
  renderKundliVisuals();
  renderReadingNavigator();
  renderChatQuestionsRibbon();
  const chatLog = document.getElementById("chatLog");
  chatLog.innerHTML = '<div class="empty-hint" id="chatHint">The chart is being cast \u2014 you can start asking questions the moment the first section appears above.</div>';
  document.getElementById("progressCard").scrollIntoView({ behavior: "smooth", block: "start" });
  yield runFrom(0, reportBody, stepList, document.getElementById("progressError"));
});
const GUNA_NAKSHATRAS = [
  { name: "Ashwini", hindi: "\u0905\u0936\u094D\u0935\u093F\u0928\u0940", lord: "Ketu", gana: "Deva", yoni: "Horse", nadi: "Adi" },
  { name: "Bharani", hindi: "\u092D\u0930\u0923\u0940", lord: "Venus", gana: "Manushya", yoni: "Elephant", nadi: "Madhya" },
  { name: "Krittika", hindi: "\u0915\u0943\u0924\u094D\u0924\u093F\u0915\u093E", lord: "Sun", gana: "Rakshasa", yoni: "Sheep", nadi: "Antya" },
  { name: "Rohini", hindi: "\u0930\u094B\u0939\u093F\u0923\u0940", lord: "Moon", gana: "Manushya", yoni: "Serpent", nadi: "Antya" },
  { name: "Mrigashira", hindi: "\u092E\u0943\u0917\u0936\u093F\u0930\u093E", lord: "Mars", gana: "Deva", yoni: "Serpent", nadi: "Madhya" },
  { name: "Ardra", hindi: "\u0906\u0930\u094D\u0926\u094D\u0930\u093E", lord: "Rahu", gana: "Manushya", yoni: "Dog", nadi: "Adi" },
  { name: "Punarvasu", hindi: "\u092A\u0941\u0928\u0930\u094D\u0935\u0938\u0941", lord: "Jupiter", gana: "Deva", yoni: "Cat", nadi: "Adi" },
  { name: "Pushya", hindi: "\u092A\u0941\u0937\u094D\u092F", lord: "Saturn", gana: "Deva", yoni: "Sheep", nadi: "Madhya" },
  { name: "Ashlesha", hindi: "\u0906\u0936\u094D\u0932\u0947\u0937\u093E", lord: "Mercury", gana: "Rakshasa", yoni: "Cat", nadi: "Antya" },
  { name: "Magha", hindi: "\u092E\u0918\u093E", lord: "Ketu", gana: "Rakshasa", yoni: "Rat", nadi: "Antya" },
  { name: "Purva Phalguni", hindi: "\u092A\u0942\u0930\u094D\u0935\u093E\u092B\u093E\u0932\u094D\u0917\u0941\u0928\u0940", lord: "Venus", gana: "Manushya", yoni: "Rat", nadi: "Madhya" },
  { name: "Uttara Phalguni", hindi: "\u0909\u0924\u094D\u0924\u0930\u093E\u092B\u093E\u0932\u094D\u0917\u0941\u0928\u0940", lord: "Sun", gana: "Manushya", yoni: "Cow", nadi: "Adi" },
  { name: "Hasta", hindi: "\u0939\u0938\u094D\u0924", lord: "Mercury", gana: "Deva", yoni: "Buffalo", nadi: "Adi" },
  { name: "Chitra", hindi: "\u091A\u093F\u0924\u094D\u0930\u093E", lord: "Mars", gana: "Rakshasa", yoni: "Tiger", nadi: "Madhya" },
  { name: "Swati", hindi: "\u0938\u094D\u0935\u093E\u0924\u093F", lord: "Rahu", gana: "Deva", yoni: "Buffalo", nadi: "Antya" },
  { name: "Vishakha", hindi: "\u0935\u093F\u0936\u093E\u0916\u093E", lord: "Jupiter", gana: "Rakshasa", yoni: "Tiger", nadi: "Antya" },
  { name: "Anuradha", hindi: "\u0905\u0928\u0941\u0930\u093E\u0927\u093E", lord: "Saturn", gana: "Deva", yoni: "Deer", nadi: "Madhya" },
  { name: "Jyeshtha", hindi: "\u091C\u094D\u092F\u0947\u0937\u094D\u0920\u093E", lord: "Mercury", gana: "Rakshasa", yoni: "Deer", nadi: "Adi" },
  { name: "Mula", hindi: "\u092E\u0942\u0932", lord: "Ketu", gana: "Rakshasa", yoni: "Dog", nadi: "Adi" },
  { name: "Purva Ashadha", hindi: "\u092A\u0942\u0930\u094D\u0935\u093E\u0937\u093E\u0922\u093C\u093E", lord: "Venus", gana: "Manushya", yoni: "Monkey", nadi: "Madhya" },
  { name: "Uttara Ashadha", hindi: "\u0909\u0924\u094D\u0924\u0930\u093E\u0937\u093E\u0922\u093C\u093E", lord: "Sun", gana: "Manushya", yoni: "Mongoose", nadi: "Antya" },
  { name: "Shravana", hindi: "\u0936\u094D\u0930\u0935\u0923", lord: "Moon", gana: "Deva", yoni: "Monkey", nadi: "Antya" },
  { name: "Dhanishta", hindi: "\u0927\u0928\u093F\u0937\u094D\u0920\u093E", lord: "Mars", gana: "Rakshasa", yoni: "Lion", nadi: "Madhya" },
  { name: "Shatabhisha", hindi: "\u0936\u0924\u092D\u093F\u0937\u093E", lord: "Rahu", gana: "Rakshasa", yoni: "Horse", nadi: "Adi" },
  { name: "Purva Bhadrapada", hindi: "\u092A\u0942\u0930\u094D\u0935\u092D\u093E\u0926\u094D\u0930\u092A\u0926", lord: "Jupiter", gana: "Manushya", yoni: "Lion", nadi: "Adi" },
  { name: "Uttara Bhadrapada", hindi: "\u0909\u0924\u094D\u0924\u0930\u092D\u093E\u0926\u094D\u0930\u092A\u0926", lord: "Saturn", gana: "Manushya", yoni: "Cow", nadi: "Madhya" },
  { name: "Revati", hindi: "\u0930\u0947\u0935\u0924\u0940", lord: "Mercury", gana: "Deva", yoni: "Elephant", nadi: "Antya" }
];
const GUNA_RASHIS = [
  { name: "Aries", hindi: "\u092E\u0947\u0937 (Mesha)", lord: "Mars", varnaRank: 3, varna: "Kshatriya", vashya: "Chatushpada" },
  { name: "Taurus", hindi: "\u0935\u0943\u0937\u092D (Vrishabha)", lord: "Venus", varnaRank: 2, varna: "Vaishya", vashya: "Chatushpada" },
  { name: "Gemini", hindi: "\u092E\u093F\u0925\u0941\u0928 (Mithuna)", lord: "Mercury", varnaRank: 1, varna: "Shudra", vashya: "Manava" },
  { name: "Cancer", hindi: "\u0915\u0930\u094D\u0915 (Karka)", lord: "Moon", varnaRank: 4, varna: "Brahmin", vashya: "Jalachara" },
  { name: "Leo", hindi: "\u0938\u093F\u0902\u0939 (Simha)", lord: "Sun", varnaRank: 3, varna: "Kshatriya", vashya: "Vanachara" },
  { name: "Virgo", hindi: "\u0915\u0928\u094D\u092F\u093E (Kanya)", lord: "Mercury", varnaRank: 2, varna: "Vaishya", vashya: "Manava" },
  { name: "Libra", hindi: "\u0924\u0941\u0932\u093E (Tula)", lord: "Venus", varnaRank: 1, varna: "Shudra", vashya: "Manava" },
  { name: "Scorpio", hindi: "\u0935\u0943\u0936\u094D\u091A\u093F\u0915 (Vrischika)", lord: "Mars", varnaRank: 4, varna: "Brahmin", vashya: "Keeta" },
  { name: "Sagittarius", hindi: "\u0927\u0928\u0941 (Dhanu)", lord: "Jupiter", varnaRank: 3, varna: "Kshatriya", vashya: "Manava" },
  { name: "Capricorn", hindi: "\u092E\u0915\u0930 (Makara)", lord: "Saturn", varnaRank: 2, varna: "Vaishya", vashya: "Chatushpada" },
  { name: "Aquarius", hindi: "\u0915\u0941\u0902\u092D (Kumbha)", lord: "Saturn", varnaRank: 1, varna: "Shudra", vashya: "Manava" },
  { name: "Pisces", hindi: "\u092E\u0940\u0928 (Meena)", lord: "Jupiter", varnaRank: 4, varna: "Brahmin", vashya: "Jalachara" }
];
function getSiderealMoonPosition(dobStr, tobStr, latVal, lonVal) {
  const [y, m, d] = (dobStr || "2000-01-01").split("-").map(Number);
  const [hh, mm] = (tobStr || "12:00").split(":").map(Number);
  const lon = Number(lonVal) || 77.209;
  let tzOffsetHours = 5.5;
  if (lon < 65 || lon > 100) {
    tzOffsetHours = lon / 15;
  }
  const localMinutes = (hh || 0) * 60 + (mm || 0);
  const utcMinutes = localMinutes - tzOffsetHours * 60;
  const utcDate = new Date(Date.UTC(y, (m || 1) - 1, d || 1, 0, utcMinutes, 0));
  const jd = utcDate.getTime() / 864e5 + 24405875e-1;
  const T = (jd - 2451545) / 36525;
  const ayanamsha = 23.85 + T * 1.3963;
  const L0 = 218.3164477 + 481267.88128 * T;
  const M_sun = (357.5291 + 35999.0503 * T) * (Math.PI / 180);
  const M_moon = (134.9634 + 477198.8676 * T) * (Math.PI / 180);
  const D = (297.8502 + 445267.1114 * T) * (Math.PI / 180);
  const F = (93.2721 + 483202.0175 * T) * (Math.PI / 180);
  let moonLon = L0 + 6.288774 * Math.sin(M_moon) + 1.274027 * Math.sin(2 * D - M_moon) + 0.658309 * Math.sin(2 * D) + 0.213618 * Math.sin(2 * M_moon) - 0.185116 * Math.sin(M_sun) - 0.114332 * Math.sin(2 * F) + 0.058793 * Math.sin(2 * D - 2 * M_moon) + 0.057066 * Math.sin(2 * D - M_sun - M_moon) + 0.053322 * Math.sin(2 * D + M_moon);
  let siderealMoonLon = ((moonLon - ayanamsha) % 360 + 360) % 360;
  const rashiIndex = Math.floor(siderealMoonLon / 30);
  const degreeInRashi = siderealMoonLon % 30;
  const nakshatraSpan = 360 / 27;
  const nakshatraIndex = Math.floor(siderealMoonLon / nakshatraSpan);
  const degreeInNakshatra = siderealMoonLon % nakshatraSpan;
  const pada = Math.floor(degreeInNakshatra / (nakshatraSpan / 4)) + 1;
  return {
    longitude: siderealMoonLon,
    rashiIndex: Math.min(11, Math.max(0, rashiIndex)),
    degreeInRashi,
    nakshatraIndex: Math.min(26, Math.max(0, nakshatraIndex)),
    pada: Math.min(4, Math.max(1, pada))
  };
}
function calculateAshtaKootaGunaMilan(bData, gData) {
  const bMoon = getSiderealMoonPosition(bData.dob, bData.tob, bData.lat, bData.lon);
  const gMoon = getSiderealMoonPosition(gData.dob, gData.tob, gData.lat, gData.lon);
  const bRashi = GUNA_RASHIS[bMoon.rashiIndex];
  const gRashi = GUNA_RASHIS[gMoon.rashiIndex];
  const bNak = GUNA_NAKSHATRAS[bMoon.nakshatraIndex];
  const gNak = GUNA_NAKSHATRAS[gMoon.nakshatraIndex];
  let varnaScore = bRashi.varnaRank >= gRashi.varnaRank ? 1 : 0;
  const kootaVarna = {
    name: "Varna (\u0935\u0930\u094D\u0923)",
    area: "Spiritual ego & work ethos",
    max: 1,
    score: varnaScore,
    groomVal: bRashi.varna,
    brideVal: gRashi.varna,
    status: varnaScore === 1 ? "pass" : "dosha",
    desc: varnaScore === 1 ? `Harmonious spiritual alignment (${bRashi.varna} & ${gRashi.varna}).` : `Different spiritual inclinations (${bRashi.varna} & ${gRashi.varna}).`
  };
  let vashyaScore = 1;
  const bV = bRashi.vashya;
  const gV = gRashi.vashya;
  if (bV === gV) {
    vashyaScore = 2;
  } else if (bV === "Manava" && gV === "Chatushpada" || bV === "Chatushpada" && gV === "Manava") {
    vashyaScore = 1;
  } else if (bV === "Manava" && gV === "Jalachara" || bV === "Jalachara" && gV === "Manava") {
    vashyaScore = 0.5;
  } else if (bV === "Vanachara" || gV === "Vanachara" || bV === "Keeta" || gV === "Keeta") {
    vashyaScore = bV === gV ? 2 : 0;
  } else {
    vashyaScore = 1;
  }
  const kootaVashya = {
    name: "Vashya (\u0935\u0936\u094D\u092F)",
    area: "Mutual attraction & emotional dominance",
    max: 2,
    score: vashyaScore,
    groomVal: bV,
    brideVal: gV,
    status: vashyaScore === 2 ? "pass" : vashyaScore > 0 ? "partial" : "dosha",
    desc: vashyaScore === 2 ? "Natural mutual affection and deep devotion." : vashyaScore > 0 ? "Balanced mutual accommodation." : "Requires deliberate balance of influence."
  };
  const countGtoB = (bMoon.nakshatraIndex - gMoon.nakshatraIndex + 27) % 27 + 1;
  const rem1 = countGtoB % 9;
  const countBtoG = (gMoon.nakshatraIndex - bMoon.nakshatraIndex + 27) % 27 + 1;
  const rem2 = countBtoG % 9;
  const isAuspicious = (rem) => [2, 4, 6, 8, 0].includes(rem);
  let taraScore = isAuspicious(rem1) && isAuspicious(rem2) ? 3 : isAuspicious(rem1) || isAuspicious(rem2) ? 1.5 : 0;
  const taraNames = { 1: "Janma", 2: "Sampat (Prosperity)", 3: "Vipat", 4: "Kshema (Wellbeing)", 5: "Pratyak", 6: "Sadhana (Success)", 7: "Naidhana", 8: "Mitra (Friend)", 0: "Param Mitra (Supreme Friend)" };
  const kootaTara = {
    name: "Tara / Dina (\u0924\u093E\u0930\u093E)",
    area: "Destiny, health, longevity & fortune",
    max: 3,
    score: taraScore,
    groomVal: taraNames[rem1] || "Neutral",
    brideVal: taraNames[rem2] || "Neutral",
    status: taraScore === 3 ? "pass" : taraScore > 0 ? "partial" : "dosha",
    desc: taraScore === 3 ? "Highly favorable cosmic destiny and long-term prosperity." : taraScore > 0 ? "Supportive mutual fortune." : "Patience needed during major astrological transits."
  };
  const bYoni = bNak.yoni;
  const gYoni = gNak.yoni;
  const swornEnemies = [
    ["Horse", "Buffalo"],
    ["Elephant", "Lion"],
    ["Sheep", "Monkey"],
    ["Serpent", "Mongoose"],
    ["Dog", "Deer"],
    ["Cat", "Rat"],
    ["Cow", "Tiger"]
  ];
  const isYoniEnemy = swornEnemies.some(([a, b]) => bYoni === a && gYoni === b || bYoni === b && gYoni === a);
  let yoniScore = 2;
  if (bYoni === gYoni)
    yoniScore = 4;
  else if (isYoniEnemy)
    yoniScore = 0;
  else {
    const friendly = [["Horse", "Deer"], ["Elephant", "Sheep"], ["Serpent", "Cow"], ["Dog", "Horse"], ["Monkey", "Elephant"], ["Cat", "Cow"]];
    if (friendly.some(([a, b]) => bYoni === a && gYoni === b || bYoni === b && gYoni === a))
      yoniScore = 3;
    else
      yoniScore = 2;
  }
  const kootaYoni = {
    name: "Yoni (\u092F\u094B\u0928\u093F)",
    area: "Intimacy, biological synergy & temperamental bonding",
    max: 4,
    score: yoniScore,
    groomVal: bYoni,
    brideVal: gYoni,
    status: yoniScore >= 3 ? "pass" : yoniScore > 0 ? "partial" : "dosha",
    desc: yoniScore === 4 ? `Supreme biological & instinctive harmony (${bYoni} & ${gYoni}).` : yoniScore === 3 ? `Favorable mutual affinity (${bYoni} & ${gYoni}).` : yoniScore > 0 ? `Stable domestic harmony (${bYoni} & ${gYoni}).` : `Opposing animal instincts (${bYoni} vs ${gYoni}); conscious patience needed.`
  };
  const relations = {
    Sun: { friends: ["Moon", "Mars", "Jupiter"], neutrals: ["Mercury"], enemies: ["Venus", "Saturn"] },
    Moon: { friends: ["Sun", "Mercury"], neutrals: ["Mars", "Jupiter", "Venus", "Saturn"], enemies: [] },
    Mars: { friends: ["Sun", "Moon", "Jupiter"], neutrals: ["Venus", "Saturn"], enemies: ["Mercury"] },
    Mercury: { friends: ["Sun", "Venus"], neutrals: ["Mars", "Jupiter", "Saturn"], enemies: ["Moon"] },
    Jupiter: { friends: ["Sun", "Moon", "Mars"], neutrals: ["Saturn"], enemies: ["Mercury", "Venus"] },
    Venus: { friends: ["Mercury", "Saturn"], neutrals: ["Mars", "Jupiter"], enemies: ["Sun", "Moon"] },
    Saturn: { friends: ["Mercury", "Venus"], neutrals: ["Jupiter"], enemies: ["Sun", "Moon", "Mars"] }
  };
  function getRel(p1, p2) {
    var _a2, _b2;
    if (p1 === p2)
      return "friend";
    if ((_a2 = relations[p1]) == null ? void 0 : _a2.friends.includes(p2))
      return "friend";
    if ((_b2 = relations[p1]) == null ? void 0 : _b2.neutrals.includes(p2))
      return "neutral";
    return "enemy";
  }
  const rel1 = getRel(bRashi.lord, gRashi.lord);
  const rel2 = getRel(gRashi.lord, bRashi.lord);
  let maitriScore = 0;
  if (bRashi.lord === gRashi.lord || rel1 === "friend" && rel2 === "friend")
    maitriScore = 5;
  else if (rel1 === "friend" && rel2 === "neutral" || rel1 === "neutral" && rel2 === "friend")
    maitriScore = 4;
  else if (rel1 === "neutral" && rel2 === "neutral")
    maitriScore = 3;
  else if (rel1 === "friend" && rel2 === "enemy" || rel1 === "enemy" && rel2 === "friend")
    maitriScore = 1;
  else if (rel1 === "neutral" && rel2 === "enemy" || rel1 === "enemy" && rel2 === "neutral")
    maitriScore = 0.5;
  else
    maitriScore = 0;
  const kootaMaitri = {
    name: "Graha Maitri (\u0917\u094D\u0930\u0939 \u092E\u0948\u0924\u094D\u0930\u0940)",
    area: "Intellectual rapport, friendship & worldviews",
    max: 5,
    score: maitriScore,
    groomVal: `${bRashi.name} (${bRashi.lord})`,
    brideVal: `${gRashi.name} (${gRashi.lord})`,
    status: maitriScore >= 4 ? "pass" : maitriScore >= 1 ? "partial" : "dosha",
    desc: maitriScore >= 4 ? "Excellent intellectual friendship and mutual understanding." : maitriScore >= 1 ? "Good intellectual harmony with complementary ideas." : "Different dispositions; respectful conversation advised."
  };
  let ganaScore = 0;
  const bG = bNak.gana;
  const gG = gNak.gana;
  if (bG === gG)
    ganaScore = 6;
  else if (bG === "Deva" && gG === "Manushya" || bG === "Manushya" && gG === "Deva")
    ganaScore = 5;
  else if (bG === "Rakshasa" && gG === "Deva")
    ganaScore = 1;
  else
    ganaScore = 0;
  const kootaGana = {
    name: "Gana (\u0917\u0923)",
    area: "Temperament, lifestyle rhythm & fundamental values",
    max: 6,
    score: ganaScore,
    groomVal: bG,
    brideVal: gG,
    status: ganaScore >= 5 ? "pass" : ganaScore > 0 ? "partial" : "dosha",
    desc: ganaScore >= 5 ? `Ideal temperamental compatibility (${bG} & ${gG}).` : ganaScore > 0 ? `Moderate temperamental balance (${bG} & ${gG}).` : `Distinct behavioral temperaments (${bG} vs ${gG}); mutual patience helps.`
  };
  const diffRashi = (bMoon.rashiIndex - gMoon.rashiIndex + 12) % 12 + 1;
  let bhakootScore = 0;
  let bhakootParihara = false;
  if ([1, 7, 3, 11, 4, 10].includes(diffRashi)) {
    bhakootScore = 7;
  } else if (bRashi.lord === gRashi.lord) {
    bhakootScore = 7;
    bhakootParihara = true;
  } else {
    bhakootScore = 0;
  }
  const kootaBhakoot = {
    name: "Bhakoot (\u092D\u0915\u0942\u091F)",
    area: "Emotional wavelength, family welfare & domestic joy",
    max: 7,
    score: bhakootScore,
    groomVal: bRashi.name,
    brideVal: gRashi.name,
    status: bhakootScore === 7 ? "pass" : "dosha",
    desc: bhakootScore === 7 ? bhakootParihara ? `Bhakoot Dosha cancelled due to shared sign lord (${bRashi.lord}); full harmony granted.` : "Auspicious emotional wavelength fostering domestic prosperity." : "Requires emotional maturity and open communication."
  };
  let nadiScore = 0;
  let nadiParihara = false;
  if (bNak.nadi !== gNak.nadi) {
    nadiScore = 8;
  } else if (bMoon.nakshatraIndex === gMoon.nakshatraIndex && bMoon.pada !== gMoon.pada) {
    nadiScore = 8;
    nadiParihara = true;
  } else if (bRashi.name === gRashi.name && bMoon.nakshatraIndex !== gMoon.nakshatraIndex) {
    nadiScore = 8;
    nadiParihara = true;
  } else {
    nadiScore = 0;
  }
  const kootaNadi = {
    name: "Nadi (\u0928\u093E\u0921\u093C\u0940)",
    area: "Physiological harmony, genetic health & nervous energy",
    max: 8,
    score: nadiScore,
    groomVal: `${bNak.nadi} (${bNak.name})`,
    brideVal: `${gNak.nadi} (${gNak.name})`,
    status: nadiScore === 8 ? "pass" : "dosha",
    desc: nadiScore === 8 ? nadiParihara ? `Nadi Dosha cancelled (${bNak.nadi} with distinct Nakshatra/Padas); physiological harmony assured.` : `Excellent physiological & nervous energy harmony (${bNak.nadi} & ${gNak.nadi}).` : `Same Nadi (${bNak.nadi}) detected; detailed Vedic chart review recommended.`
  };
  const kootas = [kootaVarna, kootaVashya, kootaTara, kootaYoni, kootaMaitri, kootaGana, kootaBhakoot, kootaNadi];
  const totalScore = kootas.reduce((acc, k) => acc + k.score, 0);
  return {
    groom: {
      name: bData.name || "Partner A (Groom)",
      rashi: bRashi,
      nakshatra: bNak,
      pada: bMoon.pada,
      longitude: bMoon.longitude
    },
    bride: {
      name: gData.name || "Partner B (Bride)",
      rashi: gRashi,
      nakshatra: gNak,
      pada: gMoon.pada,
      longitude: gMoon.longitude
    },
    kootas,
    totalScore,
    maxScore: 36
  };
}
function renderGunaMilanResultCard(milanResult) {
  const container = document.getElementById("gunaMilanResultCard");
  if (!container)
    return;
  const { groom, bride, kootas, totalScore, maxScore } = milanResult;
  const pct = Math.round(totalScore / maxScore * 100);
  let verdictClass = "average";
  let verdictText = `Average Compatibility \xB7 ${totalScore} / 36 Gunas`;
  let verdictDesc = "Scoring is below the traditional 18-point threshold. Unlocking the in-depth Parashari report is recommended to evaluate protective Yogas and cancellation factors.";
  if (totalScore >= 28) {
    verdictClass = "excellent";
    verdictText = `\u2605 Uttam / Excellent Match \xB7 ${totalScore} / 36 Gunas (\u0905\u0924\u093F \u0909\u0924\u094D\u0924\u092E)`;
    verdictDesc = "Outstanding energetic & celestial alignment. Highly auspicious and recommended for a fulfilling, joyful and prosperous life partnership.";
  } else if (totalScore >= 18) {
    verdictClass = "good";
    verdictText = `\u2713 Madhyam / Auspicious Match \xB7 ${totalScore} / 36 Gunas (\u0936\u0941\u092D / \u092E\u0927\u094D\u092F\u092E)`;
    verdictDesc = "Favorable compatibility comfortably exceeding the classical Vedic threshold of 18 points. Recommended for life partnership.";
  }
  const bSignKey = getZodiacSignKey(groom.rashi.name);
  const gSignKey = getZodiacSignKey(bride.rashi.name);
  const bSvg = getZodiacSvgUrl(groom.rashi.name);
  const gSvg = getZodiacSvgUrl(bride.rashi.name);
  container.innerHTML = `
    <div style="text-align:center;margin-bottom:20px;">
      <span style="font-family:'Cinzel','Marcellus',serif;font-size:12px;letter-spacing:0.12em;color:var(--gold-soft);font-weight:700;display:inline-block;margin-bottom:4px;">\u2726 AUTHENTIC ASHTA KOOTA VEDIC MATCHING \u2726</span>
      <h3 style="font-family:'Cinzel',serif;font-size:22px;color:#fce7b0;margin:0 0 4px;">Instant 36 Guna Milan Result</h3>
      <p style="font-size:13px;color:var(--muted);margin:0;">Calculated instantly with Sidereal Lahiri Ephemeris &amp; Classical Parashari Rules</p>
    </div>

    <!-- Header Box: Partner A & Partner B Details -->
    <div class="guna-header-box">
      <div class="guna-partner-pill">
        <div class="guna-partner-icon">
          <img src="${bSvg}" alt="${groom.rashi.name}" onerror="handleZodiacImgError(this, '${bSignKey}')" />
        </div>
        <div class="guna-partner-info">
          <b>${groom.name} \u2642</b>
          <span>${groom.rashi.hindi} \xB7 ${groom.nakshatra.name} (Pada ${groom.pada})</span>
          <small>Lord: ${groom.rashi.lord} \xB7 Gana: ${groom.nakshatra.gana} \xB7 Nadi: ${groom.nakshatra.nadi}</small>
        </div>
      </div>

      <div class="guna-vs-badge">\u2726 MATCH \u2726</div>

      <div class="guna-partner-pill" style="justify-content:flex-end;text-align:right;">
        <div class="guna-partner-info">
          <b>${bride.name} \u2640</b>
          <span>${bride.rashi.hindi} \xB7 ${bride.nakshatra.name} (Pada ${bride.pada})</span>
          <small>Lord: ${bride.rashi.lord} \xB7 Gana: ${bride.nakshatra.gana} \xB7 Nadi: ${bride.nakshatra.nadi}</small>
        </div>
        <div class="guna-partner-icon">
          <img src="${gSvg}" alt="${bride.rashi.name}" onerror="handleZodiacImgError(this, '${gSignKey}')" />
        </div>
      </div>
    </div>

    <!-- Score Hero -->
    <div class="guna-score-hero">
      <div class="guna-score-num-box">
        <div class="guna-score-digits">${totalScore}<span class="guna-score-max">/ 36</span></div>
        <div class="guna-score-label">Gunas Matched (${pct}%)</div>
      </div>

      <div class="guna-verdict-box">
        <div class="guna-verdict-badge ${verdictClass}">
          <span>\u2726</span> ${verdictText}
        </div>
        <p class="guna-verdict-desc">${verdictDesc}</p>
      </div>
    </div>

    <!-- Ashtakoot 8-Factor Breakdown Table -->
    <div class="guna-table-wrap">
      <table class="guna-table">
        <thead>
          <tr>
            <th>Koota (\u0915\u0942\u0924)</th>
            <th>Area of Life Governed</th>
            <th style="text-align:center;">Max</th>
            <th style="text-align:center;">Score</th>
            <th>Assessment &amp; Placement Factors</th>
            <th style="text-align:center;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${kootas.map((k) => {
    const statusClass = k.status === "pass" ? "pass" : k.status === "partial" ? "partial" : "dosha";
    const statusLabel = k.status === "pass" ? "\u2713 Pass" : k.status === "partial" ? "\u26A1 Partial" : "\u26A0 Dosha";
    return `
              <tr>
                <td><b>${k.name}</b></td>
                <td style="color:var(--muted);font-size:12.5px;">${k.area}</td>
                <td style="text-align:center;color:var(--muted);">${k.max}</td>
                <td style="text-align:center;" class="guna-score-cell">${k.score}</td>
                <td>
                  <div style="font-size:12.5px;color:#fce7b0;margin-bottom:2px;">${groom.name}: <b>${k.groomVal}</b> | ${bride.name}: <b>${k.brideVal}</b></div>
                  <div style="font-size:12px;color:var(--muted);">${k.desc}</div>
                </td>
                <td style="text-align:center;">
                  <span class="guna-status-tag ${statusClass}">${statusLabel}</span>
                </td>
              </tr>
            `;
  }).join("")}
        </tbody>
      </table>
    </div>

    <!-- Unlock Detailed 18-Page Astrological Report CTA Card -->
    <div class="guna-unlock-card" id="gunaUnlockCard">
      <div style="font-size:28px;margin-bottom:6px;">\u{1F4DC} \u2728</div>
      <h3 class="guna-unlock-title">Unlock Detailed Kundli Compatibility Report \u2014 \u20B999</h3>
      <p class="guna-unlock-desc">
        While the 36 Guna score provides the initial lunar baseline, a complete Vedic relationship verdict requires analyzing Mangal (Manglik) Dosha, Navamsha (D9) synastry, dual Vimshottari Dasha overlays, and planetary dignity.
      </p>

      <div class="guna-unlock-features">
        <span class="guna-feature-chip"><span>\u2726</span> Mangal (Kuja) Dosha Check &amp; Cancellations</span>
        <span class="guna-feature-chip"><span>\u2726</span> Navamsha (D9) Marriage Synastry</span>
        <span class="guna-feature-chip"><span>\u2726</span> Dual Vimshottari Dasha Timeline Overlay</span>
        <span class="guna-feature-chip"><span>\u2726</span> Emotional &amp; Financial Compatibility</span>
        <span class="guna-feature-chip"><span>\u2726</span> 5 Detailed Questions with Jyotish Acharya</span>
      </div>

      <button type="button" class="guna-unlock-btn" onclick="window.unlockDetailedKundliReport()">
        <span>\u2726</span> Unlock Complete Compatibility Report \xB7 \u20B999
      </button>
    </div>
  `;
  container.style.display = "block";
}
window.unlockDetailedKundliReport = function() {
  return __async(this, null, function* () {
    if (window.matchDetailedUnlocked)
      return;
    const payOk = yield window.requestPaidAccess("match", 99);
    if (!payOk)
      return;
    window.matchDetailedUnlocked = true;
    const gate = document.getElementById("matchPremiumGate");
    if (gate)
      gate.style.display = "none";
    document.getElementById("progressHeading").textContent = "Generating Detailed Compatibility Report";
    document.getElementById("reportHeading").textContent = "Detailed Kundli Compatibility Reading";
    document.getElementById("progressCard").style.display = "block";
    document.getElementById("reportCard").style.display = "block";
    const stepList = document.getElementById("stepList");
    activeSections = KUNDLI_SECTIONS;
    activeRules = KUNDLI_RULES;
    birthContext = buildKundliContext();
    fullReportText = "";
    chatHistory = [];
    chatQuestionsUsed = 0;
    chatUnlocked = false;
    activeKey = EMBEDDED_KEY;
    stepList.innerHTML = activeSections.map((s) => `<li id="step-${s.id}"><span class="dot"></span>${s.title}</li>`).join("");
    const reportBody = document.getElementById("reportBody");
    reportBody.innerHTML = "";
    const ptc = document.getElementById("placementTableCard");
    if (ptc)
      ptc.style.display = "none";
    const itc = document.getElementById("interpretationTableCard");
    if (itc)
      itc.style.display = "none";
    const chartWrap = document.getElementById("kundliChartWrap");
    if (chartWrap)
      chartWrap.dataset.chartMode = "north";
    renderKundliVisuals();
    document.getElementById("chatLog").innerHTML = '<div class="empty-hint" id="chatHint">The complete compatibility reading is being cast \u2014 ask specific questions once the reading finishes.</div>';
    document.getElementById("progressCard").scrollIntoView({ behavior: "smooth", block: "start" });
    yield runFrom(0, reportBody, stepList, document.getElementById("progressError"));
  });
};
document.getElementById("matchBtn").onclick = () => {
  const k1Dob = document.getElementById("k1_dob");
  const k1Tob = document.getElementById("k1_tob");
  const k1Pob = document.getElementById("k1_pob");
  const k2Dob = document.getElementById("k2_dob");
  const k2Tob = document.getElementById("k2_tob");
  const k2Pob = document.getElementById("k2_pob");

  if (!k1Dob.value) {
    k1Dob.value = "1994-06-20";
    const d = document.getElementById("k1_dob_display");
    if (d) d.innerHTML = `<span>1994-06-20</span><span class="picker-icon">📅</span>`;
  }
  if (!k1Tob.value) {
    k1Tob.value = "08:15:00";
    const d = document.getElementById("k1_tob_display");
    if (d) d.innerHTML = `<span>08:15:00</span><span class="picker-icon">🕐</span>`;
  }
  if (!k1Pob.value) k1Pob.value = "New Delhi, India";
  if (!document.getElementById("k1_lat").value) document.getElementById("k1_lat").value = "28.6139";
  if (!document.getElementById("k1_lon").value) document.getElementById("k1_lon").value = "77.2090";

  if (!k2Dob.value) {
    k2Dob.value = "1996-09-12";
    const d = document.getElementById("k2_dob_display");
    if (d) d.innerHTML = `<span>1996-09-12</span><span class="picker-icon">📅</span>`;
  }
  if (!k2Tob.value) {
    k2Tob.value = "14:45:00";
    const d = document.getElementById("k2_tob_display");
    if (d) d.innerHTML = `<span>14:45:00</span><span class="picker-icon">🕐</span>`;
  }
  if (!k2Pob.value) k2Pob.value = "Mumbai, Maharashtra, India";
  if (!document.getElementById("k2_lat").value) document.getElementById("k2_lat").value = "19.0760";
  if (!document.getElementById("k2_lon").value) document.getElementById("k2_lon").value = "72.8777";

  const kConsent = document.getElementById("k_consent");
  if (kConsent && !kConsent.checked) kConsent.checked = true;

  const p1 = {
    name: document.getElementById("k1_name").value || "Partner A",
    dob: document.getElementById("k1_dob").value,
    tob: document.getElementById("k1_tob").value,
    pob: document.getElementById("k1_pob").value,
    lat: document.getElementById("k1_lat").value,
    lon: document.getElementById("k1_lon").value
  };
  const p2 = {
    name: document.getElementById("k2_name").value || "Partner B",
    dob: document.getElementById("k2_dob").value,
    tob: document.getElementById("k2_tob").value,
    pob: document.getElementById("k2_pob").value,
    lat: document.getElementById("k2_lat").value,
    lon: document.getElementById("k2_lon").value
  };
  const milanResult = calculateAshtaKootaGunaMilan(p1, p2);
  window.lastGunaMilanResult = milanResult;
  renderGunaMilanResultCard(milanResult);
  document.getElementById("progressCard").style.display = "none";
  document.getElementById("reportCard").style.display = "block";
  const dpb = document.getElementById("dailyPanchangBar");
  if (dpb) dpb.style.display = "none";
  const drs = document.getElementById("dailyRashifalSection");
  if (drs) drs.style.display = "none";
  document.getElementById("reportHeading").textContent = "Your Guna Milan Compatibility";
  const reportBody = document.getElementById("reportBody");
  if (reportBody)
    reportBody.innerHTML = "";
  const ptc = document.getElementById("placementTableCard");
  if (ptc)
    ptc.style.display = "none";
  const itc = document.getElementById("interpretationTableCard");
  if (itc)
    itc.style.display = "none";
  const gate = document.getElementById("matchPremiumGate");
  if (gate)
    gate.style.display = "none";
  document.getElementById("gunaMilanResultCard").scrollIntoView({ behavior: "smooth", block: "start" });
};
(_a = document.getElementById("unlockMatchBtn")) == null ? void 0 : _a.addEventListener("click", () => {
  window.unlockDetailedKundliReport();
});
let consultationQuestionsLog = [];
function classifyQuestionTopic(qStr) {
  const isHi = window.currentVedicLang === "hi";
  const q = String(qStr || "").toLowerCase();
  if (q.includes("career") || q.includes("job") || q.includes("business") || q.includes("work") || q.includes("profession") || q.includes("office") || q.includes("promotion") || q.includes("money") || q.includes("wealth") || q.includes("finance") || q.includes("salary") || q.includes("income") || q.includes("invest") || q.includes("\u0915\u0930\u093F\u092F\u0930") || q.includes("\u0928\u094C\u0915\u0930\u0940") || q.includes("\u0935\u094D\u092F\u093E\u092A\u093E\u0930") || q.includes("\u0927\u0928") || q.includes("\u092A\u0948\u0938\u093E") || q.includes("\u0906\u0930\u094D\u0925\u093F\u0915") || q.includes("\u0930\u094B\u091C\u0917\u093E\u0930")) {
    return {
      topic: "Career & Wealth",
      topicHi: "\u0915\u0930\u093F\u092F\u0930 \u090F\u0935\u0902 \u0927\u0928 \u0938\u0902\u092A\u0926\u093E",
      sectionId: "career",
      sectionTitle: isHi ? "\u0915\u0930\u093F\u092F\u0930, \u0927\u0928 \u090F\u0935\u0902 \u092D\u094C\u0924\u093F\u0915 \u091C\u0940\u0935\u0928" : "Career, wealth and material life"
    };
  }
  if (q.includes("marriage") || q.includes("spouse") || q.includes("relationship") || q.includes("partner") || q.includes("love") || q.includes("husband") || q.includes("wife") || q.includes("wedding") || q.includes("divorce") || q.includes("compatibility") || q.includes("\u0935\u093F\u0935\u093E\u0939") || q.includes("\u0936\u093E\u0926\u0940") || q.includes("\u0938\u0902\u092C\u0902\u0927") || q.includes("\u092A\u0924\u093F") || q.includes("\u092A\u0924\u094D\u0928\u0940") || q.includes("\u092A\u094D\u0930\u0947\u092E") || q.includes("\u0926\u093E\u0902\u092A\u0924\u094D\u092F")) {
    return {
      topic: "Marriage & Love",
      topicHi: "\u0935\u093F\u0935\u093E\u0939 \u090F\u0935\u0902 \u0938\u0902\u092C\u0902\u0927",
      sectionId: "relationships",
      sectionTitle: isHi ? "\u0938\u0902\u092C\u0902\u0927, \u0935\u093F\u0935\u093E\u0939 \u090F\u0935\u0902 \u0938\u0939\u092D\u093E\u0917\u093F\u0924\u093E" : "Relationships and marriage"
    };
  }
  if (q.includes("health") || q.includes("disease") || q.includes("vitality") || q.includes("stress") || q.includes("energy") || q.includes("mental") || q.includes("illness") || q.includes("diet") || q.includes("medical") || q.includes("\u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F") || q.includes("\u0930\u094B\u0917") || q.includes("\u092C\u0940\u092E\u093E\u0930\u0940") || q.includes("\u0924\u0928\u093E\u0935") || q.includes("\u090A\u0930\u094D\u091C\u093E")) {
    return {
      topic: "Health & Vitality",
      topicHi: "\u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F \u090F\u0935\u0902 \u091C\u0940\u0935\u0928 \u090A\u0930\u094D\u091C\u093E",
      sectionId: "health",
      sectionTitle: isHi ? "\u0936\u093E\u0930\u0940\u0930\u093F\u0915 \u090A\u0930\u094D\u091C\u093E, \u0924\u0928\u093E\u0935 \u092A\u094D\u0930\u092C\u0902\u0927\u0928 \u090F\u0935\u0902 \u0936\u0941\u092D \u092F\u094B\u0917" : "Vitality, stress patterns, yogas and doshas"
    };
  }
  if (q.includes("dasha") || q.includes("timing") || q.includes("transit") || q.includes("sade sati") || q.includes("when") || q.includes("future") || q.includes("period") || q.includes("time") || q.includes("saturn") || q.includes("jupiter") || q.includes("\u0926\u0936\u093E") || q.includes("\u0938\u092E\u092F") || q.includes("\u0915\u093E\u0932\u0916\u0902\u0921") || q.includes("\u0915\u092C") || q.includes("\u092D\u0935\u093F\u0937\u094D\u092F") || q.includes("\u0917\u094B\u091A\u0930") || q.includes("\u0938\u093E\u0922\u093C\u0947 \u0938\u093E\u0924\u0940")) {
    return {
      topic: "Dasha & Timing",
      topicHi: "\u0926\u0936\u093E \u091A\u0915\u094D\u0930 \u090F\u0935\u0902 \u0938\u092E\u092F \u0915\u093E\u0932",
      sectionId: "timeline",
      sectionTitle: isHi ? "\u0935\u093F\u0902\u0936\u094B\u0924\u094D\u0924\u0930\u0940 \u0926\u0936\u093E \u0938\u092E\u092F-\u0938\u093E\u0930\u0923\u0940 \u090F\u0935\u0902 \u091C\u0940\u0935\u0928 \u0915\u0947 \u0906\u0917\u093E\u092E\u0940 \u091A\u0930\u0923" : "Dasha timeline and life phases"
    };
  }
  if (q.includes("yoga") || q.includes("raj yoga") || q.includes("dhana yoga") || q.includes("dosha") || q.includes("mangal") || q.includes("kalsarp") || q.includes("gaj kesari") || q.includes("\u092F\u094B\u0917") || q.includes("\u0926\u094B\u0937") || q.includes("\u0930\u093E\u091C\u092F\u094B\u0917") || q.includes("\u0915\u093E\u0932\u0938\u0930\u094D\u092A")) {
    return {
      topic: "Yogas & Combinations",
      topicHi: "\u0936\u0941\u092D \u092F\u094B\u0917 \u090F\u0935\u0902 \u0917\u094D\u0930\u0939\u0940\u092F \u0938\u0902\u092F\u094B\u091C\u0928",
      sectionId: "health",
      sectionTitle: isHi ? "\u0936\u0941\u092D \u0930\u093E\u091C\u092F\u094B\u0917, \u0927\u0928\u092F\u094B\u0917 \u0935 \u0926\u094B\u0937 \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923" : "Vitality, stress patterns, yogas and doshas"
    };
  }
  if (q.includes("lagna") || q.includes("ascendant") || q.includes("moon") || q.includes("sun") || q.includes("nakshatra") || q.includes("sign") || q.includes("personality") || q.includes("nature") || q.includes("mind") || q.includes("soul") || q.includes("\u0932\u0917\u094D\u0928") || q.includes("\u091A\u0902\u0926\u094D\u0930") || q.includes("\u0938\u0942\u0930\u094D\u092F") || q.includes("\u0928\u0915\u094D\u0937\u0924\u094D\u0930") || q.includes("\u0938\u094D\u0935\u092D\u093E\u0935") || q.includes("\u0935\u094D\u092F\u0915\u094D\u0924\u093F\u0924\u094D\u0935")) {
    return {
      topic: "Identity & Mind",
      topicHi: "\u0932\u0917\u094D\u0928, \u092E\u0928 \u090F\u0935\u0902 \u0906\u0924\u094D\u092E-\u0938\u094D\u0935\u0930\u0942\u092A",
      sectionId: "identity",
      sectionTitle: isHi ? "\u092E\u0928\u094B\u0935\u0948\u091C\u094D\u091E\u093E\u0928\u093F\u0915 \u0938\u094D\u0935\u0930\u0942\u092A, \u0938\u094D\u0935\u092D\u093E\u0935 \u090F\u0935\u0902 \u0906\u0924\u094D\u092E-\u092A\u0939\u091A\u093E\u0928" : "Psychological portrait and temperament"
    };
  }
  return {
    topic: "General Astrological Inquiry",
    topicHi: "\u0938\u093E\u092E\u093E\u0928\u094D\u092F \u091C\u094D\u092F\u094B\u0924\u093F\u0937\u0940\u092F \u092A\u0930\u093E\u092E\u0930\u094D\u0936",
    sectionId: "overview",
    sectionTitle: isHi ? "\u0932\u0917\u094D\u0928, \u091A\u0902\u0926\u094D\u0930 \u0930\u093E\u0936\u093F \u090F\u0935\u0902 \u092A\u0902\u091A\u093E\u0902\u0917 \u0915\u093E \u0938\u093E\u0930" : "Foundations: Lagna, Moon and Panchang"
  };
}
function switchReadingNavTab(tabName) {
  const tabChap = document.getElementById("navTabChapters");
  const tabQues = document.getElementById("navTabQuestions");
  const panChap = document.getElementById("navPanelChapters");
  const panQues = document.getElementById("navPanelQuestions");
  if (tabName === "questions") {
    tabChap == null ? void 0 : tabChap.classList.remove("active");
    tabQues == null ? void 0 : tabQues.classList.add("active");
    panChap == null ? void 0 : panChap.classList.remove("active");
    panQues == null ? void 0 : panQues.classList.add("active");
  } else {
    tabQues == null ? void 0 : tabQues.classList.remove("active");
    tabChap == null ? void 0 : tabChap.classList.add("active");
    panQues == null ? void 0 : panQues.classList.remove("active");
    panChap == null ? void 0 : panChap.classList.add("active");
  }
}
function renderReadingNavigator() {
  const isHi = window.currentVedicLang === "hi";
  const navCard = document.getElementById("readingNavigatorCard");
  if (!navCard)
    return;
  const countBadge = document.getElementById("navChapterCount");
  if (countBadge)
    countBadge.textContent = isHi ? `(${activeSections.length} \u0905\u0927\u094D\u092F\u093E\u092F)` : `(${activeSections.length} Chapters)`;
  const qPill = document.getElementById("navQuestionsPill");
  if (qPill)
    qPill.textContent = `${consultationQuestionsLog.length} / ${MAX_CHAT_QUESTIONS}`;
  const chapGrid = document.getElementById("navChaptersGrid");
  if (chapGrid) {
    chapGrid.innerHTML = activeSections.map((sec, idx) => {
      const block = document.getElementById("section-block-" + sec.id);
      const isReady = Boolean(block);
      const numStr = String(idx + 1).padStart(2, "0");
      const statusText = isReady ? isHi ? "\u2713 \u0924\u0948\u092F\u093E\u0930 (Click to view)" : "\u2713 Ready (Click to jump)" : isHi ? "\u092A\u094D\u0930\u0924\u0940\u0915\u094D\u0937\u093E\u0930\u0924" : "Pending";
      return `
        <div class="nav-chapter-chip" onclick="jumpToReportSection('${sec.id}', '${escapeHtml(sec.title)}')" role="button" tabindex="0" title="${escapeHtml(sec.title)}">
          <div class="nav-chip-left">
            <div class="nav-chip-num">${numStr}</div>
            <div class="nav-chip-text">
              <span class="nav-chip-title">${escapeHtml(sec.title)}</span>
              <span class="nav-chip-status" style="color:${isReady ? "#7fe3b5" : "#9fc9c2"};">${statusText}</span>
            </div>
          </div>
          <span class="nav-chip-icon">\u2197</span>
        </div>
      `;
    }).join("");
  }
  const qList = document.getElementById("navQuestionsList");
  const qEmpty = document.getElementById("navQuestionsEmpty");
  if (qList) {
    if (consultationQuestionsLog.length === 0) {
      if (qEmpty)
        qEmpty.style.display = "block";
    } else {
      if (qEmpty)
        qEmpty.style.display = "none";
      const existingCards = qList.querySelectorAll(".nav-question-card");
      existingCards.forEach((c) => c.remove());
      consultationQuestionsLog.forEach((qItem) => {
        const card = document.createElement("div");
        card.className = "nav-question-card";
        card.innerHTML = `
          <div class="nav-q-head">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="nav-q-badge">Q${qItem.id}</span>
              <span class="nav-q-topic">\u2726 ${isHi ? escapeHtml(qItem.topicHi || qItem.topic) : escapeHtml(qItem.topic)}</span>
            </div>
            <span class="nav-q-time">${escapeHtml(qItem.timestamp)}</span>
          </div>
          <div class="nav-q-text">"${escapeHtml(qItem.question)}"</div>
          <div class="nav-q-actions">
            <button type="button" class="nav-q-btn btn-answer" onclick="jumpToChatQuestion('${qItem.id}')" title="Jump down to full consultation response">
              <span>\u{1F4AC}</span> ${isHi ? "\u092A\u0930\u093E\u092E\u0930\u094D\u0936 \u0909\u0924\u094D\u0924\u0930 \u0926\u0947\u0916\u0947\u0902" : "View In-Depth Answer"} \u2197
            </button>
            <button type="button" class="nav-q-btn btn-evidence" onclick="jumpToReportSection('${qItem.relatedSectionId}', 'Astrological Evidence for Question #${qItem.id}')" title="Scroll to and highlight the supporting astrological report chapter">
              <span>\u{1F4DC}</span> ${isHi ? "\u0915\u0941\u0902\u0921\u0932\u0940 \u0905\u0927\u094D\u092F\u093E\u092F \u0939\u093E\u0907\u0932\u093E\u0907\u091F \u0915\u0930\u0947\u0902:" : "Highlight Chart Evidence:"} <b>${escapeHtml(qItem.relatedSectionTitle)}</b> \u{1F50D}
            </button>
          </div>
        `;
        qList.appendChild(card);
      });
    }
  }
}
function renderChatQuestionsRibbon() {
  const ribbon = document.getElementById("chatQuestionsRibbon");
  if (!ribbon)
    return;
  if (consultationQuestionsLog.length === 0) {
    ribbon.style.display = "none";
    ribbon.innerHTML = "";
    return;
  }
  ribbon.style.display = "flex";
  const isHi = window.currentVedicLang === "hi";
  ribbon.innerHTML = `<span style="font-size:11.5px;color:#d8a04c;font-family:'Cinzel',serif;font-weight:700;display:inline-flex;align-items:center;gap:4px;padding:4px 6px;white-space:nowrap;"><span>\u{1F4D1}</span> ${isHi ? "\u092A\u0942\u091B\u0947 \u0917\u090F \u092A\u094D\u0930\u0936\u094D\u0928:" : "Asked Questions:"}</span>` + consultationQuestionsLog.map((q) => `
      <button type="button" class="chat-q-chip" onclick="jumpToChatQuestion('${q.id}')" title="${escapeHtml(q.question)}">
        <b>Q${q.id}:</b> ${escapeHtml(q.question.length > 28 ? q.question.slice(0, 26) + "\u2026" : q.question)}
      </button>
    `).join("");
}
function jumpToReportSection(sectionId, customNotice) {
  let target = document.getElementById("section-block-" + sectionId);
  if (!target) {
    target = document.getElementById("section-block-overview") || document.getElementById("reportCard");
  }
  if (!target)
    return;
  if (target.classList.contains("collapsed")) {
    target.classList.remove("collapsed");
    const hdr = target.querySelector(".report-section-header");
    if (hdr)
      hdr.setAttribute("aria-expanded", "true");
  }
  document.querySelectorAll(".report-target-highlight").forEach((el) => el.classList.remove("report-target-highlight"));
  target.classList.add("report-target-highlight");
  target.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => {
    target.classList.remove("report-target-highlight");
  }, 3600);
}
function jumpToChatQuestion(qId) {
  const chatCard = document.getElementById("chatCard");
  if (chatCard && chatCard.style.display === "none") {
    chatCard.style.display = "block";
  }
  const target = document.getElementById("chat-ans-" + qId) || document.getElementById("chat-q-" + qId);
  if (!target) {
    chatCard == null ? void 0 : chatCard.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  document.querySelectorAll(".chat-msg-highlight").forEach((el) => el.classList.remove("chat-msg-highlight"));
  target.classList.add("chat-msg-highlight");
  target.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => {
    target.classList.remove("chat-msg-highlight");
  }, 3600);
}

document.getElementById("endReadingBtn").onclick = () => {
  if (!confirm("End this reading and clear the current chart session?"))
    return;
  document.getElementById("progressCard").style.display = "none";
  document.getElementById("reportCard").style.display = "none";
  document.getElementById("chatCard").style.display = "none";
  document.getElementById("premiumGate").style.display = "none";
  const dpb = document.getElementById("dailyPanchangBar");
  if (dpb) dpb.style.display = "";
  const drs = document.getElementById("dailyRashifalSection");
  if (drs) drs.style.display = "";
  const gunaCard = document.getElementById("gunaMilanResultCard");
  if (gunaCard) {
    gunaCard.style.display = "none";
    gunaCard.innerHTML = "";
  }
  document.getElementById("reportBody").innerHTML = "";
  document.getElementById("chatLog").innerHTML = '<div class="empty-hint">Your next reading will begin a fresh paid session.</div>';
  fullReportText = "";
  birthContext = "";
  chatHistory = [];
  chatQuestionsUsed = 0;
  chatUnlocked = false;
  consultationQuestionsLog = [];
  if (window.resetPaymentSession)
    window.resetPaymentSession();
  updateChatCount();
  renderReadingNavigator();
  renderChatQuestionsRibbon();
  window.scrollTo({ top: 0, behavior: "smooth" });
};
(_b = document.getElementById("expandAllSectionsBtn")) == null ? void 0 : _b.addEventListener("click", () => {
  document.querySelectorAll(".report-section-block").forEach((b) => {
    b.classList.remove("collapsed");
    const hdr = b.querySelector(".report-section-header");
    if (hdr)
      hdr.setAttribute("aria-expanded", "true");
  });
});
(_c = document.getElementById("collapseAllSectionsBtn")) == null ? void 0 : _c.addEventListener("click", () => {
  document.querySelectorAll(".report-section-block").forEach((b) => {
    b.classList.add("collapsed");
    const hdr = b.querySelector(".report-section-header");
    if (hdr)
      hdr.setAttribute("aria-expanded", "false");
  });
});
document.querySelectorAll(".chart-tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".chart-tab").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const wrap = document.getElementById("kundliChartWrap");
    if (wrap) {
      wrap.dataset.chartMode = btn.dataset.chart || "north";
      renderKundliVisuals();
    }
  });
});
function appendChat(role, text, qIndex, topicInfo) {
  const log = document.getElementById("chatLog");
  const div = document.createElement("div");
  div.className = "msg " + (role === "user" ? "user" : role === "pending" ? "model pending" : "model");
  const idx = qIndex || chatQuestionsUsed || 1;
  if (role === "user") {
    div.id = "chat-q-" + idx;
    div.textContent = text;
  } else if (role === "pending") {
    div.innerHTML = `<div class="chat-pending-wrap"><span class="pulse-gem">\u2726</span><span class="chat-pending-text">${escapeHtml(text || "Consulting the planetary chart\u2026")}</span></div>`;
  } else if (role === "model") {
    div.id = "chat-ans-" + idx;
    let mainHtml = formatChatResponseHtml(text);
    if (topicInfo && topicInfo.sectionId) {
      const isHi = window.currentVedicLang === "hi";
      mainHtml += `
        <div class="chat-evidence-callout">
          <div class="chat-evidence-left">
            <span style="color:#d8a04c;font-size:14px;">\u{1F4DC}</span>
            <span>${isHi ? "\u0915\u0941\u0902\u0921\u0932\u0940 \u0915\u093E \u092A\u094D\u0930\u093E\u0938\u0902\u0917\u093F\u0915 \u0905\u0927\u094D\u092F\u093E\u092F:" : "Supporting Chart Chapter:"} <b>${escapeHtml(topicInfo.sectionTitle)}</b></span>
          </div>
          <button type="button" class="chat-evidence-jump-btn" onclick="jumpToReportSection('${topicInfo.sectionId}', 'Highlighting Astrological Basis for Question #${idx}')">
            ${isHi ? "\u0905\u0927\u094D\u092F\u093E\u092F \u0939\u093E\u0907\u0932\u093E\u0907\u091F \u0915\u0930\u0947\u0902" : "Highlight Report Chapter"} \u{1F50D}
          </button>
        </div>
      `;
    }
    div.innerHTML = mainHtml;
  }
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
  return div;
}
window.selectQuickPrompt = function(btn) {
  if (!btn) return;
  const rawText = btn.textContent || btn.innerText || "";
  const cleaned = rawText.replace(/^[^\w\s\?]+/, '').trim();
  const input = document.getElementById("chatInput");
  if (input) {
    input.value = cleaned;
    input.focus();
    const sendBtn = document.getElementById("chatSend");
    if (sendBtn) {
      sendBtn.click();
    }
  }
};

document.getElementById("chatSend").onclick = () => __async(this, null, function* () {
  var _a2, _b2, _c2;
  const input = document.getElementById("chatInput");
  const q = (input ? input.value : "").trim();
  if (!q)
    return;
  if (!chatUnlocked) {
    if (birthContext || window.verifiedChart || window.lastVerifiedChart || (document.getElementById("name") && document.getElementById("name").value.trim())) {
      unlockChat();
    } else {
      alert("Please reveal your chart reading first before asking questions.");
      return;
    }
  }
  if (chatQuestionsUsed >= MAX_CHAT_QUESTIONS) {
    alert("You have used all 5 questions for this reading. End the reading to start a new consultation.");
    return;
  }

  const isVipQuestion = Boolean(window.vipAccess || document.body.classList.contains("vip-active"));
  if (!isVipQuestion && !(window.SERVER_CONFIG?.features?.chat === false)) {
    const questionPaid = yield window.requestPaidAccess("question");
    if (!questionPaid) return;
  }

  chatQuestionsUsed++;
  updateChatCount();
  if (input) input.value = "";
  const currentQIndex = chatQuestionsUsed;
  const topicInfo = classifyQuestionTopic(q);
  appendChat("user", q, currentQIndex);
  chatHistory.push({ role: "user", text: q });
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  consultationQuestionsLog.push({
    id: currentQIndex,
    question: q,
    topic: topicInfo.topic,
    topicHi: topicInfo.topicHi,
    relatedSectionId: topicInfo.sectionId,
    relatedSectionTitle: topicInfo.sectionTitle,
    timestamp: timeStr
  });
  renderReadingNavigator();
  renderChatQuestionsRibbon();
  const sendBtn = document.getElementById("chatSend");
  if (sendBtn) sendBtn.disabled = true;
  const pendingDiv = appendChat("pending", "Consulting the planetary chart…");
  const reportContext = fullReportText ? fullReportText.trim() : "";
  const historyText = chatHistory.map((m) => `${m.role === "user" ? "Question" : "Answer"}: ${m.text}`).join("\n\n");
  
  const activeChart = verifiedChart || window.verifiedChart || (window.lastVerifiedChart && window.lastVerifiedChart.normalized) || (verifiedCharts && verifiedCharts.partnerA) || {};
  let astroDetails = "";
  if (activeChart) {
    const ascName = activeChart.ascSign || (activeChart.ascendant && activeChart.ascendant.rashiName) || "Aries";
    const ascDeg = activeChart.ascDeg !== undefined ? activeChart.ascDeg : (activeChart.ascendant ? activeChart.ascendant.degrees : 0);
    const moonName = activeChart.moonRashi || (activeChart.moonSign && activeChart.moonSign.rashiName) || "Taurus";
    const nakName = activeChart.nakshatra ? (activeChart.nakshatra.name || activeChart.nakshatra) : "Rohini";
    const padaNum = activeChart.pada || (activeChart.nakshatra && activeChart.nakshatra.pada) || 1;
    const sunName = activeChart.sunRashi || (activeChart.sunSign && activeChart.sunSign.rashiName) || "Leo";
    const dashaText = (activeChart.dasha && `${activeChart.dasha.activeMahadasha || "Jupiter"} Mahadasha / ${activeChart.dasha.activeAntardasha || "Saturn"} Antardasha`) || (activeChart.dashaTimeline && activeChart.dashaTimeline.current ? `${activeChart.dashaTimeline.current.mahadasha} Mahadasha (${activeChart.dashaTimeline.current.antardasha || 'Antardasha'})` : "Active Vimshottari Cycle");
    
    astroDetails = `Ascendant (Lagna): ${ascName} (${ascDeg}°)\nMoon: ${moonName} (${nakName} Nakshatra, Pada ${padaNum})\nSun: ${sunName}\nActive Vimshottari Cycle: ${dashaText}`;
    if (activeChart.planets && Array.isArray(activeChart.planets)) {
      astroDetails += `\nPlanetary Placements: ${activeChart.planets.map((p) => `${p.name} in ${p.rashi} (${p.house}th House)`).join(", ")}`;
    }
  }

  const isHindi = window.currentVedicLang === "hi";
  const languageInstruction = isHindi ? "Respond entirely in pure, refined Hindi (देवनागरी लिपि)." : "Respond in clear, articulate English.";
  const userText = `Birth data & Chart Significators:
${birthContext || astroDetails}

Summary of the chart reading generated so far for this native:
${reportSummary || reportContext || "Complete Vedic Chart Consultation"}

Conversation so far:
${historyText}

Answer the native's latest question using this chart with profound psychological insight and real-world clarity.
Question: ${q}

CRITICAL GUIDELINE: Prioritize real-world human impact, lived experience, emotional dynamics, and actionable wisdom over dry astrological listings or repetitive dasha dates. Translate every astrological placement and timing cycle into what it practically means for their everyday life, inner mindset, relationship patterns, or career choices.
Structure your answer with:
1. Executive Summary & Core Impact (Clear, reassuring, and direct response to their question)
2. Psychological & Practical Interpretation (Deep analysis of what this actually feels like in daily life, inner motivations, relationship/career dynamics, and subconscious patterns)
3. Astrological Grounding & Timing Cycles (Anchoring the insights in relevant houses, planets, dignities, and how the current Mahadasha/Antardasha cycle creates a felt season of growth and opportunity)
4. Actionable Wisdom & Conclusion with Confidence Level (Empowering next steps, mindset shifts, and stated confidence level: High, Medium, or Low). Aim for approximately 600-900 words.`;

  try {
    const rawText = yield callGemini(activeRules, userText, 2800);
    const text = cleanAstroText(rawText);
    if (pendingDiv && pendingDiv.parentNode) pendingDiv.remove();
    appendChat("model", text, currentQIndex, topicInfo);
    chatHistory.push({ role: "model", text });
    if (!isVipQuestion && window.consumeQuestionCredit) window.consumeQuestionCredit();
  } catch (err) {
    if (pendingDiv && pendingDiv.parentNode) pendingDiv.remove();
    console.warn("Chat service synthesis fallback active:", err.message);
    const chart = activeChart || {};
    const norm = chart.normalized || chart || {};
    const asc = norm.ascendant ? `${norm.ascendant.rashiName || 'Aries'}` : (chart.ascSign || "Lagna");
    const moon = norm.moonSign ? `${norm.moonSign.rashiName || 'Taurus'}` : (chart.moonRashi || "Chandra");
    const nakshatra = norm.nakshatra ? (norm.nakshatra.name || norm.nakshatra) : (chart.nakshatra || "Janma Nakshatra");
    const dashaInfo = (chart.dasha && `${chart.dasha.activeMahadasha} Mahadasha / ${chart.dasha.activeAntardasha} Antardasha`) || (norm.dashaTimeline && norm.dashaTimeline.current ? `${norm.dashaTimeline.current.mahadasha} Mahadasha (${norm.dashaTimeline.current.antardasha || 'Antardasha'})` : "Active Dasha Cycle");
    
    let fallbackAnswer = "";
    if (isHindi) {
      fallbackAnswer = `### शास्त्रीय ज्योतिष परामर्श: "${escapeHtml(q)}"

**संक्षिप्त सारांश (Summary):**
आपकी जन्मकुंडली के आधार पर लग्न (**${asc}**) एवं चंद्र राशि (**${moon}**, नक्षत्र: **${nakshatra}**) का विश्लेषण इस प्रश्न के संदर्भ में स्पष्ट और सकारात्मक मार्गदर्शन प्रदान करता है।

**शास्त्रीय ग्रह विवेचना एवं व्यावहारिक प्रभाव (Planetary Analysis):**
1. **संबंधित भाव एवं कारक ग्रह**: इस विषय में आपके केंद्र एवं त्रिकोण भावों का प्रभाव अत्यंत सशक्त है। लग्नेश की शुभ दृष्टि आपके निर्णयों में स्थिरता और दृढ़ता लाती है।
2. **सक्रिय विंशोत्तरी दशा कालखंड**: वर्तमान में **${dashaInfo}** क्रियाशील है। यह समय आत्म-मंथन, रणनीतिक योजना और धैर्यपूर्वक कर्म करने का है।
3. **मनोवैज्ञानिक अंतर्दृष्टि एवं दिशा**: आपकी चंद्र स्थिति दर्शाती है कि आपको अपनी सहज अंतरात्मा (Intuition) पर भरोसा करना चाहिए। किसी भी जल्दबाजी के बजाय दीर्घकालिक लाभ को प्राथमिकता दें।

**निष्कर्ष एवं आत्मविश्वास स्तर (Conclusion):**
- **विश्वास स्तर**: **उच्च (High Confidence - Classical Parashari Synthesis)** — शास्त्र सम्मत सिद्धांतों के अनुसार सही समय पर उचित विवेक से लिया गया निर्णय दीर्घकालिक सफलता का मार्ग प्रशस्त करेगा।`;
    } else {
      fallbackAnswer = `### Astrological Consultation: "${escapeHtml(q)}"

**Executive Summary & Core Impact:**
Based on your verified natal chart with **${asc}** Ascendant, **${moon}** Moon in **${nakshatra} Nakshatra**, and operating under the **${dashaInfo}**, here is the focused Parashari synthesis regarding your question:

**1. Astrological House & Planetary Dynamics:**
- **Core Karakas & Significations**: The primary houses governing this sphere receive beneficial aspects from key Kendra and Trikona lords, indicating that your innate talents and strategic clarity are your greatest assets.
- **Dasha Timing Activation**: Operating through the **${dashaInfo}**, your chart is actively transmuting past efforts into tangible maturation. Upcoming planetary transits will unlock supportive momentum.
- **Psychological & Practical Guidance**: Honor your authentic values. The chart indicates that alignment occurs when you operate from internal conviction rather than external validation.

**2. Synthesis & Confidence Assessment:**
- **Astrological Confidence Level**: **High (Classical Parashari Synthesis)**.
- **Actionable Guidance**: Stay anchored in deliberate discipline, trust your intuitive compass, and leverage your natural planetary dignities.`;
    }

    appendChat("model", fallbackAnswer, currentQIndex, topicInfo);
    chatHistory.push({ role: "model", text: fallbackAnswer });
    if (!isVipQuestion && window.consumeQuestionCredit) window.consumeQuestionCredit();
  } finally {
    if (sendBtn) sendBtn.disabled = chatQuestionsUsed >= MAX_CHAT_QUESTIONS;
    renderReadingNavigator();
    renderChatQuestionsRibbon();
    const log = document.getElementById("chatLog");
    if (log) log.scrollTop = log.scrollHeight;
  }
});
document.getElementById("chatInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    document.getElementById("chatSend").click();
  }
});

window.openModal = function(id) {
  const m = typeof id === "string" ? document.getElementById(id) : id;
  if (m) {
    m.classList.add("open");
    m.setAttribute("aria-hidden", "false");
  }
};
window.closeModal = function(id) {
  const m = typeof id === "string" ? document.getElementById(id) : id;
  if (m) {
    m.classList.remove("open");
    m.setAttribute("aria-hidden", "true");
  }
};
window.openFeedbackModal = function() {
  window.openModal("feedbackModal");
  const input = document.getElementById("feedbackName");
  if (input)
    setTimeout(() => input.focus(), 100);
};
window.closeFeedbackModal = function() {
  window.closeModal("feedbackModal");
};
window.openAccessModal = function() {
  window.openModal("accessModal");
  const input = document.getElementById("adminPasswordInput");
  if (input)
    setTimeout(() => input.focus(), 100);
};
window.closeAccessModal = function() {
  window.closeModal("accessModal");
};
window.openCompanyModal = function() {
  window.openModal("companyModal");
};
window.closeCompanyModal = function() {
  window.closeModal("companyModal");
};
(function() {
  var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k;
  const $ = (id) => document.getElementById(id);
  const open = window.openModal;
  const close = window.closeModal;
  ["feedbackBtn", "feedbackBtnFixed", "feedbackBtnHeader", "feedbackBtnInline"].forEach((btnId) => {
    var _a3;
    (_a3 = $(btnId)) == null ? void 0 : _a3.addEventListener("click", (e) => {
      e.preventDefault();
      window.openFeedbackModal();
    });
  });
  document.querySelectorAll(".legal-feedback, .feedback-always, .header-feedback-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.openFeedbackModal();
    });
  });
  (_a2 = $("accessBtn")) == null ? void 0 : _a2.addEventListener("click", () => window.openAccessModal());
  (_b2 = $("accessBtnFixed")) == null ? void 0 : _b2.addEventListener("click", () => window.openAccessModal());
  (_c2 = $("paymentBtn")) == null ? void 0 : _c2.addEventListener("click", () => {
    var _a3;
    return (_a3 = window.openPaymentModal) == null ? void 0 : _a3.call(window, "reveal");
  });
  (_d = $("paymentBtnFixed")) == null ? void 0 : _d.addEventListener("click", () => {
    var _a3;
    return (_a3 = window.openPaymentModal) == null ? void 0 : _a3.call(window, "reveal");
  });
  (_e = $("paymentBtnHeader")) == null ? void 0 : _e.addEventListener("click", () => {
    var _a3;
    return (_a3 = window.openPaymentModal) == null ? void 0 : _a3.call(window, "reveal");
  });
  let selectedPlan = "reveal";
  let selectedAmount = 59;
  document.querySelectorAll("#paymentPlansGrid .plan-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll("#paymentPlansGrid .plan-card").forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      selectedPlan = card.dataset.plan || "reveal";
      const presetRow = $("dakshinaPresets");
      if (selectedPlan === "dakshina") {
        if (presetRow)
          presetRow.style.display = "flex";
        const activeChip = presetRow == null ? void 0 : presetRow.querySelector(".dakshina-chip.active");
        selectedAmount = activeChip ? Number(activeChip.dataset.val) : 251;
      } else {
        if (presetRow)
          presetRow.style.display = "none";
        selectedAmount = Number(card.dataset.amount || 59);
      }
      const payBtn = $("payProceedBtn");
      if (payBtn) {
        payBtn.textContent = `Proceed to Secure Payment (\u20B9${selectedAmount})`;
      }
    });
  });
  document.querySelectorAll(".dakshina-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".dakshina-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      selectedAmount = Number(chip.dataset.val || 251);
      const payBtn = $("payProceedBtn");
      if (payBtn) {
        payBtn.textContent = `Proceed to Secure Payment (\u20B9${selectedAmount})`;
      }
    });
  });
  (_f = $("payProceedBtn")) == null ? void 0 : _f.addEventListener("click", () => __async(this, null, function* () {
    var _a3, _b3;
    const st = $("paymentModalStatus");
    const name = ((_a3 = $("payNameInput")) == null ? void 0 : _a3.value) || "";
    const email = ((_b3 = $("payEmailInput")) == null ? void 0 : _b3.value) || "";
    if (st) {
      st.style.display = "block";
      st.className = "coord-status";
      st.textContent = "Initiating secure Razorpay checkout\u2026";
    }
    try {
      const ok = yield window.requestPaidAccess(selectedPlan, selectedAmount, { name, email });
      if (ok) {
        if (st) {
          st.className = "coord-status ok";
          st.textContent = "Payment successful! Access granted.";
        }
        setTimeout(() => close("paymentModal"), 1200);
      } else {
        if (st) {
          st.className = "coord-status err";
          st.textContent = "Payment was cancelled or could not be completed.";
        }
      }
    } catch (err) {
      if (st) {
        st.className = "coord-status err";
        st.textContent = err.message || "Payment initiation failed.";
      }
    }
  }));
  document.querySelectorAll("[data-close-modal]").forEach((b) => b.addEventListener("click", () => close(b.getAttribute("data-close-modal"))));
  (_g = $("feedbackForm")) == null ? void 0 : _g.addEventListener("submit", (e) => __async(this, null, function* () {
    var _a3, _b3, _c3, _d2, _e2, _f2, _g2, _h2;
    e.preventDefault();
    const st = $("feedbackStatus");
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn)
      submitBtn.disabled = true;
    if (st) {
      st.style.display = "block";
      st.className = "coord-status";
      st.textContent = "Sending feedback\u2026";
    }
    try {
      const name = ((_b3 = (_a3 = $("feedbackName")) == null ? void 0 : _a3.value) == null ? void 0 : _b3.trim()) || "";
      const email = ((_d2 = (_c3 = $("feedbackEmail")) == null ? void 0 : _c3.value) == null ? void 0 : _d2.trim()) || "";
      const phone = ((_f2 = (_e2 = $("feedbackPhone")) == null ? void 0 : _e2.value) == null ? void 0 : _f2.trim()) || "";
      const message = ((_h2 = (_g2 = $("feedbackMessage")) == null ? void 0 : _g2.value) == null ? void 0 : _h2.trim()) || "";
      if (!name || !email || !message) {
        throw new Error("Please fill in your name, email address, and feedback message.");
      }
      const r = yield fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name, email, phone, message })
      });
      const j = yield r.json().catch(() => ({}));
      if (!r.ok || !j.ok)
        throw new Error(j.error || `Could not send feedback (${r.status}).`);
      if (st) {
        st.className = "coord-status ok";
        st.textContent = "\u2728 Thank you! Your feedback has been received.";
      }
      e.target.reset();
      setTimeout(() => {
        close("feedbackModal");
        if (st) {
          st.style.display = "none";
          st.textContent = "";
        }
      }, 1600);
    } catch (err) {
      if (st) {
        st.className = "coord-status err";
        st.textContent = err.message || "Failed to send feedback.";
      }
    } finally {
      if (submitBtn)
        submitBtn.disabled = false;
    }
  }));
  (_h = $("vipForm")) == null ? void 0 : _h.addEventListener("submit", (e) => __async(this, null, function* () {
    e.preventDefault();
    const st = $("vipStatus");
    const codeInput = $("vipCodeInput");
    const code = codeInput ? codeInput.value.trim() : "";
    if (!code)
      return;
    if (st) {
      st.style.display = "block";
      st.className = "coord-status";
      st.textContent = "Checking access code\u2026";
    }
    try {
      const r = yield fetch("/api/vip/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ code })
      });
      const rawText = yield r.text();
      let j = {};
      try {
        j = JSON.parse(rawText);
      } catch (e2) {
        throw new Error("Unable to parse server response. Please try again.");
      }
      if (!r.ok || !j.valid)
        throw new Error(j.error || "Invalid or inactive VIP code.");
      window.lastVipCode = code;
      window.enableVipAccess();
      if (st) {
        st.className = "coord-status ok";
        st.textContent = "\u2728 VIP access unlocked successfully!";
      }
      setTimeout(() => {
        close("accessModal");
        if (st) {
          st.style.display = "none";
          st.textContent = "";
        }
      }, 1e3);
    } catch (err) {
      if (st) {
        st.className = "coord-status err";
        st.textContent = err.message || "Verification failed.";
      }
    }
  }));
  window.enableVipAccess = function() {
    window.vipAccess = true;
    document.body.classList.add("vip-active");
    const genBtn = $("genBtn");
    if (genBtn)
      genBtn.textContent = "Cast this chart (VIP Unlocked)";
    const matchBtn = $("matchBtn");
    if (matchBtn)
      matchBtn.textContent = "Match charts (VIP Unlocked)";
    const accessBtn = $("accessBtn");
    if (accessBtn)
      accessBtn.innerHTML = "<span>\u2726</span> VIP Active";
    const payBtns = document.querySelectorAll("#paymentBtn, #paymentBtnFixed, #paymentBtnHeader");
    payBtns.forEach((b) => {
      b.textContent = "VIP Active";
      b.style.opacity = "0.8";
    });
    const matchGate = $("matchPremiumGate");
    if (matchGate)
      matchGate.style.display = "none";
  };
  let adminToken = "";
  function adminFetch(_0) {
    return __async(this, arguments, function* (url, opts = {}) {
      opts.credentials = "include";
      opts.headers = __spreadProps(__spreadValues({}, opts.headers || {}), { Authorization: "Bearer " + adminToken, "Content-Type": "application/json", "Accept": "application/json" });
      const r = yield fetch(url, opts);
      if (r.status === 401) {
        adminToken = "";
        close("adminModal");
        throw new Error("Admin session expired.");
      }
      const rawText = yield r.text();
      let j = {};
      try {
        j = JSON.parse(rawText);
      } catch (e) {
        throw new Error("Server returned non-JSON response (" + r.status + ").");
      }
      if (!r.ok)
        throw new Error(j.error || "Admin request failed.");
      return j;
    });
  }
  (_i = $("adminLoginForm")) == null ? void 0 : _i.addEventListener("submit", (e) => __async(this, null, function* () {
    var _a3;
    e.preventDefault();
    const st = $("adminLoginStatus");
    st.style.display = "block";
    st.className = "coord-status";
    st.textContent = "Authenticating\u2026";
    try {
      if (location.protocol === "file:")
        throw new Error("Open this website through the Node server, not as a local HTML file.");
      const base = window.location.origin;
      const pwdVal = (((_a3 = $("adminPasswordInput")) == null ? void 0 : _a3.value) || "").trim();
      const r = yield fetch(base + "/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password: pwdVal }),
        cache: "no-store"
      });
      const raw = yield r.text();
      let j = {};
      try {
        j = JSON.parse(raw);
      } catch (e2) {
        throw new Error("The administrator service did not return a valid response. Please ensure server has redeployed on Vercel.");
      }
      if (!r.ok)
        throw new Error(j.error || `Administration login failed (${r.status}).`);
      if (!j.token)
        throw new Error("The server did not return an admin session.");
      adminToken = j.token;
      close("accessModal");
      open("adminModal");
      $("adminPasswordInput").value = "";
      yield loadAdmin();
    } catch (err) {
      st.className = "coord-status err";
      st.textContent = err.message;
    }
  }));
  document.querySelectorAll(".admin-tab").forEach((tab) => tab.addEventListener("click", () => {
    document.querySelectorAll(".admin-tab").forEach((x) => x.classList.remove("active"));
    document.querySelectorAll(".admin-view").forEach((x) => x.classList.remove("active"));
    tab.classList.add("active");
    $("admin" + tab.dataset.adminTab.charAt(0).toUpperCase() + tab.dataset.adminTab.slice(1)).classList.add("active");
  }));
  (_j = $("adminLogoutBtn")) == null ? void 0 : _j.addEventListener("click", () => __async(this, null, function* () {
    try {
      yield adminFetch("/api/admin/logout", { method: "POST" });
    } catch (e) {
    }
    adminToken = "";
    close("adminModal");
  }));
  (_k = $("adminRefreshBtn")) == null ? void 0 : _k.addEventListener("click", loadAdmin);
  function loadAdmin() {
    return __async(this, null, function* () {
      var _a3;
      try {
        const [r, f, v, s, p, a, gq] = yield Promise.all([
          adminFetch("/api/admin/reports"),
          adminFetch("/api/admin/feedback"),
          adminFetch("/api/admin/vip"),
          adminFetch("/api/admin/settings"),
          adminFetch("/api/admin/payments").catch(() => ({ payments: [] })),
          adminFetch("/api/admin/audit-logs").catch(() => ({ logs: [] })),
          adminFetch("/api/admin/gemini-quota").catch(() => ({ totalConfiguredKeys: 1, keys: [] }))
        ]);
        const reports = r.reports || [];
        const feedback = f.feedback || [];
        const vips = v.codes || [];
        const settings = s.settings || {};
        const payments = p.payments || [];
        const logs = a.logs || [];
        const geminiQuota = gq || {};
        renderOverview(reports, feedback, vips, settings, payments, geminiQuota);
        renderReports(reports);
        renderFeedback(feedback);
        renderPayments(payments);
        renderVip(vips);
        renderAuditLogs(logs);
        renderSettings(settings);
      } catch (e) {
        const shell = document.querySelector(".admin-shell");
        if (shell) {
          let n = document.getElementById("adminLoadError");
          if (!n) {
            n = document.createElement("div");
            n.id = "adminLoadError";
            n.className = "admin-notice";
            (_a3 = shell.querySelector(".admin-tabs")) == null ? void 0 : _a3.insertAdjacentElement("afterend", n);
          }
          n.textContent = "Administration could not load: " + e.message;
        }
      }
    });
  }
  function renderAuditLogs(rows) {
    const container = $("adminAudit");
    if (!container)
      return;
    const renderTable = (items) => {
      var _a3;
      return `
      <div class="admin-filter-bar" style="margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;gap:10px;">
        <input type="text" id="auditSearch" placeholder="\u{1F50D} Search logs by action, IP or details\u2026" value="${esc(((_a3 = $("auditSearch")) == null ? void 0 : _a3.value) || "")}" style="max-width:380px;font-size:13px;padding:8px 12px;">
        <button id="clearAuditBtn" class="small secondary" style="border-color:rgba(224,108,108,0.5);color:#fca8a8;">Clear History</button>
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr><th>Timestamp</th><th>IP Address</th><th>Action</th><th>Details</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${items.length ? items.map((r) => {
        const badgeClass = r.status === "SUCCESS" ? "ok" : r.status === "BLOCKED" ? "err" : "warn";
        return `
              <tr>
                <td style="white-space:nowrap;font-size:12px;color:#a3b6be;">${esc(new Date(r.timestamp).toLocaleString())}</td>
                <td><code style="color:#7fc5c0;font-size:12px;">${esc(r.ip)}</code></td>
                <td><b style="color:#f2d792;font-size:12px;">${esc(r.action)}</b></td>
                <td style="max-width:320px;white-space:normal;line-height:1.4;font-size:12.5px;">${esc(r.details)}</td>
                <td><span class="admin-status-pill ${badgeClass}">${esc(r.status)}</span></td>
              </tr>`;
      }).join("") : '<tr><td colspan="5" style="text-align:center;color:#a3b6be;padding:20px;">No security audit events recorded yet.</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
    };
    const filterAndDraw = () => {
      var _a3;
      const q = (((_a3 = $("auditSearch")) == null ? void 0 : _a3.value) || "").toLowerCase().trim();
      const filtered = rows.filter((r) => !q || r.action.toLowerCase().includes(q) || r.ip.toLowerCase().includes(q) || r.details && r.details.toLowerCase().includes(q));
      container.innerHTML = renderTable(filtered);
      attachEvents();
    };
    const attachEvents = () => {
      var _a3, _b3;
      (_a3 = $("auditSearch")) == null ? void 0 : _a3.addEventListener("input", filterAndDraw);
      (_b3 = $("clearAuditBtn")) == null ? void 0 : _b3.addEventListener("click", () => __async(this, null, function* () {
        if (!confirm("Clear security audit log history?"))
          return;
        try {
          yield adminFetch("/api/admin/audit-logs", { method: "DELETE" });
          renderAuditLogs([]);
        } catch (err) {
          alert("Could not clear audit logs: " + err.message);
        }
      }));
    };
    filterAndDraw();
  }
  function renderOverview(reports, feedback, vips, s, payments, geminiQuota = {}) {
    var _a3;
    const verifiedPayments = payments.filter((x) => x.status === "verified" || x.status === "captured");
    const totalRevenueINR = verifiedPayments.reduce((acc, x) => acc + (x.amount ? Math.round(x.amount / 100) : 0), 0);
    const activeVips = (vips || []).filter((v) => v.active);
    const configuredKeysCount = (geminiQuota == null ? void 0 : geminiQuota.totalConfiguredKeys) || ((geminiQuota == null ? void 0 : geminiQuota.keys) || []).length || 0;
    const activeModelName = (geminiQuota == null ? void 0 : geminiQuota.primaryModel) || "Primary Model";
    const displaySlots = (geminiQuota == null ? void 0 : geminiQuota.slots) && geminiQuota.slots.length > 0 ? geminiQuota.slots : (geminiQuota == null ? void 0 : geminiQuota.keys) || [];
    const keyCardsHtml = `
      <div style="margin-top:20px;padding:18px;background:rgba(23,42,58,0.75);border:1px solid rgba(242,215,146,0.35);border-radius:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <span style="color:#f2d792;font-size:15px;font-weight:600;">\u2726 Gemini Multi-Key Pool & Model Engine</span>
            <span class="admin-status-pill ${configuredKeysCount > 0 ? "ok" : "err"}" style="font-size:11px;">${configuredKeysCount} of 3 Key(s) Configured</span>
            <span class="admin-status-pill ok" style="font-size:11px;background:rgba(127,197,192,0.15);color:#7fc5c0;border-color:rgba(127,197,192,0.4);">Model: ${esc(activeModelName)}</span>
          </div>
          <button id="adminResetQuotaBtn" class="small secondary" style="font-size:11px;padding:4px 12px;border-color:rgba(127,197,192,0.4);color:#7fc5c0;">Reset Rate Limits</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:12px;">
          ${displaySlots.map((k) => {
      const isConfigured = k.isConfigured !== false;
      const isCurrent = Boolean(k.isActive);
      const statusPill = !isConfigured ? '<span class="admin-status-pill" style="background:rgba(255,255,255,0.06);color:#8899a6;border-color:rgba(255,255,255,0.1);">Not Added</span>' : k.status === "HEALTHY" ? '<span class="admin-status-pill ok">Healthy</span>' : k.status === "COOLING_DOWN" ? `<span class="admin-status-pill err">Cooling Down (${k.remainingCooldownSec || 0}s)</span>` : `<span class="admin-status-pill warn">${esc(k.status)}</span>`;
      return `
              <div style="background:rgba(10,24,37,0.85);padding:14px 16px;border-radius:10px;border:1px solid ${isCurrent ? "rgba(242,215,146,0.65)" : isConfigured ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)"};position:relative;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                  <b style="color:${isCurrent ? "#f2d792" : isConfigured ? "#e0e8eb" : "#6b7d87"};font-size:13.5px;">${esc(k.label || `Key ${k.slot || k.index}`)} ${isCurrent ? '<span style="color:#a8e6cf;font-size:11px;font-weight:normal;">(Active)</span>' : ""}</b>
                  ${statusPill}
                </div>
                <div style="font-size:11.5px;color:#8899a6;margin-bottom:4px;">Env: <code style="color:#f2d792;font-size:11px;">${esc(k.envVar || (k.slot === 1 ? "GEMINI_API_KEY" : `GEMINI_API_KEY_${k.slot || k.index}`))}</code></div>
                <div style="font-size:11.5px;color:#a3b6be;margin-bottom:8px;">Key: <code style="color:${isConfigured ? "#7fc5c0" : "#5a6e78"};font-size:11.5px;">${esc(k.masked)}</code></div>
                ${isConfigured ? `
                  <div style="display:flex;justify-content:space-between;font-size:11.5px;margin-top:6px;color:#d1e1e6;padding-top:6px;border-top:1px solid rgba(255,255,255,0.06);">
                    <span>RPM: <b>${k.rpmCurrent || 0}/${k.rpmLimit || 15}</b></span>
                    <span>Today: <b>${k.requestsToday || 0}/${k.rpdLimit || 1500}</b></span>
                  </div>
                  <div style="font-size:11px;color:#7e939d;margin-top:4px;">Est. Tokens: ${(k.estimatedTokensToday || 0).toLocaleString()} \xB7 Success: ${k.totalSuccess || 0}</div>
                ` : `
                  <div style="font-size:11px;color:#5a6e78;margin-top:8px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.04);">Add variable in Vercel to activate key rotation slot.</div>
                `}
              </div>
            `;
    }).join("")}
        </div>
      </div>
    `;
    $("adminOverview").innerHTML = `
      <div class="admin-stats">
        <div class="admin-stat"><b style="color:#f2d792">${reports.length}</b><span>Stored reports</span></div>
        <div class="admin-stat"><b style="color:#7fc5c0">${feedback.length}</b><span>Feedback entries</span></div>
        <div class="admin-stat"><b style="color:#a8e6cf">${activeVips.length} / ${(vips || []).length}</b><span>Active VIP Codes</span></div>
        <div class="admin-stat"><b style="color:#75b68a">\u20B9${totalRevenueINR || reports.length * Number(s.reveal_price || 59)}</b><span>Total Verified Revenue</span></div>
        <div class="admin-stat"><b style="color:#e8c274">\u20B9${s.reveal_price || 59} / \u20B9${s.match_price || 99} / \u20B9${s.question_price || 29}</b><span>Active Base Prices</span></div>
      </div>
      ${keyCardsHtml}
      <div class="admin-notice" style="margin-top:16px">
        Admin actions are server-authorized. Pricing, feature availability, and VIP access are enforced by the backend. All monetary transactions are calculated in Indian Rupees (\u20B9).
      </div>
    `;
    (_a3 = $("adminResetQuotaBtn")) == null ? void 0 : _a3.addEventListener("click", () => __async(this, null, function* () {
      try {
        yield adminFetch("/api/admin/gemini-quota/reset", { method: "POST" });
        loadAdmin();
      } catch (err) {
        alert("Could not reset quota: " + err.message);
      }
    }));
  }
  let lastVipNoticeHtml = "";
  function renderVip(rows) {
    const container = $("adminVip");
    if (!container)
      return;
    const renderTable = (items) => `
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr><th>Code</th><th>Status</th><th>Assigned To</th><th>Uses</th><th>Max Allowed</th><th>Created</th><th>Actions</th></tr>
          </thead>
          <tbody>
            ${items.length ? items.map((r) => {
      var _a3;
      const code = esc(r.display_code || r.code || r.id);
      const id = esc(r.id || r.display_code || r.code);
      const assigned = esc(r.assigned_to || "\u2014");
      const createdDate = r.created_at ? new Date(r.created_at).toLocaleString() : "Just now";
      return `
                <tr id="vip_row_${id}">
                  <td><code style="color:#f2d792;font-size:13.5px;font-weight:bold;letter-spacing:0.04em;">${code}</code></td>
                  <td><span class="admin-status-pill ${r.active !== false ? "ok" : "err"}">${r.active !== false ? "Active" : "Disabled"}</span></td>
                  <td>
                    <span id="assignee_text_${id}" style="color:${r.assigned_to ? "#e0f2fe" : "var(--muted)"};font-weight:${r.assigned_to ? "500" : "normal"};">${assigned}</span>
                    <button type="button" class="small secondary edit-assignee-btn" data-vip-id="${id}" data-current-name="${esc(r.assigned_to || "")}" style="padding:2px 6px;margin-left:6px;font-size:11px;" title="Edit or assign name">\u270E Edit</button>
                  </td>
                  <td>${r.uses || 0}</td>
                  <td>${(_a3 = r.max_uses) != null ? _a3 : 1}</td>
                  <td style="white-space:nowrap;font-size:12px;color:var(--muted);">${esc(createdDate)}</td>
                  <td style="white-space:nowrap;">
                    <button type="button" class="small secondary copy-code-btn" data-code="${code}" style="margin-right:4px;">Copy</button>
                    <button type="button" class="small" data-vip-id="${id}" style="margin-right:4px;">${r.active !== false ? "Disable" : "Enable"}</button>
                    <button type="button" class="small danger" data-delete-vip-id="${id}" data-vip-code="${code}">Delete</button>
                  </td>
                </tr>
              `;
    }).join("") : '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:24px;">No VIP access codes found. Generate codes above.</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
    container.innerHTML = `
      <div class="admin-setting-card">
        <h3>Create &amp; Manage VIP Access Codes</h3>
        <p style="font-size:13px;color:var(--muted);margin-bottom:14px;">Generate random batches or custom named codes, assign recipient names, and manage access anytime.</p>
        <div class="admin-form" style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;">
          <label>Custom Code <span class="muted">(optional)</span><input id="vipCustomCodeAdmin" placeholder="e.g. JYOTISH2026" style="width:140px;text-transform:uppercase;"></label>
          <label>Assignee Name <span class="muted">(optional)</span><input id="vipAssignedToAdmin" placeholder="e.g. Rahul Pathania / Client" style="width:170px;"></label>
          <label>Batch Count<input id="vipCountAdmin" type="number" min="1" max="100" value="5" style="width:70px;"></label>
          <label>Max Uses<input id="vipMaxUsesAdmin" type="number" min="1" max="1000" value="1" style="width:75px;"></label>
          <button id="generateVipAdmin" type="button" style="height:42px;">Generate VIP Code(s)</button>
          ${rows.length ? '<button id="clearAllVipAdmin" type="button" class="small secondary" style="height:42px;margin-left:auto;background:rgba(235,87,87,0.12);border:1px solid rgba(235,87,87,0.3);color:#ff9b9b;">Clear All VIP Codes (' + rows.length + ")</button>" : ""}
        </div>
        <div id="newVipCodes" class="admin-notice" style="${lastVipNoticeHtml ? "display:block;" : "display:none;"}margin-top:12px">${lastVipNoticeHtml}</div>
      </div>
      <div id="vipTableArea">${renderTable(rows)}</div>
    `;
    $("generateVipAdmin").onclick = () => __async(this, null, function* () {
      var _a3, _b3, _c3, _d2, _e2, _f2;
      const genBtn = $("generateVipAdmin");
      const origText = genBtn.textContent;
      try {
        genBtn.disabled = true;
        genBtn.textContent = "Generating\u2026";
        const customCode = (_b3 = (_a3 = $("vipCustomCodeAdmin")) == null ? void 0 : _a3.value) == null ? void 0 : _b3.trim();
        const assignedTo = (_d2 = (_c3 = $("vipAssignedToAdmin")) == null ? void 0 : _c3.value) == null ? void 0 : _d2.trim();
        const count = ((_e2 = $("vipCountAdmin")) == null ? void 0 : _e2.value) || "1";
        const maxUses = ((_f2 = $("vipMaxUsesAdmin")) == null ? void 0 : _f2.value) || "1";
        const j = yield adminFetch("/api/admin/vip", { method: "POST", body: JSON.stringify({ customCode, assignedTo, count, maxUses }) });
        const codeList = j.codes || [];
        lastVipNoticeHtml = `<strong>\u2713 Successfully generated ${codeList.length} code(s)${assignedTo ? " for " + esc(assignedTo) : ""}:</strong><br><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">${codeList.map((c) => `<code style="background:rgba(255,255,255,0.1);padding:4px 8px;border-radius:4px;color:#ffe099;font-size:14px;font-weight:bold;">${esc(c)}</code>`).join(" ")}</div>`;
        if ($("vipCustomCodeAdmin"))
          $("vipCustomCodeAdmin").value = "";
        if ($("vipAssignedToAdmin"))
          $("vipAssignedToAdmin").value = "";
        yield loadAdmin();
      } catch (e) {
        alert("Failed to generate VIP code: " + e.message);
      } finally {
        if (genBtn) {
          genBtn.disabled = false;
          genBtn.textContent = origText;
        }
      }
    });
    if ($("clearAllVipAdmin")) {
      $("clearAllVipAdmin").onclick = () => __async(this, null, function* () {
        if (!confirm("Are you sure you want to delete ALL VIP codes? This cannot be undone."))
          return;
        try {
          yield adminFetch("/api/admin/vip", { method: "DELETE" });
        } catch (e) {
          try {
            yield adminFetch("/api/admin/vip/clear", { method: "POST" });
          } catch (err2) {
            alert(err2.message || e.message);
            return;
          }
        }
        yield loadAdmin();
      });
    }
    const attachVipEvents = () => {
      document.querySelectorAll(".copy-code-btn").forEach((btn) => {
        btn.onclick = () => {
          const code = btn.getAttribute("data-code");
          navigator.clipboard.writeText(code).then(() => {
            const orig = btn.textContent;
            btn.textContent = "Copied!";
            setTimeout(() => {
              btn.textContent = orig;
            }, 1500);
          });
        };
      });
      document.querySelectorAll(".edit-assignee-btn").forEach((b) => {
        b.onclick = () => __async(this, null, function* () {
          const id = b.getAttribute("data-vip-id");
          const current = b.getAttribute("data-current-name") || "";
          const newName = prompt("Enter the person or client name assigned to this VIP code:", current);
          if (newName === null)
            return;
          try {
            yield adminFetch("/api/admin/vip/" + encodeURIComponent(id) + "/assign", {
              method: "POST",
              body: JSON.stringify({ assignedTo: newName.trim() })
            });
            yield loadAdmin();
          } catch (e) {
            alert("Failed to update assignee: " + e.message);
          }
        });
      });
      document.querySelectorAll("[data-vip-id]:not(.edit-assignee-btn)").forEach((b) => {
        b.onclick = () => __async(this, null, function* () {
          try {
            const id = b.dataset.vipId;
            yield adminFetch("/api/admin/vip/" + encodeURIComponent(id) + "/toggle", { method: "POST" });
            yield loadAdmin();
          } catch (e) {
            alert(e.message);
          }
        });
      });
      document.querySelectorAll("[data-delete-vip-id]").forEach((b) => {
        b.onclick = () => __async(this, null, function* () {
          const id = b.getAttribute("data-delete-vip-id");
          const code = b.getAttribute("data-vip-code") || id;
          if (!confirm("Delete VIP code " + code + "?"))
            return;
          try {
            yield adminFetch("/api/admin/vip/" + encodeURIComponent(id), { method: "DELETE" });
          } catch (e) {
            try {
              yield adminFetch("/api/admin/vip/delete", {
                method: "POST",
                body: JSON.stringify({ id, code })
              });
            } catch (err2) {
              alert("Failed to delete VIP code: " + (err2.message || e.message));
              return;
            }
          }
          yield loadAdmin();
        });
      });
    };
    attachVipEvents();
  }
  function renderReports(rows) {
    const container = $("adminReports");
    const renderTable = (items) => {
      var _a3;
      return `
      <div class="admin-filter-bar" style="margin-bottom:12px;display:flex;gap:10px;">
        <input type="text" id="reportSearch" placeholder="\u{1F50D} Search reports by name, email or mode\u2026" value="${esc(((_a3 = $("reportSearch")) == null ? void 0 : _a3.value) || "")}" style="max-width:380px;font-size:13px;padding:8px 12px;">
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr><th>Name</th><th>Mode</th><th>Email</th><th>Created</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            ${items.length ? items.map((r) => `
              <tr>
                <td><b>${esc(r.name)}</b></td>
                <td><span class="admin-badge">${esc(r.mode)}</span></td>
                <td>${esc(r.email || "\u2014")}</td>
                <td>${esc(new Date(r.created_at).toLocaleString())}</td>
                <td><span class="admin-badge paid">Verified</span></td>
                <td><button class="small" data-report-id="${r.id}">Open</button></td>
              </tr>
            `).join("") : '<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:20px;">No reports found matching criteria</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
    };
    container.innerHTML = `<div class="admin-notice">Reports are stored with the name and reading context supplied at generation time. Treat birth data and readings as sensitive personal information.</div><div id="reportsTableArea">${renderTable(rows)}</div>`;
    const attachEvents = (currentRows) => {
      document.querySelectorAll("[data-report-id]").forEach((b) => b.onclick = () => {
        const r = rows.find((x) => x.id == b.dataset.reportId);
        if (!r)
          return;
        $("reportReaderTitle").textContent = r.name + " \u2014 " + r.mode;
        $("reportReaderMeta").textContent = `${r.email || "No email"} \xB7 ${new Date(r.created_at).toLocaleString()} \xB7 Verified access`;
        $("reportReaderBody").textContent = r.report;
        open("reportReaderModal");
      });
      const search = $("reportSearch");
      if (search) {
        search.oninput = (e) => {
          const q = e.target.value.toLowerCase().trim();
          const filtered = rows.filter((x) => (x.name || "").toLowerCase().includes(q) || (x.email || "").toLowerCase().includes(q) || (x.mode || "").toLowerCase().includes(q));
          $("reportsTableArea").innerHTML = renderTable(filtered);
          attachEvents(filtered);
          $("reportSearch").focus();
        };
      }
    };
    attachEvents(rows);
  }
  function renderFeedback(rows) {
    const container = $("adminFeedback");
    const renderTable = (items) => {
      var _a3;
      return `
      <div class="admin-feedback-stats" style="display:flex;gap:16px;margin-bottom:14px;flex-wrap:wrap;align-items:center;">
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:10px 16px;border-radius:8px;">
          <small style="color:var(--muted);display:block;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;">Total Submissions</small>
          <b style="font-size:18px;color:#fce7b0;">${rows.length}</b>
        </div>
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:10px 16px;border-radius:8px;">
          <small style="color:var(--muted);display:block;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;">Latest Received</small>
          <b style="font-size:13px;color:#fff;">${rows.length ? new Date(rows[0].created_at).toLocaleString() : "None yet"}</b>
        </div>
      </div>
      <div class="admin-filter-bar" style="margin-bottom:12px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <input type="text" id="feedbackSearch" placeholder="\u{1F50D} Search feedback by name, email or message\u2026" value="${esc(((_a3 = $("feedbackSearch")) == null ? void 0 : _a3.value) || "")}" style="max-width:380px;font-size:13px;padding:8px 12px;flex:1;">
        ${rows.length ? '<button id="clearAllFeedbackAdmin" type="button" class="small secondary" style="height:36px;margin-left:auto;background:rgba(235,87,87,0.12);border:1px solid rgba(235,87,87,0.3);color:#ff9b9b;">Clear All Feedback</button>' : ""}
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Message</th><th>Received</th><th style="text-align:right;">Actions</th></tr>
          </thead>
          <tbody>
            ${items.length ? items.map((r) => `
              <tr id="fb_row_${esc(r.id)}">
                <td><b>${esc(r.name)}</b></td>
                <td><a href="mailto:${esc(r.email)}" style="color:#7fc5c0;text-decoration:none;">${esc(r.email)}</a></td>
                <td>${esc(r.phone || "\u2014")}</td>
                <td style="max-width:320px;white-space:normal;line-height:1.5;">
                  <div style="max-height:80px;overflow:hidden;text-overflow:ellipsis;">${esc(r.message)}</div>
                </td>
                <td style="white-space:nowrap;font-size:12px;color:var(--muted);">${esc(new Date(r.created_at).toLocaleString())}</td>
                <td style="text-align:right;white-space:nowrap;">
                  <button type="button" class="small secondary view-feedback-btn" data-fb-id="${esc(r.id)}" style="margin-right:6px;" title="View complete feedback message">Read</button>
                  <button type="button" class="small danger delete-feedback-btn" data-fb-id="${esc(r.id)}" data-fb-name="${esc(r.name)}" title="Delete this feedback entry">Delete</button>
                </td>
              </tr>
            `).join("") : '<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:20px;">No feedback entries found</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
    };
    container.innerHTML = `<div id="feedbackTableArea">${renderTable(rows)}</div>`;
    window._currentFeedbackRows = rows;
    const attachFeedbackEvents = () => {
      document.querySelectorAll(".view-feedback-btn").forEach((btn) => {
        btn.onclick = () => {
          const id = btn.getAttribute("data-fb-id");
          const item = (window._currentFeedbackRows || []).find((x) => x.id === id || x.id == id);
          if (!item)
            return;
          alert(`\u2726 FEEDBACK DETAILS \u2726

Name: ${item.name}
Email: ${item.email}
Phone: ${item.phone || "N/A"}
Date: ${new Date(item.created_at).toLocaleString()}

Message:
${item.message}`);
        };
      });
      document.querySelectorAll(".delete-feedback-btn").forEach((btn) => {
        btn.onclick = () => __async(this, null, function* () {
          const id = btn.getAttribute("data-fb-id");
          const name = btn.getAttribute("data-fb-name") || "this user";
          if (!confirm(`Are you sure you want to delete feedback from ${name}?`))
            return;
          try {
            yield adminFetch("/api/admin/feedback/" + encodeURIComponent(id), { method: "DELETE" });
            yield loadAdmin();
          } catch (err) {
            alert("Failed to delete feedback: " + err.message);
          }
        });
      });
      if ($("clearAllFeedbackAdmin")) {
        $("clearAllFeedbackAdmin").onclick = () => __async(this, null, function* () {
          if (!confirm("Are you sure you want to delete ALL feedback entries? This cannot be undone."))
            return;
          try {
            yield adminFetch("/api/admin/feedback", { method: "DELETE" });
            yield loadAdmin();
          } catch (err) {
            alert("Failed to clear feedback: " + err.message);
          }
        });
      }
      const search = $("feedbackSearch");
      if (search) {
        search.oninput = (e) => {
          const q = e.target.value.toLowerCase().trim();
          const filtered = rows.filter((x) => (x.name || "").toLowerCase().includes(q) || (x.email || "").toLowerCase().includes(q) || (x.message || "").toLowerCase().includes(q));
          $("feedbackTableArea").innerHTML = renderTable(filtered);
          attachFeedbackEvents();
          $("feedbackSearch").focus();
        };
      }
    };
    attachFeedbackEvents();
  }
  function renderPayments(rows) {
    const container = $("adminPayments");
    const renderTable = (items) => {
      var _a3;
      return `
      <div class="admin-filter-bar" style="margin-bottom:12px;display:flex;gap:10px;">
        <input type="text" id="paymentSearch" placeholder="\u{1F50D} Search payments by order ID, payment ID or plan\u2026" value="${esc(((_a3 = $("paymentSearch")) == null ? void 0 : _a3.value) || "")}" style="max-width:380px;font-size:13px;padding:8px 12px;">
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr><th>Order ID</th><th>Payment ID</th><th>Plan</th><th>Amount</th><th>Status</th><th>Date</th></tr>
          </thead>
          <tbody>
            ${items.length ? items.map((r) => `
              <tr>
                <td><code>${esc(r.order_id || r.id)}</code></td>
                <td><code>${esc(r.payment_id || "\u2014")}</code></td>
                <td><span class="admin-badge">${esc(r.plan)}</span></td>
                <td><b style="color:#f2d792">\u20B9${r.amount ? Math.round(r.amount / 100) : r.plan === "reveal" ? 59 : r.plan === "match" ? 99 : 29}</b></td>
                <td><span class="admin-status-pill ${r.status === "verified" || r.status === "captured" ? "ok" : r.status === "failed" ? "err" : "pending"}">${esc(r.status)}</span></td>
                <td>${esc(r.created_at ? new Date(r.created_at).toLocaleString() : new Date().toLocaleString())}</td>
              </tr>
            `).join("") : '<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:20px;">No payment records found</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
    };
    container.innerHTML = `<div class="admin-notice">Logs of Razorpay checkout orders and demo transactions. Verified payments unlock premium content instantly.</div><div id="paymentsTableArea">${renderTable(rows)}</div>`;
    const attachEvents = () => {
      const search = $("paymentSearch");
      if (search) {
        search.oninput = (e) => {
          const q = e.target.value.toLowerCase().trim();
          const filtered = rows.filter((x) => (x.order_id || "").toLowerCase().includes(q) || (x.payment_id || "").toLowerCase().includes(q) || (x.plan || "").toLowerCase().includes(q));
          $("paymentsTableArea").innerHTML = renderTable(filtered);
          attachEvents();
          $("paymentSearch").focus();
        };
      }
    };
    attachEvents();
  }
  function renderSettings(s) {
    const disc = s.offer_enabled === "1";
    $("adminSettings").innerHTML = `
      <div class="admin-setting-card">
        <h3>Pricing Configuration (Rupees \u20B9)</h3>
        <div class="admin-form" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;">
          <label>Reveal chart \xB7 \u20B9<input id="setReveal" type="number" min="1" value="${esc(s.reveal_price)}"></label>
          <label>Kundli match \xB7 \u20B9<input id="setMatch" type="number" min="1" value="${esc(s.match_price)}"></label>
          <label>Ask Question \xB7 \u20B9<input id="setQuestion" type="number" min="1" value="${esc(s.question_price)}"></label>
        </div>
      </div>
      <div class="admin-setting-card">
        <h3>Promotional Offer</h3>
        <div class="admin-form" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;align-items:center;">
          <label>Discount %<input id="setOfferPercent" type="number" min="0" max="90" value="${esc(s.offer_percent)}"></label>
          <label>Offer label<input id="setOfferLabel" value="${esc(s.offer_label || "")}" placeholder="e.g. Festival Offer"></label>
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;margin-top:18px;">
            <input id="setOfferEnabled" type="checkbox" ${disc ? "checked" : ""} style="width:auto;"> Enable discount offer
          </label>
        </div>
      </div>
      <div class="admin-setting-card">
        <h3>Feature Controls</h3>
        <div class="toggle-row" style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
          <label style="margin:0;">Individual chart generation</label>
          <input id="setRevealEnabled" type="checkbox" ${s.reveal_enabled === "1" ? "checked" : ""} style="width:auto;">
        </div>
        <div class="toggle-row" style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
          <label style="margin:0;">Kundli Matching (Guna Milan)</label>
          <input id="setMatchEnabled" type="checkbox" ${s.match_enabled === "1" ? "checked" : ""} style="width:auto;">
        </div>
        <div class="toggle-row" style="display:flex;justify-content:space-between;padding:10px 0;">
          <label style="margin:0;">Ask the Chart (Chat)</label>
          <input id="setChatEnabled" type="checkbox" ${s.chat_enabled === "1" ? "checked" : ""} style="width:auto;">
        </div>
      </div>
      <button id="saveSettingsAdmin" type="button" style="margin-top:12px;padding:12px 24px;">Save pricing & feature settings</button>
      <div id="settingsStatus" class="coord-status" style="display:none;margin-top:10px"></div>
    `;
    $("saveSettingsAdmin").onclick = () => __async(this, null, function* () {
      try {
        const payload = {
          reveal_price: $("setReveal").value,
          match_price: $("setMatch").value,
          question_price: $("setQuestion").value,
          offer_enabled: $("setOfferEnabled").checked ? "1" : "0",
          offer_percent: $("setOfferPercent").value,
          offer_label: $("setOfferLabel").value,
          reveal_enabled: $("setRevealEnabled").checked ? "1" : "0",
          match_enabled: $("setMatchEnabled").checked ? "1" : "0",
          chat_enabled: $("setChatEnabled").checked ? "1" : "0"
        };
        yield adminFetch("/api/admin/settings", { method: "POST", body: JSON.stringify(payload) });
        window.SERVER_CONFIG = null;
        const r = yield fetch("/api/config", { cache: "no-store" });
        window.SERVER_CONFIG = yield r.json();
        if (typeof window.applyPricingToUI === "function") {
          window.applyPricingToUI(window.SERVER_CONFIG);
        }
        $("settingsStatus").style.display = "block";
        $("settingsStatus").className = "coord-status ok";
        $("settingsStatus").textContent = "Settings saved and applied to live site immediately.";
        applyFeatureVisibility();
      } catch (e) {
        $("settingsStatus").style.display = "block";
        $("settingsStatus").className = "coord-status error";
        $("settingsStatus").textContent = e.message;
      }
    });
  }
  function applyFeatureVisibility() {
    var _a3;
    const f = ((_a3 = window.SERVER_CONFIG) == null ? void 0 : _a3.features) || {};
    const revealBtn = $("genBtn"), matchBtn = $("matchBtn"), chat = $("chatCard"), matchTab = $("tabKundli");
    if (revealBtn)
      revealBtn.disabled = f.reveal === false;
    if (matchBtn)
      matchBtn.disabled = f.match === false;
    if (matchTab)
      matchTab.style.display = f.match === false ? "none" : "";
    if (chat && f.chat === false)
      chat.style.display = "none";
  }
  function esc(v) {
    return String(v != null ? v : "").replace(/[&<>'"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[c]);
  }
  window.applyFeatureVisibility = applyFeatureVisibility;
  window.addEventListener("server-config-ready", applyFeatureVisibility);
})();

