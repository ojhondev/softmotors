"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ChevronDown, MapPin, Sliders } from "@/components/store/icons";

type Option = { label: string; value: string; count?: number };

type FacetInput = {
  brands: { value: string; n: number }[];
  models: { value: string; brand: string; n: number }[];
  bodyTypes: { value: string | null; n: number }[];
};

const PRICE_OPTS: Option[] = [
  { label: "Até R$ 60 mil", value: "0-60000" },
  { label: "R$ 60 mil – R$ 100 mil", value: "60000-100000" },
  { label: "R$ 100 mil – R$ 150 mil", value: "100000-150000" },
  { label: "R$ 150 mil – R$ 250 mil", value: "150000-250000" },
  { label: "Acima de R$ 250 mil", value: "250000-" },
];

const YEAR_OPTS: Option[] = [
  { label: "2024 ou mais novo", value: "2024" },
  { label: "2022 ou mais novo", value: "2022" },
  { label: "2020 ou mais novo", value: "2020" },
  { label: "2018 ou mais novo", value: "2018" },
];

const KM_OPTS: Option[] = [
  { label: "Até 20.000 km", value: "20000" },
  { label: "Até 40.000 km", value: "40000" },
  { label: "Até 60.000 km", value: "60000" },
  { label: "Até 100.000 km", value: "100000" },
];

const TRANSMISSION_OPTS: Option[] = [
  { label: "Automático", value: "Automático" },
  { label: "Manual", value: "Manual" },
];

const FUEL_OPTS: Option[] = [
  { label: "Gasolina e álcool", value: "Gasolina e álcool" },
  { label: "Gasolina", value: "Gasolina" },
  { label: "Diesel", value: "Diesel" },
];

export function FilterBar({ facets, units }: { facets: FacetInput; units: Option[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setOpen(null);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  function apply(next: Record<string, string | null>) {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v == null || v === "") sp.delete(k);
      else sp.set(k, v);
    }
    sp.delete("page");
    router.push(`${pathname}?${sp.toString()}`);
    setOpen(null);
  }

  const brandOpts: Option[] = facets.brands.map((b) => ({
    label: b.value,
    value: b.value,
    count: b.n,
  }));
  const currentBrand = params.get("brand");
  const modelOpts: Option[] = facets.models
    .filter((m) => !currentBrand || m.brand === currentBrand)
    .map((m) => ({ label: m.value, value: m.value, count: m.n }));
  const bodyOpts: Option[] = facets.bodyTypes
    .filter((b): b is { value: string; n: number } => !!b.value)
    .map((b) => ({ label: b.value, value: b.value, count: b.n }));

  const priceValue =
    params.get("priceMin") || params.get("priceMax")
      ? `${params.get("priceMin") ?? "0"}-${params.get("priceMax") ?? ""}`
      : null;

  const chips: {
    key: string;
    label: string;
    active: string | null;
    opts: Option[];
    onPick: (v: string) => void;
    icon?: React.ReactNode;
  }[] = [
    {
      key: "unidade",
      label: "Cidade",
      active: units.find((u) => u.value === params.get("unidade"))?.label ?? null,
      opts: units,
      onPick: (v) => apply({ unidade: v }),
      icon: <MapPin size={14} />,
    },
    {
      key: "bodyType",
      label: "Tipo",
      active: params.get("bodyType"),
      opts: bodyOpts,
      onPick: (v) => apply({ bodyType: v }),
    },
    {
      key: "price",
      label: "Preço",
      active: PRICE_OPTS.find((o) => o.value === priceValue)?.label ?? null,
      opts: PRICE_OPTS,
      onPick: (v) => {
        const [min, max] = v.split("-");
        apply({ priceMin: min && min !== "0" ? min : null, priceMax: max || null });
      },
    },
    {
      key: "brand",
      label: "Marca",
      active: params.get("brand"),
      opts: brandOpts,
      onPick: (v) => apply({ brand: v, model: null }),
    },
    {
      key: "model",
      label: "Modelo",
      active: params.get("model"),
      opts: modelOpts,
      onPick: (v) => apply({ model: v }),
    },
    {
      key: "yearMin",
      label: "Ano",
      active: YEAR_OPTS.find((o) => o.value === params.get("yearMin"))?.label ?? null,
      opts: YEAR_OPTS,
      onPick: (v) => apply({ yearMin: v }),
    },
    {
      key: "kmMax",
      label: "Quilometragem",
      active: KM_OPTS.find((o) => o.value === params.get("kmMax"))?.label ?? null,
      opts: KM_OPTS,
      onPick: (v) => apply({ kmMax: v }),
    },
    {
      key: "transmission",
      label: "Câmbio",
      active: params.get("transmission"),
      opts: TRANSMISSION_OPTS,
      onPick: (v) => apply({ transmission: v }),
    },
    {
      key: "fuel",
      label: "Combustível",
      active: params.get("fuel"),
      opts: FUEL_OPTS,
      onPick: (v) => apply({ fuel: v }),
    },
  ];

  return (
    <div ref={barRef} className="border-t border-[#EEF1F4] bg-surface">
      <div className="wrap flex flex-wrap items-center gap-2.5 py-3">
        {chips.map((chip) => {
          const isActive = !!chip.active;
          return (
            <div key={chip.key} className="relative">
              <button
                onClick={() => setOpen(open === chip.key ? null : chip.key)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-[15px] py-2 text-[13.5px] font-semibold ${
                  isActive
                    ? "border-accent bg-accent-weak text-accent"
                    : "border-line-strong text-[#334155]"
                }`}
              >
                {chip.icon}
                {chip.active ?? chip.label}
                <ChevronDown size={12} className={isActive ? "text-accent" : "text-ink-subtle"} />
              </button>

              {open === chip.key && (
                <div className="absolute left-0 top-[calc(100%+8px)] z-30 max-h-72 w-60 overflow-auto rounded-xl border border-line bg-surface p-1.5 shadow-card">
                  {isActive && (
                    <button
                      onClick={() => apply({ [chip.key]: null })}
                      className="mb-1 w-full rounded-lg px-3 py-2 text-left text-[13px] font-semibold text-accent hover:bg-accent-weak"
                    >
                      Limpar
                    </button>
                  )}
                  {chip.opts.length === 0 && (
                    <div className="px-3 py-2 text-[13px] text-ink-muted">Sem opções</div>
                  )}
                  {chip.opts.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => chip.onPick(o.value)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13.5px] hover:bg-[#F1F5F9]"
                    >
                      <span>{o.label}</span>
                      {o.count != null && (
                        <span className="text-xs text-ink-subtle">{o.count}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <button
          onClick={() => setOpen(open === "all" ? null : "all")}
          className="ml-auto flex items-center gap-1.5 rounded-full border border-ink px-[15px] py-2 text-[13.5px] font-semibold text-ink"
        >
          <Sliders size={14} />
          Todos os filtros
        </button>
      </div>
    </div>
  );
}
