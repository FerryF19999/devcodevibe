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
  cases: { y: string; c: string; d: string; tag: string; href: string }[];
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
    nav: { services: "Services", cms: "AI CMS", marketplace: "Starters", tools: "Studio", pricing: "Credits", cases: "Work", faq: "FAQ", blog: "Journal" },
    badge: "AI-AGENT-NATIVE STUDIO · EST. 2024",
    h1a: "Ship the product",
    h1b: "the agents already understand.",
    sub: "devcodeagency is a small studio that builds done-for-you MVPs, sells agent-ready templates, and ships sharp little SaaS for indie hackers. Bilingual. Remote. Shipped 47 products. Median 9 days.",
    cta: "Start Vibing",
    cta2: "Talk to the agent",
    heroLabel: "// LIVE / generating site.tsx",
    heroPrompt: "build a landing page for a calm-tech journaling app, agent-ready",
    sectionTagline: { services: "01 / HOW IT WORKS", agent: "02 / CODEX BUILD LOOP", market: "03 / WEBSITE STARTERS", tools: "05 / STUDIO CAPABILITIES", pricing: "06 / CREDITS & HIRE DEV", cases: "07 / SELECTED WORK", voices: "08 / VOICES", llms: "FOR AGENTS", faq: "09 / FAQ", blog: "10 / JOURNAL" },
    servicesH: "From static files to a shipped website.",
    services: [
      { k: "DROP/01", t: "Drop & publish", d: "Drop a static folder or ZIP. We validate the files and create a temporary live preview that is ready to share.", price: "free / 0 token" },
      { k: "CODEX/02", t: "Build with Codex", d: "Describe a change, preview it live, and spend weighted tokens only when Codex works on your website.", price: "token-based usage" },
      { k: "DEV/03", t: "Hire a developer", d: "A human developer reviews, builds, and ships with Codex every month when you need ongoing help.", price: "from Rp6m/mo" }
    ],
    agentH: "Describe it. Watch Codex build it.",
    agentSub: "Start from a dropped website or a starter, describe the change, and follow the plan, edit, check, and preview loop.",
    agentSuggest: ["Make the hero more premium", "Add a WhatsApp contact button", "Turn this into a SaaS waitlist", "Check mobile layout and accessibility"],
    marketH: "Pick a website starter.",
    marketSub: "Choose a useful starting structure, preview it immediately, then customize every part with Codex.",
    market: [
      { sku: "START-01", t: "Product launch", d: "Hero, benefits, social proof, and launch CTA.", price: "Use starter", tag: "POPULAR" },
      { sku: "START-02", t: "Creative portfolio", d: "Selected work, profile, services, and contact.", price: "Use starter", tag: "PORTFOLIO" },
      { sku: "START-03", t: "Local business", d: "Services, location, hours, and direct contact.", price: "Use starter", tag: "LOCAL" },
      { sku: "START-04", t: "SaaS waitlist", d: "Product story, feature preview, and signup form.", price: "Use starter", tag: "SAAS" },
      { sku: "START-05", t: "Event page", d: "Schedule, speakers, venue, and registration.", price: "Use starter", tag: "EVENT" },
      { sku: "START-06", t: "Documentation", d: "Navigation, search-ready guides, and code examples.", price: "Use starter", tag: "DOCS" }
    ],
    toolsH: "Everything needed to move from file to live site.",
    tools: [
      { t: "Static Drop", d: "Validate a folder or ZIP and create a shareable temporary website.", price: "Free" },
      { t: "Live Preview", d: "See every website change in a real browser experience.", price: "Included" },
      { t: "Codex Editor", d: "Plan, edit, and verify website changes from natural-language instructions.", price: "K/M tokens" },
      { t: "Version Control", d: "Track changes and keep a recoverable history of every build.", price: "Included" }
    ],
    pricingH: "Buy token usage, or hire a developer monthly.",
    pricing: [
      { t: "Starter", p: "Rp100k", per: "800K tokens", l: ["For focused website edits", "Usage-based Codex work", "Buy again when needed"] },
      { t: "Builder", p: "Rp450k", per: "4M tokens", l: ["For iterative website builds", "Lower cost per token", "Usage history included"], featured: true },
      { t: "Studio", p: "Rp1.2m", per: "12M tokens", l: ["For larger build sessions", "Best beta token value", "Usage history included"] },
      { t: "Hire Dev", p: "Rp6m", per: "per month", l: ["20 engineering hours", "Weekly shipped update", "Review and deployment", "Token usage separate"] }
    ],
    casesH: "Real outcomes across web, speed, and search.",
    cases: [
      { y: "26", c: "Software Company Technical SEO", d: "Health Score 100, GTmetrix D → A, 1,512 URLs crawled", tag: "SEO, Speed, GEO", href: "https://www.devcodeagency.com/work/software-company-technical-seo" },
      { y: "26", c: "Software Company Content & GEO", d: "1K active users, 384+ leads, and AI Search visibility", tag: "Content Strategy", href: "https://www.devcodeagency.com/work/software-company-content-geo" },
      { y: "26", c: "Canggu Beauty Clinic SEO", d: "#1 organic rankings and 150+ bookings per month", tag: "Local SEO", href: "https://www.devcodeagency.com/work/canggu-beauty-clinic-seo" },
      { y: "26", c: "Bali Tour & Travel Website", d: "Website development, on-page SEO, and page speed optimization", tag: "Web + SEO", href: "https://www.devcodeagency.com/work/bali-tour-travel-website" },
      { y: "26", c: "Canggu Workspace Website", d: "Page speed optimization for a workspace and eatery audience", tag: "Speed, Bali", href: "https://www.devcodeagency.com/work/canggu-workspace-page-speed" },
      { y: "26", c: "Multi-site Page Speed Optimization", d: "GTmetrix Grade A, 85% performance, and 97% structure", tag: "Core Web Vitals", href: "https://www.devcodeagency.com/work/multi-site-page-speed-optimization" }
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
      { q: "How much does it cost?", a: "Static Drop is free. Codex work is metered in K or M weighted tokens based on actual uncached input, cached input, output, and model. Beta packs start at Rp100,000 for 800K weighted tokens. Hire Dev starts at Rp6 million per month; token usage is purchased separately." },
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
    nav: { services: "Layanan", cms: "AI CMS", marketplace: "Starter", tools: "Studio", pricing: "Kredit", cases: "Karya", faq: "FAQ", blog: "Jurnal" },
    badge: "STUDIO AI-AGENT-NATIVE · SEJAK 2024",
    h1a: "Kirim produk",
    h1b: "yang sudah dimengerti agent.",
    sub: "devcodeagency adalah studio kecil yang membangun MVP done-for-you, menjual template siap-agent, dan merilis SaaS tajam untuk indie hacker. Dwibahasa. Remote. 47 produk dirilis. Median 9 hari.",
    cta: "Mulai Vibing",
    cta2: "Tanya agent-nya",
    heroLabel: "// LIVE / membuat site.tsx",
    heroPrompt: "buat landing page untuk app jurnal calm-tech, siap-agent",
    sectionTagline: { services: "01 / CARA KERJA", agent: "02 / ALUR BUILD CODEX", market: "03 / STARTER WEBSITE", tools: "05 / KAPABILITAS STUDIO", pricing: "06 / KREDIT & HIRE DEV", cases: "07 / KARYA TERPILIH", voices: "08 / SUARA", llms: "UNTUK AGENT", faq: "09 / FAQ", blog: "10 / JURNAL" },
    servicesH: "Dari file static sampai website terkirim.",
    services: [
      { k: "DROP/01", t: "Drop & publish", d: "Drop folder static atau ZIP. File divalidasi lalu dibuatkan temporary live preview yang siap dibagikan.", price: "gratis / 0 token" },
      { k: "CODEX/02", t: "Build pakai Codex", d: "Jelaskan perubahan, lihat preview live, dan gunakan weighted token hanya saat Codex mengerjakan websitemu.", price: "usage berbasis token" },
      { k: "DEV/03", t: "Hire developer", d: "Developer manusia melakukan review, build, dan ship bersama Codex setiap bulan saat kamu butuh bantuan berkelanjutan.", price: "mulai Rp6jt/bln" }
    ],
    agentH: "Jelaskan. Lihat Codex membangunnya.",
    agentSub: "Mulai dari website hasil drop atau starter, jelaskan perubahan, lalu ikuti alur plan, edit, check, dan preview.",
    agentSuggest: ["Bikin hero lebih premium", "Tambah tombol kontak WhatsApp", "Ubah jadi SaaS waitlist", "Cek mobile dan aksesibilitas"],
    marketH: "Pilih starter website.",
    marketSub: "Pilih struktur awal yang sesuai, preview langsung, lalu custom seluruh bagiannya dengan Codex.",
    market: [
      { sku: "START-01", t: "Product launch", d: "Hero, benefit, social proof, dan CTA peluncuran.", price: "Pakai starter", tag: "POPULER" },
      { sku: "START-02", t: "Creative portfolio", d: "Karya pilihan, profil, layanan, dan kontak.", price: "Pakai starter", tag: "PORTFOLIO" },
      { sku: "START-03", t: "Local business", d: "Layanan, lokasi, jam buka, dan kontak langsung.", price: "Pakai starter", tag: "LOKAL" },
      { sku: "START-04", t: "SaaS waitlist", d: "Cerita produk, preview fitur, dan form pendaftaran.", price: "Pakai starter", tag: "SAAS" },
      { sku: "START-05", t: "Event page", d: "Jadwal, pembicara, venue, dan registrasi.", price: "Pakai starter", tag: "EVENT" },
      { sku: "START-06", t: "Documentation", d: "Navigasi, panduan, dan contoh kode.", price: "Pakai starter", tag: "DOKS" }
    ],
    toolsH: "Semua yang dibutuhkan dari file sampai live site.",
    tools: [
      { t: "Static Drop", d: "Validasi folder atau ZIP lalu buat website temporary yang bisa dibagikan.", price: "Gratis" },
      { t: "Live Preview", d: "Lihat setiap perubahan website sebagai pengalaman browser nyata.", price: "Termasuk" },
      { t: "Codex Editor", d: "Plan, edit, dan verifikasi perubahan dari instruksi bahasa natural.", price: "K/M token" },
      { t: "Version Control", d: "Lacak perubahan dan simpan riwayat setiap build.", price: "Termasuk" }
    ],
    pricingH: "Beli token usage, atau hire developer bulanan.",
    pricing: [
      { t: "Starter", p: "Rp100rb", per: "800K token", l: ["Untuk edit website terarah", "Pemakaian Codex berbasis usage", "Beli lagi saat dibutuhkan"] },
      { t: "Builder", p: "Rp450rb", per: "4M token", l: ["Untuk build website iteratif", "Biaya per token lebih hemat", "Riwayat penggunaan"], featured: true },
      { t: "Studio", p: "Rp1,2jt", per: "12M token", l: ["Untuk sesi build lebih besar", "Value token beta terbaik", "Riwayat penggunaan"] },
      { t: "Hire Dev", p: "Rp6jt", per: "per bulan", l: ["20 jam engineering", "Update terkirim tiap minggu", "Review dan deployment", "Token usage terpisah"] }
    ],
    casesH: "Hasil nyata dari web, speed, dan search.",
    cases: [
      { y: "26", c: "Technical SEO Perusahaan Software", d: "Health Score 100, GTmetrix D → A, dan 1.512 URL dicrawl", tag: "SEO, Speed, GEO", href: "https://www.devcodeagency.com/work/software-company-technical-seo" },
      { y: "26", c: "Content & GEO Perusahaan Software", d: "1K pengguna aktif, 384+ leads, dan visibilitas AI Search", tag: "Content Strategy", href: "https://www.devcodeagency.com/work/software-company-content-geo" },
      { y: "26", c: "SEO Klinik Kecantikan Canggu", d: "Ranking organik #1 dan 150+ booking per bulan", tag: "Local SEO", href: "https://www.devcodeagency.com/work/canggu-beauty-clinic-seo" },
      { y: "26", c: "Website Tour & Travel Bali", d: "Web development, SEO on-page, dan optimasi page speed", tag: "Web + SEO", href: "https://www.devcodeagency.com/work/bali-tour-travel-website" },
      { y: "26", c: "Website Workspace Canggu", d: "Optimasi page speed untuk audiens workspace dan eatery", tag: "Speed, Bali", href: "https://www.devcodeagency.com/work/canggu-workspace-page-speed" },
      { y: "26", c: "Optimasi Page Speed Multi-site", d: "GTmetrix Grade A, performa 85%, dan structure 97%", tag: "Core Web Vitals", href: "https://www.devcodeagency.com/work/multi-site-page-speed-optimization" }
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
      { q: "Berapa biayanya?", a: "Static Drop gratis. Pengerjaan Codex dihitung dalam K atau M weighted token berdasarkan input non-cache, cached input, output aktual, dan model. Paket beta mulai Rp100.000 untuk 800K weighted token. Hire Dev mulai Rp6 juta per bulan; token usage dibeli terpisah." },
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
