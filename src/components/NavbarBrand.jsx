import React from 'react';
import { Wind } from 'lucide-react';

/**
 * Brand logo and title for the navigation bar.
 */
export function NavbarBrand() {
  return (
    <div className="flex items-center gap-3 shrink-0">
      <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 shadow-lg shadow-emerald-500/20 text-white font-bold">
        <Wind className="w-6 h-6 animate-pulse" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
            AeroGuardian
          </span>
          <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            GenAI Urban Assistant
          </span>
        </div>
        <p className="text-xs text-slate-400 hidden sm:block">
          Winter Smog Navigation, IAQ Hacks &amp; Low-Emission Living
        </p>
      </div>
    </div>
  );
}

export default NavbarBrand;
