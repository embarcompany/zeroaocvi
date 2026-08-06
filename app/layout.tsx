import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Do Zero ao CVI | Embarpet",
  description: "Apostila digital para profissionais que atuam com transporte internacional pet.",
  openGraph: {
    title: "Do Zero ao CVI | Embarpet",
    description: "Apostila digital para profissionais que atuam com transporte internacional pet.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
