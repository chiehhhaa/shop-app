"use client";

import { useSyncExternalStore, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/lib/store";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, totalPrice } =
    useCartStore();

  const mounted = useSyncExternalStore(
    (callback) => {
      const timeout = setTimeout(callback, 0);
      return () => clearTimeout(timeout);
    },
    () => true,
    () => false
  );

  useEffect(() => {
    const mainContent = document.querySelector("main");
    if (isOpen && mainContent) {
      mainContent.style.overflow = "hidden";
    } else if (mainContent) {
      mainContent.style.overflow = "";
    }
    return () => {
      if (mainContent) mainContent.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Overlay - Absolute within the mobile container */}
      <div
        className={`absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-xs transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleCart}
      />

      {/* Drawer - Sliding from right, contained within mobile container */}
      <div
        className={`absolute top-0 right-0 z-50 h-full w-[85%] bg-white dark:bg-slate-900 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0 visible" : "translate-x-full invisible"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-5">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                Bag
              </h2>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                {items.length}
              </span>
            </div>
            <button
              onClick={toggleCart}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 transition-all hover:text-slate-900 dark:hover:text-white"
            >
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto no-scrollbar py-2">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center px-8 pb-20">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-4xl text-slate-200 dark:text-slate-700 font-light">
                    shopping_bag
                  </span>
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                  Your bag is empty
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-light leading-relaxed">
                  Look like you haven&apos;t added anything to your bag yet.
                </p>
                <button
                  onClick={toggleCart}
                  className="mt-8 px-10 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold rounded-full hover:opacity-90 transition-opacity"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {items.map((item) => (
                  <div key={item.id} className="p-6 transition-colors">
                    <div className="flex gap-4">
                      <div className="relative aspect-4/5 w-20 flex-none overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        {item.featuredImage && (
                          <Image
                            src={item.featuredImage.url}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col justify-between py-0.5">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="text-[13px] font-medium text-slate-900 dark:text-white leading-tight">
                              {item.title}
                            </h3>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-slate-300 hover:text-red-500 dark:text-slate-600 dark:hover:text-red-400 transition-colors flex-none"
                            >
                              <span className="material-symbols-outlined text-lg">
                                delete
                              </span>
                            </button>
                          </div>
                          <p className="mt-1 text-[13px] font-semibold text-slate-900 dark:text-white">
                            $
                            {parseFloat(
                              item.variants.edges[0].node.price.amount
                            ).toFixed(2)}{" "}
                            {item.variants.edges[0].node.price.currencyCode}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center bg-slate-50 dark:bg-slate-800/50 rounded-full px-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                remove
                              </span>
                            </button>
                            <span className="w-6 text-center text-[12px] font-bold tabular-nums text-slate-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                add
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-slate-100 dark:border-slate-800 p-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] bg-white dark:bg-slate-900">
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-slate-500 dark:text-slate-400">
                    Subtotal
                  </span>
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    ${totalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-slate-500 dark:text-slate-400">
                    Shipping
                  </span>
                  <span className="text-[13px] font-medium text-slate-900 dark:text-white uppercase tracking-wider">
                    Calculated at next step
                  </span>
                </div>
              </div>
              <button className="group relative w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4.5 rounded-full text-sm font-bold shadow-xl shadow-slate-200 dark:shadow-none transition-all active:scale-[0.96] overflow-hidden">
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <span>Checkout</span>
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
