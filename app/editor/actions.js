// app/editor/actions.js
"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createPost, getPostBySlug, updatePost, deletePost } from "@/lib/posts";
import { slugify, calculateReadingTime } from "@/lib/utils";

export async function publishPost(prevState, formData) {
  const rawTitle = formData.get("title")?.toString().trim();
  const category = formData.get("category")?.toString().trim() || "General";
  const customSlug = formData.get("customSlug")?.toString().trim();
  const excerpt = formData.get("excerpt")?.toString().trim();
  const content = formData.get("content")?.toString().trim();

  if (!rawTitle) return { error: "Please enter a title for your story." };
  if (!excerpt) return { error: "Please provide a short summary excerpt." };
  if (!content || content.length < 20) {
    return { error: "Article content must be at least 20 characters long." };
  }

  let targetSlug = customSlug ? slugify(customSlug) : slugify(rawTitle);
  if (!targetSlug) targetSlug = `story-${Date.now()}`;

  const existing = await getPostBySlug(targetSlug);
  if (existing) {
    targetSlug = `${targetSlug}-${Date.now().toString().slice(-4)}`;
  }

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
    return { error: "Failed to save story to disk." };
  }

  revalidatePath("/");
  revalidatePath(`/category/${category.toLowerCase()}`);
  redirect(`/post/${targetSlug}`);
}

export async function updateExistingPost(id, prevState, formData) {
  const rawTitle = formData.get("title")?.toString().trim();
  const category = formData.get("category")?.toString().trim() || "General";
  const excerpt = formData.get("excerpt")?.toString().trim();
  const content = formData.get("content")?.toString().trim();

  if (!rawTitle) return { error: "Title is required." };
  if (!excerpt) return { error: "Excerpt is required." };
  if (!content || content.length < 20) {
    return { error: "Content must be at least 20 characters." };
  }

  const readingTime = calculateReadingTime(content);

  const updated = await updatePost(id, {
    title: rawTitle,
    category,
    excerpt,
    content,
    readingTime,
  });

  if (!updated) {
    return { error: "Article could not be found to update." };
  }

  revalidatePath("/");
  revalidatePath(`/post/${updated.slug}`);
  revalidatePath(`/category/${category.toLowerCase()}`);

  redirect(`/post/${updated.slug}`);
}

export async function deleteExistingPost(id) {
  await deletePost(id);

  revalidatePath("/");
  redirect("/");
}