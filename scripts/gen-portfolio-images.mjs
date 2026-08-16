// Generates dummy SVG "photos" for the portfolio (kegiatan / project) gallery.
// Every project gets 3 scenes: building exterior, installation, monitoring room.
// Style: flat, modern, duotone-ish — same language as gen-images.mjs.
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const portfolio = JSON.parse(readFileSync(path.join(root, "src/data/portfolio.json"), "utf-8"));

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}
function rgbToHex({ r, g, b }) {
  const c = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}
function shade(hex, percent) {
  const { r, g, b } = hexToRgb(hex);
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent);
  return rgbToHex({ r: r + (t - r) * p, g: g + (t - g) * p, b: b + (t - b) * p });
}

const W = 960;
const H = 720;
const GROUND = 560;

let seq = 0;
const rid = () => `p${(seq++).toString(36)}`;

function doc(defs, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>${defs}</defs>
  ${body}
</svg>`;
}

// ---------------------------------------------------------------- shared bits

function cone(x, y, angle, len, spread, opacity = 0.16) {
  return `<g transform="translate(${x},${y}) rotate(${angle})">
    <path d="M0 0 L${len} ${-spread} L${len} ${spread} Z" fill="#ffffff" opacity="${opacity}"/>
  </g>`;
}

// Camera head drawn from its wall/pole attach point, extending to the right.
function camHead(color, s = 1) {
  const dark = shade(color, -0.35);
  return `<g transform="scale(${s})">
    <rect x="-30" y="-11" width="26" height="22" rx="7" fill="#64748b"/>
    <rect x="-11" y="-6" width="18" height="42" rx="8" fill="#94a3b8"/>
    <g transform="translate(0,36)">
      <rect x="-24" y="-21" width="106" height="42" rx="19" fill="#f1f5f9" stroke="${dark}" stroke-width="5"/>
      <rect x="-24" y="-21" width="34" height="42" rx="17" fill="${color}"/>
      <circle cx="70" cy="0" r="20" fill="#0f172a"/>
      <circle cx="70" cy="0" r="11" fill="#1e293b"/>
      <circle cx="63" cy="-7" r="4" fill="#ffffff" opacity="0.65"/>
      <circle cx="24" cy="-10" r="5" fill="#ef4444"/>
    </g>
  </g>`;
}

function poleCam(x, color) {
  const top = 240;
  return `<g>
    <ellipse cx="${x}" cy="${GROUND + 6}" rx="42" ry="11" fill="#0f172a" opacity="0.12"/>
    <rect x="${x - 10}" y="${top}" width="20" height="${GROUND - top}" rx="7" fill="#94a3b8"/>
    <rect x="${x - 22}" y="${GROUND - 26}" width="44" height="26" rx="6" fill="#cbd5e1"/>
    ${cone(x - 26, top + 40, 168, 460, 140)}
    <g transform="translate(${x - 6},${top}) scale(-1,1)">${camHead(color)}</g>
  </g>`;
}

function sun() {
  return `<g>
    <circle cx="806" cy="126" r="62" fill="#ffffff" opacity="0.35"/>
    <circle cx="806" cy="126" r="42" fill="#ffffff" opacity="0.9"/>
  </g>`;
}

function cloud(x, y, s) {
  return `<g transform="translate(${x},${y}) scale(${s})" fill="#ffffff" opacity="0.7">
    <circle cx="0" cy="0" r="26"/>
    <circle cx="34" cy="-12" r="34"/>
    <circle cx="74" cy="2" r="24"/>
    <rect x="-2" y="-2" width="78" height="28" rx="14"/>
  </g>`;
}

function treeline(color) {
  const dark = shade(color, -0.15);
  const trees = [60, 140, 880, 930]
    .map(
      (x, i) => `<g>
      <rect x="${x - 8}" y="${GROUND - 70}" width="16" height="70" fill="#94a3b8"/>
      <circle cx="${x}" cy="${GROUND - 110}" r="${52 - i * 4}" fill="${dark}" opacity="0.35"/>
    </g>`
    )
    .join("");
  return trees;
}

function ladder(x1, y1, x2, y2, rungs = 9) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const nx = (-dy / len) * 24;
  const ny = (dx / len) * 24;
  let out = "";
  for (let i = 1; i < rungs; i++) {
    const t = i / rungs;
    const px = x1 + dx * t;
    const py = y1 + dy * t;
    out += `<line x1="${px + nx}" y1="${py + ny}" x2="${px - nx}" y2="${py - ny}" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round"/>`;
  }
  return `<g>
    <line x1="${x1 + nx}" y1="${y1 + ny}" x2="${x2 + nx}" y2="${y2 + ny}" stroke="#94a3b8" stroke-width="11" stroke-linecap="round"/>
    <line x1="${x1 - nx}" y1="${y1 - ny}" x2="${x2 - nx}" y2="${y2 - ny}" stroke="#94a3b8" stroke-width="11" stroke-linecap="round"/>
    ${out}
  </g>`;
}

