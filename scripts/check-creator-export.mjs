import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
const venues = JSON.parse(readFileSync(resolve("data/venues.json"), "utf8"));

const outputDir = resolve("out");
const productBase = "https://chrisizworski.com/petoskey-wine";
const personId = "https://chrisizworski.com/#person";
const personUrl = "https://chrisizworski.com/";
const profileUrl = "https://chrisizworski.com/chris-izworski/";
const toolsUrl = "https://chrisizworski.com/tools/";

const expectedRoutes = new Map([
  ["index.html", `${productBase}/`],
  ["charlevoix-area-wineries/index.html", `${productBase}/charlevoix-area-wineries/`],
  ["petoskey-distilleries/index.html", `${productBase}/petoskey-distilleries/`],
  ["petoskey-stone-beaches/index.html", `${productBase}/petoskey-stone-beaches/`],
  ["petoskey-wine-region-trail/index.html", `${productBase}/petoskey-wine-region-trail/`],
  ["tunnel-of-trees-wine-tour/index.html", `${productBase}/tunnel-of-trees-wine-tour/`],
  ["venues/index.html", `${productBase}/venues/`],
  ["walloon-lake-wineries/index.html", `${productBase}/walloon-lake-wineries/`],
  ...venues.map((venue) => [
    `winery/${venue.id}/index.html`,
    `${productBase}/winery/${venue.id}/`,
  ]),
]);

function htmlFiles(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    const rel = relative(outputDir, path).replaceAll("\\", "/");
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return rel.endsWith(".html") && rel !== "404.html" && rel !== "404/index.html" ? [rel] : [];
  });
}

function getCanonical(html, route) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  const tag = tags.find((candidate) => /\brel="canonical"/i.test(candidate));
  assert.ok(tag, `${route}: canonical link is missing`);
  return tag.match(/\bhref="([^"]+)"/i)?.[1] || "";
}

function creatorGraphs(html, route) {
  const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  const parsed = scripts.map((match) => {
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      throw new Error(`${route}: invalid JSON-LD: ${error.message}`);
    }
  });
  return parsed.flatMap((value) => Array.isArray(value["@graph"]) ? [value] : []);
}

assert.ok(statSync(outputDir).isDirectory(), "out/ does not exist; run npm run export:hub first");
const actualRoutes = htmlFiles(outputDir).sort();
const expectedRouteNames = [...expectedRoutes.keys()].sort();
assert.deepEqual(actualRoutes, expectedRouteNames, "exported HTML routes do not match the owner content-route manifest");

for (const route of expectedRouteNames) {
  const html = readFileSync(join(outputDir, route), "utf8");
  const expectedUrl = expectedRoutes.get(route);
  assert.equal(getCanonical(html, route), expectedUrl, `${route}: canonical URL changed`);
  assert.ok(html.includes(`href="${profileUrl}"`) && html.includes("Built by"), `${route}: profile-linked creator credit is missing`);
  assert.ok(html.includes(`href="${toolsUrl}"`), `${route}: Tools hub discovery link is missing`);

  const graphs = creatorGraphs(html, route);
  const nodes = graphs.flatMap((graph) => graph["@graph"]);
  const people = nodes.filter((node) => node["@type"] === "Person" && node["@id"] === personId);
  const pages = nodes.filter((node) => node["@type"] === "WebPage" && node.url === expectedUrl);
  assert.equal(people.length, 1, `${route}: expected exactly one canonical Person node`);
  assert.equal(people[0].name, "Chris Izworski", `${route}: Person name changed`);
  assert.equal(people[0].url, personUrl, `${route}: Person homepage URL changed`);
  assert.equal(pages.length, 1, `${route}: expected one WebPage for ${expectedUrl}`);
  assert.equal(pages[0]["@id"], `${expectedUrl}#webpage`, `${route}: WebPage @id does not match its canonical URL`);
  assert.deepEqual(pages[0].author, { "@id": personId }, `${route}: author does not reference the canonical Person`);
  assert.deepEqual(pages[0].publisher, { "@id": personId }, `${route}: publisher does not reference the canonical Person`);
}

console.log(`Creator authority verified on ${expectedRouteNames.length} exported content pages.`);
