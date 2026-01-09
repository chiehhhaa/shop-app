"use client";

import { useState } from "react";
import {
  ShopifyProduct,
  ShopifyCollection,
  getProductsByCollection,
} from "@/lib/shopify";
import ProductList from "./ProductList";

interface ShopSectionProps {
  initialProducts: ShopifyProduct[];
  collections: ShopifyCollection[];
}

export default function ShopSection({
  initialProducts,
  collections,
}: ShopSectionProps) {
  const [activeCollection, setActiveCollection] = useState<string>("all");
  const [products, setProducts] = useState<ShopifyProduct[]>(initialProducts);
  const [loading, setLoading] = useState(false);

  const handleCollectionChange = async (handle: string) => {
    setActiveCollection(handle);
    setLoading(true);
    try {
      if (handle === "all") {
        setProducts(initialProducts);
      } else {
        const newProducts = await getProductsByCollection(handle);
        setProducts(newProducts);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10">
      <div className="px-5 mb-8 overflow-x-auto no-scrollbar flex gap-2">
        <button
          onClick={() => handleCollectionChange("all")}
          className={`flex-none px-6 py-2 rounded-full text-sm font-medium transition-all ${
            activeCollection === "all"
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          All Items
        </button>
        {collections.map((collection) => (
          <button
            key={collection.id}
            onClick={() => handleCollectionChange(collection.handle)}
            className={`flex-none px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeCollection === collection.handle
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {collection.title}
          </button>
        ))}
      </div>

      <div
        className={`transition-opacity duration-300 ${
          loading ? "opacity-50" : "opacity-100"
        }`}
      >
        <ProductList products={products} />
      </div>
    </div>
  );
}
