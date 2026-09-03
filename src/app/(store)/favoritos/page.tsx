"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getFavorites, onFavoritesChange } from "@/lib/favorites";
import { VehicleCard, type VehicleCardData } from "@/components/store/vehicle-card";
import { Heart } from "@/components/store/icons";

type FavVehicle = VehicleCardData & { cityLabel: string | null };

export default function FavoritosPage() {
  const [status, setStatus] = useState<"loading" | "ready">("loading");
  const [vehicles, setVehicles] = useState<FavVehicle[]>([]);

  useEffect(() => {
    let alive = true;

    async function load() {
      const slugs = getFavorites();
      if (slugs.length === 0) {
        if (alive) {
          setVehicles([]);
          setStatus("ready");
        }
        return;
      }
      try {
        const res = await fetch(`/api/favoritos?slugs=${slugs.join(",")}`);
        const data = await res.json();
        if (alive) {
          setVehicles(data.vehicles ?? []);
          setStatus("ready");
        }
      } catch {
        if (alive) setStatus("ready");
      }
    }

    load();
    const off = onFavoritesChange(load);
    return () => {
      alive = false;
      off();
    };
  }, []);

  return (
    <div className="wrap py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">Favoritos</h1>
      <p className="mt-2 text-[15px] text-ink-muted">
        Os veículos que você salvou neste dispositivo.
      </p>

      {status === "loading" && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-[var(--radius-card)] border border-line bg-surface"
            />
          ))}
        </div>
      )}

      {status === "ready" && vehicles.length === 0 && (
        <div className="mt-8 rounded-[var(--radius-card)] border border-line bg-surface p-12 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-weak text-accent">
            <Heart size={22} />
          </span>
          <p className="mt-4 font-display text-lg font-bold">
            Você ainda não salvou nenhum veículo
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            Toque no coração dos anúncios para guardá-los aqui.
          </p>
          <Link
            href="/estoque"
            className="mt-5 inline-block rounded-full bg-accent px-5 py-3 text-sm font-bold text-white hover:bg-accent-hover"
          >
            Ver estoque
          </Link>
        </div>
      )}

      {status === "ready" && vehicles.length > 0 && (
        <>
          <div className="mt-6 text-sm font-bold">
            {vehicles.length} {vehicles.length === 1 ? "veículo salvo" : "veículos salvos"}
          </div>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((v) => (
              <VehicleCard key={v.id} v={v} cityLabel={v.cityLabel ?? undefined} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
