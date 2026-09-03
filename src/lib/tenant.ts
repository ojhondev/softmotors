import { cache } from "react";
import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { tenants, units } from "@/db/schema";

/** Slug do tenant servido enquanto não há resolução por domínio (PRD §3.1). */
export const DEFAULT_TENANT_SLUG = "softmotors";

export type Tenant = typeof tenants.$inferSelect;
export type Unit = typeof units.$inferSelect;

/**
 * Resolve o tenant da requisição. Hoje sempre o tenant demo; quando houver
 * multi-tenant por domínio, isto lê o host do middleware.
 */
export const getTenant = cache(async (): Promise<Tenant> => {
  const rows = await db
    .select()
    .from(tenants)
    .where(eq(tenants.slug, DEFAULT_TENANT_SLUG))
    .limit(1);

  const tenant = rows[0];
  if (!tenant) {
    throw new Error(
      `Tenant "${DEFAULT_TENANT_SLUG}" não encontrado. Rode \`npm run db:seed\`.`,
    );
  }
  return tenant;
});

export const getUnits = cache(async (tenantId: string): Promise<Unit[]> => {
  return db
    .select()
    .from(units)
    .where(eq(units.tenantId, tenantId))
    .orderBy(asc(units.createdAt), asc(units.name));
});
