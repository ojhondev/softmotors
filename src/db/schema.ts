import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * Fundação multi-tenant da SoftMotors. Regra inegociável (ver docs/PRD.md §11):
 * toda tabela de dados de cliente carrega `tenantId` e nenhuma query roda sem
 * filtrar por ele.
 */

export const planEnum = pgEnum("plan", ["essential", "prime"]);
export const tenantStatusEnum = pgEnum("tenant_status", [
  "onboarding",
  "active",
  "suspended",
]);
export const vehicleConditionEnum = pgEnum("vehicle_condition", ["new", "used"]);
export const vehicleStatusEnum = pgEnum("vehicle_status", [
  "draft",
  "published",
  "reserved",
  "sold",
  "archived",
]);
export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "in_contact",
  "scheduled",
  "won",
  "lost",
]);
export const leadSourceEnum = pgEnum("lead_source", [
  "vdp",
  "financing",
  "trade_in",
  "contact",
  "whatsapp",
  "reservation",
  "saved_search",
]);

/** Concessionária cliente. */
export const tenants = pgTable("tenants", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  legalName: text("legal_name"),
  cnpj: text("cnpj"),
  plan: planEnum("plan").notNull().default("essential"),
  status: tenantStatusEnum("status").notNull().default("onboarding"),
  primaryDomain: text("primary_domain"),
  /** Tokens de tema, preset de layout, blocos da home, flags de módulo. */
  theme: jsonb("theme").$type<Record<string, unknown>>().notNull().default({}),
  featureFlags: jsonb("feature_flags")
    .$type<Record<string, boolean>>()
    .notNull()
    .default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Loja física do cliente (1 no Essential, N no Prime). */
export const units = pgTable(
  "units",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    cnpj: text("cnpj"),
    addressLine: text("address_line"),
    city: text("city"),
    state: text("state"),
    zip: text("zip"),
    phone: text("phone"),
    whatsapp: text("whatsapp"),
    hours: jsonb("hours").$type<Record<string, string>>(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("units_tenant_slug_uq").on(t.tenantId, t.slug)],
);

/** Veículo do estoque. Fonte primária = integrador; complementos manuais. */
export const vehicles = pgTable(
  "vehicles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    unitId: uuid("unit_id").references(() => units.id, { onDelete: "set null" }),
    /** Código do veículo no ERP/DMS de origem, quando houver. */
    externalId: text("external_id"),
    condition: vehicleConditionEnum("condition").notNull().default("used"),
    status: vehicleStatusEnum("status").notNull().default("draft"),
    brand: text("brand").notNull(),
    model: text("model").notNull(),
    version: text("version"),
    modelYear: integer("model_year"),
    productionYear: integer("production_year"),
    mileageKm: integer("mileage_km"),
    transmission: text("transmission"),
    fuel: text("fuel"),
    bodyType: text("body_type"),
    color: text("color"),
    doors: integer("doors"),
    plateEnd: text("plate_end"),
    price: numeric("price", { precision: 12, scale: 2 }),
    fipeCode: text("fipe_code"),
    fipePrice: numeric("fipe_price", { precision: 12, scale: 2 }),
    features: jsonb("features").$type<string[]>().notNull().default([]),
    photos: jsonb("photos").$type<string[]>().notNull().default([]),
    singleOwner: boolean("single_owner").notNull().default(false),
    acceptsTrade: boolean("accepts_trade").notNull().default(true),
    description: text("description"),
    /** De→para e campos travados para não serem sobrescritos pela sincronização. */
    lockedFields: jsonb("locked_fields").$type<string[]>().notNull().default([]),
    syncedAt: timestamp("synced_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("vehicles_tenant_external_uq").on(t.tenantId, t.externalId),
  ],
);

/** Lead — captura de qualquer formulário do site. NÃO é CRM (ver PRD §7.4). */
export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  unitId: uuid("unit_id").references(() => units.id, { onDelete: "set null" }),
  vehicleId: uuid("vehicle_id").references(() => vehicles.id, {
    onDelete: "set null",
  }),
  source: leadSourceEnum("source").notNull(),
  status: leadStatusEnum("status").notNull().default("new"),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  message: text("message"),
  /** Simulação, dados da troca, UTM, página de origem, score. */
  context: jsonb("context").$type<Record<string, unknown>>().notNull().default({}),
  lostReason: text("lost_reason"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const tenantsRelations = relations(tenants, ({ many }) => ({
  units: many(units),
  vehicles: many(vehicles),
  leads: many(leads),
}));

export const unitsRelations = relations(units, ({ one, many }) => ({
  tenant: one(tenants, { fields: [units.tenantId], references: [tenants.id] }),
  vehicles: many(vehicles),
}));

export const vehiclesRelations = relations(vehicles, ({ one }) => ({
  tenant: one(tenants, { fields: [vehicles.tenantId], references: [tenants.id] }),
  unit: one(units, { fields: [vehicles.unitId], references: [units.id] }),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  tenant: one(tenants, { fields: [leads.tenantId], references: [tenants.id] }),
  unit: one(units, { fields: [leads.unitId], references: [units.id] }),
  vehicle: one(vehicles, {
    fields: [leads.vehicleId],
    references: [vehicles.id],
  }),
}));
