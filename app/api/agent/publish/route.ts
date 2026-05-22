import { NextRequest, NextResponse } from "next/server";
import { PUBLISHED_ARTICLES, VERIFIED_AGENT, slugify, type AgentCmsResult, type PublishedArticle } from "../../../lib/agentCms";

export const runtime = "nodejs";

type PublishBody = {
  agentId?: string;
  draft?: Partial<AgentCmsResult>;
  article?: Partial<PublishedArticle> & {
    body?: string[];
    outline?: string[];
    readingTime?: string;
  };
  branch?: string;
  commitMessage?: string;
  dryRun?: boolean;
};

type GitHubContentResponse = {
  sha?: string;
  content?: string;
};

const DEFAULT_REPOSITORY = "FerryF19999/devcodevibe";
const CONTENT_PATH = "content/articles.json";

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/agent/publish",
    method: "POST",
    verifiedAgent: VERIFIED_AGENT.id,
    auth: {
      required: true,
      header: "x-agent-token",
      env: "AGENT_CMS_TOKEN",
    },
    github: {
      repositoryEnv: "GITHUB_REPOSITORY",
      defaultRepository: DEFAULT_REPOSITORY,
      branchEnv: "GITHUB_BRANCH",
      tokenEnv: "GITHUB_TOKEN or GITHUB_PAT",
      writes: CONTENT_PATH,
    },
    input: {
      agentId: VERIFIED_AGENT.id,
      draft: "AgentCmsResult from /api/agent/cms, optional",
      article: "PublishedArticle shape, optional",
      dryRun: "boolean, optional",
    },
  });
}

