import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center min-h-[200px]">
      <div className="text-6xl mb-6 bg-[#111111] w-24 h-24 rounded-3xl flex items-center justify-center border border-white/[0.04]">
        🤖
      </div>
      <h3 className="text-xl font-semibold text-zinc-300 mb-2 tracking-tight">
        No agents yet
      </h3>
      <p className="text-[14px] text-zinc-600 mb-8 max-w-sm">
        Create your first agent to get started managing tasks on autopilot.
      </p>
      <Link
        href="/agent/new"
        className="px-5 py-2.5 rounded-xl bg-white text-zinc-900 text-[14px] font-medium hover:bg-zinc-100 transition-colors shadow-sm"
      >
        + Create agent
      </Link>
    </div>
  );
}
