import React from "react";
import Image from "next/image";
import { ShopifyProduct } from "@/lib/shopify";

export default function ProductList({
  products,
}: {
  products: ShopifyProduct[];
}) {
  return (
    <div className="py-10">
      <div className="px-5 flex items-end justify-between mb-6">
        <div>
          <h3 className="text-xl font-medium text-slate-900 dark:text-white">
            Latest Drops
          </h3>
          <p className="text-sm text-slate-500 mt-1">Fresh from the studio.</p>
        </div>
        <a
          className="text-sm font-medium text-slate-900 dark:text-white underline decoration-1 underline-offset-4 hover:text-slate-600"
          href="#"
        >
          View all
        </a>
      </div>
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-5 pb-6 no-scrollbar">
        {products.map((product) => {
          const price = product.variants.edges[0].node.price;
          return (
            <div
              key={product.id}
              className="flex-none w-[260px] snap-center group"
            >
              <div className="relative w-full aspect-3/4 overflow-hidden rounded bg-gray-100 dark:bg-slate-800 mb-3">
                {product.featuredImage ? (
                  <Image
                    src={product.featuredImage.url}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 260px, 260px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-slate-700">
                    <span className="material-symbols-outlined text-4xl text-slate-400">
                      image
                    </span>
                  </div>
                )}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-10 h-10 rounded-full bg-white text-slate-900 shadow-lg flex items-center justify-center hover:bg-slate-50">
                    <span className="material-symbols-outlined text-xl">
                      add
                    </span>
                  </button>
                </div>
              </div>
              <h4 className="text-base font-medium text-slate-900 dark:text-white truncate">
                {product.title}
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                ${parseFloat(price.amount).toFixed(2)} {price.currencyCode}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
