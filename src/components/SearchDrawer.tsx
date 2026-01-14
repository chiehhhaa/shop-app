"use client";

import React, { useState } from "react";
import { useCartStore } from "@/lib/store";

export default function SearchDrawer() {
  const { isSearchOpen, closeSearch } = useCartStore();
  const [searchQuery, setSearchQuery] = useState("");

  const mounted = React.useSyncExternalStore(
    (callback) => {
      const timeout = setTimeout(callback, 0);
      return () => clearTimeout(timeout);
    },
    () => true,
    () => false
  );

  if (!mounted) return null;

  return (
    <>
      {/* Overlay - Absolute within container */}
      <div
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeSearch}
      />

      {/* Search Drawer - Top Down, Absolute */}
      <div
        className={`absolute inset-x-0 top-0 bg-white dark:bg-slate-950 z-50 transform transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-2xl rounded-b-4xl border-b border-slate-100 dark:border-slate-800 ${
          isSearchOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-md mx-auto p-7 pb-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 dark:group-focus-within:text-white transition-colors">
                search
              </span>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl py-4 pl-12 pr-5 text-sm font-medium focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus={isSearchOpen}
              />
            </div>
            <button
              onClick={closeSearch}
              className="w-11 h-11 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all active:scale-90"
            >
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[2px] mb-4 ml-1">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  "Summer T-Shirts",
                  "Denim Jeans",
                  "Oversized Hoodies",
                  "Leather Bags",
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-5 py-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all border border-slate-100 dark:border-slate-800"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[2px] mb-4 ml-1">
                Categories
              </p>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Tops", icon: "checkroom" },
                  { label: "Bottoms", icon: "apparel" },
                  { label: "Shoes", icon: "footprint" },
                  { label: "Accessory", icon: "watch_later" },
                ].map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => setSearchQuery(cat.label)}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-full aspect-square bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-all border border-slate-100 dark:border-slate-800">
                      <span className="material-symbols-outlined text-[20px]">
                        {cat.icon}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 transition-colors group-hover:text-slate-900 dark:group-hover:text-white">
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
