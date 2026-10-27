const rawBlogPosts = [
  {
    id: "1",
    slug: "ieee-day-2026-ucsc",
    title:
      "Celebrating Innovation, Connection, and the Spirit of Engineering: A Complete Look Back at the Unforgettable IEEE Day 2026 at UCSC",
    date: "October 17, 2026",
    isoDate: "2026-10-17",
    readTime: "3 min read",
    author: {
      name: "IEEE Student Branch of UCSC",
    },
    category: "Events",
    tags: ["Events", "Community", "IEEE Day"],
    image: "/images/blog/ieee-day.jpg",
    imageAlt: "IEEE Day 2026 celebration in E401 Lecture Hall at UCSC",
    description:
      "For those who might be new to our community, IEEE Day is a massive global celebration commemorating the first time engineers and professionals worldwide gathered to share technical ideas back in 1884.",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "For those who might be new to our community, IEEE Day is a massive global celebration commemorating the first time engineers and professionals worldwide gathered to share technical ideas back in 1884. Today, it is celebrated by university student branches and professional sections across the globe. From local campuses to international tech hubs, thousands of members come together every October to host interactive events, technical talks, and networking sessions. It is all united by a shared mission: leveraging technology for the benefit of humanity. Being part of this worldwide movement right here at UCSC makes the occasion even more extraordinary.",
      },
      {
        type: "paragraph",
        text: "October 17th marked a massive milestone for the IEEE Student Branch at UCSC as we hosted our highly anticipated IEEE Day 2026. Held in the E401 Lecture Hall from 2:00 PM to 6:00 PM, the afternoon was packed with insightful talks, exciting challenges, and plenty of opportunities to connect with fellow undergraduates.",
      },
      {
        type: "paragraph",
        text: "A massive thank you to our keynote speaker, Mr. Prabhath Gunawardhana, who delivered an incredibly inspiring session to kick things off. We were also honored to host special guests from the IEEE Sri Lanka Section, and we extend our deepest gratitude to our sponsor, Procons Academy, for helping make this afternoon so special.",
      },
      {
        type: "paragraph",
        text: "But it wasn't all just talks! The energy in the room peaked during our interactive sessions. Teams battled it out in a hilarious cup-stacking game, and the competitive spirit truly shined during our campus-wide treasure hunt. Of course, all that running around builds up an appetite, so we made sure everyone was fueled up with plenty of great food and beverages to keep the good vibes going.",
      },
      {
        type: "paragraph",
        text: "Thank you to every single one of you who stopped scrolling, secured your spot, and joined us to celebrate innovation, connection, and the spirit of IEEE. We can't wait to see you at our next event!",
      },
    ],
  },
  {
    id: "2",
    slug: "madhack-3-0-mobile-development-hackathon",
    title: "MadHack 3.0: Mobile Application Development Hackathon",
    date: "Archive / TBA",
    isoDate: "2026-09-01",
    readTime: "1 min read",
    author: {
      name: "IEEE Student Branch of UCSC",
    },
    category: "Competitions",
    tags: ["Competitions", "Hackathons", "Mobile Dev"],
    image: "/images/past-events/madhack-3.0.jpg",
    imageAlt: "MadHack 3.0 Mobile Application Development Hackathon",
    description:
      "Placeholder article for MadHack 3.0. Official event coverage, competition highlights, and finalist details will be updated here.",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "This is a generic placeholder article for MadHack 3.0, the mobile application development hackathon organized by the IEEE Student Branch of UCSC. Official event coverage, challenge announcements, and team highlights will be published upon conclusion of the event.",
      },
    ],
  },
  {
    id: "3",
    slug: "revolux-3-0-web-and-design-summit",
    title: "Revolux 3.0: UI/UX & Web Design Workshop",
    date: "Archive / TBA",
    isoDate: "2026-08-01",
    readTime: "1 min read",
    author: {
      name: "IEEE Student Branch of UCSC",
    },
    category: "Workshops",
    tags: ["Workshops", "Design", "Web"],
    image: "/images/past-events/revolux-3.0.jpg",
    imageAlt: "Revolux 3.0 UI/UX and Web Design Workshop",
    description:
      "Placeholder article for Revolux 3.0. Workshop sessions, speaker insights, and design resources will be updated here.",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "This is a generic placeholder article for Revolux 3.0 organized by the IEEE Student Branch of UCSC. Official session recaps, guest speaker profiles, and workshop materials will be published here.",
      },
    ],
  },
];

/**
 * Returns blog posts sorted newest-first by ISO publication date
 */
export const getSortedBlogPosts = (posts = rawBlogPosts) => {
  return [...posts].sort((a, b) => {
    const timeA = a.isoDate ? new Date(a.isoDate).getTime() : 0;
    const timeB = b.isoDate ? new Date(b.isoDate).getTime() : 0;
    return timeB - timeA;
  });
};

export const blogPosts = getSortedBlogPosts(rawBlogPosts);

export const getAllBlogPosts = () => {
  return blogPosts;
};

export const getBlogPostBySlug = (slug) => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getAllBlogTags = () => {
  const tags = new Set();
  blogPosts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
};

/**
 * Returns previous (older) and next (newer) post relative to the current slug
 */
export const getAdjacentBlogPosts = (slug) => {
  const currentIndex = blogPosts.findIndex((post) => post.slug === slug);
  if (currentIndex === -1) {
    return { prevPost: null, nextPost: null };
  }

  // blogPosts is sorted newest-first:
  // Older chronological post is at currentIndex + 1
  // Newer chronological post is at currentIndex - 1
  const prevPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;

  return { prevPost, nextPost };
};


