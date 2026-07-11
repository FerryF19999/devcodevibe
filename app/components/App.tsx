import { COPY, type Lang } from "../lib/copy";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { AgentDemo } from "./AgentDemo";
import { Marketplace } from "./Marketplace";
import { AgentMarketplace } from "./AgentMarketplace";
import { Tools } from "./Tools";
import { Pricing } from "./Pricing";
import { Cases } from "./Cases";
import { Voices } from "./Voices";
import { FAQ } from "./FAQ";
import { Blog } from "./Blog";
import { StartStrip } from "./StartStrip";
import { Footer } from "./Footer";
import { DropExperience } from "../drop/DropExperience";

export function App({ lang, hero = "drop" }: { lang: Lang; hero?: "drop" | "legacy" }) {
  const t = COPY[lang];

  return (
    <div className="vwc-app" lang={lang}>
      <Nav lang={lang} t={t} />
      <main id="main-content">
        {hero === "drop" ? <DropExperience embedded /> : <Hero t={t} lang={lang} />}
        <Services t={t} />
        <AgentDemo t={t} lang={lang} />
        <Marketplace t={t} lang={lang} />
        <AgentMarketplace lang={lang} />
        <Tools t={t} />
        <Pricing t={t} lang={lang} />
        <Cases t={t} />
        <Voices t={t} />
        <FAQ t={t} />
        <Blog t={t} lang={lang} />
        <StartStrip t={t} lang={lang} />
      </main>
      <Footer t={t} lang={lang} />
    </div>
  );
}
