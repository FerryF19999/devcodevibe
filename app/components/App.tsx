"use client";

import { useEffect, useState } from "react";
import { COPY, type Lang } from "../lib/copy";
import { capture } from "../lib/analytics";
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

function readInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const url = new URL(window.location.href);
    const q = url.searchParams.get("lang");
    if (q === "id" || q === "en") return q;
    const stored = window.localStorage.getItem("vwc-lang");
    if (stored === "id" || stored === "en") return stored;
  } catch {}
  return "en";
}

export function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [langReady, setLangReady] = useState(false);

  useEffect(() => {
    setLang(readInitialLang());
    setLangReady(true);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("vwc-lang", lang);
      document.documentElement.lang = lang;
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.history.replaceState(null, "", url);
    } catch {}
  }, [lang]);

  useEffect(() => {
    if (!langReady) return;
    capture("pageview", { path: window.location.pathname, lang });
  }, [langReady]);

  useEffect(() => {
    if (!langReady) return;

    const seen = new Set<string>();
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id], header[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = (entry.target as HTMLElement).id;
          if (!section || seen.has(section) || !entry.isIntersecting) return;
          seen.add(section);
          capture("section_viewed", { section, lang });
        });
      },
      { threshold: 0.35 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [lang, langReady]);

  const t = COPY[lang];

  return (
    <div className="vwc-app">
      <Nav lang={lang} setLang={setLang} t={t} />
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
      <Footer t={t} lang={lang} />
    </div>
  );
}
