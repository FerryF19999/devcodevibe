import type { Metadata } from "next";
import { App } from "../components/App";
import "../drop/drop.css";

export const metadata: Metadata = {
  title: "devcodeagency | Drop, preview, dan build website dengan Codex",
  description:
    "Drop folder static atau ZIP untuk live preview, lanjut build dengan Codex memakai token usage, atau hire developer bulanan.",
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
  return <App lang="id" hero="drop" />;
}
