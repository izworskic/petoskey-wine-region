export const CANONICAL_PERSON_ID = "https://chrisizworski.com/#person";

export const canonicalPerson = {
  "@type": "Person",
  "@id": CANONICAL_PERSON_ID,
  name: "Chris Izworski",
  url: "https://chrisizworski.com/",
};

export function buildCreatorPageSchema(pageUrl, pageName) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      canonicalPerson,
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageName,
        author: { "@id": CANONICAL_PERSON_ID },
        publisher: { "@id": CANONICAL_PERSON_ID },
      },
    ],
  };
}