// Technician silhouette, (x,y) = feet, arm angle in degrees.
function worker(x, y, s, color, armAngle = -40) {
  const dark = shade(color, -0.3);
  return `<g transform="translate(${x},${y}) scale(${s})">
    <ellipse cx="0" cy="4" rx="34" ry="9" fill="#0f172a" opacity="0.12"/>
    <path d="M-24 0 L-10 -74 L10 -74 L24 0 Z" fill="#334155"/>
    <rect x="-30" y="-146" width="60" height="80" rx="20" fill="${color}"/>
    <rect x="-30" y="-104" width="60" height="13" fill="#facc15"/>
    <rect x="-30" y="-146" width="60" height="80" rx="20" fill="none" stroke="${dark}" stroke-width="4"/>
    <g transform="translate(22,-136) rotate(${armAngle})">
      <rect x="0" y="-9" width="66" height="18" rx="9" fill="${color}"/>
      <circle cx="70" cy="0" r="12" fill="#f5c9a4"/>
    </g>
    <path d="M-22 -136 L-40 -80" stroke="${color}" stroke-width="18" stroke-linecap="round"/>
    <circle cx="0" cy="-168" r="24" fill="#f5c9a4"/>
    <path d="M-27 -176 a27 27 0 0 1 54 0 z" fill="#f59e0b"/>
    <rect x="-29" y="-180" width="58" height="9" rx="4.5" fill="#f59e0b"/>
  </g>`;
}

// ------------------------------------------------------------------ buildings

function bHouse(color) {
  const dark = shade(color, -0.25);
  const glass = shade(color, 0.6);
  return `<g>
    <rect x="200" y="330" width="440" height="230" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4"/>
    <path d="M162 336 L420 172 L678 336 Z" fill="${color}"/>
    <path d="M162 336 L420 172 L678 336 Z" fill="none" stroke="${dark}" stroke-width="7" stroke-linejoin="round"/>
    <rect x="200" y="330" width="440" height="16" fill="${dark}" opacity="0.18"/>
    <rect x="376" y="428" width="94" height="132" rx="8" fill="${dark}"/>
    <circle cx="456" cy="498" r="6" fill="#fde68a"/>
    <rect x="240" y="398" width="104" height="82" rx="8" fill="${glass}" stroke="${dark}" stroke-width="5"/>
    <line x1="292" y1="398" x2="292" y2="480" stroke="${dark}" stroke-width="5"/>
    <rect x="506" y="398" width="104" height="82" rx="8" fill="${glass}" stroke="${dark}" stroke-width="5"/>
    <line x1="558" y1="398" x2="558" y2="480" stroke="${dark}" stroke-width="5"/>
    <rect x="150" y="500" width="540" height="10" rx="5" fill="#cbd5e1"/>
    <g transform="translate(618,336)">${camHead(color, 0.72)}</g>
    ${cone(636, 372, 32, 300, 96, 0.2)}
  </g>`;
}

