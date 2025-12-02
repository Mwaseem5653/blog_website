import { PortableText, PortableTextComponents, PortableTextBlock } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url";

interface ImageValue {
  asset: {
    _ref?: string;
    _id?: string;
    metadata?: {
      dimensions?: { width: number; height: number };
    };
  };
  alt?: string;
}

const components: Partial<PortableTextComponents> = {
  types: {
    image: ({ value }: { value: ImageValue }) => {
      if (!value?.asset) return null;

      const width = value.asset.metadata?.dimensions?.width || 800;
      const height = value.asset.metadata?.dimensions?.height || 600;

      const blurUrl = urlFor(value).width(20).blur(10).url();

      return (
        <Image
          src={urlFor(value).width(1200).fit("max").auto("format").url()}
          alt={value.alt || ""}
          width={width}
          height={height}
          placeholder="blur"
          blurDataURL={blurUrl}
          className="w-full h-auto rounded-lg my-6"
          sizes="(max-width: 800px) 100vw, 800px"
        />
      );
    },
  },

  block: {
    h2: ({ children }) => <h2 className="text-2xl font-semibold mt-6">{children}</h2>,

    normal: ({ children }) => (
      <div className="mt-3 text-gray-800 leading-7 dark:text-gray-200">{children}</div>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-400 dark:border-gray-600 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 mt-3">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-6 mt-3">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

export default function PostContent({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
