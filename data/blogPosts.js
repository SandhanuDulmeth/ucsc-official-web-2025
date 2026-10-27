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
    imagePosition: "center 65%",
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
    title: "MADHack 3.0",
    date: "April 2024",
    isoDate: "2024-04-01",
    readTime: "1 min read",
    author: {
      name: "IEEE Student Branch of UCSC",
    },
    category: "Competitions",
    tags: ["Competitions", "Hackathons", "Mobile Dev"],
    image: "/images/past-events/madhack-3.0.jpg",
    imageAlt: "MADHack 3.0 Mobile Application Development Hackathon",
    description:
      "MADHack is a mobile app development hackathon and workshop series organized by the IEEE Student Branch of UCSC. It gives university students in Sri Lanka the chance to participate in a mobile app development competition, allowing them to sharpen their skills and learn from experts in the field.",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "The awareness session of MADHACK took place on the 6th of January 2024 with the purpose of bringing about awareness of the event and giving the participants an introduction to the world of mobile app development. The very first workshop for MADHack, the Mobile Application Development Hackathon was conducted on the 11th February via Zoom platforms with more than 200 participants live. The session delivered an introduction to Android Native development with a remarkable engagement of the participants. The second workshop of MADHack was conducted on the 4th of February, 2024 physically with more than 250 participants focusing on different topics namely React Native, Flutter and Code to AppStore (i.e. Deployment).",
      },
    ],
  },
  {
    id: "3",
    slug: "revolux-3-0-web-and-design-summit",
    title: "RevolUX 3.0",
    date: "March 2024",
    isoDate: "2024-03-01",
    readTime: "1 min read",
    author: {
      name: "IEEE Student Branch of UCSC",
    },
    category: "Design",
    tags: ["Design", "UI/UX", "Competitions"],
    image: "/images/past-events/revolux-3.0.jpg",
    imageAlt: "RevolUX 3.0 UI/UX Designathon",
    description:
      "RevolUX 3.0 is the third edition of the UI/UX designathon organized by the IEEE Student Branch of UCSC in collaboration with AIESEC in University of Colombo.",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "RevolUX was initiated by the IEEE student branch of UCSC together with AIESEC in University of Colombo after observing the growing interest in the field of UI/UX. The event was conducted in two phases: the preparation phase and competition phase. The initial phase consisted of awareness sessions and workshops. The subsequent phase was consistent of the initial competition round of prototype submission and a 24-hour designathon. The final designathon of RevolUX 3.0 was held on the 2nd of March 2024 as a online 24 hour event with 10 final teams with nearly 40 participating in the competition. The competitors got a kick start at 8 a.m. and concluded their final outcome at 8 a.m. of the following day. Afterwards, the winning three teams were carefully processed by the judge panel and it was announced at the award ceremony.",
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


