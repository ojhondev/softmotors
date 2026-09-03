import {
  and,
  asc,
  desc,
  eq,
  gte,
  ilike,
  lte,
  ne,
  or,
  sql,
  type SQL,
} from "drizzle-orm";

import { db } from "@/db";
import { vehicles } from "@/db/schema";

export type Vehicle = typeof vehicles.$inferSelect;

export type VehicleSort =
  | "relevancia"
  | "preco_asc"
  | "preco_desc"
  | "km_asc"
  | "ano_desc"
  | "recentes";

export type VehicleFilters = {
  q?: string;
  brand?: string;
  model?: string;
  bodyType?: string;
  transmission?: string;
  fuel?: string;
  condition?: "new" | "used";
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  kmMax?: number;
  unitId?: string;
  sort?: VehicleSort;
  page?: number;
  perPage?: number;
};

const PER_PAGE = 12;

function buildWhere(tenantId: string, f: VehicleFilters): SQL {
  const parts: (SQL | undefined)[] = [
    eq(vehicles.tenantId, tenantId),
    eq(vehicles.status, "published"),
  ];

  if (f.q) {
    const term = `%${f.q}%`;
    parts.push(
      or(
        ilike(vehicles.brand, term),
        ilike(vehicles.model, term),
        ilike(vehicles.version, term),
      ),
    );
  }
  if (f.brand) parts.push(ilike(vehicles.brand, f.brand));
  if (f.model) parts.push(ilike(vehicles.model, f.model));
  if (f.bodyType) parts.push(eq(vehicles.bodyType, f.bodyType));
  if (f.transmission) parts.push(eq(vehicles.transmission, f.transmission));
  if (f.fuel) parts.push(eq(vehicles.fuel, f.fuel));
  if (f.condition) parts.push(eq(vehicles.condition, f.condition));
  if (f.unitId) parts.push(eq(vehicles.unitId, f.unitId));
  if (f.priceMin != null) parts.push(gte(vehicles.price, String(f.priceMin)));
  if (f.priceMax != null) parts.push(lte(vehicles.price, String(f.priceMax)));
  if (f.yearMin != null) parts.push(gte(vehicles.modelYear, f.yearMin));
  if (f.kmMax != null) parts.push(lte(vehicles.mileageKm, f.kmMax));

  return and(...parts.filter((p): p is SQL => p !== undefined)) as SQL;
}

function orderFor(sort: VehicleSort = "relevancia") {
  switch (sort) {
    case "preco_asc":
      return [asc(vehicles.price)];
    case "preco_desc":
      return [desc(vehicles.price)];
    case "km_asc":
      return [asc(vehicles.mileageKm)];
    case "ano_desc":
      return [desc(vehicles.modelYear), asc(vehicles.mileageKm)];
    case "recentes":
      return [desc(vehicles.createdAt)];
    default:
      return [desc(vehicles.createdAt)];
  }
}

export async function listVehicles(tenantId: string, filters: VehicleFilters) {
  const where = buildWhere(tenantId, filters);
  const perPage = filters.perPage ?? PER_PAGE;
  const page = Math.max(1, filters.page ?? 1);

  const [rows, countRows] = await Promise.all([
    db
      .select()
      .from(vehicles)
      .where(where)
      .orderBy(...orderFor(filters.sort))
      .limit(perPage)
      .offset((page - 1) * perPage),
    db.select({ n: sql<number>`count(*)::int` }).from(vehicles).where(where),
  ]);

  const total = countRows[0]?.n ?? 0;
  return {
    rows,
    total,
    page,
    perPage,
    pageCount: Math.max(1, Math.ceil(total / perPage)),
  };
}

export async function getVehicleBySlug(tenantId: string, slug: string) {
  const rows = await db
    .select()
    .from(vehicles)
    .where(and(eq(vehicles.tenantId, tenantId), eq(vehicles.slug, slug)))
    .limit(1);
  return rows[0] ?? null;
}

export async function getSimilarVehicles(
  tenantId: string,
  vehicle: Vehicle,
  limit = 3,
) {
  return db
    .select()
    .from(vehicles)
    .where(
      and(
        eq(vehicles.tenantId, tenantId),
        eq(vehicles.status, "published"),
        ne(vehicles.id, vehicle.id),
        vehicle.bodyType
          ? eq(vehicles.bodyType, vehicle.bodyType)
          : eq(vehicles.brand, vehicle.brand),
      ),
    )
    .orderBy(sql`random()`)
    .limit(limit);
}

export async function getFeaturedVehicles(tenantId: string, limit = 4) {
  return db
    .select()
    .from(vehicles)
    .where(and(eq(vehicles.tenantId, tenantId), eq(vehicles.status, "published")))
    .orderBy(desc(vehicles.createdAt))
    .limit(limit);
}

/** Marcas e modelos distintos, com contagem, para as opções de filtro. */
export async function getFilterFacets(tenantId: string) {
  const base = and(
    eq(vehicles.tenantId, tenantId),
    eq(vehicles.status, "published"),
  );

  const [brands, models, bodyTypes] = await Promise.all([
    db
      .select({ value: vehicles.brand, n: sql<number>`count(*)::int` })
      .from(vehicles)
      .where(base)
      .groupBy(vehicles.brand)
      .orderBy(vehicles.brand),
    db
      .select({
        value: vehicles.model,
        brand: vehicles.brand,
        n: sql<number>`count(*)::int`,
      })
      .from(vehicles)
      .where(base)
      .groupBy(vehicles.model, vehicles.brand)
      .orderBy(vehicles.model),
    db
      .select({ value: vehicles.bodyType, n: sql<number>`count(*)::int` })
      .from(vehicles)
      .where(base)
      .groupBy(vehicles.bodyType)
      .orderBy(vehicles.bodyType),
  ]);

  return { brands, models, bodyTypes };
}

export async function getInventoryCount(tenantId: string) {
  const rows = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(vehicles)
    .where(and(eq(vehicles.tenantId, tenantId), eq(vehicles.status, "published")));
  return rows[0]?.n ?? 0;
}
