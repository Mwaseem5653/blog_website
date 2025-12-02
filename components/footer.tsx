/**
 * components/Footer.tsx
 */
export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full z-50 border-t dark:border-gray-800 py-6 text-center text-sm text-gray-600 bg-white dark:bg-gray-900 dark:text-gray-300">
      <div className="container mx-auto px-4">
        <div className="text-xs md:text-sm">© {new Date().getFullYear()} GlowGuide — Natural beauty tips • Privacy • Terms</div>
      </div>
    </footer>
  );
}
