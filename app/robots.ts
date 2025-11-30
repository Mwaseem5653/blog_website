import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio"],
      },
    ],
    sitemap: "https://glowguideblogs.vercel.app/sitemap.xml",
    host: "https://glowguideblogs.vercel.app",
  };
}
