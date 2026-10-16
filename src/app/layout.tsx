import type { Metadata } from "next";
import { JetBrains_Mono, Outfit, Syne } from "next/font/google";
import { CommandPaletteProvider } from "@/components/command-palette";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/content/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const title = "Juliusggr — Desarrollo web y aplicaciones de escritorio";
const description = `${site.brand} — ${site.headline}`;

export const metadata: Metadata = {
  title,
  description,
  applicationName: site.brand,
  authors: [{ name: site.name, url: site.socials.github }],
  openGraph: {
    title,
    description: site.headline,
    locale: "es_ES",
    type: "website",
    siteName: site.brand,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.headline,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${outfit.variable} ${syne.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <CommandPaletteProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </CommandPaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
