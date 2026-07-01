import type { Metadata } from "next";
import { WorkPage } from "../components/WorkPage";

export const metadata: Metadata = {
  title: "Selected work | devcodeagency",
  description:
    "Selected SEO and web development work from Muhammad Ferry Fitriadi: technical SEO, local SEO, content strategy, GEO, and page speed optimization.",
  alternates: {
    canonical: "/work",
    languages: {
      en: "/work",
      id: "/id/work",
      "x-default": "/work",
    },
  },
  openGraph: {
    title: "Selected work | devcodeagency",
    description: "SEO, GEO, local ranking, and page speed case studies from Ferry's portfolio.",
    url: "/work",
  },
};

export default function Work() {
  return <WorkPage lang="en" />;
}
