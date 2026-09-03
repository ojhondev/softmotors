import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BLOG_POSTS, getPost, formatBlogDate } from "@/content/blog";
import { VehiclePhoto } from "@/components/store/vehicle-photo";
import { ButtonLink } from "@/components/store/ui";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Artigo não encontrado" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, type: "article" },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    articleSection: post.category,
    author: { "@type": "Organization", name: "softmotors" },
  };

  return (
    <article className="wrap py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="flex items-center gap-2 text-[13px] text-ink-muted">
        <Link href="/blog">Blog</Link>
        <span>/</span>
        <span>{post.category}</span>
      </nav>

      <div className="mx-auto mt-4 max-w-2xl">
        <span className="text-[12px] font-semibold uppercase tracking-wide text-accent">
          {post.category}
        </span>
        <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight">
          {post.title}
        </h1>
        <div className="mt-3 text-[13px] text-ink-subtle">
          {formatBlogDate(post.date)} · {post.readMinutes} min de leitura
        </div>

        <VehiclePhoto
          seed={post.slug}
          className="mt-6 h-56 w-full"
          rounded
        />

        <div className="mt-8 flex flex-col gap-5">
          {post.body.map((block, i) => {
            if (block.type === "h2")
              return (
                <h2 key={i} className="mt-2 font-display text-xl font-bold">
                  {block.text}
                </h2>
              );
            if (block.type === "ul")
              return (
                <ul key={i} className="flex flex-col gap-2 pl-1">
                  {block.items.map((it, j) => (
                    <li key={j} className="flex gap-2.5 text-[15px] leading-relaxed text-[#334155]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {it}
                    </li>
                  ))}
                </ul>
              );
            return (
              <p key={i} className="text-[15px] leading-relaxed text-[#334155]">
                {block.text}
              </p>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 rounded-2xl bg-ink px-7 py-6 text-white sm:flex-row sm:items-center">
          <div className="flex-1">
            <div className="font-display text-lg font-extrabold">Pronto para escolher?</div>
            <p className="mt-1 text-[13px] text-[#CBD5E1]">
              Veja os seminovos com procedência no estoque da softmotors.
            </p>
          </div>
          <ButtonLink href="/estoque" size="sm">
            Ver estoque
          </ButtonLink>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <h2 className="font-display text-lg font-bold">Continue lendo</h2>
        <div className="mt-4 flex flex-col divide-y divide-line">
          {related.map((r) => (
            <Link key={r.slug} href={`/blog/${r.slug}`} className="group py-3">
              <div className="text-[15px] font-bold group-hover:text-accent">{r.title}</div>
              <div className="mt-0.5 text-[13px] text-ink-muted">{r.category}</div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
