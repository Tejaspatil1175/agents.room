"use client";

import { useState, useEffect } from "react";
import MarketplaceFilters, { Template } from "./MarketplaceFilters";
import MarketplaceCard from "./MarketplaceCard";
import { api } from "@/lib/api";

const fallbackTemplates: Template[] = [
{ id: "1", name: "Morning Finance Briefing", description: "Get daily crypto, stocks, and market news summarized and sent to your phone every morning.", category: "Finance", channel: "whatsapp", installs: 4200, rating: 4.8, author: "agents.room", icon: "💹", featured: true },
{ id: "2", name: "Job Hunt Agent", description: "Scrapes top job boards daily, filters by your criteria, and sends matching listings to your inbox.", category: "Jobs", channel: "email", installs: 3100, rating: 4.7, author: "rahul_dev", icon: "🎯", featured: true },
{ id: "3", name: "Research Digest", description: "Searches the web on any topic you choose and sends a clean daily summary.", category: "Research", channel: "email", installs: 2800, rating: 4.6, author: "agents.room", icon: "🔍", featured: false },
{ id: "4", name: "Health Coach Agent", description: "Sends personalized daily workout plans and meal ideas based on your fitness goals.", category: "Health", channel: "whatsapp", installs: 1900, rating: 4.5, author: "fitlife_ai", icon: "🏃", featured: false },
{ id: "5", name: "LinkedIn Content Writer", description: "Drafts 3 LinkedIn posts daily on your chosen topics, ready to copy and post.", category: "Content", channel: "email", installs: 2100, rating: 4.4, author: "contentpro", icon: "✍️", featured: false },
{ id: "6", name: "Crypto Alert Agent", description: "Monitors price movements and sends instant alerts when your coins hit target prices.", category: "Finance", channel: "telegram", installs: 3400, rating: 4.9, author: "crypto_watcher", icon: "📈", featured: true },
];

const CATEGORIES = ["All", "Research", "Finance", "Health", "Content", "Jobs", "Web3", "Productivity"];

function mapApiToTemplate(a: any): Template {
return {
id: a._id,
name: a.name,
description: `${a.type} agent`,
category: a.type.charAt(0).toUpperCase() + a.type.slice(1),
channel: a.channel,
installs: 0,
rating: 5.0,
author: a.user_id?.name || "Community",
icon: "🤖",
featured: false,
};
}

export default function MarketplaceShell() {
const [templates, setTemplates] = useState<Template[]>(fallbackTemplates);
const [searchQuery, setSearchQuery] = useState("");
const [activeCategory, setActiveCategory] = useState("All");
const [installedIds, setInstalledIds] = useState<Set<string>>(new Set());

useEffect(() => {
async function load() {
try {
const res: any = await api.marketplace.list();
if (res?.data?.length > 0) {
setTemplates([...fallbackTemplates, ...res.data.map(mapApiToTemplate)]);
}
} catch {
// keep fallback templates
}
}
load();
}, []);

const handleInstall = async (id: string) => {
try {
await api.marketplace.install(id, { schedule_cron: "0 8 * * *", channel: "email" });
} catch {
// continue regardless
}
setInstalledIds((prev) => {
const next = new Set(prev);
next.add(id);
return next;
});
};

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "All" || template.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 pt-10 pb-24">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <h1 className="text-[22px] font-bold text-zinc-100 tracking-tight mb-1">
            Marketplace
          </h1>
          <p className="text-[14px] text-zinc-500">
            Discover and install agents built by the community.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-zinc-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 bg-[#1a1a1a] border border-white/[0.08] text-zinc-100 placeholder:text-zinc-600 pl-9 pr-3 py-1 rounded-lg text-[13px] focus:outline-none focus:border-white/[0.15] transition-colors"
          />
        </div>
      </div>

      {/* Filters */}
      <MarketplaceFilters 
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSetCategory={setActiveCategory}
      />

      {/* Results Count */}
      <div className="text-[13px] text-zinc-600 mb-6 font-medium">
        Showing {filteredTemplates.length} agent{filteredTemplates.length !== 1 && 's'}
      </div>

      {/* Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template, i) => (
            <MarketplaceCard
              key={template.id}
              template={template}
              index={i}
              isInstalled={installedIds.has(template.id)}
              onInstall={handleInstall}
            />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-[15px] font-semibold text-zinc-300 mb-1">No agents found</h3>
          <p className="text-[13px] text-zinc-500">We couldn't find any agents matching your search.</p>
        </div>
      )}

    </div>
  );
}
