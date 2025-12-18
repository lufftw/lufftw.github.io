export const SITE = {
  website: "https://lufftw.github.io/",
  author: "Luff",
  profile: "https://github.com/lufftw",
  desc: "Engineering, algorithms, systems, and research-oriented notes.",
  title: "Technical Notes",
  ogImage: "og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000,
  showArchives: true,
  showBackButton: true,

  editPost: {
    enabled: true,
    text: "Edit this page",
    url: "https://github.com/lufftw/lufftw.github.io/edit/main/site/src/content/",
  },

  dynamicOgImage: true,
  dir: "ltr",
  lang: "en",
  timezone: "Asia/Taipei",
} as const;