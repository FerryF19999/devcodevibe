import type { Metadata } from "next";
import { App } from "./components/App";
import "./drop/drop.css";

export const metadata: Metadata = {
  title: "Drop Website — live dalam hitungan detik | devcodeagency",
  description:
    "Drop folder atau ZIP static website, validasi index.html, lalu terbitkan sebagai temporary Cloudflare website tanpa setup akun di awal.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Drop Website. Langsung live.",
    description: "Folder atau ZIP static menjadi temporary Cloudflare website dalam satu flow.",
    url: "/",
    images: [{ url: "/og-drop.png", width: 1792, height: 939, alt: "Drop website. Langsung live." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Drop Website. Langsung live.",
    description: "Folder atau ZIP static menjadi temporary Cloudflare website dalam satu flow.",
    images: ["/og-drop.png"],
  },
};

export default function Page() {
  return <App lang="en" hero="drop" />;
}
