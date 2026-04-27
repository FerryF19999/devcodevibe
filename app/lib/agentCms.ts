import type { Lang } from "./copy";

export type AgentCmsMode = "article" | "seo" | "geo" | "conversion" | "weekly";

export type AgentCmsRequest = {
  agentId?: string;
  mode?: AgentCmsMode;
  lang?: Lang;
  topic?: string;
  audience?: string;
  offer?: string;
  keyword?: string;
  intent?: string;
};

export type AgentTask = {
  title: string;
  owner: "verified-agent" | "human";
  priority: "P1" | "P2" | "P3";
  status: "ready" | "queued" | "needs-review";
};

export type AgentCmsResult = {
  agent: typeof VERIFIED_AGENT;
  mode: AgentCmsMode;
  createdAt: string;
  article: {
    slug: string;
    title: string;
    excerpt: string;
    metaDescription: string;
    readingTime: string;
    tags: string[];
    outline: string[];
    body: string[];
  };
  seo: {
    primaryKeyword: string;
    secondaryKeywords: string[];
    titleTag: string;
    metaDescription: string;
    canonicalPath: string;
    internalLinks: string[];
    technicalFixes: string[];
  };
  geo: {
    llmsSummary: string;
    entityFacts: string[];
    answerBlocks: { q: string; a: string }[];
    schemaTypes: string[];
    citationTargets: string[];
  };
  conversion: {
    heroRewrite: string;
    cta: string;
    offerFrame: string;
    designFixes: string[];
    experiment: string;
  };
  tasks: AgentTask[];
  jsonLd: Record<string, unknown>;
};

export type PublishedArticle = {
  slug: string;
  date: string;
  read: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  tags: string[];
  sections: { h: string; p: string[] }[];
  faq: { q: string; a: string }[];
};

export const VERIFIED_AGENT = {
  id: "vwc-growth-agent-01",
  name: "VWC Growth Agent",
  role: "SEO, GEO, content, and conversion operator",
  verified: true,
  version: "1.0.0",
  scopes: ["article-drafts", "seo-audits", "geo-answer-blocks", "conversion-design-briefs"],
} as const;

export const CMS_MODES: AgentCmsMode[] = ["article", "seo", "geo", "conversion", "weekly"];

