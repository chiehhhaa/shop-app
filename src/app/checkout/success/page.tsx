"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import SearchDrawer from "@/components/SearchDrawer";
import CartDrawer from "@/components/CartDrawer";

export default function SuccessPage() {
  return (
    <div className="flex justify-center h-dvh bg-gray-50 dark:bg-slate-950">
      <div className="relative w-full max-w-md h-dvh bg-white dark:bg-background-dark overflow-hidden flex flex-col shadow-2xl border-x border-gray-100 dark:border-slate-800">
        <Header />
        <main className="flex-1 overflow-y-auto no-scrollbar flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <span className="material-symbols-outlined text-4xl text-green-600 dark:text-green-400">
              check_circle
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs">
            Thank you for your purchase. We&apos;ve sent a confirmation email to
            your inbox.
          </p>
          <div className="w-full space-y-4">
            <Link
              href="/"
              className="block w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-full font-bold shadow-lg transition-transform active:scale-95"
            >
              Continue Shopping
            </Link>
            <p className="text-xs text-slate-400">Order #39201-9430</p>
          </div>
        </main>
        <Footer />
        <CartDrawer />
        <Sidebar />
        <SearchDrawer />
      </div>
    </div>
  );
}
