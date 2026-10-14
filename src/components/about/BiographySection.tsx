import React, { useState } from 'react';
import { Calendar, Award, BookOpen, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { GYB_PORTRAIT_URL } from '../../assets/portrait';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  milestone: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2015 – 2016',
    title: 'Historic Assumption of Office as Governor',
    description: 'Elected on the platform of the All Progressives Congress (APC). Sworn in January 2016 as the youngest democratically elected Governor in Nigeria’s Fourth Republic at age 40, pioneering the New Direction blueprint focused on civil service reforms, security stabilization, and revenue modernization.',
    milestone: 'Inauguration & New Direction Blueprint Charter',
  },
  {
    year: '2019',
    title: 'Democratic Re-election for a Second Term',
    description: 'Secured a decisive statewide mandate in November 2019 for a second 4-year term, with widespread support across Kogi Central, Kogi East, and Kogi West senatorial districts.',
    milestone: 'Statewide Electoral Mandate & Cabinet Consolidation',
  },
  {
    year: '2020',
    title: 'Establishment of CUSTECH Osara & Affirmative Governance',
    description: 'Signed the law establishing the Confluence University of Science and Technology (CUSTECH) at Osara, while instituting an affirmative action policy ensuring women were elected Vice Chairpersons across all 21 Local Government Councils.',
    milestone: 'Higher Education Charter & Grassroots Gender Parity',
  },
  {
    year: '2022',
    title: 'Flagship Infrastructure Commissioning by the Presidency',
    description: 'President Muhammadu Buhari visited Kogi State on a historic working tour to commission landmark mega-projects: the Reference Hospital Okene, Ganaja Flyover in Lokoja, and modernized specialist hospitals.',
    milestone: 'Presidency Working Tour & Infrastructure Handover',
  },
  {
    year: '2024',
    title: 'Orderly Democratic Transition & Governance Stewardship',
    description: 'Completed two full constitutional terms (January 2016 – January 2024) and successfully oversaw the peaceful, democratic transition of executive power to his successor, Governor Ahmed Usman Ododo.',
    milestone: 'Peaceful Constitutional Handover',
  },
];

export const BiographySection: React.FC = () => {
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(0);

  return (
    <section id="about" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#008751] font-heading">
              EXECUTIVE BIOGRAPHY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] font-heading tracking-tight">
            The Man Behind the Public Record
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Explore the public service journey of Alhaji Yahaya Adoza Bello, his eight-year stewardship as Executive Governor of Kogi State from 2016 to 2024, and the verifiable milestones associated with his administration.
          </p>
        </div>

        {/* 2-Column Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Biography Narrative */}
          <div className="lg:col-span-6 space-y-6 text-[#202B33]/90 text-base leading-relaxed">
            {/* Executive Portrait & Profile Lockup */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 rounded-2xl bg-[#F8F7F2] border border-slate-200 shadow-2xs">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-[#D4AF37] shadow-sm bg-slate-900">
                <img
                  src={GYB_PORTRAIT_URL}
                  alt="Alhaji Yahaya Adoza Bello"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-center sm:text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#008751] font-heading">
                  Executive Profile
                </span>
                <h3 className="text-lg font-bold font-heading text-[#102A43]">
                  Alhaji Yahaya Adoza Bello
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Executive Governor of Kogi State (2016–2024)
                </p>
                <div className="mt-2.5 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] text-slate-600">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-medium">B.Sc & MBA (ABU Zaria)</span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-medium">Born in Okene LGA</span>
                </div>
              </div>
            </div>

            <p>
              Born in Agassa, Okene Local Government Area of Kogi State, <strong className="text-[#102A43] font-semibold">Alhaji Yahaya Adoza Bello</strong> earned his degree in Accounting and a Master of Business Administration (MBA) from the prestigious Ahmadu Bello University (ABU), Zaria. Prior to entering public governance, he built an extensive professional background as an accountant, financial analyst, and entrepreneur.
            </p>

            <p>
              In January 2016, following the sudden passing of the APC gubernatorial candidate Prince Abubakar Audu and subsequent constitutional determinations, Bello assumed office as the fourth democratically elected Governor of Kogi State. At 40, he represented a historic generational transition in Nigerian executive leadership, championing youthful inclusion and civil institutional overhaul.
            </p>

            <div className="p-5 rounded-2xl bg-[#E7F3EC]/70 border border-[#0B6B46]/20">
              <h3 className="font-bold font-heading text-[#064E3B] text-base mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#008751]" />
                Constitutional Tenure & Governance Scope
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                As Governor between January 27, 2016 and January 27, 2024, he led the executive administration of Kogi State, stewarding a population exceeding 4 million across 21 LGAs. Key governance pillars included state security integration, fiscal transparency under the World Bank SFTAS framework, and transformative healthcare investments.
              </p>
            </div>

            <p>
              Today, with his proposed legislative vision for the Kogi Central Senatorial District, Alhaji Yahaya Bello seeks to channel his executive experience, extensive federal relationships, and deep constituency ties into vibrant, accountable representation in the Senate of the Federal Republic of Nigeria.
            </p>

            {/* Credibility Citations */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="font-medium">Official References:</span>
              <span className="inline-flex items-center gap-1">
                Kogi State Official Gazettes (2016–2024)
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                Independent National Electoral Commission (INEC)
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Public Service Timeline */}
          <div className="lg:col-span-6 bg-[#F8F7F2] p-6 sm:p-8 rounded-3xl border border-slate-200">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#008751]" />
                <h3 className="text-lg font-bold text-[#102A43] font-heading">
                  Public Service Timeline
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                2015 – 2024 Milestones
              </span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#CBD5E1]">
              {TIMELINE_EVENTS.map((event, index) => {
                const isSelected = selectedTimelineIndex === index;
                return (
                  <div
                    key={event.year}
                    onClick={() => setSelectedTimelineIndex(index)}
                    className={`relative cursor-pointer transition-all duration-200 group ${
                      isSelected
                        ? 'p-4 rounded-xl bg-white shadow-sm border border-[#008751]/30'
                        : 'p-2 rounded-lg hover:bg-white/60'
                    }`}
                  >
                    {/* Bullet marker */}
                    <span
                      className={`absolute -left-[27px] top-4 w-3.5 h-3.5 rounded-full border-2 transition-colors ${
                        isSelected
                          ? 'bg-[#008751] border-white ring-2 ring-[#008751]'
                          : 'bg-white border-slate-400 group-hover:border-[#008751]'
                      }`}
                    />

                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-bold text-[#008751] font-heading">
                        {event.year}
                      </span>
                      <span className="text-[11px] text-slate-500 italic">
                        {event.milestone}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#102A43] font-heading mt-1">
                      {event.title}
                    </h4>

                    {isSelected && (
                      <p className="mt-2 text-xs text-slate-600 leading-relaxed animate-in fade-in duration-200">
                        {event.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
              <span>Click any milestone to view official notes</span>
              <span className="text-[#008751] font-semibold">2 Terms Served</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
