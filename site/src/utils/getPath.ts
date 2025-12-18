import { BLOG_PATH } from "@/content.config";
import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";

/**
 * Get full path of a blog post or note
 * @param id - id of the blog post (aka slug)
 * @param filePath - the blog post full file location
 * @param includeBase - whether to include base path (`/posts` or `/notes`) in return value
 * @param type - type of the content ("post" or "note")
 * @returns blog post or note path
 */
export function getPath(
  id: string,
  filePath: string | undefined,
  includeBase = true,
  type: "post" | "note" = "post"
) {
  const pathSegments = filePath
    ?.replace(BLOG_PATH, "")
    .split("/")
    .filter(path => path !== "") // remove empty string in the segments ["", "other-path"] <- empty string will be removed
    .filter(path => !path.startsWith("_")) // exclude directories start with underscore "_"
    .slice(0, -1) // remove the last segment_ file name_ since it's unnecessary
    .map(segment => slugifyStr(segment)); // slugify each segment path

  const basePath = includeBase ? (type === "note" ? "/notes" : "/posts") : "";

  // Making sure `id` does not contain the directory
  const blogId = id.split("/");
  const slug = blogId.length > 0 ? blogId.slice(-1) : blogId;

  // If not inside the sub-dir, simply return the file path
  if (!pathSegments || pathSegments.length < 1) {
    return [basePath, slug].join("/");
  }

  return [basePath, ...pathSegments, slug].join("/");
}

/**
 * Get full path from a CollectionEntry
 * @param entry - blog entry from content collection
 * @param includeBase - whether to include base path (`/posts` or `/notes`) in return value
 * @returns blog post or note path
 */
export function getPathFromEntry(
  entry: CollectionEntry<"blog">,
  includeBase = true
) {
  return getPath(entry.id, entry.filePath, includeBase, entry.data.type);
}
