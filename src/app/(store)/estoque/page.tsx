import type { Metadata } from "next";
import Link from "next/link";

import { getTenant, getUnits } from "@/lib/tenant";
import {
  listVehicles,
  getFilterFacets,
  type VehicleFilters,
  type VehicleSort,
} from "@/db/queries";
import { VehicleCard } from "@/components/store/vehicle-card";
import { FilterBar } from "@/components/store/filter-bar";
import { SortSelect } from "@/components/store/sort-select";
import { Pagination } from "@/components/store/pagination";

type SP = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

async function resolveFilters(sp: SP) {
  const tenant = await getTenant();
  const units = await getUnits(tenant.id);
  const unitSlug = first(sp.unidade);
  const unit = units.find((u) => u.slug === unitSlug);

  const filters: VehicleFilters = {
    q: first(sp.q),
    brand: first(sp.brand),
    model: first(sp.model),
    bodyType: first(sp.bodyType),
    transmission: first(sp.transmission),
    fuel: first(sp.fuel),
    unitId: unit?.id,
    priceMin: first(sp.priceMin) ? Number(first(sp.priceMin)) : undefined,
    priceMax: first(sp.priceMax) ? Number(first(sp.priceMax)) : undefined,
    yearMin: first(sp.yearMin) ? Number(first(sp.yearMin)) : undefined,
    kmMax: first(sp.kmMax) ? Number(first(sp.kmMax)) : undefined,
    sort: (first(sp.sort) as VehicleSort) ?? "relevancia",
    page: first(sp.page) ? Number(first(sp.page)) : 1,
  };
  return { tenant, units, unit, filters };
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SP>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const { unit } = await resolveFilters(sp);
  const where = unit ? unit.city : "Maringá e região";
  const brand = first(sp.brand);
  const subject = brand ? `${brand} seminovos` : "Carros seminovos";
  return {
    title: `${subject} à venda em ${where}`,
    description: `${subject} com procedência à venda em ${where}. Filtre por marca, ano e preço e fale direto com a loja.`,
  };
}

export default async function EstoquePage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const { tenant, units, unit, filters } = await resolveFilters(sp);
  const [result, facets] = await Promise.all([
    listVehicles(tenant.id, filters),
    getFilterFacets(tenant.id),
  ]);

  const cleanParams: Record<string, string> = {};
  for (const [k, v] of Object.entries(sp)) {
    const val = first(v);
    if (val) cleanParams[k] = val;
  }

  const where = unit ? `${unit.city}` : "Maringá e região";

  const appliedChips: { key: string; label: string }[] = [];
  if (filters.bodyType) appliedChips.push({ key: "bodyType", label: filters.bodyType });
  if (filters.brand) appliedChips.push({ key: "brand", label: filters.brand });
  if (filters.model) appliedChips.push({ key: "model", label: filters.model });
  if (filters.transmission)
    appliedChips.push({ key: "transmission", label: filters.transmission });
  if (filters.fuel) appliedChips.push({ key: "fuel", label: filters.fuel });
  if (filters.q) appliedChips.push({ key: "q", label: `"${filters.q}"` });

  function withoutParam(key: string): string {
    const p = new URLSearchParams(cleanParams);
    p.delete(key);
    p.delete("page");
    const qs = p.toString();
    return qs ? `/estoque?${qs}` : "/estoque";
  }

  return (
    <>
      <FilterBar
        facets={facets}
        units={units.map((u) => ({ label: `${u.city} (${u.name.replace("softmotors ", "")})`, value: u.slug }))}
      />

      <div className="wrap py-6">
        <nav className="mb-3 flex items-center gap-2 text-[13px] text-ink-muted">
          <Link href="/">Início</Link>
          <span>/</span>
          <span>Carros à venda</span>
          <span>/</span>
          <span>{where}</span>
        </nav>

        <h1 className="font-display text-[26px] font-extrabold tracking-tight">
          Carros à venda em {where}
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
          Seminovos com procedência selecionada. Filtre por marca, ano e preço, compare e
          fale direto com a loja.
        </p>

        <div className="my-5 flex items-center justify-between gap-3">
          <div className="text-sm font-bold">
            {result.total} {result.total === 1 ? "veículo encontrado" : "veículos encontrados"}
          </div>
          <SortSelect />
        </div>

        {appliedChips.length > 0 && (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {appliedChips.map((c) => (
              <Link
                key={c.key}
                href={withoutParam(c.key)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF2F6] px-3 py-1.5 text-[12.5px] font-semibold text-[#334155]"
              >
                {c.label} <span className="text-ink-subtle">×</span>
              </Link>
            ))}
            <Link href="/estoque" className="text-[12.5px] font-semibold text-accent">
              Limpar filtros
            </Link>
          </div>
        )}

        {result.rows.length === 0 ? (
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-10 text-center">
            <p className="font-display text-lg font-bold">Nenhum veículo com esses filtros</p>
            <p className="mt-1 text-sm text-ink-muted">
              Tente ampliar a busca ou{" "}
              <Link href="/estoque" className="font-semibold text-accent">
                limpar os filtros
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {result.rows.map((v) => (
              <VehicleCard
                key={v.id}
                v={v}
                cityLabel={`${units.find((u) => u.id === v.unitId)?.city ?? ""}, PR`}
              />
            ))}
          </div>
        )}

        <Pagination page={result.page} pageCount={result.pageCount} params={cleanParams} />
      </div>
    </>
  );
}