function bShop(color) {
  const dark = shade(color, -0.25);
  const glass = shade(color, 0.62);
  const awning = Array.from(
    { length: 8 },
    (_, i) => `<rect x="${196 + i * 56}" y="396" width="28" height="40" fill="${i % 2 ? "#ffffff" : color}"/>`
  ).join("");
  const upper = Array.from(
    { length: 3 },
    (_, i) =>
      `<rect x="${234 + i * 132}" y="296" width="104" height="76" rx="8" fill="${glass}" stroke="${dark}" stroke-width="5"/>`
  ).join("");
  return `<g>
    <rect x="190" y="196" width="452" height="364" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4"/>
    <rect x="176" y="186" width="480" height="80" rx="10" fill="${color}"/>
    <rect x="222" y="212" width="388" height="28" rx="14" fill="#ffffff" opacity="0.7"/>
    ${upper}
    <rect x="190" y="392" width="452" height="12" fill="${dark}"/>
    ${awning}
    <rect x="216" y="452" width="400" height="108" fill="${glass}" stroke="${dark}" stroke-width="5"/>
    <line x1="416" y1="452" x2="416" y2="560" stroke="${dark}" stroke-width="5"/>
    <rect x="352" y="470" width="128" height="90" rx="4" fill="#ffffff" opacity="0.55"/>
    <g transform="translate(626,286)">${camHead(color, 0.72)}</g>
    ${cone(644, 322, 34, 300, 96, 0.2)}
  </g>`;
}

function bOffice(color) {
  const dark = shade(color, -0.3);
  const windows = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const lit = (r * 5 + c) % 3 === 0;
      windows.push(
        `<rect x="${252 + c * 76}" y="${198 + r * 56}" width="56" height="38" rx="5" fill="${
          lit ? shade(color, 0.55) : "#334155"
        }" opacity="${lit ? 1 : 0.75}"/>`
      );
    }
  }
  return `<g>
    <rect x="228" y="150" width="408" height="410" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="4"/>
    <rect x="214" y="140" width="436" height="34" rx="8" fill="${color}"/>
    ${windows.join("")}
    <rect x="360" y="484" width="144" height="76" rx="6" fill="${dark}"/>
    <rect x="376" y="500" width="112" height="60" fill="${shade(color, 0.6)}" opacity="0.8"/>
    <rect x="320" y="552" width="224" height="10" rx="5" fill="#cbd5e1"/>
    <g transform="translate(622,220)">${camHead(color, 0.72)}</g>
    ${cone(640, 256, 34, 320, 100, 0.2)}
  </g>`;
}

function bSchool(color) {
  const dark = shade(color, -0.25);
  const glass = shade(color, 0.6);
  const rows = [];
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 5; c++) {
      rows.push(
        `<rect x="${186 + c * 108}" y="${344 + r * 104}" width="76" height="66" rx="6" fill="${glass}" stroke="${dark}" stroke-width="5"/>`
      );
    }
  }
  return `<g>
    <rect x="150" y="300" width="560" height="260" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4"/>
    <path d="M126 302 L430 218 L734 302 Z" fill="${color}"/>
    <rect x="150" y="300" width="560" height="16" fill="${dark}" opacity="0.18"/>
    ${rows.join("")}
    <rect x="386" y="452" width="88" height="108" rx="6" fill="${dark}"/>
    <rect x="352" y="548" width="156" height="12" rx="6" fill="#cbd5e1"/>
    <g transform="translate(756,214)">
      <rect x="-6" y="0" width="12" height="${GROUND - 214}" fill="#94a3b8"/>
      <path d="M6 6 L104 32 L6 58 Z" fill="${color}"/>
      <circle cx="0" cy="-6" r="10" fill="#facc15"/>
    </g>
    <g transform="translate(690,306)">${camHead(color, 0.72)}</g>
    ${cone(708, 342, 34, 300, 96, 0.2)}
  </g>`;
}

