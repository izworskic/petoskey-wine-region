import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://petoskeywine.chrisizworski.com"),
  title: {
    default: "Petoskey Wine Region Map and Wine Tour Planner",
    template: "%s | Petoskey Wine Region Planner",
  },
  description:
    "Interactive map of the 14 Petoskey Wine Region wineries around Walloon Lake, Petoskey, Harbor Springs and Charlevoix, with real-road routing and posted tasting room hours.",
  authors: [{ name: "Chris Izworski", url: "https://chrisizworski.com/" }],
  creator: "Chris Izworski",
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
