import React from 'react';
import { ArrowRight, Compass, CheckCircle2, Scale } from 'lucide-react';
import { AgendaPolicy } from '../../types';

interface PolicyCardProps {
  policy: AgendaPolicy;
  onSelect: (policy: AgendaPolicy) => void;
}

export const PolicyCard: React.FC<PolicyCardProps> = ({ policy, onSelect }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Unboxed Metadata Line */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <span className="font-bold text-[#008751] uppercase tracking-wider font-heading">
            {policy.categoryLabel}
          </span>
          <span aria-hidden="true">·</span>
          <span>Proposed Advocacy</span>
        </div>

        <h3 className="text-lg font-bold text-[#102A43] font-heading group-hover:text-[#008751] transition-colors leading-snug">
          {policy.title}
        </h3>

        <div className="mt-3 text-xs sm:text-sm text-slate-600 space-y-2">
          <p className="line-clamp-2">
            <strong className="text-slate-800 font-semibold">The Need:</strong> {policy.communityNeed}
          </p>
          <p className="line-clamp-2">
            <strong className="text-slate-800 font-semibold">Senatorial Action:</strong> {policy.proposedAction}
          </p>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onSelect(policy)}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#008751] hover:text-[#064E3B] transition-colors cursor-pointer py-1.5 focus-visible:outline-hidden"
        >
          <span>Read the Full Proposal</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <span className="text-[11px] text-slate-400">
          Senate Oversight
        </span>
      </div>
    </div>
  );
};
