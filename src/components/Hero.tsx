import React from "react";

export default function Hero() {
  return (
    <div className="relative w-full aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB901dy-iO9y_wqk0sJfxy0C15d19JUz5c8xHxda02Xw91V5tXadVpukomQKhLq2qSOazh1ebiQWmvAibTjnqLIRGtLMTA9gfQvsIfrb-vJBJ-wgwZ57i3c4jN6onFCJsLTiEYbRVE2IQQKeq6Lz4j-BzTb0SKeDdseng-HJ4UvPadotO40xUscGRfIG-fHTx50f2Ru6OCaB3x2Bjbl1iaY2V3cjhFkcizdgfhiqBYbVpIy1YYI_CIYWuxlDLdR1DN0pwuAv7VY6U8")',
        }}
      ></div>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 flex flex-col justify-end items-start p-6 pb-12 text-white">
        <h2 className="text-4xl font-medium leading-tight mb-4 drop-shadow-sm">
          Summer <br />
          Collection
        </h2>
        <p className="text-lg font-light mb-6 text-white/90">
          Curated styles for the season.
        </p>
        <button className="bg-white text-slate-900 px-8 py-3 rounded text-sm font-medium hover:bg-gray-100 transition-colors shadow-sm">
          Shop Collection
        </button>
      </div>
    </div>
  );
}
