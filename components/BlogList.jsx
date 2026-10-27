"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import gsap from "gsap";
import BlogCard from "./BlogCard";
import { FaSearch, FaTimes } from "react-icons/fa";

const PAGE_SIZE = 6;

const BlogList = ({ posts = [], initialTags = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const gridRef = useRef(null);

  const tags = useMemo(() => ["All", ...initialTags], [initialTags]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag =
        selectedTag === "All" ||
        post.tags?.includes(selectedTag) ||
        post.category?.toLowerCase() === selectedTag.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags?.some((t) => t.toLowerCase().includes(query));

      return matchesTag && matchesSearch;
    });
  }, [posts, selectedTag, searchQuery]);

  // Subtle GSAP fade-up animation on cards, respecting prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined" || !gridRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const cards = gridRef.current.children;
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: "power2.out",
        }
      );
    }
  }, [visibleCount, selectedTag, searchQuery]);

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setVisibleCount(PAGE_SIZE);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedTag("All");
    setVisibleCount(PAGE_SIZE);
  };

  const visiblePosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  const hasMore = visibleCount < filteredPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <div className="space-y-10">
      {/* Search & Tag Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-6 border-b border-secondary-white">
        {/* Tag Filters */}
        <div
          className="flex flex-wrap gap-2 items-center"
          role="group"
          aria-label="Filter articles by tag"
        >
          <span className="text-xs uppercase tracking-wider font-semibold text-secondary-blue/70 mr-1">
            Filter:
          </span>
          {tags.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagSelect(tag)}
                aria-pressed={isActive}
                className={`text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded-xs transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-primary-blue text-primary-white shadow-xs"
                    : "bg-secondary-white/80 text-secondary-blue hover:bg-primary-blue/10"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-blue/50 text-xs pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search articles..."
            aria-label="Search articles"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            className="w-full pl-9 pr-8 py-2 bg-white border border-secondary-white rounded-sm text-sm text-secondary-blue placeholder:text-secondary-blue/40 focus:outline-none focus:border-primary-blue focus-visible:ring-2 focus-visible:ring-primary-blue transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setVisibleCount(PAGE_SIZE);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-blue/50 hover:text-secondary-blue text-xs p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue rounded-xs cursor-pointer"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Results Count (when filtered) */}
      {(searchQuery || selectedTag !== "All") && (
        <div className="flex items-center justify-between text-xs text-secondary-blue/70 -mt-4">
          <span>
            Found <strong>{filteredPosts.length}</strong> {filteredPosts.length === 1 ? "article" : "articles"}
            {selectedTag !== "All" && ` in "${selectedTag}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="text-primary-blue hover:underline font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue rounded-xs px-1 cursor-pointer"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Blog Cards Grid */}
      {visiblePosts.length > 0 ? (
        <>
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {visiblePosts.map((post, index) => {
              // Highlight the first card as featured if on default unfiltered view
              const isFeatured =
                selectedTag === "All" && !searchQuery && index === 0;

              return (
                <BlogCard
                  key={post.id || post.slug}
                  post={post}
                  featured={isFeatured}
                  priority={index === 0}
                />
              );
            })}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex flex-col items-center justify-center pt-6">
              <button
                type="button"
                onClick={handleLoadMore}
                className="group inline-flex items-center gap-2.5 px-6 py-3 border border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-primary-white transition-all duration-200 text-xs uppercase tracking-wider font-semibold rounded-xs shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 cursor-pointer"
              >
                <span>Load More Articles</span>
                <span className="text-[11px] opacity-80 font-normal">
                  ({visiblePosts.length} of {filteredPosts.length})
                </span>
              </button>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-20 px-4 bg-white border border-secondary-white/60 rounded-sm space-y-4">
          <p className="text-xl font-semibold text-secondary-blue">
            No articles found
          </p>
          <p className="text-sm text-secondary-blue/70 max-w-md mx-auto">
            We couldn&apos;t find any articles matching your search criteria. Try a different keyword or reset the filter.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="inline-block mt-2 px-5 py-2 bg-primary-blue text-primary-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-secondary-blue transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2"
          >
            Clear Search & Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;
