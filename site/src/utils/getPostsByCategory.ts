/**
 * getPostsByCategory
 *
 * Returns sorted entries (posts + notes) that match a given category slug.
 *
 * Behavior:
 * - Includes BOTH posts and notes:
 *   data.type === "post" || data.type === "note"
 * - Categories are read from frontmatter `data.categories: string[]`
 * - Category matching is done by slugifying each category name
 * - Final result is sorted using getSortedPosts (newest first)
 */

import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";
import { slugifyStr } from "./slugify";

const getPostsByCategory = (
  entries: CollectionEntry<"blog">[],
  category: string
) => {
  const matched = entries.filter((entry) => {
    // Only include posts and notes
    if (entry.data.type !== "post" && entry.data.type !== "note") {
      return false;
    }

    const categories = Array.isArray(entry.data.categories)
      ? entry.data.categories
      : [];

    return categories.some((c) => slugifyStr(c) === category);
  });

  return getSortedPosts(matched);
};

export default getPostsByCategory;

