/**
 * Seed do tenant de demonstração "softmotors" + unidades + estoque fictício.
 * Rode com: npm run db:seed
 * Idempotente: limpa o tenant demo e recria.
 */
import { config } from "dotenv";
import { eq } from "drizzle-orm";

config({ path: ".env.local" });
config({ path: ".env" });

import { db } from "./index";
import { tenants, units, vehicles } from "./schema";
import { vehicleSlug } from "../lib/slug";

const TENANT_SLUG = "softmotors";

const FEATURES = [
  "Airbag duplo",
  "Ar-condicionado",
  "Alarme",
  "Banco com regulagem de altura",
  "Computador de bordo",
  "Controle de tração",
  "Controle de estabilidade",
  "Desembaçador traseiro",
  "Direção elétrica",
  "Freios ABS + EBD",
  "Piloto automático",
  "Retrovisores elétricos",
  "Rodas de liga leve",
  "Sensor de estacionamento",
  "Travas elétricas",
  "Vidros elétricos",
  "Volante multifuncional",
  "Central multimídia",
  "Espelhamento Android Auto / Apple CarPlay",
  "Faróis de LED",
  "Bluetooth",
  "Entrada USB",
  "Sensor de chuva",
  "Câmera de ré",
];

type Seed = {
  brand: string;
  model: string;
  version: string;
  bodyType: string;
  modelYear: number;
  productionYear: number;
  mileageKm: number;
  transmission: string;
  fuel: string;
  color: string;
  price: number;
  fipePrice: number;
  plateEnd: string;
  singleOwner: boolean;
  unit: number;
  featureCount: number;
};

