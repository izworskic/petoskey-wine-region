import Link from "next/link";
import VenueHours, { HOURS_VERIFIED } from "@/components/VenueHours";
import PlannerMount from "@/components/PlannerMount";

export const metadata = {
  title: 'The 14 wineries of the Petoskey Wine Region',
  description: 'Every current member of the Petoskey Wine Region trail, where each one sits, what it pours, and how to group them into a day that actually works.',
  alternates: { canonical: "https://chrisizworski.com/petoskey-wine/petoskey-wine-region-trail/" },
};

export default function Page() {
  return (
    <main>
      <PlannerMount preset={{ beverages: ["wine"] }} title={'The 14 wineries of the Petoskey Wine Region map'} description={'Prefiltered to this part of the region. Add or remove stops, then build the loop.'} />
      <article className="prose">
        <p className="small">
          <Link href="/">Petoskey Wine Region planner</Link> / The 14 wineries of the Petoskey Wine Region
        </p>
        <h1>The 14 wineries of the Petoskey Wine Region</h1>
        <p>The Petoskey Wine Region is the trail formerly known as the Bay View Wine Trail, rebranded in 2019. It now lists 14 member wineries, all family owned, spread across Emmet, Charlevoix, Antrim and Otsego counties inside the Tip of the Mitt appellation.</p>
        <p>The important thing to understand before you plan anything: this is not a compact trail. Vanderbilt Vines sits well east of Gaylord, Cellar 1914 is down in Central Lake, and Crooked Vine is north toward Alanson. End to end that is more than ninety minutes of driving before you have tasted anything. The members cluster into three usable groups, and a good day picks one group.</p>
        <p>The Petoskey and Walloon Lake cluster carries seven of the fourteen and is where most first trips should go. The Charlevoix and south group carries four more along the shoreline and the Chain of Lakes. Crooked Vine and Seasons of the North sit together in the north, and Vanderbilt Vines is its own trip.</p>
        <p>Membership below is checked against the official trail list rather than assumed. Pond Hill Farm and 1918 Cellars at Castle Farms both pour in the same country and both appear on the map, but they are listed separately because they are not currently on the trail roster.</p>
        <VenueHours title="The 14 trail members and their hours" trailOnly />
        <p className="small">Hours checked {HOURS_VERIFIED}. Call ahead where a stop does not publish a weekly schedule.</p>
        <p><Link href="/">Back to the full map and planner</Link></p>
      </article>
    </main>
  );
}
