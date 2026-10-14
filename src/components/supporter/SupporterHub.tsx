import React, { useState } from 'react';
import { HeartHandshake, Package, MessageSquare, ArrowRight, ShieldCheck, Users, CheckCircle } from 'lucide-react';
import { VolunteerModal } from './VolunteerModal';
import { MaterialsRequestModal } from './MaterialsRequestModal';
import { CommunityRequestModal } from './CommunityRequestModal';
import { LGAName } from '../../types';

interface SupporterHubProps {
  isVolunteerOpen: boolean;
  setIsVolunteerOpen: (open: boolean) => void;
  isCommunityOpen: boolean;
  setIsCommunityOpen: (open: boolean) => void;
  communityDefaultLGA?: LGAName;
}

export const SupporterHub: React.FC<SupporterHubProps> = ({
  isVolunteerOpen,
  setIsVolunteerOpen,
  isCommunityOpen,
  setIsCommunityOpen,
  communityDefaultLGA,
}) => {
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const [lastSubmissionNotice, setLastSubmissionNotice] = useState<string | null>(null);

  const handleSubmitted = (msg: string) => {
    setLastSubmissionNotice(msg);
    setTimeout(() => setLastSubmissionNotice(null), 6000);
  };

  return (
    <section id="supporter-hub" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#008751] font-heading">
              CITIZEN PARTICIPATION & GRASSROOTS ACTION
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] font-heading tracking-tight text-balance">
            Be Part of the Conversation
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed text-balance">
            Connect with the campaign, express your interest in grassroots volunteering, request approved campaign collateral, or submit a localized community issue for legislative review.
          </p>

          {lastSubmissionNotice && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-[#064E3B] font-semibold flex items-center justify-center gap-2 animate-in fade-in">
              <CheckCircle className="w-4 h-4 text-[#008751]" />
              <span>{lastSubmissionNotice}</span>
            </div>
          )}
        </div>

        {/* 3-Column Interactive Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card A: Volunteer */}
          <div className="bg-[#F8F7F2] rounded-3xl p-8 border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#E7F3EC] text-[#008751] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#008751] font-heading">
                Grassroots Action
              </span>
              <h3 className="text-xl font-bold font-heading text-[#102A43] mt-1">
                Volunteer with Us
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Join our volunteer units across Adavi, Ajaokuta, Ogori-Magongo, Okehi, and Okene. Support voter education, community outreach, and logistics.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsVolunteerOpen(true)}
                className="w-full py-3.5 px-5 rounded-xl bg-[#008751] hover:bg-[#064E3B] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Register as a Volunteer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card B: Campaign Materials */}
          <div className="bg-[#F8F7F2] rounded-3xl p-8 border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Package className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 font-heading">
                Official Collateral
              </span>
              <h3 className="text-xl font-bold font-heading text-[#102A43] mt-1">
                Campaign Materials
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Order official posters, senatorial policy manifestos, badges, and lapel emblems for distribution at your community meetings or market associations.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsMaterialsOpen(true)}
                className="w-full py-3.5 px-5 rounded-xl bg-[#102A43] hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Materials</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card C: Community Voice */}
          <div className="bg-[#F8F7F2] rounded-3xl p-8 border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#E7F3EC] text-[#064E3B] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] font-heading">
                Constituent Casework
              </span>
              <h3 className="text-xl font-bold font-heading text-[#102A43] mt-1">
                Community Voice
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Directly submit local road repair requests, primary school facility issues, or healthcare needs to help prioritize senatorial motions and interventions.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsCommunityOpen(true)}
                className="w-full py-3.5 px-5 rounded-xl bg-[#064E3B] hover:bg-[#008751] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit a Community Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Data Protection Trust Note */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#008751] shrink-0" />
          <span>
            Citizen communications are handled strictly in accordance with Nigerian data protection principles (NDPA 2023).
          </span>
        </div>
      </div>

      {/* Modals */}
      <VolunteerModal
        isOpen={isVolunteerOpen}
        onClose={() => setIsVolunteerOpen(false)}
        onSubmitted={() => handleSubmitted('Volunteer registration received and logged.')}
      />
      <MaterialsRequestModal
        isOpen={isMaterialsOpen}
        onClose={() => setIsMaterialsOpen(false)}
        onSubmitted={() => handleSubmitted('Materials requisition logged successfully.')}
      />
      <CommunityRequestModal
        isOpen={isCommunityOpen}
        defaultLGA={communityDefaultLGA}
        onClose={() => setIsCommunityOpen(false)}
        onSubmitted={() => handleSubmitted('Community casework request logged.')}
      />
    </section>
  );
};
