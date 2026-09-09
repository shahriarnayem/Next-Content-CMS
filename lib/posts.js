// lib/posts.js
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "posts.json");

/**
 * Internal helper to read and parse the posts JSON file.
 */
async function readPostsFile() {
  try {
    const fileContents = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading posts file:", error);
    return [];
  }
}

/**
 * Internal helper to write the updated posts array back to disk.
 */
async function writePostsFile(posts) {
  await fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2), "utf-8");
}

/**
 * Returns all articles sorted from newest to oldest.
 */
export async function getAllPosts() {
  const posts = await readPostsFile();
  return posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

/**
 * Finds a single post matching the provided URL slug.
 */
export async function getPostBySlug(slug) {
  const posts = await readPostsFile();
  return posts.find((post) => post.slug === slug) || null;
}

/**
 * Filters articles by category (case-insensitive).
 */
export async function getPostsByCategory(category) {
  const posts = await readPostsFile();
  return posts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Inserts a new article at the top of the collection and saves to disk.
 */
export async function createPost(newPost) {
  const posts = await readPostsFile();
  posts.unshift(newPost);
  await writePostsFile(posts);
  return newPost;
}

/**
 * Returns up to `limit` related posts sharing the same category,
 * excluding the currently viewed post.
 */
export async function getRelatedPosts(currentSlug, category, limit = 2) {
  const posts = await readPostsFile();
  
  // First match posts in the same category (excluding current)
  let related = posts.filter(
    (post) =>
      post.slug !== currentSlug &&
      post.category.toLowerCase() === category.toLowerCase()
  );

  // If not enough in the same category, fallback to other recent posts
  if (related.length < limit) {
    const others = posts.filter(
      (post) => post.slug !== currentSlug && !related.some((r) => r.slug === post.slug)
    );
    related = [...related, ...others];
  }

  return related.slice(0, limit);
}