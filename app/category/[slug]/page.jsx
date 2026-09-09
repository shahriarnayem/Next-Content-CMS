// app/page.jsx
import { getAllPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import CategoryPills from "@/components/CategoryPills";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <section className="space-y-2 border-b border-neutral-200 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          Latest Stories
        </h1>
        <p className="text-sm text-neutral-600 sm:text-base">
          Curated reporting and technical insights across technology, sports, and artificial intelligence.
        </p>
      </section>

      {/* Category Pills Filter Bar */}
      <CategoryPills activeCategory="all" />

      {/* Article Grid */}
      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-300 p-12 text-center text-neutral-500">
          No stories published yet. Be the first to write one!
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