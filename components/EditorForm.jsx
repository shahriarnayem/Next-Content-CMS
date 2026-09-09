// components/EditorForm.jsx
"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { AlertCircle, Eye, Edit3, Clock, Calendar } from "lucide-react";
import { publishPost } from "@/app/editor/actions";
import SubmitButton from "@/components/SubmitButton";
import { calculateReadingTime } from "@/lib/utils";

export default function EditorForm() {
  const [state, formAction] = useActionState(publishPost, null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Tech");
  const [customSlug, setCustomSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const [mode, setMode] = useState("edit");

  const readingTime = calculateReadingTime(content);
  const previewParagraphs = content.split("\n\n").filter(Boolean);

  return (
    <div className="space-y-6">
      {/* View Switcher Tabs */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-3 transition-colors dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode("edit")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              mode === "edit"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            }`}
          >
            <Edit3 className="h-3.5 w-3.5" />
            Write Mode
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              mode === "preview"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            Live Preview
          </button>
        </div>

        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          Estimated: <strong className="text-neutral-800 dark:text-neutral-200">{readingTime}</strong>
        </span>
      </div>

      {/* Main Form */}
      <form
        action={formAction}
        className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs transition-colors dark:border-neutral-800 dark:bg-neutral-900 sm:p-8"
      >
        {state?.error && (
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
            <p>{state.error}</p>
          </div>
        )}

        {mode === "edit" ? (
          <>
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300"
              >
                Story Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Tactical Adjustments in the European Final"
                className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-500"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-sm font-medium text-neutral-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
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
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300"
                >
                  Custom Slug{" "}
                  <span className="font-normal text-neutral-400 dark:text-neutral-500">(optional)</span>
                </label>
                <input
                  id="customSlug"
                  name="customSlug"
                  type="text"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  placeholder="auto-generated-from-title"
                  className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="excerpt"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300"
              >
                Summary Excerpt <span className="text-red-500">*</span>
              </label>
              <input
                id="excerpt"
                name="excerpt"
                type="text"
                required
                maxLength={180}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A concise 1-2 sentence lead paragraph for card previews..."
                className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-500"
              />
              <p className="text-right text-xs text-neutral-400 dark:text-neutral-500">
                {excerpt.length}/180 characters
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="content"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300"
              >
                Story Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                rows={12}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article body here. Separate distinct paragraphs with double line breaks..."
                className="w-full rounded-lg border border-neutral-300 bg-white p-4 text-sm leading-relaxed text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-500"
              />
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                Tip: Press Enter twice to create new reading paragraphs.
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <input type="hidden" name="title" value={title} />
            <input type="hidden" name="category" value={category} />
            <input type="hidden" name="customSlug" value={customSlug} />
            <input type="hidden" name="excerpt" value={excerpt} />
            <textarea name="content" value={content} readOnly className="hidden" />

            <article className="border-b border-neutral-200 pb-8 dark:border-neutral-800">
              <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold tracking-wide text-indigo-700 uppercase dark:bg-indigo-950/60 dark:text-indigo-300">
                {category}
              </span>

              <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-3xl lg:text-4xl">
                {title || <span className="italic text-neutral-400 dark:text-neutral-600">Untitled Story</span>}
              </h1>

              <p className="mt-3 text-sm italic leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-base">
                {excerpt || <span className="italic text-neutral-400 dark:text-neutral-600">No summary excerpt entered yet.</span>}
              </p>

              <div className="mt-4 flex items-center gap-4 text-xs text-neutral-400 dark:text-neutral-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Today
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {readingTime}
                </span>
              </div>
            </article>

            <div className="space-y-4 text-sm leading-relaxed text-neutral-800 dark:text-neutral-200 sm:text-base">
              {previewParagraphs.length === 0 ? (
                <p className="italic text-neutral-400 dark:text-neutral-600">
                  Story body is empty. Switch back to write mode to add paragraphs.
                </p>
              ) : (
                previewParagraphs.map((para, i) => <p key={i}>{para}</p>)
              )}
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 border-t border-neutral-100 pt-5 dark:border-neutral-800">
          <Link
            href="/"
            className="rounded-lg px-4 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            Discard
          </Link>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}