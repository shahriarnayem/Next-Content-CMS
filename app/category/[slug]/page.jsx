// app/category/[slug]/page.jsx
import Link from "next/link";
import { getPostsByCategory } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import CategoryPills from "@/components/CategoryPills";
import { ArrowLeft, Tag } from "lucide-react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categoryTitle = slug.charAt(0).toUpperCase() + slug.slice(1);

  return {
    title: `${categoryTitle} Articles | FeedCMS`,
    description: `Browse all articles and stories published under ${categoryTitle}.`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const posts = await getPostsByCategory(slug);
  const formattedCategory = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="space-y-8">
      {/* Navigation Back Link */}
      <nav>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all stories
        </Link>
      </nav>

      {/* Category Header */}
      <section className="space-y-2 border-b border-neutral-200 pb-6 transition-colors dark:border-neutral-800">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Tag className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Category</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          {formattedCategory}
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
          Showing {posts.length} {posts.length === 1 ? "story" : "stories"} tagged under {formattedCategory}.
        </p>
      </section>

      {/* Active Pill Filter Bar */}
      <CategoryPills activeCategory={slug} />

      {/* Filtered Grid or Empty State */}
      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-300 p-12 text-center text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          No stories found under &quot;{formattedCategory}&quot; yet.
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