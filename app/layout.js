import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://chrisizworski.com/petoskey-wine"),
  title: {
    default: "Petoskey Wine Region Map and Wine Tour Planner",
    template: "%s | Petoskey Wine",
  },
  description:
    "Interactive map of the Petoskey Wine Region wineries around Walloon Lake, Petoskey, Harbor Springs and Charlevoix, with routing and posted hours.",
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
