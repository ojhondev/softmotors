import type { MetadataRoute } from "next";

import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getTenant } from "@/lib/tenant";
import { BLOG_POSTS } from "@/content/blog";

const BASE = "https://softmotors.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tenant = await getTenant();
  const rows = await db
    .select({ slug: vehicles.slug, updatedAt: vehicles.updatedAt })
    .from(vehicles)
    .where(and(eq(vehicles.tenantId, tenant.id), eq(vehicles.status, "published")));

  const staticRoutes = [
    "",
    "/estoque",
    "/financiamento",
    "/avaliar",
    "/lojas",
    "/sobre",
    "/blog",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const vehicleRoutes = rows.map((r) => ({
    url: `${BASE}/veiculo/${r.slug}`,
    lastModified: r.updatedAt ?? new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogRoutes = BLOG_POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...vehicleRoutes, ...blogRoutes];
}
