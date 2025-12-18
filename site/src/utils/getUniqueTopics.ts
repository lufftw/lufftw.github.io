import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";
import postFilter from "./postFilter";

interface Topic {
  topic: string;
  topicName: string;
}

const getUniqueTopics = (posts: CollectionEntry<"blog">[]) => {
  const topics: Topic[] = posts
    .filter(postFilter)
    .flatMap(post => post.data.topics || [])
    .map(topic => ({ topic: slugifyStr(topic), topicName: topic }))
    .filter(
      (value, index, self) =>
        self.findIndex(topic => topic.topic === value.topic) === index
    )
    .sort((topicA, topicB) => topicA.topic.localeCompare(topicB.topic));
  return topics;
};

export default getUniqueTopics;


