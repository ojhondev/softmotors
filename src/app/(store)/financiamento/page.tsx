import type { Metadata } from "next";
import Link from "next/link";

import { getTenant } from "@/lib/tenant";
import { getFeaturedVehicles } from "@/db/queries";
import { VehicleCard } from "@/components/store/vehicle-card";
import { StandaloneSimulator } from "@/components/store/standalone-simulator";
import { Card } from "@/components/store/ui";

export const metadata: Metadata = {
  title: "Simulador de financiamento",
  description:
    "Simule as parcelas do seu próximo carro. Estimativa na hora, pré-aprovação com os principais bancos.",
};

export default async function FinanciamentoPage() {
  const tenant = await getTenant();
  const featured = await getFeaturedVehicles(tenant.id, 3);

  return (
    <div className="wrap py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">
        Simulador de financiamento
      </h1>
      <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        Faça uma simulação rápida pela Tabela Price. É uma estimativa — o vendedor confirma
        as condições com os bancos parceiros e a pré-aprovação.
      </p>

      <div className="mt-8 max-w-2xl">
        <Card className="p-6 sm:p-8">
          <StandaloneSimulator />
        </Card>
      </div>

      <div className="mt-12">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-display text-xl font-bold">Prontos para financiar</h2>
          <Link href="/estoque" className="text-sm font-semibold text-accent">
            Ver todo o estoque →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {featured.map((v) => (
            <VehicleCard key={v.id} v={v} />
          ))}
        </div>
      </div>
    </div>
  );
}
