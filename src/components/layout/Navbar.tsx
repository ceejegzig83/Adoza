import React, { useState, useEffect } from 'react';
import { Menu, ArrowRight } from 'lucide-react';
import { MAIN_NAV_ITEMS } from '../../data/navigation';
import { MobileMenu } from './MobileMenu';

interface NavbarProps {
  onOpenVolunteerModal: () => void;
  onOpenAdminPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenVolunteerModal,
  onOpenAdminPortal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
            : 'bg-white border-b border-slate-200 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element in display face with restrained gold accent) */}
          <a
            href="#"
            className="flex items-center gap-3 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#008751] rounded-lg shrink-0"
            aria-label="GYB Home"
          >
            <div className="w-10 h-10 rounded-xl bg-[#064E3B] text-white flex items-center justify-center font-extrabold font-heading text-lg border-2 border-[#D4AF37] shadow-sm group-hover:scale-105 transition-transform">
              GYB
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-[#102A43] font-heading leading-tight group-hover:text-[#008751] transition-colors">
                YAHAYA ADOZA BELLO
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Leadership • Legacy • Kogi Central
              </span>
            </div>
          </a>

          {/* Zone 2: Clean 4–5 single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            {MAIN_NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap shrink-0 hover:text-[#008751] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#008751] hover:after:w-full after:transition-all after:duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action (Join the Campaign) + Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenVolunteerModal}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs lg:text-sm font-bold text-white bg-[#008751] hover:bg-[#064E3B] rounded-xl shadow-xs hover:shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Join the Campaign</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Open primary menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenVolunteerModal={onOpenVolunteerModal}
        onOpenAdminPortal={onOpenAdminPortal}
      />
    </>
  );
};
