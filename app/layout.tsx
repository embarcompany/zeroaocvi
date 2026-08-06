import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Do Zero ao CVI | Embarpet",
  description: "Apostila digital para profissionais que atuam com transporte internacional pet.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
