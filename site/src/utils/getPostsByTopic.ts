import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";
import { slugifyStr } from "./slugify";

const getPostsByTopic = (posts: CollectionEntry<"blog">[], topic: string) =>
  getSortedPosts(
    posts.filter(post => 
      post.data.topics?.some(t => slugifyStr(t) === topic)
    )
  );

export default getPostsByTopic;


