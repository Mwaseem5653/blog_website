import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*", // Allow all bots
        allow: "/",      // Allow crawling of all public pages
        disallow: ["/studio"], // Block admin/studio section
      },
    ],
    sitemap: "https://glowguideblogs.vercel.app/sitemap.xml", // Sitemap URL
    host: "https://glowguideblogs.vercel.app",               // Site host
  };
}
