/**
 * HeroCarousel utility functions
 */

export function coverOf(entry: any): string | undefined {
  const ogImage = entry.data?.ogImage;
  if (!ogImage) return undefined;
  return typeof ogImage === "string" ? ogImage : ogImage?.src;
}

export function isImportedImage(image: any): boolean {
  return image && typeof image !== "string" && image.src && typeof image.src !== "string";
}

export function asArray(v: unknown): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.filter(Boolean).map(String);
  return [String(v)];
}

export function authorOf(entry: any): string | undefined {
  const a = entry.data?.author;
  if (typeof a === "string" && a.trim()) return a.trim();
  const authors = asArray(entry.data?.authors);
  return authors.length ? authors[0] : undefined;
}

export function formatDate(entry: any): string | undefined {
  const d = entry.data?.datetime || entry.data?.pubDatetime;
  if (!d) return undefined;
  const date = new Date(d);
  const day = date.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

export function topicsOf(entry: any): string[] {
  return asArray(entry.data?.topics);
}

export function categoriesOf(entry: any): string[] {
  return asArray(entry.data?.categories);
}

export function tagsOf(entry: any): string[] {
  return asArray(entry.data?.tags);
}

/**
 * Metadata display limits (Top-N strategy)
 */
export const METADATA_LIMITS = {
  topics: 3,
  categories: 3,
  tags: 5,
} as const;

/**
 * Metadata separator for carousel and other displays
 */
export const METADATA_SEPARATOR = " · " as const;

/**
 * Get limited items with overflow count
 */
export function getLimitedItems<T>(
  items: T[],
  limit: number
): { displayed: T[]; overflowCount: number } {
  const displayed = items.slice(0, limit);
  const overflowCount = Math.max(0, items.length - limit);
  return { displayed, overflowCount };
}
