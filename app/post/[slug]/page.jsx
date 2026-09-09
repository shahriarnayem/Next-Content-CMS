// app/post/[slug]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import ArticleCard from "@/components/ArticleCard";
import DeleteButton from "@/components/DeleteButton";
import { ArrowLeft, Clock, Calendar, Edit2 } from "lucide-react";

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

  const relatedPosts = await getRelatedPosts(post.slug, post.category, 2);
  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <article className="mx-auto max-w-3xl py-4 sm:py-8">
      {/* Navigation Back Link */}
      <nav className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all stories
        </Link>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 border-b border-neutral-200 pb-8 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <Link
            href={`/category/${post.category.toLowerCase()}`}
            className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold tracking-wide text-indigo-700 uppercase transition hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900/60"
          >
            {post.category}
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 dark:text-white sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        {/* Management Toolbar */}
        <div className="flex items-center justify-between gap-3 border-y border-neutral-100 py-2.5 dark:border-neutral-800/80">
          <div className="flex items-center gap-2">
            <Link
              href={`/editor/edit/${post.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              <Edit2 className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
              Edit Story
            </Link>
            <DeleteButton id={post.id} title={post.title} />
          </div>

          <span className="text-xs text-neutral-400 dark:text-neutral-500">
            ID: {post.id}
          </span>
        </div>

        <p className="text-base leading-relaxed italic text-neutral-600 dark:text-neutral-300 sm:text-lg">
          {post.excerpt}
        </p>

        {/* Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500" />
              {formatDate(post.publishedAt)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500" />
              {post.readingTime}
            </span>
          </div>

          <span className="text-neutral-400 dark:text-neutral-500">Published via FeedCMS</span>
        </div>
      </header>

      {/* Article Body Content */}
      <div className="space-y-6 border-b border-neutral-200 pt-8 pb-12 text-base leading-relaxed text-neutral-800 dark:border-neutral-800 dark:text-neutral-200 sm:text-lg">
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
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Related Stories
            </h2>
            <Link
              href={`/category/${post.category.toLowerCase()}`}
              className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
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