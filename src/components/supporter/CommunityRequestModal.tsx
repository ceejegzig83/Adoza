import React, { useState, useEffect, useRef } from 'react';
import { X, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { LGAName, CommunityRequestSubmission } from '../../types';

interface CommunityRequestModalProps {
  isOpen: boolean;
  defaultLGA?: LGAName;
  onClose: () => void;
  onSubmitted: (data: CommunityRequestSubmission) => void;
}

export const CommunityRequestModal: React.FC<CommunityRequestModalProps> = ({
  isOpen,
  defaultLGA = 'Okene',
  onClose,
  onSubmitted,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [fullName, setFullName] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [lga, setLga] = useState<LGAName>(defaultLGA);
  const [topic, setTopic] = useState('Roads & Transportation Infrastructure');
  const [urgency, setUrgency] = useState<'routine' | 'urgent' | 'critical'>('urgent');
  const [description, setDescription] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (defaultLGA) setLga(defaultLGA);
  }, [defaultLGA]);

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Your name or identifier is required';
    if (!contactValue.trim()) newErrors.contactValue = 'Contact information is required';
    if (!description.trim() || description.trim().length < 15) {
      newErrors.description = 'Please provide a clear description of the community issue (min 15 characters)';
    }
    if (!privacyConsent) {
      newErrors.privacyConsent = 'Please acknowledge the privacy consent to submit';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        const submission: CommunityRequestSubmission = {
          id: `req-${Date.now()}`,
          fullName: fullName.trim(),
          contactValue: contactValue.trim(),
          lga,
          topic,
          urgency,
          description: description.trim(),
          submittedAt: new Date().toLocaleString(),
        };

        try {
          const existing = JSON.parse(localStorage.getItem('gyb_community_requests') || '[]');
          localStorage.setItem('gyb_community_requests', JSON.stringify([submission, ...existing]));
        } catch (_) {}

        setIsSubmitting(false);
        setIsSuccess(true);
        onSubmitted(submission);
      }, 700);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFullName('');
    setContactValue('');
    setDescription('');
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="community-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 z-10 overflow-hidden flex flex-col max-h-[92vh] focus:outline-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-[#064E3B] text-white p-6 sm:p-7 relative">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] font-heading">
              <MessageSquare className="w-4 h-4" />
              <span>COMMUNITY VOICE</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <h2 id="community-modal-title" className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
            Submit a Community Request
          </h2>
          <p className="text-xs text-emerald-100 mt-1">
            Report local roads, clinic repairs, water supply, or economic challenges in your ward for senatorial attention.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E7F3EC] text-[#008751] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#102A43]">
                Community Issue Logged
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-800">{fullName}</strong>. Your submission regarding <strong className="text-slate-800">{topic}</strong> in <strong className="text-slate-800">{lga}</strong> has been received by our constituent casework unit.
              </p>
              <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-700 text-left">
                <strong>Casework Commitment:</strong> Submissions are compiled into the constituency development dossier to prioritize legislative advocacy and agency intervention motions.
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#008751] text-white text-xs font-bold hover:bg-[#064E3B] transition-colors"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                    Your Name / Identifier <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Comr. Yakubu Momoh"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                    Phone / Email Contact <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    placeholder="0803... or email@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                  />
                  {errors.contactValue && (
                    <p className="mt-1 text-xs text-red-600">{errors.contactValue}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                    Local Government Area
                  </label>
                  <select
                    value={lga}
                    onChange={(e) => setLga(e.target.value as LGAName)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                  >
                    <option value="Adavi">Adavi LGA</option>
                    <option value="Ajaokuta">Ajaokuta LGA</option>
                    <option value="Ogori-Magongo">Ogori-Magongo LGA</option>
                    <option value="Okehi">Okehi LGA</option>
                    <option value="Okene">Okene LGA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                    Issue Category
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                  >
                    <option value="Roads & Transportation Infrastructure">Roads & Transport</option>
                    <option value="Healthcare & Clinic Equipment">Healthcare & Clinics</option>
                    <option value="Primary & Secondary Education">School Facilities</option>
                    <option value="Electricity & Rural Electrification">Power & Transformers</option>
                    <option value="Water Supply & Borehole Maintenance">Water Resources</option>
                    <option value="Youth Employment & Artisanal Tooling">Youth Employment</option>
                    <option value="Agriculture & Fertilizer Supply">Agriculture & Farming</option>
                    <option value="Other Community Need">Other Community Need</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                  Urgency Classification
                </label>
                <div className="flex gap-4">
                  {(['routine', 'urgent', 'critical'] as const).map((level) => (
                    <label key={level} className="flex items-center gap-1.5 cursor-pointer text-xs capitalize text-slate-700">
                      <input
                        type="radio"
                        name="urgency"
                        checked={urgency === level}
                        onChange={() => setUrgency(level)}
                        className="text-[#008751] focus:ring-[#008751]"
                      />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                  Description of Issue & Specific Location <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail the specific village, ward, street, and nature of the challenge..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-600">{errors.description}</p>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    className="mt-0.5 rounded text-[#008751] focus:ring-[#008751]"
                  />
                  <span className="text-xs text-slate-600 leading-tight">
                    I confirm that this submission accurately reflects community needs and consent to casework follow-up. <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.privacyConsent && (
                  <p className="mt-1 text-xs text-red-600 pl-6">{errors.privacyConsent}</p>
                )}
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#008751] hover:bg-[#064E3B] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Casework Request...</span>
                    </>
                  ) : (
                    <span>Submit Community Request</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
