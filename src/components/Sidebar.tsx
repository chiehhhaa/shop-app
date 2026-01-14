"use client";

import React from "react";
import { useCartStore } from "@/lib/store";
import Link from "next/link";

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar, user, logout, login } = useCartStore();
  const mounted = React.useSyncExternalStore(
    (callback) => {
      const timeout = setTimeout(callback, 0);
      return () => clearTimeout(timeout);
    },
    () => true,
    () => false
  );

  if (!mounted) return null;

  const handleLogin = () => {
    login("Demo User", "user@example.com");
  };

  return (
    <>
      {/* Overlay - Absolute within container */}
      <div
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeSidebar}
      />

      {/* Sidebar - App Drawer style */}
      <div
        className={`absolute inset-y-0 left-0 w-[85%] bg-white dark:bg-slate-950 z-50 transform transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[20px_0_50px_rgba(0,0,0,0.1)] rounded-r-4xl border-r border-slate-100 dark:border-slate-800 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-7 pt-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Discover
            </h2>
            <button
              onClick={closeSidebar}
              className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all active:scale-90"
            >
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          </div>

          {/* User Profile Card */}
          <div className="px-6 mb-8">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100/50 dark:border-slate-800/50">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 font-bold text-lg">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">
                        Verified Customer
                      </p>
                      <p className="font-bold text-slate-900 dark:text-white truncate max-w-[120px]">
                        {user.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 text-xs font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg transition-colors active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      logout
                    </span>
                    SIGN OUT
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">
                    Join us for periodic drops and exclusive collections.
                  </p>
                  <button
                    onClick={handleLogin}
                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold text-sm shadow-lg shadow-slate-200 dark:shadow-none transition-transform active:scale-95"
                  >
                    Login (Demo User)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto px-6 pb-10 custom-scrollbar">
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[2px] mb-4 ml-1">
                Main Menu
              </p>

              <Link
                href="/"
                onClick={closeSidebar}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white">
                    home
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">
                    Home
                  </span>
                </div>
                <span className="material-symbols-outlined text-slate-300 text-sm">
                  chevron_right
                </span>
              </Link>

              <Link
                href="/products"
                onClick={closeSidebar}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white">
                    grid_view
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">
                    Shop All
                  </span>
                </div>
                <span className="material-symbols-outlined text-slate-300 text-sm">
                  chevron_right
                </span>
              </Link>

              <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-900">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[2px] mb-4 ml-1">
                  Collections
                </p>
                <div className="space-y-2">
                  {["Men", "Women", "Kids", "Accessories"].map((col) => (
                    <Link
                      key={col}
                      href="/products"
                      onClick={closeSidebar}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group"
                    >
                      <span className="font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">
                        {col}
                      </span>
                      <span className="material-symbols-outlined text-slate-300 text-sm">
                        chevron_right
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Social / Info Footer */}
          <div className="p-8 border-t border-slate-50 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950 mt-auto rounded-br-4xl">
            <div className="flex gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                <span className="material-symbols-outlined text-[16px]">
                  public
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                <span className="material-symbols-outlined text-[16px]">
                  notifications
                </span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">
              &copy; 2026 MOCK SHOP STUDIO. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
