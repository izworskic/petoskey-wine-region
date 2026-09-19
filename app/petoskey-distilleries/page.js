import Link from "next/link";
import VenueHours, { HOURS_VERIFIED } from "@/components/VenueHours";
import PlannerMount from "@/components/PlannerMount";

export const metadata = {
  title: "Petoskey and Boyne City distilleries",
  description:
    "The four distilleries around Petoskey, Bay Harbor and Boyne City: Mammoth, Gypsy, High Five and Muskrat, where each sits, and which you can walk between.",
  alternates: { canonical: "https://chrisizworski.com/petoskey-wine/petoskey-distilleries/" },
};

export default function Page() {
  return (
    <main>
      <PlannerMount
        preset={{ origin: "Petoskey", beverages: ["spirits"] }}
        title="Petoskey area distillery map"
        description="Filtered to spirits. Add wineries or breweries back in from the chips, then build the loop."
      />
      <article className="prose">
        <p className="small">
          <Link href="/">Petoskey Wine Region planner</Link> / distilleries
        </p>
        <h1>Petoskey and Boyne City distilleries</h1>
        <p>
          The Petoskey Wine Region trail is wine, and the distilleries sit outside it. That is a
          quirk of how the trail is organised rather than a judgement on the spirits, and four of
          them are worth planning around.
        </p>
        <p>
          <strong>High Five Spirits</strong> on Howard Street is the one to end a day at. It is a
          downtown cocktail lounge, dogs are allowed inside, and it is a few minutes on foot from
          Beards, Chandler&apos;s and the rest of the Gaslight District. If your loop finishes in
          Petoskey, walk to this one rather than driving to it.
        </p>
        <p>
          <strong>Gypsy Distillery</strong> is the opposite in scale: 42,000 square feet in a
          repurposed equestrian facility on Charlevoix Avenue, indoor arena, games and live music.
          Same owners as High Five, the Kazanowski brothers. Petoskey Stone Gin is the one with the
          local name on it.
        </p>
        <p>
          <strong>Mammoth Distilling</strong> has its Bay Harbor room in the village on Main
          Street, which puts it neatly between Petoskey and the Charlevoix wineries. Rosen Rye is
          the flagship, and they run whiskey blending sessions if you want the stop to be an hour
          rather than twenty minutes.
        </p>
        <p>
          <strong>Muskrat Distilling</strong> is in Boyne City, in a restored 1890s building on the
          river with a seasonal patio. It sits in the same few blocks as Stiggs, the Boyne City
          Taproom and Red Mesa Grill, so the south arm of Lake Charlevoix is its own walkable
          evening.
        </p>
        <VenueHours title="Distillery hours" categories={["distillery"]} />
        <p className="small">
          Hours checked {HOURS_VERIFIED}. None of the four publish a weekly schedule in a form we
          could read, so all of them are call ahead. That is the honest state of it rather than a
          guess dressed up as data.
        </p>
        <p>
          <Link href="/">Back to the full map and planner</Link>
        </p>
      </article>
    </main>
  );
}
