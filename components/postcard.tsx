"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Post } from "@/types";
import PostContent from "./postcontent";

export default function PostCard({ post }: { post: Post }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 mt-3 md:mt-0 rounded-xl shadow overflow-hidden flex flex-col"
    >
      {post.mainImage && (
        <Image
          src={urlFor(post.mainImage).width(800).url()}
          alt={post.title}
          width={800}
          height={450}
          className="w-full aspect-video object-cover border-b border-gray-200 dark:border-gray-700"
        />
      )}

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {post.category && (
            <span className="text-xs font-semibold uppercase text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {post.category.replace(/-/g, " ")}
            </span>
          )}
          <h3 className="font-extrabold text-lg md:text-xl mt-2 leading-tight text-gray-900 dark:text-white">
            {post.title}
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3 prose dark:prose-invert max-w-none">
            <PostContent value={post.firstContentBlock || []} />
          </div>
        </div>

        {/* Bottom-right button */}
        <div className="flex justify-end mt-4">
          <Link
            href={`/post/${post.slug.current}`}
            className="flex items-center text-blue-700 dark:text-blue-400 font-semibold text-sm hover:underline"
          >
            View Post
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
