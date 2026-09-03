"use client";

import { useActionState } from "react";

import { createLead, type LeadState } from "@/app/actions";
import { Check } from "@/components/store/icons";

const initial: LeadState = { status: "idle" };

const inputCls =
  "w-full rounded-[var(--radius-input)] border border-line-strong px-[13px] py-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-accent";

export function TradeInForm() {
  const [state, action, pending] = useActionState(
    async (prev: LeadState, formData: FormData) => {
      const context = {
        veiculo: {
          marcaModelo: formData.get("marcaModelo"),
          ano: formData.get("ano"),
          versao: formData.get("versao"),
          km: formData.get("km"),
          estado: formData.get("estado"),
          finalPlaca: formData.get("finalPlaca"),
          quitado: formData.get("quitado") != null,
        },
      };
      formData.set("context", JSON.stringify(context));
      formData.set(
        "message",
        `Avaliação de troca: ${formData.get("marcaModelo")} ${formData.get("ano")} — ${formData.get("km")} km, estado ${formData.get("estado")}.`,
      );
      return createLead(prev, formData);
    },
    initial,
  );

  if (state.status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-[var(--radius-input)] bg-success-weak p-5 text-success">
        <Check size={20} className="mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-bold">Recebemos os dados do seu veículo!</p>
          <p className="mt-1 text-[13px]">
            A loja retorna com a faixa de valor baseada na tabela FIPE e o agendamento da
            avaliação presencial.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-3 sm:grid-cols-2">
      <input type="hidden" name="source" value="trade_in" />
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <input name="marcaModelo" placeholder="Marca e modelo*" className={`${inputCls} sm:col-span-2`} />
      <input name="ano" placeholder="Ano (ex: 2020/2021)*" className={inputCls} inputMode="numeric" />
      <input name="versao" placeholder="Versão (ex: 1.0 TSI Comfortline)" className={inputCls} />
      <input name="km" placeholder="Quilometragem*" className={inputCls} inputMode="numeric" />
      <select name="estado" className={`${inputCls} font-semibold`} defaultValue="">
        <option value="" disabled>
          Estado geral*
        </option>
        <option>Excelente</option>
        <option>Bom</option>
        <option>Regular</option>
        <option>Precisa de reparos</option>
      </select>
      <input name="finalPlaca" placeholder="Final da placa" className={inputCls} inputMode="numeric" />
      <label className="flex items-center gap-2 text-[13px] text-ink-muted sm:col-span-1">
        <input type="checkbox" name="quitado" className="h-4 w-4" />
        Veículo quitado
      </label>

      <div className="mt-2 h-px bg-line sm:col-span-2" />

      <input name="name" placeholder="Seu nome*" className={inputCls} autoComplete="name" />
      <input
        name="phone"
        placeholder="Telefone / WhatsApp*"
        className={inputCls}
        autoComplete="tel"
        inputMode="tel"
      />
      <input
        name="email"
        type="email"
        placeholder="E-mail"
        className={`${inputCls} sm:col-span-2`}
        autoComplete="email"
      />

      <label className="flex gap-2 text-[12px] leading-snug text-ink-muted sm:col-span-2">
        <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 shrink-0" />
        Autorizo o contato da loja por e-mail, WhatsApp e telefone sobre esta avaliação.
      </label>

      {state.status === "error" && (
        <p className="text-[12.5px] font-semibold text-accent sm:col-span-2">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 rounded-full bg-accent px-[22px] py-[13px] text-[15px] font-bold text-white hover:bg-accent-hover disabled:opacity-60 sm:col-span-2"
      >
        {pending ? "Enviando…" : "Solicitar avaliação"}
      </button>
    </form>
  );
}
