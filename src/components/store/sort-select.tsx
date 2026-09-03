"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ArrowUpDown, ChevronDown } from "@/components/store/icons";

const OPTIONS: { value: string; label: string }[] = [
  { value: "relevancia", label: "Mais relevantes" },
  { value: "preco_asc", label: "Menor preço" },
  { value: "preco_desc", label: "Maior preço" },
  { value: "km_asc", label: "Menor quilometragem" },
  { value: "ano_desc", label: "Ano mais novo" },
  { value: "recentes", label: "Recém-chegados" },
];

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = params.get("sort") ?? "relevancia";
  const label = OPTIONS.find((o) => o.value === current)?.label ?? "Mais relevantes";

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function pick(value: string) {
    const sp = new URLSearchParams(params.toString());
    if (value === "relevancia") sp.delete("sort");
    else sp.set("sort", value);
    sp.delete("page");
    router.push(`${pathname}?${sp.toString()}`);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-line-strong px-[15px] py-2 text-[13.5px] font-semibold text-[#334155]"
      >
        <ArrowUpDown size={14} className="text-[#475569]" />
        Ordenar: {label}
        <ChevronDown size={12} className="text-ink-subtle" />
      </button>
      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-30 w-56 rounded-xl border border-line bg-surface p-1.5 shadow-card">
          {OPTIONS.map((o) => (
            <button
              key={o.value}
              onClick={() => pick(o.value)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-[13.5px] hover:bg-[#F1F5F9] ${
                o.value === current ? "font-bold text-accent" : ""
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
