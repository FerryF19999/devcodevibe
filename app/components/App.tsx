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
import { LlmsCallout } from "./LlmsCallout";
import { FAQ } from "./FAQ";
import { Blog } from "./Blog";
import { StartStrip } from "./StartStrip";
import { Footer } from "./Footer";

export function App({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  return (
    <div className="vwc-app">
      <Nav lang={lang} t={t} />
      <main id="main-content">
        <Hero t={t} lang={lang} />
        <Services t={t} />
        <AgentDemo t={t} lang={lang} />
        <Marketplace t={t} lang={lang} />
        <AgentMarketplace lang={lang} />
        <Tools t={t} />
        <Pricing t={t} lang={lang} />
        <Cases t={t} />
        <Voices t={t} />
        <LlmsCallout t={t} lang={lang} />
        <FAQ t={t} />
        <Blog t={t} lang={lang} />
        <StartStrip t={t} lang={lang} />
      </main>
      <Footer t={t} lang={lang} />
    </div>
  );
}
