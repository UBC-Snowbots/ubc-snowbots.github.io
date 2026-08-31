import type { Metadata, Viewport } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/content";
import "./globals.css";

/**
 * Type system:
 *   Archivo        — display. A grotesque with real weight at large sizes; the
 *                    closest open counterpart to the condensed poster type on
 *                    the recruitment flyer.
 *   Inter          — body. Neutral, high legibility at small sizes.
 *   JetBrains Mono — micro-labels and eyebrows. Supplies the "engineering
 *                    telemetry" register that Anduril gets from its uppercase
 *                    tracked labels.
 *
 * next/font self-hosts these at build time, so the static export makes zero
 * requests to Google and there is no font-swap flash.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: `${SITE.blurb} A student team at the University of British Columbia competing in the University Rover Challenge and the Canadian International Rover Challenge.`,
  keywords: [
    "UBC Rover",
    "University Rover Challenge",
    "URC",
    "CIRC",
    "Mars rover",
    "student robotics",
    "University of British Columbia",
    "autonomy",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.blurb,
    url: SITE.url,
    images: [{ url: "/media/rover-mog.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.blurb,
  },
};

export const viewport: Viewport = {
  themeColor: "#070d1b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        {/* If scripting is unavailable the IntersectionObserver in <Reveal>
            never runs, so neutralise the reveal transform and show everything.
            Without this the page would render blank for no-JS visitors. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: "[data-reveal]{opacity:1 !important;transform:none !important}",
            }}
          />
        </noscript>
      </head>
      <body className="bg-navy-950 flex min-h-full flex-col">
        <a
          href="#main"
          className="focus:text-navy-950 sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-amber-500 focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-widest focus:uppercase"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
