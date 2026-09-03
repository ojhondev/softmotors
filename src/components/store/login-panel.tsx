"use client";

import { useState } from "react";

import { Check } from "@/components/store/icons";

/**
 * UI de login por código (OTP), sem senha — conforme PRD §7.3.
 * A autenticação real (envio de código, sessão) ainda não está conectada;
 * este painel é o esqueleto mockado-primeiro do fluxo.
 */
type Step = "identify" | "code" | "done";

const inputCls =
  "w-full rounded-[var(--radius-input)] border border-line-strong px-[13px] py-3 text-sm outline-none placeholder:text-ink-muted focus:border-accent";

export function LoginPanel() {
  const [step, setStep] = useState<Step>("identify");
  const [contact, setContact] = useState("");

  if (step === "done") {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-success-weak text-success">
          <Check size={22} />
        </span>
        <p className="font-display text-lg font-bold">Quase lá!</p>
        <p className="text-[13px] leading-relaxed text-ink-muted">
          A área do cliente está sendo finalizada. Assim que estiver no ar, você acessa com{" "}
          <strong>{contact || "seu contato"}</strong> — sem senha, só o código.
        </p>
      </div>
    );
  }

  if (step === "code") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setStep("done");
        }}
        className="flex flex-col gap-3"
      >
        <p className="text-[13px] text-ink-muted">
          Enviamos um código de 6 dígitos para <strong>{contact}</strong>.
        </p>
        <input
          inputMode="numeric"
          maxLength={6}
          placeholder="______"
          className={`${inputCls} text-center text-lg font-bold tracking-[0.4em]`}
        />
        <button
          type="submit"
          className="rounded-full bg-accent px-5 py-3 text-[15px] font-bold text-white hover:bg-accent-hover"
        >
          Confirmar código
        </button>
        <button
          type="button"
          onClick={() => setStep("identify")}
          className="text-[13px] font-semibold text-ink-muted hover:text-ink"
        >
          ← Usar outro e-mail ou telefone
        </button>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => {
            setContact("sua conta Google");
            setStep("done");
          }}
          className="flex items-center justify-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-3 text-sm font-bold hover:bg-[#f8fafc]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22 12c0-.7-.06-1.36-.18-2H12v4h5.6a4.8 4.8 0 0 1-2.08 3.14v2.6h3.36C20.8 18 22 15.3 22 12z"
            />
            <path
              fill="#34A853"
              d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.36-2.6c-.93.62-2.12.98-3.26.98-2.5 0-4.62-1.68-5.38-3.96H3.14v2.68A10 10 0 0 0 12 22z"
            />
            <path fill="#FBBC05" d="M6.62 13.4a6 6 0 0 1 0-3.8V6.92H3.14a10 10 0 0 0 0 8.96z" />
            <path
              fill="#EA4335"
              d="M12 6.24c1.47 0 2.78.5 3.82 1.5l2.85-2.85A9.6 9.6 0 0 0 12 2 10 10 0 0 0 3.14 6.92l3.48 2.68C7.38 7.92 9.5 6.24 12 6.24z"
            />
          </svg>
          Continuar com Google
        </button>
        <button
          type="button"
          onClick={() => {
            setContact("sua conta Apple");
            setStep("done");
          }}
          className="flex items-center justify-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-3 text-sm font-bold hover:bg-[#f8fafc]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16 3c.1 1.2-.4 2.3-1.1 3.1-.7.9-1.9 1.6-3 1.5-.1-1.1.4-2.3 1.1-3 .8-.9 2-1.5 3-1.6zM19.5 17.2c-.5 1.2-.8 1.7-1.5 2.7-1 1.5-2.4 3.3-4.1 3.3-1.5 0-1.9-1-4-1-2 0-2.5 1-4 1-1.7 0-3-1.7-4-3.1C-.5 15.6-1 9.3 2.7 7.3c1.2-.7 2.4-.9 3.4-.9 1.4 0 2.3 1 3.9 1 1.5 0 2.4-1 4-1 1 0 2.5.3 3.7 1.5-3.3 1.8-2.7 6.4 1.8 8z" />
          </svg>
          Continuar com Apple
        </button>
      </div>

      <div className="my-1 flex items-center gap-3 text-[12px] text-ink-subtle">
        <span className="h-px flex-1 bg-line" />
        ou
        <span className="h-px flex-1 bg-line" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const value = String(data.get("contact") ?? "").trim();
          if (!value) return;
          setContact(value);
          setStep("code");
        }}
        className="flex flex-col gap-3"
      >
        <input
          name="contact"
          placeholder="E-mail ou celular"
          autoComplete="email"
          className={inputCls}
        />
        <button
          type="submit"
          className="rounded-full bg-accent px-5 py-3 text-[15px] font-bold text-white hover:bg-accent-hover"
        >
          Receber código
        </button>
      </form>
    </div>
  );
}
