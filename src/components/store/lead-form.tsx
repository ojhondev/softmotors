"use client";

import { useActionState } from "react";

import { createLead, type LeadState } from "@/app/actions";
import { Check } from "@/components/store/icons";

const initial: LeadState = { status: "idle" };

const inputCls =
  "w-full rounded-[var(--radius-input)] border border-line-strong px-[13px] py-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-accent";

export function LeadForm({
  source,
  vehicleSlug,
  defaultMessage = "",
  context,
  submitLabel = "Enviar mensagem",
  consentLabel = "Quero receber contato por e-mail, WhatsApp e telefone sobre este e outros veículos.",
}: {
  source: string;
  vehicleSlug?: string;
  defaultMessage?: string;
  context?: Record<string, unknown>;
  submitLabel?: string;
  consentLabel?: string;
}) {
  const [state, action, pending] = useActionState(createLead, initial);

  if (state.status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-[var(--radius-input)] bg-success-weak p-4 text-success">
        <Check size={18} className="mt-0.5 shrink-0" />
        <p className="text-[13.5px] font-semibold leading-snug">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-2.5">
      <input type="hidden" name="source" value={source} />
      {vehicleSlug && <input type="hidden" name="vehicleSlug" value={vehicleSlug} />}
      {context && <input type="hidden" name="context" value={JSON.stringify(context)} />}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <input name="name" placeholder="Nome*" className={inputCls} autoComplete="name" />
      <input
        name="email"
        type="email"
        placeholder="E-mail"
        className={inputCls}
        autoComplete="email"
      />
      <input
        name="phone"
        placeholder="Telefone / WhatsApp*"
        className={inputCls}
        autoComplete="tel"
        inputMode="tel"
      />
      <textarea
        name="message"
        rows={3}
        defaultValue={defaultMessage}
        className={`${inputCls} resize-none`}
      />

      <label className="mt-1 flex gap-2 text-[12px] leading-snug text-ink-muted">
        <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 shrink-0" />
        {consentLabel}
      </label>

      {state.status === "error" && (
        <p className="text-[12.5px] font-semibold text-accent">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-full rounded-full bg-accent px-5 py-3 text-[15px] font-bold text-white hover:bg-accent-hover disabled:opacity-60"
      >
        {pending ? "Enviando…" : submitLabel}
      </button>
    </form>
  );
}
