import type { Metadata } from "next";
import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { JsonLd } from "./components/JsonLd";
import { PostHogProvider } from "./components/PostHogProvider";
import { SITE_URL } from "./lib/site";
import "./globals.css";

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--sans",
  display: "optional",
});

const serif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--serif",
  display: "optional",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--mono",
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "devcodeagency | Drop, preview, and build websites with Codex",
  description:
    "Drop a static folder or ZIP for an instant live preview, then build with Codex using token-based usage or hire a developer monthly.",
  keywords: [
    "vibe coding",
    "AI agent native",
    "indie hacker MVP",
    "agent-ready templates",
    "llms.txt",
    "JSON-LD",
    "GEO",
    "generative engine optimization",
    "vibe coding Indonesia",
    "jasa vibe coding",
  ],
  authors: [{ name: "devcodeagency" }],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      id: "/id",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    title: "devcodeagency | Drop and build websites with Codex",
    description:
      "Drop static files for a live preview, continue with Codex, or hire a developer monthly.",
    url: SITE_URL,
    siteName: "devcodeagency",
    locale: "en_US",
    alternateLocale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "devcodeagency | Drop and build with Codex",
    description: "Static Drop, live preview, token-based Codex usage, and monthly Hire Dev.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${serif.variable} ${mono.variable}`}>
      <head>
        <link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt" />
        <link rel="alternate" type="application/json" title="agent.json" href="/agent.json" />
        <JsonLd />
      </head>
      <body>
      <PostHogProvider>
        <div className="sr-only">
          <h1>devcodeagency | Drop, preview, and build websites with Codex</h1>
          <p>
            Drop a static folder or ZIP for a temporary live preview. Continue building with Codex using weighted token usage,
            or hire a human developer from Rp6 million per month. Beta packs start at 800K tokens for Rp100,000.
            Contact hello@devcodeagency.dev.
          </p>
        </div>
        {children}
      </PostHogProvider>
      </body>
    </html>
  );
}
