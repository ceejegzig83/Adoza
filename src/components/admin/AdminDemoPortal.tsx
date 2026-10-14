import React, { useState, useEffect } from 'react';
import { X, Shield, Users, MessageSquare, Mail, RefreshCw, Trash2, CheckCircle2, AlertTriangle, Eye } from 'lucide-react';
import { VolunteerSubmission, CommunityRequestSubmission, ContactSubmission } from '../../types';
import { GYB_PORTRAIT_URL } from '../../assets/portrait';

interface AdminDemoPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDemoPortal: React.FC<AdminDemoPortalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'volunteers' | 'community' | 'messages'>('volunteers');
  const [volunteers, setVolunteers] = useState<VolunteerSubmission[]>([]);
  const [communityRequests, setCommunityRequests] = useState<CommunityRequestSubmission[]>([]);
  const [messages, setMessages] = useState<ContactSubmission[]>([]);

  const loadData = () => {
    try {
      setVolunteers(JSON.parse(localStorage.getItem('gyb_volunteers') || '[]'));
      setCommunityRequests(JSON.parse(localStorage.getItem('gyb_community_requests') || '[]'));
      setMessages(JSON.parse(localStorage.getItem('gyb_contact_messages') || '[]'));
    } catch (_) {}
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClearData = (type: string) => {
    if (confirm(`Clear all stored ${type} records in this demo session?`)) {
      if (type === 'volunteers') {
        localStorage.removeItem('gyb_volunteers');
        setVolunteers([]);
      } else if (type === 'community') {
        localStorage.removeItem('gyb_community_requests');
        setCommunityRequests([]);
      } else if (type === 'messages') {
        localStorage.removeItem('gyb_contact_messages');
        setMessages([]);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-portal-title"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Top Banner */}
        <div className="bg-[#102A43] text-white p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-[#D4AF37] shadow-xs bg-slate-900 shrink-0">
              <img
                src={GYB_PORTRAIT_URL}
                alt="Alhaji Yahaya Adoza Bello"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="admin-portal-title" className="text-lg font-bold font-heading text-white">
                  Campaign Secretariat Console
                </h2>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold uppercase px-2 py-0.5 rounded-sm">
                  Prototype Demo
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Administrative dispatch console inspecting client-side and simulated citizen submissions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadData}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Refresh local data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-200 bg-[#F8F7F2]">
          <button
            type="button"
            onClick={() => setActiveTab('volunteers')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold font-heading border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'volunteers'
                ? 'border-[#008751] text-[#008751]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Volunteers ({volunteers.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('community')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold font-heading border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'community'
                ? 'border-[#008751] text-[#008751]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Community Voice ({communityRequests.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold font-heading border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'messages'
                ? 'border-[#008751] text-[#008751]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Inquiries ({messages.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'volunteers' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Recent volunteer registrations logged from public form:</span>
                {volunteers.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleClearData('volunteers')}
                    className="text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear Records
                  </button>
                )}
              </div>

              {volunteers.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No volunteer registrations recorded yet. Submit the volunteer form to inspect data persistence.
                </div>
              ) : (
                <div className="space-y-3">
                  {volunteers.map((vol) => (
                    <div key={vol.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-bold text-sm text-[#102A43]">{vol.fullName}</span>
                        <span className="text-xs text-slate-500">{vol.submittedAt}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600">
                        <div><strong className="text-slate-800">Phone:</strong> {vol.phone}</div>
                        <div><strong className="text-slate-800">Email:</strong> {vol.email || '—'}</div>
                        <div><strong className="text-slate-800">LGA:</strong> {vol.lga}</div>
                        <div><strong className="text-slate-800">Availability:</strong> {vol.availability}</div>
                      </div>
                      <div className="text-xs text-slate-700 bg-slate-50 p-2 rounded-lg">
                        <strong className="text-slate-900">Assigned Role:</strong> {vol.participationRole}
                        {vol.message && <p className="mt-1 italic">"{vol.message}"</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'community' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Grassroots constituent casework and local priority reports:</span>
                {communityRequests.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleClearData('community')}
                    className="text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear Records
                  </button>
                )}
              </div>

              {communityRequests.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No community requests submitted yet. Use the Community Voice form in the Supporter Hub to file one.
                </div>
              ) : (
                <div className="space-y-3">
                  {communityRequests.map((req) => (
                    <div key={req.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#102A43]">{req.fullName}</span>
                        <span className="text-xs uppercase px-2 py-0.5 rounded font-mono font-bold bg-amber-100 text-amber-800">
                          {req.urgency}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 flex gap-4">
                        <span><strong>LGA:</strong> {req.lga}</span>
                        <span><strong>Topic:</strong> {req.topic}</span>
                        <span><strong>Contact:</strong> {req.contactValue}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg leading-relaxed">
                        {req.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Direct correspondence submitted through the contact section:</span>
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleClearData('messages')}
                    className="text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear Records
                  </button>
                )}
              </div>

              {messages.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No contact messages sent yet. Use the contact form to submit an official query.
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#102A43]">{msg.name}</span>
                        <span className="text-xs text-slate-500">{msg.submittedAt}</span>
                      </div>
                      <div className="text-xs text-slate-600">
                        <strong>Subject:</strong> {msg.subject} · <strong>Contact:</strong> {msg.emailOrPhone}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-[#F8F7F2] flex items-center justify-between text-xs text-slate-500">
          <span>Backend Ready: Direct REST integration targets <code>/api/admin/*</code></span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#102A43] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
};
