// app/not-found.jsx
import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-600 shadow-inner">
        <FileQuestion className="h-8 w-8 text-neutral-500" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
        404 Error
      </span>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
        Story or Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-sm text-neutral-600 sm:text-base leading-relaxed">
        The article you are looking for might have been removed, had its slug renamed, or is temporarily unavailable.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-neutral-800"
        >
          <Home className="h-4 w-4" />
          Back to Home Feed
        </Link>
        <Link
          href="/editor"
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-xs transition hover:bg-neutral-50"
        >
          Write a Story
        </Link>
      </div>
    </div>
  );
}