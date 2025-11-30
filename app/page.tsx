// app/page.tsx
import { client } from '@/sanity/lib/client';
import { allPostsQuery } from '@/sanity/lib/query';
import PostCard from '@/components/postcard';
import { Post } from '@/types';
import AdUnit from '@/components/addunits'; // Import AdUnit

export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: "Glow Guide Blogs – Beauty Tips, Skin Care, Hair Care & Home Remedies",
    description:
      "Glow Guide Blogs brings you expert skincare tips, acne solutions, hair care guides, and natural beauty remedies. Simple, effective, and easy-to-follow beauty advice.",
    keywords: "beauty tips, skin care, hair care, home remedies, natural beauty, glow guide, acne solutions, beauty blogs",
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
      images: ["https://glowguideblogs.vercel.app/og-image.jpg"], // Ensure Twitter image is present
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

      {/* Ad Unit */}
      <div className="mt-8">
        <AdUnit slot="9682322008" key="homepage-adunit" />
      </div>

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
                              "https://twitter.com/GlowGuideBlogs",
                              "https://instagram.com/GlowGuideBlogs",
                              "https://facebook.com/GlowGuideBlogs"
                            ]
                          },
                          {
                            "@type": "WebSite",
                            "name": "Glow Guide Blogs",
                            "url": "https://glowguideblogs.vercel.app",
                            "publisher": {
                              "@type": "Organization",
                              "name": "Glow Guide Blogs"
                            },
                            "potentialAction": {
                              "@type": "SearchAction",
                              "target": "https://glowguideblogs.vercel.app/search?q={search_term_string}",
                              "query-input": "required name=search_term_string"
                            }
                          },
                          {
                            "@type": "CollectionPage",
                            "name": "Glow Guide Blogs Homepage - Latest Articles",
                            "description": "Discover the latest beauty tips, skincare routines, and hair care guides from Glow Guide Blogs.",
                            "url": "https://glowguideblogs.vercel.app",
                            "mainEntityOfPage": "https://glowguideblogs.vercel.app",
                            "publisher": {
                              "@type": "Organization",
                              "name": "Glow Guide Blogs"
                            },
                            "about": {
                              "@type": "CreativeWorkSeries",
                              "name": "Blog Posts from Glow Guide Blogs"
                            },
                            "hasPart": posts.map((post) => ({
                              "@type": "BlogPosting",
                              "headline": post.title,
                              "url": `https://glowguideblogs.vercel.app/post/${post.slug.current}`,
                              "image": post.mainImage
                                ? `https://glowguideblogs.vercel.app/_next/image?url=${encodeURIComponent(urlFor(post.mainImage).url())}&w=1200&q=75`
                                : "https://glowguideblogs.vercel.app/default-og.jpg",
                              "author": { "@type": "Person", "name": post.author?.name || "Glow Guide Blogs" },
                              "datePublished": post.publishedAt,
                              "dateModified": post._updatedAt,
                              "description": post.excerpt,
                              "mainEntityOfPage": `https://glowguideblogs.vercel.app/post/${post.slug.current}`
                            })),
                            "itemListElement": posts.map((post, index) => ({
                              "@type": "ListItem",
                              "position": index + 1,
                              "item": {
                                "@type": "BlogPosting",
                                "headline": post.title,
                                "url": `https://glowguideblogs.vercel.app/post/${post.slug.current}`
                              }
                            }))
                          }
                        ]
          }),
        }}
      />
    </div>
  );
}
