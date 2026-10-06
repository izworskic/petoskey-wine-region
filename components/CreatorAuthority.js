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
        <a href="https://chrisizworski.com/chris-izworski/">Chris Izworski</a>. More Northern
        Michigan planning tools are at{" "}
        <a href="https://chrisizworski.com/tools/">the Tools hub</a>.
      </p>
    </>
  );
}
