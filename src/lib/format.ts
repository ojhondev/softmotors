const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const brlCents = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const int = new Intl.NumberFormat("pt-BR");

/** R$ 116.900 — sem centavos, para preços de veículo. */
export function money(value: number | string | null | undefined): string {
  const n = typeof value === "string" ? Number(value) : value;
  if (n == null || Number.isNaN(n)) return "—";
  return brl.format(n);
}

/** R$ 2.190,47 — com centavos, para parcelas. */
export function moneyCents(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—";
  return brlCents.format(value);
}

/** 44.000 km */
export function km(value: number | null | undefined): string {
  if (value == null) return "—";
  return `${int.format(value)} km`;
}

export function number(value: number | null | undefined): string {
  if (value == null) return "—";
  return int.format(value);
}

/** 2024/2025 */
export function yearPair(
  production: number | null | undefined,
  model: number | null | undefined,
): string {
  if (production && model) return `${production}/${model}`;
  return String(model ?? production ?? "—");
}
