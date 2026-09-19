import Link from "next/link";
import VenueHours, { HOURS_VERIFIED } from "@/components/VenueHours";
import PlannerMount from "@/components/PlannerMount";

export const metadata = {
  title: 'Petoskey stone beaches near the wineries',
  description: 'Where to hunt Petoskey stones between tasting stops, which beaches actually produce, and how to work one into a wine day.',
  alternates: { canonical: "https://chrisizworski.com/petoskey-wine/petoskey-stone-beaches/" },
};

export default function Page() {
  return (
    <main>
      <PlannerMount preset={{ origin: "Petoskey", beverages: ["wine"], poiKinds: ["beach"] }} title={'Petoskey stone beaches near the wineries map'} description={'Prefiltered to this part of the region. Add or remove stops, then build the loop.'} />
      <article className="prose">
        <p className="small">
          <Link href="/">Petoskey Wine Region planner</Link> / Petoskey stone beaches near the wineries
        </p>
        <h1>Petoskey stone beaches near the wineries</h1>
        <p>Half the people who come up here for the wineries also want to find a Petoskey stone, and the two fit together better than you would think, because the tasting rooms mostly close by six and the beaches do not.</p>
        <p>Petoskey State Park on Little Traverse Bay is the obvious one and it does produce, particularly right at the waterline and best after a blow has turned the gravel over. Magnus Park on the west side of town is quieter and the shallows are worth wading. Fisherman&apos;s Island State Park south of Charlevoix is the serious option: miles of undeveloped Lake Michigan shoreline, a gravel road in, and far fewer people working it.</p>
        <p>The stone is fossil coral, Hexagonaria percarinata, and it only shows its pattern clearly when wet, which is why everyone you see is carrying a dripping handful. Look in the wet cobble, not the dry sand. Michigan allows collecting a reasonable personal amount on most public land but not inside state park boundaries in every case, so check the posted rules where you are standing.</p>
        <p>A clean pairing: Petoskey Farms and Maple Moon on Atkins Road in the afternoon, then twenty minutes to Petoskey State Park for the last light on the bay.</p>
        <VenueHours title="Petoskey area tasting rooms" areas={["petoskey"]} />
        <p className="small">Hours checked {HOURS_VERIFIED}. Call ahead where a stop does not publish a weekly schedule.</p>
        <p><Link href="/">Back to the full map and planner</Link></p>
      </article>
    </main>
  );
}
