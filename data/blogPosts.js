export const blogPosts = [
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
      role: "Editorial Team",
    },
    category: "Events",
    tags: ["Events", "Community", "IEEE Day"],
    image: "/images/blog/ieee-day.jpg",
    imageAlt: "IEEE Day 2026 celebration in E401 Lecture Hall at UCSC",
    description:
      "A complete look back at the unforgettable IEEE Day 2026 at UCSC in E401 Lecture Hall, packed with insightful talks, exciting challenges, and vibrant community connection.",
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
        type: "quote",
        text: "Leveraging technology for the benefit of humanity — united across borders and generations.",
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
    title:
      "MadHack 3.0: Sri Lanka's Premier Mobile Application Development Hackathon Concludes with Groundbreaking Innovations",
    date: "September 24, 2026",
    isoDate: "2026-09-24",
    readTime: "4 min read",
    author: {
      name: "IEEE Student Branch of UCSC",
      role: "Technical Team",
    },
    category: "Competitions",
    tags: ["Competitions", "Hackathons", "Mobile Dev"],
    image: "/images/past-events/madhack-3.0.jpg",
    imageAlt: "MadHack 3.0 mobile hackathon winners and participants",
    description:
      "MadHack 3.0 brought together the sharpest undergraduate developers across the island to conceive, design, and build next-generation mobile applications.",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "MadHack, organized annually by the IEEE Student Branch of UCSC, stands as Sri Lanka's first and premier mobile app development hackathon. The third iteration pushed boundaries further with over 200 registered teams tackling challenges in health, sustainability, and fintech.",
      },
      {
        type: "paragraph",
        text: "Following intensive preliminary rounds and mentorship sessions by industry leaders, the finalist teams gathered for an electric 24-hour hackathon, turning concepts into fully functional mobile prototypes.",
      },
      {
        type: "paragraph",
        text: "Congratulations to all participants and especially the top teams who proved once again that passion and technical excellence thrive within our university ecosystem.",
      },
    ],
  },
  {
    id: "3",
    slug: "revolux-3-0-web-and-design-summit",
    title:
      "Revolux 3.0: Inspiring the Next Wave of UI/UX Designers and Frontend Architects",
    date: "August 12, 2026",
    isoDate: "2026-08-12",
    readTime: "3 min read",
    author: {
      name: "IEEE Student Branch of UCSC",
      role: "Design Team",
    },
    category: "Workshops",
    tags: ["Workshops", "Design", "Web"],
    image: "/images/past-events/revolux-3.0.jpg",
    imageAlt: "Revolux 3.0 workshop attendees and design speakers",
    description:
      "A hands-on deep dive into modern design systems, human-centered UI/UX methodologies, and high-performance web development.",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Revolux 3.0 gathered enthusiastic design minds and web developers from across faculties to bridge the gap between aesthetic design and functional engineering.",
      },
      {
        type: "paragraph",
        text: "Through real-world case studies and interactive design sprints, participants gained practical mastery over Figma, accessibility fundamentals, and modern frontend styling.",
      },
    ],
  },
];

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
