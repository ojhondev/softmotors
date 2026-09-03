/**
 * Placeholder de foto do veículo enquanto não há integração de mídia.
 * Degradê neutro + silhueta — determinístico pelo `seed` para dar variação leve.
 */
const RAMPS: [string, string][] = [
  ["#E7EBF0", "#C6CFDA"],
  ["#DDE3EA", "#B9C3CF"],
  ["#E9EDF2", "#CAD3DE"],
  ["#E4E9EF", "#C0CAD6"],
];

function hash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function VehiclePhoto({
  seed,
  className,
  rounded,
}: {
  seed: string;
  className?: string;
  rounded?: boolean;
}) {
  const [from, to] = RAMPS[hash(seed) % RAMPS.length];
  return (
    <div
      className={className}
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        borderRadius: rounded ? "var(--radius-card)" : undefined,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <svg
        width="52%"
        viewBox="0 0 200 92"
        aria-hidden="true"
        style={{ opacity: 0.75, maxWidth: 260 }}
      >
        <path
          d="M12 64c0-4 2-6 7-7l14-2 12-13c5-5 10-7 18-7h36c9 0 15 3 22 9l14 12 22 4c8 1 12 4 12 10v10c0 3-2 5-5 5h-12"
          fill="#0F172A"
          opacity="0.8"
        />
        <path d="M12 64h176v9c0 3-2 5-5 5h-10" fill="#0F172A" opacity="0.8" />
        <circle cx="52" cy="78" r="13" fill="#0F172A" />
        <circle cx="52" cy="78" r="6" fill={from} />
        <circle cx="150" cy="78" r="13" fill="#0F172A" />
        <circle cx="150" cy="78" r="6" fill={from} />
      </svg>
    </div>
  );
}
