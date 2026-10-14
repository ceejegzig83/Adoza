import React, { useEffect, useRef } from 'react';
import { X, CheckCircle2, MapPin, Calendar, ExternalLink, ShieldCheck, Share2 } from 'lucide-react';
import { LegacyProject } from '../../types';

interface LegacyModalProps {
  project: LegacyProject | null;
  onClose: () => void;
}

export const LegacyModal: React.FC<LegacyModalProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    // Lock body scroll
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
  }, [project, onClose]);

  if (!project) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legacy-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 z-10 overflow-hidden flex flex-col max-h-[90vh] focus:outline-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="bg-[#064E3B] text-white p-6 sm:p-8 relative">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] font-heading">
              {project.categoryLabel}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Share project"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <h2 id="legacy-modal-title" className="text-xl sm:text-2xl font-bold font-heading text-white">
            {project.title}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-emerald-100">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              {project.location}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              {project.tenurePeriod}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-[#202B33] leading-relaxed">
          {project.highlightMetric && (
            <div className="p-4 rounded-2xl bg-[#E7F3EC] border border-[#0B6B46]/20 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#064E3B] uppercase tracking-wide">
                  Documented Impact
                </p>
                <p className="text-sm font-medium text-slate-700 mt-0.5">
                  {project.highlightMetric.label}
                </p>
              </div>
              <span className="text-2xl font-extrabold text-[#008751] font-heading tabular-nums ml-4">
                {project.highlightMetric.value}
              </span>
            </div>
          )}

          <div>
            <h3 className="font-bold font-heading text-[#102A43] text-base mb-2">
              Detailed Stewardship Record
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div>
            <h3 className="font-bold font-heading text-[#102A43] text-sm mb-3">
              Key Features & Operational Components
            </h3>
            <ul className="space-y-2.5">
              {project.keyFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#008751] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verification & Source Citation */}
          <div className="pt-4 border-t border-slate-200 bg-[#F8F7F2] -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 text-xs text-slate-600 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#064E3B] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#008751]" />
                <span>Verification Status: Verified Historical Record</span>
              </div>
              <span className="text-slate-400">Date: {project.sourceDate}</span>
            </div>
            <p className="text-slate-500">
              <strong className="text-slate-700">Official Source:</strong> {project.sourceTitle}
            </p>
            {project.completionDate && (
              <p className="text-slate-500">
                <strong className="text-slate-700">Milestone:</strong> {project.completionDate}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
