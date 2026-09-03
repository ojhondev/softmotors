"use client";

import { useMemo, useState } from "react";

import { simulateFinance, FINANCE_DEFAULTS } from "@/lib/finance";
import { money, moneyCents } from "@/lib/format";
import { LeadForm } from "@/components/store/lead-form";
import { Label } from "@/components/store/ui";

export function StandaloneSimulator() {
  const [price, setPrice] = useState(90000);
  const [down, setDown] = useState(20000);
  const [term, setTerm] = useState(48);
  const [open, setOpen] = useState(false);

  const result = useMemo(
    () => simulateFinance({ price, downPayment: down, termMonths: term }),
    [price, down, term],
  );
  const ratePct = (result.monthlyRate * 100).toFixed(2).replace(".", ",");

  const inputCls =
    "mt-1.5 w-full rounded-[var(--radius-input)] border border-line-strong bg-surface px-[13px] py-3 text-sm font-semibold text-ink outline-none focus:border-accent";

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label>Valor do carro</Label>
          <input
            type="number"
            value={price}
            min={10000}
            step={1000}
            onChange={(e) => setPrice(Number(e.target.value))}
            className={inputCls}
          />
        </div>
        <div>
          <Label>Entrada</Label>
          <input
            type="number"
            value={down}
            min={0}
            step={1000}
            onChange={(e) => setDown(Number(e.target.value))}
            className={inputCls}
          />
        </div>
        <div>
          <Label>Parcelas</Label>
          <select
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            className={inputCls}
          >
            {FINANCE_DEFAULTS.terms.map((t) => (
              <option key={t} value={t}>
                {t}x
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-[#EEF1F4] bg-[#F8FAFC] px-[18px] py-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Label>Parcela estimada</Label>
            <div className="mt-0.5 font-display text-[28px] font-extrabold">
              {moneyCents(result.installment)}
              <span className="text-sm font-semibold text-ink-muted">/mês</span>
            </div>
          </div>
          <div className="text-[13px] text-ink-muted">
            <div>Financiado: {money(result.financedAmount)}</div>
            <div>Total: {money(result.totalPaid)}</div>
          </div>
        </div>
        <div className="mt-1 text-[12px] text-ink-muted">
          {term}x · juros aprox. {ratePct}% a.m. · sujeito a análise de crédito
        </div>
      </div>

      {open ? (
        <div className="mt-4 rounded-xl border border-line p-4">
          <p className="mb-3 text-[13.5px] font-semibold">Receba a pré-aprovação</p>
          <LeadForm
            source="financing"
            submitLabel="Quero a pré-aprovação"
            defaultMessage={`Simulei: carro de ${money(price)}, entrada de ${money(down)} em ${term}x (${moneyCents(result.installment)}/mês). Quero a pré-aprovação.`}
            context={{
              price,
              downPayment: down,
              termMonths: term,
              estimatedInstallment: Math.round(result.installment),
            }}
          />
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="mt-4 w-full rounded-full bg-accent px-[22px] py-[13px] text-[15px] font-bold text-white hover:bg-accent-hover"
        >
          Solicitar pré-aprovação
        </button>
      )}
    </div>
  );
}
