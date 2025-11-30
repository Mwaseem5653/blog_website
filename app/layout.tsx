// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://glowguideblogs.vercel.app"),
  title: {
    default: "Glow Guide Blogs",
    template: "%s | Glow Guide Blogs",
  },
  description: "Beauty, skincare, health & lifestyle blogs to glow every day.",
  openGraph: {
    type: "website",
    title: "Glow Guide Blogs",
    url: "https://glowguideblogs.vercel.app",
    images: ["/default-og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glow Guide Blogs",
    images: ["/default-og.jpg"],
  },
  verification: {
    google: "T_y1sOLcDskGKX-ko7R8pnxqye2NuaB4ROmB5oTGEes",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* DO NOT PUT ANY SCRIPT TAGS HERE */}

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <link rel="alternate" type="application/rss+xml" title="Glow Guide Blogs RSS Feed" href="/rss.xml" />
        <Header />

        <main className="pt-8 pb-16 container mx-auto px-2 sm:px-3 lg:px-4">
          {children}
          <Analytics />
        </main>

        <Footer />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5961112055480826"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
