import React, { useEffect, useRef } from 'react';
import { X, Calendar, MapPin, Tag, Play } from 'lucide-react';
import { MediaItem } from '../../types';

interface GalleryLightboxProps {
  item: MediaItem | null;
  onClose: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ item, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;
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
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative bg-[#102A43] text-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-700 z-10 overflow-hidden flex flex-col focus:outline-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Media Canvas View */}
        <div className="relative aspect-video bg-gradient-to-br from-[#064E3B] via-[#04281E] to-[#102A43] flex items-center justify-center text-center border-b border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors z-20 cursor-pointer shadow-md"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : item.type === 'video' ? (
            <div className="flex flex-col items-center p-8">
              <div className="w-16 h-16 rounded-full bg-[#008751] text-white flex items-center justify-center shadow-lg mb-3">
                <Play className="w-8 h-8 ml-1" />
              </div>
              <p className="text-sm font-semibold">{item.duration || 'Archived Broadcast'}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center max-w-md p-8">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-4">
                <span className="font-extrabold font-heading text-xl text-[#D4AF37]">GYB</span>
              </div>
              <p className="text-xs uppercase tracking-widest text-emerald-300 font-heading">
                Archival Milestone Documentation
              </p>
              <h3 className="text-lg font-bold mt-1 text-white">{item.title}</h3>
            </div>
          )}
        </div>

        {/* Details Footer */}
        <div className="p-6 sm:p-8 bg-[#0D2135] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-300">
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
              {item.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              {item.date}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              {item.location}
            </span>
          </div>

          <h2 id="lightbox-title" className="text-lg sm:text-xl font-bold font-heading text-white">
            {item.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