function bMosque(color) {
  const dark = shade(color, -0.25);
  const glass = shade(color, 0.6);
  const arches = [268, 560].map(
    (x) => `<path d="M${x} 552 v-72 a34 34 0 0 1 68 0 v72 z" fill="${glass}" stroke="${dark}" stroke-width="5"/>`
  );
  return `<g>
    <rect x="232" y="336" width="400" height="224" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4"/>
    <path d="M264 338 a168 152 0 0 1 336 0 z" fill="${color}"/>
    <path d="M264 338 a168 152 0 0 1 336 0" fill="none" stroke="${dark}" stroke-width="7"/>
    <rect x="232" y="330" width="400" height="18" rx="6" fill="${dark}" opacity="0.2"/>
    <rect x="426" y="150" width="12" height="46" fill="${dark}"/>
    <path d="M432 118 a22 22 0 1 0 12 40 a17 17 0 1 1 -12 -40 z" fill="${shade(color, 0.35)}"/>
    ${arches.join("")}
    <path d="M396 560 v-104 a36 36 0 0 1 72 0 v104 z" fill="${dark}"/>
    <g transform="translate(672,206)">
      <rect x="0" y="0" width="62" height="${GROUND - 206}" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4"/>
      <path d="M0 2 a31 34 0 0 1 62 0 z" fill="${color}"/>
      <rect x="16" y="86" width="30" height="52" rx="15" fill="${glass}" stroke="${dark}" stroke-width="4"/>
      <rect x="-8" y="70" width="78" height="12" rx="6" fill="${dark}" opacity="0.35"/>
    </g>
    <g transform="translate(240,344) scale(-1,1)">${camHead(color, 0.72)}</g>
    ${cone(222, 380, 146, 290, 94, 0.2)}
  </g>`;
}

function bWarehouse(color) {
  const dark = shade(color, -0.3);
  const teeth = Array.from(
    { length: 5 },
    (_, i) =>
      `<path d="M${142 + i * 132} 302 L${142 + i * 132} 244 L${142 + i * 132 + 132} 302 Z" fill="${shade(
        color,
        0.45
      )}" stroke="${dark}" stroke-width="4" stroke-linejoin="round"/>`
  ).join("");
  const shutter = Array.from(
    { length: 7 },
    (_, i) => `<rect x="342" y="${400 + i * 22}" width="248" height="14" rx="4" fill="${shade(color, 0.4)}"/>`
  ).join("");
  const sideWindows = Array.from(
    { length: 3 },
    (_, i) => `<rect x="${170 + i * 56}" y="330" width="44" height="40" rx="5" fill="${shade(color, 0.6)}" stroke="${dark}" stroke-width="4"/>`
  ).join("");
  return `<g>
    ${teeth}
    <rect x="142" y="300" width="660" height="260" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="4"/>
    <rect x="142" y="300" width="660" height="20" fill="${color}"/>
    ${sideWindows}
    <rect x="330" y="390" width="260" height="170" fill="${dark}"/>
    ${shutter}
    <rect x="620" y="440" width="150" height="120" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4"/>
    <rect x="644" y="470" width="102" height="46" rx="5" fill="${shade(color, 0.6)}"/>
    <g transform="translate(700,306)">${camHead(color, 0.72)}</g>
    ${cone(786, 342, 22, 260, 90, 0.2)}
  </g>`;
}

const BUILDINGS = {
  rumah: bHouse,
  ruko: bShop,
  kantor: bOffice,
  sekolah: bSchool,
  masjid: bMosque,
  gudang: bWarehouse,
};

// -------------------------------------------------------------------- scene 1

function sceneExterior(color, scene) {
  const g = rid();
  const defs = `
    <linearGradient id="sky${g}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${shade(color, 0.58)}"/>
      <stop offset="62%" stop-color="${shade(color, 0.9)}"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
    <linearGradient id="gnd${g}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#cbd5e1"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>`;
  const build = (BUILDINGS[scene] || bHouse)(color);
  const body = `
    <rect width="${W}" height="${H}" fill="url(#sky${g})"/>
    ${sun()}
    ${cloud(96, 132, 1)}
    ${cloud(560, 96, 0.75)}
    ${treeline(color)}
    <rect x="0" y="${GROUND}" width="${W}" height="${H - GROUND}" fill="url(#gnd${g})"/>
    <rect x="0" y="${GROUND}" width="${W}" height="9" fill="${shade(color, -0.1)}" opacity="0.18"/>
    ${build}
    <rect x="0" y="648" width="${W}" height="10" rx="5" fill="#ffffff" opacity="0.6"/>
    ${poleCam(866, color)}
    ${worker(190, 690, 0.7, color, -28)}`;
  return doc(defs, body);
}

