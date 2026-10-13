import { withSocialMetadata } from "@/lib/page-metadata";
import CreatorAuthority from "@/components/CreatorAuthority";
import PetoskeyDayLens from "@/components/PetoskeyDayLens";
import Link from "next/link";
import VenueHours, { HOURS_VERIFIED } from "@/components/VenueHours";
import PlannerMount from "@/components/PlannerMount";

export const metadata = withSocialMetadata({
  title: 'Petoskey Wine Trail: 14 Wineries, Map, Hours & Routes',
  description: 'Every current member of the Petoskey Wine Region trail, where each one sits, what it pours, and how to group them into a day that actually works.',
  alternates: { canonical: "https://chrisizworski.com/petoskey-wine/petoskey-wine-region-trail/" },
});

export default function Page() {
  return (
    <main>
      <PlannerMount preset={{ beverages: ["wine"] }} title={'The 14 wineries of the Petoskey Wine Region map'} description={'Prefiltered to this part of the region. Add or remove stops, then build the loop.'} />
      <article className="prose">
        <p className="small">
          <Link href="/">Petoskey Wine Region planner</Link> / The 14 wineries of the Petoskey Wine Region
        </p>
        <h1>The 14 wineries of the Petoskey Wine Region</h1>
        <section className="petoskey-search-answer" aria-label="Petoskey winery trail quick answer">
          <h2>Can you visit all 14 Petoskey wine trail wineries in a day?</h2>
          <p>No, not while leaving reasonable time for tastings. The trail runs from Vanderbilt through Petoskey and Alanson to wineries near Charlevoix and Central Lake. Two or three stops in a shared area can make a relaxed day; fourteen widely separated stops cannot.</p>
          <p>Choose <Link href="/walloon-lake-wineries">the Walloon Lake area</Link> for a tight winery cluster, <Link href="/charlevoix-area-wineries">Charlevoix</Link> for the western corridor, or <Link href="/tunnel-of-trees-wine-tour">Harbor Springs</Link> for a scenic-drive day with fewer tastings. The day planner checks posted hours for your date; unpublished schedules mean call ahead.</p>
        </section>
        <p>The Petoskey Wine Region is the trail formerly known as the Bay View Wine Trail, rebranded in 2019. It now lists 14 member wineries, all family owned, spread across Emmet, Charlevoix, Antrim and Otsego counties inside the Tip of the Mitt appellation.</p>
        <p>The important thing to understand before you plan anything: this is not a compact trail. Vanderbilt Vines sits well east of Gaylord, Cellar 1914 is down in Central Lake, and Crooked Vine is north toward Alanson. End to end that is more than ninety minutes of driving before you have tasted anything. The members cluster into three usable groups, and a good day picks one group.</p>
        <p>The Petoskey and Walloon Lake cluster carries seven of the fourteen and is where most first trips should go. The Charlevoix and south group carries four more along the shoreline and the Chain of Lakes. Crooked Vine and Seasons of the North sit together in the north, and Vanderbilt Vines is its own trip.</p>
        <p>Membership below is checked against the official trail list rather than assumed. Pond Hill Farm and 1918 Cellars at Castle Farms both pour in the same country and both appear on the map, but they are listed separately because they are not currently on the trail roster.</p>
        <section className="wine-v5" aria-labelledby="petoskey-v5-trip-shapes">
          <p className="wine-v5-kicker">A wine trip with the right footprint</p>
          <h2 id="petoskey-v5-trip-shapes">Three better ways to experience the trail</h2>
          <p>We return to Michigan wine country because the best part is having time to enjoy where we are. Up here, the challenge is spread-out geography, not a shortage of beautiful places. Choose a cluster first, then let the wine list refine the stops.</p>
          <h3>An easy first afternoon: Walloon Lake and Petoskey</h3>
          <p>With three or four hours, keep it to two or three nearby tasting rooms. Start with the <Link href="/walloon-lake-wineries">Walloon Lake and Boyne winery guide</Link> and use its planner preset; do not try to complete the full official trail.</p>
          <h3>Scenery is the point: Harbor Springs and M-119</h3>
          <p>Choose <Link href="/tunnel-of-trees-wine-tour">the Tunnel of Trees wine route</Link> when the shoreline drive matters as much as the pour. Build around one meaningful tasting stop, leave room for the road, and avoid scheduling tight arrivals on M-119.</p>
          <h3>Make it a whole day: Charlevoix and the southern stops</h3>
          <p>Use the <Link href="/charlevoix-area-wineries">Charlevoix wine guide</Link> if you are staying west or want a longer excursion. Start with the farthest stop that actually matters to you and let the route planner expose the return drive and posted hours.</p>
          <p><strong>What the tool knows:</strong> mapped locations, current trail-roster flags, sourced opening hours when available, and route estimates. <strong>What it cannot promise:</strong> same-day walk-in space, seasonal staffing, or that unposted hours mean a room is closed. Verify those directly.</p>
        </section>
        <PetoskeyDayLens initialCluster="petoskey" />
        <VenueHours title="The 14 trail members and their hours" trailOnly />
        <p className="small">Hours checked {HOURS_VERIFIED}. Call ahead where a stop does not publish a weekly schedule.</p>
        <p><Link href="/">Back to the full map and planner</Link></p>
      </article>
      <CreatorAuthority pageUrl="https://chrisizworski.com/petoskey-wine/petoskey-wine-region-trail/" pageName="The 14 wineries of the Petoskey Wine Region" />
    </main>
  );
}
