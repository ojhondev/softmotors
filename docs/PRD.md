# SoftMotors — PRD v1.0

**Software e plataformas white label para concessionárias multimarcas e revendas de veículos.**

- **Versão:** 1.0 — dois modelos de plataforma (Essential / Prime) + arquitetura replicável de template
- **Data:** Setembro de 2026
- **Status:** Proposta para discussão
- **Modelo de negócio:** licença white label (setup + mensalidade) + implementação assistida
- **Não é:** ERP, DMS ou CRM. É o **site + plataforma de vendas** da concessionária.

---

## 00 — Resumo executivo

### A plataforma de site para quem vende carro

A **SoftMotors** é uma empresa de software especializada em **concessionárias multimarcas
e revendas**. O produto central não é gestão interna — é o **canal digital de vendas**: o
site da loja, com a experiência de compra e as funcionalidades que o comprador brasileiro
já espera de um **WebMotors, iCarros ou OLX Autos**, só que rodando no domínio da própria
concessionária, com a marca dela.

A SoftMotors entrega isso em **dois modelos white label** — *Essential* e *Prime* —
construídos a partir de **um único template replicável**. Cada nova concessionária é uma
**implementação** (tema, domínio, integração de estoque, publicação), não um projeto do
zero.

### O que a plataforma é

- Um **"e-commerce" de veículos** — vitrine, busca avançada, página de veículo (VDP),
  comparação, favoritos, reserva/sinal e proposta digital.
- Uma **plataforma com funcionalidades**: simulador de financiamento, avaliação do usado
  (troca), área do cliente, agendamento, integração com portais e integrador de estoque.
- **Robusta e com design profissional** — padrão de mercado, responsiva, rápida, otimizada
  para SEO e para conversão de leads.
- **Replicável** — mesma base de código servindo N concessionárias, com identidade,
  conteúdo e regras configuráveis por cliente (multi-tenant + theming).

### O que a plataforma NÃO é

| Não é | Por quê / o que faz no lugar |
|---|---|
| **ERP / DMS** | Não controla financeiro, contábil, compras, folha, pátio. **Consome** o estoque de um ERP/DMS existente via integrador. |
| **CRM completo** | Não faz pipeline comercial, cadência, metas, funil de vendedor. Captura o lead, qualifica de forma leve e **entrega** para o CRM do cliente (RD Station, HubSpot, Syonet, planilha, webhook). |
| **Marketplace** | Não agrega estoque de terceiros. É o site de **uma** rede/loja (pode ter multi-unidade). |
| **Gestão de oficina/peças** | Pode ter vitrine de serviços e agendamento (Prime), mas não OS, não ordem de produção. |

---

## 01 — Tese: o site da concessionária é um produto, não um serviço de agência

Hoje a maioria das multimarcas tem um destes cenários:

1. Site institucional "cartão de visitas" com estoque desatualizado ou embutido de um
   portal (iframe do WebMotors/AutoConf), sem SEO próprio e sem captura de lead qualificada.
2. Site feito por agência local, sob medida, caro de manter, que apodrece porque ninguém
   evolui.
3. Nenhum site — dependência total de portais pagos (WebMotors, OLX), onde a loja compete
   por preço, não tem marca e paga CPL/assinatura alta.

O portal continua necessário para topo de funil. Mas a loja precisa de **casa própria**:
domínio dela, marca dela, base de leads dela, SEO dela, e uma experiência de compra que
não seja pior que a do portal. Construir isso bem, uma vez, e **replicar** é um produto de
software — não um serviço de agência.

**Paralelo de modelo:** o que a **Cvet/AutoForce (AutoConf, Comunidade)**, a **Bcarros**,
a **Boxphere** e a **DealerX** fazem para o setor automotivo — plataforma de sites +
geração de leads — mas com posicionamento em **dois modelos claros e replicáveis** e foco
em **multimarcas**, não só concessionária de marca.

---

## 02 — Os dois modelos

Ambos saem do **mesmo template**. A diferença é **profundidade de funcionalidade,
integrações e serviço de implementação** — não código separado. Um cliente Essential vira
Prime "ligando" módulos, sem migração.

### 2.1 Visão geral

