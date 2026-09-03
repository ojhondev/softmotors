import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getTenant, getUnits } from "@/lib/tenant";
import { getVehicleBySlug, getSimilarVehicles } from "@/db/queries";
import { entryInstallment } from "@/lib/finance";
import { money, moneyCents, km, yearPair } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";
import { VehicleCard } from "@/components/store/vehicle-card";
import { Gallery } from "@/components/store/gallery";
import { LeadForm } from "@/components/store/lead-form";
import { FinanceSimulator } from "@/components/store/finance-simulator";
import { Card, Label } from "@/components/store/ui";
import {
  Check,
  Flag,
  Heart,
  Tag,
  Video,
  Whatsapp,
  ShieldCheck,
} from "@/components/store/icons";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const tenant = await getTenant();
  const v = await getVehicleBySlug(tenant.id, slug);
  if (!v) return { title: "Veículo não encontrado" };
  const title = `${v.brand} ${v.model} ${v.version ?? ""} ${v.modelYear} — ${money(v.price)}`;
  return {
    title,
    description: `${v.brand} ${v.model} ${v.modelYear}, ${km(v.mileageKm)}, ${v.transmission}. ${money(
      v.price,
    )}. ${v.description?.slice(0, 120) ?? ""}`,
    openGraph: { title, type: "website" },
  };
}

