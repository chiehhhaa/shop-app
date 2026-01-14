import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Sidebar from "@/components/Sidebar";
import SearchDrawer from "@/components/SearchDrawer";
import ProductList from "@/components/ProductList";
import { getProducts } from "@/lib/shopify";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="flex justify-center h-dvh bg-gray-50 dark:bg-slate-950">
      <div className="relative w-full max-w-md h-dvh bg-white dark:bg-background-dark overflow-hidden flex flex-col shadow-2xl border-x border-gray-100 dark:border-slate-800">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden pb-10 no-scrollbar bg-white dark:bg-[#0f172a]">
          <div className="px-5 py-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Shop All
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              Explore our complete collection of premium products.
            </p>
            <ProductList products={products} />
          </div>
          <Footer />
        </main>
        <CartDrawer />
        <Sidebar />
        <SearchDrawer />
      </div>
    </div>
  );
}
