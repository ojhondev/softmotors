/**
 * Simulador de financiamento — cálculo local (Tabela Price), MVP Essential.
 * Não é esteira de crédito: entrega uma estimativa "sujeito a análise".
 * Taxas ficam parametrizáveis por tenant depois (PRD §7.1).
 */

export const FINANCE_DEFAULTS = {
  /** juros ao mês (a.m.) */
  monthlyRate: 0.0189,
  /** tarifa de cadastro embutida no valor financiado */
  registrationFee: 1200,
  /** prazos oferecidos */
  terms: [12, 24, 36, 48, 60],
  /** entrada mínima sugerida como fração do preço */
  minDownFraction: 0.2,
};

export type FinanceInput = {
  price: number;
  downPayment: number;
  termMonths: number;
  monthlyRate?: number;
  registrationFee?: number;
};

export type FinanceResult = {
  financedAmount: number;
  installment: number;
  termMonths: number;
  monthlyRate: number;
  totalPaid: number;
  totalCost: number;
};

/** Parcela pela Tabela Price: PMT = PV * i / (1 - (1+i)^-n) */
export function simulateFinance(input: FinanceInput): FinanceResult {
  const rate = input.monthlyRate ?? FINANCE_DEFAULTS.monthlyRate;
  const fee = input.registrationFee ?? FINANCE_DEFAULTS.registrationFee;
  const down = Math.max(0, Math.min(input.downPayment, input.price));
  const financed = Math.max(0, input.price - down) + fee;
  const n = input.termMonths;

  const installment =
    rate === 0 ? financed / n : (financed * rate) / (1 - Math.pow(1 + rate, -n));

  const totalPaid = installment * n + down;

  return {
    financedAmount: financed,
    installment,
    termMonths: n,
    monthlyRate: rate,
    totalPaid,
    totalCost: totalPaid - input.price,
  };
}

/** Parcela "a partir de" para exibir em cards (entrada = 20%, prazo mais longo). */
export function entryInstallment(price: number | string | null | undefined): number | null {
  const p = typeof price === "string" ? Number(price) : price;
  if (!p || Number.isNaN(p)) return null;
  const { installment } = simulateFinance({
    price: p,
    downPayment: p * FINANCE_DEFAULTS.minDownFraction,
    termMonths: 48,
  });
  return installment;
}
