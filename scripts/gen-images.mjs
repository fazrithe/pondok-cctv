// Generates dummy SVG illustrations for products & categories based on JSON data.
// Style: flat, modern, duotone-ish, consistent with a clean white e-commerce UI.
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const products = JSON.parse(readFileSync(path.join(root, "src/data/products.json"), "utf-8"));
const categories = JSON.parse(readFileSync(path.join(root, "src/data/categories.json"), "utf-8"));

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
  // percent: -1..1, negative = darker, positive = lighter
  const { r, g, b } = hexToRgb(hex);
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent);
  return rgbToHex({
    r: r + (t - r) * p,
    g: g + (t - g) * p,
    b: b + (t - b) * p,
  });
}

function wrapCard(color, inner, { size = 640 } = {}) {
  const light = shade(color, 0.92);
  const mid = shade(color, 0.8);
  const id = `g${Math.random().toString(36).slice(2, 8)}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${light}"/>
      <stop offset="100%" stop-color="${mid}"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="32" fill="url(#${id})"/>
  <circle cx="${size * 0.5}" cy="${size * 0.46}" r="${size * 0.34}" fill="${color}" opacity="0.08"/>
  ${inner}
</svg>`;
}

const CX = 320, CY = 320;

function domeIcon(color) {
  const dark = shade(color, -0.25);
  return `
  <g>
    <ellipse cx="${CX}" cy="${CY + 70}" rx="150" ry="20" fill="${color}" opacity="0.12"/>
    <rect x="${CX - 90}" y="${CY - 150}" width="180" height="24" rx="10" fill="${dark}"/>
    <path d="M ${CX - 130} ${CY - 60} a130 110 0 0 1 260 0 z" fill="${color}"/>
    <path d="M ${CX - 130} ${CY - 60} a130 110 0 0 1 260 0" fill="none" stroke="${dark}" stroke-width="6"/>
    <ellipse cx="${CX}" cy="${CY - 60}" rx="95" ry="95" fill="#0f172a"/>
    <ellipse cx="${CX}" cy="${CY - 60}" rx="60" ry="60" fill="#1e293b"/>
    <ellipse cx="${CX - 20}" cy="${CY - 82}" rx="20" ry="14" fill="#ffffff" opacity="0.35"/>
    <circle cx="${CX}" cy="${CY - 60}" r="14" fill="${color}"/>
  </g>`;
}

function bulletIcon(color) {
  const dark = shade(color, -0.25);
  return `
  <g>
    <ellipse cx="${CX}" cy="${CY + 90}" rx="150" ry="18" fill="${color}" opacity="0.12"/>
    <rect x="${CX - 20}" y="${CY - 40}" width="40" height="120" fill="${dark}"/>
    <rect x="${CX - 130}" y="${CY - 60}" width="220" height="90" rx="30" fill="${color}"/>
    <rect x="${CX - 130}" y="${CY - 60}" width="220" height="90" rx="30" fill="none" stroke="${dark}" stroke-width="6"/>
    <circle cx="${CX + 95}" cy="${CY - 15}" r="42" fill="#0f172a"/>
    <circle cx="${CX + 95}" cy="${CY - 15}" r="26" fill="#1e293b"/>
    <circle cx="${CX + 85}" cy="${CY - 27}" r="8" fill="#ffffff" opacity="0.4"/>
    <rect x="${CX - 150}" y="${CY - 40}" width="26" height="50" rx="8" fill="${dark}"/>
  </g>`;
}

