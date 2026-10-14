import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck, Scale, Eye, FileText } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'accessibility' | 'disclaimer' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [type, onClose]);

  if (!type) return null;

  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacy Policy & Data Protection (NDPA 2023)',
          icon: <ShieldCheck className="w-5 h-5 text-[#008751]" />,
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                <strong>1. Legislative Framework:</strong> This platform is governed in accordance with the provisions of the <em>Nigeria Data Protection Act, 2023 (NDPA)</em>, and other relevant data privacy regulations in the Federal Republic of Nigeria.
              </p>
              <p>
                <strong>2. Scope of Data Collected:</strong> We collect personal details (such as names, telephone contacts, email addresses, and Local Government Area affiliations) solely when voluntarily submitted through our volunteer forms, campaign material requisitions, and community voice casework channels.
              </p>
              <p>
                <strong>3. Purpose of Processing:</strong> Data collected is utilized strictly for grassroots mobilization, civic coordination, senatorial policy research, and responding to direct constituent inquiries. We do not sell, rent, or trade constituent data to commercial third parties.
              </p>
              <p>
                <strong>4. Security & Retention:</strong> All submissions are encrypted in transit and stored on secure servers with restricted administrative access. Data is retained only for the duration of the senatorial consultation cycle or until deletion is formally requested by the subject.
              </p>
              <p>
                <strong>5. Data Subject Rights:</strong> Constituents may at any time request access to their submitted records, rectification of details, or immediate erasure by contacting <code>privacy@gybcampaign.ng</code>.
              </p>
            </div>
          ),
        };
      case 'terms':
        return {
          title: 'Website Terms of Use',
          icon: <FileText className="w-5 h-5 text-[#008751]" />,
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                <strong>1. Acceptance of Terms:</strong> By accessing and utilizing the GYB Official Campaign & Legacy Website, you agree to comply with these terms, applicable Nigerian electoral laws, and cybercrime legislation.
              </p>
              <p>
                <strong>2. Content Accuracy & Editorial Standards:</strong> All documented projects, gazette dates, and historical records reflect the 2016–2024 executive administration of Alhaji Yahaya Adoza Bello. Proposed senatorial policy documents represent draft consultative frameworks subject to campaign ratification.
              </p>
              <p>
                <strong>3. Intellectual Property:</strong> Monograms, official insignia, and policy briefing documents published on this domain are the intellectual property of the campaign and its authorized creators. Unauthorized commercial reproduction is prohibited.
              </p>
              <p>
                <strong>4. Prohibited Uses:</strong> Users shall not submit false or defamatory memorandums, deploy malicious software, or attempt unauthorized penetration of the platform’s administrative infrastructure.
              </p>
            </div>
          ),
        };
      case 'accessibility':
        return {
          title: 'Accessibility Statement (WCAG 2.2 AA)',
          icon: <Eye className="w-5 h-5 text-[#008751]" />,
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                <strong>Our Commitment:</strong> We believe democratic engagement should be accessible to every citizen, including individuals with visual, auditory, cognitive, or motor impairments.
              </p>
              <p>
                <strong>Standards Implemented:</strong> This platform is engineered to meet the <em>Web Content Accessibility Guidelines (WCAG) 2.2 Level AA</em> benchmarks:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>High contrast color ratios (exceeding 4.5:1 for body copy and 3:1 for large headers).</li>
                <li>Comprehensive keyboard navigation with visible focus outlines on all interactive controls.</li>
                <li>Screen-reader accessible ARIA roles, semantic markup, and dialog focus trapping.</li>
                <li>Strict adherence to <code>prefers-reduced-motion</code> for users sensitive to animations.</li>
              </ul>
              <p>
                If you encounter any accessibility barrier, please notify our accessibility officer at <code>accessibility@gybcampaign.ng</code>.
              </p>
            </div>
          ),
        };
      case 'disclaimer':
        return {
          title: 'Political & Electoral Disclaimer',
          icon: <Scale className="w-5 h-5 text-[#D4AF37]" />,
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                <strong>1. Platform Purpose:</strong> This digital platform is operated by the authorized media and political strategy bureau of Alhaji Yahaya Adoza Bello (GYB) to document his public service record (2016–2024) and present consultative policy proposals for the Kogi Central Senatorial District.
              </p>
              <p>
                <strong>2. Officeholder Status:</strong> Alhaji Yahaya Adoza Bello concluded his constitutional two terms as Executive Governor of Kogi State on January 27, 2024. Nothing on this website implies that he currently occupies executive office.
              </p>
              <p>
                <strong>3. Electoral Compliance:</strong> All political advocacy and campaign representations are subject to the guidelines of the Independent National Electoral Commission (INEC) and the constitution of the All Progressives Congress (APC).
              </p>
              <p>
                <strong>4. Legislative Representation:</strong> Statements regarding senatorial representation reflect proposed legislative priorities in the National Assembly. A Senator advocates for federal budgetary appropriations and oversight but does not independently execute federal ministry capital contracts.
              </p>
            </div>
          ),
        };
      default:
        return { title: '', icon: null, body: null };
    }
  };

  const { title, icon, body } = getContent();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 z-10 overflow-hidden flex flex-col max-h-[88vh] focus:outline-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="bg-[#102A43] text-white p-6 sm:p-7 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            {icon}
            <h2 id="legal-modal-title" className="text-lg sm:text-xl font-bold font-heading text-white">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto">
          {body}

          <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#008751] text-white text-xs font-bold hover:bg-[#064E3B] transition-colors"
            >
              Close Notice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
