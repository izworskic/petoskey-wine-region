import venues from "@/data/venues.json";

export const BASE = "https://petoskeywine.chrisizworski.com";

const TYPE = {
  winery: "Winery",
  brewery: "Brewery",
  cidery: "FoodEstablishment",
  distillery: "Distillery",
};

export function venueSchema(v) {
  const node = {
    "@type": ["LocalBusiness", TYPE[v.category] || "LocalBusiness"],
    "@id": `${BASE}/winery/${v.id}#business`,
    name: v.name,
    url: `${BASE}/winery/${v.id}`,
    geo: { "@type": "GeoCoordinates", latitude: v.lat, longitude: v.lng },
    address: {
      "@type": "PostalAddress",
      streetAddress: v.address || undefined,
      addressLocality: v.town,
      addressRegion: "MI",
      addressCountry: "US",
    },
  };
  if (v.phone) node.telephone = v.phone;
  if (v.website) node.sameAs = [v.website];
  const spec = Object.entries(v.hours || {}).map(([day, h]) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${day}`,
    opens: h.open,
    closes: h.close,
  }));
  if (spec.length) node.openingHoursSpecification = spec;
  return node;
}

export function buildVenueItemList(list = venues, name = "Petoskey Wine Region tasting rooms") {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: list.length,
    itemListElement: list.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: venueSchema(v),
    })),
  };
}
