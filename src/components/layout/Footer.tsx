import React from 'react';
import { FOOTER_NAV_COLUMNS } from '../../data/navigation';
import { CAMPAIGN_CONTACT_INFO } from '../../data/contact';
import { Shield, ShieldCheck, Scale, ExternalLink, Heart } from 'lucide-react';
import { LegalModalType } from '../modals/LegalModals';

interface FooterProps {
  onOpenLegalModal: (type: LegalModalType) => void;
  onOpenAdminPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalModal, onOpenAdminPortal }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#064E3B] text-white border-t border-[#0B6B46]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white text-[#064E3B] flex items-center justify-center font-extrabold font-heading text-xl border-2 border-[#D4AF37] shadow-sm">
                GYB
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-white font-heading">
                  ALHAJI YAHAYA ADOZA BELLO
                </span>
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                  Public Service • Leadership • Kogi Central
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-sm">
              Official digital platform documenting the governance stewardship of the 2016–2024 executive administration and advancing consultative legislative priorities for Kogi Central Senatorial District.
            </p>

            <div className="pt-2">
              <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-heading mb-2">
                Confirmed Public Channels
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-200">
                {CAMPAIGN_CONTACT_INFO.socials.map((soc, idx) => (
                  <a
                    key={idx}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors underline decoration-[#D4AF37]/50 underline-offset-2"
                  >
                    {soc.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Columns (3 cols) */}
          {FOOTER_NAV_COLUMNS.map((col, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] font-heading">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-xs text-emerald-100/90">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.href}
                      className="hover:text-white hover:underline transition-colors block py-0.5"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal & Compliance Notice Strip */}
        <div className="pt-8 border-t border-emerald-800/80 space-y-6">
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/40 text-[11px] sm:text-xs text-emerald-200/90 leading-relaxed flex items-start gap-3">
            <Scale className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Constitutional & Electoral Disclaimer:</strong> This platform is operated for public information, archival documentation, and constituent consultation regarding the proposed senatorial agenda for Kogi Central. Alhaji Yahaya Adoza Bello served as Executive Governor of Kogi State from 2016 to 2024 and does not currently occupy that executive office. All campaign advocacy conforms to the guidelines of the Independent National Electoral Commission (INEC) and the All Progressives Congress (APC).
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <button
                type="button"
                onClick={() => onOpenLegalModal('privacy')}
                className="hover:text-white underline decoration-emerald-500/60 cursor-pointer"
              >
                Privacy Notice (NDPA 2023)
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => onOpenLegalModal('terms')}
                className="hover:text-white underline decoration-emerald-500/60 cursor-pointer"
              >
                Terms of Use
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => onOpenLegalModal('accessibility')}
                className="hover:text-white underline decoration-emerald-500/60 cursor-pointer"
              >
                Accessibility (WCAG 2.2 AA)
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => onOpenLegalModal('disclaimer')}
                className="hover:text-white underline decoration-[#D4AF37] cursor-pointer text-[#D4AF37]"
              >
                Political Disclaimer
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={onOpenAdminPortal}
                className="hover:text-white text-emerald-400 font-mono text-[11px] cursor-pointer"
              >
                [Campaign Console Demo]
              </button>
            </div>

            <p className="text-[11px] text-emerald-400/80">
              © {currentYear} Alh. Yahaya Adoza Bello (GYB) Campaign & Legacy Platform.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
