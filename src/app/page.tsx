import { Car, Gauge, LayoutTemplate, Plug } from "lucide-react";

const models = [
  {
    name: "Essential",
    tagline: "Multimarca pequena/média",
    points: [
      "Vitrine profissional + captação de leads",
      "Integrador de estoque (XML / planilha / 1 ERP)",
      "Simulador de financiamento e avaliação do usado",
      "Área do cliente + feed para WebMotors, OLX e Mercado Livre",
    ],
  },
  {
    name: "Prime",
    tagline: "Rede / concessionária robusta",
    points: [
      "Canal de vendas digital com esteira de proposta",
      "Multi-loja, regras de precificação e campanhas",
      "Pré-aprovação de financiamento e reserva com sinal",
      "Emissor de NF-e embutido via parceiro fiscal",
    ],
  },
];

const pillars = [
  { icon: Car, label: "E-commerce de veículos com paridade WebMotors" },
  { icon: LayoutTemplate, label: "Um template replicável, N concessionárias" },
  { icon: Plug, label: "Consome o ERP, entrega o lead ao CRM" },
  { icon: Gauge, label: "SEO e performance como requisito" },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-16 px-6 py-20 font-sans">
      <header className="flex flex-col gap-4">
        <span className="font-mono text-sm tracking-widest text-neutral-500">
          SOFTMOTORS
        </span>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          Plataformas white label para concessionárias multimarcas
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          O site e a plataforma de vendas da sua loja — com a experiência que o
          comprador já espera de um WebMotors, no seu domínio e na sua marca.
          Não é ERP. Não é CRM.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {pillars.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-start gap-3 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800"
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              {label}
            </span>
          </div>
        ))}
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        {models.map((m) => (
          <div
            key={m.name}
            className="flex flex-col gap-3 rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800"
          >
            <div>
              <h2 className="text-xl font-semibold">{m.name}</h2>
              <p className="text-sm text-neutral-500">{m.tagline}</p>
            </div>
            <ul className="flex flex-col gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              {m.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-neutral-400">—</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <footer className="text-sm text-neutral-500">
        Estágio inicial — fundação da plataforma. Documento de produto em{" "}
        <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">
          docs/PRD.md
        </code>
        .
      </footer>
    </main>
  );
}
