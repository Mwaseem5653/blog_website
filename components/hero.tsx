import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-pink-50 dark:bg-gray-800 border rounded-xl p-8 mb-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Natural Beauty Tips — Simple, Safe, Proven</h1>
          <p className="mt-3 text-gray-700 dark:text-gray-300">DIY face packs, hair care routines, bridal glow guides — all Pakistan-focused.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/category/skin-care" className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 dark:hover:bg-pink-500">Explore Skin Care</Link>
            <Link href="/category/bridal" className="border px-4 py-2 rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">Bridal Glow</Link>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <Image src="/hero-sample.jpg" alt="hero" width={400} height={400} className="w-full rounded" />
        </div>
      </div>
    </section>
  );
}