| | **Essential** | **Prime** |
|---|---|---|
| Público | Multimarca pequena/média (1 loja, ~30–300 veículos) | Rede / concessionária robusta (multi-loja, 300+ veículos, 0km + seminovos) |
| Proposta | Vitrine profissional + captação de leads | Canal de vendas digital completo, com esteira de proposta |
| Estoque | Integrador (XML/planilha/1 ERP) + cadastro manual | Integrador multi-fonte + regras + multi-loja + 0km |
| Financiamento | Simulador (tabela/price + FIPE) | Simulador + pré-aprovação via parceiros (bancos/fintechs) |
| Usado na troca | Formulário + faixa FIPE + lead | Avaliação guiada + agendamento + fila no painel |
| Área do cliente | Favoritos + acompanhamento de proposta | + histórico, documentos, status de financiamento, reserva |
| Portais | Feed de saída (WebMotors, OLX, ML, iCarros) | + sincronização bidirecional de status e métricas |
| Conteúdo/SEO | Blog + páginas de SEO geradas (marca/modelo/cidade) | + landing pages de campanha + hub de conteúdo |
| Multi-loja | 1 unidade | N unidades, com estoque, equipe e páginas por unidade |
| NF-e | — | **Emissor NF-e embutido** (via parceiro fiscal) — ver §7.11 |
| Painel admin | Estoque, leads, aparência, conteúdo | + regras de precificação, campanhas, relatórios, papéis |
| Implementação | Onboarding guiado (self-service assistido), ~1–2 semanas | Implementação dedicada, migração e treinamento, ~3–6 semanas |
| Suporte | Chamado + base de conhecimento | SLA + gerente de conta |

### 2.2 Regra de corte entre os modelos

O que **define Prime** (não dá para entregar bem no Essential):

- **Multi-loja real** (estoque, leads e páginas segmentados por unidade).
- **Pré-aprovação de financiamento** com integração a banco/fintech (fluxo com dados
  pessoais, consentimento, retorno assíncrono).
- **Emissor de NF-e** embutido.
- **Regras de precificação/campanha** dinâmicas (ex.: "todo SUV 2020+ com selo bônus").
- **SLA e ambiente dedicado**.

Tudo o mais é o mesmo produto com mais ou menos configuração ligada.

---

## 03 — Arquitetura replicável: um template, N concessionárias

O coração do negócio da SoftMotors é **não reconstruir o site a cada cliente**. Três
camadas tornam isso possível:

### 3.1 Multi-tenant

Uma base de código, um banco, isolamento lógico por `tenant`. Cada concessionária tem:

- `tenant` (id, razão social, CNPJ, plano Essential/Prime, status)
- 1..N `unidades` (loja física: endereço, horário, equipe, WhatsApp, CNPJ da filial)
- domínio próprio (`CNAME` → plataforma) + certificado automático
- feature flags do plano + overrides pontuais (ex.: Essential com 1 módulo Prime avulso)

### 3.2 Theming (identidade sem código)

Um **design system tokenizado** (cores, tipografia, raio, sombra, densidade, logotipo,
favicon, imagens de hero) preenchido por cliente. 2–3 **presets de layout** de home e de
VDP ("Clean", "Bold", "Classic") selecionáveis. Nenhuma implementação toca CSS custom —
se um cliente precisa de algo fora do sistema, vira **feature do template** para todos.

### 3.3 Config-driven (conteúdo e regras como dados)

- Menus, páginas institucionais, blocos da home, banners, selos, campanhas → CMS por tenant.
- Filtros disponíveis, campos da ficha do veículo, textos legais, políticas → configuração.
- Regras de negócio (precificação, destaque, distribuição de lead) → editor de regras (Prime).

**Princípio:** toda demanda de cliente cai em um de três baldes — *tema* (config visual),
*conteúdo* (CMS), ou *feature do produto* (backlog compartilhado). "Customização de código
por cliente" é proibida — é o que mata a replicabilidade.

### 3.4 Playbook de implementação (o "modelo replicável")

Cada novo cliente segue o mesmo checklist versionado:

1. Provisionar tenant + unidade(s) + plano.
2. Coletar marca (logo, cores, fotos) → aplicar tokens + escolher preset.
3. Conectar fonte de estoque (integrador) → primeira sincronização → conferência.
4. Configurar institucional (sobre, lojas, contato, jurídico) e canais (WhatsApp, e-mail,
   CRM de destino do lead).
5. Ligar módulos do plano (financiamento, troca, portais, NF-e…).
6. SEO base (domínio, redirects do site antigo, Search Console, sitemap, GBP).
7. Homologação (QA por checklist) → publicação → treinamento → handoff para suporte.

---

## 04 — Personas

| Persona | Quem | O que precisa da plataforma |
|---|---|---|
| **Comprador** | Pessoa buscando carro (0km ou seminovo) | Buscar/filtrar como no WebMotors, ver ficha completa e fotos, simular parcela, avaliar o carro da troca, falar no WhatsApp, agendar visita, reservar |
| **Vendedor da loja** | Consultor de vendas | Receber lead qualificado com contexto (veículo, simulação, troca), responder rápido, agendar |
| **Gerente / dono** | Gestão da multimarca | Estoque publicado e correto, volume e origem de leads, o que dá match, custo vs. portal |
| **Marketing** | Agência ou equipe interna | Criar campanhas/landing pages, blog, medir tráfego e conversão, integrar com Meta/Google Ads |
| **Operação de estoque** | Quem cadastra carro / cuida do pátio | Subir veículo com fotos rápido, precificar, publicar em portais, tirar do ar quando vende |
| **Implementador SoftMotors** | Time de onboarding | Rodar o playbook, sem escrever código |
| **Admin SoftMotors** | Time de produto/suporte | Gerenciar tenants, planos, incidentes, releases |

