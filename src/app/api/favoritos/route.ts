import { NextResponse } from "next/server";

import { getTenant, getUnits } from "@/lib/tenant";
import { getVehiclesBySlugs } from "@/db/queries";

/** Recebe ?slugs=a,b,c (favoritos do dispositivo) e devolve os veículos. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const slugs = (url.searchParams.get("slugs") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const tenant = await getTenant();
  const [vehicles, units] = await Promise.all([
    getVehiclesBySlugs(tenant.id, slugs),
    getUnits(tenant.id),
  ]);

  const cityByUnit = new Map(units.map((u) => [u.id, `${u.city}, ${u.state}`]));

  return NextResponse.json({
    vehicles: vehicles.map((v) => ({
      id: v.id,
      slug: v.slug,
      brand: v.brand,
      model: v.model,
      version: v.version,
      modelYear: v.modelYear,
      mileageKm: v.mileageKm,
      transmission: v.transmission,
      fuel: v.fuel,
      color: v.color,
      price: v.price,
      fipePrice: v.fipePrice,
      photos: v.photos,
      singleOwner: v.singleOwner,
      createdAt: v.createdAt,
      cityLabel: v.unitId ? cityByUnit.get(v.unitId) ?? null : null,
    })),
  });
}
