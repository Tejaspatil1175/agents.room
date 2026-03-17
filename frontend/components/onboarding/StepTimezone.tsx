"use client";

import { useState, useEffect, useMemo } from "react";

interface StepTimezoneProps {
  value: string;
  onChange: (tz: string) => void;
}

const commonTimezones = [
  { id: "America/Los_Angeles", city: "Los Angeles", offset: "UTC-08:00" },
  { id: "America/Denver", city: "Denver", offset: "UTC-07:00" },
  { id: "America/Chicago", city: "Chicago", offset: "UTC-06:00" },
  { id: "America/New_York", city: "New York", offset: "UTC-05:00" },
  { id: "America/Sao_Paulo", city: "São Paulo", offset: "UTC-03:00" },
  { id: "Europe/London", city: "London", offset: "UTC+00:00" },
  { id: "Europe/Paris", city: "Paris", offset: "UTC+01:00" },
  { id: "Europe/Berlin", city: "Berlin", offset: "UTC+01:00" },
  { id: "Asia/Jerusalem", city: "Jerusalem", offset: "UTC+02:00" },
  { id: "Europe/Moscow", city: "Moscow", offset: "UTC+03:00" },
  { id: "Asia/Dubai", city: "Dubai", offset: "UTC+04:00" },
  { id: "Asia/Kolkata", city: "Mumbai", offset: "UTC+05:30" },
  { id: "Asia/Dhaka", city: "Dhaka", offset: "UTC+06:00" },
  { id: "Asia/Bangkok", city: "Bangkok", offset: "UTC+07:00" },
  { id: "Asia/Singapore", city: "Singapore", offset: "UTC+08:00" },
  { id: "Asia/Shanghai", city: "Shanghai", offset: "UTC+08:00" },
  { id: "Asia/Tokyo", city: "Tokyo", offset: "UTC+09:00" },
  { id: "Asia/Seoul", city: "Seoul", offset: "UTC+09:00" },
  { id: "Australia/Sydney", city: "Sydney", offset: "UTC+10:00" },
  { id: "Pacific/Auckland", city: "Auckland", offset: "UTC+12:00" },
];

export default function StepTimezone({ value, onChange }: StepTimezoneProps) {
  const [search, setSearch] = useState("");
  
  // Auto-detect timezone on mount
  useEffect(() => {
    if (!value) {
      try {
        const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Find if localTz exists in our common list
        const found = commonTimezones.find(t => t.id === localTz);
        if (found) {
           onChange(found.id);
        } else {
           // If not in our 20 commons, add it to the top temporarily or just select the ID
           // For simplicity in this UI, we just select the ID. Real apps might append it to the list.
           onChange(localTz);
        }
      } catch (e) {
        // fallback
        onChange("America/New_York");
      }
    }
  }, [value, onChange]);

  const filteredTimezones = useMemo(() => {
    if (!search) return commonTimezones;
    return commonTimezones.filter(tz => 
      tz.city.toLowerCase().includes(search.toLowerCase()) || 
      tz.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Ensure the current value is always visible even if it's not in the common list (rare edge case)
  const displayList = useMemo(() => {
     let list = [...filteredTimezones];
     if (value && !list.find(t => t.id === value) && !search) {
       list.unshift({ id: value, city: value.split('/').pop()?.replace('_', ' ') || value, offset: "Auto" });
     }
     return list;
  }, [filteredTimezones, value, search]);

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">When should your agents run?</h2>
        <p className="text-sm text-zinc-500">Your agents will use this timezone for all scheduled runs.</p>
      </div>

      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-zinc-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-zinc-200 bg-white text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all duration-150"
          placeholder="Search timezone..."
        />
      </div>

      <div className="max-h-[320px] overflow-y-auto pr-1 space-y-1 custom-scrollbar">
        {displayList.map((tz) => {
          const isSelected = value === tz.id;
          
          return (
            <div
              key={tz.id}
              onClick={() => onChange(tz.id)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all border ${
                isSelected 
                  ? "bg-zinc-50 border-zinc-200 border-l-2 border-l-emerald-500" 
                  : "bg-transparent border-transparent hover:bg-zinc-50 hover:border-zinc-200"
              }`}
            >
              <div>
                <div className={`font-semibold text-[14px] ${isSelected ? 'text-zinc-900' : 'text-zinc-700'}`}>
                  {tz.city}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-[13px] text-zinc-400 font-medium tracking-wide">
                  {tz.offset}
                </span>
                {isSelected ? (
                  <div className="text-emerald-500 flex-shrink-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 flex-shrink-0 object-contain"></div> // Placeholder to maintain width
                )}
              </div>
            </div>
          );
        })}
        {displayList.length === 0 && (
          <div className="text-center py-6 text-sm text-zinc-500">
            No timezones found for &quot;{search}&quot;
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e4e4e7;
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #d4d4d8;
        }
      `}} />
    </div>
  );
}
