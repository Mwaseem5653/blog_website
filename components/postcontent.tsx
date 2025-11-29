import { PortableText, PortableTextComponents, PortableTextBlock, PortableTextComponentProps } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface ImageValue {
  asset: SanityImageSource;
  alt?: string;
}

// Components object with proper typing
const components: Partial<PortableTextComponents> = {
  types: {
    image: ({ value }: PortableTextComponentProps<ImageValue & { asset: { metadata: { dimensions: { width: number, height: number } } } }>) => {
      if (!value?.asset) return null;

      const { width, height } = value.asset.metadata.dimensions;
      const blurUrl = urlFor(value).width(20).blur(10).url();

      return (
        <Image
          src={urlFor(value).width(1200).fit('max').auto('format').url()}
          alt={value.alt || ''}
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
    h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h2 className="text-2xl font-semibold mt-6">{children}</h2>
    ),
    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="mt-3 text-gray-800 leading-7 dark:text-gray-200">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ul className="list-disc ml-6 mt-3">{children}</ul>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ol className="list-decimal ml-6 mt-3">{children}</ol>
    ),
  },
};

export default function PostContent({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
