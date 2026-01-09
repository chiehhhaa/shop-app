import React from "react";
import Image from "next/image";

export default function CategoryGrid() {
  const categories = [
    {
      name: "Men",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBv0e9mb9Zzpa7JSUEjsIS2Za7Qw-6bxPrLLsH1VW_FljCEFfFjMU1p4I9T7PNfU8Htyu6IAEy7ula9MLze-_XhylgL-1RWDecZpp7pEkx7L9wo_ZpKMyedxYZszceERhlnjZhtEszo-CZ2k68Dh9Nj78jgScA4U74MABnjvmqGnFpsr9wDnJ-Wovo0FD_Ku6JKyXjxQQHzwtmq8NumDuzGipZYxsRYO-DydNopVO6lzXzMhqpil51yoIQIeHqCE6jSbYvxmoZqq2Y",
      href: "#",
    },
    {
      name: "Women",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAvRsoEiH5eHN9x-wVbYA3nL6dnURyxhMeh-cW6qudCezNZ1uEDwDVpMkguDplxPAzAoa8OYMAPN8oWVZmOv9XNRyzbLyIZL93K_IRyWM1ForH05hgDYKbPBrc2sosarOoriS6hyVnKoN5cGF1nz1alCUjFsjDehiCkFGFbkL9PUgm0Qr4HwAxnvs50BU3VN7HSlQXkFhHocYZ3m1ng0k8ehRr80gLFtRqT_y-CCGF65MnDQj1hU8oUbfULrypf3WA8FZWwUq8lo18",
      href: "#",
    },
  ];

  return (
    <div className="px-5 py-10 border-b border-gray-100 dark:border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium text-slate-900 dark:text-white">
          Shop by Category
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <a
            key={category.name}
            href={category.href}
            className="group relative aspect-[1.4] overflow-hidden rounded bg-gray-100 dark:bg-slate-800"
          >
            <Image
              src={category.image}
              alt={`${category.name}'s fashion`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              sizes="(max-width: 768px) 50vw, 50vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
              <span className="text-white font-medium text-lg tracking-wide drop-shadow-md">
                {category.name}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