---

## 05 — Arquitetura de navegação (site do cliente)

| Área | Páginas | Essential | Prime |
|---|---|---|---|
| **Home** | Hero + busca, destaques, por categoria, marcas, campanhas, seminovos/0km, prova social, unidades | ✅ | ✅ (+ blocos por campanha/regra) |
| **Estoque (SRP)** | Listagem com filtros, ordenação, salvar busca, mapa/lista | ✅ | ✅ (+ multi-loja, filtros extra) |
| **Veículo (VDP)** | Galeria, specs, opcionais, FIPE, simulação, troca, CTA WhatsApp/proposta, similares, selos, histórico | ✅ | ✅ (+ reserva/sinal, status ao vivo) |
| **Financiamento** | Simulador, explicação, parceiros, pré-aprovação | Simulador | + pré-aprovação |
| **Venda/Avaliação do seu usado** | Formulário guiado, faixa FIPE, agendamento | ✅ | ✅ (+ fila e triagem) |
| **0km / Novos** | Catálogo por marca/modelo, versões, oferta | opcional | ✅ |
| **Consórcio / Serviços** | Landing + lead (oficina, blindagem, seguro, despachante) | opcional | ✅ |
| **Institucional** | Sobre, Unidades, Contato, Trabalhe conosco, Políticas/Jurídico | ✅ | ✅ |
| **Conteúdo** | Blog, guias de compra, páginas SEO (marca/modelo/cidade) | ✅ | ✅ (+ hubs, campanhas) |
| **Área do cliente** | Login, favoritos, buscas salvas, propostas, agendamentos | ✅ | + documentos, financiamento, reserva |
| **Painel admin (SoftMotors/cliente)** | Estoque, leads, conteúdo, aparência, integrações, usuários, relatórios | ✅ | + regras, campanhas, multi-loja, papéis, NF-e |

---

## 06 — Busca e catálogo (paridade WebMotors)

### 6.1 SRP — listagem de estoque

- **Filtros:** tipo (carro/moto/caminhão/utilitário), novo/seminovo, marca, modelo, versão,
  ano (de/até), faixa de preço, faixa de parcela, km, câmbio, combustível, carroceria,
  cor, portas, final de placa, opcionais, blindado, único dono, aceita troca, IPVA pago,
  garantia de fábrica, unidade/loja, raio por CEP.
- **Ordenação:** relevância, menor/maior preço, menor km, ano mais novo, recém-chegados,
  menor parcela.
- **UX:** busca com autocomplete (marca/modelo), chips de filtro, contagem de resultados
  em tempo real, paginação + scroll infinito, salvar busca (gera alerta na área do
  cliente), comparar até 4 veículos, favoritar, compartilhar.
- **SEO:** cada combinação relevante de filtro tem URL limpa, `<title>`/meta e H1 próprios
  (`/carros/toyota/corolla/sao-paulo-sp`), com paginação canônica.

### 6.2 VDP — página do veículo

- Galeria (fotos em alta, ordenável, marca d'água opcional; vídeo; tour 360º interno/externo
  no Prime), com lazy-load e formatos modernos.
- Ficha: preço, parcela "a partir de", ano/modelo, km, câmbio, combustível, cor, placa
  final, renavam parcial, chassi parcial, **valor FIPE e % sobre a FIPE**, código do estoque.
- Opcionais e itens de série (lista estruturada por categoria).
- Selos: "abaixo da FIPE", "único dono", "revisado", "garantia", "0km", "recém-chegado".
- **Blocos de ação:** simular financiamento (inline), dar meu carro na troca (inline),
  WhatsApp com mensagem pré-preenchida (veículo + código), agendar test-drive/visita,
  **reservar com sinal** (Prime), enviar proposta.
- Histórico do veículo (Prime): integração opcional com laudo cautelar / histórico
  (ex.: parceiros de checagem veicular) — exibido quando disponível.
- Similares/relacionados, "veículos vistos recentemente", contato da unidade que tem o carro.

### 6.3 Ficha do veículo (modelo de dados)

Campos fixos do template + **atributos configuráveis por tenant**. Fonte primária = FIPE +
tabela de modelos; complementos manuais. Suporta 0km (versão, cor de fábrica, tabela de
preços) e seminovo (km, placa, laudo).

---

## 07 — Módulos de plataforma

### 7.1 Simulador de financiamento

- **Essential:** cálculo local (Tabela Price / SAC), entrada, prazo (12–60), taxa
  configurável por faixa, inclusão de IOF e tarifa de cadastro (parametrizável),
  resultado com CET aproximado e aviso de "sujeito a análise". Gera lead com os parâmetros.
