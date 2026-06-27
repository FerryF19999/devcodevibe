import type { Lang } from "./copy";
import publishedArticles from "../../content/articles.json";
import { SITE_URL } from "./site";

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
  id: "devcodeagency-growth-agent-01",
  name: "devcodeagency Growth Agent",
  role: "SEO, GEO, content, and conversion operator",
  verified: true,
  version: "1.0.0",
  scopes: ["article-drafts", "seo-audits", "geo-answer-blocks", "conversion-design-briefs"],
} as const;

export const CMS_MODES: AgentCmsMode[] = ["article", "seo", "geo", "conversion", "weekly"];

export const PUBLISHED_ARTICLES = publishedArticles as PublishedArticle[];

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
            "Agent: devcodeagency Growth Agent.",
            "Scope: artikel, SEO, GEO, design conversion.",
            "Publishing model: draft-first dengan review manusia.",
          ]
        : [
            "Brand: devcodeagency.",
            "Agent: devcodeagency Growth Agent.",
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
      mainEntityOfPage: `${SITE_URL}/journal/${slug}`,
      about: [req.keyword, "SEO", "GEO", "AI agent CMS"],
    },
  };
}
