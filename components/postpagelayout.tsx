import PostContent from "./postcontent";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Post } from "@/types";
import AdUnit from "./addunits"; // Import AdUnit
import Breadcrumbs from "./breadcrumbs"; // Import Breadcrumbs

export default function PostPageLayout({ post }: { post: Post }) {
  console.log("Post data in layout:", post);
  return (
    <div className="max-w-10xl mx-auto">
      <article className="prose dark:prose-invert max-w-none">
        <div className="hidden">
          <Breadcrumbs post={post} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight dark:text-white">
          {post.title}
        </h1>



        {/* Main Image */}
        {post.mainImage && (
          <Image
            src={urlFor(post.mainImage).width(1600).url()}
            alt={post.title}
            width={1600}
            height={900}
            className="w-full aspect-video rounded-lg shadow-lg my-8 object-cover"
            priority // Main image is high priority
          />
        )}

        {/* Main Content */}
        {post.content && (
          <div className="prose dark:prose-invert max-w-none dark:text-white ">
            <PostContent value={post.content} />
          </div>
        )}

        {/* Ad Unit after Main Content */}
        

        {/* Extra Image 1 and Content 1 */}
        {post.extraImage1 && (
          <Image
            src={urlFor(post.extraImage1).width(1600).url()}
            alt={`${post.title} extra image 1`}
            width={1600}
            height={900}
            className="w-full aspect-video rounded-lg shadow-lg object-cover my-8 "
            sizes="(max-width: 800px) 100vw, 800px"
          />
        )}
        {post.extraContent1 && (
          <div className="prose dark:prose-invert max-w-none dark:text-white ">
            <PostContent value={post.extraContent1} />
          </div>
        )}

        {/* Extra Image 2 and Content 2 */}
        {post.extraImage2 && (
          <Image
            src={urlFor(post.extraImage2).width(1600).url()}
            alt={`${post.title} extra image 2`}
            width={1600}
            height={900}
            className="w-full aspect-video rounded-lg shadow-lg object-cover my-8"
            sizes="(max-width: 800px) 100vw, 800px"
          />
        )}
        {post.extraContent2 && (
          <div className="prose dark:prose-invert max-w-none dark:text-white ">
            <PostContent value={post.extraContent2} />
          </div>
        )}

        {/* Ad Unit after second block (conditional) */}
       
        
        {/* Extra Image 3 and Content 3 */}
        {post.extraImage3 && (
          <Image
            src={urlFor(post.extraImage3).width(1600).url()}
            alt={`${post.title} extra image 3`}
            width={1600}
            height={900}
            className="w-full aspect-video rounded-lg shadow-lg object-cover my-8"
            sizes="(max-width: 800px) 100vw, 800px"
          />
        )}
        {post.extraContent3 && (
          <div className="prose dark:prose-invert max-w-none dark:text-white ">
            <PostContent value={post.extraContent3} />
          </div>
        )}
        <div className="my-4">
          <AdUnit slot="9682322008" key={`${post.slug?.current}-adunit-1`} />
        </div>
      </article>
    </div>
  );
}