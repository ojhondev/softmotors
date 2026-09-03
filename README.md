# SoftMotors

Software e plataformas **white label** para concessionárias multimarcas e revendas de
veículos. O produto é o **site + plataforma de vendas** da loja (paridade com WebMotors /
iCarros / OLX Autos), **não** ERP e **não** CRM.

- **Dois modelos**, mesmo template replicável: **Essential** (multimarca pequena/média,
  vitrine + captação de leads) e **Prime** (rede robusta, esteira de venda digital,
  multi-loja, pré-aprovação de financiamento, NF-e embutido).
- Arquitetura **multi-tenant + theming + config-driven**: cada concessionária é uma
  *implementação*, não um projeto do zero.

## Documentos

- [`docs/PRD.md`](docs/PRD.md) — PRD v1.0 (visão, os 2 modelos, módulos, arquitetura
  replicável, integrações, MVP, roadmap, riscos).
- [`CLAUDE.md`](CLAUDE.md) — regras do repositório e workflow.

## Stack

Next.js 15.5 (App Router) · TypeScript · Tailwind CSS 4 · Neon (Postgres) · Drizzle ORM ·
Vercel.

## Desenvolvimento

```bash
npm install
npx vercel@latest env pull .env.local   # DATABASE_URL etc. (Neon via Vercel)
npm run dev                              # http://localhost:3007
```

Banco: `npm run db:generate` gera migrations a partir de `src/db/schema.ts`;
`npm run db:migrate` aplica; `npm run db:studio` inspeciona.
