import { Header } from "@/components/store/header";
import { Footer } from "@/components/store/footer";
import { getTenant } from "@/lib/tenant";
import { tenantThemeCss } from "@/lib/theme";

/** Revalida o storefront a cada 5 min (estoque muda com a sincronização). */
export const revalidate = 300;

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = await getTenant();
  const themeCss = tenantThemeCss(tenant);

  return (
    <>
      {themeCss && <style dangerouslySetInnerHTML={{ __html: themeCss }} />}
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
