ALTER TABLE "vehicles" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "vehicles_tenant_slug_uq" ON "vehicles" USING btree ("tenant_id","slug");