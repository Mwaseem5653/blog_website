"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/24/outline";
import { Bars3Icon as MenuIcon, XMarkIcon as XIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "./themtoggle";
import FacebookIcon from "./icons/facebook";
import TwitterIcon from "./icons/twitter";
import InstagramIcon from "./icons/instagram";
import CircleIcon from "./circle-icon";
import { client } from '@/sanity/lib/client'; // Import Sanity client

const TAB_ITEMS = [
  { title: "All Posts", slug: "" },
  { title: "Skin Care", slug: "skin-care" },
  { title: "Hair Care", slug: "hair-care" },
  { title: "Acne", slug: "acne" },
  { title: "Whitening", slug: "whitening" },
  { title: "Bridal", slug: "bridal" },
];

const SOCIAL_LINKS = [
    { icon: FacebookIcon, name: "Facebook", url: "https://www.facebook.com" },
    { icon: TwitterIcon, name: "Twitter", url: "https://www.twitter.com" },
    { icon: InstagramIcon, name: "Instagram", url: "https://www.instagram.com" },
  ];
  
interface SearchResult {
  title: string;
  slug: string;
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter(); // Initialize useRouter
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 2) { // Only search if query is at least 3 characters
        setLoadingSearch(true);
        const query = `*[_type == "post" && title match "${searchQuery}*"][0...5]{
          title,
          "slug": slug.current
        }`;
        const results = await client.fetch(query);
        setSearchResults(results);
        setLoadingSearch(false);
      } else {
        setSearchResults([]);
      }
    }, 300); // Debounce for 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleResultClick = (slug: string) => {
    router.push(`/post/${slug}`);
    setShowSearch(false); // Close search bar after navigation
    setSearchQuery(""); // Clear search query
    setSearchResults([]); // Clear search results
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b dark:bg-gray-900/90 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-blue-700 dark:text-blue-400">
            <CircleIcon size="w-6 h-6" outerColor="bg-blue-700" innerColor="bg-blue-300" />
            GlowGuide
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {TAB_ITEMS.map((t) => {
              const href = t.slug ? `/category/${t.slug}` : "/";
              const active = pathname === href;
              return (
                <Link
                  key={t.slug}
                  href={href}
                  className={clsx(
                    "relative px-2 py-1 font-medium transition-colors",
                    active
                      ? "text-blue-700"
                      : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                  )}
                >
                  {t.title}
                  {active && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 right-0 -bottom-2 h-0.5 bg-blue-700 rounded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.18 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <AnimatePresence>
              {showSearch ? (
                <motion.div
                  key="desktop-search-input"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
                    onBlur={() => {
                      setTimeout(() => setShowSearch(false), 100);
                    }}
                    autoFocus
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  {loadingSearch && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">...</span>}
                  {searchResults.length > 0 ? (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {searchResults.map((post) => (
                        <div
                          key={post.slug}
                          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          onMouseDown={() => handleResultClick(post.slug)}
                        >
                          {post.title}
                        </div>
                      ))}
                    </div>
                  ) : searchQuery.length > 2 && !loadingSearch && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <p className="px-4 py-2 text-gray-500 dark:text-gray-400">No record found</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <button onClick={() => setShowSearch(true)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                  <SearchIcon className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </AnimatePresence>
            
            <ThemeToggle />
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-500 transition-colors"
                >
                  <link.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {open ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t bg-white dark:bg-gray-900 dark:border-gray-800"
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-800 dark:text-gray-200"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {loadingSearch && <span className="block text-center py-2 text-gray-400">Searching...</span>}
              {searchResults.length > 0 ? (
                <div className="mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {searchResults.map((post) => (
                    <div
                      key={post.slug}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleResultClick(post.slug)}
                    >
                      {post.title}
                    </div>
                  ))}
                </div>
              ) : searchQuery.length > 2 && !loadingSearch && (
                <div className="mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <p className="px-4 py-2 text-gray-500 dark:text-gray-400">No record found</p>
                </div>
              )}
            </div>
            <div className="container mx-auto px-4 py-3 grid grid-cols-2 gap-2">
              {TAB_ITEMS.map((t) => {
                const href = t.slug ? `/category/${t.slug}` : "/";
                const active = pathname === href;
                return (
                  <Link
                    key={t.slug}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "block p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-800",
                      active
                        ? "text-pink-600 bg-gray-100 dark:bg-gray-800"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    {t.title}
                  </Link>
                );
              })}
            </div>
            <div className="flex justify-center gap-4 py-3 border-t border-gray-100 dark:border-gray-800">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-500 transition-colors"
                >
                  <link.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
