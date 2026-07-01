import { COPY, type Lang } from "./copy";

export type WorkCase = {
  slug: string;
  year: string;
  client: string;
  summary: string;
  tag: string;
  scope: string;
  result: string;
  role: string;
  timeline: string;
  stack: string[];
  challenge: string;
  approach: string[];
  outcomes: string[];
  metrics: { label: string; value: string }[];
};

const WORK_DETAILS = {
  en: [
    {
      slug: "emveep-technical-seo",
      scope: "Technical SEO audit, crawl cleanup, page speed optimization, content strategy, and GEO readiness",
      result: "Moved EMVEEP from multiple crawl issues and GTmetrix Grade D to Health Score 100 and GTmetrix Grade A.",
      role: "SEO & Digital Marketing Lead",
      timeline: "Technical audit and optimization program",
      stack: ["Ahrefs", "GTmetrix", "Search Console", "Analytics", "Tag Manager", "Lighthouse"],
      challenge:
        "EMVEEP had crawl errors, redirect issues, slow indexing, and page speed debt that limited organic visibility for a software development company.",
      approach: [
        "Ran a technical SEO audit to find broken links, redirect issues, crawl errors, and indexing blockers.",
        "Optimized Core Web Vitals and page speed, moving GTmetrix performance from Grade D to Grade A.",
        "Verified 1,512 crawled URLs and 9,555 links, then aligned the site with content strategy and GEO signals.",
      ],
      outcomes: [
        "Ahrefs Health Score reached 100, marked Excellent.",
        "GTmetrix improved from D to A with 85% performance.",
        "Core Web Vitals improved to 1.1s LCP, 53ms TBT, and 0 CLS.",
      ],
      metrics: [
        { label: "Health Score", value: "100" },
        { label: "GTmetrix", value: "D > A" },
        { label: "URLs crawled", value: "1,512" },
      ],
    },
    {
      slug: "emveep-content-geo",
      scope: "Taxonomy research, keyword research, topic clusters, SERP analysis, SEO leads, and AI Search optimization",
      result: "Grew organic visibility with 1K active users in 28 days, 384+ SEO leads, and AI Search recommendations.",
      role: "Content Strategy & GEO Lead",
      timeline: "28-day traffic snapshot plus long-term SEO compounding",
      stack: ["Google Analytics", "Search Console", "Ahrefs", "SERP Analysis", "Topic Clusters", "GEO"],
      challenge:
        "EMVEEP needed a content system that could capture software development intent, build topic authority, and appear in AI-driven search surfaces.",
      approach: [
        "Built taxonomy research, keyword mapping, topic clusters, and blog planning from SERP analysis.",
        "Connected content planning to analytics so traffic, engagement, and lead impact could be measured.",
        "Optimized for GEO so EMVEEP could appear in ChatGPT, Gemini, and Google AI Overview recommendations.",
      ],
      outcomes: [
        "Reached 1K active users and 988 new users in a 28-day analytics window.",
        "Generated 384+ organic SEO leads over the portfolio period.",
        "Appeared in AI Search results for startup development company related queries.",
      ],
      metrics: [
        { label: "Active users", value: "1K" },
        { label: "New users", value: "988" },
        { label: "SEO leads", value: "384+" },
      ],
    },
    {
      slug: "firefly-laser-bali",
      scope: "Local SEO, Google ranking, Google Maps visibility, AI Search visibility, and beauty clinic content optimization",
      result: "Secured #1 organic rankings for Canggu treatment keywords and drove 150+ monthly bookings from organic search.",
      role: "SEO & Local Search Specialist",
      timeline: "First two months showed measurable growth",
      stack: ["Google Search", "Google Maps", "Local SEO", "Content Optimization", "GEO"],
      challenge:
        "Firefly Laser Bali needed stronger visibility for treatment searches in Canggu across Google Search, Maps, and AI recommendation flows.",
      approach: [
        "Optimized service pages and local signals around high-intent Canggu treatment keywords.",
        "Improved reporting and SEO analysis so the client could see progress clearly in the first two months.",
        "Strengthened AI Search visibility after customers reported finding the clinic through ChatGPT recommendations.",
      ],
      outcomes: [
        "Ranked #1 organic for hydrafacial in canggu.",
        "Ranked #1 organic for laser hair removal in canggu.",
        "Produced 150+ bookings per month from organic traffic, with sources including ChatGPT, Google Search, and Google Maps.",
      ],
      metrics: [
        { label: "Rankings", value: "#1" },
        { label: "Bookings", value: "150+/mo" },
        { label: "Sources", value: "3" },
      ],
    },
    {
      slug: "page-speed-optimization",
      scope: "Core Web Vitals, image compression, lazy loading, CSS/JS minification, server response time, and mobile responsiveness",
      result: "Optimized multiple websites including mybalitour.com, pucorooftop.com, and devcodeagency.com for faster UX and stronger SEO.",
      role: "Web Development & Technical Optimization",
      timeline: "Speed optimization sprint",
      stack: ["GTmetrix", "Lighthouse", "Core Web Vitals", "Image Optimization", "CSS/JS Minification"],
      challenge:
        "Client sites needed faster loading, stronger mobile responsiveness, and cleaner technical foundations to support SEO and conversion.",
      approach: [
        "Compressed and lazy-loaded images, reduced blocking assets, and improved server response time.",
        "Tuned Core Web Vitals metrics across LCP, TBT, CLS, TTFB, fully loaded time, and page size.",
        "Applied on-page SEO setup, meta tag optimization, and mobile responsiveness where each site needed it.",
      ],
      outcomes: [
        "devcodeagency.com reached GTmetrix Grade A with 85% performance and 97% structure.",
        "Measured 1.7s LCP, 0ms TBT, 0 CLS, 1.4s TTFB, and 3.1s fully loaded time.",
        "Reduced measured page size to 257KB across 28 total requests for the GTmetrix result.",
      ],
      metrics: [
        { label: "GTmetrix", value: "A" },
        { label: "Performance", value: "85%" },
        { label: "Structure", value: "97%" },
      ],
    },
  ],
  id: [
    {
      slug: "emveep-technical-seo",
      scope: "Technical SEO audit, perbaikan crawl, page speed optimization, content strategy, dan kesiapan GEO",
      result: "Membawa EMVEEP dari banyak crawl issue dan GTmetrix Grade D menjadi Health Score 100 dan GTmetrix Grade A.",
      role: "SEO & Digital Marketing Lead",
      timeline: "Program audit teknis dan optimasi",
      stack: ["Ahrefs", "GTmetrix", "Search Console", "Analytics", "Tag Manager", "Lighthouse"],
      challenge:
        "EMVEEP punya crawl error, redirect issue, slow indexing, dan technical debt page speed yang menahan organic visibility sebagai software development company.",
      approach: [
        "Menjalankan technical SEO audit untuk menemukan broken links, redirect issue, crawl error, dan blocker indexing.",
        "Mengoptimasi Core Web Vitals dan page speed hingga GTmetrix naik dari Grade D ke Grade A.",
        "Memverifikasi 1.512 URL yang dicrawl dan 9.555 link, lalu menyelaraskan site dengan content strategy dan sinyal GEO.",
      ],
      outcomes: [
        "Ahrefs Health Score mencapai 100, kategori Excellent.",
        "GTmetrix meningkat dari D ke A dengan performance 85%.",
        "Core Web Vitals membaik ke 1.1s LCP, 53ms TBT, dan 0 CLS.",
      ],
      metrics: [
        { label: "Health Score", value: "100" },
        { label: "GTmetrix", value: "D > A" },
        { label: "URL diaudit", value: "1.512" },
      ],
    },
    {
      slug: "emveep-content-geo",
      scope: "Taxonomy research, keyword research, topic clusters, SERP analysis, SEO leads, dan AI Search optimization",
      result: "Meningkatkan organic visibility dengan 1K active users dalam 28 hari, 384+ SEO leads, dan rekomendasi AI Search.",
      role: "Content Strategy & GEO Lead",
      timeline: "Snapshot traffic 28 hari plus compounding SEO jangka panjang",
      stack: ["Google Analytics", "Search Console", "Ahrefs", "SERP Analysis", "Topic Clusters", "GEO"],
      challenge:
        "EMVEEP butuh sistem konten yang menangkap intent software development, membangun topic authority, dan muncul di permukaan AI-driven search.",
      approach: [
        "Membangun taxonomy research, keyword mapping, topic cluster, dan blog planning dari SERP analysis.",
        "Menghubungkan content planning ke analytics agar traffic, engagement, dan impact leads bisa diukur.",
        "Mengoptimasi GEO agar EMVEEP muncul di rekomendasi ChatGPT, Gemini, dan Google AI Overview.",
      ],
      outcomes: [
        "Mencapai 1K active users dan 988 new users dalam window analytics 28 hari.",
        "Menghasilkan 384+ organic SEO leads selama periode portfolio.",
        "Muncul di AI Search untuk query terkait startup development company.",
      ],
      metrics: [
        { label: "Active users", value: "1K" },
        { label: "New users", value: "988" },
        { label: "SEO leads", value: "384+" },
      ],
    },
    {
      slug: "firefly-laser-bali",
      scope: "Local SEO, ranking Google, visibilitas Google Maps, AI Search, dan optimasi konten klinik kecantikan",
      result: "Mengamankan ranking #1 organic untuk keyword treatment Canggu dan mendorong 150+ booking per bulan dari organic search.",
      role: "SEO & Local Search Specialist",
      timeline: "Dua bulan pertama sudah menunjukkan growth terukur",
      stack: ["Google Search", "Google Maps", "Local SEO", "Content Optimization", "GEO"],
      challenge:
        "Firefly Laser Bali butuh visibility lebih kuat untuk pencarian treatment di Canggu melalui Google Search, Maps, dan rekomendasi AI.",
      approach: [
        "Mengoptimasi service pages dan local signals untuk keyword treatment Canggu dengan intent tinggi.",
        "Meningkatkan reporting dan analisis SEO agar client melihat progress dengan jelas dalam dua bulan pertama.",
        "Memperkuat visibilitas AI Search setelah customer melaporkan menemukan klinik melalui rekomendasi ChatGPT.",
      ],
      outcomes: [
        "Ranking #1 organic untuk hydrafacial in canggu.",
        "Ranking #1 organic untuk laser hair removal in canggu.",
        "Menghasilkan 150+ booking per bulan dari organic traffic, termasuk ChatGPT, Google Search, dan Google Maps.",
      ],
      metrics: [
        { label: "Ranking", value: "#1" },
        { label: "Booking", value: "150+/bln" },
        { label: "Sources", value: "3" },
      ],
    },
    {
      slug: "page-speed-optimization",
      scope: "Core Web Vitals, image compression, lazy loading, CSS/JS minification, server response time, dan mobile responsiveness",
      result: "Mengoptimasi mybalitour.com, pucorooftop.com, dan devcodeagency.com untuk UX lebih cepat dan SEO lebih kuat.",
      role: "Web Development & Technical Optimization",
      timeline: "Sprint optimasi speed",
      stack: ["GTmetrix", "Lighthouse", "Core Web Vitals", "Image Optimization", "CSS/JS Minification"],
      challenge:
        "Website client butuh loading lebih cepat, mobile responsiveness lebih kuat, dan fondasi teknis yang lebih bersih untuk SEO dan conversion.",
      approach: [
        "Mengompresi dan lazy-load image, mengurangi blocking assets, dan meningkatkan server response time.",
        "Menyetel Core Web Vitals untuk LCP, TBT, CLS, TTFB, fully loaded time, dan page size.",
        "Menerapkan setup on-page SEO, optimasi meta tag, dan mobile responsiveness sesuai kebutuhan tiap site.",
      ],
      outcomes: [
        "devcodeagency.com mencapai GTmetrix Grade A dengan performance 85% dan structure 97%.",
        "Metrik tercatat: 1.7s LCP, 0ms TBT, 0 CLS, 1.4s TTFB, dan 3.1s fully loaded time.",
        "Page size terukur turun ke 257KB dengan 28 total requests pada hasil GTmetrix.",
      ],
      metrics: [
        { label: "GTmetrix", value: "A" },
        { label: "Performance", value: "85%" },
        { label: "Structure", value: "97%" },
      ],
    },
  ],
} satisfies Record<Lang, Omit<WorkCase, "year" | "client" | "summary" | "tag">[]>;

export function getWorkCases(lang: Lang): WorkCase[] {
  return COPY[lang].cases.map((work, index) => ({
    ...WORK_DETAILS[lang][index],
    year: work.y,
    client: work.c,
    summary: work.d,
    tag: work.tag,
  }));
}

export function getWorkCase(lang: Lang, slug: string) {
  return getWorkCases(lang).find((work) => work.slug === slug);
}

export function workPath(lang: Lang, slug: string) {
  return lang === "id" ? `/id/work/${slug}` : `/work/${slug}`;
}
