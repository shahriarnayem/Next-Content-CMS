// lib/utils.js

/**
 * Converts a raw title into a clean, URL-safe slug.
 * Example: "Understanding Next.js 15!" -> "understanding-nextjs-15"
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // Replace spaces with -
    .replace(/[^\w-]+/g, "")     // Remove all non-word chars
    .replace(/--+/g, "-")        // Replace multiple - with single -
    .replace(/^-+/, "")          // Trim - from start of text
    .replace(/-+$/, "");         // Trim - from end of text
}

/**
 * Calculates estimated reading time assuming ~200 words per minute.
 */
export function calculateReadingTime(text = "") {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${Math.max(1, minutes)} min read`;
}

/**
 * Formats standard ISO dates or date strings into readable text.
 * Example: "2026-09-09" -> "Sep 9, 2026"
 */
export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}