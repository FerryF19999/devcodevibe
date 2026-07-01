import type { Metadata } from "next";
import { WorkPage } from "../../components/WorkPage";

export const metadata: Metadata = {
  title: "Karya terpilih | devcodeagency",
  description:
    "Karya terpilih devcodeagency: MVP, commerce, tool agent-first, dan sprint produk calm-tech yang sedikit diredaksi.",
  alternates: {
    canonical: "/id/work",
    languages: {
      en: "/work",
      id: "/id/work",
      "x-default": "/work",
    },
  },
  openGraph: {
    title: "Karya terpilih | devcodeagency",
    description: "Case study ringan dari build MVP, commerce, agent, dan SaaS devcodeagency.",
    url: "/id/work",
    locale: "id_ID",
    alternateLocale: "en_US",
  },
};

export default function IndonesianWork() {
  return <WorkPage lang="id" />;
}
