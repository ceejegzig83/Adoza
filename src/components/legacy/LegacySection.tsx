import React, { useState } from 'react';
import { LEGACY_PROJECTS } from '../../data/legacy';
import { LegacyCard } from './LegacyCard';
import { LegacyModal } from './LegacyModal';
import { LegacyProject } from '../../types';
import { ShieldCheck, FileText } from 'lucide-react';

export const LegacySection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<LegacyProject | null>(null);

  return (
    <section id="legacy" className="py-20 bg-[#F8F7F2] border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#008751] font-heading">
                HISTORICAL STEWARDSHIP (2016–2024)
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] font-heading tracking-tight">
              The GYB Legacy
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Explore documented projects, policies, educational charters, and public-service milestones executed during his constitutional tenure as Executive Governor of Kogi State.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200 shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#008751]" />
            <span>All entries referenced to official state & federal gazettes</span>
          </div>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LEGACY_PROJECTS.map((project) => (
            <LegacyCard
              key={project.id}
              project={project}
              onSelect={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

        {/* Accountability Notice Footer Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#008751] shrink-0" />
            <p>
              <strong className="text-slate-800">Editorial Integrity Standard:</strong> Historical records reflect verified projects delivered between 2016 and 2024. Proposed legislative policies for Kogi Central are presented in the Senatorial Vision section below.
            </p>
          </div>
          <a
            href="#agenda"
            className="text-[#008751] font-bold hover:underline shrink-0"
          >
            Review Proposed Agenda →
          </a>
        </div>
      </div>

      {/* Accessible Detail Modal */}
      <LegacyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
