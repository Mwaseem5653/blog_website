import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

/**
 * components/CategoryCard.tsx
 * Props: category object from Sanity (slug, title, image, description)
 */

export default function CategoryCard({ category }: { category: any }) {
  return (
    <Link href={`/category/${category.slug.current}`} className="block bg-white rounded-xl shadow p-4 hover:shadow-xl transition">
      {category.image && (
        // @ts-ignore
        <img src={urlFor(category.image).width(1200).url()} alt={category.title} className="w-full h-44 object-cover rounded-md" />
      )}
      <h3 className="mt-3 font-semibold text-lg">{category.title}</h3>
      <p className="mt-1 text-sm text-gray-600">{category.description || `${category.title} tips & remedies`}</p>
    </Link>
  );
}
