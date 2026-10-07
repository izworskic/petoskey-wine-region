import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";

execFileSync(process.execPath, ["scripts/build-region-contract.mjs"], { stdio: "inherit" });
const contract = JSON.parse(await readFile(new URL("../public/region-contract.json", import.meta.url), "utf8"));
const venues = JSON.parse(await readFile(new URL("../data/venues.json", import.meta.url), "utf8"));
const wineries = venues.filter((venue) => venue.category === "winery");

assert.equal(contract.schemaVersion, 1);
assert.equal(contract.inventory.wineryCount, wineries.length);
assert.equal(contract.truthRules.unknownIsFalse, false);
assert.equal(contract.inventory.knownHoursCount + contract.inventory.unknownHoursCount, wineries.length);
assert.equal(contract.inventory.officialTrailMemberCount, wineries.filter((venue) => venue.officialTrail).length);
assert.ok(contract.operatingByWeekday.Saturday.knownOpen + contract.operatingByWeekday.Saturday.unknown >= 2);
for (const [intent, selected] of Object.entries(contract.handoff.presets)) {
  assert.equal(selected.length, 3, intent + " starter must contain three wineries");
}
console.log("Petoskey region contract checks passed");
