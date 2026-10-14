import React, { useEffect } from 'react';
import { X, ArrowRight, Shield, Award, BookOpen, Newspaper, PhoneCall, HeartHandshake } from 'lucide-react';
import { MAIN_NAV_ITEMS } from '../../data/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVolunteerModal: () => void;
  onOpenAdminPortal: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenVolunteerModal,
  onOpenAdminPortal,
}) => {
  // Lock background scroll when open & handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FFFFFF] shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-[#F8F7F2]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-xs bg-slate-900 shrink-0">
              <img
                src="/images/adoza-bello.jpg"
                alt="Alhaji Yahaya Adoza Bello"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#102A43] font-heading tracking-tight leading-tight">
                Alh. Yahaya Adoza Bello
              </span>
              <span className="text-[10px] text-[#008751] font-semibold">
                Kogi Central Senatorial Vision
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-5 flex-1 overflow-y-auto space-y-1">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Navigation
          </p>
          {MAIN_NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between px-3 py-3 rounded-lg text-sm font-semibold text-[#102A43] hover:bg-[#E7F3EC] hover:text-[#064E3B] transition-colors"
            >
              <span>{item.label}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>
          ))}

          <div className="pt-6 mt-6 border-t border-slate-100">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Citizen Actions
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenVolunteerModal();
              }}
              className="w-full text-left flex items-center justify-between px-3 py-3 rounded-lg text-sm font-semibold text-[#008751] hover:bg-[#E7F3EC] transition-colors"
            >
              <span className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4" />
                Register as Volunteer
              </span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenAdminPortal();
              }}
              className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                Campaign Admin Demo
              </span>
            </button>
          </div>
        </nav>

        <div className="p-5 border-t border-slate-100 bg-[#F8F7F2]">
          <a
            href="#supporter-hub"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#008751] text-white text-sm font-bold shadow-md hover:bg-[#064E3B] transition-all"
          >
            Join the Campaign
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="mt-3 text-center text-[11px] text-slate-500">
            APC • Kogi Central Senatorial Vision
          </p>
        </div>
      </div>
    </div>
  );
};
