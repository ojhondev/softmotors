import { VehiclePhoto } from "@/components/store/vehicle-photo";
import { ChevronLeft, ChevronRight, Rotate3d } from "@/components/store/icons";
import { FavoriteButton } from "@/components/store/favorite-button";

export function Gallery({
  seed,
  slug,
  photoCount,
}: {
  seed: string;
  slug: string;
  photoCount: number;
}) {
  return (
    <div className="relative overflow-hidden bg-ink">
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-80 opacity-90"
        style={{ background: "var(--accent)", clipPath: "polygon(45% 0, 100% 0, 100% 100%, 0 100%)" }}
      />
      <div className="relative grid h-[300px] grid-cols-1 gap-1 sm:h-[380px] sm:grid-cols-[1.5fr_1fr_1fr]">
        <div className="relative">
          <VehiclePhoto seed={seed} className="h-full w-full" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-[13px] font-semibold text-white">
            <Rotate3d size={14} />
            Ver 360°
          </span>
          <span className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink">
            <ChevronLeft size={16} />
          </span>
        </div>
        <div className="hidden sm:block">
          <VehiclePhoto seed={`${seed}-b`} className="h-full w-full" />
        </div>
        <div className="relative hidden sm:block">
          <VehiclePhoto seed={`${seed}-c`} className="h-full w-full" />
          <FavoriteButton slug={slug} size={16} className="absolute right-4 top-4 h-9 w-9" />
          <span className="absolute bottom-4 right-4 rounded-full bg-ink/70 px-3 py-1.5 text-xs text-white">
            1 / {photoCount} fotos
          </span>
          <span className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink">
            <ChevronRight size={16} />
          </span>
        </div>
      </div>
    </div>
  );
}
