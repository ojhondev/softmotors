"use server";

import { db } from "@/db";
import { leads, leadSourceEnum } from "@/db/schema";
import { getTenant } from "@/lib/tenant";
import { getVehicleBySlug } from "@/db/queries";

type LeadSource = (typeof leadSourceEnum.enumValues)[number];

export type LeadState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; message: string };

const PHONE_RE = /\d{8,}/;

export async function createLead(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const source = String(formData.get("source") ?? "contact") as LeadSource;
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phoneRaw = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const consent = formData.get("consent") != null;
  const vehicleSlug = String(formData.get("vehicleSlug") ?? "").trim();
  const contextRaw = String(formData.get("context") ?? "{}");

  // honeypot
  if (String(formData.get("company") ?? "")) {
    return { status: "success", message: "Recebemos sua mensagem." };
  }

  if (!name || name.length < 2) {
    return { status: "error", message: "Informe seu nome." };
  }
  if (!PHONE_RE.test(phoneRaw.replace(/\D/g, ""))) {
    return { status: "error", message: "Informe um telefone/WhatsApp válido." };
  }

  let context: Record<string, unknown> = {};
  try {
    context = JSON.parse(contextRaw);
  } catch {
    context = {};
  }

  const tenant = await getTenant();

  let vehicleId: string | null = null;
  let unitId: string | null = null;
  if (vehicleSlug) {
    const vehicle = await getVehicleBySlug(tenant.id, vehicleSlug);
    if (vehicle) {
      vehicleId = vehicle.id;
      unitId = vehicle.unitId;
      context.vehicle = `${vehicle.brand} ${vehicle.model} ${vehicle.modelYear}`;
      context.price = vehicle.price;
    }
  }

  await db.insert(leads).values({
    tenantId: tenant.id,
    unitId,
    vehicleId,
    source,
    status: "new",
    name,
    email: email || null,
    phone: phoneRaw,
    message: message || null,
    context: { ...context, consent },
  });

  return {
    status: "success",
    message: "Mensagem enviada! A loja entra em contato em instantes.",
  };
}
