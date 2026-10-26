"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const TransitionLink = ({ children, href, className, props }) => {
  const router = useRouter();
  const pathname = usePathname();

  const timeline = gsap.timeline();

  const handleAnimation = () => {
    if (pathname != href) {
      document.body.classList.add("no-scroll"); //Disable scrolling

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
        }, //enable scrolling
      });
    }
  };

  const handleTransition = async (e) => {
    e.preventDefault();

    if (href.startsWith("#")) {
      const targetElement = document.querySelector(href);

      if (targetElement) {
        // Scroll to the element instead of reloading
        targetElement.scrollIntoView({ behavior: "smooth" });
      } else {
        // Target element not found on current page; navigate to homepage anchor
        handleAnimation();
        await sleep(1000);
        router.push("/" + href);
      }
    } else {
      // Regular page navigation
      handleAnimation();
      await sleep(1000);
      router.push(href);
    }
  };

  return (
    <>
      <Link
        onClick={handleTransition}
        href={href}
        prefetch={false}
        className={className}
        {...props}
      >
        {children}
      </Link>
    </>
  );
};

export default TransitionLink;
