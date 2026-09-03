import Link from "next/link";

import { Logo } from "@/components/store/logo";
import { Search, User } from "@/components/store/icons";

const NAV = [
  { label: "Comprar", href: "/estoque" },
  { label: "Financiar", href: "/financiamento" },
  { label: "Avaliar meu carro", href: "/avaliar" },
  { label: "Lojas", href: "/lojas" },
  { label: "Blog", href: "/blog" },
];

export function Header({ variant = "default" }: { variant?: "default" | "plain" }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="wrap flex h-16 items-center gap-5">
        <Link href="/" aria-label="softmotors — início">
          <Logo size={24} />
        </Link>

        {variant === "default" && (
          <form
            action="/estoque"
            className="hidden min-w-0 flex-1 items-center gap-2.5 rounded-full bg-[#F1F5F9] px-4 py-2 md:flex lg:max-w-md"
          >
            <Search size={16} className="shrink-0 text-ink-subtle" />
            <input
              name="q"
              placeholder="Buscar por marca, modelo ou versão…"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-ink-subtle"
            />
          </form>
        )}

        <nav className="ml-auto hidden items-center gap-6 text-[15px] font-semibold lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-accent">
              {n.label}
            </Link>
          ))}
          <Link href="/entrar" className="flex items-center gap-1.5 hover:text-accent">
            <User size={18} />
            Entrar
          </Link>
        </nav>

        <Link
          href="/avaliar"
          className="ml-auto rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-white hover:bg-accent-hover lg:ml-0"
        >
          Anunciar meu carro
        </Link>
      </div>
    </header>
  );
}
