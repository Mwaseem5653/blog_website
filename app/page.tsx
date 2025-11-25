// app/page.tsx
import { client } from '@/sanity/lib/client';
import { allPostsQuery } from '@/sanity/lib/query';
import PostCard from '@/components/postcard';
import { Post } from '@/types';

export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: "Glow Guide Blogs – Beauty Tips, Skin Care, Hair Care & Home Remedies",
    description:
      "Glow Guide Blogs brings you expert skincare tips, acne solutions, hair care guides, and natural beauty remedies. Simple, effective, and easy-to-follow beauty advice.",
    openGraph: {
      title: "Glow Guide Blogs – Beauty, Skin Care & Natural Remedies",
      description:
        "Explore beauty tips, skincare routines, acne solutions, and hair care guides. Updated daily with natural and effective remedies.",
      url: "https://glowguideblogs.vercel.app",
      type: "website",
      images: [
        { url: "/og-image.jpg", width: 1200, height: 630, alt: "Glow Guide Blogs" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Glow Guide Blogs – Beauty Tips & Skin Care",
      description:
        "Daily updated beauty tips, skincare remedies, acne treatments, and hair care guides.",
    },
    alternates: { canonical: "https://glowguideblogs.vercel.app" },
  };
}

export default async function Home() {
  const posts: Post[] = await client.fetch(allPostsQuery);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Glow Guide Blogs</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug?.current || post._id} post={post} />
        ))}
      </section>

      {/* JSON-LD for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "name": "Glow Guide Blogs",
                "url": "https://glowguideblogs.vercel.app",
                "logo": "https://glowguideblogs.vercel.app/favicon.ico",
                "sameAs": [
                  "https://twitter.com/your-twitter-handle",
                  "https://instagram.com/your-instagram-handle",
                  "https://facebook.com/your-facebook-handle"
                ]
              },
              {
                "@type": "WebSite",
                "name": "Glow Guide Blogs",
                "url": "https://glowguideblogs.vercel.app",
                "publisher": {
                  "@type": "Organization",
                  "name": "Glow Guide Blogs"
                }
              }
            ]
          }),
        }}
      />
    </div>
  );
}
