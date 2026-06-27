import { CONTACT_EMAIL, OG_IMAGE_URL, SITE_URL } from "../lib/site";

const ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "devcodeagency",
  alternateName: "VWC",
  url: SITE_URL,
  logo: OG_IMAGE_URL,
  description:
    "AI-agent-native studio offering done-for-you vibe coding services, agent-ready templates, and small SaaS tools for indie hackers. Bilingual English / Bahasa Indonesia.",
  foundingDate: "2024",
  email: CONTACT_EMAIL,
  knowsLanguage: ["en", "id"],
  areaServed: "Worldwide",
  sameAs: ["https://twitter.com/devcodeagency", "https://github.com/devcodeagency"],
};

const SERVICE = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "devcodeagency",
  priceRange: "$$",
  image: OG_IMAGE_URL,
  url: SITE_URL,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Vibe coding services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Starter Sprint",
          description: "One-week done-for-you sprint shipping a single production-ready surface.",
        },
        price: "1400",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full MVP Build",
          description: "Two to three week MVP build with web app, auth, payments, and an agent layer.",
        },
        price: "4800",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Async Retainer",
          description: "Monthly async pair-programming with humans and AI agents.",
        },
        price: "3200",
        priceCurrency: "USD",
      },
    ],
  },
};

const FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is vibe coding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vibe coding is shipping software by collaborating with AI coding agents: describing intent in natural language, then steering, reviewing, and refactoring what they produce. devcodeagency pairs this with senior human engineers so output is production-grade, not throwaway.",
      },
    },
    {
      "@type": "Question",
      name: "What does AI-agent-native mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It means the site is structured so AI agents (ChatGPT, Claude, Perplexity, custom bots) can read, cite, and transact with it: JSON-LD for every entity, an llms.txt context file, an agent.json capability manifest, and a documented /api/agent endpoint.",
      },
    },
    {
      "@type": "Question",
      name: "How fast can devcodeagency ship?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Median ship time across 47 projects is 9 days from kickoff to production. A starter sprint is 5–7 days; a full MVP is 14–21 days.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work in Bahasa Indonesia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The studio is bilingual EN/ID. Briefs, Slack, code comments, and customer-facing copy can all be in Bahasa. We ship Bahasa-first templates like Warungkit.",
      },
    },
    {
      "@type": "Question",
      name: "How much does devcodeagency cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Starter Sprint is $1,400 (one week). Full MVP is $4,800 (two to three weeks). Async Retainer is $3,200 per month.",
      },
    },
    {
      "@type": "Question",
      name: "Can an AI agent buy a template directly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. POST to /api/agent/checkout with a SKU and return URL. The current endpoint prepares a checkout handoff; connect a live payment provider for automatic payment and license delivery.",
      },
    },
    {
      "@type": "Question",
      name: "How do you optimize for ChatGPT and Perplexity (GEO)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Concise TL;DR blocks, Q&A schema, citable statistics, clean HTML structure, and an llms.txt context file. We measure a 3.4x lift in AI-engine citations for client sites within 60 days.",
      },
    },
  ],
};

const PRODUCTS = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "devcodeagency Marketplace",
  itemListElement: [
    { "@type": "Product", sku: "VWC-001", name: "Quietkit", description: "Calm-tech SaaS starter. Next.js 15, Stripe, Resend, agent endpoint.", offers: { "@type": "Offer", price: "89", priceCurrency: "USD" } },
    { "@type": "Product", sku: "VWC-002", name: "Warungkit", description: "UMKM commerce template. Bahasa-first, WhatsApp checkout, QRIS.", offers: { "@type": "Offer", price: "69", priceCurrency: "USD" } },
    { "@type": "Product", sku: "VWC-003", name: "Agentpost", description: "Headless blog tuned for GEO. JSON-LD per post, llms.txt generator.", offers: { "@type": "Offer", price: "49", priceCurrency: "USD" } },
    { "@type": "Product", sku: "VWC-004", name: "Pocketboard", description: "Mobile-first dashboard kit. Expo + tRPC + Drizzle.", offers: { "@type": "Offer", price: "129", priceCurrency: "USD" } },
    { "@type": "Product", sku: "VWC-005", name: "Schemaforge", description: "Drop-in component to render any Schema.org type.", offers: { "@type": "Offer", price: "29", priceCurrency: "USD" } },
    { "@type": "Product", sku: "VWC-006", name: "Voicepage", description: "Voice-search optimized landing kit with spoken-form FAQs.", offers: { "@type": "Offer", price: "59", priceCurrency: "USD" } },
  ],
};

const SITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "devcodeagency",
  url: SITE_URL,
  inLanguage: ["en", "id"],
};

const TLDR = {
  summary:
    "devcodeagency is a bilingual (EN/ID) AI-agent-native studio that builds MVPs in a median of 9 days, sells agent-ready templates from $29, and ships small SaaS tools. Pricing: Starter Sprint $1,400, Full MVP $4,800, Async Retainer $3,200/mo.",
  topics: ["vibe coding", "AI agent native", "indie hacker", "MVP", "templates", "GEO", "llms.txt"],
};

export function JsonLd() {
  const blocks: Array<[string, unknown]> = [
    ["application/ld+json", ORG],
    ["application/ld+json", SERVICE],
    ["application/ld+json", FAQ],
    ["application/ld+json", PRODUCTS],
    ["application/ld+json", SITE],
  ];
  return (
    <>
      {blocks.map(([type, data], i) => (
        <script
          key={i}
          type={type}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <script
        type="application/json"
        id="tldr"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TLDR) }}
      />
    </>
  );
}
