import TransitionLink from "@/components/helpers/TransitionLink";
import { FaArrowLeft, FaHome } from "react-icons/fa";

export const metadata = {
  title: "Article Not Found | IEEE Student Branch of UCSC",
  description: "The requested blog post could not be found.",
};

export default function BlogPostNotFound() {
  return (
    <main className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 max-w-2xl mx-auto">
      <div className="space-y-6">
        <span className="inline-block text-xs uppercase tracking-widest font-semibold text-primary-blue bg-primary-blue/10 px-3.5 py-1.5 rounded-xs">
          Article Not Found
        </span>

        <h1 className="text-6xl md:text-8xl font-bold text-secondary-blue tracking-tight">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary-blue">
            Article Does Not Exist
          </h2>
          <p className="text-secondary-blue/70 text-sm md:text-base font-light max-w-md mx-auto">
            We couldn&apos;t find the publication you requested. It may have been renamed, archived, or the link may be incorrect.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <TransitionLink
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary-blue text-primary-white px-5 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold hover:bg-secondary-blue transition-colors shadow-xs"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to All Posts</span>
          </TransitionLink>

          <TransitionLink
            href="/"
            className="inline-flex items-center gap-2 border border-secondary-blue/30 text-secondary-blue hover:bg-secondary-white/80 px-5 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            <FaHome className="text-xs" />
            <span>Return to Homepage</span>
          </TransitionLink>
        </div>
      </div>
    </main>
  );
}
