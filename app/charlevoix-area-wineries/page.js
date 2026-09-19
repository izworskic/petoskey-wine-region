import Link from "next/link";
import VenueHours, { HOURS_VERIFIED } from "@/components/VenueHours";
import PlannerMount from "@/components/PlannerMount";

export const metadata = {
  title: 'Charlevoix area wineries',
  description: 'Spare Key, Blu Dot, 1918 Cellars, Royal Farms and Cellar 1914: the western and southern half of the Petoskey Wine Region, and how to string them together.',
  alternates: { canonical: "https://chrisizworski.com/petoskey-wine/charlevoix-area-wineries/" },
};

export default function Page() {
  return (
    <main>
      <PlannerMount preset={{ area: "charlevoix", origin: "Charlevoix", beverages: ["wine"] }} title={'Charlevoix area wineries map'} description={'Prefiltered to this part of the region. Add or remove stops, then build the loop.'} />
      <article className="prose">
        <p className="small">
          <Link href="/">Petoskey Wine Region planner</Link> / Charlevoix area wineries
        </p>
        <h1>Charlevoix area wineries</h1>
        <p>West and south of Petoskey the trail spreads out along the shoreline and then down the Chain of Lakes. Spare Key Winery on Upper Bay Shore Road is the hinge, close enough to Petoskey to be a first stop and close enough to Charlevoix to be a last one.</p>
        <p>From there Blu Dot Farm and Vineyard sits on Boyne City Road outside Charlevoix and runs seasonally, May through October. 1918 Cellars pours in a historic wing of Castle Farms on M-66, which means the grounds come with the tasting. Further south, The Cellars at Royal Farms in Ellsworth is a farm market with a tasting room attached, and Cellar 1914 in Central Lake is the southern end of the trail.</p>
        <p>That is a long thin line rather than a loop. Pick the top two or the bottom two rather than all five. Downtown Charlevoix, the south pier light, Mount McSauba and Fisherman&apos;s Island State Park all sit in the middle of it and are the reason to make the drive anyway.</p>
        <VenueHours title="Hours for the Charlevoix area stops" areas={["charlevoix"]} />
        <p className="small">Hours checked {HOURS_VERIFIED}. Call ahead where a stop does not publish a weekly schedule.</p>
        <p><Link href="/">Back to the full map and planner</Link></p>
      </article>
    </main>
  );
}
