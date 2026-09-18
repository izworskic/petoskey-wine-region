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

## Data honesty

`data/venues.json` carries posted hours only where the venue actually publishes a weekly schedule.
Anything else is `needsHours: true`, which renders as call ahead with a phone number. The planner
treats those as unknown rather than guessing. As of the September 18 2026 build, 8 of 19 stops
publish verifiable hours.

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

- `data/venues.json`: 19 tasting stops (14 official trail members plus 5 other working rooms).
- `data/pois.json`: 24 places worth stopping between them.
- `data/origins.json`: start towns.
