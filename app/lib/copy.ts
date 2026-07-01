export type Lang = "en" | "id";

export type Copy = {
  nav: { services: string; cms: string; marketplace: string; tools: string; pricing: string; cases: string; faq: string; blog: string };
  badge: string;
  h1a: string;
  h1b: string;
  sub: string;
  cta: string;
  cta2: string;
  heroLabel: string;
  heroPrompt: string;
  sectionTagline: { services: string; agent: string; market: string; tools: string; pricing: string; cases: string; voices: string; llms: string; faq: string; blog: string };
  servicesH: string;
  services: { k: string; t: string; d: string; price: string }[];
  agentH: string;
  agentSub: string;
  agentSuggest: string[];
  marketH: string;
  marketSub: string;
  market: { sku: string; t: string; d: string; price: string; tag: string }[];
  toolsH: string;
  tools: { t: string; d: string; price: string }[];
  pricingH: string;
  pricing: { t: string; p: string; per: string; l: string[]; featured?: boolean }[];
  casesH: string;
  cases: { y: string; c: string; d: string; tag: string }[];
  voicesH: string;
  voices: { q: string; a: string }[];
  llmsH: string;
  llmsSub: string;
  llmsFiles: { f: string; d: string }[];
  faqH: string;
  faq: { q: string; a: string }[];
  blogH: string;
  blog: { d: string; t: string; read: string; slug: string }[];
  footerTag: string;
  footerCols: { h: string; l: string[] }[];
};

