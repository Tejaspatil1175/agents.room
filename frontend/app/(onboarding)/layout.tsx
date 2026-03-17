import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding | agents.room",
  description: "Set up your first personal AI agent",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <header className="w-full flex items-center justify-between p-6 absolute top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
        </Link>
        <Link 
          href="/dashboard" 
          className="text-sm font-medium text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          Skip for now &rarr;
        </Link>
      </header>
      
      <main className="flex-1 flex flex-col items-center pt-24 pb-20 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
