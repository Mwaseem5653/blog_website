import PostList from "@/components/postlist"; // Assuming you have a PostList component
import Container from "@/components/container"; // Assuming you have a Container component
import Link from "next/link";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams; // Await the promise
  const query = resolvedSearchParams.q; // Access q from the resolved object
  let posts = [];

  if (query) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/search?q=${encodeURIComponent(query)}`, { cache: 'no-store' });
    if (response.ok) {
      posts = await response.json();
    }
  }

  return (
    <Container>
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl text-center mb-10">
        Search Results for &quot;{query}&quot;
      </h1>

      {query && posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p className="text-xl mb-4">
            {query
              ? `No posts found matching "${query}".`
              : "Please enter a search term."}
          </p>
          <Link href="/" className="text-blue-600 hover:underline">
            Go back to homepage
          </Link>
        </div>
      )}
    </Container>
  );
}
