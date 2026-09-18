import Link from "next/link";
import venues from "@/data/venues.json";
import pois from "@/data/pois.json";
import PlannerMount from "@/components/PlannerMount";
import VenueHours, { HOURS_VERIFIED } from "@/components/VenueHours";
import { buildVenueItemList, BASE } from "@/lib/venue-schema";

const TRAIL = venues.filter((v) => v.officialTrail);
const OTHER = venues.filter((v) => !v.officialTrail);

const GUIDES = [
  { href: "/petoskey-wine-region-trail", title: "The 14 wineries of the Petoskey Wine Region", blurb: "every current trail member, where it sits, and what it pours" },
  { href: "/walloon-lake-wineries", title: "Walloon Lake and Boyne wineries", blurb: "the tight southern cluster and the shortest real loop in the region" },
  { href: "/tunnel-of-trees-wine-tour", title: "Harbor Springs and the Tunnel of Trees", blurb: "Pond Hill, the M-119 drive, and how long it actually takes" },
  { href: "/charlevoix-area-wineries", title: "Charlevoix area wineries", blurb: "Bay Shore to Ellsworth, the western half of the trail" },
  { href: "/petoskey-stone-beaches", title: "Petoskey stone beaches near the wineries", blurb: "where to hunt stones between tasting stops" },
  { href: "/venues", title: "All tasting room hours", blurb: "the full directory with posted hours and call-ahead flags" },
];

const FAQ = [
  {
    q: "How many wineries are in the Petoskey Wine Region?",
    a: `The trail lists ${TRAIL.length} member wineries across Petoskey, Alanson, Bay Shore, Charlevoix, Ellsworth, Central Lake and Vanderbilt. This planner maps those ${TRAIL.length} plus ${OTHER.length} other tasting stops in the same country, for ${venues.length} in total.`,
  },
  {
    q: "Can you do the whole Petoskey wine trail in one day?",
    a: "Not comfortably. The trail stretches from Vanderbilt in the east to Ellsworth in the south, which is well over an hour end to end. Three or four stops in one cluster is a good day. The planner will tell you when a chosen set will not fit the window you set.",
  },
  {
    q: "What is the Tip of the Mitt AVA?",
    a: "It is Michigan's newest American Viticultural Area, approved in 2016, covering Charlevoix, Emmet, Cheboygan and Presque Isle counties and parts of Antrim, Otsego and Alpena. The growing season is short, so the vineyards here lean on cold hardy grapes like Marquette, Frontenac and Cayuga White rather than the Riesling and Pinot Noir of the Traverse City peninsulas.",
  },
  {
    q: "Which winery is closest to Walloon Lake?",
    a: "Walloon Lake Winery on Intertown Road is about a mile from the lake, and Boyne Valley Vineyards sits on US-131 between Walloon Lake and Boyne Falls. Rudbeckia on Lake Grove Road is in the same cluster, which makes a three stop loop out of the village.",
  },
  {
    q: "Are the tasting room hours reliable?",
    a: `Where a winery posts a weekly schedule, it is in here and the planner schedules against it. Where it does not, the stop is flagged as call ahead rather than given invented hours. As of ${HOURS_VERIFIED}, ${venues.filter((v) => !v.needsHours).length} of ${venues.length} stops publish hours we could verify.`,
  },
];

export const metadata = {
  title: "Petoskey Wine Region Map and Wine Tour Planner",
  description:
    "Interactive map of the 14 Petoskey Wine Region wineries around Walloon Lake, Petoskey, Harbor Springs and Charlevoix. Pick your stops, route real roads, and time the day against posted hours.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Petoskey Wine Region Map and Wine Tour Planner",
    description:
      "Map the 14 Petoskey Wine Region wineries from Walloon Lake to Charlevoix, then route and time a real day.",
    url: BASE,
    siteName: "Petoskey Wine Region Planner",
    type: "website",
  },
};

export default function Home() {
  const itemList = buildVenueItemList(venues);
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />

      <PlannerMount />

      <article className="prose">
        <h1>Petoskey Wine Region map and wine tour planner</h1>
        <p>
          The Petoskey Wine Region is the wine trail at the top of the mitt: {TRAIL.length} family
          wineries scattered between Walloon Lake, Petoskey, Alanson, Charlevoix and points south,
          inside the Tip of the Mitt appellation. It is a different animal from the Traverse City
          peninsulas. The stops are further apart, the grapes are cold hardy rather than classic
          cool climate, and a good day here is three or four tasting rooms in one cluster with the
          bay, a stone beach or the Tunnel of Trees worked in between them.
        </p>
        <p>
          This planner maps all {venues.length} tasting stops plus {pois.length} places worth
          stopping between them. Pick what you want, set a start time and a done by time, and it
          orders the stops into a loop, drives it on real roads, and checks each arrival against
          that place&apos;s posted hours. Anything that will not fit is called out rather than
          quietly dropped.
        </p>

        <h2>The clusters, and how to think about them</h2>
        <p>
          <strong>Petoskey and Walloon Lake.</strong> The densest group. Walloon Lake Winery,
          Rudbeckia, Resort Pike, Mackinaw Trail, Boyne Valley, Petoskey Farms and Maple Moon all
          sit within about twenty minutes of each other south and east of town. If you only have
          one afternoon, spend it here.
        </p>
        <p>
          <strong>Harbor Springs and Alanson.</strong> North and east. Pond Hill Farm sits at the
          bottom of M-119 where the Tunnel of Trees starts, and Crooked Vine and Seasons of the
          North are out toward the Inland Water Route. Pair one winery with the drive rather than
          trying to chain three.
        </p>
        <p>
          <strong>Charlevoix and south.</strong> Spare Key on Upper Bay Shore Road is the hinge
          between Petoskey and Charlevoix. Blu Dot, 1918 Cellars at Castle Farms, Royal Farms in
          Ellsworth and Cellar 1914 in Central Lake run south from there and make a longer day
          along the Chain of Lakes.
        </p>

        <h2>What grows here</h2>
        <p>
          Tip of the Mitt was approved in 2016 and is Michigan&apos;s newest appellation. The
          season is short enough that the plantings lean on cold hardy hybrids: Marquette,
          Frontenac, Frontenac Gris, Cayuga White. Several members are as much cidery and fruit
          winery as they are vineyard, and one of them is a maple sugarbush. Going in expecting
          Leelanau Riesling is the fastest way to be disappointed. Going in expecting cold country
          farm wine, cider and a lot of view is the right frame.
        </p>

        <h2>Guides</h2>
        <ul>
          {GUIDES.map((g) => (
            <li key={g.href}>
              <Link href={g.href}>{g.title}</Link>: {g.blurb}
            </li>
          ))}
        </ul>

        <VenueHours title="Tasting room hours" />
        <p className="small">
          Hours checked {HOURS_VERIFIED}. Where a stop does not publish a weekly schedule it is
          marked call ahead rather than guessed at. Seasonal closures are common here from late
          fall through spring, so confirm anything you are set on.
        </p>

        <h2>Common questions</h2>
        {FAQ.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <p className="small">
          Built by <a href="https://chrisizworski.com/">Chris Izworski</a>. Trail membership is
          tracked against the official <a href="https://petoskey.wine/">Petoskey Wine Region</a>{" "}
          list. Plan a driver before you set out.
        </p>
      </article>
    </main>
  );
}
