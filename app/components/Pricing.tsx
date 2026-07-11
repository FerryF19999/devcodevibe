import type { Copy, Lang } from "../lib/copy";
import { SectionLabel } from "./shared";

const CREDIT_PACKS = [
  { name: "Starter", credits: "800K token", price: "Rp100k", tasks: "±2–20 task", featured: false },
  { name: "Builder", credits: "4M token", price: "Rp450k", tasks: "±11–100 task", featured: true },
  { name: "Studio", credits: "12M token", price: "Rp1,2jt", tasks: "±33–300 task", featured: false },
];

export function Pricing({ lang }: { t: Copy; lang: Lang }) {
  const id = lang === "id";
  return (
    <section className="vwc-section vwc-section-tinted credit-pricing" id="pricing">
      <SectionLabel>{id ? "06 / KREDIT & HIRE DEV" : "06 / CREDITS & HIRE A DEV"}</SectionLabel>
      <div className="vwc-section-head">
        <h2 className="vwc-h2">{id ? "Bayar pemakaian Codex, atau tambahkan manusia." : "Pay for Codex usage, or add a human."}</h2>
        <p className="vwc-lead vwc-lead-r">
          {id
            ? "Drop dan preview tidak memakai token. Saldo dipotong dari weighted token aktual setelah Codex selesai bekerja, bukan per klik. Harga berikut adalah harga beta."
            : "Drop and preview use no tokens. Balance is deducted from actual weighted tokens after Codex finishes, not per click. These are beta prices."}
        </p>
      </div>

      <div className="token-meter-card">
        <div>
          <span className="drop-kicker">TOKEN-BASED METER</span>
          <h3>{id ? "Usage tampil dalam K dan M token" : "Usage shown in K and M tokens"}</h3>
          <p>
            {id
              ? "Supaya biaya tetap akurat, token dinormalisasi sebagai GPT-5.5-equivalent: input biasa 1×, cached input 0,1×, dan output 6×."
              : "To keep costs accurate, tokens are normalized as GPT-5.5-equivalent usage: regular input 1×, cached input 0.1×, and output 6×."}
          </p>
        </div>
        <code>
          weighted token = uncached input + (cached × 0.1) + (output × 6)
          <small>{id ? "Contoh: total input 100K (80K cached) + output 20K = 148K weighted token" : "Example: 100K total input (80K cached) + 20K output = 148K weighted tokens"}</small>
        </code>
        <dl>
          <div><dt>INPUT</dt><dd>1× token</dd></div>
          <div><dt>CACHED</dt><dd>0,1× token</dd></div>
          <div><dt>OUTPUT</dt><dd>6× token</dd></div>
        </dl>
      </div>

      <div className="credit-pack-grid">
        {CREDIT_PACKS.map((pack) => (
          <article key={pack.name} className={pack.featured ? "is-featured" : ""}>
            {pack.featured && <span className="credit-pack-badge">{id ? "PALING FLEKSIBEL" : "MOST FLEXIBLE"}</span>}
            <div className="credit-pack-name"><span>{pack.name}</span><code>ONE-TIME</code></div>
            <strong>{pack.credits}</strong>
            <div className="credit-pack-price">{pack.price}<span> / pack</span></div>
            <p>{pack.tasks} {id ? "typical task GPT-5.5" : "typical GPT-5.5 tasks"}</p>
            <ul>
              <li>{id ? "Input, cache, dan output tercatat" : "Input, cache, and output recorded"}</li>
              <li>{id ? "Potong sesuai model dan usage aktual" : "Deducted by model and actual usage"}</li>
              <li>{id ? "Checkout melalui Lynk.id" : "Checkout through Lynk.id"}</li>
            </ul>
            <a href="#start">{id ? "Beli Token Usage" : "Buy Token Usage"} →</a>
          </article>
        ))}
      </div>

      <article className="hire-dev-card">
        <div className="hire-dev-copy">
          <span className="drop-kicker">HUMAN-IN-THE-LOOP</span>
          <h3>{id ? "Hire Dev bulanan" : "Hire a developer monthly"}</h3>
          <p>
            {id
              ? "Untuk saat prompt saja tidak cukup. Developer membantu architecture, integrasi, debugging, review, dan deployment—tetap menggunakan workspace yang sama."
              : "For work that needs more than prompts. A developer handles architecture, integrations, debugging, reviews, and deployment in the same workspace."}
          </p>
        </div>
        <div className="hire-dev-offer">
          <span>{id ? "mulai" : "from"}</span>
          <strong>Rp6jt</strong>
          <code>/ bulan</code>
        </div>
        <ul>
          <li>20 jam engineering per bulan</li>
          <li>Weekly shipped update</li>
          <li>Code review + deployment support</li>
          <li>Token usage dibeli terpisah</li>
        </ul>
        <a href="#start">{id ? "Diskusikan kebutuhan" : "Discuss your scope"} →</a>
      </article>
      <p className="pricing-disclaimer">
        {id
          ? "K berarti ribu dan M berarti juta weighted token. Estimasi task memakai rentang typical GPT-5.5 dan dapat berubah sesuai model, konteks, output, dan mode. Token usage produk ini bukan kredit resmi OpenAI serta tidak menambah rate limit akun Codex."
          : "K means thousand and M means million weighted tokens. Task estimates use the typical GPT-5.5 range and vary by model, context, output, and mode. This product token usage is not official OpenAI credit and does not increase Codex rate limits."}
      </p>
    </section>
  );
}