- **Prime:** além do cálculo, **pré-aprovação** via parceiros (bancos/fintechs — ex.:
  BV, Santander, Omni, Creditas, Sicredi, via agregadores tipo *Kobana*/*Financia*/
  *meutudo* ou integração direta). Fluxo: comprador informa dados + consentimento LGPD →
  envio assíncrono → retorno de condições → exibe na área do cliente e notifica vendedor.
- Configurável: quais parceiros, ordem, taxas de fallback, política de arredondamento.
- **Não** faz esteira de crédito completa nem assinatura de contrato (fora de escopo);
  entrega o lead pré-aprovado para o parceiro/loja concluírem.

### 7.2 Avaliação do usado (trade-in)

- Formulário guiado: placa ou marca/modelo/ano/versão → busca FIPE → km, estado geral
  (single/multi-step com fotos opcionais), débitos, dono único, sinistro.
- Resultado: **faixa de valor estimada** (FIPE ± ajuste por km/estado, parametrizável),
  com disclaimer de "avaliação presencial confirma".
- CTA: agendar avaliação presencial / receber contato.
- **Prime:** fila de avaliações no painel, com triagem, atribuição a comprador (casar com
  interesse de compra), e status ("aguardando", "avaliado", "proposta enviada").
- Integração opcional com serviços de precificação de atacado (ex.: tabelas de compra).

### 7.3 Área do cliente (comprador)

- Login por e-mail/telefone (OTP) ou social; sem senha obrigatória.
- Favoritos, buscas salvas + alertas (e-mail/WhatsApp/push) de novos veículos no critério.
- Propostas enviadas e seu status; histórico de simulações; agendamentos.
- **Prime:** documentos (upload para financiamento/transferência), status de pré-aprovação,
  reserva ativa (veículo, valor de sinal, validade), timeline do atendimento.
- LGPD: central de privacidade (consentimentos, exportar, excluir).

### 7.4 Leads, propostas e atendimento (CRM-lite, não CRM)

- **Captura:** todo formulário (VDP, simulação, troca, contato, WhatsApp click, reserva)
  vira um **lead** com contexto completo (veículo, valores, origem UTM, página, unidade).
- **Qualificação leve:** score simples por completude + intenção (simulou? deu troca?
  reservou?), sem cadência nem funil de vendedor.
- **Distribuição:** por unidade / rodízio / disponibilidade (Prime); notificação em
  tempo real (e-mail, WhatsApp, painel, webhook).
- **Entrega para o CRM do cliente:** conectores RD Station, HubSpot, Pipedrive, Syonet,
  Ploomes + **webhook genérico** + e-mail. A plataforma **não** é a ferramenta de trabalho
  do vendedor — é a fonte do lead.
- Painel de leads: lista, filtros, status básico (novo / em contato / agendado / ganho /
  perdido), motivo de perda, exportação. Sem automações de vendas.
- Anti-spam: honeypot, rate limit, reCAPTCHA/Turnstile, validação de telefone.

### 7.5 Agendamento

- Test-drive / visita à loja / avaliação do usado.
- Slots por unidade e por vendedor (Prime), com bloqueios e limite por período.
- Confirmação e lembrete por e-mail/WhatsApp; sincronização opcional com Google Calendar.

### 7.6 Integração com portais (feed de saída)

- **Exportação** do estoque para **WebMotors, OLX Autos, Mercado Livre, iCarros, Meta
  (catálogo/Marketplace), Google Vehicle Ads** via XML/feed no padrão de cada portal
  (ou via agregadores como *AutoConf*, *Revenda Mais*, *Boom Sistemas*).
- Mapeamento de campos e fotos por portal; regras de "o que publicar onde" (ex.: não
  publicar acima de X na OLX).
- **Prime:** leitura de retorno — status do anúncio, leads originados no portal (quando a
  API permite), métricas de visualização — consolidados no painel.
- Baixa automática: veículo marcado como vendido sai de todos os canais.

### 7.7 Integrador de estoque (entrada)

O módulo que conecta a plataforma ao mundo do ERP/DMS **sem virar ERP**.

- **Fontes suportadas:** XML/feed padrão de mercado, planilha (CSV/XLSX) com template,
  API de ERPs/DMS automotivos comuns no Brasil (ex.: *Syonet*, *DealerNet/Quiron*,
  *Linx DMS*, *Autoline*, *SGA*, *Kacentral*, *Revenda Mais*, *Autoconf*), e importadores
  específicos sob demanda.
- **Sincronização:** agendada (ex.: a cada 15–30 min) + sob demanda; diffing (novos,
  alterados, vendidos); log de importação com erros por linha.
- **Enriquecimento:** casa código do veículo com **FIPE** e tabela de modelos/versões;
  normaliza marca/modelo/combustível/câmbio; deduz carroceria; valida fotos.
