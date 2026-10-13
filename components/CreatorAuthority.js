import { buildCreatorPageSchema } from "@/lib/creator-schema";

export default function CreatorAuthority({ pageUrl, pageName }) {
  const schema = buildCreatorPageSchema(pageUrl, pageName);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <p className="small">
        Built by{" "}
        <a href="https://chrisizworski.com/chris-izworski/" rel="author">Chris Izworski</a>,
        a Michigan wine-country visitor and trip-tool builder. We return to Michigan wine country often;
        our aim is a wine day with unhurried stops, a sensible drive, and room to explore.
        Winery information comes from the published source records, not from a claim that we personally
        visited or tasted at every stop. More tools are at{" "}
        <a href="https://chrisizworski.com/tools/">the Tools hub</a>.
      </p>
    </>
  );
}
