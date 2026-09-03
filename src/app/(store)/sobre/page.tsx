import type { Metadata } from "next";

import { getTenant, getUnits } from "@/lib/tenant";
import { getInventoryCount } from "@/db/queries";
import { Card, SectionTitle, ButtonLink } from "@/components/store/ui";
import { ShieldCheck, CreditCard, RefreshTrade, Check, MapPin } from "@/components/store/icons";

export const metadata: Metadata = {
  title: "Sobre a softmotors",
  description:
    "Uma revenda de seminovos com procedência: laudo cautelar, histórico verificado, financiamento e garantia. Conheça a softmotors.",
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Procedência acima de tudo",
    text: "Todo veículo passa por laudo cautelar e checagem de histórico antes de entrar no estoque. Se não tem procedência, não anunciamos.",
  },
  {
    icon: CreditCard,
    title: "Financiamento sem enrolação",
    text: "Trabalhamos com os principais bancos e fintechs. Você simula no site e recebe a pré-aprovação sem sair de casa.",
  },
  {
    icon: RefreshTrade,
    title: "Sua troca vale o que diz a FIPE",
    text: "Avaliação transparente, baseada na tabela e no estado real do carro. O valor entra como abatimento, sem pegadinha.",
  },
  {
    icon: Check,
    title: "Garantia de verdade",
    text: "3 meses de garantia de motor e câmbio em todos os carros, com a nossa rede de oficinas parceiras.",
  },
];

export default async function SobrePage() {
  const tenant = await getTenant();
  const [count, units] = await Promise.all([
    getInventoryCount(tenant.id),
    getUnits(tenant.id),
  ]);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 300px at 85% -20%, rgba(220,38,38,.3), transparent 60%), linear-gradient(180deg,#111827,#0B1220)",
          }}
        />
        <div className="wrap relative py-16">
          <h1 className="max-w-2xl font-display text-4xl font-extrabold tracking-tight">
            Seminovos com procedência, do jeito que deveria ser
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#CBD5E1]">
            A softmotors nasceu em {units[0]?.city ?? "Maringá"} com uma ideia simples:
            vender carro usado sem letra miúda. Estoque conferido, preço na tabela,
            financiamento resolvido e garantia que a gente honra.
          </p>
        </div>
      </section>

      <section className="wrap py-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-6 text-center">
            <div className="font-display text-3xl font-extrabold text-accent">{count}+</div>
            <div className="mt-1 text-sm text-ink-muted">veículos no estoque agora</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="font-display text-3xl font-extrabold text-accent">
              {units.length}
            </div>
            <div className="mt-1 text-sm text-ink-muted">lojas no Paraná</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="font-display text-3xl font-extrabold text-accent">100%</div>
            <div className="mt-1 text-sm text-ink-muted">com laudo cautelar</div>
          </Card>
        </div>
      </section>

      <section className="wrap pb-4">
        <SectionTitle>No que a gente acredita</SectionTitle>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <Card key={v.title} className="flex gap-4 p-6">
                <Icon size={26} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <div className="font-bold">{v.title}</div>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-ink-muted">{v.text}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="wrap py-10">
        <SectionTitle>Nossas lojas</SectionTitle>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {units.map((u) => (
            <Card key={u.id} className="p-5">
              <div className="flex items-center gap-2 font-bold">
                <MapPin size={18} className="text-accent" />
                {u.city}
              </div>
              <div className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                {u.addressLine}
                <br />
                {Object.entries((u.hours ?? {}) as Record<string, string>)
                  .map(([k, val]) => `${k}: ${val}`)
                  .join(" · ")}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="wrap pb-14">
        <div className="flex flex-col items-start gap-4 rounded-2xl bg-ink px-8 py-8 text-white sm:flex-row sm:items-center">
          <div className="flex-1">
            <h2 className="font-display text-2xl font-extrabold">Vem conhecer pessoalmente</h2>
            <p className="mt-1.5 text-sm text-[#CBD5E1]">
              Agende um horário ou apareça numa das lojas — o café é por nossa conta.
            </p>
          </div>
          <ButtonLink href="/estoque">Ver estoque</ButtonLink>
          <ButtonLink href="/lojas" variant="ghost">
            Ver lojas
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
