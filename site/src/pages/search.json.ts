/**
 * /search.json
 *
 * Build-time generated search index for client-side search.
 * Returns a compact array of entries with fields used by /search page.
 */

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getPathFromEntry } from "@/utils/getPath";

export const GET: APIRoute = async () => {
  // Collect entries from the "blog" collection and keep only posts.
  const all = await getCollection("blog");
  const posts = all.filter(({ data }) => data.type === "post");

  // Keep the index small and stable: only include fields we need.
  const index = posts
    .map((entry) => ({
      // Basic identity
      collection: entry.collection,
      slug: entry.slug,
      url: getPathFromEntry(entry),

      // Searchable text fields
      title: entry.data?.title ?? entry.slug,
      description: entry.data?.description ?? "",

      // Optional metadata
      datetime: entry.data?.datetime ?? "",
      tags: Array.isArray(entry.data?.tags) ? entry.data.tags : [],
      categories: Array.isArray(entry.data?.categories) ? entry.data.categories : [],
      featured: Boolean(entry.data?.featured),
    }))
    // Sort newest-first if datetime exists; otherwise keep original order
    .sort((a, b) => {
      const da = a.datetime ? Date.parse(a.datetime) : 0;
      const db = b.datetime ? Date.parse(b.datetime) : 0;
      return db - da;
    });

  return new Response(JSON.stringify(index), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      // Cache aggressively; change content triggers rebuild anyway
      "cache-control": "public, max-age=3600",
    },
  });
};
