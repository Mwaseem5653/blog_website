import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://glowguideblogs.vercel.app"), // ✅ FIXED WARNING

  title: {
    default: "Glow Guide Blogs",
    template: "%s | Glow Guide Blogs",
  },

  description: "Beauty, skincare, health & lifestyle blogs to glow every day.",
  openGraph: {
    type: "website",
    title: "Glow Guide Blogs",
    description: "Explore beauty and skincare content to help you glow every day.",
    url: "https://glowguideblogs.vercel.app",
    images: ["/default-og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glow Guide Blogs",
    description: "Skincare & beauty blogs crafted for you.",
    images: ["/default-og.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="pt-8 pb-16 container mx-auto px-2 sm:px-3 lg:px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
