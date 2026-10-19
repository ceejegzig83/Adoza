import React from 'react';
import { ArrowRight, MapPin, ShieldCheck, Activity, Building2, Shield, GraduationCap, Users2, Landmark, Camera } from 'lucide-react';
import { LegacyProject } from '../../types';
import { LEGACY_IMAGE_ASSETS } from '../../assets/legacyImages';

interface LegacyCardProps {
  project: LegacyProject;
  onSelect: (project: LegacyProject) => void;
}

const getCategoryIcon = (category: LegacyProject['category']) => {
  switch (category) {
    case 'healthcare':
      return <Activity className="w-5 h-5 text-[#008751]" />;
    case 'infrastructure':
      return <Building2 className="w-5 h-5 text-[#008751]" />;
    case 'security':
      return <Shield className="w-5 h-5 text-[#008751]" />;
    case 'youth':
      return <GraduationCap className="w-5 h-5 text-[#008751]" />;
    case 'women':
      return <Users2 className="w-5 h-5 text-[#008751]" />;
    case 'institutions':
      return <Landmark className="w-5 h-5 text-[#008751]" />;
    default:
      return <ShieldCheck className="w-5 h-5 text-[#008751]" />;
  }
};

export const LegacyCard: React.FC<LegacyCardProps> = ({ project, onSelect }) => {
  const imageSrc = LEGACY_IMAGE_ASSETS[project.id] || project.imageUrl;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top Visual Graphic / Real Project Photo Container */}
        <div className="relative h-48 bg-gradient-to-br from-[#064E3B] to-[#0B6B46] flex flex-col justify-between overflow-hidden">
          {imageSrc ? (
            <>
              <img
                src={imageSrc}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              {/* Contrast Scrim for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
            </>
          ) : (
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                  <pattern id={`card-pattern-${project.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="12" cy="12" r="1.5" fill="#D4AF37" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#card-pattern-${project.id})`} />
              </svg>
            </div>
          )}

          {/* Top Unboxed Metadata */}
          <div className="relative z-10 p-5 flex items-center justify-between text-xs text-white">
            <span className="font-bold uppercase tracking-wider font-heading text-[#D4AF37] drop-shadow-xs">
              {project.categoryLabel}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-100 bg-black/50 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              Verified Record
            </span>
          </div>

          {/* Icon Badge & Highlight Metric */}
          <div className="relative z-10 p-5 pt-0 flex items-end justify-between">
            <div className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white shadow-xs">
              {getCategoryIcon(project.category)}
            </div>
            {project.highlightMetric && (
              <div className="text-right bg-black/60 backdrop-blur-xs px-3 py-1 rounded-lg border border-white/20">
                <span className="text-base sm:text-lg font-extrabold text-white font-heading tabular-nums">
                  {project.highlightMetric.value}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          {/* Clean Unboxed Metadata Line with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              {project.location.split('(')[0].trim()}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.tenurePeriod}</span>
          </div>

          <h3 className="text-lg font-bold text-[#102A43] font-heading group-hover:text-[#008751] transition-colors leading-snug">
            {project.title}
          </h3>

          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
            {project.summary}
          </p>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onSelect(project)}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#008751] hover:text-[#064E3B] transition-colors cursor-pointer py-2 focus-visible:outline-hidden"
        >
          <span>View Public Record</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <span className="text-[11px] text-slate-400 font-medium">
          Source: Official Gazette
        </span>
      </div>
    </div>
  );
};
