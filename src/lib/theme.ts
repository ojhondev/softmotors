import type { Tenant } from "@/lib/tenant";

/**
 * Overrides de tema por tenant. As chaves batem com as CSS custom properties
 * de src/app/globals.css; o que não vier fica no preset "Clean".
 */
const TOKEN_MAP: Record<string, string> = {
  accent: "--accent",
  accentHover: "--accent-hover",
  accentWeak: "--accent-weak",
  ink: "--ink",
  bg: "--bg",
  surface: "--surface",
  radiusCard: "--radius-card",
  radiusInput: "--radius-input",
};

export function tenantThemeCss(tenant: Tenant): string | null {
  const theme = (tenant.theme ?? {}) as Record<string, unknown>;
  const decls: string[] = [];
  for (const [key, cssVar] of Object.entries(TOKEN_MAP)) {
    const value = theme[key];
    if (typeof value === "string" && value.trim()) {
      decls.push(`${cssVar}:${value.trim()}`);
    }
  }
  if (!decls.length) return null;
  return `:root{${decls.join(";")}}`;
}
