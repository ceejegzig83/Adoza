import React, { useState } from 'react';
import { LGAName, AgendaPolicy } from '../../types';
import { KOGI_CENTRAL_LGAS, AGENDA_POLICIES } from '../../data/agenda';
import { AgendaTabs } from './AgendaTabs';
import { PolicyCard } from './PolicyCard';
import { PolicyModal } from './PolicyModal';
import { MapPin, Building, Sparkles, Scale, Info, ArrowUpRight } from 'lucide-react';

interface AgendaSectionProps {
  onOpenCommunityVoice: (defaultLGA?: LGAName) => void;
}

export const AgendaSection: React.FC<AgendaSectionProps> = ({ onOpenCommunityVoice }) => {
  const [selectedLGA, setSelectedLGA] = useState<LGAName>('Okene');
  const [selectedPolicy, setSelectedPolicy] = useState<AgendaPolicy | null>(null);

  const activeLGAData = KOGI_CENTRAL_LGAS.find((lga) => lga.id === selectedLGA) || KOGI_CENTRAL_LGAS[0];

  // Filter policies relevant to this LGA or tagged 'All'
  const relevantPolicies = AGENDA_POLICIES.filter((p) => {
    if (p.targetLGAs === 'All') return true;
    return Array.isArray(p.targetLGAs) && p.targetLGAs.includes(selectedLGA);
  });

  return (
    <section id="agenda" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#008751] font-heading">
              KOGI CENTRAL SENATORIAL DISTRICT
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] font-heading tracking-tight">
            A Vision for Kogi Central
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Explore proposed legislative priorities for federal representation, community empowerment, economic diversification, and infrastructure oversight across the five constituent local government councils.
          </p>
        </div>

        {/* 5-LGA Interactive Tab Navigation */}
        <div className="mb-10">
          <AgendaTabs
            selectedLGA={selectedLGA}
            onSelectLGA={(lga) => setSelectedLGA(lga)}
          />
        </div>

        {/* 2-Column Responsive Layout: LGA Profile vs Policy Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (4 cols): LGA Local Profile Card */}
          <div className="lg:col-span-4 bg-[#F8F7F2] rounded-3xl p-6 sm:p-8 border border-slate-200 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008751] font-heading">
                Constituency Profile
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {activeLGAData.estimatedWards} Electoral Wards
              </span>
            </div>

            <div className="mt-5">
              <h3 className="text-2xl font-bold font-heading text-[#102A43]">
                {activeLGAData.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#008751]" />
                Headquarters: <strong className="text-slate-700 font-semibold">{activeLGAData.headquarters}</strong>
              </p>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeLGAData.summary}
            </p>

            <div className="mt-6 pt-5 border-t border-slate-200">
              <p className="text-xs font-bold text-[#102A43] uppercase tracking-wider font-heading mb-3">
                Key Economic & Social Sectors
              </p>
              <div className="space-y-2">
                {activeLGAData.keySectors.map((sector, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008751]" />
                    <span>{sector}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-[#E7F3EC] border border-[#0B6B46]/20">
              <p className="text-xs font-bold text-[#064E3B] uppercase tracking-wide font-heading">
                Localized Legislative Priority
              </p>
              <p className="mt-1 text-xs text-slate-700 leading-relaxed">
                {activeLGAData.featuredFocus}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenCommunityVoice(selectedLGA)}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#064E3B] hover:bg-[#008751] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <span>Submit Issue for {selectedLGA}</span>
              <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          {/* Right Column (8 cols): Relevant Policy Proposals */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2">
              <span>Displaying legislative pillars for <strong className="text-slate-800">{activeLGAData.name}</strong></span>
              <span>{relevantPolicies.length} Active Proposals</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relevantPolicies.map((policy) => (
                <PolicyCard
                  key={policy.id}
                  policy={policy}
                  onSelect={(p) => setSelectedPolicy(p)}
                />
              ))}
            </div>

            {/* Senatorial Legal & Oversight Powers Disclaimer */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
              <Scale className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 font-semibold">Legislative Distinction & Constitutionality:</strong>{' '}
                Under the Constitution of the Federal Republic of Nigeria, a Senator exercises legislative, budgetary appropriation, and oversight powers in the National Assembly. While a Senator sponsors constituency development projects and champions federal agency interventions, execution of federal executive mandates resides with statutory ministries and commissions.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Detail Modal */}
      <PolicyModal
        policy={selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
      />
    </section>
  );
};
