import type { Metadata } from "next";
import { Archivo, Public_Sans } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "softmotors — seminovos com procedência em Maringá e região",
    template: "%s | softmotors",
  },
  description:
    "Seminovos com procedência selecionada. Compare, simule o financiamento, avalie seu usado na troca e fale direto com a loja.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${archivo.variable} ${publicSans.variable}`}>{children}</body>
    </html>
  );
}
