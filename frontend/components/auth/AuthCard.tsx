"use client";

import { motion } from "framer-motion";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`bg-white border-solid border border-zinc-200 rounded-2xl shadow-sm p-6 sm:pt-6 sm:px-8 sm:pb-8 w-full max-w-[420px] ${className}`}
    >
      {children}
    </motion.div>
  );
}
