"use client";

/**
 * Favoritos por dispositivo (localStorage) — MVP sem login. Quando houver área
 * do cliente, a lista migra para o servidor (PRD §7.3).
 */
const KEY = "sm:favorites";
const EVT = "sm:favorites-changed";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function write(list: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* modo privado / storage cheio — ignora */
  }
  window.dispatchEvent(new CustomEvent(EVT));
}

export function getFavorites(): string[] {
  return read();
}

export function isFavorite(slug: string): boolean {
  return read().includes(slug);
}

export function toggleFavorite(slug: string): boolean {
  const list = read();
  const i = list.indexOf(slug);
  if (i === -1) {
    list.push(slug);
    write(list);
    return true;
  }
  list.splice(i, 1);
  write(list);
  return false;
}

/** Assina mudanças (deste ou de outra aba). Retorna o unsubscribe. */
export function onFavoritesChange(fn: () => void): () => void {
  const handler = () => fn();
  window.addEventListener(EVT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVT, handler);
    window.removeEventListener("storage", handler);
  };
}
