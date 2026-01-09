import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ShopSection from "@/components/ShopSection";
import FeaturedProduct from "@/components/FeaturedProduct";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { getProducts, getCollections } from "@/lib/shopify";

export default async function Home() {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections(),
  ]);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="relative w-full max-w-md h-screen bg-white dark:bg-background-dark overflow-hidden flex flex-col shadow-2xl border-x border-gray-100 dark:border-slate-800">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden pb-10 no-scrollbar bg-white dark:bg-[#0f172a]">
          <Hero />
          <CategoryGrid />
          <ShopSection initialProducts={products} collections={collections} />
          <FeaturedProduct />
          <Newsletter />
          <Footer />
        </main>
        <CartDrawer />
      </div>
    </div>
  );
}
