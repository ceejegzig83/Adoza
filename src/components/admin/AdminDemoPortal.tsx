import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  Users,
  MessageSquare,
  Mail,
  RefreshCw,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Sparkles,
  ExternalLink,
  Sliders,
  FileText,
  Clock,
  Activity,
  AlertOctagon,
  Eye,
  Check,
  Ban,
  Archive,
  Edit3
} from 'lucide-react';
import {
  VolunteerSubmission,
  CommunityRequestSubmission,
  ContactSubmission,
  NewsArticle,
  SystemHealthStatus,
  SystemSettings,
  AuditLogEntry,
  EditorialStatus
} from '../../types';
import { GYB_PORTRAIT_URL } from '../../assets/portrait';
import { api } from '../../services/api';

interface AdminDemoPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDemoPortal: React.FC<AdminDemoPortalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'news_review' | 'system_health' | 'audit_logs' | 'volunteers' | 'community' | 'messages'>('news_review');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [health, setHealth] = useState<SystemHealthStatus | null>(null);
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [volunteers, setVolunteers] = useState<VolunteerSubmission[]>([]);
  const [communityRequests, setCommunityRequests] = useState<CommunityRequestSubmission[]>([]);
  const [messages, setMessages] = useState<ContactSubmission[]>([]);

  // Scan & Action states
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Edit Modal State
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editExcerpt, setEditExcerpt] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState<NewsArticle['category']>('Media Coverage');

  const loadAllData = async () => {
    // 1. Fetch Admin News Queue
    const newsRes = await api.getAdminNews(statusFilter === 'all' ? undefined : (statusFilter as EditorialStatus));
    if (newsRes.success) {
      setArticles(newsRes.data);
    }

    // 2. Fetch System Health
    const healthRes = await api.getSystemHealth();
    if (healthRes.success && healthRes.data) {
      setHealth(healthRes.data);
    }

    // 3. Fetch Settings
    const settingsRes = await api.getSettings();
    if (settingsRes.success && settingsRes.data) {
      setSettings(settingsRes.data);
    }

    // 4. Fetch Audit Logs
    const auditRes = await api.getAuditLogs();
    if (auditRes.success) {
      setAuditLogs(auditRes.data);
    }

    // 5. Load Local Form Submissions
    try {
      setVolunteers(JSON.parse(localStorage.getItem('gyb_volunteers') || '[]'));
      setCommunityRequests(JSON.parse(localStorage.getItem('gyb_community_requests') || '[]'));
      setMessages(JSON.parse(localStorage.getItem('gyb_contact_messages') || '[]'));
    } catch (_) {}
  };

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen, statusFilter]);

  const triggerScanNow = async () => {
    setIsScanning(true);
    setScanMessage(null);
    try {
      const res = await api.triggerNewsSearch('Secretariat Admin Console');
      if (res.success) {
        setScanMessage(res.message);
        await loadAllData();
      } else {
        setScanMessage(`Scan error: ${res.error || 'Failed'}`);
      }
    } catch (err: any) {
      setScanMessage(`Error: ${err.message}`);
    } finally {
      setIsScanning(false);
      setTimeout(() => setScanMessage(null), 5000);
    }
  };

  const handleStatusChange = async (id: string, newStatus: EditorialStatus) => {
    const res = await api.updateArticleStatus(id, { editorialStatus: newStatus }, 'Secretariat Admin');
    if (res.success) {
      setActionNotice(`Article updated to '${newStatus}'.`);
      setTimeout(() => setActionNotice(null), 3000);
      loadAllData();
    }
  };

  const openEditModal = (article: NewsArticle) => {
    setEditingArticle(article);
    setEditTitle(article.title);
    setEditExcerpt(article.excerpt);
    setEditContent(article.content);
    setEditCategory(article.category);
  };

  const saveEditedArticle = async () => {
    if (!editingArticle) return;
    const res = await api.updateArticleStatus(
      editingArticle.id,
      {
        title: editTitle,
        excerpt: editExcerpt,
        content: editContent,
        category: editCategory,
      },
      'Secretariat Editor'
    );
    if (res.success) {
      setActionNotice('Article edits saved.');
      setTimeout(() => setActionNotice(null), 3000);
      setEditingArticle(null);
      loadAllData();
    }
  };

  const handleToggleAutoPublish = async () => {
    if (!settings) return;
    const updated = await api.updateSettings(
      {
        autoPublishTrusted: !settings.autoPublishTrusted,
        emergencyDisableAutoPublish: settings.autoPublishTrusted ? true : false,
      },
      'Security Administrator'
    );
    if (updated.success && updated.data) {
      setSettings(updated.data);
      loadAllData();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-portal-title"
    >
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 z-10 overflow-hidden flex flex-col max-h-[94vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Top Executive Header */}
        <div className="bg-[#102A43] text-white p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-[#D4AF37] shadow-xs bg-slate-900 shrink-0">
              <img
                src={GYB_PORTRAIT_URL}
                alt="Alhaji Yahaya Adoza Bello"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="admin-portal-title" className="text-base sm:text-lg font-bold font-heading text-white">
                  GYB News Intelligence & Secretariat Console
                </h2>
                <span className="text-[10px] bg-[#008751] text-white font-extrabold uppercase px-2 py-0.5 rounded-sm">
                  Active System
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Automated discovery, verification, editorial approval, and constituent casework management.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={triggerScanNow}
              disabled={isScanning}
              className="px-3.5 py-2 rounded-xl bg-[#008751] hover:bg-[#064E3B] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 text-[#D4AF37] ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning News...' : 'Run News Search Now'}</span>
            </button>

            <button
              type="button"
              onClick={loadAllData}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs transition-colors cursor-pointer"
              title="Refresh console"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close console"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Notifications Strip */}
        {scanMessage && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 text-xs text-[#064E3B] font-semibold flex items-center justify-between animate-in fade-in">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#008751]" />
              {scanMessage}
            </span>
          </div>
        )}
        {actionNotice && (
          <div className="bg-blue-50 border-b border-blue-200 px-6 py-2 text-xs text-blue-900 font-semibold flex items-center gap-2 animate-in fade-in">
            <Check className="w-3.5 h-3.5 text-blue-600" />
            {actionNotice}
          </div>
        )}

        {/* Console Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-200 bg-[#F8F7F2] overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('news_review')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold font-heading border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'news_review'
                ? 'border-[#008751] text-[#008751]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>News Review ({articles.filter((a) => a.editorialStatus === 'pending_review' || a.editorialStatus === 'draft_generated').length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('system_health')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold font-heading border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'system_health'
                ? 'border-[#008751] text-[#008751]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Health & Policies</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit_logs')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold font-heading border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'audit_logs'
                ? 'border-[#008751] text-[#008751]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Audit Trail ({auditLogs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('volunteers')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold font-heading border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
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
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold font-heading border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'community'
                ? 'border-[#008751] text-[#008751]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Casework ({communityRequests.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold font-heading border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
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
          {/* TAB 1: NEWS INTELLIGENCE REVIEW QUEUE */}
          {activeTab === 'news_review' && (
            <div className="space-y-5">
              {/* Filter controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Editorial Filter:</span>
                  {(['all', 'pending_review', 'approved', 'published', 'rejected', 'archived'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                        statusFilter === st
                          ? 'bg-[#102A43] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-slate-500">
                  Showing <strong>{articles.length}</strong> items in database
                </div>
              </div>

              {/* Articles Queue List */}
              {articles.length === 0 ? (
                <div className="text-center py-16 text-slate-400 text-xs">
                  No articles currently matching filter <strong>'{statusFilter}'</strong>. Click 'Run News Search Now' to discover new reports.
                </div>
              ) : (
                <div className="space-y-4">
                  {articles.map((art) => {
                    const isPending = art.editorialStatus === 'pending_review' || art.editorialStatus === 'draft_generated';
                    const isPublished = art.editorialStatus === 'published';
                    const isLegal = art.contentNature === 'allegation_legal';

                    return (
                      <div
                        key={art.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          isPending
                            ? 'bg-amber-50/40 border-amber-200 shadow-xs'
                            : isPublished
                              ? 'bg-white border-emerald-200 shadow-2xs'
                              : 'bg-slate-50 border-slate-200 opacity-80'
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#008751] font-heading">
                              {art.category}
                            </span>
                            <span className="text-slate-400">·</span>
                            <span className="text-xs font-semibold text-slate-700">
                              {art.sourcePublisher || 'Nigerian News Source'}
                            </span>
                            <span className="text-slate-400">·</span>
                            <span className="text-xs text-slate-500">{art.publishedAt}</span>

                            {/* Content Nature Badge */}
                            {isLegal ? (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-purple-100 text-purple-800 border border-purple-200">
                                Legal Proceeding / Due Process
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                                Verified Fact
                              </span>
                            )}

                            {/* Status Badge */}
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                                isPublished
                                  ? 'bg-[#008751] text-white'
                                  : isPending
                                    ? 'bg-amber-500 text-white'
                                    : 'bg-slate-300 text-slate-700'
                              }`}
                            >
                              Status: {art.editorialStatus}
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-400 font-mono">
                            Confidence: {art.confidenceScore}%
                          </div>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold font-heading text-[#102A43]">
                          {art.title}
                        </h3>

                        <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {art.excerpt}
                        </p>

                        {/* Verification & Risk Guidance */}
                        {art.verificationNotes && (
                          <div className="mt-3 p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                            <Shield className="w-4 h-4 text-[#008751] shrink-0 mt-0.5" />
                            <span>
                              <strong>Verification Assessment:</strong> {art.verificationNotes}
                            </span>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            {art.sourceUrl && (
                              <a
                                href={art.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-[#008751] font-semibold hover:underline"
                              >
                                <span>Verify Original URL</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => openEditModal(art)}
                              className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit Draft</span>
                            </button>

                            {art.editorialStatus !== 'published' && (
                              <button
                                type="button"
                                onClick={() => handleStatusChange(art.id, 'published')}
                                className="px-3.5 py-1.5 rounded-lg bg-[#008751] hover:bg-[#064E3B] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Approve & Publish Live</span>
                              </button>
                            )}

                            {art.editorialStatus === 'published' && (
                              <button
                                type="button"
                                onClick={() => handleStatusChange(art.id, 'archived')}
                                className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-600 flex items-center gap-1 cursor-pointer"
                              >
                                <Archive className="w-3 h-3" />
                                <span>Archive from Live Site</span>
                              </button>
                            )}

                            {art.editorialStatus !== 'rejected' && art.editorialStatus !== 'published' && (
                              <button
                                type="button"
                                onClick={() => handleStatusChange(art.id, 'rejected')}
                                className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <Ban className="w-3 h-3" />
                                <span>Reject</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SYSTEM HEALTH & PUBLISHING POLICY */}
          {activeTab === 'system_health' && health && settings && (
            <div className="space-y-6">
              {/* 4 Health Service Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Search Provider */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">
                      Search Provider
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#008751]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#102A43]">
                    {health.searchProvider.providerName}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Status: <strong className="text-emerald-700 capitalize">{health.searchProvider.status}</strong>
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {health.searchProvider.details}
                  </p>
                </div>

                {/* 2. AI Summarizer */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">
                      AI Summarizer
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#008751]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#102A43]">
                    {health.aiSummarizer.modelName}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    API Key: <strong className={health.aiSummarizer.apiKeyConfigured ? 'text-emerald-700' : 'text-amber-700'}>
                      {health.aiSummarizer.apiKeyConfigured ? 'Configured on Server' : 'Development Fallback'}
                    </strong>
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Fact extraction & attribution engine
                  </p>
                </div>

                {/* 3. Database Store */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">
                      Database Store
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#008751]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#102A43]">
                    Persistent File DB
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Total Records: <strong>{health.database.recordCount} Articles</strong>
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Atomic file writes with audit trail
                  </p>
                </div>

                {/* 4. 6-Hour Scheduler */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">
                      Background Worker
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#008751]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#102A43]">
                    Every {health.scheduler.intervalHours} Hours
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Status: <strong className="text-emerald-700 capitalize">{health.scheduler.status}</strong>
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    Next Run: {new Date(health.scheduler.nextRunTime || '').toLocaleTimeString()}
                  </p>
                </div>
              </div>

              {/* Automated Publishing Policy Panel */}
              <div className="bg-[#F8F7F2] rounded-2xl p-6 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold font-heading text-[#102A43]">
                      Automated Publishing Policy & Safety Boundaries
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Controls whether low-risk verified facts from white-listed publishers can publish automatically.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleToggleAutoPublish}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      settings.autoPublishTrusted && !settings.emergencyDisableAutoPublish
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : 'bg-[#008751] text-white hover:bg-[#064E3B]'
                    }`}
                  >
                    {settings.autoPublishTrusted && !settings.emergencyDisableAutoPublish
                      ? 'Disable Auto-Publish (Manual Mode)'
                      : 'Enable Low-Risk Auto-Publish'}
                  </button>
                </div>

                {/* Emergency Safety Switches */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 pt-2">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                    <strong className="text-slate-900 block mb-1">Emergency Kill Switch:</strong>
                    <span>
                      Currently <strong>{settings.emergencyDisableAutoPublish ? 'ACTIVE (All articles require human signoff)' : 'STANDBY'}</strong>.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                    <strong className="text-slate-900 block mb-1">Legal Proceedings Isolation:</strong>
                    <span className="text-emerald-800 font-semibold">
                      ENFORCED: Legal proceedings and allegations are NEVER auto-published under any circumstances.
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs font-bold text-slate-700 mb-1.5">Trusted Source Whitelist:</p>
                  <div className="flex flex-wrap gap-2">
                    {settings.trustedPublishers.map((pub, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-white border border-slate-300 text-xs text-slate-700 font-medium">
                        {pub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AUDIT TRAIL LOGS */}
          {activeTab === 'audit_logs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
                <span>Immutable chronological audit logs of content actions and crawler scans:</span>
                <span>{auditLogs.length} entries</span>
              </div>

              {auditLogs.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">No audit entries recorded yet.</div>
              ) : (
                <div className="space-y-2.5">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="p-3.5 rounded-xl bg-[#F8F7F2] border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded-md font-bold bg-[#102A43] text-white">
                            {log.action}
                          </span>
                          <span className="font-semibold text-slate-800">{log.actor}</span>
                          {log.targetArticleTitle && (
                            <span className="text-slate-500 truncate max-w-xs italic">
                              "{log.targetArticleTitle}"
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-[11px]">{log.details}</p>
                      </div>

                      <span className="text-[10px] text-slate-400 font-mono shrink-0">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: VOLUNTEERS */}
          {activeTab === 'volunteers' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-500 pb-2 border-b border-slate-200">
                <span>Volunteer expressions of interest recorded in this session:</span>
                <span>{volunteers.length} registrations</span>
              </div>

              {volunteers.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">No volunteer registrations submitted in this session.</div>
              ) : (
                <div className="space-y-3">
                  {volunteers.map((vol) => (
                    <div key={vol.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#102A43]">{vol.fullName}</span>
                        <span className="text-xs text-slate-500">{vol.submittedAt}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600">
                        <div><strong>Phone:</strong> {vol.phone}</div>
                        <div><strong>Email:</strong> {vol.email || '—'}</div>
                        <div><strong>LGA:</strong> {vol.lga}</div>
                        <div><strong>Availability:</strong> {vol.availability}</div>
                      </div>
                      <div className="text-xs text-slate-700 bg-slate-50 p-2 rounded-lg">
                        <strong>Role:</strong> {vol.participationRole}
                        {vol.message && <p className="mt-1 italic">"{vol.message}"</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: CASEWORK */}
          {activeTab === 'community' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-500 pb-2 border-b border-slate-200">
                <span>Constituent casework requests logged for senatorial review:</span>
                <span>{communityRequests.length} requests</span>
              </div>

              {communityRequests.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">No community casework requests filed yet.</div>
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

          {/* TAB 6: INQUIRIES */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-500 pb-2 border-b border-slate-200">
                <span>Contact inquiries delivered through public form:</span>
                <span>{messages.length} messages</span>
              </div>

              {messages.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">No inquiries submitted yet.</div>
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

        {/* Console Footer */}
        <div className="p-4 border-t border-slate-200 bg-[#F8F7F2] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-[#008751]" />
            <span>Scheduled background task active (6-hour intervals)</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#102A43] text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Secretariat Console
          </button>
        </div>
      </div>

      {/* EDIT DRAFT MODAL DIALOG */}
      {editingArticle && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold font-heading text-base text-[#102A43]">
                Edit Article Draft Prior to Publication
              </h3>
              <button
                type="button"
                onClick={() => setEditingArticle(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Headline</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#008751]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm"
              >
                <option value="Official Statements">Official Statements</option>
                <option value="Public Service Record">Public Service Record</option>
                <option value="Media Coverage">Media Coverage</option>
                <option value="Policy & Agenda">Policy & Agenda</option>
                <option value="Community Engagement">Community Engagement</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">2-Sentence Summary</label>
              <textarea
                rows={2}
                value={editExcerpt}
                onChange={(e) => setEditExcerpt(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Article Draft</label>
              <textarea
                rows={5}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm leading-relaxed"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingArticle(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEditedArticle}
                className="px-5 py-2 rounded-xl bg-[#008751] text-white text-xs font-bold hover:bg-[#064E3B]"
              >
                Save Edits
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
