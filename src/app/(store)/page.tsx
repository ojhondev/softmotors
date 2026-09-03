import Link from "next/link";

import { getTenant, getUnits } from "@/lib/tenant";
import {
  getFeaturedVehicles,
  getFilterFacets,
  getInventoryCount,
} from "@/db/queries";
import { VehicleCard } from "@/components/store/vehicle-card";
import { ButtonLink, Card, SectionTitle, Label } from "@/components/store/ui";
import {
  Search,
  ShieldCheck,
  CreditCard,
  RefreshTrade,
  Check,
} from "@/components/store/icons";

const CATEGORY_CHIPS = [
  { label: "Todos", href: "/estoque" },
  { label: "SUV", href: "/estoque?bodyType=SUV" },
  { label: "Sedã", href: "/estoque?bodyType=Sed%C3%A3" },
  { label: "Hatch", href: "/estoque?bodyType=Hatch" },
  { label: "Picape", href: "/estoque?bodyType=Picape" },
  { label: "Até R$ 80 mil", href: "/estoque?priceMax=80000" },
];

const PRICE_TILES = [
  { top: "Até", value: "R$ 60 mil", href: "/estoque?priceMax=60000" },
  { top: "De 60 a", value: "R$ 100 mil", href: "/estoque?priceMin=60000&priceMax=100000" },
  { top: "De 100 a", value: "R$ 150 mil", href: "/estoque?priceMin=100000&priceMax=150000" },
  { top: "De 150 a", value: "R$ 250 mil", href: "/estoque?priceMin=150000&priceMax=250000" },
  { top: "Acima de", value: "R$ 250 mil", href: "/estoque?priceMin=250000" },
];

const TRUST = [
  {
    icon: ShieldCheck,
    title: "Procedência garantida",
    text: "Laudo cautelar e histórico conferidos em todo veículo.",
  },
  {
    icon: CreditCard,
    title: "Financiamento na hora",
    text: "Simule e receba a pré-aprovação dos principais bancos.",
  },
  {
    icon: RefreshTrade,
    title: "Seu usado na troca",
    text: "Avaliação pela tabela FIPE e abatimento no valor.",
  },
  {
    icon: Check,
    title: "Garantia inclusa",
    text: "3 meses de garantia de motor e câmbio em todo carro.",
  },
];

