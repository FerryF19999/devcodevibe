import type { Metadata } from "next";
import { AgentCMS } from "../components/AgentCMS";
import type { Lang } from "../lib/copy";

export const metadata: Metadata = {
  title: "AI Agent CMS | devcodeagency",
  description: "Hidden operator dashboard for the verified devcodeagency growth agent.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AgentCmsPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const lang: Lang = params?.lang === "id" ? "id" : "en";
  return <AgentCMS lang={lang} />;
}
