"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { api } from "@/lib/api";
import { clearAuthToken, getAuthUser } from "@/lib/auth";

export default function AppNavbar() {
const pathname = usePathname();
const router = useRouter();
const [isAvatarOpen, setIsAvatarOpen] = useState(false);
const avatarDropdownRef = useRef<HTMLDivElement>(null);
const user = getAuthUser();

const initials = user?.name
? user.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)
: "U";

useEffect(() => {
function handleClickOutside(event: MouseEvent) {
if (avatarDropdownRef.current && !avatarDropdownRef.current.contains(event.target as Node)) {
setIsAvatarOpen(false);
}
}
document.addEventListener("mousedown", handleClickOutside);
return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

const handleLogout = async () => {
try {
await api.auth.logout();
} catch {
// continue regardless
}
clearAuthToken();
router.push("/login");
};

const navLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Messages", href: "/messages" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Settings", href: "/settings" },
];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#111111] border-b border-white/[0.06] z-50">
      <div className="h-14 flex items-center justify-between px-4 sm:px-6">
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

        <div className="flex items-center gap-2 sm:gap-4">
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
              {initials}
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
                <button 
                  onClick={() => {
                    setIsAvatarOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left block px-4 py-2 text-[13px] text-zinc-300 hover:bg-white/[0.04] hover:text-zinc-100 transition-colors"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1 rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`block w-4 h-[1.5px] bg-zinc-300 rounded-full transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[2.75px]" : ""}`} />
            <span className={`block w-4 h-[1.5px] bg-zinc-300 rounded-full transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[2.75px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-64 border-t border-white/[0.04]" : "max-h-0"
        }`}
      >
        <div className="px-5 py-4 space-y-1.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors ${
                  isActive ? "bg-white/5 text-white" : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.02]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/agent/new"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex sm:hidden items-center justify-center px-4 py-2.5 rounded-xl bg-white text-zinc-900 text-[14px] font-semibold"
            >
              + New Agent
            </Link>
          </div>
        </div>
      </div>
    </nav>

  );
}
