import type { Metadata } from "next";
import { WorkPage } from "../components/WorkPage";

export const metadata: Metadata = {
  title: "Selected work | devcodeagency",
  description:
    "Selected devcodeagency work: lightly redacted MVPs, commerce builds, agent-first tools, and calm-tech product sprints.",
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
    description: "Lightly redacted case studies from devcodeagency MVP, commerce, agent, and SaaS builds.",
    url: "/work",
  },
};

export default function Work() {
  return <WorkPage lang="en" />;
}
