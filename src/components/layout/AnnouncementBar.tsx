import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#064E3B] text-white text-xs py-2 px-4 border-b border-[#0B6B46]/60">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
          <span className="font-medium tracking-wide">
            Official Digital Platform — Alh. Yahaya Adoza Bello (GYB)
          </span>
          <span className="hidden sm:inline text-emerald-300/60" aria-hidden="true">|</span>
          <span className="hidden sm:inline text-emerald-100">
            Public Service Record (2016–2024) • Kogi Central Engagement
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-emerald-200">
          <a
            href="#agenda"
            className="hover:text-white transition-colors underline decoration-[#D4AF37] underline-offset-2"
          >
            Explore 5-LGA Agenda
          </a>
          <span className="text-emerald-400/40" aria-hidden="true">·</span>
          <a
            href="#supporter-hub"
            className="hover:text-white transition-colors"
          >
            Volunteer Portal
          </a>
        </div>
      </div>
    </div>
  );
};
