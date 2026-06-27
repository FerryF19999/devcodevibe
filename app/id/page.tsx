import type { Metadata } from "next";
import { App } from "../components/App";

export const metadata: Metadata = {
  title: "devcodeagency | studio vibe coding AI-agent-native untuk indie hacker",
  description:
    "devcodeagency adalah studio AI-agent-native. MVP vibe coding done-for-you dalam 9 hari, template agent-ready, dan SaaS kecil. Bilingual EN/ID. Mulai $1,400.",
  alternates: {
    canonical: "/id",
    languages: {
      en: "/",
      id: "/id",
      "x-default": "/",
    },
  },
  openGraph: {
    locale: "id_ID",
    alternateLocale: "en_US",
    url: "/id",
  },
};

export default function IndonesianPage() {
  return <App lang="id" />;
}
