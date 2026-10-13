import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { decide, REGIONS } from "../lib/wine-region-choice.mjs";

const expectChoice = (base, priority, time, winner, alternate) => {
  const choice = decide(base, priority, time);
  assert.equal(choice.winner, winner, [base,priority,time].join(" / "));
  assert.equal(choice.alternate, alternate);
  assert.ok(choice.why.length > 40);
  assert.ok(choice.caution.length > 30);
  assert.ok(REGIONS[choice.winner].url.startsWith("https://"));
};
expectChoice("traverse-city","wine","short","old-mission","leelanau");
expectChoice("traverse-city","harbors","full","leelanau","old-mission");
expectChoice("traverse-city","sparkling","full","leelanau","old-mission");
expectChoice("leelanau","wine","full","leelanau","old-mission");
expectChoice("petoskey","wine","short","petoskey","leelanau");
expectChoice("petoskey","harbors","full","petoskey","leelanau");

const read = (p) => readFile(new URL("../" + p, import.meta.url), "utf8");
const [layout, home, component, footer] = await Promise.all([
  read("app/layout.js"),
  read("app/page.js"),
  read("components/WineRegionDecision.js"),
  read("components/WineNetworkFooter.js"),
]);
assert.match(layout, /WineNetworkFooter/);
assert.match(layout, /wine-v5.css/);
assert.match(home, /<WineRegionDecision/);
assert.match(component, /not live winery availability/);
assert.match(component, /unknown hours mean call ahead/i);
assert.match(footer, /We enjoy exploring Michigan wine country and visit often/);
assert.match(footer, /https:\/\/chrisizworski\.com\/chris-izworski\//);
console.log("Michigan wine V5 decision, origin gate, transparency and author checks passed.");

const {choosePetoskeyDay,evaluatePetoskeyRoute,wineryCluster}=await import("../lib/petoskey-day-choice.mjs");
const sample=(id,hours={},needsHours=false)=>({id,name:id,lat:45.3,lng:-85,category:"winery",area:"petoskey",dwellMinutes:40,hours,needsHours,specialties:[],tags:[]});
const opening={Tuesday:{open:"10:00",close:"18:00"}};
const a=sample("a",opening),b=sample("b",opening);
assert.equal(evaluatePetoskeyRoute({stops:[a,b],date:"2026-10-13",hoursAvailable:3}).state,"POSTED_HOURS_FIT");
assert.equal(evaluatePetoskeyRoute({stops:[a,sample("unknown",{},true)],date:"2026-10-13"}).state,"CALL_AHEAD");
assert.equal(evaluatePetoskeyRoute({stops:[a,sample("closed",{Tuesday:{closed:true}})],date:"2026-10-13"}).feasible,false);
assert.equal(evaluatePetoskeyRoute({stops:[a,b],date:"2026-10-13",hoursAvailable:1}).feasible,false);
assert.equal(wineryCluster({id:"vanderbilt-vines",category:"winery",area:"boyne-walloon"},"walloon"),false);
const itinerary=choosePetoskeyDay({venues:[a,b],date:"2026-10-13",hoursAvailable:3,stopCount:2});
assert.equal(itinerary.choice.state,"POSTED_HOURS_FIT");
const landing=await read("app/page.js");
assert.match(landing,/PetoskeyDayLens/);
for(const page of ["app/petoskey-wine-region-trail/page.js","app/walloon-lake-wineries/page.js","app/tunnel-of-trees-wine-tour/page.js","app/charlevoix-area-wineries/page.js"])assert.match(await read(page),/PetoskeyDayLens/);
console.log("Petoskey V5 trip feasibility, unknown-hours, cluster-boundary and page-coverage tests passed.");

for(const [p,needle] of [
  ["app/page.js", "Where should you go wine tasting near Petoskey?"],
  ["app/petoskey-wine-region-trail/page.js","Can you visit all 14 Petoskey wine trail wineries in a day?"],
  ["app/walloon-lake-wineries/page.js","Which wineries are near Walloon Lake?"],
  ["app/tunnel-of-trees-wine-tour/page.js","Can you visit a winery on the Tunnel of Trees drive?"],
  ["app/charlevoix-area-wineries/page.js","What wineries can you visit near Charlevoix?"]
]){assert.match(await read(p),new RegExp(needle.replace(/[?]/g,"\\?")));assert.match(await read(p),/petoskey-search-answer/);}
assert.match(await read("app/page.js"),/https:\/\/tcwine.chrisizworski.com\//);
console.log("Petoskey answer-first query matching across five region entry points passed.");
