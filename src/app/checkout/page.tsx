"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCartStore } from "@/lib/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import SearchDrawer from "@/components/SearchDrawer";
import CartDrawer from "@/components/CartDrawer";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0) {
    return (
      <div className="flex justify-center h-dvh bg-gray-50 dark:bg-slate-950">
        <div className="relative w-full max-w-md h-dvh bg-white dark:bg-background-dark overflow-hidden flex flex-col shadow-2xl border-x border-gray-100 dark:border-slate-800 p-8 items-center justify-center text-center">
          <h2 className="text-2xl font-bold mb-4">Your bag is empty</h2>
          <button
            onClick={() => router.push("/")}
            className="text-blue-500 font-medium"
          >
            Go back to shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center h-dvh bg-gray-50 dark:bg-slate-950">
      <div className="relative w-full max-w-md h-dvh bg-white dark:bg-background-dark overflow-hidden flex flex-col shadow-2xl border-x border-gray-100 dark:border-slate-800">
        <Header />
        <main className="flex-1 overflow-y-auto no-scrollbar p-6">
          <h1 className="text-2xl font-bold mb-6">Confirm Order</h1>

          {/* Items Summary */}
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="relative w-16 h-20 rounded bg-slate-100 overflow-hidden flex-none">
                  {item.featuredImage && (
                    <Image
                      src={item.featuredImage.url}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">{item.title}</h3>
                  <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold">
                  $
                  {(
                    parseFloat(item.variants.edges[0].node.price.amount) *
                    item.quantity
                  ).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Pricing Details */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3 mb-8">
            <div className="flex justify-between text-sm text-slate-500">
              <span>Subtotal</span>
              <span>${totalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500">
              <span>Shipping</span>
              <span className="text-green-500 font-medium">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2">
              <span>Total</span>
              <span>${totalPrice().toFixed(2)}</span>
            </div>
          </div>

          {/* Delivery Note */}
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl mb-8">
            <h4 className="text-sm font-bold mb-1">Standard Delivery</h4>
            <p className="text-xs text-slate-500">
              Estimated delivery: 3-5 business days
            </p>
          </div>

          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-full font-bold shadow-lg transition-transform active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : "Confirm & Pay"}
          </button>
        </main>
        <Footer />
        <CartDrawer />
        <Sidebar />
        <SearchDrawer />
      </div>
    </div>
  );
}
