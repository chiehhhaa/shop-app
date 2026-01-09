"use client";

import React, { useSyncExternalStore } from "react";
import { useCartStore } from "@/lib/store";

export default function Header() {
  const { totalItems, toggleCart } = useCartStore();
  const mounted = useSyncExternalStore(
    (callback) => {
      const timeout = setTimeout(callback, 0);
      return () => clearTimeout(timeout);
    },
    () => true,
    () => false
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-sm border-b border-gray-100 dark:border-slate-800">
      <div className="h-1 w-full"></div>
      <div className="flex items-center justify-between px-5 py-3.5 max-w-md mx-auto">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          mock.shop
        </h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-700 dark:text-white transition-colors">
            <span className="material-symbols-outlined text-[24px]">
              search
            </span>
          </button>
          <button
            onClick={toggleCart}
            className="relative flex items-center justify-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-700 dark:text-white transition-colors group"
          >
            <span className="material-symbols-outlined text-[24px]">
              shopping_bag
            </span>
            {mounted && totalItems() > 0 && (
              <span className="absolute top-1.5 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-900 dark:bg-white text-[9px] font-bold text-white dark:text-slate-900">
                {totalItems()}
              </span>
            )}
          </button>
          <button className="flex items-center justify-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-700 dark:text-white transition-colors">
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
