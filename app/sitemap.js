import venues from "@/data/venues.json";

const BASE = "https://petoskeywine.chrisizworski.com";
const UPDATED = new Date("2026-09-18");

export default function sitemap() {
  const pages = [
    "",
    "/petoskey-wine-region-trail",
    "/walloon-lake-wineries",
    "/tunnel-of-trees-wine-tour",
    "/charlevoix-area-wineries",
    "/petoskey-stone-beaches",
    "/petoskey-distilleries",
    "/venues",
  ].map((p) => ({
    url: BASE + p,
    lastModified: UPDATED,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
  const wineries = venues.map((v) => ({
    url: `${BASE}/winery/${v.id}`,
    lastModified: UPDATED,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return pages.concat(wineries);
}
