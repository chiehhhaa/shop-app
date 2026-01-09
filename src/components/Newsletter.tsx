import React from "react";

export default function Newsletter() {
  return (
    <div className="px-5 pb-10">
      <div className="relative w-full overflow-hidden rounded bg-slate-900 text-white">
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center mix-blend-overlay"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDIDo7CpKpPdLcJdtQ23inDPOpG1Ew85T61YeuTsk91U83Vwg98teLSx8UpYoaF9xeyj7ONCnezGaNnWNS3jdJniKyC-4sSr1bu1yrJUU1cAIjZH-3ghl9ThvohgqcDOG8pMG-xsGJQQEPRfm361LA5crf3_3O5w9m6VSt6BRfLMGjJ3OStvq46SHKAzUWj_G0NhKCV2iq2M15_WkIV6a1sXriHDCbO9Szpb8x3PNM2znZ8jRZfH3WzCU7ovF048dx_DouxaW7O4nc")',
          }}
        ></div>
        <div className="relative flex flex-col items-center justify-center px-8 py-14 text-center">
          <h3 className="text-2xl font-serif italic mb-2">Join the Club</h3>
          <p className="text-slate-300 text-sm mb-6 max-w-[240px] font-light">
            Exclusive access to new drops and special member-only pricing.
          </p>
          <div className="flex w-full max-w-xs gap-2">
            <input
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-white focus:border-white outline-none"
              placeholder="Email address"
              type="email"
            />
            <button className="bg-white text-slate-900 px-4 py-2 rounded text-sm font-medium hover:bg-slate-100 transition-colors whitespace-nowrap">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
