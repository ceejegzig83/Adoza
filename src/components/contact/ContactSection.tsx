import React, { useState } from 'react';
import { CAMPAIGN_CONTACT_INFO } from '../../data/contact';
import { Building2, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, Loader2, MapPin, ShieldCheck } from 'lucide-react';
import { ContactSubmission } from '../../types';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [subject, setSubject] = useState('General Campaign Enquiry');
  const [message, setMessage] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!emailOrPhone.trim()) newErrors.emailOrPhone = 'Contact method (phone or email) is required';
    if (!message.trim() || message.trim().length < 10) {
      newErrors.message = 'Please provide your message (min 10 characters)';
    }
    if (!privacyConsent) {
      newErrors.privacyConsent = 'You must acknowledge the privacy notice to send';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        const submission: ContactSubmission = {
          id: `msg-${Date.now()}`,
          name: name.trim(),
          emailOrPhone: emailOrPhone.trim(),
          subject,
          message: message.trim(),
          submittedAt: new Date().toLocaleString(),
        };

        try {
          const existing = JSON.parse(localStorage.getItem('gyb_contact_messages') || '[]');
          localStorage.setItem('gyb_contact_messages', JSON.stringify([submission, ...existing]));
        } catch (_) {}

        setIsSubmitting(false);
        setIsSuccess(true);
      }, 700);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setName('');
    setEmailOrPhone('');
    setMessage('');
    setErrors({});
  };

  return (
    <section id="contact" className="py-20 bg-[#F8F7F2] border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#008751] font-heading">
              OFFICIAL CONTACT & LIAISON
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] font-heading tracking-tight">
            Connect with the Team
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            For enquiries, media requests, constituent delegations, or volunteer liaison, reach out to our official secretariat offices or submit an enquiry directly below.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (6 cols): Verified Office Details & Specialized Desks */}
          <div className="lg:col-span-6 space-y-6">
            {/* Offices Cards */}
            {CAMPAIGN_CONTACT_INFO.offices.map((office, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-[#008751] uppercase tracking-wider font-heading">
                    {office.type}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/50">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#008751]" />
                    Verified Office
                  </span>
                </div>

                <h3 className="text-lg font-bold font-heading text-[#102A43]">
                  {office.title}
                </h3>

                <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                  <p className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#008751] shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{office.hours}</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-mono text-slate-800">{office.phone}</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-mono text-slate-800">{office.email}</span>
                  </p>
                </div>
              </div>
            ))}

            {/* Specialized Desks Quick Strip */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h4 className="text-sm font-bold font-heading text-[#102A43] mb-4">
                Specialized Inquiries
              </h4>
              <div className="space-y-3 text-xs">
                {CAMPAIGN_CONTACT_INFO.desks.map((desk, idx) => (
                  <div key={idx} className="pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{desk.title}</span>
                      <a href={`mailto:${desk.email}`} className="text-[#008751] font-mono hover:underline">
                        {desk.email}
                      </a>
                    </div>
                    <p className="text-slate-500 mt-0.5 text-[11px]">{desk.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Interactive Contact Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="text-xl font-bold font-heading text-[#102A43] mb-1">
              Send an Official Message
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Messages are routed directly to the central coordination secretariat.
            </p>

            {isSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#E7F3EC] text-[#008751] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold font-heading text-[#102A43]">
                  Message Logged Successfully
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-800">{name}</strong>. Your correspondence has been logged with the secretariat desk.
                </p>
                <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 text-left">
                  <strong>Platform Demo Note:</strong> This correspondence has been recorded in the local demo database for administrative inspection.
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#008751] text-white text-xs font-bold hover:bg-[#064E3B] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aliyu Usman"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                    Email Address or Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="0803 000 0000 or email@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                  />
                  {errors.emailOrPhone && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.emailOrPhone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                    Subject / Area of Enquiry
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                  >
                    <option value="General Campaign Enquiry">General Campaign Enquiry</option>
                    <option value="Media & Press Request">Press & Media Accreditation</option>
                    <option value="Constituency Delegation Request">Constituency Delegation Meeting</option>
                    <option value="Policy Briefing Memo">Policy Proposal / Stakeholder Memo</option>
                    <option value="Other Official Matter">Other Official Matter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your official inquiry or message here..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
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
                      I consent to the collection and processing of my contact information solely for responding to this enquiry. <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {errors.privacyConsent && (
                    <p className="mt-1 text-xs text-red-600 pl-6">{errors.privacyConsent}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#008751] hover:bg-[#064E3B] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Correspondence...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Official Enquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
