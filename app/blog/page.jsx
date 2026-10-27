import BlogList from "@/components/BlogList";
import { blogPosts, getAllBlogTags } from "@/data/blogPosts";

export const metadata = {
  title: "Blog & Stories | IEEE Student Branch of UCSC",
  description:
    "Explore the latest articles, event recaps, technical insights, and community highlights from the IEEE Student Branch of University of Colombo School of Computing.",
  openGraph: {
    title: "Blog & Stories | IEEE Student Branch of UCSC",
    description:
      "Explore the latest articles, event recaps, and insights from IEEE UCSC.",
    images: [{ url: "/images/blog/ieee-day.jpg", alt: "IEEE UCSC Blog" }],
  },
};

export default function BlogPage() {
  const tags = getAllBlogTags();

  return (
    <main className="pt-28 pb-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto min-h-screen">
      {/* Section Header matching site conventions */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-[2px] bg-secondary-blue" />
          <p className="uppercase font-semibold text-sm md:text-base text-secondary-blue tracking-wider">
            Our Stories & Insights
          </p>
        </div>
        <h1 className="text-3xl md:text-5xl text-secondary-blue font-semibold leading-tight break-words hyphens-auto">
          IEEE UCSC Blog
        </h1>
        <p className="mt-3 text-secondary-blue/70 max-w-2xl text-base font-light">
          Celebrating technical innovation, student accomplishments, and the spirit of collaboration within the IEEE Student Branch at UCSC.
        </p>
      </div>

      {/* Interactive Blog List */}
      <BlogList posts={blogPosts} initialTags={tags} />
    </main>
  );
}
