import React, { useState } from 'react';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { BiographySection } from './components/about/BiographySection';
import { LegacySection } from './components/legacy/LegacySection';
import { AgendaSection } from './components/agenda/AgendaSection';
import { FacebookFeed } from './components/media/FacebookFeed';
import { NewsSection } from './components/news/NewsSection';
import { MediaGallery } from './components/gallery/MediaGallery';
import { SupporterHub } from './components/supporter/SupporterHub';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { LegalModal, LegalModalType } from './components/modals/LegalModals';
import { AdminDemoPortal } from './components/admin/AdminDemoPortal';
import { LGAName } from './types';

export default function App() {
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [communityDefaultLGA, setCommunityDefaultLGA] = useState<LGAName>('Okene');
  const [legalModalType, setLegalModalType] = useState<LegalModalType>(null);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);

  const handleOpenCommunityVoice = (lga?: LGAName) => {
    if (lga) setCommunityDefaultLGA(lga);
    setIsCommunityOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F2] text-[#202B33]">
      {/* 01. Announcement Bar */}
      <AnnouncementBar />

      {/* 02. Responsive Sticky Top Navigation */}
      <Navbar
        onOpenVolunteerModal={() => setIsVolunteerOpen(true)}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
      />

      <main className="flex-1">
        {/* 03. Hero Section (55% narrative / 45% portrait) */}
        <HeroSection onOpenVolunteerModal={() => setIsVolunteerOpen(true)} />

        {/* 04. Biography & Public Service Timeline */}
        <BiographySection />

        {/* 05. The GYB Legacy (2016–2024) */}
        <LegacySection />

        {/* 06. Kogi Central Senatorial Vision (5-LGA Interactive Framework) */}
        <AgendaSection onOpenCommunityVoice={handleOpenCommunityVoice} />

        {/* 07. Facebook & Live Media Feed (3 Switchable Modes & Video Showcase) */}
        <FacebookFeed />

        {/* 08. News & Press Center (Search, Filters, Featured Story) */}
        <NewsSection />

        {/* 09. Media Gallery & Video Showcase */}
        <MediaGallery />

        {/* 10. Supporter & Volunteer Hub (3 Interactive Cards) */}
        <SupporterHub
          isVolunteerOpen={isVolunteerOpen}
          setIsVolunteerOpen={setIsVolunteerOpen}
          isCommunityOpen={isCommunityOpen}
          setIsCommunityOpen={setIsCommunityOpen}
          communityDefaultLGA={communityDefaultLGA}
        />

        {/* 11. Contact & Campaign Office Section */}
        <ContactSection />
      </main>

      {/* 12. Footer & Legal Disclaimers */}
      <Footer
        onOpenLegalModal={(type) => setLegalModalType(type)}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
      />

      {/* Legal Compliance Modals (NDPA 2023, Terms, Accessibility, Electoral Disclaimer) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Campaign Secretariat Demo Console */}
      <AdminDemoPortal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
      />
    </div>
  );
}
