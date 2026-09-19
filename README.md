# Petoskey Wine Region: Loop Planner

A routed, time-aware day planner for the wineries of the Petoskey Wine Region, around Walloon
Lake, Petoskey, Harbor Springs, Alanson and Charlevoix, with stone beaches, overlooks, harbor
towns and the Tunnel of Trees woven in as non-drinking stops.

Built with Next.js 14 (App Router) and Leaflet, in the same shape as the other network properties
and forked from the Traverse City planner (izworskic/tcwine).

## What it does

- Maps every current member of the Petoskey Wine Region trail, checked against the official
  roster, alongside other working tasting rooms in the same country which are labelled as
  non-members rather than quietly folded in.
- Pick stops from the list or off the map, and turn on layers for beaches, hikes, harbor towns,
  scenic stops, history and food.
- Build the day from a start time and a done by time. Stops are ordered into a loop and scheduled
  against each place's real hours, so nothing lands when it is closed, and anything that will not
  fit the window is called out rather than dropped silently.
- Real roads and real drive times from a routing service, with a straight line fallback that is
  labelled as estimated.

## Sources

Venue detail (owners, products, what each place is actually like) was cross-read from a
58-source research table covering Northern Michigan beverage and recreation businesses. Every
address from it was independently geocoded rather than trusted, and no hours were taken from it,
because it does not carry any.

## Data honesty

`data/venues.json` carries posted hours only where the venue actually publishes a weekly schedule.
Anything else is `needsHours: true`, which renders as call ahead with a phone number. The planner
treats those as unknown rather than guessing. As of the September 18 2026 build, 11 of 25 stops publish verifiable hours. Three of those are
seasonal or narrowed schedules and carry a note saying so, including Crooked Vine's fall window
and Petoskey Farms' Sunday only listing.

Coordinates come from each venue's own map embed on petoskey.wine, cross-checked against
OpenStreetMap and Nominatim. Two candidate stops were dropped rather than given approximate
coordinates.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # data gate
npm run build
```

## Environment

- `NEXT_PUBLIC_CARTO_API_KEY`: CARTO basemap key. Without it the map falls back to OpenStreetMap
  raster tiles.
- `MAPBOX_TOKEN`: optional. Without it `/api/route` uses the public OSRM demo server.

## Data

- `data/venues.json`: 25 tasting stops (14 official trail members plus 11 other working rooms,
  including four distilleries and four breweries that sit outside the wine trail).
- `data/pois.json`: 27 places worth stopping between them.
- `data/origins.json`: start towns.

## Where this ships

The planner lives on the hub at https://chrisizworski.com/petoskey-wine/. This repo is
the source; the hub carries the built output.

It builds as a Next static export with `basePath: "/petoskey-wine"`, because the hub is a
static site rather than a Next app. The one server dependency, road routing, lives in the
hub as `api/petoskey-route.js` and the planner calls it at `/api/petoskey-route`.

To publish a data or design change:

```bash
npm test                                              # data gate
NEXT_PUBLIC_CARTO_API_KEY=<carto key> npm run export:hub
cp -r out/. <hub>/public/petoskey-wine/
cd <hub> && node scripts/build-petoskey-wine-sitemap.mjs && npm test
```

The standalone Vercel project on this repo now 301s every path to the hub.
