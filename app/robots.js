export default function robots() {
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
