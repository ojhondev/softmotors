export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string; // ISO
  readMinutes: number;
  body: BlogBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "checklist-para-comprar-seminovo-com-procedencia",
    title: "Checklist para comprar um seminovo com procedência",
    category: "Guia de compra",
    excerpt:
      "O que conferir antes de fechar negócio: laudo cautelar, histórico, documentação e o test-drive que a maioria das pessoas faz errado.",
    date: "2026-08-18",
    readMinutes: 7,
    body: [
      {
        type: "p",
        text: "Comprar um carro usado bom não é sorte — é método. Quem segue um checklist consistente evita quase todas as dores de cabeça que aparecem depois da compra. Este é o roteiro que usamos internamente antes de colocar qualquer veículo no estoque.",
      },
      { type: "h2", text: "1. Laudo cautelar e histórico" },
      {
        type: "p",
        text: "O laudo cautelar aponta sinistro estrutural, adulteração de numeração e passagem por leilão. Peça sempre o laudo recente e cruze com o histórico de quilometragem — saltos estranhos entre revisões são um sinal de alerta.",
      },
      { type: "h2", text: "2. Documentação" },
      {
        type: "ul",
        items: [
          "CRLV no nome do vendedor e sem restrição financeira ativa que não seja a do próprio financiamento em quitação.",
          "IPVA e licenciamento do ano em dia.",
          "Débitos de multa consultados no Detran do estado de emplacamento.",
          "Recibo de compra e venda (ATPV-e) preenchido corretamente.",
        ],
      },
      { type: "h2", text: "3. Avaliação mecânica" },
      {
        type: "p",
        text: "Leve o carro a um mecânico de confiança ou a uma inspeção independente. Custa pouco perto do valor do carro e revela desgaste de embreagem, folga de suspensão, vazamentos e histórico de superaquecimento.",
      },
      { type: "h2", text: "4. Test-drive de verdade" },
      {
        type: "p",
        text: "Não basta dar a volta no quarteirão. Rode em velocidade de rodovia, faça uma frenagem firme, teste o ar-condicionado no máximo, escute ruídos ao esterçar todo para um lado e observe o painel na partida a frio.",
      },
      {
        type: "p",
        text: "Na softmotors todo veículo já passa por essas etapas antes de ser anunciado — mas o checklist continua valendo para qualquer compra, em qualquer lugar.",
      },
    ],
  },
  {
    slug: "financiamento-ou-a-vista-como-decidir",
    title: "Financiamento ou à vista: como decidir sem se enganar",
    category: "Financiamento",
    excerpt:
      "Entrada, prazo, CET e custo de oportunidade. Um jeito simples de comparar as duas opções com números, não com achismo.",
    date: "2026-08-05",
    readMinutes: 6,
    body: [
      {
        type: "p",
        text: "A resposta certa depende de quanto você tem guardado, de quanto esse dinheiro rende e de qual é a taxa real do financiamento — o CET, não a taxa \"de vitrine\".",
      },
      { type: "h2", text: "Olhe o CET, não só a parcela" },
      {
        type: "p",
        text: "O Custo Efetivo Total inclui juros, IOF, tarifa de cadastro e seguros embutidos. Duas propostas com a mesma parcela podem ter CET bem diferente dependendo do prazo e das tarifas.",
      },
      { type: "h2", text: "A conta do custo de oportunidade" },
      {
        type: "ul",
        items: [
          "Se o CET do financiamento é maior do que o rendimento líquido dos seus investimentos, pagar mais à vista tende a compensar.",
          "Se você ficaria sem reserva de emergência para dar entrada alta, o financiamento com entrada menor pode ser mais prudente, mesmo custando um pouco mais.",
          "Prazos muito longos reduzem a parcela mas aumentam bastante o total pago — use o menor prazo que cabe no seu orçamento.",
        ],
      },
      { type: "h2", text: "Simule antes de ir à loja" },
      {
        type: "p",
        text: "Use o simulador do site para ter uma estimativa de parcela por prazo e entrada. Ele não substitui a análise do banco, mas já mostra a ordem de grandeza e evita surpresa no balcão.",
      },
    ],
  },
  {
    slug: "avaliacao-do-usado-como-a-loja-chega-no-valor",
    title: "Avaliação do usado: como a loja chega no valor da sua troca",
    category: "Troca",
    excerpt:
      "FIPE é o ponto de partida, não o ponto final. Entenda os ajustes de quilometragem, estado e demanda que definem a proposta.",
    date: "2026-07-22",
    readMinutes: 5,
    body: [
      {
        type: "p",
        text: "Quando você pede uma avaliação de troca, a loja não \"chuta\" um número. Existe um processo, e conhecê-lo ajuda a negociar melhor.",
      },
      { type: "h2", text: "Passo 1: a referência FIPE" },
      {
        type: "p",
        text: "A tabela FIPE dá o valor médio de mercado para a versão exata do seu carro naquele mês. É a base — mas o seu carro específico pode valer mais ou menos que a média.",
      },
      { type: "h2", text: "Passo 2: os ajustes" },
      {
        type: "ul",
        items: [
          "Quilometragem: acima ou abaixo da média para o ano muda o valor para os dois lados.",
          "Estado geral: pintura, pneus, interior, revisões em dia e presença de laudo aprovado.",
          "Documentação: débitos, multas e situação do IPVA entram como desconto direto.",
          "Demanda: modelos com procura alta na região giram mais rápido e seguram preço.",
        ],
      },
      { type: "h2", text: "Passo 3: a proposta" },
      {
        type: "p",
        text: "O valor final é a FIPE ajustada por esses fatores. A avaliação online dá a faixa; a presencial confirma. Ter o carro limpo, com manual e chave reserva, costuma render alguns pontos a favor.",
      },
    ],
  },
  {
    slug: "suv-compacto-vale-a-pena-em-2026",
    title: "SUV compacto vale a pena em 2026?",
    category: "Mercado",
    excerpt:
      "Consumo, valor de revenda, custo de manutenção e para quem esse tipo de carro realmente faz sentido hoje.",
    date: "2026-07-09",
    readMinutes: 6,
    body: [
      {
        type: "p",
        text: "O SUV compacto foi o segmento que mais cresceu nos últimos anos no Brasil, e isso tem efeito direto no mercado de seminovos: mais oferta, boa liquidez e valor de revenda historicamente firme.",
      },
      { type: "h2", text: "A favor" },
      {
        type: "ul",
        items: [
          "Posição de dirigir mais alta e porta-malas versátil para família.",
          "Revenda rápida — a procura sustenta o preço na hora de trocar.",
          "Versões turbo 1.0 entregam desempenho de motor maior com consumo de motor menor.",
        ],
      },
      { type: "h2", text: "Contra" },
      {
        type: "ul",
        items: [
          "Custo de aquisição maior que o de um hatch equivalente da mesma marca.",
          "Consumo um pouco pior que o de um sedã médio em rodovia.",
          "Pneus e alguns itens de suspensão podem custar mais na manutenção.",
        ],
      },
      { type: "h2", text: "Para quem faz sentido" },
      {
        type: "p",
        text: "Se você roda mais na cidade, leva família e troca de carro a cada 3–4 anos, a conta costuma fechar pela revenda. Se roda muito em estrada e quer o menor custo por quilômetro, um sedã eficiente ainda leva vantagem.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
