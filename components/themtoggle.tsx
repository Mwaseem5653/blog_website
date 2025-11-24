"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";

/**
 * components/ThemeToggle.tsx
 * Very simple theme toggle (adds 'dark' to document.documentElement)
 */

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  function toggle() {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  }

  return (
    <button onClick={toggle} className="p-2 rounded bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800">
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
