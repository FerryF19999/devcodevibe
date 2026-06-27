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
  title: "devcodeagency | AI-agent-native vibe coding studio for indie hackers",
  description:
    "devcodeagency is an AI-agent-native studio. Done-for-you vibe coding MVPs in 9 days, agent-ready templates, and small SaaS tools. Bilingual EN/ID. From $1,400.",
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
    title: "devcodeagency | AI-agent-native vibe coding studio",
    description:
      "Done-for-you MVPs in 9 days, agent-ready templates, small SaaS tools. Bilingual EN/ID.",
    url: SITE_URL,
    siteName: "devcodeagency",
    locale: "en_US",
    alternateLocale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "devcodeagency | vibe coding for indie hackers",
    description: "Agent-native MVPs, templates, and SaaS tools. From $1,400.",
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
          <h1>devcodeagency | AI-agent-native vibe coding studio</h1>
          <p>
            Bilingual studio for indie hackers. Done-for-you MVPs in a median of 9 days, agent-ready templates from $29,
            and small SaaS tools. Pricing: Starter Sprint $1,400, Full MVP $4,800, Async Retainer $3,200 per month.
            Founded 2024. 47 shipped MVPs. 92% repeat clients. Templates downloaded 12,400+ times. Contact
            hello@devcodeagency.dev.
          </p>
        </div>
        {children}
      </PostHogProvider>
      </body>
    </html>
  );
}
