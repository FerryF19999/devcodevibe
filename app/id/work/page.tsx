import type { Metadata } from "next";
import { WorkPage } from "../../components/WorkPage";

export const metadata: Metadata = {
  title: "Karya terpilih | devcodeagency",
  description:
    "Karya SEO dan web development Muhammad Ferry Fitriadi: technical SEO, local SEO, content strategy, GEO, dan page speed optimization.",
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
    description: "Case study SEO, GEO, local ranking, dan page speed dari portfolio Ferry.",
    url: "/id/work",
    locale: "id_ID",
    alternateLocale: "en_US",
  },
};

export default function IndonesianWork() {
  return <WorkPage lang="id" />;
}
