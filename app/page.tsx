'use client'; 

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { allPostsQuery } from '@/sanity/lib/query';
import PostCard from '@/components/postcard';
import { Post } from '@/types';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [visibleCount, setVisibleCount] = useState(15);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const data = await client.fetch(allPostsQuery);
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 15);
  };

  const visiblePosts = posts.slice(0, visibleCount);

  return (
            <div className="px-2 md:px-0">
              {loading ? (
                <p className="text-center text-base md:text-lg">Loading posts...</p>
              ) : (
                <>
                  <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {visiblePosts.map((post) => (
                      <PostCard 
                              key={post.slug?.current || post._id} 
                              post={post}
                            />
                                ))}
                  </section>
          {visibleCount < posts.length ? (
            <div className="mt-6 text-center">
              <button
                onClick={loadMore}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Load More
              </button>
            </div>
          ) : (
            <p className="mt-6 text-center text-gray-500 text-base md:text-lg">No more posts available</p>
          )}
        </>
      )}
    </div>
  );
}
