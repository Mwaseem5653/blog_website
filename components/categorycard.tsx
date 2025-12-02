import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Category } from "@/types";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/category/${category.slug.current}`} className="block bg-white rounded-xl shadow p-4 hover:shadow-xl transition">
      {category.image && (
        <Image
          src={urlFor(category.image).width(1200).url()}
          alt={category.title}
          width={1200}
          height={800}
          className="w-full h-44 object-cover rounded-md"
        />
      )}
      <h3 className="mt-3 font-semibold text-lg">{category.title}</h3>
      <div className="mt-1 text-sm text-gray-600">{category.description || `${category.title} tips & remedies`}</div>
    </Link>
  );
}
