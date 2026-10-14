import { Router, Request, Response } from 'express';
import { newsStore } from '../services/newsStore';
import { newsScheduler } from '../services/scheduler';
import { geminiNewsService } from '../services/geminiService';
import { EditorialStatus } from '../../src/types';

const router = Router();

// ==========================================
// PUBLIC ENDPOINTS
// ==========================================

/**
 * GET /api/news
 * Returns all published articles with optional search, category, and pagination
 */
router.get('/news', (req: Request, res: Response) => {
  try {
    let articles = newsStore.getPublishedArticles();
    const { category, search, page = '1', limit = '10' } = req.query;

    if (category && category !== 'All') {
      articles = articles.filter((a) => a.category === category);
    }

    if (search && typeof search === 'string' && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q) ||
          (a.sourcePublisher && a.sourcePublisher.toLowerCase().includes(q))
      );
    }

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.max(1, Math.min(50, parseInt(limit as string, 10) || 10));
    const totalCount = articles.length;
    const totalPages = Math.ceil(totalCount / limitNum);
    const paginated = articles.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    const schedulerStatus = newsScheduler.getStatus();

    res.json({
      success: true,
      data: paginated,
      meta: {
        page: pageNum,
        limit: limitNum,
        totalCount,
        totalPages,
        lastUpdated: schedulerStatus.lastRunTime,
        nextScan: schedulerStatus.nextRunTime,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to fetch public news.' });
  }
});

/**
 * GET /api/news/:idOrSlug
 */
router.get('/news/:idOrSlug', (req: Request, res: Response) => {
  try {
    const { idOrSlug } = req.params;
    const articles = newsStore.getPublishedArticles();
    const article = articles.find((a) => a.id === idOrSlug || a.slug === idOrSlug);

    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found or not currently published.' });
    }

    res.json({ success: true, data: article });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to load article.' });
  }
});

// ==========================================
// ADMIN / EDITORIAL ENDPOINTS
// ==========================================

/**
 * GET /api/admin/news
 */
router.get('/admin/news', (req: Request, res: Response) => {
  try {
    const { status, category, search } = req.query;
    let articles = newsStore.getAllArticles(status as EditorialStatus);

    if (category && category !== 'All') {
      articles = articles.filter((a) => a.category === category);
    }

    if (search && typeof search === 'string' && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          (a.sourcePublisher && a.sourcePublisher.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      data: articles,
      total: articles.length,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/admin/news/search
 * Trigger manual "Run news search now"
 */
router.post('/admin/news/search', async (req: Request, res: Response) => {
  try {
    const actor = req.body.actor || 'Administrator';
    console.log(`[API] Admin triggered manual news scan by ${actor}`);
    const result = await newsScheduler.runScheduledTask(`Manual Trigger by ${actor}`);
    res.json({
      success: true,
      message: 'News intelligence scan executed successfully.',
      result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Scan trigger failed.' });
  }
});

/**
 * PATCH /api/admin/news/:id
 * Approve, publish, reject, archive, or edit an article
 */
router.patch('/admin/news/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const actor = req.body.actor || 'Administrator';

    const updated = newsStore.updateArticle(id, updates, actor);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Article record not found.' });
    }

    res.json({
      success: true,
      message: `Article '${updated.title}' updated successfully.`,
      data: updated,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * DELETE /api/admin/news/:id
 */
router.delete('/admin/news/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const actor = (req.query.actor as string) || 'Administrator';
    const deleted = newsStore.deleteArticle(id, actor);

    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Article record not found.' });
    }

    res.json({ success: true, message: 'Article permanently removed from queue.' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/admin/health
 * Returns status of Search provider, AI summarizer, Database, Scheduler, and Queues
 */
router.get('/admin/health', (req: Request, res: Response) => {
  try {
    const schedulerState = newsScheduler.getStatus();
    const health = newsStore.getHealth({
      scheduler: {
        status: schedulerState.isRunning ? 'active' : 'idle',
        intervalHours: schedulerState.intervalHours,
        lastRunTime: schedulerState.lastRunTime,
        nextRunTime: schedulerState.nextRunTime,
        autoPublishEnabled: schedulerState.autoPublishEnabled,
        consecutiveFailures: schedulerState.consecutiveFailures,
      },
    });

    res.json({
      success: true,
      data: health,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/admin/audit-logs
 */
router.get('/admin/audit-logs', (req: Request, res: Response) => {
  try {
    const logs = newsStore.getAuditLogs(100);
    res.json({ success: true, data: logs });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/admin/settings
 */
router.get('/admin/settings', (req: Request, res: Response) => {
  try {
    const settings = newsStore.getSettings();
    res.json({ success: true, data: settings });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/admin/settings
 */
router.post('/admin/settings', (req: Request, res: Response) => {
  try {
    const actor = req.body.actor || 'Administrator';
    const updated = newsStore.updateSettings(req.body.settings || {}, actor);
    // Restart scheduler with new interval if changed
    newsScheduler.start();
    res.json({ success: true, message: 'Settings saved.', data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
