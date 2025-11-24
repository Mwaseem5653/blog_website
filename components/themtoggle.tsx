"use client";
import { useState, useEffect } from "react";

/**
 * components/ThemeToggle.tsx
 * Very simple theme toggle (adds 'dark' to document.documentElement)
 */

// Function to calculate the initial state lazily
const getInitialTheme = (): "light" | "dark" => {
  // We can only access 'window' (and thus localStorage) on the client.
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("theme");

    // 1. Check saved preference
    if (saved === "dark" || saved === "light") {
      // **Crucially, apply the class to the document based on the saved theme**
      if (saved === "dark") {
        document.documentElement.classList.add("dark");
      }
      return saved as "light" | "dark";
    }

    // 2. Check system preference if no saved theme is found
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
        return "dark";
    }
  }

  // 3. Default to light
  return "light";
};

export default function ThemeToggle() {
  // Use the function to initialize the state. It runs ONLY once on mount.
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  // The useEffect hook is now only needed for **synchronizing** changes
  // to the external system (localStorage and document class).
  // Note: For this component, the synchronization is handled within `toggle`
  // so a separate `useEffect` for persistence isn't strictly necessary,
  // but if you had other ways to change `theme`, you'd need this:
  
  /*
  useEffect(() => {
    if (theme === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
  }, [theme]);
  */

  function toggle() {
    if (theme === "light") {
      // 1. Update external state
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      // 2. Update React state
      setTheme("dark");
    } else {
      // 1. Update external state
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      // 2. Update React state
      setTheme("light");
    }
  }

  return (
    <button 
      onClick={toggle} 
      className="p-2 rounded bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}