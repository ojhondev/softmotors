import type { Metadata } from "next";

import { Card } from "@/components/store/ui";
import { TradeInForm } from "@/components/store/trade-in-form";
import { ShieldCheck, RefreshTrade, CreditCard } from "@/components/store/icons";

export const metadata: Metadata = {
  title: "Avalie seu carro na troca",
  description:
    "Avaliação do seu usado com base na tabela FIPE. Receba uma proposta da loja e use o valor como parte do pagamento.",
};

const STEPS = [
  { icon: RefreshTrade, t: "Você envia os dados", d: "Marca, modelo, ano, km e estado — leva 2 minutos." },
  { icon: CreditCard, t: "A loja avalia pela FIPE", d: "Retornamos com a faixa de valor e o agendamento." },
  { icon: ShieldCheck, t: "Troca no fechamento", d: "O valor entra como abatimento no seu próximo carro." },
];

export default function AvaliarPage() {
  return (
    <div className="wrap py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">
        Avalie seu carro na troca
      </h1>
      <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        Avaliação com base na tabela FIPE, ajustada por quilometragem e estado. Sem
        compromisso — a avaliação presencial confirma o valor final.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <Card className="p-6 sm:p-8">
          <TradeInForm />
        </Card>

        <div className="flex flex-col gap-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Card key={i} className="flex gap-3.5 p-5">
                <Icon size={24} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <div className="text-sm font-bold">{s.t}</div>
                  <div className="mt-0.5 text-[13px] leading-snug text-ink-muted">{s.d}</div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