function ptzIcon(color) {
  const dark = shade(color, -0.25);
  return `
  <g>
    <ellipse cx="${CX}" cy="${CY + 100}" rx="140" ry="18" fill="${color}" opacity="0.12"/>
    <rect x="${CX - 16}" y="${CY + 20}" width="32" height="70" fill="${dark}"/>
    <ellipse cx="${CX}" cy="${CY + 20}" rx="70" ry="24" fill="${dark}"/>
    <circle cx="${CX}" cy="${CY - 40}" r="105" fill="${color}"/>
    <circle cx="${CX}" cy="${CY - 40}" r="105" fill="none" stroke="${dark}" stroke-width="6"/>
    <circle cx="${CX}" cy="${CY - 40}" r="60" fill="#0f172a"/>
    <circle cx="${CX}" cy="${CY - 40}" r="38" fill="#1e293b"/>
    <circle cx="${CX - 14}" cy="${CY - 58}" r="10" fill="#ffffff" opacity="0.4"/>
    <path d="M ${CX - 105} ${CY - 40} a105 105 0 0 1 60 -95" fill="none" stroke="${dark}" stroke-width="8" stroke-linecap="round" opacity="0.5"/>
  </g>`;
}

function wifiIcon(color) {
  const dark = shade(color, -0.25);
  return `
  <g>
    <ellipse cx="${CX}" cy="${CY + 90}" rx="130" ry="16" fill="${color}" opacity="0.12"/>
    <circle cx="${CX}" cy="${CY - 20}" r="120" fill="${color}"/>
    <circle cx="${CX}" cy="${CY - 20}" r="120" fill="none" stroke="${dark}" stroke-width="6"/>
    <circle cx="${CX}" cy="${CY - 20}" r="70" fill="#0f172a"/>
    <circle cx="${CX}" cy="${CY - 20}" r="44" fill="#1e293b"/>
    <circle cx="${CX - 16}" cy="${CY - 40}" r="12" fill="#ffffff" opacity="0.4"/>
    <path d="M ${CX + 60} ${CY - 110} q 70 40 20 120" fill="none" stroke="${dark}" stroke-width="10" stroke-linecap="round" opacity="0.55"/>
    <circle cx="${CX + 95}" cy="${CY - 130}" r="10" fill="${dark}"/>
    <path d="M ${CX + 55} ${CY - 95} q 40 25 10 75" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" opacity="0.6"/>
    <path d="M ${CX + 45} ${CY - 75} q 20 12 4 40" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity="0.7"/>
  </g>`;
}

function boxIcon(color) {
  const dark = shade(color, -0.25);
  const rows = [0, 1, 2].map(
    (i) => `<rect x="${CX - 150}" y="${CY - 90 + i * 44}" width="300" height="26" rx="6" fill="${dark}" opacity="0.25"/>`
  ).join("");
  return `
  <g>
    <rect x="${CX - 170}" y="${CY - 120}" width="340" height="240" rx="18" fill="${color}"/>
    <rect x="${CX - 170}" y="${CY - 120}" width="340" height="240" rx="18" fill="none" stroke="${dark}" stroke-width="6"/>
    <rect x="${CX - 150}" y="${CY - 96}" width="300" height="18" rx="9" fill="#0f172a" opacity="0.85"/>
    ${rows}
    <circle cx="${CX + 130}" cy="${CY + 92}" r="10" fill="#22c55e"/>
    <circle cx="${CX + 95}" cy="${CY + 92}" r="10" fill="#facc15"/>
  </g>`;
}

function kitIcon(color) {
  return `
  <g>
    ${boxIcon(color, "kit")}
    <g transform="translate(-190,-40) scale(0.55)">
      ${bulletIcon(color)}
    </g>
  </g>`;
}

function hddIcon(color) {
  const dark = shade(color, -0.25);
  return `
  <g>
    <rect x="${CX - 140}" y="${CY - 100}" width="280" height="200" rx="20" fill="${color}"/>
    <rect x="${CX - 140}" y="${CY - 100}" width="280" height="200" rx="20" fill="none" stroke="${dark}" stroke-width="6"/>
    <circle cx="${CX}" cy="${CY}" r="70" fill="#0f172a"/>
    <circle cx="${CX}" cy="${CY}" r="45" fill="#1e293b"/>
    <circle cx="${CX}" cy="${CY}" r="10" fill="${color}"/>
    <rect x="${CX + 60}" y="${CY - 80}" width="50" height="14" rx="6" fill="${dark}" opacity="0.4"/>
    <rect x="${CX + 60}" y="${CY - 58}" width="50" height="14" rx="6" fill="${dark}" opacity="0.4"/>
  </g>`;
}

