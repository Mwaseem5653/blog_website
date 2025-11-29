// components/breadcrumbs.tsx
'use client';

import Link from 'next/link';
import { Post } from '@/types'; // Assuming Post type has category and title

const categoryMap: { [key: string]: string } = {
  "skin-care": "Skin Care",
  "hair-care": "Hair Care",
  "acne": "Acne",
  "whitening": "Whitening",
  "health-fitness": "Health & Fitness",
};

interface BreadcrumbsProps {
  post: Pick<Post, 'title' | 'category' | 'slug'>;
}

export default function Breadcrumbs({ post }: BreadcrumbsProps) {
  if (!post || !post.category || !post.title) {
    return null;
  }

  const categoryTitle = categoryMap[post.category] || post.category;
  const baseUrl = "https://glowguideblogs.vercel.app";

  const breadcrumbItems = [
    {
      position: 1,
      name: "Home",
      item: baseUrl,
    },
    {
      position: 2,
      name: categoryTitle,
      item: `${baseUrl}/category/${post.category}`,
    },
    {
      position: 3,
      name: post.title,
      item: `${baseUrl}/post/${post.slug?.current || ''}`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map(item => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "item": item.item,
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        <ol className="list-none p-0 inline-flex">
          {breadcrumbItems.map((item, index) => (
            <li key={item.position} className="flex items-center">
              <Link href={item.item} className="hover:underline">
                {item.name}
              </Link>
              {index < breadcrumbItems.length - 1 && (
                <span className="mx-2">/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
