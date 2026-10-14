import React, { useEffect, useRef } from 'react';
import { X, Calendar, Clock, Share2, ExternalLink, Newspaper, Bookmark } from 'lucide-react';
import { NewsArticle } from '../../types';

interface NewsModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ article, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!article) return;
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
  }, [article, onClose]);

  if (!article) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="news-modal-title"
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
              {article.category}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Share article"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <h2 id="news-modal-title" className="text-xl sm:text-2xl font-bold font-heading text-white leading-snug">
            {article.title}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              {article.publishedAt}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              {article.readingTime}
            </span>
            {article.sourcePublisher && (
              <>
                <span>·</span>
                <span>Source: {article.sourcePublisher}</span>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-sm text-[#202B33] leading-relaxed">
          <p className="text-base font-medium text-slate-800 leading-relaxed italic border-l-2 border-[#008751] pl-4 py-1">
            {article.excerpt}
          </p>

          <div className="text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
            {article.content}
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <span>Press Directorate & Civic Engagement Bureau</span>
            {article.sourceUrl && (
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#008751] font-semibold hover:underline"
              >
                <span>Visit Official Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
