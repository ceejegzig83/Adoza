export type VerificationStatus = 'verified' | 'pending_review';

export interface LegacyProject {
  id: string;
  title: string;
  category: 'healthcare' | 'infrastructure' | 'security' | 'youth' | 'women' | 'institutions';
  categoryLabel: string;
  summary: string;
  description: string;
  location: string;
  tenurePeriod: string;
  completionDate?: string;
  status: string;
  highlightMetric?: {
    value: string;
    label: string;
  };
  keyFeatures: string[];
  sourceTitle: string;
  sourceUrl?: string;
  sourceDate: string;
  verificationStatus: VerificationStatus;
  published: boolean;
}

export type LGAName = 'Adavi' | 'Ajaokuta' | 'Ogori-Magongo' | 'Okehi' | 'Okene';

export interface LocalGovernmentArea {
  id: LGAName;
  name: string;
  headquarters: string;
  summary: string;
  keySectors: string[];
  estimatedWards: number;
  featuredFocus: string;
}

export interface AgendaPolicy {
  id: string;
  title: string;
  category: 'representation' | 'infrastructure' | 'youth' | 'agriculture' | 'healthcare' | 'economic-development';
  categoryLabel: string;
  targetLGAs: LGAName[] | 'All';
  communityNeed: string;
  proposedAction: string;
  progressIndicators: string[];
  publicAccountabilityMethod: string;
  legislativeContext: string;
  status: 'draft' | 'approved' | 'published';
  lastUpdated: string;
}

export type EditorialStatus =
  | 'discovered'
  | 'draft_generated'
  | 'pending_review'
  | 'approved'
  | 'published'
  | 'rejected'
  | 'archived';

export type ContentNature =
  | 'verified_fact'
  | 'allegation_legal'
  | 'campaign_statement'
  | 'opinion_analysis'
  | 'unverified_claim';

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Official Statements' | 'Public Service Record' | 'Media Coverage' | 'Policy & Agenda' | 'Community Engagement';
  excerpt: string;
  content: string;
  publishedAt: string;
  readingTime: string;
  sourcePublisher?: string;
  sourceUrl?: string;
  isFeatured?: boolean;

  // Editorial & Verification Pipeline fields
  editorialStatus?: EditorialStatus;
  contentNature?: ContentNature;
  discoveredAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  verificationNotes?: string;
  confidenceScore?: number; // 0 to 100
  originalSourceSnippet?: string;
  isAutoPublished?: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: 'DISCOVERED' | 'DRAFT_CREATED' | 'APPROVED' | 'PUBLISHED' | 'REJECTED' | 'ARCHIVED' | 'EDITED' | 'SETTINGS_CHANGED' | 'SYSTEM_SCAN';
  targetArticleId?: string;
  targetArticleTitle?: string;
  details: string;
}

export interface SystemHealthStatus {
  searchProvider: {
    status: 'operational' | 'degraded' | 'offline';
    providerName: string;
    lastQueryTime?: string;
    details?: string;
  };
  aiSummarizer: {
    status: 'operational' | 'degraded' | 'offline';
    modelName: string;
    lastProcessedTime?: string;
    apiKeyConfigured: boolean;
  };
  database: {
    status: 'operational' | 'degraded';
    recordCount: number;
    lastSavedTime?: string;
  };
  scheduler: {
    status: 'active' | 'idle' | 'stopped';
    intervalHours: number;
    lastRunTime?: string;
    nextRunTime?: string;
    autoPublishEnabled: boolean;
    consecutiveFailures: number;
  };
  queueCounts: {
    discovered: number;
    pendingReview: number;
    approved: number;
    published: number;
    rejected: number;
    archived: number;
    total: number;
  };
}

export interface SystemSettings {
  autoPublishTrusted: boolean;
  trustedPublishers: string[];
  scanIntervalHours: number;
  emergencyDisableAutoPublish: boolean;
  allowLegalAutoPublish: boolean;
}

export interface MediaItem {
  id: string;
  title: string;
  category: 'Public Service' | 'Healthcare' | 'Infrastructure' | 'Community Engagement' | 'Speeches';
  date: string;
  location: string;
  caption: string;
  type: 'image' | 'video';
  duration?: string;
  youtubeId?: string;
}

export interface SocialPost {
  id: string;
  platform: 'facebook' | 'twitter' | 'instagram';
  author: string;
  authorHandle: string;
  date: string;
  content: string;
  permalink: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
}

export interface VolunteerSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  lga: LGAName | '';
  participationRole: string;
  availability: string;
  message?: string;
  privacyConsent: boolean;
  updatesConsent: boolean;
  submittedAt: string;
}

export interface MaterialRequestSubmission {
  id: string;
  fullName: string;
  contactMethod: 'phone' | 'email' | 'whatsapp';
  contactValue: string;
  materialType: string;
  quantity: string;
  distributionLGA: LGAName;
  deliveryPreference: 'pickup' | 'delivery';
  submittedAt: string;
}

export interface CommunityRequestSubmission {
  id: string;
  fullName: string;
  contactValue: string;
  lga: LGAName;
  topic: string;
  urgency: 'routine' | 'urgent' | 'critical';
  description: string;
  submittedAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  emailOrPhone: string;
  subject: string;
  message: string;
  submittedAt: string;
}
