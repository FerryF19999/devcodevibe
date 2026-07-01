import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { detailLanguageAlternates, WorkDetailPage } from "../../components/WorkDetailPage";
import { getWorkCase, getWorkCases, workPath } from "../../lib/work";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getWorkCases("en").map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkCase("en", slug);

  if (!work) {
    return {};
  }

  return {
    title: `${work.client} work detail | devcodeagency`,
    description: `${work.client}: ${work.summary}`,
    alternates: {
      canonical: workPath("en", work.slug),
      languages: detailLanguageAlternates(work.slug),
    },
    openGraph: {
      title: `${work.client} | devcodeagency selected work`,
      description: work.summary,
      url: workPath("en", work.slug),
    },
  };
}

export default async function WorkDetail({ params }: Props) {
  const { slug } = await params;
  const work = getWorkCase("en", slug);

  if (!work) {
    notFound();
  }

  return <WorkDetailPage lang="en" work={work} />;
}
