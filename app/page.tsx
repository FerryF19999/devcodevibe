import { App } from "./components/App";
import type { Lang } from "./lib/copy";

type Props = {
  searchParams?: Promise<{ lang?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const lang: Lang = params?.lang === "id" ? "id" : "en";
  return <App lang={lang} />;
}
