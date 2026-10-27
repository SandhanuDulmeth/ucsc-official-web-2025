import Image from "next/image";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaClock, FaTag, FaUserCircle } from "react-icons/fa";
import TransitionLink from "@/components/helpers/TransitionLink";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { blogPosts, getBlogPostBySlug, getAdjacentBlogPosts } from "@/data/blogPosts";
import BlogCard from "@/components/BlogCard";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | IEEE Student Branch of UCSC",
    };
  }

  return {
    title: `${post.title} | IEEE Student Branch of UCSC`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.image,
          alt: post.imageAlt || post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { prevPost, nextPost } = getAdjacentBlogPosts(slug);

  // Related posts (excluding current post)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <ReadingProgressBar />
      <main className="pt-28 pb-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto min-h-screen">
        {/* Back Link to Listing */}
        <div className="mb-8">
          <TransitionLink
            href="/blog"
            className="inline-flex items-center gap-2 text-primary-blue hover:text-secondary-blue font-semibold text-xs md:text-sm uppercase tracking-wider transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue rounded-xs px-2 py-1"
          >
            <FaArrowLeft className="text-xs transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to all posts</span>
          </TransitionLink>
        </div>

      <article className="space-y-8">
        {/* Post Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {post.category && (
              <span className="bg-primary-blue text-primary-white text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-xs">
                {post.category}
              </span>
            )}
            {post.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs text-secondary-blue/70 bg-secondary-white px-2 py-0.5 rounded-xs"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-semibold text-secondary-blue leading-tight md:leading-tight break-words [overflow-wrap:anywhere] hyphens-auto">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-secondary-blue/70 pt-2 border-b border-secondary-white pb-6">
            <span className="flex items-center gap-2 font-medium text-secondary-blue">
              <FaUserCircle className="text-primary-blue text-base" />
              {post.author?.name || "IEEE UCSC"}
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-secondary-blue/30" />
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-primary-blue text-xs" />
              <time dateTime={post.isoDate || post.date}>{post.date}</time>
            </span>
            {post.readTime && (
              <>
                <span className="inline-block w-1 h-1 rounded-full bg-secondary-blue/30" />
                <span className="flex items-center gap-1.5">
                  <FaClock className="text-primary-blue text-xs" />
                  {post.readTime}
                </span>
              </>
            )}
          </div>
        </header>

        {/* Featured Image */}
        <div className="space-y-2">
          <div className="relative w-full aspect-16/10 md:aspect-16/10 max-h-[640px] rounded-sm overflow-hidden bg-secondary-white shadow-xs">
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
              className="object-cover"
            />
          </div>
          {post.imageCaption && (
            <p className="text-xs text-secondary-blue/60 text-center italic pt-1">
              {post.imageCaption}
            </p>
          )}
        </div>

        {/* Full Content */}
        <div className="text-secondary-blue space-y-6 pt-4 font-light leading-relaxed text-base md:text-lg">
          {post.content.map((block, idx) => {
            if (block.type === "quote") {
              return (
                <blockquote
                  key={idx}
                  className="border-l-4 border-primary-blue pl-6 py-3 my-8 italic text-secondary-blue text-lg md:text-xl font-normal bg-primary-blue/5 rounded-r-xs break-words"
                >
                  &ldquo;{block.text}&rdquo;
                </blockquote>
              );
            }
            if (block.type === "heading") {
              if (block.level === 3) {
                return (
                  <h3
                    key={idx}
                    className="text-xl md:text-2xl font-semibold text-secondary-blue pt-4 pb-1 break-words hyphens-auto"
                  >
                    {block.text}
                  </h3>
                );
              }
              return (
                <h2
                  key={idx}
                  className="text-2xl md:text-3xl font-semibold text-secondary-blue pt-6 pb-2 break-words hyphens-auto border-b border-secondary-white/60"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "image") {
              return (
                <figure key={idx} className="my-8 space-y-2">
                  <div className="relative w-full aspect-16/10 md:aspect-16/10 rounded-sm overflow-hidden bg-secondary-white shadow-xs">
                    <Image
                      src={block.src}
                      alt={block.alt || block.caption || post.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  {block.caption && (
                    <figcaption className="text-xs text-secondary-blue/70 text-center italic pt-1">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }
            return (
              <p key={idx} className="leading-relaxed break-words">
                {block.text}
              </p>
            );
          })}
        </div>

        {/* Article Footer & Author Info */}
        <footer className="pt-10 mt-12 border-t border-secondary-white space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-secondary-white/40 p-6 rounded-sm">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-4xl text-primary-blue shrink-0" />
              <div>
                <p className="font-semibold text-secondary-blue text-sm">
                  {post.author?.name || "IEEE Student Branch of UCSC"}
                </p>
                {post.author?.role && (
                  <p className="text-xs text-secondary-blue/70 font-light">
                    {post.author.role}
                  </p>
                )}
              </div>
            </div>

            <TransitionLink
              href="/blog"
              className="inline-flex items-center justify-center gap-2 border border-primary-blue text-primary-blue hover:bg-primary-blue/10 px-4 py-2 rounded-xs text-xs uppercase font-semibold tracking-wider transition-colors"
            >
              <FaArrowLeft className="text-xs" />
              <span>Back to all posts</span>
            </TransitionLink>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2 pt-2">
              <FaTag className="text-primary-blue text-xs" />
              <span className="text-xs font-semibold uppercase text-secondary-blue/70">
                Topics:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-secondary-blue/80 bg-secondary-white px-2.5 py-1 rounded-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </footer>
      </article>

      {/* Previous / Next Post Navigation */}
      {(prevPost || nextPost) && (
        <nav
          aria-label="Previous and Next Articles"
          className="my-12 pt-8 border-t border-secondary-white grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {prevPost ? (
            <TransitionLink
              href={`/blog/${prevPost.slug}`}
              className="group flex flex-col p-5 bg-white border border-secondary-white/80 rounded-sm hover:border-primary-blue/50 hover:shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
            >
              <span className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-secondary-blue/60 group-hover:text-primary-blue transition-colors mb-1.5">
                <FaArrowLeft className="text-[10px] transition-transform duration-200 group-hover:-translate-x-1" />
                Previous Article
              </span>
              <p className="font-semibold text-secondary-blue group-hover:text-primary-blue text-sm md:text-base line-clamp-2 break-words [overflow-wrap:anywhere] transition-colors">
                {prevPost.title}
              </p>
            </TransitionLink>
          ) : (
            <div className="hidden md:block" />
          )}

          {nextPost ? (
            <TransitionLink
              href={`/blog/${nextPost.slug}`}
              className="group flex flex-col p-5 bg-white border border-secondary-white/80 rounded-sm hover:border-primary-blue/50 hover:shadow-sm transition-all duration-200 text-left md:text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
            >
              <span className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-secondary-blue/60 group-hover:text-primary-blue transition-colors mb-1.5 md:justify-end">
                Next Article
                <FaArrowRight className="text-[10px] transition-transform duration-200 group-hover:translate-x-1" />
              </span>
              <p className="font-semibold text-secondary-blue group-hover:text-primary-blue text-sm md:text-base line-clamp-2 break-words [overflow-wrap:anywhere] transition-colors">
                {nextPost.title}
              </p>
            </TransitionLink>
          ) : (
            <div className="hidden md:block" />
          )}
        </nav>
      )}

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-secondary-white space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-[2px] bg-secondary-blue" />
            <h2 className="uppercase font-semibold text-base text-secondary-blue tracking-wider">
              More Stories from IEEE UCSC
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <BlogCard
                key={related.id || related.slug}
                post={related}
                headingLevel="h3"
              />
            ))}
          </div>
        </section>
      )}
    </main>
  </>
  );
}
