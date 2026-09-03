"use client";

import { useMemo, useState } from "react";

import { simulateFinance, FINANCE_DEFAULTS } from "@/lib/finance";
import { money, moneyCents } from "@/lib/format";
import { LeadForm } from "@/components/store/lead-form";
import { Label } from "@/components/store/ui";

const DOWN_FRACTIONS = [0.1, 0.2, 0.3, 0.4, 0.5];

export function FinanceSimulator({
  price,
  vehicleSlug,
  vehicleLabel,
}: {
  price: number;
  vehicleSlug: string;
  vehicleLabel: string;
}) {
  const [downFraction, setDownFraction] = useState(0.2);
  const [term, setTerm] = useState(48);
  const [open, setOpen] = useState(false);

  const downPayment = Math.round(price * downFraction);
  const result = useMemo(
    () => simulateFinance({ price, downPayment, termMonths: term }),
    [price, downPayment, term],
  );
  const ratePct = (result.monthlyRate * 100).toFixed(2).replace(".", ",");

  const selectCls =
    "w-full rounded-[var(--radius-input)] border border-line-strong bg-surface px-[13px] py-3 text-sm font-semibold text-ink outline-none focus:border-accent";

  return (
    <div>
      <h2 className="font-display text-lg font-bold">Simule seu financiamento</h2>
      <p className="mt-1 text-[13px] text-ink-muted">
        Estimativa na hora. O vendedor confirma as condições finais.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Valor de entrada</Label>
          <select
            value={downFraction}
            onChange={(e) => setDownFraction(Number(e.target.value))}
            className={`mt-1.5 ${selectCls}`}
          >
            {DOWN_FRACTIONS.map((f) => (
              <option key={f} value={f}>
                {money(Math.round(price * f))} ({Math.round(f * 100)}%)
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label>Parcelas</Label>
          <select
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            className={`mt-1.5 ${selectCls}`}
          >
            {FINANCE_DEFAULTS.terms.map((t) => (
              <option key={t} value={t}>
                {t}x
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#EEF1F4] bg-[#F8FAFC] px-[18px] py-4">
        <div>
          <Label>Parcela estimada</Label>
          <div className="mt-0.5 font-display text-[26px] font-extrabold">
            {moneyCents(result.installment)}
            <span className="text-sm font-semibold text-ink-muted">/mês</span>
          </div>
          <div className="mt-0.5 text-[12px] text-ink-muted">
            {term}x · juros aprox. {ratePct}% a.m. · sujeito a análise de crédito
          </div>
        </div>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="rounded-full bg-accent px-[22px] py-[13px] text-[15px] font-bold text-white hover:bg-accent-hover"
          >
            Solicitar orçamento
          </button>
        )}
      </div>

      {open && (
        <div className="mt-4 rounded-xl border border-line p-4">
          <p className="mb-3 text-[13.5px] font-semibold">
            Receba o orçamento completo do vendedor
          </p>
          <LeadForm
            source="financing"
            vehicleSlug={vehicleSlug}
            submitLabel="Solicitar orçamento"
            defaultMessage={`Quero simular o financiamento do ${vehicleLabel}: entrada de ${money(
              downPayment,
            )} em ${term}x.`}
            context={{
              downPayment,
              termMonths: term,
              estimatedInstallment: Math.round(result.installment),
            }}
          />
        </div>
      )}
    </div>
  );
}
