import PostContent from "./postcontent";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Post } from "@/types";
import AdUnit from "./addunits"; // Import AdUnit

export default function PostPageLayout({ post }: { post: Post }) {
  console.log("Post data in layout:", post);
  return (
    <div className="max-w-10xl mx-auto">
      <article className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight dark:text-white">
          {post.title}
        </h1>

        <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          By {post.author?.name} •{" "}
          {post.publishedAt ? new Date(post.publishedAt).toDateString() : ""}
        </div>

        {/* Main Image */}
        {post.mainImage && (
          <Image
            src={urlFor(post.mainImage).width(1600).url()}
            alt={post.title}
            width={1600}
            height={900}
            className="w-full aspect-video rounded-lg shadow-lg mt-8 object-cover"
            priority // Main image is high priority
          />
        )}

        {/* Main Content */}
        {post.content && (
          <div className="prose dark:prose-invert max-w-none mt-8 dark:text-white">
            <PostContent value={post.content} />
          </div>
        )}

        {/* Ad Unit after Main Content */}
        <div className="my-8">
          <AdUnit slot="9682322008" />
        </div>

        {/* Extra Image 1 and Content 1 */}
        {post.extraImage1 && (
          <Image
            src={urlFor(post.extraImage1).width(1600).url()}
            alt={post.title} // Consider a more specific alt text if available
            width={1600}
            height={900}
            className="w-full aspect-video rounded-lg shadow-lg mt-8 object-cover"
          />
        )}
        {post.extraContent1 && (
          <div className="prose dark:prose-invert max-w-none mt-8 dark:text-white">
            <PostContent value={post.extraContent1} />
          </div>
        )}

        {/* Extra Image 2 and Content 2 */}
        {post.extraImage2 && (
          <Image
            src={urlFor(post.extraImage2).width(1600).url()}
            alt={post.title} // Consider a more specific alt text if available
            width={1600}
            height={900}
            className="w-full aspect-video rounded-lg shadow-lg mt-8 object-cover"
          />
        )}
        {post.extraContent2 && (
          <div className="prose dark:prose-invert max-w-none mt-8 dark:text-white">
            <PostContent value={post.extraContent2} />
          </div>
        )}

        {/* Ad Unit after second block */}
        <div className="my-8">
          <AdUnit slot="9682322008" />
        </div>
        
        {/* Extra Image 3 and Content 3 */}
        {post.extraImage3 && (
          <Image
            src={urlFor(post.extraImage3).width(1600).url()}
            alt={post.title} // Consider a more specific alt text if available
            width={1600}
            height={900}
            className="w-full aspect-video rounded-lg shadow-lg mt-8 object-cover"
          />
        )}
        {post.extraContent3 && (
          <div className="prose dark:prose-invert max-w-none mt-8 dark:text-white">
            <PostContent value={post.extraContent3} />
          </div>
        )}
      </article>
    </div>
  );
}