export const PUBLISHED_ARTICLES: PublishedArticle[] = [
  {
    slug: "autonomous-ai-agent-cms-for-seo-geo",
    date: "2026-04-27",
    read: "7 min",
    title: "Autonomous AI Agent CMS for SEO and GEO",
    excerpt:
      "A practical operating model for one verified agent that drafts content, prepares schema, and keeps conversion work in review.",
    metaDescription:
      "How devcodeagency runs a single verified AI agent CMS for SEO, GEO, article drafts, schema, and conversion design tasks.",
    tags: ["AI agent CMS", "SEO", "GEO", "conversion"],
    sections: [
      {
        h: "Why one verified agent",
        p: [
          "Autonomous growth work gets messy when every bot can publish. devcodeagency uses one verified agent identity so every article draft, schema block, and conversion recommendation has a single accountable operator.",
          "The agent can move fast, but the website keeps a human review layer for claims, pricing, and anything that affects trust.",
        ],
      },
      {
        h: "What the agent prepares",
        p: [
          "Each run creates an article outline, title tag, meta description, canonical path, internal links, FAQ answers, entity facts, and JSON-LD. The same artifact also includes conversion notes for hero copy, CTA, offer framing, and layout fixes.",
          "This makes SEO and GEO one workflow instead of two separate checklists.",
        ],
      },
      {
        h: "How publishing stays controlled",
        p: [
          "The verified agent creates ready-to-review drafts. Production publishing should connect those drafts to a database, Git commit, or CMS collection with approvals and audit logs.",
          "That boundary keeps autonomous SEO useful without letting unreviewed AI text quietly overwrite the public site.",
        ],
      },
    ],
    faq: [
      {
        q: "Can an AI agent publish directly?",
        a: "It can prepare every artifact needed to publish, but production sites should keep review and audit logging before public changes go live.",
      },
      {
        q: "What makes this GEO-ready?",
        a: "The workflow produces answer blocks, entity facts, citation-ready summaries, and schema so AI answer engines can understand the page quickly.",
      },
    ],
  },
  {
    slug: "why-llms-txt-is-the-new-robots-txt-for-indie-saas",
    date: "2026-04-12",
    read: "6 min",
    title: "Why llms.txt is the new robots.txt for indie SaaS",
    excerpt:
      "Robots.txt tells crawlers where they may go. llms.txt gives AI systems a concise briefing on what matters.",
    metaDescription:
      "Learn why indie SaaS sites should publish llms.txt alongside robots.txt for AI agents, citations, and GEO visibility.",
    tags: ["llms.txt", "GEO", "AI search"],
    sections: [
      {
        h: "A briefing layer for agents",
        p: [
          "Robots.txt is a permission layer. llms.txt is a context layer. It gives AI systems a short, citable overview of the company, product, pricing, policies, and canonical pages.",
          "For small teams, this is the fastest way to make the site easier for agents to summarize accurately.",
        ],
      },
      {
        h: "What to include",
        p: [
          "Keep it plain text. Include the offer, audience, pricing, important URLs, contact path, and citation policy. Avoid stuffing keywords or hiding claims that do not appear on the public site.",
          "Treat the file as a briefing note that should match the visible website.",
        ],
      },
    ],
    faq: [
      {
        q: "Does llms.txt replace SEO?",
        a: "No. It supports AI readability, but technical SEO, useful content, schema, and internal links still matter.",
      },
    ],
  },
  {
    slug: "vibe-coding-without-the-slop-a-senior-engineers-checklist",
    date: "2026-04-04",
    read: "9 min",
    title: "Vibe coding without the slop: a senior engineer's checklist",
    excerpt:
      "A simple review loop for shipping with coding agents while keeping architecture, QA, and user trust intact.",
    metaDescription:
      "A senior engineer checklist for vibe coding with AI agents: scope, review, tests, accessibility, performance, and deployment.",
    tags: ["vibe coding", "QA", "AI engineering"],
    sections: [
      {
        h: "Start with a narrow surface",
        p: [
          "The best agent-assisted work starts with one clear user flow. Define the inputs, outputs, failure states, and owner before asking an agent to generate code.",
          "Small surfaces make review faster and reduce the chance that an agent changes unrelated behavior.",
        ],
      },
      {
        h: "Review behavior, not just syntax",
        p: [
          "A green build is not the finish line. Check loading states, empty states, mobile layout, form behavior, copy accuracy, accessibility, and whether the feature still matches the business promise.",
          "The senior loop is steering, testing, and simplifying.",
        ],
      },
    ],
    faq: [
      {
        q: "Is vibe coding only for prototypes?",
        a: "No. With tight scope, review, and tests, agent-assisted coding can ship production features.",
      },
    ],
  },
  {
    slug: "bahasa-first-saas-lessons-from-shipping-in-jakarta",
    date: "2026-03-27",
    read: "5 min",
    title: "Bahasa-first SaaS: lessons from shipping in Jakarta",
    excerpt:
      "Bahasa-first software is not just translation. It changes onboarding, payment assumptions, support, and trust signals.",
    metaDescription:
      "Lessons from shipping Bahasa-first SaaS in Jakarta, including UX copy, QRIS, WhatsApp checkout, support, and localization.",
    tags: ["Bahasa SaaS", "Indonesia", "localization"],
    sections: [
      {
        h: "Localization is product work",
        p: [
          "Bahasa-first SaaS needs product choices that match the market: payment rails, customer support habits, pricing clarity, and examples users recognize.",
          "Translation helps, but the bigger lift is removing friction from the local buying journey.",
        ],
      },
      {
        h: "Trust is visible",
        p: [
          "Show contact paths, clear policies, local payment options, and human support. Those signals often matter more than decorative polish.",
          "The interface should make the next step obvious without forcing users through a Western SaaS playbook.",
        ],
      },
    ],
    faq: [
      {
        q: "Should Indonesian SaaS be bilingual?",
        a: "Often yes. Bahasa builds comfort for local users, while English can help partners, investors, and international buyers.",
      },
    ],
  },
  {
    slug: "geo-vs-seo-what-changed-when-chatgpt-became-a-search-engine",
    date: "2026-03-15",
    read: "7 min",
    title: "GEO vs SEO: what changed when ChatGPT became a search engine",
    excerpt:
      "Search still matters. Generative answers add a new layer: entity clarity, citable facts, and answer-ready pages.",
    metaDescription:
      "Understand GEO vs SEO and how AI answer engines change content structure, schema, facts, and citation strategy.",
    tags: ["GEO", "SEO", "AI search"],
    sections: [
      {
        h: "SEO earns the crawl",
        p: [
          "SEO helps search engines discover, understand, and rank your pages. Fundamentals still matter: speed, crawlability, internal links, useful content, metadata, and structured data.",
          "GEO does not replace these basics. It builds on them.",
        ],
      },
      {
        h: "GEO earns the answer",
        p: [
          "Generative engines prefer pages that make entities, facts, policies, pricing, and comparisons easy to extract. Clear summaries, FAQ blocks, schema, and llms.txt help.",
          "The goal is not keyword stuffing. The goal is being easy to cite accurately.",
        ],
      },
    ],
    faq: [
      {
        q: "What is the simplest GEO improvement?",
        a: "Add concise answer blocks, JSON-LD, and a plain-language summary that matches the visible page.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return PUBLISHED_ARTICLES.find((article) => article.slug === slug);
}

export function normalizeCmsRequest(input: AgentCmsRequest): Required<AgentCmsRequest> {
  return {
    agentId: input.agentId || VERIFIED_AGENT.id,
    mode: input.mode && CMS_MODES.includes(input.mode) ? input.mode : "weekly",
    lang: input.lang === "id" ? "id" : "en",
    topic: (input.topic || "autonomous SEO and GEO for devcodeagency").trim().slice(0, 140),
    audience: (input.audience || "indie hackers who want MVPs shipped fast").trim().slice(0, 140),
    offer: (input.offer || "verified AI agent CMS plus human-reviewed shipping").trim().slice(0, 140),
    keyword: (input.keyword || "AI agent CMS").trim().slice(0, 80),
    intent: (input.intent || "commercial investigation").trim().slice(0, 120),
  };
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

export function buildCmsPrompt(req: Required<AgentCmsRequest>) {
  const language = req.lang === "id" ? "Bahasa Indonesia" : "English";
  return [
    `You are ${VERIFIED_AGENT.name}, the only verified growth agent for devcodeagency.`,
    `Return ONLY valid minified JSON matching this shape: {"article":{"slug":string,"title":string,"excerpt":string,"metaDescription":string,"readingTime":string,"tags":string[],"outline":string[],"body":string[]},"seo":{"primaryKeyword":string,"secondaryKeywords":string[],"titleTag":string,"metaDescription":string,"canonicalPath":string,"internalLinks":string[],"technicalFixes":string[]},"geo":{"llmsSummary":string,"entityFacts":string[],"answerBlocks":[{"q":string,"a":string}],"schemaTypes":string[],"citationTargets":string[]},"conversion":{"heroRewrite":string,"cta":string,"offerFrame":string,"designFixes":string[],"experiment":string},"tasks":[{"title":string,"owner":"verified-agent"|"human","priority":"P1"|"P2"|"P3","status":"ready"|"queued"|"needs-review"}],"jsonLd":object}.`,
    `Language: ${language}. Mode: ${req.mode}. Topic: ${req.topic}. Primary keyword: ${req.keyword}. Audience: ${req.audience}. Offer: ${req.offer}. Intent: ${req.intent}.`,
    "Keep claims conservative. Do not invent external metrics. Optimize for SEO, GEO, and conversion review.",
  ].join("\n");
}

export function createFallbackCmsResult(input: AgentCmsRequest): AgentCmsResult {
  const req = normalizeCmsRequest(input);
  const isId = req.lang === "id";
  const slug = slugify(`${req.topic} ${req.keyword}`) || "verified-agent-cms";
  const title = isId
    ? `CMS AI Agent terverifikasi untuk ${req.topic}`
    : `Verified AI Agent CMS for ${req.topic}`;
  const metaDescription = isId
    ? `Draft SEO/GEO untuk ${req.topic}: artikel, schema, answer block, internal link, dan rekomendasi konversi.`
    : `SEO/GEO draft for ${req.topic}: article, schema, answer blocks, internal links, and conversion recommendations.`;

  const body = isId
    ? [
        `devcodeagency memakai satu AI agent terverifikasi untuk menjaga fokus: satu operator, satu identitas, dan satu antrian kerja untuk artikel, SEO, GEO, dan konversi.`,
        `Untuk topik "${req.topic}", agent menyiapkan draft yang bisa direview manusia: title tag, meta description, outline artikel, blok FAQ, entity facts, JSON-LD, dan rekomendasi design yang mendorong CTA.`,
        `Mode autonomous sebaiknya berjalan sebagai draft-first workflow. Agent boleh membuat dan memprioritaskan pekerjaan, tetapi perubahan publik tetap perlu approval untuk klaim, harga, dan positioning.`,
      ]
    : [
        `devcodeagency uses one verified AI agent to keep growth operations accountable: one operator, one identity, and one queue for articles, SEO, GEO, and conversion work.`,
        `For "${req.topic}", the agent prepares a human-reviewable draft: title tag, meta description, article outline, FAQ blocks, entity facts, JSON-LD, and design recommendations that support the primary CTA.`,
        `Autonomous mode should run as a draft-first workflow. The agent can create and prioritize work, while public changes still get review for claims, pricing, and positioning.`,
      ];

  return {
    agent: VERIFIED_AGENT,
    mode: req.mode,
    createdAt: new Date().toISOString(),
    article: {
      slug,
      title,
      excerpt: isId
        ? `Draft siap review untuk menjalankan ${req.keyword} dengan satu agent terverifikasi.`
        : `A review-ready draft for running ${req.keyword} with one verified agent.`,
      metaDescription,
      readingTime: isId ? "6 mnt" : "6 min",
      tags: [req.keyword, "SEO", "GEO", isId ? "konversi" : "conversion"],
      outline: isId
        ? ["Masalah growth autonomous", "Satu agent terverifikasi", "Artikel + schema + GEO", "Review konversi", "Antrian publikasi"]
        : ["The autonomous growth problem", "One verified agent", "Article + schema + GEO", "Conversion review", "Publishing queue"],
      body,
    },
    seo: {
      primaryKeyword: req.keyword,
      secondaryKeywords: isId
        ? ["AI agent SEO", "GEO untuk website", "CMS autonomous", "artikel SEO"]
        : ["AI SEO agent", "GEO website", "autonomous CMS", "SEO article workflow"],
      titleTag: title.slice(0, 58),
      metaDescription,
      canonicalPath: `/journal/${slug}`,
      internalLinks: ["/", "/journal", "/llms.txt", "/agent.json", "/openapi.json"],
      technicalFixes: isId
        ? [
            "Pastikan sitemap memuat URL artikel baru.",
            "Tambahkan FAQ JSON-LD untuk answer engine.",
            "Gunakan canonical path yang konsisten.",
            "Review title tag di bawah 60 karakter.",
          ]
        : [
            "Add the new article URL to the sitemap.",
            "Include FAQ JSON-LD for answer engines.",
            "Use a consistent canonical path.",
            "Keep the title tag under 60 characters.",
          ],
    },
    geo: {
      llmsSummary: isId
        ? `devcodeagency menjalankan CMS dengan satu AI agent terverifikasi untuk membuat draft artikel, SEO metadata, GEO answer blocks, schema, dan rekomendasi konversi.`
        : `devcodeagency runs a CMS with one verified AI agent that prepares article drafts, SEO metadata, GEO answer blocks, schema, and conversion recommendations.`,
      entityFacts: isId
        ? [
            "Brand: devcodeagency.",
            "Agent: VWC Growth Agent.",
            "Scope: artikel, SEO, GEO, design conversion.",
            "Publishing model: draft-first dengan review manusia.",
          ]
        : [
            "Brand: devcodeagency.",
            "Agent: VWC Growth Agent.",
            "Scope: articles, SEO, GEO, conversion design.",
            "Publishing model: draft-first with human review.",
          ],
      answerBlocks: isId
        ? [
            {
              q: "Apa fungsi AI Agent CMS?",
              a: "AI Agent CMS menyiapkan draft artikel, metadata SEO, schema, answer blocks, dan rekomendasi conversion untuk direview sebelum publish.",
            },
            {
              q: "Kenapa hanya satu agent?",
              a: "Satu agent membuat ownership jelas, mengurangi konflik konten, dan memudahkan audit perubahan SEO/GEO.",
            },
          ]
        : [
            {
              q: "What does the AI Agent CMS do?",
              a: "It prepares article drafts, SEO metadata, schema, answer blocks, and conversion recommendations for review before publishing.",
            },
            {
              q: "Why only one agent?",
              a: "One agent keeps ownership clear, reduces content conflicts, and makes SEO/GEO changes easier to audit.",
            },
          ],
      schemaTypes: ["Article", "FAQPage", "Organization", "WebSite"],
      citationTargets: ["/llms.txt", "/agent.json", `/journal/${slug}`],
    },
    conversion: {
      heroRewrite: isId
        ? "Jalankan SEO dan GEO dengan satu AI agent terverifikasi, tetap manusia yang approve."
        : "Run SEO and GEO with one verified AI agent, while humans approve what ships.",
      cta: isId ? "Jalankan agent" : "Run the agent",
      offerFrame: isId
        ? `${req.offer}: agent bikin draft, manusia review, website tetap konsisten.`
        : `${req.offer}: the agent drafts, humans review, and the website stays consistent.`,
      designFixes: isId
        ? [
            "Tampilkan status verified agent di atas fold.",
            "Buat CTA utama menuju CMS dan lead form.",
            "Pisahkan artifact SEO/GEO/conversion agar mudah discan.",
            "Tambahkan success state untuk form email.",
          ]
        : [
            "Show verified agent status above the fold.",
            "Route the primary CTA to the CMS and lead form.",
            "Separate SEO/GEO/conversion artifacts for scanning.",
            "Add a success state to the email form.",
          ],
      experiment: isId
        ? "A/B test hero CTA: 'Mulai Vibing' vs 'Jalankan agent SEO'."
        : "A/B test hero CTA: 'Start Vibing' vs 'Run the SEO agent'.",
    },
    tasks: isId
      ? [
          { title: "Publish draft artikel setelah review", owner: "human", priority: "P1", status: "needs-review" },
          { title: "Tambahkan canonical dan sitemap", owner: "verified-agent", priority: "P1", status: "ready" },
          { title: "Update llms.txt dengan ringkasan baru", owner: "verified-agent", priority: "P2", status: "queued" },
          { title: "Review hero CTA untuk conversion", owner: "human", priority: "P2", status: "needs-review" },
        ]
      : [
          { title: "Publish article draft after review", owner: "human", priority: "P1", status: "needs-review" },
          { title: "Add canonical and sitemap entry", owner: "verified-agent", priority: "P1", status: "ready" },
          { title: "Update llms.txt with the new summary", owner: "verified-agent", priority: "P2", status: "queued" },
          { title: "Review hero CTA for conversion", owner: "human", priority: "P2", status: "needs-review" },
        ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: metaDescription,
      author: {
        "@type": "Organization",
        name: VERIFIED_AGENT.name,
      },
      publisher: {
        "@type": "Organization",
        name: "devcodeagency",
      },
      mainEntityOfPage: `https://devcodeagency.dev/journal/${slug}`,
      about: [req.keyword, "SEO", "GEO", "AI agent CMS"],
    },
  };
}
