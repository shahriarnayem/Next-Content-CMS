// app/editor/edit/[slug]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";
import { ArrowLeft, Edit3 } from "lucide-react";
import EditPostForm from "@/components/EditPostForm";

export default async function EditPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl py-4 sm:py-8">
      <nav className="mb-6">
        <Link
          href={`/post/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 transition hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Cancel and return to story
        </Link>
      </nav>

      <header className="mb-8 space-y-2 border-b border-neutral-200 pb-6">
        <div className="flex items-center gap-2 text-indigo-600">
          <Edit3 className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Editing Story</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          {post.title}
        </h1>
      </header>

      <EditPostForm post={post} />
    </div>
  );
}