// app/editor/actions.js
"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createPost, getPostBySlug } from "@/lib/posts";
import { slugify, calculateReadingTime } from "@/lib/utils";

export async function publishPost(prevState, formData) {
  const rawTitle = formData.get("title")?.toString().trim();
  const category = formData.get("category")?.toString().trim() || "General";
  const customSlug = formData.get("customSlug")?.toString().trim();
  const excerpt = formData.get("excerpt")?.toString().trim();
  const content = formData.get("content")?.toString().trim();

  // 1. Validation check
  if (!rawTitle) {
    return { error: "Please enter a title for your story." };
  }
  if (!excerpt) {
    return { error: "Please provide a short summary excerpt." };
  }
  if (!content || content.length < 20) {
    return { error: "Article content must be at least 20 characters long." };
  }

  // 2. Slug generation and fallback
  let targetSlug = customSlug ? slugify(customSlug) : slugify(rawTitle);
  if (!targetSlug) {
    targetSlug = `story-${Date.now()}`;
  }

  // 3. Collision protection
  const existing = await getPostBySlug(targetSlug);
  if (existing) {
    targetSlug = `${targetSlug}-${Date.now().toString().slice(-4)}`;
  }

  // 4. Compute reading metadata
  const readingTime = calculateReadingTime(content);
  const publishedAt = new Date().toISOString().split("T")[0];

  const newStory = {
    id: Date.now().toString(),
    slug: targetSlug,
    title: rawTitle,
    excerpt,
    category,
    content,
    readingTime,
    publishedAt,
  };

  try {
    await createPost(newStory);
  } catch (err) {
    console.error("Failed to write post:", err);
    return { error: "Failed to save story to disk. Please try again." };
  }

  // 5. Revalidate cache
  revalidatePath("/");
  revalidatePath(`/category/${category.toLowerCase()}`);

  // 6. Navigate to reader
  redirect(`/post/${targetSlug}`);
}