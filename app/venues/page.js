import Link from "next/link";
import venues from "@/data/venues.json";
import VenueHours, { HOURS_VERIFIED } from "@/components/VenueHours";
import { buildVenueItemList } from "@/lib/venue-schema";

export const metadata = {
  title: "Petoskey area winery and tasting room hours",
  description:
    "Posted hours for every winery, cidery and brewery in the Petoskey Wine Region and around Little Traverse Bay, with call ahead flags where a stop does not publish a weekly schedule.",
  alternates: { canonical: "/venues" },
};

export default function VenuesPage() {
  const verified = venues.filter((v) => !v.needsHours).length;
  return (
    <main className="prose">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildVenueItemList(venues)) }}
      />
      <p className="small">
        <Link href="/">Petoskey Wine Region planner</Link> / hours
      </p>
      <h1>Petoskey area tasting room hours</h1>
      <p>
        Every stop on the map, with hours where the place publishes them. {verified} of{" "}
        {venues.length} publish a weekly schedule we could verify as of {HOURS_VERIFIED}. The rest
        are marked call ahead. Nothing here is invented: a stop with no published schedule gets a
        phone number, not a guess, and the planner treats it as unknown rather than routing you
        into a locked door.
      </p>
      <VenueHours title="Petoskey and Walloon Lake" areas={["petoskey", "boyne-walloon"]} />
      <VenueHours title="Harbor Springs and Alanson" areas={["harbor-alanson"]} />
      <VenueHours title="Charlevoix, Ellsworth and Central Lake" areas={["charlevoix"]} />
      <h2>Every stop</h2>
      <ul>
        {[...venues].sort((a, b) => a.name.localeCompare(b.name)).map((v) => (
          <li key={v.id}>
            <Link href={`/winery/${v.id}`}>{v.name}</Link>, {v.town}
          </li>
        ))}
      </ul>
    </main>
  );
}
