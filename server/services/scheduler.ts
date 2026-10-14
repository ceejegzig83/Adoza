import { newsStore } from './newsStore';
import { geminiNewsService } from './geminiService';
import { EditorialStatus } from '../../src/types';

export class NewsScheduler {
  private timer: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;
  private consecutiveFailures: number = 0;

  constructor() {
    this.start();
  }

  public start() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    const settings = newsStore.getSettings();
    const intervalMs = (settings.scanIntervalHours || 6) * 3600 * 1000;

    console.log(`[NewsScheduler] Starting automated news intelligence worker with interval: ${settings.scanIntervalHours}h`);

    // Schedule next run
    const nextRun = new Date(Date.now() + intervalMs).toISOString();
    newsStore.setTimestamps(new Date().toISOString(), nextRun);

    this.timer = setInterval(() => {
      this.runScheduledTask('Automated 6-Hour Scheduler');
    }, intervalMs);
  }

  public stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      console.log('[NewsScheduler] Stopped automated news worker.');
    }
  }

  public async runScheduledTask(actor: string = 'Automated Scheduler'): Promise<{
    discovered: number;
    duplicates: number;
    autoPublished: number;
    pendingReview: number;
    errors: string[];
  }> {
    if (this.isRunning) {
      console.log('[NewsScheduler] Discovery run already in progress, skipping concurrent trigger.');
      return { discovered: 0, duplicates: 0, autoPublished: 0, pendingReview: 0, errors: ['Scan already running'] };
    }

    this.isRunning = true;
    const errors: string[] = [];
    let discoveredCount = 0;
    let duplicateCount = 0;
    let autoPublishedCount = 0;
    let pendingCount = 0;

    const startTime = new Date().toISOString();
    console.log(`[NewsScheduler] Initiating discovery scan by [${actor}] at ${startTime}...`);

    try {
      const drafts = await geminiNewsService.discoverAndProcessNews();
      const settings = newsStore.getSettings();

      for (const draft of drafts) {
        if (newsStore.isDuplicate(draft.sourceUrl, draft.title)) {
          duplicateCount++;
          continue;
        }

        // Editorial Auto-Publish Safety Policy:
        // 1. Never auto-publish if emergency switch is active
        // 2. Never auto-publish allegations or legal proceedings
        // 3. Must be an explicitly configured trusted publisher
        let initialStatus: EditorialStatus = 'pending_review';
        let isAutoPublished = false;

        const isTrusted = settings.trustedPublishers.some((tp) =>
          draft.sourcePublisher.toLowerCase().includes(tp.toLowerCase())
        );

        const isLowRiskFact = draft.contentNature === 'verified_fact';

        if (
          settings.autoPublishTrusted &&
          !settings.emergencyDisableAutoPublish &&
          isTrusted &&
          isLowRiskFact
        ) {
          initialStatus = 'published';
          isAutoPublished = true;
          autoPublishedCount++;
        } else {
          pendingCount++;
        }

        newsStore.addDiscoveredArticle({
          title: draft.title,
          category: draft.category,
          sourcePublisher: draft.sourcePublisher,
          sourceUrl: draft.sourceUrl,
          contentNature: draft.contentNature,
          excerpt: draft.excerpt,
          content: draft.content,
          confidenceScore: draft.confidenceScore,
          verificationNotes: draft.verificationNotes,
          publishedAt: draft.publishedAt,
          editorialStatus: initialStatus,
          isAutoPublished,
        });

        discoveredCount++;
      }

      this.consecutiveFailures = 0;

      // Update next run time
      const nextRunTime = new Date(Date.now() + (settings.scanIntervalHours || 6) * 3600 * 1000).toISOString();
      newsStore.setTimestamps(new Date().toISOString(), nextRunTime);

      newsStore.addAuditLog({
        actor,
        action: 'SYSTEM_SCAN',
        details: `Scan complete: ${discoveredCount} discovered (${autoPublishedCount} auto-published, ${pendingCount} pending review, ${duplicateCount} duplicates filtered).`,
      });

      console.log(`[NewsScheduler] Discovery finished: ${discoveredCount} added, ${duplicateCount} duplicates.`);
    } catch (err: any) {
      console.error('[NewsScheduler] Error executing discovery scan:', err);
      this.consecutiveFailures++;
      errors.push(err.message || 'Unknown scan error');

      newsStore.addAuditLog({
        actor,
        action: 'SYSTEM_SCAN',
        details: `Discovery run encountered error: ${err.message || 'Unknown error'}`,
      });
    } finally {
      this.isRunning = false;
    }

    return {
      discovered: discoveredCount,
      duplicates: duplicateCount,
      autoPublished: autoPublishedCount,
      pendingReview: pendingCount,
      errors,
    };
  }

  public getStatus() {
    const timestamps = newsStore.getTimestamps();
    const settings = newsStore.getSettings();

    return {
      isRunning: this.isRunning,
      lastRunTime: timestamps.lastSearchTime,
      nextRunTime: timestamps.nextSearchTime,
      intervalHours: settings.scanIntervalHours || 6,
      autoPublishEnabled: settings.autoPublishTrusted && !settings.emergencyDisableAutoPublish,
      consecutiveFailures: this.consecutiveFailures,
    };
  }
}

export const newsScheduler = new NewsScheduler();
