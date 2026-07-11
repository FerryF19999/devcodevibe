import { CONTACT_EMAIL, OG_IMAGE_URL, SITE_URL } from "../lib/site";

const ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "devcodeagency",
  alternateName: "VWC",
  url: SITE_URL,
  logo: OG_IMAGE_URL,
  description:
    "Website studio for static Drop previews, Codex-powered building with weighted token usage, and monthly developer support. Bilingual English and Bahasa Indonesia.",
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
    name: "Website building services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Starter Credits",
          description: "800K weighted-token beta pack for Codex-powered website work.",
        },
        price: "100000",
        priceCurrency: "IDR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Builder Credits",
          description: "4M weighted-token beta pack for iterative Codex-powered website work.",
        },
        price: "450000",
        priceCurrency: "IDR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Hire Dev",
          description: "Monthly human developer support with 20 engineering hours and weekly shipped updates.",
        },
        price: "6000000",
        priceCurrency: "IDR",
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
      name: "How much does it cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Static Drop is free. Beta Codex usage packs start at Rp100,000 for 800K weighted tokens. Monthly Hire Dev starts at Rp6 million, with token usage purchased separately.",
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
  name: "devcodeagency Website Starters",
  itemListElement: [
    { "@type": "CreativeWork", name: "Product Launch", description: "Starter for product launches and new feature announcements." },
    { "@type": "CreativeWork", name: "Creative Portfolio", description: "Starter for personal work, case studies, and services." },
    { "@type": "CreativeWork", name: "Local Business", description: "Starter for local businesses with contact and location details." },
    { "@type": "CreativeWork", name: "SaaS Waitlist", description: "Starter for collecting early product interest." },
    { "@type": "CreativeWork", name: "Event Page", description: "Starter for events, schedules, speakers, and registration." },
    { "@type": "CreativeWork", name: "Documentation", description: "Starter for product guides and technical documentation." },
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
    "devcodeagency turns static folders or ZIP files into temporary live previews, then supports Codex-powered website building with weighted token usage or a monthly human developer. Beta packs start at 800K tokens for Rp100,000 and Hire Dev starts at Rp6 million per month.",
  topics: ["static website deployment", "live preview", "Codex", "token usage", "website starters", "hire developer"],
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
