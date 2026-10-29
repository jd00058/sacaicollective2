import type { Metadata, Viewport } from "next";
import { Boldonse, Geist, Permanent_Marker } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "@/components/Providers";

const boldonse = Boldonse({
  variable: "--font-boldonse",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const marker = Permanent_Marker({
  variable: "--font-permanent-marker",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const description =
  "AI is moving too fast to figure out alone. AI Collective Sacramento is a local community where curious people learn, build and connect around AI. Workshops, builder meetups and talks across the Sacramento region.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sacaicollective.com"),
  title: "AI Collective Sacramento | Learn, build and connect around AI",
  description,
  openGraph: {
    title: "AI Collective Sacramento",
    description: "AI is moving fast. Don't figure it out alone. Join Sacramento's community for learning, building and connecting around AI.",
    url: "https://sacaicollective.com",
    siteName: "AI Collective Sacramento",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Collective Sacramento",
    description: "AI is moving fast. Don't figure it out alone.",
  },
};

export const viewport: Viewport = {
  themeColor: "#07060C",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${boldonse.variable} ${geist.variable} ${marker.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint so scroll reveals never hide content without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Providers>{children}</Providers>
        <div className="grain" aria-hidden="true" />
        {/* GoHighLevel visitor tracking, carried over from the previous live site. */}
        <Script
          id="ghl-external-tracking"
          src="https://link.msgsndr.com/js/external-tracking.js"
          strategy="afterInteractive"
          data-tracking-id="tk_75b9bc7b69534cbd9eecd93d444113e6"
        />
      </body>
    </html>
  );
}
