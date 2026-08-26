import type { Metadata } from "next";
import "./globals.css";
import "./styles/reader-foundation.css";

export const metadata: Metadata = {
  title: "Do Zero ao CVI | Embarpet",
  description: "Apostila digital para profissionais que atuam com transporte internacional pet.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" }
    ],
    shortcut: ["/favicon.svg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
