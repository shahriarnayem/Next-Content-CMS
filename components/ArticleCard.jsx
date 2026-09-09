// components/ArticleCard.jsx
import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function ArticleCard({ post }) {
  return (
    <article className="group flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-5 shadow-xs transition hover:border-neutral-300 hover:shadow-sm">
      <div className="space-y-3">
        {/* Category Badge & Reading Time */}
        <div className="flex items-center justify-between text-xs font-medium text-neutral-500">
          <Link
            href={`/category/${post.category.toLowerCase()}`}
            className="rounded-md bg-neutral-100 px-2 py-0.5 text-neutral-700 transition hover:bg-neutral-200"
          >
            {post.category}
          </Link>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-neutral-400" />
            {post.readingTime}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold tracking-tight text-neutral-900 group-hover:text-indigo-600 transition">
          <Link href={`/post/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="line-clamp-2 text-sm text-neutral-600 leading-relaxed">
          {post.excerpt}
        </p>
      </div>

      {/* Footer Meta */}
      <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4 text-xs text-neutral-500">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-neutral-400" />
          {formatDate(post.publishedAt)}
        </span>
        <Link
          href={`/post/${post.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-neutral-900 transition group-hover:translate-x-0.5 group-hover:text-indigo-600"
        >
          Read <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}