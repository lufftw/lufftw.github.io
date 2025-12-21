import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts
    .filter(postFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
};

// const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
//   const filtered = posts.filter(postFilter);
//   const sorted = filtered.sort(
//     (a, b) =>
//       Math.floor(
//         new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
//       ) -
//       Math.floor(
//         new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
//       )
//   );
  
//   // Debug: check the first 5 posts  
//   console.log("Top 5 posts in sortedPosts:", sorted.slice(0, 5).map(p => ({
//     title: p.data.title,
//     modDatetime: p.data.modDatetime,
//     pubDatetime: p.data.pubDatetime,
//     featured: p.data.featured
//   })));
  
//   // Debug: check your article in the sorted position
//   const slidingWindowIndex = sorted.findIndex(p => 
//     p.data.title?.includes("Sliding Window")
//   );
//   if (slidingWindowIndex !== -1) {
//     console.log(`Sliding Window article is at index ${slidingWindowIndex} in sortedPosts`);
//     console.log("Article details:", {
//       title: sorted[slidingWindowIndex].data.title,
//       modDatetime: sorted[slidingWindowIndex].data.modDatetime,
//       pubDatetime: sorted[slidingWindowIndex].data.pubDatetime,
//       featured: sorted[slidingWindowIndex].data.featured
//     });
//   } else {
//     console.log("Sliding Window article NOT FOUND in sortedPosts!");
//   }
  
//   return sorted;
// };


export default getSortedPosts;