// -------------------------------------------------------------------- scene 2

function sceneInstall(color) {
  const g = rid();
  const dark = shade(color, -0.3);
  const bricks = [];
  for (let r = 0; r < 9; r++) {
    bricks.push(
      `<line x1="360" y1="${64 + r * 74}" x2="${W}" y2="${64 + r * 74}" stroke="#cbd5e1" stroke-width="3" opacity="0.7"/>`
    );
  }
  const defs = `
    <linearGradient id="sky${g}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${shade(color, 0.62)}"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
    <linearGradient id="wall${g}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>`;
  const body = `
    <rect width="${W}" height="${H}" fill="url(#sky${g})"/>
    ${cloud(90, 120, 0.8)}
    ${cloud(210, 250, 0.55)}
    <rect x="0" y="640" width="${W}" height="80" fill="#cbd5e1"/>
    <rect x="360" y="0" width="${W - 360}" height="640" fill="url(#wall${g})"/>
    ${bricks.join("")}
    <rect x="352" y="0" width="16" height="640" fill="${dark}" opacity="0.18"/>
    <rect x="360" y="620" width="${W - 360}" height="20" fill="${color}" opacity="0.25"/>
    <path d="M600 212 q26 160 -6 300" stroke="#94a3b8" stroke-width="8" fill="none" stroke-linecap="round"/>
    <rect x="595" y="359" width="34" height="16" rx="6" fill="#cbd5e1"/>
    <rect x="588" y="447" width="34" height="16" rx="6" fill="#cbd5e1"/>
    ${cone(714, 237, 22, 300, 110, 0.18)}
    <g transform="translate(620,196)">${camHead(color, 1.15)}</g>
    ${ladder(470, 660, 596, 210)}
    ${worker(528, 452, 1.05, color, -52)}
    <g transform="translate(196,590)">
      <rect x="0" y="0" width="150" height="70" rx="10" fill="${color}"/>
      <rect x="0" y="0" width="150" height="18" rx="9" fill="${dark}"/>
      <rect x="56" y="-16" width="38" height="22" rx="10" fill="none" stroke="${dark}" stroke-width="7"/>
      <circle cx="34" cy="42" r="8" fill="#ffffff" opacity="0.6"/>
    </g>
    <g transform="translate(96,614)">
      <circle cx="0" cy="24" r="42" fill="none" stroke="#94a3b8" stroke-width="14"/>
      <circle cx="0" cy="24" r="20" fill="none" stroke="#cbd5e1" stroke-width="12"/>
    </g>
    <rect x="0" y="640" width="${W}" height="9" fill="#94a3b8" opacity="0.45"/>`;
  return doc(defs, body);
}

// -------------------------------------------------------------------- scene 3

function feedTile(x, y, w, h, color, i) {
  const tint = shade(color, i % 2 ? 0.25 : 0.05);
  return `<g transform="translate(${x},${y})">
    <rect width="${w}" height="${h}" rx="6" fill="${tint}"/>
    <rect y="${h * 0.66}" width="${w}" height="${h * 0.34}" fill="#0f172a" opacity="0.25"/>
    <circle cx="${w * 0.32}" cy="${h * 0.52}" r="${h * 0.12}" fill="#ffffff" opacity="0.55"/>
    <rect x="${w * 0.26}" y="${h * 0.62}" width="${w * 0.12}" height="${h * 0.24}" rx="4" fill="#ffffff" opacity="0.55"/>
    <rect x="${w * 0.58}" y="${h * 0.34}" width="${w * 0.3}" height="${h * 0.3}" rx="4" fill="#ffffff" opacity="0.25"/>
    <circle cx="${w - 14}" cy="12" r="5" fill="#ef4444"/>
    <rect x="8" y="${h - 16}" width="${w * 0.42}" height="7" rx="3.5" fill="#ffffff" opacity="0.6"/>
  </g>`;
}

