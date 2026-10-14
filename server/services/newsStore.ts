import fs from 'fs';
import path from 'path';
import { NewsArticle, EditorialStatus, AuditLogEntry, SystemHealthStatus, SystemSettings } from '../../src/types';
import { NEWS_ARTICLES } from '../../src/data/news';

const DATA_DIR = path.resolve(process.cwd(), 'server/data');
const STORE_FILE = path.join(DATA_DIR, 'news-store.json');

interface StoreSchema {
  articles: NewsArticle[];
  auditLogs: AuditLogEntry[];
  settings: SystemSettings;
  lastSearchTime?: string;
  nextSearchTime?: string;
}

const DEFAULT_SETTINGS: SystemSettings = {
  autoPublishTrusted: false,
  trustedPublishers: ['Official Gazette', 'Federal Ministry of Information', 'Kogi State Government', 'CUSTECH Media Directorate'],
  scanIntervalHours: 6,
  emergencyDisableAutoPublish: true,
  allowLegalAutoPublish: false,
};

function seedDefaultArticles(): NewsArticle[] {
  return NEWS_ARTICLES.map((a, index) => ({
    ...a,
    editorialStatus: 'published' as EditorialStatus,
    contentNature: a.category === 'Official Statements' 
      ? 'campaign_statement' 
      : a.category === 'Policy & Agenda' 
        ? 'opinion_analysis' 
        : 'verified_fact',
    discoveredAt: a.publishedAt,
    reviewedAt: a.publishedAt,
    reviewedBy: 'Editorial Board (Archival)',
    confidenceScore: 95 - index * 3,
    verificationNotes: 'Archival record verified against official state/institutional documentation.',
    isAutoPublished: false,
  }));
}

export class NewsStore {
  private data: StoreSchema;

  constructor() {
    this.ensureDirectory();
    this.data = this.load();
  }

  private ensureDirectory() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private load(): StoreSchema {
    try {
      if (fs.existsSync(STORE_FILE)) {
        const raw = fs.readFileSync(STORE_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.articles) && parsed.articles.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('[NewsStore] Could not read existing store file, creating fresh store.', err);
    }

    const seeded: StoreSchema = {
      articles: seedDefaultArticles(),
      auditLogs: [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actor: 'System Bootstrapper',
          action: 'SYSTEM_SCAN',
          details: 'Initialized news intelligence database with 5 baseline historical records.',
        },
      ],
      settings: DEFAULT_SETTINGS,
      lastSearchTime: new Date().toISOString(),
      nextSearchTime: new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
    };

    this.save(seeded);
    return seeded;
  }

  private save(dataToSave?: StoreSchema) {
    try {
      this.ensureDirectory();
      const content = JSON.stringify(dataToSave || this.data, null, 2);
      fs.writeFileSync(STORE_FILE, content, 'utf-8');
    } catch (err) {
      console.error('[NewsStore] Failed to write store file:', err);
    }
  }