- **De→Para:** editor de mapeamento de campos por fonte, salvo por tenant.
- **Conflitos:** regra de precedência (ERP manda no preço? site pode sobrescrever foto?),
  campos "travados" para edição manual.
- **Cadastro manual:** para lojas sem ERP — CRUD de veículo com upload múltiplo de fotos,
  reordenação, marca d'água, e publicação em 1 clique.

### 7.8 Precificação e campanhas (Prime)

- Regras: "aplicar bônus de R$ X em SUVs 2020+", "destacar recém-chegados por 7 dias",
  "selo 'abaixo da FIPE' automático quando preço < 97% FIPE".
- Campanhas com vigência, banners, landing page e badge no card/VDP.
- Preço "de/por", parcela promocional, feirão.

### 7.9 Conteúdo, blog e SEO

- **Blog/CMS:** posts, categorias, autores, agendamento, SEO por post, relacionados.
- **Páginas de SEO programático:** geradas de dados — `/{tipo}/{marca}`,
  `/{tipo}/{marca}/{modelo}`, `/seminovos/{cidade}`, `/{marca}/{modelo}/{cidade}` — com
  conteúdo dinâmico (estoque atual, faixa de preço, texto template + trecho editorial).
- **Técnico:** SSR/SSG, sitemap.xml dinâmico, robots, canonical, `hreflang` (se preciso),
  breadcrumbs, dados estruturados **schema.org** (`Vehicle`, `Car`, `Offer`, `Product`,
  `AutoDealer`, `FAQPage`, `BreadcrumbList`), Open Graph, imagens otimizadas, Core Web
  Vitals no verde.
- **Migração:** mapa de redirects 301 do site antigo; preservação de URLs quando possível.
- **Google Business Profile:** link e dados por unidade; incentivo a avaliações.

### 7.10 Institucional e multi-unidade

- Sobre, história, diferenciais, prova social (depoimentos, números, selos).
- **Unidades:** página por loja (endereço, mapa, horário, telefone/WhatsApp, equipe,
  estoque daquela unidade), seletor de unidade no header.
- Trabalhe conosco (vagas + formulário → lead/e-mail/ATS).
- Jurídico: Política de Privacidade, Termos, Política de Cookies, aviso LGPD, canal do
  titular; consentimento de cookies (opt-in, categorias).

### 7.11 Emissor de NF-e embutido (Prime) — com ressalvas

**Objetivo:** permitir que a concessionária **emita a NF-e de venda do veículo** a partir
do próprio painel, sem sair para outro sistema, quando não usa ERP para isso.

**Abordagem recomendada — via parceiro fiscal, não construir do zero:**

- Integrar com um **provedor de emissão** (ex.: *Focus NFe*, *eNotas*, *NFe.io*,
  *PlugNotas*, *Tecnospeed*) que cuida de SEFAZ, contingência, schemas, eventos.
- A SoftMotors entrega: cadastro fiscal do tenant (certificado A1, regime, CFOP/CST
  padrão para veículos, série), tela de emissão pré-preenchida com dados do veículo +
  comprador do lead/reserva, emissão, DANFE, cancelamento/carta de correção, e
  armazenamento do XML.
- Casos cobertos no MVP do módulo: **venda de veículo usado** (revenda) e **novo**, PF e
  PJ. Fora do MVP: nota de entrada, apuração, SPED, ICMS-ST complexo, faturamento
  parcelado — isso é ERP.
- **Dependências e riscos:** exige contador do cliente validando CFOP/CST/tributação;
  responsabilidade fiscal é do cliente; requer certificado digital; regras variam por UF.
  **Decisão em aberto (§16):** entrar já no v1 do Prime ou como add-on na Fase 2.

---

## 08 — Painel administrativo

Dois níveis de acesso ao mesmo painel:

### 8.1 Painel do cliente (concessionária)

| Seção | Essential | Prime |
|---|---|---|
| **Estoque** | Lista, busca, editar veículo, fotos, publicar/despublicar, destaque, ver no site | + regras de precificação, campanhas, ações em lote, multi-loja |
| **Leads** | Lista, filtros, status básico, exportar, config de destino (CRM/e-mail/WhatsApp) | + distribuição, rodízio por unidade/vendedor, SLA de resposta, relatórios |
| **Avaliações (troca)** | Lista de solicitações | + fila, triagem, atribuição, status |
| **Conteúdo** | Blog, páginas institucionais, banners, FAQ | + landing pages de campanha, hubs |
| **Aparência** | Logo, cores, tipografia, preset de layout, imagens da home, blocos | idem |
| **Integrações** | Fonte de estoque, portais de saída, analytics, pixels, CRM | + parceiros de financiamento, provedor NF-e, calendário |
| **Financiamento** | Faixas de taxa, prazos, tarifas | + parceiros, ordem, política de pré-aprovação |
| **NF-e** | — | Cadastro fiscal, emissão, histórico, cancelamento |
| **Usuários** | Convidar, papéis básicos (admin, editor) | + papéis finos por unidade, log de auditoria |
| **Relatórios** | Tráfego, leads por origem/veículo, veículos mais vistos | + funil, conversão, tempo de resposta, performance por unidade/vendedor, custo vs. portal |

