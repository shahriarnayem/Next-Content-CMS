// app/page.jsx
import { searchPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import CategoryPills from "@/components/CategoryPills";
import SearchBar from "@/components/SearchBar";

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || "";
  const posts = await searchPosts(query);

  return (
    <div className="space-y-8">
      {/* Header & Search Bar */}
      <section className="flex flex-col gap-4 border-b border-neutral-200 pb-6 transition-colors dark:border-neutral-800 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 transition-colors dark:text-white sm:text-4xl">
            Latest Stories
          </h1>
          <p className="text-sm text-neutral-600 transition-colors dark:text-neutral-400 sm:text-base">
            Curated reporting and technical insights across technology, sports, and AI.
          </p>
        </div>

        <SearchBar />
      </section>

      {/* Category Pills Filter Bar */}
      <CategoryPills activeCategory="all" />

      {/* Active Search Indicator */}
      {query && (
        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          Showing results for &ldquo;
          <strong className="text-neutral-800 dark:text-neutral-200">{query}</strong>
          &rdquo; ({posts.length} {posts.length === 1 ? "match" : "matches"})
        </div>
      )}

      {/* Article Grid or Search Fallback */}
      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-300 p-12 text-center text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          {query ? (
            <p>No stories found matching &ldquo;{query}&rdquo;. Try another term.</p>
          ) : (
            <p>No stories published yet. Be the first to write one!</p>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}