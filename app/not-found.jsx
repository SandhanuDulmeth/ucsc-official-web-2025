import TransitionLink from "@/components/helpers/TransitionLink";
import { FaArrowLeft, FaHome } from "react-icons/fa";

export const metadata = {
  title: "404 - Page Not Found | IEEE Student Branch of UCSC",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 max-w-2xl mx-auto">
      <div className="space-y-6">
        <span className="inline-block text-xs uppercase tracking-widest font-semibold text-primary-blue bg-primary-blue/10 px-3.5 py-1.5 rounded-xs">
          404 Error
        </span>

        <h1 className="text-6xl md:text-8xl font-bold text-secondary-blue tracking-tight">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary-blue">
            Page or Post Not Found
          </h2>
          <p className="text-secondary-blue/70 text-sm md:text-base font-light max-w-md mx-auto">
            The page or publication you are looking for doesn&apos;t exist, has been moved, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <TransitionLink
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary-blue text-primary-white px-5 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold hover:bg-secondary-blue transition-colors shadow-xs"
          >
            <FaArrowLeft className="text-xs" />
            <span>Explore Blog</span>
          </TransitionLink>

          <TransitionLink
            href="/"
            className="inline-flex items-center gap-2 border border-secondary-blue/30 text-secondary-blue hover:bg-secondary-white/80 px-5 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            <FaHome className="text-xs" />
            <span>Go to Homepage</span>
          </TransitionLink>
        </div>
      </div>
    </main>
  );
}
