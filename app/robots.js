export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://petoskeywine.chrisizworski.com/sitemap.xml",
    host: "https://petoskeywine.chrisizworski.com",
  };
}
