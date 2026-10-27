"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import TransitionLink from "./helpers/TransitionLink";
import { ieeeURL, navbarLinks } from "@/utils";
import miniLogo from "@/public/logo-blue.svg";
import ieeeLogo from "@/public/logo-ieee-blue.svg";

const Navbar = () => {
  const [isOpened, setIsOpended] = useState(false);
  const mobileNav = useRef(null);
  const pathname = usePathname();

  // Scroll to hash target on the homepage after transition completes
  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleClick = () => {
    if (!isOpened) {
      gsap.fromTo(
        mobileNav.current,
        {
          clipPath: "inset(0 0 100% 0)",
        },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.5,
        }
      );
    } else {
      gsap.fromTo(
        mobileNav.current,
        {
          clipPath: "inset(0 0 0 0)",
        },
        {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.5,
        }
      );
    }

    setIsOpended((prev) => !prev);
  };
  return (
    <>
      <nav className="fixed w-full hidden md:flex gap-6 items-center justify-between px-8 py-2 backdrop-blur-lg z-20 bg-primary-white">
        <div className="">
          <TransitionLink
            href="/"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue rounded-xs inline-block"
          >
            <Image
              src={miniLogo}
              width={140}
              height={60}
              alt="IEEE UCSC Student Branch Logo"
            />
          </TransitionLink>
        </div>

        <div className="flex gap-4 lg:gap-6 py-2 px-4 lg:px-6 items-center justify-center text-primary-blue uppercase font-semibold">
          {navbarLinks.map(({ name, link }, index) => {
            const isBlog = link === "/blog";
            const isHome = link === "/";
            const isActive = isBlog
              ? pathname?.startsWith("/blog")
              : isHome
              ? pathname === "/"
              : false;

            return (
              <TransitionLink
                href={link}
                key={index}
                aria-current={isActive ? "page" : undefined}
                className={`px-2.5 py-1 rounded-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue ${
                  isActive
                    ? "bg-primary-blue text-primary-white shadow-xs font-semibold"
                    : "hover:bg-primary-blue/10 text-primary-blue"
                }`}
              >
                {name}
              </TransitionLink>
            );
          })}

          <DropDown />
          <ContactButton />
        </div>

        <div className="">
          <Link
            href={ieeeURL}
            target="_blank"
            rel="noreferrer"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue rounded-xs inline-block"
          >
            <Image
              src={ieeeLogo}
              width={80}
              height={40}
              alt="IEEE Global Organization Logo"
            />
          </Link>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="flex md:hidden  w-full fixed top-0 z-20 bg-primary-white">
        <div className="py-4 px-3 justify-between  items-center flex w-full">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=" text-primary-blue"
              onClick={handleClick}
            >
              <path d="M4 12h16" />
              <path d="M4 18h16" />
              <path d="M4 6h16" />
            </svg>
          </div>

          <div className="">
            <Image
              src={miniLogo}
              width={140}
              height={60}
              alt="IEEE UCSC Student Branch Logo"
            />
          </div>
        </div>

        <div
          ref={mobileNav}
          style={{ clipPath: "inset(0 0 100% 0)" }}
          className="fixed top-16 bg-primary-white w-full flex flex-col px-4 py-8 space-y-2"
        >
          {navbarLinks.map(({ name, link }) => {
            const isBlog = link === "/blog";
            const isHome = link === "/";
            const isActive = isBlog
              ? pathname?.startsWith("/blog")
              : isHome
              ? pathname === "/"
              : false;

            return (
              <div key={link} onClick={handleClick}>
                <TransitionLink
                  href={link}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-3 py-1.5 rounded-xs transition-colors duration-200 uppercase font-semibold text-xl inline-block ${
                    isActive
                      ? "bg-primary-blue text-primary-white shadow-xs"
                      : "hover:bg-primary-blue/10 text-primary-blue"
                  }`}
                >
                  {name}
                </TransitionLink>
              </div>
            );
          })}
          <div className="mb-2 text-xl pt-2">
            <p className="px-3 py-1 rounded-sm uppercase text-secondary-blue font-semibold text-sm tracking-wider">
              Our team
            </p>
            <div className="ml-2 flex flex-col space-y-1">
              <div onClick={handleClick}>
                <TransitionLink
                  href="/#current-team"
                  className="hover:bg-primary-blue/10 px-3 py-1 rounded-sm transition-color duration-200 uppercase text-primary-blue font-semibold text-base"
                >
                  Current Team
                </TransitionLink>
              </div>
              <div onClick={handleClick}>
                <TransitionLink
                  href="/previous-officers"
                  className="hover:bg-primary-blue/10 px-3 py-1 rounded-sm transition-color duration-200 uppercase text-primary-blue font-semibold text-base"
                >
                  Previous Officers
                </TransitionLink>
              </div>
            </div>
          </div>

          <div onClick={handleClick} className="pt-2">
            <TransitionLink
              href="/#contact-us"
              className="hover:bg-primary-blue/10 px-3 py-1.5 rounded-xs transition-color duration-200 uppercase text-primary-blue font-semibold text-xl inline-block"
            >
              Contact us
            </TransitionLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

const DropDown = () => {
  const box = useRef();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!isClicked) {
      gsap.fromTo(
        box.current,
        {
          clipPath: "inset(0 0 100% 0)",
        },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.5,
        }
      );
    } else {
      gsap.fromTo(
        box.current,
        {
          clipPath: "inset(0 0 0 0)",
        },
        {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.5,
        }
      );
    }

    setIsClicked((prev) => !prev);
  };
  return (
    <div className="cursor-pointer relative" onClick={handleClick}>
      <span className="flex hover:bg-primary-blue/10 px-2 py-1 rounded-sm">
        {" "}
        Our Team{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-down"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
      <div
        className="absolute -bottom-24 -left-1 w-[180px] bg-[#E3EBF0] px-2 py-2 rounded-sm space-y-2 shadow-md z-30"
        ref={box}
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <div className="">
          <TransitionLink href="/#current-team" className="block hover:text-secondary-blue py-1">
            Current Team
          </TransitionLink>
        </div>

        <div>
          <TransitionLink href="/previous-officers" className="block hover:text-secondary-blue py-1">
            Previous Officers
          </TransitionLink>
        </div>
      </div>
    </div>
  );
};

const ContactButton = () => {
  return (
    <TransitionLink
      href="/#contact-us"
      className="border border-primary-blue text-primary-blue hover:bg-primary-blue/10 px-2 py-1 rounded-sm"
    >
      contact us
    </TransitionLink>
  );
};
