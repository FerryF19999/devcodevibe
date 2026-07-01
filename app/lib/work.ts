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
      slug: "quietnote",
      scope: "MVP build, Stripe, lifecycle email, analytics, agent endpoint",
      result: "Launched the first paid journaling workflow and converted the founder's audience into recurring revenue.",
      role: "Full MVP build + async retainer",
      timeline: "11 weeks from blank repo to stable MRR",
      stack: ["Next.js", "Stripe", "Resend", "PostHog", "JSON-LD", "/api/agent"],
      challenge:
        "Quietnote had a warm audience and a calm product idea, but no paid surface, no analytics loop, and no agent-readable structure for discovery.",
      approach: [
        "Shipped the paid journaling workflow first, then layered onboarding, lifecycle email, and billing recovery.",
        "Added structured product, FAQ, and organization data so answer engines could understand the offer.",
        "Kept the interface quiet and fast while exposing an agent endpoint for quoting and support handoff.",
      ],
      outcomes: [
        "Reached $4.2k MRR in 11 weeks from a $0 baseline.",
        "Converted early users into paid cohorts without adding a large support load.",
        "Created a reusable calm-tech starter pattern for future product slices.",
      ],
      metrics: [
        { label: "MRR", value: "$4.2k" },
        { label: "Timeline", value: "11 weeks" },
        { label: "Scope", value: "MVP + retainer" },
      ],
    },
    {
      slug: "tokopanen",
      scope: "Bahasa-first catalog, WhatsApp checkout, QRIS handoff, inventory ops",
      result: "Gave growers a lighter commerce surface without forcing them into a heavy marketplace stack.",
      role: "Commerce sprint for Indonesian growers",
      timeline: "Two focused releases",
      stack: ["Next.js", "WhatsApp checkout", "QRIS", "Structured catalog", "Bahasa UX"],
      challenge:
        "The team needed commerce that matched how Indonesian growers already sell: fast catalog browsing, WhatsApp coordination, and QRIS payment handoff.",
      approach: [
        "Built a Bahasa-first catalog with lightweight product management and shareable item pages.",
        "Designed checkout around WhatsApp and QRIS instead of a heavy cart flow.",
        "Added schema and clean content blocks so agents can cite products and business context accurately.",
      ],
      outcomes: [
        "Reduced the operational gap between harvest updates and customer-facing inventory.",
        "Let growers sell online without changing their familiar sales workflow.",
        "Created a template-ready UMKM commerce pattern.",
      ],
      metrics: [
        { label: "Market", value: "ID growers" },
        { label: "Checkout", value: "WhatsApp + QRIS" },
        { label: "Language", value: "Bahasa-first" },
      ],
    },
    {
      slug: "brieflet",
      scope: "Agent SDK, project memory, weekly digest, team permissions",
      result: "Moved planning out of scattered docs into an agent-readable workspace for active product teams.",
      role: "Agent-first product management tool",
      timeline: "Three release cycles",
      stack: ["Next.js", "tRPC", "Agent SDK", "Project memory", "Digest automation"],
      challenge:
        "Brieflet's early users had useful project context spread across calls, docs, tasks, and chat threads, making agent collaboration inconsistent.",
      approach: [
        "Modeled project memory as a first-class object with permissions and weekly summaries.",
        "Built agent-safe brief generation so teams could move from notes to executable specs.",
        "Added usage instrumentation around activation, repeat use, and digest engagement.",
      ],
      outcomes: [
        "Reached 2,300 weekly active users across product teams.",
        "Made project briefs reusable by humans and agents.",
        "Cut repeated context-setting during weekly planning.",
      ],
      metrics: [
        { label: "Weekly actives", value: "2,300" },
        { label: "Mode", value: "Agent SDK" },
        { label: "Cycle", value: "3 releases" },
      ],
    },
    {
      slug: "fernpath",
      scope: "Remote ergonomics tracker, async nudges, calm reporting",
      result: "Turned a three-sprint experiment into a durable internal wellness tool.",
      role: "Calm-tech product sprint",
      timeline: "Three sprints",
      stack: ["Next.js", "Scheduled nudges", "Team dashboards", "Privacy-first reporting"],
      challenge:
        "Fernpath wanted ergonomics support for remote teams that felt helpful, not invasive, and could be trialed without enterprise software weight.",
      approach: [
        "Built check-ins around gentle prompts and opt-in reporting instead of constant monitoring.",
        "Designed team summaries that show patterns without exposing sensitive individual detail.",
        "Iterated across three sprints with feedback from remote team leads.",
      ],
      outcomes: [
        "Graduated from experiment to internal tool.",
        "Gave managers useful patterns without compromising trust.",
        "Established a calmer UX model for workplace health features.",
      ],
      metrics: [
        { label: "Sprints", value: "3" },
        { label: "Mode", value: "Calm-tech" },
        { label: "Audience", value: "Remote teams" },
      ],
    },
  ],
  id: [
    {
      slug: "quietnote",
      scope: "MVP, Stripe, email lifecycle, analytics, endpoint agent",
      result: "Meluncurkan workflow journaling berbayar pertama dan mengubah audiens founder menjadi revenue berulang.",
      role: "Full MVP build + async retainer",
      timeline: "11 minggu dari repo kosong ke MRR stabil",
      stack: ["Next.js", "Stripe", "Resend", "PostHog", "JSON-LD", "/api/agent"],
      challenge:
        "Quietnote punya audiens hangat dan ide produk yang tenang, tapi belum punya surface berbayar, loop analytics, atau struktur agent-readable untuk discovery.",
      approach: [
        "Mengirim workflow journaling berbayar dulu, lalu menambah onboarding, lifecycle email, dan billing recovery.",
        "Menambahkan struktur product, FAQ, dan organization agar answer engine memahami offer dengan akurat.",
        "Menjaga interface tetap tenang dan cepat sambil membuka endpoint agent untuk quote dan support handoff.",
      ],
      outcomes: [
        "Mencapai $4.2k MRR dalam 11 minggu dari baseline $0.",
        "Mengubah early users menjadi paid cohorts tanpa beban support besar.",
        "Membuat pola starter calm-tech yang bisa dipakai untuk slice produk berikutnya.",
      ],
      metrics: [
        { label: "MRR", value: "$4.2k" },
        { label: "Timeline", value: "11 minggu" },
        { label: "Scope", value: "MVP + retainer" },
      ],
    },
    {
      slug: "tokopanen",
      scope: "Katalog Bahasa-first, WhatsApp checkout, handoff QRIS, inventory ops",
      result: "Memberi petani surface commerce yang ringan tanpa memaksa mereka masuk stack marketplace berat.",
      role: "Sprint commerce untuk petani Indonesia",
      timeline: "Dua release terfokus",
      stack: ["Next.js", "WhatsApp checkout", "QRIS", "Structured catalog", "Bahasa UX"],
      challenge:
        "Tim butuh commerce yang cocok dengan cara petani Indonesia sudah berjualan: browsing katalog cepat, koordinasi WhatsApp, dan handoff pembayaran QRIS.",
      approach: [
        "Membangun katalog Bahasa-first dengan manajemen produk ringan dan halaman item yang mudah dibagikan.",
        "Mendesain checkout di sekitar WhatsApp dan QRIS, bukan cart flow yang berat.",
        "Menambahkan schema dan blok konten bersih agar agent bisa mengutip produk dan konteks bisnis secara akurat.",
      ],
      outcomes: [
        "Mengurangi jarak operasional antara update panen dan inventory yang dilihat pelanggan.",
        "Membantu petani jualan online tanpa mengganti workflow penjualan yang sudah familiar.",
        "Membuat pola commerce UMKM yang siap dijadikan template.",
      ],
      metrics: [
        { label: "Market", value: "Petani ID" },
        { label: "Checkout", value: "WhatsApp + QRIS" },
        { label: "Bahasa", value: "Bahasa-first" },
      ],
    },
    {
      slug: "brieflet",
      scope: "Agent SDK, project memory, digest mingguan, izin tim",
      result: "Memindahkan planning dari dokumen terpencar ke workspace yang mudah dibaca agent.",
      role: "Tool product management agent-first",
      timeline: "Tiga siklus release",
      stack: ["Next.js", "tRPC", "Agent SDK", "Project memory", "Digest automation"],
      challenge:
        "User awal Brieflet punya konteks proyek yang tersebar di call, dokumen, task, dan chat, sehingga kolaborasi agent jadi tidak konsisten.",
      approach: [
        "Memodelkan project memory sebagai objek utama dengan permissions dan summary mingguan.",
        "Membangun brief generation yang aman untuk agent agar tim bisa bergerak dari catatan ke spec yang bisa dieksekusi.",
        "Menambahkan instrumentasi usage untuk activation, repeat use, dan engagement digest.",
      ],
      outcomes: [
        "Mencapai 2.300 active mingguan di tim produk.",
        "Membuat project brief reusable oleh manusia dan agent.",
        "Mengurangi context-setting berulang saat weekly planning.",
      ],
      metrics: [
        { label: "Active mingguan", value: "2.300" },
        { label: "Mode", value: "Agent SDK" },
        { label: "Siklus", value: "3 release" },
      ],
    },
    {
      slug: "fernpath",
      scope: "Tracker ergonomi remote, nudges async, reporting tenang",
      result: "Mengubah eksperimen tiga sprint menjadi tool wellness internal yang tahan dipakai.",
      role: "Sprint produk calm-tech",
      timeline: "Tiga sprint",
      stack: ["Next.js", "Scheduled nudges", "Team dashboards", "Privacy-first reporting"],
      challenge:
        "Fernpath ingin support ergonomi untuk tim remote yang terasa membantu, bukan invasif, dan bisa dicoba tanpa bobot software enterprise.",
      approach: [
        "Membangun check-in di sekitar prompt lembut dan reporting opt-in, bukan monitoring terus-menerus.",
        "Mendesain summary tim yang menunjukkan pola tanpa membuka detail individu yang sensitif.",
        "Iterasi dalam tiga sprint dengan feedback dari lead tim remote.",
      ],
      outcomes: [
        "Naik dari eksperimen menjadi tool internal.",
        "Memberi manager pola yang berguna tanpa mengorbankan trust.",
        "Membentuk model UX yang lebih tenang untuk fitur workplace health.",
      ],
      metrics: [
        { label: "Sprint", value: "3" },
        { label: "Mode", value: "Calm-tech" },
        { label: "Audience", value: "Tim remote" },
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
