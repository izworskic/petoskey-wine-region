import { withSocialMetadata } from "@/lib/page-metadata";
import CreatorAuthority from "@/components/CreatorAuthority";
import PetoskeyDayLens from "@/components/PetoskeyDayLens";
import Link from "next/link";
import VenueHours, { HOURS_VERIFIED } from "@/components/VenueHours";
import PlannerMount from "@/components/PlannerMount";

export const metadata = withSocialMetadata({
  title: 'Tunnel of Trees Wine Tour: Pond Hill & M-119 Stops',
  description: 'How to combine the M-119 Tunnel of Trees drive with a tasting stop at Pond Hill Farm, and how long the drive really takes.',
  alternates: { canonical: "https://chrisizworski.com/petoskey-wine/tunnel-of-trees-wine-tour/" },
});

export default function Page() {
  return (
    <main>
      <PlannerMount preset={{ area: "harbor-alanson", origin: "Harbor Springs", beverages: ["wine"] }} title={'Harbor Springs, Pond Hill and the Tunnel of Trees map'} description={'Prefiltered to this part of the region. Add or remove stops, then build the loop.'} />
      <article className="prose">
        <p className="small">
          <Link href="/">Petoskey Wine Region planner</Link> / Harbor Springs, Pond Hill and the Tunnel of Trees
        </p>
        <h1>Harbor Springs, Pond Hill and the Tunnel of Trees</h1>
        <section className="petoskey-search-answer" aria-label="Tunnel of Trees and wine route answer">
          <h2>Can you visit a winery on the Tunnel of Trees drive?</h2>
          <p><strong>Pond Hill Farm near Harbor Springs</strong> makes sense as a tasting, food or farm stop near the southern end of M-119. The Tunnel of Trees itself is a slow scenic experience; treat the driving, short walks and a meal as the point instead of stacking winery appointments.</p>
          <p>Crooked Vine and Seasons of the North are inland toward Alanson, not simply the next stops along the Tunnel of Trees. For more wine tastings without the scenic road, compare the <Link href="/walloon-lake-wineries">Walloon Lake winery loop</Link> or the <Link href="/petoskey-wine-region-trail">full trail by area</Link>.</p>
        </section>
        <p>M-119 north out of Harbor Springs is the best road in Michigan and it is also slower than everyone expects. Twenty miles of narrow canopied blacktop with no centerline, blind curves, cyclists, and Lake Michigan flashing through the trees on your left. Give it ninety minutes to Cross Village if you plan to stop at all, and do not treat it as a connector to somewhere else.</p>
        <p>Pond Hill Farm sits at the bottom of the drive, just up from Harbor Springs, and is the right tasting stop to pair with it: a working farm with a winery, a brewery, a cafe and enough going on that it absorbs an hour and a half without effort. Thorne Swift Nature Preserve is a few miles further north, a cedar boardwalk out to a dune beach, and a good leg stretch halfway.</p>
        <p>At the top, Legs Inn at Cross Village is a stone and driftwood roadhouse serving Polish food with a garden over the lake. It is seasonal, so check before you commit the whole afternoon to arriving there hungry.</p>
        <p>Crooked Vine in Alanson and Seasons of the North out on M-68 are the other two stops in this half of the region. They are east rather than north, toward the Inland Water Route, so they pair with the Oden fish hatchery and the Alanson swing bridge rather than with the Tunnel of Trees.</p>
        <PetoskeyDayLens initialCluster="harbor-alanson" />
        <VenueHours title="Hours for the Harbor Springs and Alanson stops" areas={["harbor-alanson"]} />
        <p className="small">Hours checked {HOURS_VERIFIED}. Call ahead where a stop does not publish a weekly schedule.</p>
        <p><Link href="/">Back to the full map and planner</Link></p>
      </article>
      <CreatorAuthority pageUrl="https://chrisizworski.com/petoskey-wine/tunnel-of-trees-wine-tour/" pageName="Pond Hill and the Tunnel of Trees" />
    </main>
  );
}
