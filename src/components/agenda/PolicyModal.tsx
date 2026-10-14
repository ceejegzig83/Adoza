import React, { useEffect, useRef } from 'react';
import { X, CheckCircle, Scale, AlertCircle, Bookmark, Share2 } from 'lucide-react';
import { AgendaPolicy } from '../../types';

interface PolicyModalProps {
  policy: AgendaPolicy | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policy, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!policy) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    modalRef.current?.focus();
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [policy, onClose]);

  if (!policy) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 z-10 overflow-hidden flex flex-col max-h-[90vh] focus:outline-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-[#102A43] text-white p-6 sm:p-8 relative">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] font-heading">
              {policy.categoryLabel}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 id="policy-modal-title" className="text-xl sm:text-2xl font-bold font-heading text-white">
            {policy.title}
          </h2>

          <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
            <Bookmark className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Target: {Array.isArray(policy.targetLGAs) ? policy.targetLGAs.join(', ') : 'All 5 LGAs of Kogi Central'}</span>
            <span>·</span>
            <span className="text-emerald-400 font-medium">Proposed Policy Framework</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-[#202B33]">
          {/* Legislative Scope Clarification Banner */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <Scale className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-amber-950">Constitutional Legislative Mandate:</strong>{' '}
              {policy.legislativeContext}
            </div>
          </div>

          <div>
            <h3 className="font-bold font-heading text-[#102A43] text-sm uppercase tracking-wider text-slate-500 mb-1">
              01. The Community Need
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {policy.communityNeed}
            </p>
          </div>

          <div>
            <h3 className="font-bold font-heading text-[#102A43] text-sm uppercase tracking-wider text-slate-500 mb-1">
              02. Proposed Senatorial Action
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {policy.proposedAction}
            </p>
          </div>

          <div>
            <h3 className="font-bold font-heading text-[#102A43] text-sm uppercase tracking-wider text-slate-500 mb-2">
              03. Measurable Progress Indicators
            </h3>
            <ul className="space-y-2">
              {policy.progressIndicators.map((indicator, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-[#008751] shrink-0 mt-0.5" />
                  <span>{indicator}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold font-heading text-[#102A43] text-sm uppercase tracking-wider text-slate-500 mb-1">
              04. Citizen Feedback & Public Accountability
            </h3>
            <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
              {policy.publicAccountabilityMethod}
            </p>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>Status: Proposed Agenda (Subject to Campaign Approval)</span>
            <span>Updated: {policy.lastUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
