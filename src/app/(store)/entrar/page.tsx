import type { Metadata } from "next";

import { LoginPanel } from "@/components/store/login-panel";
import { Logo } from "@/components/store/logo";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse sua conta softmotors para acompanhar propostas, favoritos e simulações.",
};

export default function EntrarPage() {
  return (
    <div className="wrap flex min-h-[70vh] items-center justify-center py-12">
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <Logo size={28} />
        </div>
        <h1 className="mt-6 text-center font-display text-2xl font-extrabold tracking-tight">
          Entrar ou criar conta
        </h1>
        <p className="mt-2 text-center text-sm text-ink-muted">
          Acompanhe propostas, favoritos e simulações num só lugar.
        </p>

        <div className="mt-7 rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-card">
          <LoginPanel />
        </div>

        <p className="mt-4 text-center text-[12px] leading-relaxed text-ink-subtle">
          Ao continuar, você concorda com os Termos de Uso e a Política de Privacidade da
          softmotors.
        </p>
      </div>
    </div>
  );
}