function cableIcon(color) {
  const dark = shade(color, -0.25);
  return `
  <g>
    <circle cx="${CX}" cy="${CY}" r="150" fill="${color}"/>
    <circle cx="${CX}" cy="${CY}" r="150" fill="none" stroke="${dark}" stroke-width="6"/>
    <circle cx="${CX}" cy="${CY}" r="110" fill="none" stroke="#ffffff" stroke-width="10" opacity="0.5"/>
    <circle cx="${CX}" cy="${CY}" r="75" fill="none" stroke="#ffffff" stroke-width="10" opacity="0.35"/>
    <circle cx="${CX}" cy="${CY}" r="40" fill="none" stroke="#ffffff" stroke-width="10" opacity="0.25"/>
    <circle cx="${CX}" cy="${CY}" r="16" fill="${dark}"/>
  </g>`;
}

function adaptorIcon(color) {
  const dark = shade(color, -0.25);
  return `
  <g>
    <rect x="${CX - 90}" y="${CY - 130}" width="180" height="220" rx="24" fill="${color}"/>
    <rect x="${CX - 90}" y="${CY - 130}" width="180" height="220" rx="24" fill="none" stroke="${dark}" stroke-width="6"/>
    <rect x="${CX - 55}" y="${CY - 90}" width="110" height="70" rx="10" fill="#0f172a" opacity="0.85"/>
    <rect x="${CX - 30}" y="${CY + 20}" width="60" height="90" rx="10" fill="${dark}"/>
    <circle cx="${CX}" cy="${CY + 130}" r="14" fill="${dark}"/>
  </g>`;
}

function switchIcon(color) {
  const dark = shade(color, -0.25);
  const ports = Array.from({ length: 8 }, (_, i) =>
    `<rect x="${CX - 155 + i * 40}" y="${CY - 30}" width="26" height="30" rx="4" fill="#0f172a" opacity="0.85"/>`
  ).join("");
  return `
  <g>
    <rect x="${CX - 180}" y="${CY - 70}" width="360" height="140" rx="16" fill="${color}"/>
    <rect x="${CX - 180}" y="${CY - 70}" width="360" height="140" rx="16" fill="none" stroke="${dark}" stroke-width="6"/>
    ${ports}
    <circle cx="${CX + 150}" cy="${CY + 45}" r="8" fill="#22c55e"/>
  </g>`;
}

const ICONS = {
  dome: domeIcon,
  bullet: bulletIcon,
  ptz: ptzIcon,
  wifi: wifiIcon,
  dvr: (c) => boxIcon(c, "DVR"),
  nvr: (c) => boxIcon(c, "NVR"),
  kit: kitIcon,
  hdd: hddIcon,
  cable: cableIcon,
  adaptor: adaptorIcon,
  switch: switchIcon,
};

const outProductsDir = path.join(root, "public/images/products");
const outCategoriesDir = path.join(root, "public/images/categories");
mkdirSync(outProductsDir, { recursive: true });
mkdirSync(outCategoriesDir, { recursive: true });

let count = 0;
for (const p of products) {
  const iconFn = ICONS[p.type] || boxIcon;
  const svg = wrapCard(p.color, iconFn(p.color));
  for (const imgPath of p.images) {
    const filename = path.basename(imgPath);
    writeFileSync(path.join(outProductsDir, filename), svg);
    count++;
  }
}

const catTypeMap = {
  "kamera-dome": "dome",
  "kamera-bullet": "bullet",
  "kamera-ptz": "ptz",
  "kamera-wifi": "wifi",
  "dvr-nvr": "nvr",
  "paket-cctv": "kit",
  aksesoris: "cable",
};

for (const c of categories) {
  const type = catTypeMap[c.slug] || "dome";
  const iconFn = ICONS[type];
  const svg = wrapCard(c.color, iconFn(c.color), { size: 400 });
  writeFileSync(path.join(outCategoriesDir, path.basename(c.image)), svg);
  count++;
}

console.log(`Generated ${count} SVG images.`);
