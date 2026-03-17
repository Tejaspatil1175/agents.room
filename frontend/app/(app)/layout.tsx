import { Metadata } from "next";
import AppNavbar from "@/components/dashboard/AppNavbar";

export const metadata: Metadata = {
  title: "Dashboard | agents.room",
  description: "Manage your personal AI agents",
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans text-zinc-100 selection:bg-emerald-500/30">
      <AppNavbar />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