const DATA: Seed[] = [
  { brand: "Volkswagen", model: "T-Cross", version: "1.0 200 TSI Total Flex Automático", bodyType: "SUV", modelYear: 2025, productionYear: 2024, mileageKm: 44000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Cinza", price: 116900, fipePrice: 121400, plateEnd: "5", singleOwner: true, unit: 0, featureCount: 18 },
  { brand: "Jeep", model: "Compass", version: "1.3 T Longitude AT6", bodyType: "SUV", modelYear: 2023, productionYear: 2023, mileageKm: 38000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Branco", price: 139900, fipePrice: 142000, plateEnd: "2", singleOwner: false, unit: 1, featureCount: 20 },
  { brand: "Hyundai", model: "Creta", version: "1.0 TGDI Comfort Automático", bodyType: "SUV", modelYear: 2024, productionYear: 2024, mileageKm: 22000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Prata", price: 128500, fipePrice: 129900, plateEnd: "8", singleOwner: true, unit: 0, featureCount: 17 },
  { brand: "Toyota", model: "Corolla Cross", version: "2.0 XRE Direct Shift", bodyType: "SUV", modelYear: 2023, productionYear: 2023, mileageKm: 29000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Preto", price: 168900, fipePrice: 171000, plateEnd: "1", singleOwner: true, unit: 0, featureCount: 21 },
  { brand: "Nissan", model: "Kicks", version: "1.6 Advance CVT", bodyType: "SUV", modelYear: 2022, productionYear: 2022, mileageKm: 47000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Vermelho", price: 99900, fipePrice: 103200, plateEnd: "7", singleOwner: false, unit: 2, featureCount: 15 },
  { brand: "Volkswagen", model: "Nivus", version: "1.0 200 TSI Highline", bodyType: "SUV", modelYear: 2022, productionYear: 2022, mileageKm: 41000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Azul", price: 112900, fipePrice: 114500, plateEnd: "3", singleOwner: true, unit: 0, featureCount: 19 },
  { brand: "Toyota", model: "Corolla", version: "2.0 XEi Direct Shift", bodyType: "Sedã", modelYear: 2022, productionYear: 2022, mileageKm: 51000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Prata", price: 129900, fipePrice: 132000, plateEnd: "4", singleOwner: true, unit: 0, featureCount: 18 },
  { brand: "Honda", model: "Civic", version: "1.5 Turbo Touring", bodyType: "Sedã", modelYear: 2021, productionYear: 2021, mileageKm: 62000, transmission: "Automático", fuel: "Gasolina", color: "Cinza", price: 142900, fipePrice: 146000, plateEnd: "9", singleOwner: false, unit: 1, featureCount: 20 },
  { brand: "Chevrolet", model: "Onix", version: "1.0 Turbo Premier", bodyType: "Hatch", modelYear: 2023, productionYear: 2022, mileageKm: 33000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Branco", price: 89900, fipePrice: 91500, plateEnd: "6", singleOwner: true, unit: 2, featureCount: 16 },
  { brand: "Hyundai", model: "HB20", version: "1.0 Turbo Platinum Plus", bodyType: "Hatch", modelYear: 2023, productionYear: 2023, mileageKm: 27000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Prata", price: 92900, fipePrice: 93800, plateEnd: "0", singleOwner: true, unit: 0, featureCount: 15 },
  { brand: "Fiat", model: "Pulse", version: "1.0 Turbo 200 Drive AT", bodyType: "SUV", modelYear: 2023, productionYear: 2022, mileageKm: 36000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Cinza", price: 98900, fipePrice: 100200, plateEnd: "1", singleOwner: false, unit: 1, featureCount: 15 },
  { brand: "Fiat", model: "Strada", version: "1.3 Volcano Cabine Dupla", bodyType: "Picape", modelYear: 2022, productionYear: 2022, mileageKm: 45000, transmission: "Manual", fuel: "Gasolina e álcool", color: "Branco", price: 96900, fipePrice: 99000, plateEnd: "2", singleOwner: false, unit: 2, featureCount: 12 },
  { brand: "Toyota", model: "Hilux", version: "2.8 SRV 4x4 Diesel Aut.", bodyType: "Picape", modelYear: 2021, productionYear: 2021, mileageKm: 78000, transmission: "Automático", fuel: "Diesel", color: "Prata", price: 249900, fipePrice: 255000, plateEnd: "3", singleOwner: false, unit: 0, featureCount: 20 },
  { brand: "Volkswagen", model: "Polo", version: "1.0 TSI Comfortline", bodyType: "Hatch", modelYear: 2022, productionYear: 2021, mileageKm: 49000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Vermelho", price: 84900, fipePrice: 87000, plateEnd: "5", singleOwner: true, unit: 0, featureCount: 16 },
  { brand: "Jeep", model: "Renegade", version: "1.3 T270 Longitude AT6", bodyType: "SUV", modelYear: 2022, productionYear: 2022, mileageKm: 43000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Preto", price: 118900, fipePrice: 121000, plateEnd: "7", singleOwner: false, unit: 1, featureCount: 18 },
  { brand: "Honda", model: "HR-V", version: "1.5 Turbo Touring CVT", bodyType: "SUV", modelYear: 2023, productionYear: 2023, mileageKm: 25000, transmission: "Automático", fuel: "Gasolina", color: "Branco", price: 179900, fipePrice: 182000, plateEnd: "8", singleOwner: true, unit: 0, featureCount: 21 },
  { brand: "Chevrolet", model: "Tracker", version: "1.0 Turbo Premier Aut.", bodyType: "SUV", modelYear: 2022, productionYear: 2022, mileageKm: 39000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Cinza", price: 114900, fipePrice: 116500, plateEnd: "4", singleOwner: true, unit: 2, featureCount: 18 },
  { brand: "Renault", model: "Duster", version: "1.6 Iconic CVT", bodyType: "SUV", modelYear: 2022, productionYear: 2021, mileageKm: 52000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Marrom", price: 92900, fipePrice: 95000, plateEnd: "9", singleOwner: false, unit: 1, featureCount: 14 },
  { brand: "Volkswagen", model: "Virtus", version: "1.0 TSI Highline", bodyType: "Sedã", modelYear: 2023, productionYear: 2022, mileageKm: 31000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Prata", price: 104900, fipePrice: 106000, plateEnd: "0", singleOwner: true, unit: 0, featureCount: 18 },
  { brand: "Hyundai", model: "Creta", version: "2.0 Prestige Automático", bodyType: "SUV", modelYear: 2021, productionYear: 2021, mileageKm: 58000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Branco", price: 112900, fipePrice: 115000, plateEnd: "1", singleOwner: false, unit: 2, featureCount: 17 },
  { brand: "Toyota", model: "Yaris", version: "1.5 XLS Sedan CVT", bodyType: "Sedã", modelYear: 2022, productionYear: 2021, mileageKm: 46000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Cinza", price: 92900, fipePrice: 94500, plateEnd: "2", singleOwner: true, unit: 0, featureCount: 16 },
  { brand: "Nissan", model: "Versa", version: "1.6 Exclusive CVT", bodyType: "Sedã", modelYear: 2023, productionYear: 2022, mileageKm: 28000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Prata", price: 99900, fipePrice: 101500, plateEnd: "6", singleOwner: true, unit: 1, featureCount: 16 },
  { brand: "Fiat", model: "Toro", version: "1.3 Turbo Freedom AT6", bodyType: "Picape", modelYear: 2022, productionYear: 2022, mileageKm: 44000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Cinza", price: 129900, fipePrice: 132000, plateEnd: "3", singleOwner: false, unit: 0, featureCount: 17 },
  { brand: "Volkswagen", model: "T-Cross", version: "1.4 250 TSI Highline", bodyType: "SUV", modelYear: 2021, productionYear: 2021, mileageKm: 55000, transmission: "Automático", fuel: "Gasolina e álcool", color: "Branco", price: 118900, fipePrice: 122000, plateEnd: "7", singleOwner: false, unit: 2, featureCount: 20 },
];

async function main() {
  console.log("Seeding tenant demo…");

  const existing = await db
    .select()
    .from(tenants)
    .where(eq(tenants.slug, TENANT_SLUG))
    .limit(1);

  if (existing[0]) {
    await db.delete(tenants).where(eq(tenants.id, existing[0].id));
    console.log("  tenant demo anterior removido");
  }

  const [tenant] = await db
    .insert(tenants)
    .values({
      slug: TENANT_SLUG,
      name: "softmotors",
      legalName: "SoftMotors Seminovos Ltda",
      plan: "essential",
      status: "active",
      primaryDomain: "softmotors.vercel.app",
      theme: {},
      featureFlags: { financing: true, tradeIn: true, savedSearch: true },
    })
    .returning();

  const base = Date.now();
  const unitRows = await db
    .insert(units)
    .values([
      {
        tenantId: tenant.id,
        name: "softmotors Maringá",
        slug: "maringa",
        addressLine: "Av. Colombo, 5000 — Zona 7",
        city: "Maringá",
        state: "PR",
        zip: "87020-000",
        phone: "(44) 3000-0000",
        whatsapp: "5544990000001",
        hours: { "Seg-Sáb": "08:00 – 19:00" },
        createdAt: new Date(base - 3 * 864e5),
      },
      {
        tenantId: tenant.id,
        name: "softmotors Sarandi",
        slug: "sarandi",
        addressLine: "Rua Palmares, 900 — Centro",
        city: "Sarandi",
        state: "PR",
        zip: "87111-000",
        phone: "(44) 3000-0002",
        whatsapp: "5544990000002",
        hours: { "Seg-Sáb": "08:00 – 18:00" },
        createdAt: new Date(base - 2 * 864e5),
      },
      {
        tenantId: tenant.id,
        name: "softmotors Cianorte",
        slug: "cianorte",
        addressLine: "Av. América, 320 — Zona 1",
        city: "Cianorte",
        state: "PR",
        zip: "87200-000",
        phone: "(44) 3000-0003",
        whatsapp: "5544990000003",
        hours: { "Seg-Sex": "08:00 – 18:00" },
        createdAt: new Date(base - 1 * 864e5),
      },
    ])
    .returning();

  const now = base;
  const values = DATA.map((d, i) => {
    const id = crypto.randomUUID();
    return {
      id,
      tenantId: tenant.id,
      unitId: unitRows[d.unit].id,
      slug: vehicleSlug({
        brand: d.brand,
        model: d.model,
        version: d.version,
        modelYear: d.modelYear,
        id,
      }),
      externalId: `DEMO-${1000 + i}`,
      condition: "used" as const,
      status: "published" as const,
      brand: d.brand,
      model: d.model,
      version: d.version,
      modelYear: d.modelYear,
      productionYear: d.productionYear,
      mileageKm: d.mileageKm,
      transmission: d.transmission,
      fuel: d.fuel,
      bodyType: d.bodyType,
      color: d.color,
      doors: d.bodyType === "Picape" ? 4 : 4,
      plateEnd: d.plateEnd,
      price: d.price.toFixed(2),
      fipeCode: `001${100 + i}-6`,
      fipePrice: d.fipePrice.toFixed(2),
      features: FEATURES.slice(0, d.featureCount),
      photos: [],
      singleOwner: d.singleOwner,
      acceptsTrade: true,
      description: `${d.brand} ${d.model} ${d.version}. Laudo cautelar aprovado, revisões em concessionária${d.singleOwner ? ", único dono" : ""}. Pneus em bom estado, documentação em dia, IPVA pago. Aceitamos seu usado na troca e financiamos em até 60x com aprovação na hora.`,
      lockedFields: [],
      syncedAt: new Date(now - i * 3600_000),
      // ~2.2 dias entre um cadastro e outro: só os primeiros ficam "recém-chegados"
      createdAt: new Date(now - i * 2.2 * 864e5),
      updatedAt: new Date(now - i * 3600_000),
    };
  });

  await db.insert(vehicles).values(values);

  console.log(`  ${unitRows.length} unidades, ${values.length} veículos publicados`);
  console.log("Pronto.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
