import React from 'react';
import { ArrowRight, Calendar, Clock, Newspaper } from 'lucide-react';
import { NewsArticle } from '../../types';

interface NewsCardProps {
  article: NewsArticle;
  onSelect: (article: NewsArticle) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onSelect }) => {
  return (
    <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Unboxed Metadata Line with typographic separators */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2.5">
          <span className="font-bold text-[#008751] uppercase tracking-wider font-heading">
            {article.category}
          </span>
          <span aria-hidden="true">·</span>
          <span>{article.publishedAt}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime}</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#102A43] font-heading group-hover:text-[#008751] transition-colors leading-snug">
          {article.title}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onSelect(article)}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#008751] hover:text-[#064E3B] transition-colors cursor-pointer py-1 focus-visible:outline-hidden"
        >
          <span>Read Full Update</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        {article.sourcePublisher && (
          <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
            {article.sourcePublisher}
          </span>
        )}
      </div>
    </article>
  );
};
