import Link from "next/link";
import VenueHours, { HOURS_VERIFIED } from "@/components/VenueHours";
import PlannerMount from "@/components/PlannerMount";

export const metadata = {
  title: 'Walloon Lake and Boyne area wineries',
  description: 'The wineries closest to Walloon Lake and Boyne City, the shortest real loop in the Petoskey Wine Region, and what to do with the rest of the day.',
  alternates: { canonical: "/walloon-lake-wineries" },
};

export default function Page() {
  return (
    <main>
      <PlannerMount preset={{ area: "boyne-walloon", origin: "Walloon Lake", beverages: ["wine"] }} title={'Walloon Lake and Boyne area wineries map'} description={'Prefiltered to this part of the region. Add or remove stops, then build the loop.'} />
      <article className="prose">
        <p className="small">
          <Link href="/">Petoskey Wine Region planner</Link> / Walloon Lake and Boyne area wineries
        </p>
        <h1>Walloon Lake and Boyne area wineries</h1>
        <p>Walloon Lake is the quiet one. Lake Charlevoix gets the boats and Little Traverse Bay gets the crowds, and Walloon sits in between with a rebuilt village at the foot of it, a Hemingway story attached, and three tasting rooms within about fifteen minutes.</p>
        <p>Walloon Lake Winery on Intertown Road is the anchor: a third generation farm about a mile off the water, seven acres of cold hardy vines on thirty six acres, and a stacked cordwood tasting building that looks out over the vineyard. Rudbeckia on Lake Grove Road is the other side of the coin, the one stop on the trail pouring wine, beer, cider and spirits, with firepits and winter igloos. Boyne Valley Vineyards sits on US-131 between Walloon Lake and Boyne Falls and leans hardest into Michigan grown cold hardy fruit.</p>
        <p>That is a genuine three stop loop with short drives, which is rare in this region. Start or end it in the village of Walloon Lake, and if you want a fourth thing in the day, the stair climb at Avalanche Preserve above Boyne City is the best earned view for miles.</p>
        <VenueHours title="Hours for the Walloon Lake and Boyne stops" areas={["boyne-walloon"]} />
        <p className="small">Hours checked {HOURS_VERIFIED}. Call ahead where a stop does not publish a weekly schedule.</p>
        <p><Link href="/">Back to the full map and planner</Link></p>
      </article>
    </main>
  );
}