export const COPY: Record<Lang, Copy> = {
  en: {
    nav: { services: "Services", cms: "AI CMS", marketplace: "Marketplace", tools: "Tools", pricing: "Pricing", cases: "Work", faq: "FAQ", blog: "Journal" },
    badge: "AI-AGENT-NATIVE STUDIO · EST. 2024",
    h1a: "Ship the product",
    h1b: "the agents already understand.",
    sub: "devcodeagency is a small studio that builds done-for-you MVPs, sells agent-ready templates, and ships sharp little SaaS for indie hackers. Bilingual. Remote. Shipped 47 products. Median 9 days.",
    cta: "Start Vibing",
    cta2: "Talk to the agent",
    heroLabel: "// LIVE / generating site.tsx",
    heroPrompt: "build a landing page for a calm-tech journaling app, agent-ready",
    sectionTagline: { services: "01 / SERVICES", agent: "02 / AGENT DEMO", market: "04 / MARKETPLACE", tools: "06 / TOOLS", pricing: "07 / PRICING", cases: "08 / SELECTED WORK", voices: "09 / VOICES", llms: "10 / FOR AGENTS", faq: "11 / FAQ", blog: "12 / JOURNAL" },
    servicesH: "Three ways we build with you.",
    services: [
      { k: "DFY/01", t: "Done-for-you sprint", d: "One week. One surface. We pair senior engineers with coding agents to ship a polished slice of your product: production grade, not a prototype.", price: "from $1,400" },
      { k: "DFY/02", t: "Full MVP build", d: "Two to three weeks. Web app, auth, payments, agent layer, JSON-LD, analytics. You get the repo, the deploy keys, and a Loom walkthrough.", price: "from $4,800" },
      { k: "DFY/03", t: "Async retainer", d: "Async pair-programming, monthly. Your roadmap, our humans + agents. Ship something real every week.", price: "$3,200/mo" }
    ],
    agentH: "Try the agent. It actually does things.",
    agentSub: "Ask in plain English or Bahasa. The assistant can quote work, draft a brief, recommend a template, or schedule a kickoff. It's the same endpoint other agents call.",
    agentSuggest: ["I need a landing page in 5 days under $1,500", "Recommend a template for an UMKM directory", "Draft a brief for a Stripe-powered SaaS MVP", "What's your fastest ship time?"],
    marketH: "Templates, agent-ready out of the box.",
    marketSub: "Every template ships with typed APIs, JSON-LD, llms.txt, and an /agent.json manifest. Buy once, fork forever.",
    market: [
      { sku: "VWC-001", t: "Quietkit", d: "Calm-tech SaaS starter. Next.js 15, Stripe, Resend, agent endpoint.", price: "$89", tag: "BESTSELLER" },
      { sku: "VWC-002", t: "Warungkit", d: "UMKM commerce template. Bahasa-first, WhatsApp checkout, QRIS.", price: "$69", tag: "ID" },
      { sku: "VWC-003", t: "Agentpost", d: "Headless blog tuned for GEO. JSON-LD per post, llms.txt generator.", price: "$49", tag: "SEO" },
      { sku: "VWC-004", t: "Pocketboard", d: "Mobile-first dashboard kit. Expo + tRPC + Drizzle.", price: "$129", tag: "NEW" },
      { sku: "VWC-005", t: "Schemaforge", d: "Drop-in component to render any Schema.org type.", price: "$29", tag: "UTILITY" },
      { sku: "VWC-006", t: "Voicepage", d: "Voice-search optimized landing kit. Spoken-form FAQs.", price: "$59", tag: "VOICE" }
    ],
    toolsH: "Tiny tools we ship as we work.",
    tools: [
      { t: "Schema Forge", d: "Generate, validate, and embed JSON-LD in one paste.", price: "Free" },
      { t: "llms.txt Builder", d: "Turn your sitemap into a clean llms.txt in 10 seconds.", price: "Free" },
      { t: "Agent Checkout SDK", d: "Let other agents buy your products with one POST.", price: "$19/mo" }
    ],
    pricingH: "Honest pricing. No retainers in disguise.",
    pricing: [
      { t: "Starter Sprint", p: "$1,400", per: "one week", l: ["1 surface (landing, dashboard, or feature)", "Production-ready code, your repo", "Agent-readable JSON-LD + llms.txt", "1 round of revisions"] },
      { t: "Full MVP", p: "$4,800", per: "two to three weeks", l: ["Web app, auth, payments", "Agent endpoint + /agent.json", "GEO + SEO baseline", "Loom walkthrough + 30 days support"], featured: true },
      { t: "Async Retainer", p: "$3,200", per: "per month", l: ["Async pair-programming", "Weekly shipped slice", "Slack + Linear", "Cancel anytime"] }
    ],
    casesH: "Selected work, lightly redacted.",
    cases: [
      { y: "26", c: "EMVEEP Technical SEO", d: "Health Score 100, GTmetrix D > A, 1,512 URLs crawled", tag: "SEO, Speed, GEO" },
      { y: "26", c: "EMVEEP Content & GEO", d: "1K active users, 384+ leads, AI Search visibility", tag: "Content Strategy" },
      { y: "26", c: "Firefly Laser Bali", d: "#1 organic rankings and 150+ bookings/month", tag: "Local SEO" },
      { y: "26", c: "Page Speed Optimization", d: "GTmetrix Grade A, 85% performance, 97% structure", tag: "Core Web Vitals" }
    ],
    voicesH: "What founders said.",
    voices: [
      { q: "Shipped in 8 days what an agency quoted us 14 weeks for. The agent layer alone closed two enterprise deals.", a: "Maya R., founder, Quietnote" },
      { q: "First studio that didn't ask me to translate my Bahasa briefs. They just got it. Site ranks in ChatGPT for our category.", a: "Bagas P., founder, Tokopanen" },
      { q: "I bought one template, then the retainer, then sent three friends. The JSON-LD baseline is worth the price by itself.", a: "Devon L., solo founder" }
    ],
    llmsH: "Built for the agents reading this page right now.",
    llmsSub: "Every site we ship, including this one, exposes machine-readable contracts: llms.txt for context, agent.json for capabilities, JSON-LD for structure, and a documented /api/agent endpoint. Hand the URL to ChatGPT, Claude, or Perplexity and it just works.",
    llmsFiles: [
      { f: "/llms.txt", d: "Site overview, services, citable facts, agent policies." },
      { f: "/agent.json", d: "Capabilities manifest with endpoints and pricing." },
      { f: "/ai.txt", d: "Training & citation policy (allow-with-attribution)." },
      { f: "/sitemap.xml", d: "Hreflang-tagged, weekly refreshed." }
    ],
    faqH: "Questions agents and humans both ask.",
    faq: [
      { q: "What is vibe coding?", a: "Vibe coding is shipping software by collaborating with AI coding agents: describing intent in natural language, then steering, reviewing, and refactoring what they produce. We pair this with senior human engineers so the output is production-grade, not throwaway." },
      { q: "What does AI-agent-native mean?", a: "It means the site is structured so AI agents (ChatGPT, Claude, Perplexity, custom bots) can read, cite, and transact with it. We ship JSON-LD for every entity, an llms.txt context file, an agent.json capability manifest, and a documented /api/agent endpoint." },
      { q: "How fast can you ship?", a: "Median ship time across 47 projects is 9 days from kickoff to production. A starter sprint is 5–7 days; a full MVP is 14–21 days." },
      { q: "Do you work in Bahasa Indonesia?", a: "Yes. The studio is bilingual EN/ID. Briefs, Slack, code comments, and customer-facing copy can all be in Bahasa. We ship Bahasa-first templates like Warungkit." },
      { q: "How much does it cost?", a: "Starter Sprint is $1,400 (one week). Full MVP is $4,800 (two to three weeks). Async Retainer is $3,200/month. No hidden fees, no setup costs." },
      { q: "Can an AI agent buy a template directly?", a: "Yes. POST to /api/agent/checkout with a SKU and return URL. The endpoint prepares a checkout handoff; connect a live payment provider for automatic payment and license delivery." },
      { q: "How do you optimize for ChatGPT and Perplexity (GEO)?", a: "Concise TL;DR blocks, Q&A schema, citable statistics, clean HTML structure, and an llms.txt context file. We've measured a 3.4x lift in AI-engine citations for client sites within 60 days." }
    ],
    blogH: "Recent journal entries.",
    blog: [
      { d: "2026-04-27", t: "Autonomous AI Agent CMS for SEO and GEO", read: "7 min", slug: "autonomous-ai-agent-cms-for-seo-geo" },
      { d: "2026-04-12", t: "Why llms.txt is the new robots.txt for indie SaaS", read: "6 min", slug: "why-llms-txt-is-the-new-robots-txt-for-indie-saas" },
      { d: "2026-04-04", t: "Vibe coding without the slop: a senior engineer's checklist", read: "9 min", slug: "vibe-coding-without-the-slop-a-senior-engineers-checklist" },
      { d: "2026-03-27", t: "Bahasa-first SaaS: lessons from shipping in Jakarta", read: "5 min", slug: "bahasa-first-saas-lessons-from-shipping-in-jakarta" }
    ],
    footerTag: "devcodeagency, a small studio for indie hackers shipping with agents.",
    footerCols: [
      { h: "Studio", l: ["Services", "Marketplace", "Tools", "Pricing"] },
      { h: "Work", l: ["Case studies", "Testimonials", "Journal", "Changelog"] },
      { h: "For agents", l: ["llms.txt", "agent.json", "ai.txt", "/api/agent"] },
      { h: "Contact", l: ["hello@devcodeagency.dev", "Book a kickoff", "EN / ID", "Remote"] }
    ]
  },
  id: {
    nav: { services: "Layanan", cms: "AI CMS", marketplace: "Marketplace", tools: "Tools", pricing: "Harga", cases: "Karya", faq: "FAQ", blog: "Jurnal" },
    badge: "STUDIO AI-AGENT-NATIVE · SEJAK 2024",
    h1a: "Kirim produk",
    h1b: "yang sudah dimengerti agent.",
    sub: "devcodeagency adalah studio kecil yang membangun MVP done-for-you, menjual template siap-agent, dan merilis SaaS tajam untuk indie hacker. Dwibahasa. Remote. 47 produk dirilis. Median 9 hari.",
    cta: "Mulai Vibing",
    cta2: "Tanya agent-nya",
    heroLabel: "// LIVE / membuat site.tsx",
    heroPrompt: "buat landing page untuk app jurnal calm-tech, siap-agent",
    sectionTagline: { services: "01 / LAYANAN", agent: "02 / DEMO AGENT", market: "04 / MARKETPLACE", tools: "06 / TOOLS", pricing: "07 / HARGA", cases: "08 / KARYA TERPILIH", voices: "09 / SUARA", llms: "10 / UNTUK AGENT", faq: "11 / FAQ", blog: "12 / JURNAL" },
    servicesH: "Tiga cara kami bangun bareng kamu.",
    services: [
      { k: "DFY/01", t: "Sprint done-for-you", d: "Satu minggu. Satu permukaan. Engineer senior + agent coding untuk satu slice produk yang siap produksi, bukan prototipe.", price: "mulai $1,400" },
      { k: "DFY/02", t: "Bangun MVP penuh", d: "Dua sampai tiga minggu. Web app, auth, pembayaran, agent layer, JSON-LD, analytics. Repo, deploy key, dan Loom walkthrough kamu pegang.", price: "mulai $4,800" },
      { k: "DFY/03", t: "Retainer async", d: "Pair-programming async tiap bulan. Roadmap kamu, manusia + agent kami. Setiap minggu ada yang dirilis.", price: "$3,200/bln" }
    ],
    agentH: "Coba agent-nya. Beneran bisa eksekusi.",
    agentSub: "Tanya pakai Bahasa atau Inggris. Asisten bisa kasih quote, draft brief, rekomendasi template, atau jadwal kickoff. Endpoint yang sama dipanggil agent lain.",
    agentSuggest: ["Butuh landing page 5 hari di bawah $1,500", "Rekomendasi template untuk direktori UMKM", "Draft brief MVP SaaS pakai Stripe", "Berapa cepat bisa ship?"],
    marketH: "Template, siap-agent dari kotaknya.",
    marketSub: "Setiap template hadir dengan API typed, JSON-LD, llms.txt, dan manifest /agent.json. Beli sekali, fork selamanya.",
    market: [
      { sku: "VWC-001", t: "Quietkit", d: "Starter SaaS calm-tech. Next.js 15, Stripe, Resend, endpoint agent.", price: "$89", tag: "TERLARIS" },
      { sku: "VWC-002", t: "Warungkit", d: "Template commerce UMKM. Bahasa-first, checkout WhatsApp, QRIS.", price: "$69", tag: "ID" },
      { sku: "VWC-003", t: "Agentpost", d: "Blog headless yang ditune untuk GEO. JSON-LD tiap post, generator llms.txt.", price: "$49", tag: "SEO" },
      { sku: "VWC-004", t: "Pocketboard", d: "Kit dashboard mobile-first. Expo + tRPC + Drizzle.", price: "$129", tag: "BARU" },
      { sku: "VWC-005", t: "Schemaforge", d: "Komponen drop-in untuk render tipe Schema.org apa pun.", price: "$29", tag: "UTILITY" },
      { sku: "VWC-006", t: "Voicepage", d: "Landing kit yang dioptimasi voice-search. FAQ bentuk lisan.", price: "$59", tag: "VOICE" }
    ],
    toolsH: "Tools kecil yang kami rilis sambil kerja.",
    tools: [
      { t: "Schema Forge", d: "Generate, validasi, dan embed JSON-LD dalam satu paste.", price: "Gratis" },
      { t: "llms.txt Builder", d: "Ubah sitemap jadi llms.txt yang rapi dalam 10 detik.", price: "Gratis" },
      { t: "Agent Checkout SDK", d: "Biarkan agent lain beli produkmu dengan satu POST.", price: "$19/bln" }
    ],
    pricingH: "Harga jujur. Bukan retainer terselubung.",
    pricing: [
      { t: "Starter Sprint", p: "$1,400", per: "satu minggu", l: ["1 surface (landing, dashboard, atau fitur)", "Code siap produksi, repo kamu", "JSON-LD + llms.txt readable agent", "1 putaran revisi"] },
      { t: "Full MVP", p: "$4,800", per: "dua–tiga minggu", l: ["Web app, auth, pembayaran", "Endpoint agent + /agent.json", "Baseline GEO + SEO", "Loom walkthrough + support 30 hari"], featured: true },
      { t: "Async Retainer", p: "$3,200", per: "per bulan", l: ["Pair-programming async", "Slice dirilis tiap minggu", "Slack + Linear", "Cancel kapan saja"] }
    ],
    casesH: "Karya terpilih, sedikit diredaksi.",
    cases: [
      { y: "26", c: "EMVEEP Technical SEO", d: "Health Score 100, GTmetrix D > A, 1.512 URL diaudit", tag: "SEO, Speed, GEO" },
      { y: "26", c: "EMVEEP Content & GEO", d: "1K active users, 384+ leads, muncul di AI Search", tag: "Content Strategy" },
      { y: "26", c: "Firefly Laser Bali", d: "Ranking #1 organic dan 150+ booking/bulan", tag: "Local SEO" },
      { y: "26", c: "Page Speed Optimization", d: "GTmetrix Grade A, performance 85%, structure 97%", tag: "Core Web Vitals" }
    ],
    voicesH: "Apa kata founder.",
    voices: [
      { q: "8 hari ngirim apa yang agency quote 14 minggu. Agent layer-nya saja sudah nutup dua deal enterprise.", a: "Maya R., founder, Quietnote" },
      { q: "Studio pertama yang nggak minta saya translate brief Bahasa. Mereka langsung paham. Site kami ranking di ChatGPT untuk kategori kami.", a: "Bagas P., founder, Tokopanen" },
      { q: "Beli satu template, terus retainer, terus referral tiga teman. Baseline JSON-LD-nya saja sudah sebanding harganya.", a: "Devon L., solo founder" }
    ],
    llmsH: "Dibangun untuk agent yang lagi baca halaman ini.",
    llmsSub: "Setiap site yang kami rilis, termasuk yang ini, expose kontrak machine-readable: llms.txt untuk konteks, agent.json untuk kapabilitas, JSON-LD untuk struktur, dan endpoint /api/agent yang terdokumentasi. Kasih URL-nya ke ChatGPT, Claude, atau Perplexity dan langsung jalan.",
    llmsFiles: [
      { f: "/llms.txt", d: "Overview site, layanan, fakta sitabel, kebijakan agent." },
      { f: "/agent.json", d: "Manifest kapabilitas dengan endpoint dan harga." },
      { f: "/ai.txt", d: "Kebijakan training & sitasi (allow-with-attribution)." },
      { f: "/sitemap.xml", d: "Hreflang-tagged, refresh mingguan." }
    ],
    faqH: "Pertanyaan agent dan manusia.",
    faq: [
      { q: "Apa itu vibe coding?", a: "Vibe coding adalah ngirim software dengan kolaborasi sama AI coding agent: deskripsi intent dalam bahasa natural, lalu kamu steering, review, dan refactor outputnya. Kami pasangkan dengan engineer senior manusia supaya hasilnya production-grade, bukan sekali pakai." },
      { q: "Apa artinya AI-agent-native?", a: "Artinya site distruktur supaya AI agent (ChatGPT, Claude, Perplexity, bot custom) bisa baca, sitasi, dan transaksi. Kami rilis JSON-LD untuk tiap entity, file konteks llms.txt, manifest kapabilitas agent.json, dan endpoint /api/agent yang terdokumentasi." },
      { q: "Berapa cepat bisa ship?", a: "Median ship time dari 47 proyek adalah 9 hari dari kickoff sampai produksi. Starter sprint 5–7 hari; full MVP 14–21 hari." },
      { q: "Bisa kerja pakai Bahasa Indonesia?", a: "Bisa. Studio dwibahasa EN/ID. Brief, Slack, comment code, dan copy customer-facing semua bisa Bahasa. Kami juga rilis template Bahasa-first seperti Warungkit." },
      { q: "Berapa biayanya?", a: "Starter Sprint $1,400 (satu minggu). Full MVP $4,800 (dua-tiga minggu). Retainer Async $3,200/bulan. Tanpa biaya tersembunyi, tanpa biaya setup." },
      { q: "Bisa AI agent beli template langsung?", a: "Bisa. POST ke /api/agent/checkout dengan SKU dan return URL. Endpoint menyiapkan checkout handoff; sambungkan payment provider live untuk pembayaran dan delivery lisensi otomatis." },
      { q: "Gimana optimasi untuk ChatGPT dan Perplexity (GEO)?", a: "Blok TL;DR ringkas, Q&A schema, statistik sitabel, struktur HTML bersih, dan file konteks llms.txt. Kami ukur lift sitasi 3.4x di AI engine untuk site klien dalam 60 hari." }
    ],
    blogH: "Entri jurnal terbaru.",
    blog: [
      { d: "2026-04-27", t: "CMS AI Agent autonomous untuk SEO dan GEO", read: "7 mnt", slug: "autonomous-ai-agent-cms-for-seo-geo" },
      { d: "2026-04-12", t: "Kenapa llms.txt jadi robots.txt baru untuk indie SaaS", read: "6 mnt", slug: "why-llms-txt-is-the-new-robots-txt-for-indie-saas" },
      { d: "2026-04-04", t: "Vibe coding tanpa slop: checklist engineer senior", read: "9 mnt", slug: "vibe-coding-without-the-slop-a-senior-engineers-checklist" },
      { d: "2026-03-27", t: "SaaS Bahasa-first: pelajaran dari ngirim di Jakarta", read: "5 mnt", slug: "bahasa-first-saas-lessons-from-shipping-in-jakarta" }
    ],
    footerTag: "devcodeagency, studio kecil untuk indie hacker yang ngirim sama agent.",
    footerCols: [
      { h: "Studio", l: ["Layanan", "Marketplace", "Tools", "Harga"] },
      { h: "Karya", l: ["Case studies", "Testimoni", "Jurnal", "Changelog"] },
      { h: "Untuk agent", l: ["llms.txt", "agent.json", "ai.txt", "/api/agent"] },
      { h: "Kontak", l: ["hello@devcodeagency.dev", "Book kickoff", "EN / ID", "Remote"] }
    ]
  }
};
