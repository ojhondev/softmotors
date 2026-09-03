export function kebab(input: string): string {
  return input
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Slug da VDP: volkswagen-t-cross-1-0-200-tsi-2024-a1b2c3d4 */
export function vehicleSlug(parts: {
  brand: string;
  model: string;
  version?: string | null;
  modelYear?: number | null;
  id: string;
}): string {
  return [
    kebab(parts.brand),
    kebab(parts.model),
    parts.version ? kebab(parts.version) : "",
    parts.modelYear ?? "",
    parts.id.replace(/-/g, "").slice(0, 8),
  ]
    .filter(Boolean)
    .join("-");
}
