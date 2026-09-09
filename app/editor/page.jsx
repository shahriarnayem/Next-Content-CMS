// app/editor/page.jsx
import Link from "next/link";
import { ArrowLeft, Sparkles, Send } from "lucide-react";

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

      {/* Editor Form Card */}
      <form className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs sm:p-8">
        
        {/* Title Field */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-xs font-bold uppercase tracking-wider text-neutral-700"
          >
            Story Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="e.g., Tactical Adjustments in the European Final"
            className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* Category & Slug Row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="block text-xs font-bold uppercase tracking-wider text-neutral-700"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              required
              defaultValue="Tech"
              className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-sm font-medium text-neutral-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="Tech">Tech</option>
              <option value="Sports">Sports</option>
              <option value="AI">AI</option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="customSlug"
              className="block text-xs font-bold uppercase tracking-wider text-neutral-700"
            >
              Custom Slug <span className="text-neutral-400 font-normal">(optional)</span>
            </label>
            <input
              id="customSlug"
              name="customSlug"
              type="text"
              placeholder="auto-generated-from-title"
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Excerpt / Summary Field */}
        <div className="space-y-2">
          <label
            htmlFor="excerpt"
            className="block text-xs font-bold uppercase tracking-wider text-neutral-700"
          >
            Summary Excerpt <span className="text-red-500">*</span>
          </label>
          <input
            id="excerpt"
            name="excerpt"
            type="text"
            required
            maxLength={180}
            placeholder="A concise 1-2 sentence lead paragraph for card previews..."
            className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <p className="text-right text-xs text-neutral-400">Max 180 characters</p>
        </div>

        {/* Body Content Field */}
        <div className="space-y-2">
          <label
            htmlFor="content"
            className="block text-xs font-bold uppercase tracking-wider text-neutral-700"
          >
            Story Content <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            rows={12}
            required
            placeholder="Write your article body here. Separate distinct paragraphs with double line breaks..."
            className="w-full rounded-lg border border-neutral-300 p-4 text-sm leading-relaxed text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <p className="text-xs text-neutral-400">
            Tip: Press Enter twice to create new reading paragraphs.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-neutral-100 pt-5">
          <Link
            href="/"
            className="rounded-lg px-4 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
          >
            Discard
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-neutral-800"
          >
            <Send className="h-3.5 w-3.5" />
            Publish Story
          </button>
        </div>

      </form>
    </div>
  );
}