import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../../data/gallery';
import { GalleryLightbox } from './GalleryLightbox';
import { MediaItem } from '../../types';
import { Camera, Calendar, MapPin, Play, ZoomIn } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Public Service',
  'Healthcare',
  'Infrastructure',
  'Community Engagement',
  'Speeches',
];

export const MediaGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <section className="py-20 bg-[#F8F7F2] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#008751] font-heading">
              MEDIA & ARCHIVAL DOCUMENTARY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] font-heading tracking-tight">
            Moments, Milestones & Public Service
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Explore photographic and broadcast documentation of official project inspections, summits with royal traditional custodians, and public engagements.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none" role="tablist">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#008751] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-200 group cursor-pointer flex flex-col justify-between"
            >
              {/* Media Preview Box */}
              <div className="relative aspect-4/3 bg-gradient-to-br from-[#064E3B] to-[#102A43] p-6 flex flex-col justify-between text-white overflow-hidden">
                {/* Architectural pattern background */}
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <defs>
                      <pattern id={`gallery-pattern-${item.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="10" height="10" fill="#D4AF37" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#gallery-pattern-${item.id})`} />
                  </svg>
                </div>

                <div className="relative z-10 flex items-center justify-between text-xs text-emerald-200">
                  <span className="font-bold text-[#D4AF37] uppercase tracking-wider font-heading">
                    {item.category}
                  </span>
                  {item.type === 'video' && (
                    <span className="px-2 py-0.5 rounded-md bg-black/50 text-white font-mono text-[10px] flex items-center gap-1">
                      <Play className="w-2.5 h-2.5" />
                      {item.duration}
                    </span>
                  )}
                </div>

                <div className="relative z-10 flex items-center justify-center my-auto">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#008751] transition-all shadow-md">
                    {item.type === 'video' ? (
                      <Play className="w-5 h-5 ml-0.5" />
                    ) : (
                      <ZoomIn className="w-5 h-5" />
                    )}
                  </div>
                </div>

                <div className="relative z-10 text-[11px] text-emerald-100 flex items-center justify-between">
                  <span>{item.location}</span>
                  <span>{item.date}</span>
                </div>
              </div>

              {/* Caption Card */}
              <div className="p-5">
                <h3 className="font-bold font-heading text-sm text-[#102A43] group-hover:text-[#008751] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <GalleryLightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
};