### 8.2 Painel SoftMotors (interno)

- Gestão de **tenants**: criar, plano, feature flags, domínio, status, billing.
- **Implementação**: checklist do playbook por cliente, com progresso e responsável.
- **Releases**: o que está em cada tenant, rollout gradual, feature flags globais.
- **Suporte**: chamados, incidentes, logs de integração, health por tenant.
- **Observabilidade**: uptime, erros, jobs de sincronização, filas.

---

## 09 — Design system e padrão visual

- **Tokens:** cor (primária, secundária, sucesso/alerta/erro, neutros), tipografia (par
  display/texto), raio, sombra, espaçamento, densidade, breakpoints.
- **Componentes:** header (com seletor de unidade e busca), card de veículo, galeria,
  filtros (drawer mobile / sidebar desktop), simulador, formulário de lead, comparador,
  footer, banners, selos, blocos de home, tabela de specs, mapa.
- **Presets de layout:** "Clean" (branco, editorial), "Bold" (contraste alto, foco em
  oferta), "Classic" (institucional). Cada preset é combinação de tokens + arranjo de
  blocos — não CSS novo.
- **Acessibilidade:** WCAG 2.1 AA — contraste, foco visível, navegação por teclado, alt em
  imagens, labels, `prefers-reduced-motion`.
- **Mobile-first:** maior parte do tráfego é mobile; galeria, filtros e CTAs otimizados
  para toque; sticky CTA na VDP.
- **Performance:** meta Lighthouse ≥ 90 (mobile) em Home, SRP e VDP; imagens responsivas
  em formato moderno; code-splitting; cache de borda.

---

## 10 — Integrações (mapa)

| Categoria | Integrações | Modelo | Fase |
|---|---|---|---|
| **Tabela de referência** | FIPE (marca/modelo/versão/valor), tabela de modelos | API + cache | v1 |
| **Estoque (entrada)** | ERPs/DMS automotivos, XML, planilha | Integrador SoftMotors | v1 |
| **Portais (saída)** | WebMotors, OLX Autos, Mercado Livre, iCarros, Meta, Google Vehicle Ads | Feed/XML + agregadores | v1 (Essential básico) / v2 (retorno) |
| **Financiamento** | Bancos/fintechs e agregadores de crédito | API por parceiro | Simulador v1 / pré-aprovação Prime v1–v2 |
| **CRM do cliente** | RD Station, HubSpot, Pipedrive, Syonet, Ploomes + webhook | Push de lead | v1 |
| **Fiscal** | Focus NFe / eNotas / NFe.io / PlugNotas | API | Prime v1 ou v2 (§16) |
| **Pagamento (sinal/reserva)** | Pix + gateway (Pagar.me, Mercado Pago, Asaas) | Checkout de sinal | Prime v1–v2 |
| **Comunicação** | WhatsApp (Cloud API / BSP), e-mail transacional, push web | API | v1 |
| **Analytics & Ads** | GA4, GTM, Meta Pixel/CAPI, Google Ads, Search Console, Clarity/Hotjar | Script + server-side events | v1 |
| **Histórico veicular** | Parceiros de laudo/cautelar | API opcional | v2 |
| **Mapas** | Google Maps / Mapbox | API | v1 |
| **Calendário** | Google Calendar | OAuth | v2 |

Todas as integrações **mockadas primeiro** no formato da API real (metodologia `dev.md`),
trocáveis sem mudança de arquitetura.

---

## 11 — Stack e arquitetura técnica (proposta)

Alinhada ao `dev.md` (ajustar conforme necessidade):

| Camada | Escolha |
|---|---|
| Framework | Next.js (App Router, Server Actions, SSR/ISR) + TypeScript |
| UI | Tailwind + biblioteca de componentes própria (design system) + Lucide + Recharts (relatórios) |
| Dados | Postgres (Neon) + Drizzle ORM; particionamento lógico por `tenant_id` em todas as tabelas |
| Busca | Índice dedicado para SRP (Postgres FTS/`pg_trgm` no v1; OpenSearch/Typesense se escala exigir) |
| Arquivos/imagens | Storage de objetos + CDN + pipeline de otimização/resize/marca d'água |
| Filas/jobs | Fila para sincronização de estoque, feeds de portal, alertas, e-mails (cron + worker) |
| Auth | Compradores: OTP/social sem senha. Painel: sessão própria + scrypt + papéis (RBAC) por tenant/unidade |
| Multi-tenant | Middleware resolve tenant por domínio; `tenant_id` obrigatório em toda query; testes de isolamento |
| Deploy | Vercel + repositório GitHub; ambientes: dev, staging, prod; feature flags |
| Domínios | Domínio custom por tenant via CNAME + TLS automático |
| Observabilidade | Logs estruturados, métricas por tenant, alertas de job falho, uptime |
| LGPD | Criptografia em repouso de PII, retenção configurável, trilha de consentimento, DPA com clientes |

