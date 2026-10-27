import Image from "next/image";
import TransitionLink from "./helpers/TransitionLink";
import { FaArrowRight, FaCalendarAlt, FaClock } from "react-icons/fa";

const BlogCard = ({
  post,
  featured = false,
  priority = false,
  headingLevel = "h2",
}) => {
  const HeadingTag = headingLevel === "h3" ? "h3" : "h2";

  return (
    <article
      className={`group flex flex-col bg-white border border-secondary-white/80 rounded-sm overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 ${
        featured ? "md:col-span-2 lg:col-span-3 md:flex-row" : ""
      }`}
    >
      {/* Featured Image */}
      <div
        className={`relative overflow-hidden bg-secondary-white shrink-0 ${
          featured
            ? "w-full md:w-1/2 aspect-16/10 md:aspect-4/3 lg:aspect-16/10 md:min-h-[340px]"
            : "w-full aspect-16/10"
        }`}
      >
        <Image
          src={post.image}
          alt={post.imageAlt || post.title}
          fill
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
          priority={priority || featured}
          loading={priority || featured ? undefined : "lazy"}
          className="object-cover group-hover:scale-105 transition-all duration-500 grayscale-0 [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0"
        />
        {post.category && (
          <span className="absolute top-3 left-3 bg-primary-blue text-primary-white text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-xs shadow-xs">
            {post.category}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col justify-between p-6 md:p-8 flex-1">
        <div className="space-y-3">
          {/* Metadata: Date and Read Time */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-secondary-blue/70">
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-[11px] text-primary-blue" />
              <time dateTime={post.isoDate || post.date}>{post.date}</time>
            </span>
            {post.readTime && (
              <>
                <span className="inline-block w-1 h-1 rounded-full bg-secondary-blue/40" />
                <span className="flex items-center gap-1.5">
                  <FaClock className="text-[11px] text-primary-blue" />
                  {post.readTime}
                </span>
              </>
            )}
          </div>

          {/* Title with line-clamp */}
          <HeadingTag
            className={`font-semibold text-secondary-blue group-hover:text-primary-blue transition-colors duration-200 leading-snug break-words hyphens-auto ${
              featured ? "text-2xl md:text-3xl" : "text-xl"
            } line-clamp-2`}
            title={post.title}
          >
            <TransitionLink
              href={`/blog/${post.slug}`}
              className="break-words focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue rounded-xs"
            >
              {post.title}
            </TransitionLink>
          </HeadingTag>

          {/* Excerpt with line-clamp */}
          <p
            className={`text-secondary-blue/80 font-light leading-relaxed break-words ${
              featured ? "text-base line-clamp-4" : "text-sm line-clamp-3"
            }`}
          >
            {post.description}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] text-secondary-blue/75 bg-secondary-white px-2 py-0.5 rounded-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Read more action */}
        <div className="pt-6 mt-4 border-t border-secondary-white/60">
          <TransitionLink
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-primary-blue font-semibold text-sm uppercase tracking-wide group-hover:gap-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue rounded-xs px-1 py-0.5"
          >
            <span>Read more</span>
            <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
          </TransitionLink>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
