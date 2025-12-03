// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // Import the Script component
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
  description: "Beauty, skincare,haircare ,health & fitness blogs to glow every day.",
  openGraph: {
    type: "website",
    title: "Glow Guide Blogs",
    url: "https://glowguideblogs.vercel.app",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glow Guide Blogs",
    images: ["/og-image.jpg"],
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Glow Guide Blogs",
    "url": "https://glowguideblogs.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://glowguideblogs.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="alternate" type="application/rss+xml" title="Glow Guide Blogs RSS Feed" href="/rss.xml" />
        
        
          <Header />

          <main className="pt-8 pb-16 container mx-auto px-2 sm:px-3 lg:px-4">
            {children}
            <Analytics />
          </main>

          <Footer />
          
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5961112055480826"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
    
      </body>
    </html>
  );
}