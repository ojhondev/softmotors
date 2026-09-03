import Link from "next/link";

import { Logo } from "@/components/store/logo";

const COLS = [
  {
    title: "Comprar",
    links: [
      ["Estoque", "/estoque"],
      ["Financiamento", "/financiamento"],
      ["Simulador", "/financiamento"],
      ["Favoritos", "/favoritos"],
    ],
  },
  {
    title: "A loja",
    links: [
      ["Sobre nós", "/sobre"],
      ["Unidades", "/lojas"],
      ["Trabalhe conosco", "/trabalhe-conosco"],
      ["Blog", "/blog"],
    ],
  },
  {
    title: "Contato",
    links: [
      ["(44) 3000-0000", "tel:+554430000000"],
      ["WhatsApp", "https://wa.me/5544990000001"],
      ["contato@softmotors.com.br", "mailto:contato@softmotors.com.br"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 bg-ink text-[#CBD5E1]">
      <div className="wrap grid gap-7 py-11 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <span className="text-white">
            <Logo size={22} />
          </span>
          <p className="mt-3.5 max-w-[260px] text-[13px] leading-relaxed">
            Seminovos com procedência em Maringá e região. Financiamento, troca e garantia.
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.title} className="flex flex-col gap-2.5 text-[13px]">
            <strong className="text-white">{col.title}</strong>
            {col.links.map(([label, href]) => (
              <Link key={label} href={href} className="hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col justify-between gap-2 py-4 text-[12px] text-ink-subtle sm:flex-row">
          <span>© 2026 softmotors · CNPJ 00.000.000/0001-00</span>
          <span>Privacidade · Termos · Cookies</span>
        </div>
      </div>
    </footer>
  );
}
