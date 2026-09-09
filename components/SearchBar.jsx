// components/SearchBar.jsx
"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentQuery = searchParams.get("q")?.toString() || "";

  function handleSearch(term) {
    const params = new URLSearchParams(searchParams);

    if (term.trim()) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  function handleClear() {
    const params = new URLSearchParams(searchParams);
    params.delete("q");
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400 dark:text-neutral-500">
        <Search className="h-4 w-4" />
      </div>

      <input
        type="text"
        defaultValue={currentQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search stories by keyword, topic, or content..."
        className="w-full rounded-xl border border-neutral-300 bg-white py-2 pr-8 pl-9 text-xs text-neutral-900 placeholder:text-neutral-400 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-indigo-400 sm:text-sm"
      />

      {currentQuery && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}