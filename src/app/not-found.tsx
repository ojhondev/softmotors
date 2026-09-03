import Link from "next/link";

import { Logo } from "@/components/store/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
      <Logo size={28} />
      <h1 className="font-display text-2xl font-extrabold">Página não encontrada</h1>
      <p className="max-w-sm text-sm text-ink-muted">
        Esta página ainda não existe ou o veículo já foi vendido. Volte ao estoque para ver o
        que temos disponível.
      </p>
      <div className="flex gap-3">
        <Link
          href="/estoque"
          className="rounded-full bg-accent px-5 py-3 text-sm font-bold text-white hover:bg-accent-hover"
        >
          Ver estoque
        </Link>
        <Link
          href="/"
          className="rounded-full border border-line-strong px-5 py-3 text-sm font-bold hover:bg-[#f8fafc]"
        >
          Início
        </Link>
      </div>
    </div>
  );
}
