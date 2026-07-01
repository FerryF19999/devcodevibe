import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { detailLanguageAlternates, WorkDetailPage } from "../../../components/WorkDetailPage";
import { getWorkCase, getWorkCases, workPath } from "../../../lib/work";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getWorkCases("id").map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkCase("id", slug);

  if (!work) {
    return {};
  }

  return {
    title: `${work.client} detail karya | devcodeagency`,
    description: `${work.client}: ${work.summary}`,
    alternates: {
      canonical: workPath("id", work.slug),
      languages: detailLanguageAlternates(work.slug),
    },
    openGraph: {
      title: `${work.client} | karya terpilih devcodeagency`,
      description: work.summary,
      url: workPath("id", work.slug),
      locale: "id_ID",
      alternateLocale: "en_US",
    },
  };
}

export default async function IndonesianWorkDetail({ params }: Props) {
  const { slug } = await params;
  const work = getWorkCase("id", slug);

  if (!work) {
    notFound();
  }

  return <WorkDetailPage lang="id" work={work} />;
}
