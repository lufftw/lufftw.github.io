import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};
// const postFilter = ({ data }: CollectionEntry<"blog">) => {
//   const isPublishTimePassed =
//     Date.now() >
//     new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
//   const result = !data.draft && (import.meta.env.DEV || isPublishTimePassed);
  
//   // Debug: check your article
//   if (data.title?.includes("Sliding Window")) {
//     console.log("Sliding Window article:", {
//       title: data.title,
//       draft: data.draft,
//       pubDatetime: data.pubDatetime,
//       isPublishTimePassed,
//       result,
//       isDEV: import.meta.env.DEV
//     });
//   }
  
//   return result;
// };

export default postFilter;
