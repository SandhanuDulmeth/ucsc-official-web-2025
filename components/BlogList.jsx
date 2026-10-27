"use client";

import { useState, useMemo } from "react";
import BlogCard from "./BlogCard";
import { FaSearch, FaTimes } from "react-icons/fa";

const BlogList = ({ posts = [], initialTags = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

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

  const handleReset = () => {
    setSearchQuery("");
    setSelectedTag("All");
  };

  return (
    <div className="space-y-10">
      {/* Search & Tag Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-6 border-b border-secondary-white">
        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs uppercase tracking-wider font-semibold text-secondary-blue/70 mr-1">
            Filter:
          </span>
          {tags.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded-xs transition-colors duration-200 cursor-pointer ${
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
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-blue/50 text-xs" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            aria-label="Search articles"
            className="w-full pl-9 pr-8 py-2 bg-white border border-secondary-white rounded-sm text-sm text-secondary-blue placeholder:text-secondary-blue/40 focus:outline-none focus:border-primary-blue transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-blue/50 hover:text-secondary-blue text-xs p-1"
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
            className="text-primary-blue hover:underline font-semibold"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Blog Cards Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => {
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
            className="inline-block mt-2 px-5 py-2 bg-primary-blue text-primary-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-secondary-blue transition-colors cursor-pointer"
          >
            Clear Search & Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;
