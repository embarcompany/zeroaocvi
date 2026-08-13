import type { Metadata } from "next";
import "./globals.css";
import "./styles/reader-foundation.css";

export const metadata: Metadata = {
  title: "Do Zero ao CVI | Embarpet",
  description: "Apostila digital para profissionais que atuam com transporte internacional pet.",
  icons: {
    icon: [{ url: "https://www.embarpet.com.br/img/favicon.ico", type: "image/x-icon" }],
    shortcut: ["https://www.embarpet.com.br/img/favicon.ico"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
