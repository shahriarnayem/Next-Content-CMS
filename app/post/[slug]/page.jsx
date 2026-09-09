// app/post/[slug]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import ArticleCard from "@/components/ArticleCard";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found | FeedCMS" };
  }

  return {
    title: `${post.title} | FeedCMS`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch related articles
  const relatedPosts = await getRelatedPosts(post.slug, post.category, 2);
  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <article className="mx-auto max-w-3xl py-4 sm:py-8">
      {/* Navigation Back Link */}
      <nav className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 transition hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all stories
        </Link>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 border-b border-neutral-200 pb-8">
        <div className="flex items-center gap-2">
          <Link
            href={`/category/${post.category.toLowerCase()}`}
            className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold tracking-wide text-indigo-700 uppercase hover:bg-indigo-100 transition"
          >
            {post.category}
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl leading-tight">
          {post.title}
        </h1>

        <p className="text-base text-neutral-600 sm:text-lg leading-relaxed italic">
          {post.excerpt}
        </p>

        {/* Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-neutral-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-neutral-400" />
              {formatDate(post.publishedAt)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-neutral-400" />
              {post.readingTime}
            </span>
          </div>

          <span className="text-neutral-400">Published via FeedCMS</span>
        </div>
      </header>

      {/* Article Body Content */}
      <div className="space-y-6 pt-8 pb-12 text-base text-neutral-800 leading-relaxed sm:text-lg border-b border-neutral-200">
        {paragraphs.map((para, index) => (
          <p key={index} className="leading-7 sm:leading-8">
            {para}
          </p>
        ))}
      </div>

      {/* Related Stories Section */}
      {relatedPosts.length > 0 && (
        <section className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900">
              Related Stories
            </h2>
            <Link
              href={`/category/${post.category.toLowerCase()}`}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
            >
              More in {post.category} &rarr;
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {relatedPosts.map((related) => (
              <ArticleCard key={related.id} post={related} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}