import React from "react";

export default function Footer() {
  return (
    <footer className="px-5 py-8 border-t border-gray-100 dark:border-slate-800 text-center">
      <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white mb-4">
        mock.shop
      </h2>
      <div className="flex justify-center gap-6 text-sm text-slate-500 mb-8">
        <a
          href="#"
          className="hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          About
        </a>
        <a
          href="#"
          className="hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          Terms
        </a>
        <a
          href="#"
          className="hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          Shipping
        </a>
        <a
          href="#"
          className="hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          Returns
        </a>
      </div>
      <p className="text-xs text-slate-400">© 2023 Mock Shop Inc.</p>
    </footer>
  );
}