export default async function VehiclePage({ params }: { params: Params }) {
  const { slug } = await params;
  const tenant = await getTenant();
  const v = await getVehicleBySlug(tenant.id, slug);
  if (!v) notFound();

  const [similar, units] = await Promise.all([
    getSimilarVehicles(tenant.id, v, 3),
    getUnits(tenant.id),
  ]);
  const unit = units.find((u) => u.id === v.unitId) ?? units[0];
  const price = Number(v.price);
  const fipe = Number(v.fipePrice);
  const parcela = entryInstallment(v.price);
  const label = `${v.brand} ${v.model} ${v.modelYear}`;
  const waText = `Olá! Tenho interesse no ${label} (${v.version ?? ""}) — ${money(price)}. Está disponível?`;

  const specs: [string, string][] = [
    ["Ano", yearPair(v.productionYear, v.modelYear)],
    ["Quilometragem", km(v.mileageKm)],
    ["Câmbio", v.transmission ?? "—"],
    ["Carroceria", v.bodyType ?? "—"],
    ["Combustível", v.fuel ?? "—"],
    ["Final de placa", v.plateEnd ?? "—"],
    ["Cor", v.color ?? "—"],
    ["Aceita troca", v.acceptsTrade ? "Sim" : "Não"],
    ["Único dono", v.singleOwner ? "Sim" : "Não"],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${v.brand} ${v.model} ${v.version ?? ""}`.trim(),
    brand: { "@type": "Brand", name: v.brand },
    model: v.model,
    vehicleModelDate: String(v.modelYear ?? ""),
    mileageFromOdometer: v.mileageKm
      ? { "@type": "QuantitativeValue", value: v.mileageKm, unitCode: "KMT" }
      : undefined,
    fuelType: v.fuel,
    vehicleTransmission: v.transmission,
    color: v.color,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      seller: { "@type": "AutoDealer", name: tenant.name, areaServed: unit?.city },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Gallery seed={v.id} photoCount={Math.max(v.photos.length, 24)} />

      <div className="wrap grid items-start gap-10 py-7 lg:grid-cols-[minmax(0,1fr)_384px]">
        {/* MAIN */}
        <main className="flex flex-col gap-5">
          <nav className="flex flex-wrap items-center gap-2 text-[13px] text-ink-muted">
            <Link href="/">Início</Link>
            <span>/</span>
            <Link href="/estoque">Carros</Link>
            <span>/</span>
            <Link href={`/estoque?brand=${encodeURIComponent(v.brand)}`}>{v.brand}</Link>
            <span>/</span>
            <span>{v.model}</span>
          </nav>

          {/* TITLE CARD */}
          <Card className="p-6 sm:p-7">
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex-1">
                <h1 className="font-display text-[26px] font-extrabold tracking-tight sm:text-3xl">
                  {v.brand.toUpperCase()}{" "}
                  <span className="text-accent">{v.model.toUpperCase()}</span>
                </h1>
                <p className="mt-1.5 text-sm font-medium tracking-wide text-ink-muted">
                  {v.version}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success-weak px-3.5 py-2 text-[13px] font-semibold text-success">
                <Check size={14} />
                Vendedor responde rápido
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink">
                <Heart size={18} />
              </span>
            </div>

            <div className="mt-5 border-t border-[#EEF1F4] pt-5">
              <Label>Cidade</Label>
              <div className="mt-0.5 text-base font-bold">
                {unit?.city} – {unit?.state}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
                {specs.map(([k, val]) => (
                  <div key={k}>
                    <Label>{k}</Label>
                    <div className="mt-0.5 text-[15px] font-bold">{val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* VIDEOCHAMADA */}
            <div className="mt-5 flex flex-wrap items-center gap-4 rounded-xl border border-line px-[18px] py-4">
              <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[10px] bg-ink text-white">
                <Video size={20} />
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <strong className="text-[15px]">Videochamada</strong>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success-weak px-2.5 py-1 text-[11px] font-semibold text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" /> Online agora
                  </span>
                </div>
                <div className="mt-0.5 text-[13px] text-ink-muted">
                  Agende um horário para ver o carro ao vivo, por vídeo.
                </div>
              </div>
              <a
                href={waLink(unit?.whatsapp, `Quero agendar uma videochamada para ver o ${label}.`)}
                target="_blank"
                rel="noopener"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-[18px] py-[11px] text-sm font-bold text-white hover:bg-accent-hover"
              >
                <Video size={16} />
                Agendar videochamada
              </a>
            </div>

            {/* SOBRE */}
            <div className="mt-6">
              <Label>Sobre este carro</Label>
              <p className="mt-2 text-sm leading-7 text-[#334155]">{v.description}</p>
              <div className="mt-4 flex items-center gap-2 text-[13px] text-ink-muted">
                <Flag size={15} />
                Denunciar anúncio do veículo
              </div>
            </div>
          </Card>

          {/* ITENS */}
          {v.features.length > 0 && (
            <Card className="p-6 sm:p-7">
              <h2 className="mb-4 font-display text-lg font-bold">Itens do veículo</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-[13.5px] text-[#334155] sm:grid-cols-3 lg:grid-cols-4">
                {v.features.map((f) => (
                  <div key={f} className="flex gap-2">
                    <Check size={14} className="mt-0.5 shrink-0 text-wa" />
                    {f}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* FINANCIAMENTO */}
          <Card className="p-6 sm:p-7">
            <FinanceSimulator price={price} vehicleSlug={v.slug} vehicleLabel={label} />
          </Card>

          {/* VENDEDOR */}
          <Card className="flex flex-wrap items-center gap-4 p-6 sm:p-7">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-ink font-display text-xl font-extrabold text-white">
              {tenant.name.slice(0, 2).toUpperCase()}
            </span>
            <div className="flex-1">
              <div className="text-base font-bold">{unit?.name}</div>
              <div className="mt-0.5 text-[13px] text-ink-muted">
                {unit?.addressLine} · {unit?.city} – {unit?.state}
              </div>
            </div>
            <Link
              href="/lojas"
              className="rounded-full border border-line-strong bg-surface px-[18px] py-2.5 text-sm font-bold hover:bg-[#f8fafc]"
            >
              Ver loja
            </Link>
          </Card>

          {/* SIMILARES */}
          {similar.length > 0 && (
            <section>
              <div className="mb-3.5 flex items-baseline justify-between">
                <h2 className="font-display text-lg font-bold">Veículos semelhantes</h2>
                <Link href="/estoque" className="text-[13px] font-semibold text-accent">
                  Ver todos
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {similar.map((s) => (
                  <VehicleCard key={s.id} v={s} />
                ))}
              </div>
            </section>
          )}
        </main>

        {/* SIDEBAR */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-20" id="contato">
          <Card className="p-[22px]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <Label>Preço à vista</Label>
                <div className="font-display text-[32px] font-extrabold tracking-tight">
                  {money(price)}
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent-weak px-3.5 py-2 text-[13px] font-semibold text-accent">
                <Tag size={14} />
                Ver parcelas
              </span>
            </div>
            <div className="mt-1 text-[12px] text-ink-muted">
              {parcela ? `a partir de ${moneyCents(parcela)}/mês · ` : ""}
              {v.acceptsTrade ? "aceita troca" : "à vista"}
              {fipe ? ` · FIPE ${money(fipe)}` : ""}
            </div>

            <div className="my-[18px] h-px bg-[#EEF1F4]" />

            <div className="mb-1 text-[15px] font-bold">Envie uma mensagem ao vendedor</div>
            <div className="mb-3.5 text-[12px] text-ink-muted">
              Resposta em média em 12 minutos.
            </div>

            <LeadForm
              source="vdp"
              vehicleSlug={v.slug}
              defaultMessage={`Olá! Tenho interesse neste ${v.model}. Podemos falar?`}
            />

            <a
              href={waLink(unit?.whatsapp, waText)}
              target="_blank"
              rel="noopener"
              className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-full bg-wa px-5 py-3 text-[15px] font-bold text-white hover:brightness-95"
            >
              <Whatsapp size={18} />
              Chamar no WhatsApp
            </a>
          </Card>

          <Card className="p-5">
            <div className="text-sm font-bold">Tem um usado para dar na troca?</div>
            <div className="mb-3 mt-0.5 text-[12px] text-ink-muted">
              Faça uma avaliação rápida com base na tabela FIPE.
            </div>
            <Link
              href="/avaliar"
              className="block w-full rounded-full border border-line-strong bg-surface py-3 text-center text-sm font-bold hover:bg-[#f8fafc]"
            >
              Avaliar meu carro
            </Link>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-2.5">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-ink-subtle" />
              <div>
                <div className="text-[13px] font-bold">Compre com segurança</div>
                <div className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
                  Nunca faça pagamentos antecipados. Confira a documentação e visite o
                  veículo antes de fechar negócio.
                </div>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </>
  );
}
