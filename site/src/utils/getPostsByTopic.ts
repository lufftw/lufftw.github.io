/**
 * getPostsByTopic
 *
 * Returns sorted entries (posts + notes) that match a given topic slug.
 *
 * Behavior:
 * - Includes BOTH posts and notes:
 *   data.type === "post" || data.type === "note"
 * - Topics are read from frontmatter `data.topics: string[]`
 * - Topic matching is done by slugifying each topic name
 * - Final result is sorted using getSortedPosts (newest first)
 */

import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";
import { slugifyStr } from "./slugify";

const getPostsByTopic = (
  entries: CollectionEntry<"blog">[],
  topic: string
) => {
  const matched = entries.filter((entry) => {
    // Only include posts and notes
    if (entry.data.type !== "post" && entry.data.type !== "note") {
      return false;
    }

    const topics = Array.isArray(entry.data.topics)
      ? entry.data.topics
      : [];

    return topics.some((t) => slugifyStr(t) === topic);
  });

  return getSortedPosts(matched);
};

export default getPostsByTopic;
