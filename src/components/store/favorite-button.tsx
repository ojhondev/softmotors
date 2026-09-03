"use client";

import { useEffect, useState } from "react";

import { isFavorite, toggleFavorite, onFavoritesChange } from "@/lib/favorites";
import { Heart } from "@/components/store/icons";

export function FavoriteButton({
  slug,
  size = 15,
  className = "",
  variant = "chip",
}: {
  slug: string;
  size?: number;
  className?: string;
  variant?: "chip" | "bare";
}) {
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setActive(isFavorite(slug));
    return onFavoritesChange(() => setActive(isFavorite(slug)));
  }, [slug]);

  const base =
    variant === "chip"
      ? "flex items-center justify-center rounded-full bg-white/90 text-ink transition-colors"
      : "flex items-center justify-center rounded-full border border-line text-ink transition-colors";

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Remover dos favoritos" : "Salvar nos favoritos"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setActive(toggleFavorite(slug));
      }}
      className={`${base} ${active ? "text-accent" : ""} ${className}`}
    >
      <Heart
        size={size}
        className={mounted && active ? "fill-accent" : ""}
        strokeWidth={2}
      />
    </button>
  );
}