**Regras de arquitetura (inegociáveis para replicabilidade):**

1. Nenhuma tabela sem `tenant_id`. Nenhuma query sem filtro de tenant.
2. Zero código específico de cliente. Diferença de cliente = dado (config/tema/flag).
3. Toda integração atrás de uma interface + implementação mock.
4. Migrações declarativas; schema nunca editado direto no banco.
5. Feature flags para todo módulo; Prime vs. Essential é conjunto de flags.

---

## 12 — Modelo de implementação e operação

### 12.1 Onboarding

- **Essential:** assistido/self-service. Portal de onboarding com passos; SoftMotors valida
  estoque e publica. Meta: **1–2 semanas**.
- **Prime:** implementação dedicada — kickoff, levantamento de integrações, migração de
  URLs, treinamento da equipe (estoque, leads, conteúdo), homologação assistida. Meta:
  **3–6 semanas**.

### 12.2 Suporte e evolução

- Base de conhecimento + chamados (Essential); SLA + gerente de conta (Prime).
- Roadmap de produto **compartilhado** — melhoria pedida por um cliente vira feature para
  todos. Sem branch por cliente.
- Releases quinzenais, rollout gradual por tenant, changelog.

### 12.3 Papéis internos SoftMotors

Produto, Engenharia, Implementação/Onboarding, Suporte/CS, Comercial. Time enxuto: o
produto replicável é o que permite atender muitos clientes sem crescer serviço na mesma
proporção.

---

## 13 — Modelo de negócio

| Item | Essential | Prime |
|---|---|---|
| **Setup / implementação** | Taxa única (onboarding assistido) | Taxa de projeto (dedicado, migração, treinamento) |
| **Mensalidade** | Faixa menor, por unidade / faixa de estoque | Faixa maior, por unidade + módulos |
| **Add-ons** | Módulo Prime avulso (ex.: pré-aprovação), portais extras | NF-e, multi-loja adicional, integrações sob demanda |
| **Cobrança variável (opcional)** | — | Faixa por volume de leads / veículos publicados / emissões NF-e |
| **O que NÃO é cobrado** | Comissão sobre venda de veículo. A plataforma não custodia o pagamento do carro. | idem |

Racional: previsibilidade (assinatura) + barreira de troca (SEO, base de leads, domínio,
integrações) sem depender de take rate sobre a venda — que a loja não aceitaria e seria
difícil de rastrear.

**Decisões em aberto (§16):** valores; cobrar por unidade vs. por faixa de estoque;
posição sobre revender leads/portal.

---

## 14 — MVP e roadmap

### 14.1 MVP (valida: "a multimarca troca o site atual pela SoftMotors e capta mais lead?")

**Dentro:**

- Multi-tenant + theming (tokens + 1 preset) + domínio custom.
- Integrador de estoque: XML + planilha + 1 conector de ERP + cadastro manual + FIPE.
- SRP com filtros completos + VDP completa + comparador + favoritos.
- Simulador de financiamento (cálculo local) + captura de lead.
- Avaliação do usado (formulário + faixa FIPE + lead).
- Área do cliente (OTP, favoritos, buscas salvas + alertas, propostas).
- Leads: captura, painel, status básico, entrega para CRM (webhook + RD Station) + WhatsApp/e-mail.
- Feed de saída para WebMotors + OLX + Mercado Livre.
- Institucional + blog + SEO técnico + páginas SEO programáticas + redirects.
- Painel do cliente (estoque, leads, conteúdo, aparência, integrações) + painel SoftMotors
  (tenants, playbook, flags).
- Consentimento de cookies + central LGPD.

**Fora do MVP:** pré-aprovação de financiamento · NF-e · multi-loja · regras de
precificação/campanha · reserva com sinal/pagamento · retorno de métricas dos portais ·
tour 360º · histórico veicular · app · distribuição avançada de leads.

### 14.2 Roadmap

**Fase 1 — Essential (MVP):** o que está acima. 2–3 clientes piloto.

**Fase 2 — Prime núcleo:** multi-loja; distribuição de leads; regras de precificação e
campanhas; reserva com sinal (Pix/gateway); retorno de métricas de portais; conectores de
CRM adicionais; landing pages de campanha.

**Fase 3 — Financiamento e fiscal:** pré-aprovação com parceiros; emissor NF-e via
parceiro; documentos na área do cliente; relatórios de funil e custo vs. portal.

**Fase 4 — Inteligência e escala:** recomendação de veículos, precificação sugerida por
mercado, alertas inteligentes, busca por linguagem natural, mais conectores de ERP,
expansão para 0km/redes maiores, marketplace de rede (multi-loja como catálogo unificado).

