// Calibration script: derive lat/lng -> SVG viewBox projection for id.svg
// and verify city marker placement via point-in-polygon.
import { readFileSync } from 'node:fs';

const svg = readFileSync(new URL('../public/resources/id.svg', import.meta.url), 'utf8');

// --- Extract paths: d, id, name ---
const paths = [];
const re = /<path\s+d="([^"]*)"\s+id="([^"]*)"\s+name="([^"]*)"/g;
let m;
while ((m = re.exec(svg)) !== null) {
  paths.push({ d: m[1], id: m[2], name: m[3] });
}

// --- Parse a path 'd' into subpaths (arrays of [x,y]) ---
function parsePath(d) {
  const tokens = d.match(/([MmLlZz])|(-?\d*\.?\d+(?:e-?\d+)?)/g) || [];
  const subpaths = [];
  let cur = null;
  let cx = 0, cy = 0;
  let cmd = null;
  let i = 0;
  const num = () => parseFloat(tokens[i++]);
  while (i < tokens.length) {
    const t = tokens[i];
    if (/[MmLlZz]/.test(t)) { cmd = t; i++; if (cmd === 'z' || cmd === 'Z') { if (cur) { subpaths.push(cur); cur = null; } } continue; }
    if (cmd === 'M') { cx = num(); cy = num(); if (cur) subpaths.push(cur); cur = [[cx, cy]]; cmd = 'L'; }
    else if (cmd === 'm') { cx += num(); cy += num(); if (cur) subpaths.push(cur); cur = [[cx, cy]]; cmd = 'l'; }
    else if (cmd === 'L') { cx = num(); cy = num(); cur.push([cx, cy]); }
    else if (cmd === 'l') { cx += num(); cy += num(); cur.push([cx, cy]); }
    else { i++; }
  }
  if (cur) subpaths.push(cur);
  return subpaths;
}

// --- bbox + bbox center per province ---
const prov = {};
for (const p of paths) {
  const sub = parsePath(p.d);
  let minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
  for (const s of sub) for (const [x, y] of s) {
    if (x < minx) minx = x; if (x > maxx) maxx = x;
    if (y < miny) miny = y; if (y > maxy) maxy = y;
  }
  prov[p.id] = { sub, minx, miny, maxx, maxy, cx: (minx + maxx) / 2, cy: (miny + maxy) / 2, name: p.name };
}

// --- Known geographic bbox centers (lng, lat) for calibration ---
const calib = [
  ['IDAC', 96.65, 3.95], ['IDSU', 98.7, 2.4], ['IDSB', 100.25, -1.25],
  ['IDLA', 104.75, -4.85], ['IDJK', 106.83, -6.22], ['IDJB', 107.6, -6.85],
  ['IDJT', 110.15, -7.1], ['IDYO', 110.4, -7.87], ['IDJI', 112.75, -7.78],
  ['IDBA', 115.07, -8.45], ['IDNB', 117.6, -8.6], ['IDKB', 111.4, -0.75],
  ['IDKS', 115.35, -3.0], ['IDKI', 116.3, 0.5], ['IDGO', 122.2, 0.62],
  ['IDSN', 120.0, -4.0], ['IDPA', 139.0, -5.75], ['IDPB', 132.7, -1.65],
];

// --- Linear regression x = A*lng + B  and  y = C*lat + D ---
function linfit(pts) { // pts: [val, pix]
  const n = pts.length;
  let sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (const [v, pix] of pts) { sx += v; sy += pix; sxx += v * v; sxy += v * pix; }
  const A = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const B = (sy - A * sx) / n;
  return [A, B];
}
const [A, B] = linfit(calib.map(([id, lng]) => [lng, prov[id].cx]));
const [C, D] = linfit(calib.map(([id, , lat]) => [lat, prov[id].cy]));

console.log('Projection:  x =', A.toFixed(4), '* lng +', B.toFixed(4));
console.log('             y =', C.toFixed(4), '* lat +', D.toFixed(4));

const project = (lng, lat) => [A * lng + B, C * lat + D];

console.log('\nCalibration residuals (px):');
for (const [id, lng, lat] of calib) {
  const [px, py] = project(lng, lat);
  console.log(`  ${id} ${prov[id].name.padEnd(20)} dx=${(px - prov[id].cx).toFixed(1)} dy=${(py - prov[id].cy).toFixed(1)}`);
}

// --- point in polygon (ray cast), true if inside any subpath ---
function inProvince(id, x, y) {
  for (const s of prov[id].sub) {
    let inside = false;
    for (let a = 0, b = s.length - 1; a < s.length; b = a++) {
      const [xi, yi] = s[a], [xj, yj] = s[b];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    if (inside) return true;
  }
  return false;
}

// --- Cities ---
const cities = [
  ['Surabaya', -7.2575, 112.7521, 'IDJI'],
  ['Madiun', -7.6298, 111.5239, 'IDJI'],
  ['Yogyakarta', -7.7956, 110.3695, 'IDYO'],
  ['Bali', -8.6705, 115.2126, 'IDBA'],
  ['Lombok', -8.5833, 116.1167, 'IDNB'],
  ['Banjarmasin', -3.3194, 114.5908, 'IDKS'],
];

console.log('\nCity projection + containment check:');
for (const [name, lat, lng, expect] of cities) {
  const [x, y] = project(lng, lat);
  const hit = inProvince(expect, x, y);
  // also find which province actually contains the point
  let found = '-';
  for (const id of Object.keys(prov)) { if (inProvince(id, x, y)) { found = id; break; } }
  console.log(`  ${name.padEnd(12)} x=${x.toFixed(1)} y=${y.toFixed(1)}  in ${expect}? ${hit ? 'YES' : 'no '}  containedBy=${found} (${found !== '-' ? prov[found].name : ''})`);
}
