import React from 'react';
import { LGAName } from '../../types';
import { KOGI_CENTRAL_LGAS } from '../../data/agenda';
import { MapPin } from 'lucide-react';

interface AgendaTabsProps {
  selectedLGA: LGAName;
  onSelectLGA: (lga: LGAName) => void;
}

export const AgendaTabs: React.FC<AgendaTabsProps> = ({ selectedLGA, onSelectLGA }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Kogi Central Local Government Areas">
      {KOGI_CENTRAL_LGAS.map((lga) => {
        const isSelected = selectedLGA === lga.id;
        return (
          <button
            key={lga.id}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectLGA(lga.id)}
            className={`px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold font-heading whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              isSelected
                ? 'bg-[#008751] text-white shadow-md'
                : 'bg-white text-slate-700 hover:text-[#008751] hover:bg-slate-100/80 border border-slate-200'
            }`}
          >
            <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
            <span>{lga.name.replace(' Local Government Area', '')}</span>
          </button>
        );
      })}
    </div>
  );
};
