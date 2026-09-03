import Link from "next/link";

import { ChevronLeft, ChevronRight } from "@/components/store/icons";

function pageHref(base: Record<string, string>, page: number): string {
  const sp = new URLSearchParams(base);
  if (page <= 1) sp.delete("page");
  else sp.set("page", String(page));
  const qs = sp.toString();
  return qs ? `/estoque?${qs}` : "/estoque";
}

export function Pagination({
  page,
  pageCount,
  params,
}: {
  page: number;
  pageCount: number;
  params: Record<string, string>;
}) {
  if (pageCount <= 1) return null;

  const nums: (number | "…")[] = [];
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || Math.abs(i - page) <= 1) nums.push(i);
    else if (nums[nums.length - 1] !== "…") nums.push("…");
  }

  const cell =
    "flex h-9 min-w-9 items-center justify-center rounded-[9px] border border-line-strong px-2 text-sm font-semibold";

  return (
    <nav className="mt-9 flex items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={pageHref(params, page - 1)} className={cell} aria-label="Página anterior">
          <ChevronLeft size={15} />
        </Link>
      ) : (
        <span className={`${cell} opacity-40`}>
          <ChevronLeft size={15} />
        </span>
      )}

      {nums.map((n, i) =>
        n === "…" ? (
          <span key={`e${i}`} className="px-1 text-ink-subtle">
            …
          </span>
        ) : (
          <Link
            key={n}
            href={pageHref(params, n)}
            className={
              n === page
                ? "flex h-9 min-w-9 items-center justify-center rounded-[9px] bg-accent px-2 text-sm font-bold text-white"
                : cell
            }
          >
            {n}
          </Link>
        ),
      )}

      {page < pageCount ? (
        <Link href={pageHref(params, page + 1)} className={cell} aria-label="Próxima página">
          <ChevronRight size={15} />
        </Link>
      ) : (
        <span className={`${cell} opacity-40`}>
          <ChevronRight size={15} />
        </span>
      )}
    </nav>
  );
}
