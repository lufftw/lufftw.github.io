/**
 * getUniqueCategories
 *
 * Returns a sorted list of unique categories derived from frontmatter `categories`.
 *
 * Includes BOTH posts and notes:
 * - data.type === "post" || data.type === "note"
 *
 * Output shape is kept identical to topics and tags:
 * - { category, categoryName }[]
 */

import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";

interface Category {
  category: string;
  categoryName: string;
}

const getUniqueCategories = (entries: CollectionEntry<"blog">[]) => {
  const categories: Category[] = entries
    .filter(({ data }) => data.type === "post" || data.type === "note")
    .flatMap(entry => entry.data.categories || [])
    .map(categoryName => ({ category: slugifyStr(categoryName), categoryName }))
    .filter((value, index, self) => {
      return self.findIndex(c => c.category === value.category) === index;
    })
    .sort((a, b) => a.category.localeCompare(b.category));

  return categories;
};

export default getUniqueCategories;

