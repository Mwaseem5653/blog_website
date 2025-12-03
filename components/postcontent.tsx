import { PortableText, PortableTextComponents, PortableTextBlock } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";


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
    h2: ({ children }) => {
      debugger; // <--- ADDED DEBUGGER
      return <h2 className="text-2xl font-semibold mt-6">{children}</h2>;
    },"text-2xl font-semibold mt-6">{children}</h2>,

    normal: ({ children }) => {
      debugger; // <--- ADDED DEBUGGER
      return <div className="mt-3 text-gray-800 leading-7 dark:text-gray-200">{children}</div>;
    },

    blockquote: ({ children }) => {
      debugger; // <--- ADDED DEBUGGER
      return (
        <blockquote className="border-l-4 border-gray-400 dark:border-gray-600 pl-4 italic my-4">
          {children}
        </blockquote>
      );
    },
    // Add handler for preformatted text (code blocks)
    pre: ({ children }) => {
      debugger; // <--- ADDED DEBUGGER
      return <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto dark:bg-gray-800 dark:text-gray-200">{children}</pre>;
    },
    unknown: ({ children }) => {
      debugger; // <--- ADDED DEBUGGER
      const isHtmlString = (content: React.ReactNode): content is string =>
        typeof content === 'string' && /<[a-z][\s\S]*>/i.test(content);

      if (Array.isArray(children)) {
        const htmlChildren = children.filter(isHtmlString);
        if (htmlChildren.length > 0) {
          const htmlString = htmlChildren.join('');
          console.error("PortableText: Unhandled raw HTML encountered in 'unknown' block. Rendering with dangerouslySetInnerHTML. Problematic content:", htmlString);
          return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
        }
      } else if (isHtmlString(children)) {
        console.error("PortableText: Unhandled raw HTML encountered in 'unknown' block. Rendering with dangerouslySetInnerHTML. Problematic content:", children);
        return <div dangerouslySetInnerHTML={{ __html: children }} />;
      }
      return <div>{children}</div>; // Render other unknown content as a div
    },
    hardBreak: () => <br />, // Explicitly render hard breaks
  },
  marks: {
    code: ({ children }) => {
      debugger; // <--- ADDED DEBUGGER
      return <code className="bg-gray-100 px-1 py-0.5 rounded text-sm dark:bg-gray-700 dark:text-gray-300">{children}</code>;
    },
  },
  list: {
    bullet: ({ children }) => {
      debugger; // <--- ADDED DEBUGGER
      return <ul className="list-disc ml-6 mt-3">{children}</ul>;
    },
    number: ({ children }) => {
      debugger; // <--- ADDED DEBUGGER
      return <ol className="list-decimal ml-6 mt-3">{children}</ol>;
    },
  },
  listItem: {
    bullet: ({ children }) => {
      debugger; // <--- ADDED DEBUGGER
      return <li>{children}</li>;
    },
    number: ({ children }) => {
      debugger; // <--- ADDED DEBUGGER
      return <li>{children}</li>;
    },
  },
};

export default function PostContent({ value }: { value: PortableTextBlock[] }) {
  debugger; // <--- ADDED DEBUGGER
  return <PortableText value={value} components={components} />;
}
