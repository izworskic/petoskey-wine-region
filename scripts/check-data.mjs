import fs from "node:fs";

const venues = JSON.parse(fs.readFileSync("data/venues.json", "utf8"));
const pois = JSON.parse(fs.readFileSync("data/pois.json", "utf8"));
const origins = JSON.parse(fs.readFileSync("data/origins.json", "utf8"));
const fails = [];
const AREAS = new Set(["petoskey", "harbor-alanson", "boyne-walloon", "charlevoix"]);
const BBOX = { minLat: 45.0, maxLat: 45.75, minLng: -85.45, maxLng: -84.6 };

function check(list, label) {
  const ids = new Set();
  for (const v of list) {
    if (ids.has(v.id)) fails.push(`${label}: duplicate id ${v.id}`);
    ids.add(v.id);
    if (!v.name || !v.id) fails.push(`${label}: missing id or name`);
    if (!AREAS.has(v.area)) fails.push(`${label} ${v.id}: bad area ${v.area}`);
    if (v.lat < BBOX.minLat || v.lat > BBOX.maxLat || v.lng < BBOX.minLng || v.lng > BBOX.maxLng)
      fails.push(`${label} ${v.id}: coordinates outside the region ${v.lat},${v.lng}`);
    if (!v.needsHours && !Object.keys(v.hours || {}).length)
      fails.push(`${label} ${v.id}: claims hours but has none`);
    if (v.needsHours && Object.keys(v.hours || {}).length)
      fails.push(`${label} ${v.id}: flagged call ahead but carries hours`);
    for (const [day, h] of Object.entries(v.hours || {})) {
      if (!/^\d{2}:\d{2}$/.test(h.open) || !/^\d{2}:\d{2}$/.test(h.close))
        fails.push(`${label} ${v.id}: bad time on ${day}`);
      if (h.close <= h.open) fails.push(`${label} ${v.id}: ${day} closes before it opens`);
    }
  }
}
check(venues, "venue");
check(pois, "poi");

for (const [name, o] of Object.entries(origins)) {
  if (o.lat < BBOX.minLat || o.lat > BBOX.maxLat) fails.push(`origin ${name}: outside the region`);
}

// Network rule: no em dashes anywhere in shipped copy or data.
const files = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git"].includes(e.name)) continue;
    const p = dir + "/" + e.name;
    if (e.isDirectory()) walk(p);
    else if (/\.(js|jsx|mjs|json|css|md)$/.test(e.name)) files.push(p);
  }
}
walk(".");
for (const f of files) {
  const text = fs.readFileSync(f, "utf8");
  if (text.includes("\u2014")) fails.push(`em dash in ${f}`);
}

const trail = venues.filter((v) => v.officialTrail).length;
if (trail !== 14) fails.push(`expected 14 official trail members, found ${trail}`);

if (fails.length) {
  console.error("FAIL");
  fails.forEach((f) => console.error(" - " + f));
  process.exit(1);
}
console.log(
  `ok: ${venues.length} venues (${trail} trail members, ${venues.filter((v) => !v.needsHours).length} with verified hours), ${pois.length} places, ${Object.keys(origins).length} start towns`
);
