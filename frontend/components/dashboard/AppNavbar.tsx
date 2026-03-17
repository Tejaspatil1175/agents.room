"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function AppNavbar() {
  const pathname = usePathname();
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const avatarDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (avatarDropdownRef.current && !avatarDropdownRef.current.contains(event.target as Node)) {
        setIsAvatarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <nav className="w-full h-14 bg-[#111111] border-b border-white/[0.06] flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-8 h-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
            <div className="w-2 h-2 bg-zinc-900 rounded-[1px]"></div>
          </div>
          <span className="font-semibold text-zinc-100 tracking-tight text-[15px]">
            agents.room
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 h-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3 h-full flex items-center text-[13.5px] font-medium transition-colors ${
                  isActive ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {link.name}
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-100" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* New Agent CTA */}
        <Link
          href="/agent/new"
          className="hidden sm:flex px-4 py-1.5 rounded-lg bg-white hover:bg-zinc-100 text-zinc-900 text-[13px] font-medium transition-colors"
        >
          + New Agent
        </Link>

        {/* User Avatar & Dropdown */}
        <div className="relative" ref={avatarDropdownRef}>
          <button 
            onClick={() => setIsAvatarOpen(!isAvatarOpen)}
            className="w-7 h-7 rounded-full bg-zinc-700 hover:ring-2 hover:ring-zinc-600 transition-all flex items-center justify-center text-[11px] font-bold text-white focus:outline-none"
          >
            SJ
          </button>

          {isAvatarOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#111111] border border-white/[0.08] shadow-xl py-1 z-50 overflow-hidden">
              <Link 
                href="/settings"
                onClick={() => setIsAvatarOpen(false)}
                className="block px-4 py-2 text-[13px] text-zinc-300 hover:bg-white/[0.04] hover:text-zinc-100 transition-colors"
              >
                Settings
              </Link>
              <div className="w-full h-px bg-white/[0.04] my-1" />
              <Link 
                href="/"
                onClick={() => setIsAvatarOpen(false)}
                className="block px-4 py-2 text-[13px] text-zinc-300 hover:bg-white/[0.04] hover:text-zinc-100 transition-colors"
              >
                Sign out
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Spacer/Icon could go here if implemented, keeping simple per instructions */}
      </div>
    </nav>
  );
}
