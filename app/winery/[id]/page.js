import Link from "next/link";
import venues from "@/data/venues.json";
import pois from "@/data/pois.json";
import { condenseWeek, HOURS_VERIFIED } from "@/components/VenueHours";
import { venueSchema, BASE } from "@/lib/venue-schema";
import { haversineMiles } from "@/lib/geo";

export function generateStaticParams() {
  return venues.map((v) => ({ id: v.id }));
}

function find(id) {
  return venues.find((v) => v.id === id);
}

export function generateMetadata({ params }) {
  const v = find(params.id);
  if (!v) return {};
  // The hub caps SERP titles at 60 characters and descriptions at 158, so these
  // are absolute rather than run through the layout title template, and they
  // step down to the bare name when a venue is long enough to blow the cap.
  const withTown = `${v.name}, ${v.town}`;
  const title = withTown.length <= 60 ? withTown : v.name.length <= 60 ? v.name : v.name.slice(0, 59).trim();
  const description = `${v.name} in ${v.town}: posted hours, what it pours, and the nearest stops to pair it with.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `https://chrisizworski.com/petoskey-wine/winery/${v.id}/` },
    openGraph: { title, url: `${BASE}/winery/${v.id}` },
  };
}

export default function WineryPage({ params }) {
  const v = find(params.id);
  if (!v) {
    return (
      <main className="prose">
        <h1>Not found</h1>
        <p>
          <Link href="/">Back to the map</Link>
        </p>
      </main>
    );
  }
  const near = venues
    .filter((x) => x.id !== v.id)
    .map((x) => ({ x, d: haversineMiles(v, x) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 4);
  const sights = pois
    .map((p) => ({ p, d: haversineMiles(v, p) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 3);

  return (
    <main className="prose">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", ...venueSchema(v) }),
        }}
      />
      <p className="small">
        <Link href="/">Petoskey Wine Region planner</Link> / {v.town}
      </p>
      <h1>{v.name}</h1>
      <p>{v.note}</p>

      <h2>The basics</h2>
      <ul>
        <li>Where: {v.address || `${v.town}, Michigan`}</li>
        <li>
          Hours:{" "}
          {v.needsHours
            ? `not published in a weekly format, call ahead${v.phone ? ` at ${v.phone}` : ""}`
            : condenseWeek(v.hours)}
          {v.seasonal ? `. ${v.seasonal}` : ""}
        </li>
        <li>Pours: {v.beverages.join(", ")}</li>
        <li>Plan on about {v.dwellMinutes} minutes</li>
        {v.food ? <li>Food: {v.food}</li> : null}
        {v.phone ? <li>Phone: {v.phone}</li> : null}
        {v.website ? (
          <li>
            Website: <a href={v.website} rel="nofollow noopener">{v.website.replace(/^https?:\/\//, "")}</a>
          </li>
        ) : null}
        <li>
          {v.officialTrail
            ? `Current member of the ${v.officialTrail.name} trail, checked ${v.officialTrail.verifiedAt}`
            : "Not a Petoskey Wine Region trail member, listed here because it is a working tasting room in the same country"}
        </li>
      </ul>
      <p className="small">Hours checked {HOURS_VERIFIED}.</p>

      <h2>Nearest other tasting stops</h2>
      <ul>
        {near.map(({ x, d }) => (
          <li key={x.id}>
            <Link href={`/winery/${x.id}`}>{x.name}</Link>, {d.toFixed(1)} miles straight line ({x.town})
          </li>
        ))}
      </ul>

      <h2>Worth pairing with</h2>
      <ul>
        {sights.map(({ p, d }) => (
          <li key={p.id}>
            {p.name}, {d.toFixed(1)} miles straight line. {p.note}
          </li>
        ))}
      </ul>
      <p className="small">
        Distances are straight line from the map coordinates, not drive distance. Build the actual
        route on <Link href="/">the planner</Link>, which uses real roads.
      </p>
      <p>
        <a href={v.directionsUrl} rel="nofollow noopener">Directions</a>
      </p>
    </main>
  );
}
