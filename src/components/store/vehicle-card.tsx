import Link from "next/link";

import type { Vehicle } from "@/db/queries";
import { entryInstallment } from "@/lib/finance";
import { money, moneyCents, km } from "@/lib/format";
import { Heart } from "@/components/store/icons";
import { VehiclePhoto } from "@/components/store/vehicle-photo";

export function vehicleBadge(v: Vehicle): { label: string; tone: "dark" | "green" } | null {
  const price = Number(v.price);
  const fipe = Number(v.fipePrice);
  const isRecent =
    v.createdAt && Date.now() - new Date(v.createdAt).getTime() < 7 * 864e5;
  if (fipe && price && price < fipe * 0.97) return { label: "Abaixo da FIPE", tone: "dark" };
  if (v.singleOwner) return { label: "Único dono", tone: "dark" };
  if (isRecent) return { label: "Recém-chegado", tone: "green" };
  return null;
}

export function VehicleCard({ v, cityLabel }: { v: Vehicle; cityLabel?: string }) {
  const badge = vehicleBadge(v);
  const parcela = entryInstallment(v.price);

  return (
    <Link
      href={`/veiculo/${v.slug}`}
      className="group block overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-shadow hover:shadow-card"
    >
      <div className="relative aspect-[16/10]">
        <VehiclePhoto seed={v.id} className="h-full w-full" />
        {badge && (
          <span
            className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white ${
              badge.tone === "green" ? "bg-success" : "bg-ink"
            }`}
          >
            {badge.label}
          </span>
        )}
        <span className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink">
          <Heart size={15} />
        </span>
        {v.photos.length > 0 && (
          <span className="absolute bottom-2.5 right-2.5 rounded-full bg-ink/70 px-2 py-1 text-[11px] text-white">
            {v.photos.length} fotos
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="text-[15px] font-bold leading-tight">
          {v.brand} {v.model} {v.modelYear}
        </div>
        <div className="mt-0.5 line-clamp-1 text-[12.5px] text-ink-muted">{v.version}</div>
        <div className="mt-2.5 flex flex-wrap gap-x-1.5 text-[12.5px] text-ink-muted">
          <span>{km(v.mileageKm)}</span>
          <span>·</span>
          <span>{v.transmission}</span>
          <span>·</span>
          <span>{v.fuel?.split(" ")[0]}</span>
        </div>
        <div className="mt-1 text-[12.5px] text-ink-muted">
          {cityLabel ?? `${v.color}`}
        </div>
        <div className="mt-3 font-display text-xl font-extrabold tracking-tight">
          {money(v.price)}
        </div>
        {parcela && (
          <div className="text-[12px] text-ink-muted">
            ou 48x de {moneyCents(parcela)}
          </div>
        )}
      </div>
    </Link>
  );
}
