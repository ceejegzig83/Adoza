import React from 'react';
import { ArrowRight, ChevronRight, Award, Compass, Shield, Users } from 'lucide-react';
import { GYB_PORTRAIT_URL } from '../../assets/portrait';

interface HeroSectionProps {
  onOpenVolunteerModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenVolunteerModal }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8F7F2] via-[#E7F3EC]/40 to-[#F8F7F2] py-14 lg:py-20 border-b border-slate-200/60">
      {/* Subtle architectural geometric accent lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#008751" strokeWidth="0.5" strokeOpacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (55% desktop width): Narrative & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Unboxed Kicker / Eyebrow */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#008751]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#008751] font-heading">
                EXPERIENCE • SERVICE • THE FUTURE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102A43] font-heading tracking-tight leading-[1.08] text-balance mb-6">
              Moving Kogi Central <span className="text-[#008751]">Forward.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-[#202B33]/85 leading-relaxed max-w-2xl mb-8">
              Explore the documented public service record of <strong className="font-semibold text-[#102A43]">Alhaji Yahaya Adoza Bello</strong>, review eight years of transformative infrastructure from his tenure as Governor of Kogi State (2016–2024), and discover proposed priorities for the people of Kogi Central.
            </p>

            {/* Primary & Secondary Action Cluster */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#agenda"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-[#008751] hover:bg-[#064E3B] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Explore the Senatorial Vision</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#legacy"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-[#102A43] bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs hover:border-[#008751] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Explore the Legacy</span>
                <ChevronRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onOpenVolunteerModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#0B6B46] hover:text-[#064E3B] hover:bg-[#E7F3EC] rounded-xl transition-colors cursor-pointer"
              >
                <span>Join the Community</span>
              </button>
            </div>

            {/* Verifiable Stewardship Milestones Strip */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-xl">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] font-heading tabular-nums">
                  2016–2024
                </p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Executive Governor of Kogi State
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] font-heading tabular-nums">
                  5 LGAs
                </p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Kogi Central Senatorial District
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] font-heading tabular-nums">
                  6 Pillars
                </p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Legislative & Oversight Agenda
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (45% desktop width): Authorized Executive Portrait Container */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer Decorative Gold Border Frame */}
              <div className="relative rounded-3xl p-2 bg-gradient-to-tr from-[#064E3B] via-[#0B6B46] to-[#D4AF37] shadow-xl">
                <div className="relative rounded-[22px] overflow-hidden bg-[#064E3B] text-white p-8 sm:p-10 flex flex-col items-center justify-between min-h-[460px] text-center">
                  {/* Top Emblem Seal */}
                  <div className="w-full flex justify-between items-center text-xs text-emerald-200 uppercase tracking-widest font-heading border-b border-emerald-700/60 pb-3">
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Public Record
                    </span>
                    <span>Kogi State, Nigeria</span>
                  </div>

                  {/* Official Executive Portrait & Identity */}
                  <div className="my-6 flex flex-col items-center">
                    <div className="relative">
                      {/* Outer Gold Accent Ring */}
                      <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-[#D4AF37] via-[#FDF8E7] to-[#D4AF37] shadow-2xl">
                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-emerald-900 relative">
                          <img
                            src={GYB_PORTRAIT_URL}
                            alt="Alhaji Yahaya Adoza Bello — Former Executive Governor of Kogi State"
                            className="w-full h-full object-cover object-top"
                            loading="eager"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                      {/* Small GYB Monogram Tag on Frame */}
                      <div className="absolute -bottom-2 -right-1 px-2.5 py-0.5 rounded-full bg-[#064E3B] text-[#D4AF37] border-2 border-[#D4AF37] text-[10px] font-bold font-heading shadow-md">
                        GYB
                      </div>
                    </div>

                    <h2 className="mt-4 text-xl sm:text-2xl font-bold font-heading text-white tracking-tight">
                      ALHAJI YAHAYA ADOZA BELLO
                    </h2>
                    <p className="text-xs sm:text-sm text-emerald-200 mt-1 font-medium">
                      Executive Governor of Kogi State (2016–2024)
                    </p>
                    <p className="text-[11px] text-[#D4AF37] mt-0.5 font-medium tracking-wide">
                      All Progressives Congress (APC)
                    </p>
                  </div>

                  {/* Bottom Verification Note & Attribution */}
                  <div className="w-full bg-emerald-950/60 rounded-xl p-3 border border-emerald-700/40 text-[11px] text-emerald-100 flex items-center justify-between text-left">
                    <div>
                      <p className="font-semibold text-white">Constitutional Stewardship</p>
                      <p className="text-[10px] text-emerald-300">Documented Projects & Gazette References</p>
                    </div>
                    <Award className="w-5 h-5 text-[#D4AF37] shrink-0 ml-2" />
                  </div>
                </div>
              </div>

              {/* Verified Ribbon Badge below card */}
              <div className="mt-3 text-center">
                <span className="text-[11px] text-slate-500 font-medium">
                  Official Record & Proposed Senatorial Representation Platform
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
