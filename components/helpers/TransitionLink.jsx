"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const TransitionLink = ({ children, href = "/", className, ...props }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleAnimation = () => {
    const timeline = gsap.timeline();
    document.body.classList.add("no-scroll");

    timeline.fromTo(
      "#transition",
      {
        y: "100%",
        duration: 0.75,
      },
      {
        y: "0%",
        duration: 0.75,
        ease: "power2.in",
      }
    );

    timeline.to("#transition", {
      delay: 0.5,
      y: "-100%",
      duration: 0.75,
      ease: "power2.out",
      onComplete: () => {
        document.body.classList.remove("no-scroll");
      },
    });
  };

  const handleTransition = async (e) => {
    // Determine if this is a hash target (e.g. "#about-us" or "/#about-us")
    const isHashOnly = typeof href === "string" && href.startsWith("#");
    const isRootHash = typeof href === "string" && href.startsWith("/#") && href.length > 2;
    const hash = isHashOnly ? href : isRootHash ? href.slice(1) : null;

    if (hash) {
      if (pathname === "/" || pathname === "") {
        // We are already on the homepage - smooth scroll directly without full page exit animation
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", hash);
          return;
        }
      } else {
        // Navigating from another page (e.g. /blog) to homepage anchor
        e.preventDefault();
        handleAnimation();
        await sleep(1000);
        router.push("/" + hash);
        return;
      }
    }

    if (pathname === href) {
      if (href === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        e.preventDefault();
      }
      return;
    }

    // Regular page navigation
    e.preventDefault();
    handleAnimation();
    await sleep(1000);
    router.push(href);
  };

  return (
    <Link
      onClick={handleTransition}
      href={href}
      prefetch={false}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
};

export default TransitionLink;
