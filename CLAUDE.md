# SoftMotors

Software e plataformas **white label** para concessionárias multimarcas e revendas de
veículos. O produto é o **site + plataforma de vendas** da loja (paridade com WebMotors /
iCarros / OLX Autos). **Não é ERP e não é CRM** — consome estoque de ERP/DMS via
integrador e entrega leads para o CRM do cliente.

- **Dois modelos, mesmo template replicável:** `Essential` (multimarca pequena/média,
  vitrine + captação de leads) e `Prime` (rede robusta, esteira de venda digital,
  multi-loja, pré-aprovação de financiamento, NF-e embutido via parceiro fiscal).
- Visão completa de produto em [`docs/PRD.md`](docs/PRD.md).

## Stack

- Next.js 15.5 (App Router) + TypeScript + Tailwind CSS 4 + lucide-react
- Neon (Postgres serverless) + Drizzle ORM (`src/db/schema.ts`, migrations em `drizzle/`)
- Deploy: Vercel — repositório `github.com/ojhondev/softmotors`

## Arquitetura (regras inegociáveis — ver PRD §11)

1. **Multi-tenant:** toda tabela de dados de cliente tem `tenantId`; nenhuma query roda
   sem filtrar por ele.
2. **Zero código por cliente:** diferença entre concessionárias é sempre dado
   (tema/config/feature flag), nunca um fork.
3. Toda integração externa (FIPE, ERP, portais, financiamento, NF-e) atrás de uma
   interface, com implementação mock no formato da API real primeiro.
4. Schema declarado em código; migrations via `drizzle-kit`, nunca editar o banco direto.
5. `Essential` vs `Prime` = conjunto de feature flags, não bases separadas.

## Dev

- Dev server: `npm run dev` (porta 3007 no `A:/Velo/.claude/launch.json`, preview `softmotors`).
- Banco: `npm run db:generate` / `db:migrate` / `db:studio`. Env vars via
  `npx vercel@latest env pull .env.local`.
- Build de produção + lint antes de commitar.

## Git & deploy

Provisionado seguindo `C:\Users\55149\dev.md`. Push para `origin/main` e, após cada push,
`npx vercel@latest --prod` (não confiar só no auto-deploy nativo). Commits em português,
no imperativo.
