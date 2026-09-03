import type { Metadata } from "next";
import Link from "next/link";

import { BLOG_POSTS, formatBlogDate } from "@/content/blog";
import { Card } from "@/components/store/ui";
import { VehiclePhoto } from "@/components/store/vehicle-photo";

export const metadata: Metadata = {
  title: "Blog — guias de compra e dicas",
  description:
    "Guias de compra, financiamento, troca e mercado automotivo para você comprar seu seminovo com segurança.",
};

export default function BlogPage() {
  const [featured, ...rest] = [...BLOG_POSTS].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <div className="wrap py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">Blog</h1>
      <p className="mt-2 text-[15px] text-ink-muted">
        Guias práticos para comprar, financiar e trocar seu carro sem susto.
      </p>

      {featured && (
        <Link href={`/blog/${featured.slug}`} className="mt-8 block">
          <Card className="grid overflow-hidden transition-shadow hover:shadow-card md:grid-cols-2">
            <VehiclePhoto seed={featured.slug} className="min-h-52 w-full" />
            <div className="p-7">
              <span className="text-[12px] font-semibold uppercase tracking-wide text-accent">
                {featured.category}
              </span>
              <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight">
                {featured.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{featured.excerpt}</p>
              <div className="mt-4 text-[12px] text-ink-subtle">
                {formatBlogDate(featured.date)} · {featured.readMinutes} min de leitura
              </div>
            </div>
          </Card>
        </Link>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-card">
              <VehiclePhoto seed={post.slug} className="h-40 w-full" />
              <div className="flex flex-1 flex-col p-5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-accent">
                  {post.category}
                </span>
                <h3 className="mt-1.5 font-display text-[17px] font-bold leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-ink-muted">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 text-[12px] text-ink-subtle">
                  {formatBlogDate(post.date)} · {post.readMinutes} min
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
