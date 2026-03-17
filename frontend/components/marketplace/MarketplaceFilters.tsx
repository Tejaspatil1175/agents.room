export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  channel: string;
  installs: number;
  rating: number;
  author: string;
  icon: string;
  featured: boolean;
}

interface MarketplaceFiltersProps {
  categories: string[];
  activeCategory: string;
  onSetCategory: (category: string) => void;
}

export default function MarketplaceFilters({ 
  categories, 
  activeCategory, 
  onSetCategory 
}: MarketplaceFiltersProps) {
  return (
    <div className="w-full flex items-center justify-between mb-8 overflow-hidden">
      {/* Scrollable Tabs */}
      <div className="flex-1 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-1 w-max pr-4">
          {categories.map((cat) => {
             const isActive = activeCategory === cat;
             return (
               <button
                 key={cat}
                 onClick={() => onSetCategory(cat)}
                 className={`px-4 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                   isActive 
                     ? "bg-zinc-800 text-zinc-100 border border-white/[0.08]" 
                     : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                 }`}
               >
                 {cat}
               </button>
             );
          })}
        </div>
      </div>

      {/* Trailing Dropdown (Mock) */}
      <div className="hidden sm:block ml-4 flex-shrink-0 relative">
         <select 
           className="appearance-none bg-[#1a1a1a] border border-white/[0.08] text-zinc-100 text-[13px] rounded-lg pl-3 pr-8 py-1.5 w-[140px] focus:outline-none focus:border-white/[0.2] cursor-pointer"
           defaultValue="popular"
         >
           <option value="popular">Sort: Popular</option>
           <option value="recent">Sort: Recent</option>
           <option value="rating">Sort: Top Rated</option>
         </select>
         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