export async function POST(req: NextRequest) {
  const requiredToken = process.env.AGENT_CMS_TOKEN;
  if (!requiredToken) {
    return NextResponse.json({ error: "AGENT_CMS_TOKEN is required before publish can run" }, { status: 503 });
  }

  if (req.headers.get("x-agent-token") !== requiredToken) {
    return NextResponse.json({ error: "missing or invalid agent token" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as PublishBody;
  if (body.agentId !== VERIFIED_AGENT.id) {
    return NextResponse.json({ error: "unverified agent", verifiedAgent: VERIFIED_AGENT.id }, { status: 403 });
  }

  let article: PublishedArticle;
  try {
    article = normalizeArticle(body);
  } catch (error) {
    const message = error instanceof Error ? error.message : "invalid publish payload";
    return NextResponse.json({ error: message }, { status: 400 });
  }
  const repository = process.env.GITHUB_REPOSITORY || DEFAULT_REPOSITORY;
  const branch = body.branch || process.env.GITHUB_BRANCH || "main";
  const target = {
    repository,
    branch,
    path: CONTENT_PATH,
    articleUrl: `/journal/${article.slug}`,
  };

  if (body.dryRun) {
    return NextResponse.json({
      status: "dry_run",
      target,
      article,
    });
  }

  const githubToken = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT;
  if (!githubToken) {
    return NextResponse.json({ error: "GITHUB_TOKEN or GITHUB_PAT is required to publish" }, { status: 503 });
  }

  try {
    const current = await readArticlesFromGitHub(repository, branch, githubToken);
    const nextArticles = upsertArticle(current.articles, article);
    const content = `${JSON.stringify(nextArticles, null, 2)}\n`;
    const commit = await writeArticlesToGitHub({
      repository,
      branch,
      token: githubToken,
      sha: current.sha,
      content,
      message: body.commitMessage || `Publish article: ${article.title}`,
    });

    return NextResponse.json({
      status: "published",
      target,
      article,
      commit,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "publish failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

function normalizeArticle(body: PublishBody): PublishedArticle {
  const draft = body.draft;
  const draftArticle = draft?.article;
  const input = body.article ?? {};
  const slug = slugify(input.slug || draftArticle?.slug || input.title || draftArticle?.title || "");

  if (!slug) {
    throw new Error("article slug or title is required");
  }

  const title = clean(input.title || draftArticle?.title || slug.replace(/-/g, " "));
  const excerpt = clean(input.excerpt || draftArticle?.excerpt || `A new devcodeagency article about ${title}.`);
  const metaDescription = clean(
    input.metaDescription || draftArticle?.metaDescription || draft?.seo?.metaDescription || excerpt,
  ).slice(0, 180);
  const bodyParagraphs = normalizeStringList(input.body || draftArticle?.body || []);
  const outline = normalizeStringList(input.outline || draftArticle?.outline || []);
  const sections = normalizeSections(input.sections, outline, bodyParagraphs, excerpt);
  const faq = normalizeFaq(input.faq, draft?.geo?.answerBlocks);

  return {
    slug,
    date: clean(input.date || new Date().toISOString().slice(0, 10)),
    read: clean(input.read || input.readingTime || draftArticle?.readingTime || "5 min"),
    title,
    excerpt,
    metaDescription,
    tags: normalizeStringList(input.tags || draftArticle?.tags || [draft?.seo?.primaryKeyword, "SEO", "GEO"]).slice(0, 8),
    sections,
    faq,
  };
}

function normalizeSections(
  sections: PublishedArticle["sections"] | undefined,
  outline: string[],
  body: string[],
  fallback: string,
): PublishedArticle["sections"] {
  const validSections = (sections ?? [])
    .map((section) => ({
      h: clean(section.h),
      p: normalizeStringList(section.p),
    }))
    .filter((section) => section.h && section.p.length);

  if (validSections.length) return validSections;

  if (body.length) {
    return body.map((paragraph, index) => ({
      h: clean(outline[index] || (index === 0 ? "Overview" : `Section ${index + 1}`)),
      p: [paragraph],
    }));
  }

  return [{ h: "Overview", p: [fallback] }];
}

function normalizeFaq(
  faq: PublishedArticle["faq"] | undefined,
  answerBlocks: AgentCmsResult["geo"]["answerBlocks"] | undefined,
): PublishedArticle["faq"] {
  const source = faq?.length ? faq : answerBlocks;
  return (source ?? [])
    .map((item) => ({
      q: clean(item.q),
      a: clean(item.a),
    }))
    .filter((item) => item.q && item.a)
    .slice(0, 8);
}

function normalizeStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => clean(String(item ?? ""))).filter(Boolean);
}

function clean(value: unknown): string {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function upsertArticle(articles: PublishedArticle[], article: PublishedArticle) {
  const withoutExisting = articles.filter((item) => item.slug !== article.slug);
  return [article, ...withoutExisting].sort((a, b) => b.date.localeCompare(a.date));
}

async function readArticlesFromGitHub(repository: string, branch: string, token: string) {
  const res = await fetch(githubContentUrl(repository, branch), {
    headers: githubHeaders(token),
    cache: "no-store",
  });

  if (res.status === 404) {
    return {
      sha: undefined,
      articles: PUBLISHED_ARTICLES,
    };
  }

  if (!res.ok) {
    throw new Error(`github read failed: ${res.status}`);
  }

  const data = (await res.json()) as GitHubContentResponse;
  const raw = Buffer.from((data.content ?? "").replace(/\n/g, ""), "base64").toString("utf8");
  const parsed = JSON.parse(raw) as PublishedArticle[];

  return {
    sha: data.sha,
    articles: parsed,
  };
}

async function writeArticlesToGitHub({
  repository,
  branch,
  token,
  sha,
  content,
  message,
}: {
  repository: string;
  branch: string;
  token: string;
  sha?: string;
  content: string;
  message: string;
}) {
  const res = await fetch(githubContentUrl(repository, branch), {
    method: "PUT",
    headers: githubHeaders(token),
    body: JSON.stringify({
      message,
      branch,
      content: Buffer.from(content, "utf8").toString("base64"),
      ...(sha ? { sha } : {}),
    }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    commit?: { sha?: string; html_url?: string };
    content?: { path?: string; html_url?: string };
    message?: string;
  };

  if (!res.ok) {
    throw new Error(data.message || `github write failed: ${res.status}`);
  }

  return {
    sha: data.commit?.sha,
    url: data.commit?.html_url,
    contentPath: data.content?.path,
    contentUrl: data.content?.html_url,
  };
}

function githubContentUrl(repository: string, branch: string) {
  return `https://api.github.com/repos/${repository}/contents/${CONTENT_PATH}?ref=${encodeURIComponent(branch)}`;
}

function githubHeaders(token: string) {
  return {
    accept: "application/vnd.github+json",
    authorization: `Bearer ${token}`,
    "content-type": "application/json",
    "x-github-api-version": "2022-11-28",
  };
}
