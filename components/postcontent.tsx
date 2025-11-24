import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

/**
 * components/PostContent.tsx
 * value: post.body (portable text array)
 */

const components = {
  types: {
    image: ({ value }: any) => {
      // @ts-ignore
      const src = urlFor(value).width(1200).url();
      return <img src={src} alt={value.alt || "image"} className="w-full rounded" />;
    },
  },
  block: {
    h2: ({ children }: any) => <h2 className="text-2xl font-semibold mt-6">{children}</h2>,
    normal: ({ children }: any) => <p className="mt-3 text-gray-800 leading-7 dark:text-gray-200">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc ml-6 mt-3">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal ml-6 mt-3">{children}</ol>,
  },
};

export default function PostContent({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}
