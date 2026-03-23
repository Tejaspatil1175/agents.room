"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "Changelog", href: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-[1440px] border border-emerald-500/20 shadow-sm overflow-hidden ${
        mobileOpen ? "rounded-[2rem]" : "rounded-full"
      } ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-emerald-500/40 shadow-md"
          : "bg-white/70 backdrop-blur-xl"
      }`}
    >
      <nav className="max-w-[1440px] mx-auto px-6 h-[56px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
              <rect x="2" y="2" width="4.5" height="4.5" rx="1.2" fill="white" opacity="0.9"/>
              <rect x="8.5" y="2" width="4.5" height="4.5" rx="1.2" fill="white" opacity="0.35"/>
              <rect x="2" y="8.5" width="4.5" height="4.5" rx="1.2" fill="white" opacity="0.35"/>
              <rect x="8.5" y="8.5" width="4.5" height="4.5" rx="1.2" fill="#34d399"/>
            </svg>
          </div>
          <span className="text-[14.5px] font-semibold tracking-[-0.02em] text-zinc-900">
            agents<span className="text-zinc-400 font-normal">.room</span>
          </span>
        </Link>

        {/* Center nav links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="px-3 py-1.5 text-[13px] font-medium text-zinc-500 hover:text-zinc-900 rounded-md transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors duration-150"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="bg-zinc-900 hover:bg-zinc-800 text-white text-[13px] font-medium px-3.5 py-[7px] rounded-lg transition-colors duration-150"
          >
            Start for free
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px] rounded-md"
          aria-label="Toggle menu"
        >
          <span className={`block w-4 h-[1.5px] bg-zinc-700 rounded-full transition-transform duration-200 ${mobileOpen ? "rotate-45 translate-y-[3.25px]" : ""}`} />
          <span className={`block w-4 h-[1.5px] bg-zinc-700 rounded-full transition-transform duration-200 ${mobileOpen ? "-rotate-45 -translate-y-[3.25px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-200 ${
          mobileOpen ? "max-h-[320px]" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-5 pt-1 border-t border-emerald-500/10">
          <div className="flex flex-col gap-0.5 mb-4">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={closeMobile}
                className="px-3 py-2 text-[14px] text-zinc-600 hover:text-zinc-900 rounded-md transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-3 border-t border-zinc-100">
            <Link
              href="/login"
              onClick={closeMobile}
              className="text-center text-[14px] text-zinc-600 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              onClick={closeMobile}
              className="text-center bg-zinc-900 text-white text-[14px] font-medium py-2.5 rounded-lg"
            >
              Start for free
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
