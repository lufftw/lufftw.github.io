/**
 * getUniqueTopics
 *
 * Returns a sorted list of unique topics derived from frontmatter `topics`.
 *
 * Includes BOTH posts and notes:
 * - data.type === "post" || data.type === "note"
 *
 * Output shape is kept identical to the original:
 * - { topic, topicName }[]
 */

import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";

interface Topic {
  topic: string;
  topicName: string;
}

const getUniqueTopics = (entries: CollectionEntry<"blog">[]) => {
  const topics: Topic[] = entries
    .filter(({ data }) => data.type === "post" || data.type === "note")
    .flatMap(entry => entry.data.topics || [])
    .map(topicName => ({ topic: slugifyStr(topicName), topicName }))
    .filter((value, index, self) => {
      return self.findIndex(t => t.topic === value.topic) === index;
    })
    .sort((a, b) => a.topic.localeCompare(b.topic));

  return topics;
};

export default getUniqueTopics;