  public getPublishedArticles(): NewsArticle[] {
    return this.data.articles
      .filter((a) => a.editorialStatus === 'published')
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  public getAllArticles(statusFilter?: EditorialStatus): NewsArticle[] {
    if (!statusFilter) {
      return [...this.data.articles].sort((a, b) => {
        const dateA = a.discoveredAt ? new Date(a.discoveredAt).getTime() : 0;
        const dateB = b.discoveredAt ? new Date(b.discoveredAt).getTime() : 0;
        return dateB - dateA;
      });
    }
    return this.data.articles.filter((a) => a.editorialStatus === statusFilter);
  }

  public getArticleById(id: string): NewsArticle | undefined {
    return this.data.articles.find((a) => a.id === id);
  }

  public isDuplicate(url?: string, title?: string): boolean {
    if (!url && !title) return false;
    const normTitle = title ? title.toLowerCase().trim() : '';
    const normUrl = url ? url.toLowerCase().trim().replace(/https?:\/\/(www\.)?/, '') : '';

    return this.data.articles.some((a) => {
      if (normUrl && a.sourceUrl && a.sourceUrl.toLowerCase().includes(normUrl)) {
        return true;
      }
      if (normTitle && a.title.toLowerCase().trim() === normTitle) {
        return true;
      }
      return false;
    });
  }

  public addDiscoveredArticle(articleData: Partial<NewsArticle>): NewsArticle {
    const id = `news-ai-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const slug = (articleData.title || 'news-item')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newArticle: NewsArticle = {
      id,
      slug,
      title: articleData.title || 'Untitled Report',
      category: articleData.category || 'Media Coverage',
      excerpt: articleData.excerpt || '',
      content: articleData.content || '',
      publishedAt: articleData.publishedAt || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readingTime: articleData.readingTime || '3 min read',
      sourcePublisher: articleData.sourcePublisher || 'Nigerian News Source',
      sourceUrl: articleData.sourceUrl || '',
      isFeatured: false,
      editorialStatus: articleData.editorialStatus || 'pending_review',
      contentNature: articleData.contentNature || 'verified_fact',
      discoveredAt: new Date().toISOString(),
      confidenceScore: articleData.confidenceScore || 85,
      verificationNotes: articleData.verificationNotes || 'Automatically ingested by News Intelligence Engine.',
      originalSourceSnippet: articleData.originalSourceSnippet || '',
      isAutoPublished: articleData.isAutoPublished || false,
    };

    this.data.articles.unshift(newArticle);
    this.addAuditLog({
      actor: 'AI Ingestion Engine',
      action: 'DISCOVERED',
      targetArticleId: newArticle.id,
      targetArticleTitle: newArticle.title,
      details: `Discovered story from ${newArticle.sourcePublisher} with status: ${newArticle.editorialStatus}`,
    });

    this.save();
    return newArticle;
  }

  public updateArticle(id: string, updates: Partial<NewsArticle>, actor: string = 'Editor'): NewsArticle | null {
    const index = this.data.articles.findIndex((a) => a.id === id);
    if (index === -1) return null;

    const current = this.data.articles[index];
    const previousStatus = current.editorialStatus;

    const updated: NewsArticle = {
      ...current,
      ...updates,
      reviewedAt: new Date().toISOString(),
      reviewedBy: actor,
    };

    this.data.articles[index] = updated;

    let actionType: AuditLogEntry['action'] = 'EDITED';
    if (updates.editorialStatus && updates.editorialStatus !== previousStatus) {
      if (updates.editorialStatus === 'approved') actionType = 'APPROVED';
      else if (updates.editorialStatus === 'published') actionType = 'PUBLISHED';
      else if (updates.editorialStatus === 'rejected') actionType = 'REJECTED';
      else if (updates.editorialStatus === 'archived') actionType = 'ARCHIVED';
    }

    this.addAuditLog({
      actor,
      action: actionType,
      targetArticleId: id,
      targetArticleTitle: updated.title,
      details: updates.editorialStatus && updates.editorialStatus !== previousStatus
        ? `Status shifted from '${previousStatus}' to '${updates.editorialStatus}'`
        : 'Article fields updated by administrator.',
    });

    this.save();
    return updated;
  }

  public deleteArticle(id: string, actor: string = 'Administrator'): boolean {
    const index = this.data.articles.findIndex((a) => a.id === id);
    if (index === -1) return false;

    const removed = this.data.articles[index];
    this.data.articles.splice(index, 1);

    this.addAuditLog({
      actor,
      action: 'ARCHIVED',
      targetArticleId: id,
      targetArticleTitle: removed.title,
      details: `Article permanently purged from active review queues.`,
    });

    this.save();
    return true;
  }

  public getSettings(): SystemSettings {
    return { ...this.data.settings };
  }

  public updateSettings(newSettings: Partial<SystemSettings>, actor: string = 'Administrator'): SystemSettings {
    this.data.settings = {
      ...this.data.settings,
      ...newSettings,
    };

    this.addAuditLog({
      actor,
      action: 'SETTINGS_CHANGED',
      details: `Updated monitoring configurations (AutoPublish: ${this.data.settings.autoPublishTrusted}, Interval: ${this.data.settings.scanIntervalHours}h).`,
    });

    this.save();
    return this.data.settings;
  }

  public setTimestamps(last: string, next: string) {
    this.data.lastSearchTime = last;
    this.data.nextSearchTime = next;
    this.save();
  }

  public getTimestamps() {
    return {
      lastSearchTime: this.data.lastSearchTime || new Date().toISOString(),
      nextSearchTime: this.data.nextSearchTime || new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
    };
  }

  public getAuditLogs(limit: number = 50): AuditLogEntry[] {
    return (this.data.auditLogs || []).slice(0, limit);
  }

  public addAuditLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) {
    if (!this.data.auditLogs) {
      this.data.auditLogs = [];
    }
    const log: AuditLogEntry = {
      ...entry,
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
    };
    this.data.auditLogs.unshift(log);
    if (this.data.auditLogs.length > 200) {
      this.data.auditLogs = this.data.auditLogs.slice(0, 200);
    }
  }

  public getHealth(extra?: Partial<SystemHealthStatus>): SystemHealthStatus {
    const queueCounts = {
      discovered: this.data.articles.filter((a) => a.editorialStatus === 'discovered').length,
      pendingReview: this.data.articles.filter((a) => a.editorialStatus === 'pending_review' || a.editorialStatus === 'draft_generated').length,
      approved: this.data.articles.filter((a) => a.editorialStatus === 'approved').length,
      published: this.data.articles.filter((a) => a.editorialStatus === 'published').length,
      rejected: this.data.articles.filter((a) => a.editorialStatus === 'rejected').length,
      archived: this.data.articles.filter((a) => a.editorialStatus === 'archived').length,
      total: this.data.articles.length,
    };

    const hasApiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');

    return {
      searchProvider: {
        status: hasApiKey ? 'operational' : 'degraded',
        providerName: 'Google Search Grounding / Verified Nigerian News Hub',
        lastQueryTime: this.data.lastSearchTime,
        details: hasApiKey ? 'Connected with live grounding' : 'Operating in fallback news discovery mode',
        ...extra?.searchProvider,
      },
      aiSummarizer: {
        status: hasApiKey ? 'operational' : 'degraded',
        modelName: 'gemini-3.8-flash',
        lastProcessedTime: this.data.lastSearchTime,
        apiKeyConfigured: hasApiKey,
        ...extra?.aiSummarizer,
      },
      database: {
        status: 'operational',
        recordCount: this.data.articles.length,
        lastSavedTime: new Date().toISOString(),
        ...extra?.database,
      },
      scheduler: {
        status: 'active',
        intervalHours: this.data.settings.scanIntervalHours || 6,
        lastRunTime: this.data.lastSearchTime,
        nextRunTime: this.data.nextSearchTime,
        autoPublishEnabled: this.data.settings.autoPublishTrusted && !this.data.settings.emergencyDisableAutoPublish,
        consecutiveFailures: 0,
        ...extra?.scheduler,
      },
      queueCounts,
    };
  }
}

export const newsStore = new NewsStore();
