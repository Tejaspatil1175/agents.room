import Link from "next/link";

// Fallback SVG if lucide-react is not present
const LeftArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2"
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

export default function AuthNav() {
  return (
    <nav className="absolute top-0 w-full h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-6 lg:px-12 z-50">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-sm"></div>
        </div>
        <span className="font-semibold text-zinc-900 tracking-tight text-lg">
          agents.room
        </span>
      </Link>
      
      <Link 
        href="/" 
        className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
      >
        <LeftArrowIcon />
        Back to home
      </Link>
    </nav>
  );
}
