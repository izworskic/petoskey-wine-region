/** @type {import('next').NextConfig} */
// The tool ships as a static export vendored into the chrisizworski.com hub at
// /petoskey-wine/. The hub is a static site, not a Next app, so nothing here can
// rely on a Next server at runtime. The one server dependency, the routing
// proxy, lives in the hub as api/petoskey-route.js.
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/petoskey-wine",
  trailingSlash: true,
  images: { unoptimized: true },
};
module.exports = nextConfig;
