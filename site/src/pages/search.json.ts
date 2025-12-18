/**
 * /search.json
 *
 * Build-time generated search index for client-side search.
 * Indexes BOTH posts and notes from the same `blog` collection.
 *
 * Content types:
 * - data.type === "post"
 * - data.type === "note"
 */

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getPathFromEntry } from "@/utils/getPath";

type EntryType = "post" | "note";

export const GET: APIRoute = async () => {
  // Collect entries from the "blog" collection and keep only posts/notes.
  const all = await getCollection("blog");
  const items = all.filter(
    ({ data }) => data.type === "post" || data.type === "note"
  );

  // Keep the index compact: only fields needed by the /search page.
  const index = items
    .map((entry) => {
      const type = (entry.data?.type ?? "post") as EntryType;

      return {
        // Identity
        collection: entry.collection,
        slug: entry.slug,
        url: getPathFromEntry(entry),

        // Content type
        type,

        // Searchable text fields
        title: entry.data?.title ?? entry.slug,
        description: entry.data?.description ?? "",

        // Optional metadata
        datetime: entry.data?.datetime ?? "",
        tags: Array.isArray(entry.data?.tags) ? entry.data.tags : [],
        categories: Array.isArray(entry.data?.categories)
          ? entry.data.categories
          : [],
        featured: Boolean(entry.data?.featured),
      };
    })
    // Sort newest-first if datetime exists; otherwise keep original order.
    .sort((a, b) => {
      const da = a.datetime ? Date.parse(a.datetime) : 0;
      const db = b.datetime ? Date.parse(b.datetime) : 0;
      return db - da;
    });

  return new Response(JSON.stringify(index), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
};
