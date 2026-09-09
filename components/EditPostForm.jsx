// components/EditPostForm.jsx
"use client";

import { useActionState } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { updateExistingPost } from "@/app/editor/actions";
import SubmitButton from "@/components/SubmitButton";

export default function EditPostForm({ post }) {
  const updateWithId = updateExistingPost.bind(null, post.id);
  const [state, formAction] = useActionState(updateWithId, null);

  return (
    <form action={formAction} className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs sm:p-8">
      {state?.error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
          <p>{state.error}</p>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
          Story Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={post.title}
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue={post.category}
          className="w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-sm font-medium text-neutral-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="Tech">Tech</option>
          <option value="Sports">Sports</option>
          <option value="AI">AI</option>
          <option value="General">General</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="excerpt" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
          Summary Excerpt <span className="text-red-500">*</span>
        </label>
        <input
          id="excerpt"
          name="excerpt"
          type="text"
          required
          maxLength={180}
          defaultValue={post.excerpt}
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm text-neutral-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
          Story Content <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          rows={12}
          required
          defaultValue={post.content}
          className="w-full rounded-lg border border-neutral-300 p-4 text-sm leading-relaxed text-neutral-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-neutral-100 pt-5">
        <Link
          href={`/post/${post.slug}`}
          className="rounded-lg px-4 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
        >
          Cancel
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}