---

## 15 — Métricas de sucesso

| Dimensão | KPIs |
|---|---|
| **Produto / replicabilidade** | Tempo médio de implementação (Essential/Prime); nº de tenants ativos; % de demandas resolvidas por config (vs. código); nº de branches por cliente (meta: 0) |
| **Adoção pelo cliente** | Estoque publicado e atualizado (frescor da sincronização); veículos com ficha completa; uso do painel (logins/semana) |
| **Tráfego / SEO** | Sessões orgânicas/mês por tenant; páginas indexadas; posição média marca+modelo+cidade; Core Web Vitals |
| **Conversão** | Leads/mês por tenant; taxa visita→lead; leads por veículo; % que simulou financiamento; % que deu troca; agendamentos |
| **Qualidade do lead** | % com telefone válido; tempo de 1ª resposta (Prime); leads → agendamento → venda (quando a loja reportar) |
| **Portais** | Veículos sincronizados; leads originados no portal (quando disponível); custo por lead site vs. portal |
| **Negócio SoftMotors** | MRR; ARPU; mix Essential/Prime; churn; NRR; CAC de implementação vs. LTV |

---

## 16 — Riscos e decisões em aberto

### Riscos

| Risco | Por quê | Mitigação |
|---|---|---|
| **Diversidade de ERPs** | Cada loja tem um DMS/ERP diferente; integração de estoque é o maior atrito | Suportar XML + planilha desde o dia 1; conectores por ERP conforme demanda; integrador com de→para configurável |
| **Customização matando a margem** | Cliente pede "só um ajustinho" e nasce um fork | Regra dura: tema/conteúdo/feature — nada de código por cliente; roadmap compartilhado |
| **NF-e / fiscal** | Complexidade tributária e responsabilidade legal | Via parceiro fiscal, nunca do zero; contador do cliente valida; possivelmente Fase 3, não MVP |
| **Dependência de portais** | APIs de WebMotors/OLX mudam, alguns não expõem retorno de leads | Começar com feed de saída (estável); retorno via agregador; não prometer o que a API não dá |
| **SEO leva tempo** | Autoridade de domínio novo não vem em semanas | Migração cuidadosa de URLs do site antigo; páginas programáticas; GBP; conteúdo desde o início |
| **Concorrência estabelecida** | AutoForce, Bcarros, Boxphere, Revenda Mais já atendem o setor | Diferencial nos 2 modelos claros, foco multimarca, template de verdade replicável, implementação rápida |
| **LGPD** | Muitos dados pessoais (leads, financiamento, documentos) | Consentimento, minimização, retenção, criptografia de PII, DPA com clientes, central do titular |
| **Isolamento multi-tenant** | Vazamento entre concessionárias seria fatal | `tenant_id` obrigatório, testes automatizados de isolamento, revisão de toda query |

### Decisões em aberto

1. **NF-e no Prime v1 ou add-on Fase 3?** Depende de quantos clientes-alvo não têm ERP
   fiscal.
2. **Qual conector de ERP entra primeiro?** Definir pelos pilotos.
3. **Preço:** valores de setup e mensalidade; por unidade vs. por faixa de estoque;
   cobrança variável por lead/veículo/NF-e sim ou não.
4. **Reserva com sinal:** entra no Prime núcleo (Fase 2) ou espera validação jurídica de
   arras/devolução?
5. **Presets de layout:** quantos no lançamento (1, 2 ou 3)?
6. **Marketplace de rede:** multi-loja como catálogo unificado (uma marca guarda-chuva
   sobre várias lojas) é produto separado?
7. **Leads de portal:** a SoftMotors intermedeia contrato com portais (revenda de
   assinatura/CPL) ou só integra?
8. **Domínio:** SoftMotors hospeda e gerencia DNS, ou cliente aponta CNAME e mantém o
   registro?
9. **Conteúdo do blog:** template com posts prontos "de fábrica" (guias de compra
   genéricos) compartilhados entre tenants, ou cada loja produz o seu?
10. **App:** PWA é suficiente ou algum cliente Prime vai exigir app nativo?

---

## 17 — Princípios de produto

- **Um template, N lojas.** Diferença de cliente é sempre dado, nunca código.
- **É o site de vendas, não o sistema de gestão.** Consumir do ERP, entregar para o CRM,
  não virar nenhum dos dois.
- **Paridade com portal na experiência de compra** — busca, ficha e simulação não podem
  ser piores que WebMotors.
- **O lead é o produto.** Toda tela existe para gerar um lead qualificado e rastreável.
- **SEO e performance são requisito, não enfeite.**
- **Essential vira Prime ligando flag** — sem migração, sem reimplementação.
- **Mockado primeiro** — toda integração no formato da API real, trocável depois.
- **Se um cliente pediu e faz sentido, todos ganham.** Backlog compartilhado.
