import { NewsArticle, SystemHealthStatus, SystemSettings, AuditLogEntry, EditorialStatus } from '../types';

export interface NewsResponse {
  success: boolean;
  data: NewsArticle[];
  meta?: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    lastUpdated?: string;
    nextScan?: string;
  };
  error?: string;
}

export const api = {
  // Public news
  async getPublishedNews(category?: string, search?: string, page: number = 1, limit: number = 20): Promise<NewsResponse> {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'All') params.append('category', category);
      if (search && search.trim() !== '') params.append('search', search.trim());
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const res = await fetch(`/api/news?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err: any) {
      console.warn('[API] Could not fetch from server /api/news, using client fallback:', err);
      // Fallback response if dev server was just started
      return {
        success: false,
        data: [],
        error: err.message,
      };
    }
  },

  // Admin news review queue
  async getAdminNews(status?: EditorialStatus, category?: string, search?: string): Promise<{ success: boolean; data: NewsArticle[]; total?: number; error?: string }> {
    try {
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (category && category !== 'All') params.append('category', category);
      if (search && search.trim() !== '') params.append('search', search.trim());

      const res = await fetch(`/api/admin/news?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, data: [], error: err.message };
    }
  },

  // Trigger manual news search
  async triggerNewsSearch(actor: string = 'Editorial Admin'): Promise<{ success: boolean; message: string; result?: any; error?: string }> {
    try {
      const res = await fetch('/api/admin/news/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actor }),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, message: 'Scan failed to trigger', error: err.message };
    }
  },

  // Update article status / edits
  async updateArticleStatus(id: string, updates: Partial<NewsArticle>, actor: string = 'Editorial Admin'): Promise<{ success: boolean; data?: NewsArticle; error?: string }> {
    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updates, actor }),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Get System Health
  async getSystemHealth(): Promise<{ success: boolean; data?: SystemHealthStatus; error?: string }> {
    try {
      const res = await fetch('/api/admin/health');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Get Audit Logs
  async getAuditLogs(): Promise<{ success: boolean; data: AuditLogEntry[]; error?: string }> {
    try {
      const res = await fetch('/api/admin/audit-logs');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, data: [], error: err.message };
    }
  },

  // Settings
  async getSettings(): Promise<{ success: boolean; data?: SystemSettings; error?: string }> {
    try {
      const res = await fetch('/api/admin/settings');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  async updateSettings(settings: Partial<SystemSettings>, actor: string = 'Administrator'): Promise<{ success: boolean; data?: SystemSettings; error?: string }> {
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings, actor }),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
};
