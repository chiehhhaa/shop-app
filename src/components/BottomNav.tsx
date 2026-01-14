"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/store";

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems, toggleCart, toggleSearch, toggleSidebar } =
    useCartStore();

  const mounted = React.useSyncExternalStore(
    (callback) => {
      const timeout = setTimeout(callback, 0);
      return () => clearTimeout(timeout);
    },
    () => true,
    () => false
  );

  const navItems = [
    { label: "Home", icon: "home", href: "/" },
    { label: "Search", icon: "search", onClick: toggleSearch },
    { label: "Bag", icon: "shopping_bag", onClick: toggleCart, isCart: true },
    { label: "Menu", icon: "menu", onClick: toggleSidebar },
  ];

  if (!mounted) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          if (item.href) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 gap-1 transition-colors ${
                  isActive
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[24px] ${
                    isActive ? "FILL" : ""
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          }

          return (
            <button
              key={item.label}
              onClick={item.onClick}
              className="flex flex-col items-center justify-center flex-1 gap-1 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors relative"
            >
              <span className="material-symbols-outlined text-[24px]">
                {item.icon}
              </span>
              <span className="text-[10px] font-medium">{item.label}</span>
              {item.isCart && totalItems() > 0 && (
                <span className="absolute top-0 right-1/4 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 dark:bg-white text-[9px] font-bold text-white dark:text-slate-900 border-2 border-white dark:border-slate-900">
                  {totalItems()}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
