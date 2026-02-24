import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
      </body>
    </html>
  );
}
