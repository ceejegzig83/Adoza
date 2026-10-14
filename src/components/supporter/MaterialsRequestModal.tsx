import React, { useState, useEffect, useRef } from 'react';
import { X, Package, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { LGAName, MaterialRequestSubmission } from '../../types';

interface MaterialsRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted: (data: MaterialRequestSubmission) => void;
}

export const MaterialsRequestModal: React.FC<MaterialsRequestModalProps> = ({
  isOpen,
  onClose,
  onSubmitted,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [fullName, setFullName] = useState('');
  const [contactMethod, setContactMethod] = useState<'phone' | 'email' | 'whatsapp'>('phone');
  const [contactValue, setContactValue] = useState('');
  const [materialType, setMaterialType] = useState('Campaign Factsheets & Policy Manifestos');
  const [quantity, setQuantity] = useState('25 – 50 Units (Community Hub)');
  const [distributionLGA, setDistributionLGA] = useState<LGAName>('Okene');
  const [deliveryPreference, setDeliveryPreference] = useState<'pickup' | 'delivery'>('pickup');

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

    if (!fullName.trim()) newErrors.fullName = 'Name is required';
    if (!contactValue.trim()) newErrors.contactValue = 'Contact information is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        const submission: MaterialRequestSubmission = {
          id: `mat-${Date.now()}`,
          fullName: fullName.trim(),
          contactMethod,
          contactValue: contactValue.trim(),
          materialType,
          quantity,
          distributionLGA,
          deliveryPreference,
          submittedAt: new Date().toLocaleString(),
        };

        try {
          const existing = JSON.parse(localStorage.getItem('gyb_materials') || '[]');
          localStorage.setItem('gyb_materials', JSON.stringify([submission, ...existing]));
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
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="material-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 z-10 overflow-hidden flex flex-col max-h-[90vh] focus:outline-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-[#102A43] text-white p-6 sm:p-7 relative">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] font-heading">
              <Package className="w-4 h-4" />
              <span>OFFICIAL COLLATERAL</span>
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
          <h2 id="material-modal-title" className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
            Request Campaign Materials
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Requisition approved posters, policy booklets, lapel emblems, and grassroots banners for your precinct.
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
                Requisition Logged
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-800">{fullName}</strong>. Your request for campaign materials in <strong className="text-slate-800">{distributionLGA}</strong> has been logged with our central logistics desk.
              </p>
              <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-700 text-left">
                <strong>Logistics Note:</strong> Material allocation is subject to verified batch availability at the Okene Central Campaign Headquarters.
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
                  Full Name / Organization Head <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Hajia Ramatu Sanni"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                    Contact Method
                  </label>
                  <select
                    value={contactMethod}
                    onChange={(e) => setContactMethod(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                  >
                    <option value="phone">Direct Phone Call</option>
                    <option value="whatsapp">WhatsApp Line</option>
                    <option value="email">Email Address</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                    Contact Value <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    placeholder="e.g. 0802 000 0000"
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
                    Material Requested
                  </label>
                  <select
                    value={materialType}
                    onChange={(e) => setMaterialType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                  >
                    <option value="Campaign Factsheets & Policy Manifestos">Factsheets & Manifestos</option>
                    <option value="Standard Posters & Banners">Posters & Outdoor Banners</option>
                    <option value="Lapel Pins & Monogram Badges">Lapel Pins & Monogram Badges</option>
                    <option value="Campaign T-Shirts & Caps">T-Shirts & Caps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                    Quantity Requisition
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                  >
                    <option value="10 – 25 Units (Individual / Household)">10 – 25 Units</option>
                    <option value="25 – 50 Units (Community Hub)">25 – 50 Units</option>
                    <option value="50 – 100+ Units (Ward Secretariat)">50 – 100+ Units</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">
                    Distribution LGA
                  </label>
                  <select
                    value={distributionLGA}
                    onChange={(e) => setDistributionLGA(e.target.value as LGAName)}
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
                    Collection Mode
                  </label>
                  <select
                    value={deliveryPreference}
                    onChange={(e) => setDeliveryPreference(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[#102A43] focus:border-[#008751] transition-all"
                  >
                    <option value="pickup">Pick up at Okene Campaign HQ</option>
                    <option value="delivery">Courier to Ward Secretariat</option>
                  </select>
                </div>
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
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <span>Submit Materials Request</span>
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
