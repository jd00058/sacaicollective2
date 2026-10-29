import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sacaicollective.com'),
  title: "AI Collective Sacramento | Shape the future of AI",
  description: "Join a community of builders, researchers, and enthusiasts. We are democratizing AI knowledge, fostering collaboration, and building a thriving local ecosystem for innovation in Sacramento.",
  openGraph: {
    title: "AI Collective Sacramento",
    description: "Shape the future of AI in Sacramento and surrounding areas. Join the collective.",
    url: "https://sacaicollective.com",
    siteName: "AI Collective Sacramento",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Collective Sacramento",
    description: "Shape the future of AI in Sacramento and surrounding areas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* GoHighLevel visitor tracking, carried over from the live site's last manual deploy. */}
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
