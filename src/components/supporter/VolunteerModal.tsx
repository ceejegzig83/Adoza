import React, { useState, useEffect, useRef } from 'react';
import { X, HeartHandshake, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { LGAName, VolunteerSubmission } from '../../types';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted: (data: VolunteerSubmission) => void;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({ isOpen, onClose, onSubmitted }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [lga, setLga] = useState<LGAName | ''>('Okene');
  const [role, setRole] = useState('Community Engagement & Mobilization');
  const [availability, setAvailability] = useState('Weekends');
  const [message, setMessage] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [updatesConsent, setUpdatesConsent] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required for volunteer coordination';
    } else if (!/^[0-9+() -]{8,20}$/.test(phone.trim())) {
      newErrors.phone = 'Please provide a valid phone number';
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!privacyConsent) {
      newErrors.privacyConsent = 'You must acknowledge the privacy notice to proceed';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        const submission: VolunteerSubmission = {
          id: `vol-${Date.now()}`,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          lga: lga,
          participationRole: role,
          availability: availability,
          message: message.trim(),
          privacyConsent: true,
          updatesConsent: updatesConsent,
          submittedAt: new Date().toLocaleString(),
        };

        // Persist to local storage for Demo Admin inspection
        try {
          const existing = JSON.parse(localStorage.getItem('gyb_volunteers') || '[]');
          localStorage.setItem('gyb_volunteers', JSON.stringify([submission, ...existing]));
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
    setEmail('');
    setPhone('');
    setMessage('');
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="volunteer-modal-title"
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
              <HeartHandshake className="w-4 h-4" />
              <span>GRASSROOTS ENGAGEMENT</span>
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
          <h2 id="volunteer-modal-title" className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
            Register as a Volunteer
          </h2>
          <p className="text-xs text-emerald-100 mt-1">
            Join the Kogi Central progressive movement across Adavi, Ajaokuta, Ogori-Magongo, Okehi, and Okene.
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
                Registration Received
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-800">{fullName}</strong>. Your expression of interest has been registered. If follow-up is necessary and possible, the relevant mobilization desk can contact you using the details provided.
              </p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 text-left">
                <strong>Platform Demo Note:</strong> This submission has been logged into local browser storage and is viewable in the Campaign Admin Demo view.
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
              <div>
                <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sadiq Ibrahim Ahmed"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] focus:ring-1 focus:ring-[#008751] transition-all"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.fullName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0803 000 0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sadiq@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
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
                    Preferred Participation
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                  >
                    <option value="Community Engagement & Mobilization">Community Engagement</option>
                    <option value="Event Planning & Logistics">Event Support & Logistics</option>
                    <option value="Communications & Digital Media">Communications & Digital Media</option>
                    <option value="Polling Unit & Ward Coordination">Ward & Precinct Outreach</option>
                    <option value="General Volunteering">General Volunteering</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                  Availability
                </label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                >
                  <option value="Weekends">Weekends Only</option>
                  <option value="Flexible Evenings">Evenings / Flexible</option>
                  <option value="Full-time Campaign">Full-time Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                  Additional Message / Special Skills <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details on your background, ward, or community network..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                />
              </div>

              {/* Consent & Data Protection (NDPA 2023) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    className="mt-0.5 rounded text-[#008751] focus:ring-[#008751]"
                  />
                  <span className="text-xs text-slate-600 leading-tight">
                    I acknowledge that my details will be stored in accordance with the Nigerian Data Protection Act (NDPA 2023) for campaign communication purposes. <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.privacyConsent && (
                  <p className="text-xs text-red-600 pl-6">{errors.privacyConsent}</p>
                )}

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={updatesConsent}
                    onChange={(e) => setUpdatesConsent(e.target.checked)}
                    className="mt-0.5 rounded text-[#008751] focus:ring-[#008751]"
                  />
                  <span className="text-xs text-slate-500 leading-tight">
                    I consent to receive occasional SMS and email campaign dispatches.
                  </span>
                </label>
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
                      <span>Processing Registration...</span>
                    </>
                  ) : (
                    <span>Complete Volunteer Registration</span>
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
