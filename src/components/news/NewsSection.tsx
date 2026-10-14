import React, { useState, useMemo } from 'react';
import { NEWS_ARTICLES } from '../../data/news';
import { NewsCard } from './NewsCard';
import { NewsModal } from './NewsModal';
import { NewsArticle } from '../../types';
import { Search, Calendar, Clock, ArrowRight, Newspaper, X } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Official Statements',
  'Public Service Record',
  'Policy & Agenda',
  'Community Engagement',
];

export const NewsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const filteredArticles = useMemo(() => {
    return NEWS_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = NEWS_ARTICLES.find((a) => a.isFeatured) || NEWS_ARTICLES[0];
  const gridArticles = filteredArticles.filter((a) => a.id !== featuredArticle.id || searchQuery !== '' || selectedCategory !== 'All');

  return (
    <section id="news" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#008751] font-heading">
                PRESS & MEDIA CENTER
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] font-heading tracking-tight">
              News, Statements & Public Updates
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Read verified press releases, official statements, and community engagement updates regarding the public record and proposed representation priorities.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news or statements..."
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
        {selectedCategory === 'All' && searchQuery === '' && (
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
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight leading-snug">
                {featuredArticle.title}
              </h3>

              <p className="mt-4 text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
                {featuredArticle.excerpt}
              </p>

              <div className="mt-8 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(featuredArticle)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#008751] hover:bg-[#D4AF37] hover:text-[#102A43] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-emerald-300">
                  Source: {featuredArticle.sourcePublisher}
                </span>
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
              No articles match your current search or category filter. Try clearing the search term.
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
