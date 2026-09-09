// app/editor/page.jsx
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import EditorForm from "@/components/EditorForm";

export const metadata = {
  title: "Writer Studio | FeedCMS",
  description: "Draft and publish a new story on FeedCMS.",
};

export default function EditorPage() {
  return (
    <div className="mx-auto max-w-3xl py-4 sm:py-8">
      {/* Back Navigation */}
      <nav className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 transition hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Cancel and return to feed
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-8 space-y-2 border-b border-neutral-200 pb-6">
        <div className="flex items-center gap-2 text-indigo-600">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Writer Studio</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          Draft a New Story
        </h1>
        <p className="text-sm text-neutral-600">
          Share technical insights, sports coverage, or breaking developments. Stories publish immediately to the global feed.
        </p>
      </header>

      {/* Editor Form */}
      <EditorForm />
    </div>
  );
}