export default async function HomePage() {
  const tenant = await getTenant();
  const [featured, facets, count, units] = await Promise.all([
    getFeaturedVehicles(tenant.id, 4),
    getFilterFacets(tenant.id),
    getInventoryCount(tenant.id),
    getUnits(tenant.id),
  ]);

  const topModels = [...facets.models].sort((a, b) => b.n - a.n).slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1100px 380px at 80% -10%, rgba(220,38,38,.35), transparent 60%), linear-gradient(180deg,#111827,#0B1220)",
          }}
        />
        <div className="wrap relative py-16 text-center sm:py-20">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Seu próximo carro está aqui
          </h1>
          <p className="mx-auto mt-3.5 max-w-xl text-[15px] leading-relaxed text-[#CBD5E1]">
            Seminovos com procedência selecionada em {units[0]?.city ?? "Maringá"} e região.
            Compare, simule e fale direto com a loja.
          </p>

          <form
            action="/estoque"
            className="mx-auto mt-7 flex max-w-2xl items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2"
          >
            <Search size={20} className="shrink-0 text-ink-subtle" />
            <input
              name="q"
              placeholder="Buscar por marca, modelo ou versão…"
              className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-subtle"
            />
            <button className="rounded-full bg-accent px-5 py-3 text-[15px] font-bold text-white hover:bg-accent-hover">
              Buscar
            </button>
          </form>

          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            {CATEGORY_CHIPS.map((c, i) => (
              <Link
                key={c.label}
                href={c.href}
                className={`rounded-full px-3.5 py-2 text-[13px] font-semibold ${
                  i === 0 ? "bg-accent text-white" : "bg-white/12 text-white hover:bg-white/20"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RECENTES */}
      <section className="wrap pt-11">
        <div className="mb-4 flex items-baseline justify-between">
          <SectionTitle>Adicionados recentemente</SectionTitle>
          <Link href="/estoque" className="text-sm font-semibold text-accent">
            Ver todo o estoque →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((v) => (
            <VehicleCard
              key={v.id}
              v={v}
              cityLabel={`${units.find((u) => u.id === v.unitId)?.city ?? ""}, PR`}
            />
          ))}
        </div>
      </section>

      {/* FAIXA DE PRECO */}
      <section className="wrap pt-10">
        <SectionTitle>Buscar por faixa de preço</SectionTitle>
        <div className="mt-4 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
          {PRICE_TILES.map((t) => (
            <Link key={t.href} href={t.href}>
              <Card className="p-5 transition-shadow hover:shadow-card">
                <Label>{t.top}</Label>
                <div className="mt-1 font-display text-lg font-extrabold">{t.value}</div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* MODELOS */}
      <section className="wrap pt-10">
        <SectionTitle>Modelos com mais anúncios</SectionTitle>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {topModels.map((m) => (
            <Link key={m.value} href={`/estoque?model=${encodeURIComponent(m.value)}`}>
              <Card className="flex items-center gap-3 p-4 transition-shadow hover:shadow-card">
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#F1F5F9] font-display text-lg font-extrabold text-[#475569]">
                  {m.value[0]}
                </span>
                <div>
                  <div className="text-sm font-bold">{m.value}</div>
                  <div className="text-xs text-ink-muted">{m.n} anúncios</div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="wrap pt-10">
        <Card className="grid gap-6 p-7 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.title} className="flex flex-col gap-2">
                <Icon size={26} className="text-accent" />
                <strong className="text-[15px]">{t.title}</strong>
                <span className="text-[13px] leading-snug text-ink-muted">{t.text}</span>
              </div>
            );
          })}
        </Card>
      </section>

      {/* CTA VENDER */}
      <section className="wrap pt-10">
        <div className="relative flex flex-col items-start gap-5 overflow-hidden rounded-2xl bg-ink px-9 py-8 text-white sm:flex-row sm:items-center">
          <div
            className="absolute right-0 top-0 h-full w-64 opacity-20"
            style={{ background: "var(--accent)", clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0 100%)" }}
          />
          <div className="relative flex-1">
            <h2 className="font-display text-2xl font-extrabold">
              Quer vender ou trocar seu carro?
            </h2>
            <p className="mt-2 text-sm text-[#CBD5E1]">
              Faça uma avaliação online em 2 minutos e receba uma proposta da loja.
            </p>
          </div>
          <ButtonLink href="/avaliar" className="relative">
            Avaliar meu carro
          </ButtonLink>
          <ButtonLink href="/avaliar" variant="ghost" className="relative">
            Anunciar
          </ButtonLink>
        </div>
      </section>

      {/* LOJAS */}
      <section className="wrap pt-10">
        <SectionTitle>Nossas lojas</SectionTitle>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {units.map((u) => {
            return (
              <Card key={u.id} className="p-5">
                <div className="text-[15px] font-bold">{u.name}</div>
                <div className="mt-1 text-[13px] leading-snug text-ink-muted">
                  {u.addressLine}
                  <br />
                  {Object.entries((u.hours ?? {}) as Record<string, string>)
                    .map(([k, v]) => `${k}, ${v}`)
                    .join(" · ")}
                </div>
                <Link
                  href={`/estoque?unidade=${u.slug}`}
                  className="mt-3 inline-block text-[13px] font-semibold text-accent"
                >
                  Ver veículos desta loja →
                </Link>
              </Card>
            );
          })}
        </div>
      </section>

      <div className="pb-4 text-center text-xs text-ink-subtle">
        {count} veículos publicados
      </div>
    </>
  );
}
