import { readFile, writeFile, mkdir } from "node:fs/promises";

const venues = JSON.parse(await readFile(new URL("../data/venues.json", import.meta.url), "utf8"));
const wineries = venues.filter((venue) => venue.category === "winery");
const knownHours = wineries.filter((venue) => !venue.needsHours && venue.hours && Object.keys(venue.hours).length);
const trail = wineries.filter((venue) => venue.officialTrail);
const normalize = (value) => String(value || "").toLowerCase();
const searchable = (venue) => [
  ...(venue.tags || []),
  ...(venue.specialties || []),
  venue.note,
  venue.food,
  venue.view,
  venue.vibe,
].map(normalize).join(" ");

const rules = {
  "first-trip": /estate|vineyard|hilltop|lake|bay|family/,
  "serious-wine": /estate|marquette|frontenac|petite pearl|cold-hardy|small-batch/,
  riesling: /riesling/,
  sparkling: /sparkling|pétillant|petillant/,
  reds: /marquette|frontenac|petite pearl|dry red|red wine/,
  whites: /frontenac blanc|cayuga|la crescent|white wine|riesling/,
  food: /pizza|bistro|food|light bites|snacks/,
  views: /view|hilltop|vineyard|lake|bay|country/,
  quiet: /quiet|farm|porch|boutique|country/,
};

const intentEvidence = Object.fromEntries(
  Object.entries(rules).map(([intent, pattern]) => [
    intent,
    wineries.filter((venue) => pattern.test(searchable(venue))).length,
  ])
);

function miles(a, b) {
  const R = 3958.8;
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLng = (b.lng - a.lng) * rad;
  const la1 = a.lat * rad;
  const la2 = b.lat * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
const nearest = wineries.map((venue) => Math.min(
  ...wineries.filter((other) => other.id !== venue.id).map((other) => miles(venue, other))
));
let spread = 0;
for (let i = 0; i < wineries.length; i += 1) {
  for (let j = i + 1; j < wineries.length; j += 1) spread = Math.max(spread, miles(wineries[i], wineries[j]));
}

const handoffPresets = {
  "first-trip": ["petoskey-farms", "mackinaw-trail", "walloon-lake-winery"],
  "serious-wine": ["petoskey-farms", "mackinaw-trail", "boyne-valley-vineyards"],
  riesling: ["petoskey-farms", "mackinaw-trail", "boyne-valley-vineyards"],
  sparkling: ["walloon-lake-winery", "rudbeckia", "mackinaw-trail"],
  reds: ["petoskey-farms", "mackinaw-trail", "boyne-valley-vineyards"],
  whites: ["petoskey-farms", "boyne-valley-vineyards", "mackinaw-trail"],
  food: ["petoskey-farms", "mackinaw-trail", "boyne-valley-vineyards"],
  views: ["petoskey-farms", "boyne-valley-vineyards", "walloon-lake-winery"],
  quiet: ["walloon-lake-winery", "rudbeckia", "spare-key"],
};
const ids = new Set(wineries.map((venue) => venue.id));
for (const [intent, selected] of Object.entries(handoffPresets)) {
  for (const id of selected) {
    if (!ids.has(id)) throw new Error(`Missing Petoskey handoff venue ${id} for ${intent}`);
  }
}

const verifiedDates = trail.map((venue) => venue.officialTrail?.verifiedAt).filter(Boolean).sort();
const contract = {
  schemaVersion: 1,
  adapter: "petoskey-wine-region",
  region: {
    id: "petoskey",
    label: "Petoskey / Tip of the Mitt",
    publicLabel: "Petoskey Wine Region",
    plannerUrl: "https://chrisizworski.com/petoskey-wine/",
    plannerOrigin: "Petoskey",
    officialGeography: [
      { type: "AVA", name: "Tip of the Mitt AVA", authority: "TTB" },
      { type: "wine-region", name: "Petoskey Wine Region", authority: "official association" }
    ],
    anchor: { lat: 45.35, lng: -84.96 },
    experience: {
      compactness: "medium",
      scenery: "high",
      villages: "high",
      variety: "medium",
      relaxedPace: "high",
      firstTripAppeal: "medium"
    }
  },
  inventory: {
    wineryCount: wineries.length,
    officialTrailMemberCount: trail.length,
    knownHoursCount: knownHours.length,
    unknownHoursCount: wineries.length - knownHours.length,
    foodSignalCount: wineries.filter((venue) => Boolean(venue.food)).length,
    viewSignalCount: wineries.filter((venue) => Boolean(venue.view)).length
  },
  intentEvidence,
  localDrive: {
    medianNearestNeighborMiles: Number(median(nearest).toFixed(1)),
    spreadMiles: Number(spread.toFixed(1))
  },
  freshness: {
    wineryTruthReviewedAt: "2026-09-18",
    hoursReviewedLabel: "September 18, 2026",
    officialMembershipVerifiedAt: verifiedDates.at(-1) || null
  },
  truthRules: {
    unknownIsFalse: false,
    unknownHoursMeaning: "call-ahead / not verified, never treated as closed",
    reservationAvailabilityKnown: false,
    tastingFeesKnown: false
  },
  handoff: {
    plannerUrl: "https://chrisizworski.com/petoskey-wine/",
    plannerOrigin: "Petoskey",
    area: "any",
    presets: handoffPresets,
    source: "owner-validated-regional-presets"
  }
};

await mkdir(new URL("../public/", import.meta.url), { recursive: true });
await writeFile(new URL("../public/region-contract.json", import.meta.url), JSON.stringify(contract, null, 2) + "\n");
console.log("wrote Petoskey region contract");
