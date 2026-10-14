import React, { useState, useEffect, useMemo } from 'react';
import { NEWS_ARTICLES } from '../../data/news';
import { NewsCard } from './NewsCard';
import { NewsModal } from './NewsModal';
import { NewsArticle } from '../../types';
import { api } from '../../services/api';
import { Search, RefreshCw, Radio, CheckCircle, ArrowRight, Newspaper, X, ShieldCheck, Sparkles } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Official Statements',
  'Public Service Record',
  'Media Coverage',
  'Policy & Agenda',
  'Community Engagement',
];

export const NewsSection: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(NEWS_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('Live Intelligence Sync');

  const fetchLiveNews = async () => {
    setIsLoading(true);
    try {
      const response = await api.getPublishedNews(selectedCategory, searchQuery);
      if (response.success && response.data && response.data.length > 0) {
        setArticles(response.data);
        if (response.meta?.lastUpdated) {
          const date = new Date(response.meta.lastUpdated);
          setLastUpdatedTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      }
    } catch (err) {
      console.warn('[NewsSection] Fetch live news failed, preserving current view:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveNews();
  }, [selectedCategory]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.sourcePublisher && article.sourcePublisher.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const featuredArticle = filteredArticles.find((a) => a.isFeatured) || filteredArticles[0] || NEWS_ARTICLES[0];
  const gridArticles = filteredArticles.filter((a) => a.id !== featuredArticle?.id || searchQuery !== '' || selectedCategory !== 'All');

  return (
    <section id="news" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#008751] font-heading">
                PRESS & VERIFIED MEDIA
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E7F3EC] border border-[#008751]/20 text-[11px] font-semibold text-[#064E3B]">
                <Radio className="w-3 h-3 text-[#008751] animate-pulse" />
                Live Automated Monitoring
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] font-heading tracking-tight">
              News, Statements & Public Updates
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Real-time monitoring of verified news releases, official public statements, and policy consultations from credible Nigerian press organizations and government gazettes.
            </p>
          </div>

          {/* Search Bar & Sync Action */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search headlines or sources..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-[#F8F7F2] text-xs sm:text-sm text-[#102A43] placeholder-slate-400 focus:bg-white focus:border-[#008751] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={fetchLiveNews}
              disabled={isLoading}
              className="p-2.5 rounded-xl bg-[#F8F7F2] hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer shrink-0"
              title="Refresh live news feed"
              aria-label="Refresh news feed"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#008751]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Intelligence Status Strip */}
        <div className="mb-8 p-3.5 rounded-2xl bg-[#F8F7F2] border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#008751] shrink-0" />
            <span>
              <strong>Verified Ingestion:</strong> Filtered for attribution, legal accuracy, and duplicate suppression.
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono">
            <span>{articles.length} Published Dispatches</span>
            <span>·</span>
            <span>Sync: {lastUpdatedTime}</span>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none" role="tablist">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#008751] text-white shadow-xs'
                    : 'bg-[#F8F7F2] text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured Story (shown when no specific search is active and on 'All' tab) */}
        {selectedCategory === 'All' && searchQuery === '' && featuredArticle && (
          <div className="mb-10 bg-gradient-to-br from-[#064E3B] to-[#04281E] rounded-3xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-2 text-xs text-emerald-200 mb-3">
                <span className="font-bold text-[#D4AF37] uppercase tracking-wider font-heading">
                  FEATURED DISPATCH
                </span>
                <span aria-hidden="true">·</span>
                <span>{featuredArticle.publishedAt}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredArticle.readingTime}</span>
                {featuredArticle.sourcePublisher && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-300 font-medium">{featuredArticle.sourcePublisher}</span>
                  </>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight leading-snug">
                {featuredArticle.title}
              </h3>

              <p className="mt-4 text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
                {featuredArticle.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(featuredArticle)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#008751] hover:bg-[#D4AF37] hover:text-[#102A43] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                >
                  <span>Read Full Dispatch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                {featuredArticle.sourceUrl && (
                  <a
                    href={featuredArticle.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-300 underline underline-offset-2 hover:text-white"
                  >
                    View Original Source →
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Remaining Articles Grid */}
        {gridArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onSelect={(a) => setSelectedArticle(a)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#F8F7F2] rounded-3xl border border-slate-200">
            <Newspaper className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h4 className="font-bold text-base text-[#102A43] font-heading">
              No matching updates found
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              No published articles match your current search or category filter. Try clearing the search term.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Reader Modal */}
      <NewsModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
};
