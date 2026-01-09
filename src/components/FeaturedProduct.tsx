import Image from "next/image";

export default function FeaturedProduct() {
  return (
    <div className="px-5 pb-10">
      <div className="relative w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-slate-900 group">
        <div className="grid grid-cols-1">
          <div className="aspect-4/3 w-full relative overflow-hidden">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA41W4jBiNib7VjU8gpX1GvB-h1ZIF8uy9vhOvQbMIe4RTjQEC97Yhry3fjn8_icCFe9lLJdnsWYiDEP-riOIdwgvEO5dtDALJiH9ZMVl0OTEUX64sUR3OiHUtjSdFMrB4gGxYycT5DgGuAhKarJdS66cj5RjIgxyQm_6pBiqWHjNqIxtIuWSj4rkud5O62fohVoCqzYqaOzKmpWhPLB8Zklr0toxfGfQMejyvgFKe4VOam6dIgv0AwU0FwdhXwzd6jiSA6tJTdNHc"
              alt="Brown leather tote bag lifestyle"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-800">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">
                  Leather Daily Tote
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  Handcrafted from premium full-grain leather. Designed to age
                  beautifully with use.
                </p>
              </div>
              <span className="text-base font-medium text-slate-900 dark:text-white">
                $180
              </span>
            </div>
            <button className="w-full py-3 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded hover:border-slate-900 dark:hover:border-white transition-colors text-sm font-medium">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
