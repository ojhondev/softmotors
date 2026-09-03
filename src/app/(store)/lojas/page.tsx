import type { Metadata } from "next";
import Link from "next/link";

import { getTenant, getUnits } from "@/lib/tenant";
import { Card } from "@/components/store/ui";
import { MapPin } from "@/components/store/icons";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Nossas lojas",
  description: "Endereços, horários e contato das unidades softmotors.",
};

export default async function LojasPage() {
  const tenant = await getTenant();
  const units = await getUnits(tenant.id);

  return (
    <div className="wrap py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">Nossas lojas</h1>
      <p className="mt-2 text-[15px] text-ink-muted">
        Venha tomar um café e conhecer o estoque pessoalmente.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {units.map((u) => (
          <Card key={u.id} className="p-6">
            <div className="flex items-center gap-2 text-[15px] font-bold">
              <MapPin size={18} className="text-accent" />
              {u.name}
            </div>
            <div className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
              {u.addressLine}
              <br />
              {u.city} – {u.state}, {u.zip}
              <br />
              {Object.entries((u.hours ?? {}) as Record<string, string>)
                .map(([k, v]) => `${k}: ${v}`)
                .join(" · ")}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={`/estoque?unidade=${u.slug}`}
                className="rounded-full bg-accent px-4 py-2 text-[13px] font-bold text-white hover:bg-accent-hover"
              >
                Ver estoque
              </Link>
              <a
                href={waLink(u.whatsapp, `Olá! Falo com a ${u.name}?`)}
                target="_blank"
                rel="noopener"
                className="rounded-full border border-line-strong px-4 py-2 text-[13px] font-bold hover:bg-[#f8fafc]"
              >
                WhatsApp
              </a>
              <a
                href={`tel:${(u.phone ?? "").replace(/\D/g, "")}`}
                className="rounded-full border border-line-strong px-4 py-2 text-[13px] font-bold hover:bg-[#f8fafc]"
              >
                {u.phone}
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