function sceneMonitor(color) {
  const g = rid();
  const dark = shade(color, -0.3);
  const tiles = [0, 1, 2, 3]
    .map((i) => feedTile(278 + (i % 2) * 212, 254 + Math.floor(i / 2) * 84, 200, 76, color, i))
    .join("");
  const leds = Array.from(
    { length: 6 },
    (_, i) => `<circle cx="${632 + i * 18}" cy="512" r="5" fill="${i < 2 ? "#22c55e" : "#facc15"}" opacity="0.9"/>`
  ).join("");
  const defs = `
    <linearGradient id="room${g}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${shade(color, 0.9)}"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
    <linearGradient id="scr${g}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>`;
  const body = `
    <rect width="${W}" height="${H}" fill="url(#room${g})"/>
    <rect x="0" y="${GROUND}" width="${W}" height="${H - GROUND}" fill="#cbd5e1"/>
    <rect x="0" y="${GROUND}" width="${W}" height="8" fill="${dark}" opacity="0.2"/>
    <g transform="translate(84,150)">
      <rect width="140" height="180" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="4"/>
      <rect x="20" y="24" width="100" height="12" rx="6" fill="${color}" opacity="0.7"/>
      <rect x="20" y="52" width="72" height="10" rx="5" fill="#cbd5e1"/>
      <rect x="20" y="82" width="100" height="70" rx="6" fill="${shade(color, 0.75)}"/>
    </g>
    <circle cx="828" cy="196" r="52" fill="#ffffff" stroke="#cbd5e1" stroke-width="5"/>
    <path d="M828 196 v-30 M828 196 l22 14" stroke="${dark}" stroke-width="6" stroke-linecap="round"/>
    <rect x="150" y="470" width="660" height="20" rx="8" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="4"/>
    <rect x="180" y="490" width="18" height="90" fill="#cbd5e1"/>
    <rect x="762" y="490" width="18" height="90" fill="#cbd5e1"/>
    <rect x="452" y="430" width="56" height="42" fill="#94a3b8"/>
    <rect x="410" y="466" width="140" height="14" rx="7" fill="#64748b"/>
    <rect x="246" y="228" width="468" height="208" rx="14" fill="#334155"/>
    <rect x="262" y="244" width="436" height="176" rx="8" fill="url(#scr${g})"/>
    ${tiles}
    <rect x="606" y="500" width="200" height="34" rx="8" fill="#1e293b"/>
    <rect x="606" y="500" width="200" height="10" rx="5" fill="${color}" opacity="0.8"/>
    ${leds}
    <rect x="196" y="500" width="180" height="30" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="3"/>
    <rect x="392" y="506" width="42" height="24" rx="12" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="3"/>
    <path d="M660 534 q-20 60 -120 66" stroke="#94a3b8" stroke-width="7" fill="none" stroke-linecap="round"/>
    <g transform="translate(470,752)">
      <ellipse cx="0" cy="-4" rx="150" ry="26" fill="#0f172a" opacity="0.1"/>
      <path d="M-124 0 a124 132 0 0 1 248 0 z" fill="${color}"/>
      <path d="M-124 0 a124 132 0 0 1 248 0 z" fill="none" stroke="${dark}" stroke-width="5"/>
      <circle cx="0" cy="-140" r="52" fill="#334155"/>
    </g>`;
  return doc(defs, body);
}

// ------------------------------------------------------------------ generate

const outDir = path.join(root, "public/images/portfolio");
mkdirSync(outDir, { recursive: true });

let count = 0;
for (const item of portfolio) {
  const scenes = [
    () => sceneExterior(item.color, item.scene),
    () => sceneInstall(item.color),
    () => sceneMonitor(item.color),
  ];
  item.images.forEach((imgPath, i) => {
    const svg = scenes[i % scenes.length]();
    writeFileSync(path.join(outDir, path.basename(imgPath)), svg);
    count++;
  });
}

console.log(`Generated ${count} portfolio SVG images.`);
