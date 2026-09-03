CREATE TYPE "public"."lead_source" AS ENUM('vdp', 'financing', 'trade_in', 'contact', 'whatsapp', 'reservation', 'saved_search');--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('new', 'in_contact', 'scheduled', 'won', 'lost');--> statement-breakpoint
CREATE TYPE "public"."plan" AS ENUM('essential', 'prime');--> statement-breakpoint
CREATE TYPE "public"."tenant_status" AS ENUM('onboarding', 'active', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."vehicle_condition" AS ENUM('new', 'used');--> statement-breakpoint
CREATE TYPE "public"."vehicle_status" AS ENUM('draft', 'published', 'reserved', 'sold', 'archived');--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"unit_id" uuid,
	"vehicle_id" uuid,
	"source" "lead_source" NOT NULL,
	"status" "lead_status" DEFAULT 'new' NOT NULL,
	"name" text,
	"email" text,
	"phone" text,
	"message" text,
	"context" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"lost_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"legal_name" text,
	"cnpj" text,
	"plan" "plan" DEFAULT 'essential' NOT NULL,
	"status" "tenant_status" DEFAULT 'onboarding' NOT NULL,
	"primary_domain" text,
	"theme" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"feature_flags" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tenants_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "units" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"cnpj" text,
	"address_line" text,
	"city" text,
	"state" text,
	"zip" text,
	"phone" text,
	"whatsapp" text,
	"hours" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"unit_id" uuid,
	"external_id" text,
	"condition" "vehicle_condition" DEFAULT 'used' NOT NULL,
	"status" "vehicle_status" DEFAULT 'draft' NOT NULL,
	"brand" text NOT NULL,
	"model" text NOT NULL,
	"version" text,
	"model_year" integer,
	"production_year" integer,
	"mileage_km" integer,
	"transmission" text,
	"fuel" text,
	"body_type" text,
	"color" text,
	"doors" integer,
	"plate_end" text,
	"price" numeric(12, 2),
	"fipe_code" text,
	"fipe_price" numeric(12, 2),
	"features" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"photos" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"single_owner" boolean DEFAULT false NOT NULL,
	"accepts_trade" boolean DEFAULT true NOT NULL,
	"description" text,
	"locked_fields" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"synced_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_unit_id_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."units"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "units" ADD CONSTRAINT "units_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_unit_id_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."units"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "units_tenant_slug_uq" ON "units" USING btree ("tenant_id","slug");--> statement-breakpoint
CREATE UNIQUE INDEX "vehicles_tenant_external_uq" ON "vehicles" USING btree ("tenant_id","external_id");