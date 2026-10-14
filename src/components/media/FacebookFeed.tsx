import React, { useState } from 'react';
import { SOCIAL_CONFIG, CURATED_SOCIAL_POSTS, FacebookFeedMode } from '../../data/social';
import { ExternalLink, Play, ThumbsUp, MessageSquare, Share2, Shield, Video, Layers } from 'lucide-react';
import { GYB_PORTRAIT_URL } from '../../assets/portrait';

export const FacebookFeed: React.FC = () => {
  const [feedMode, setFeedMode] = useState<FacebookFeedMode>(SOCIAL_CONFIG.defaultMode);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section id="media-feed" className="py-20 bg-[#F8F7F2] border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#008751] font-heading">
                OFFICIAL SOCIAL & BROADCAST
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] font-heading tracking-tight">
              Updates from GYB
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Follow public statements, constituent engagements, media appearances, and announcements from verified public channels.
            </p>
          </div>

          {/* Interactive Feed Mode Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 text-xs font-medium shrink-0">
            <span className="px-2 text-slate-400 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              Feed Mode:
            </span>
            <button
              type="button"
              onClick={() => setFeedMode('CURATED_FEED')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                feedMode === 'CURATED_FEED'
                  ? 'bg-[#008751] text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Curated Posts
            </button>
            <button
              type="button"
              onClick={() => setFeedMode('FACEBOOK_EMBED')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                feedMode === 'FACEBOOK_EMBED'
                  ? 'bg-[#008751] text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Facebook Plugin
            </button>
            <button
              type="button"
              onClick={() => setFeedMode('PLACEHOLDER')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                feedMode === 'PLACEHOLDER'
                  ? 'bg-[#008751] text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Direct Channel
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout: Social Feed vs Featured Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Feed Container */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col min-h-[580px]">
            {/* Feed Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#1877F2] shadow-xs bg-slate-900">
                    <img
                      src={GYB_PORTRAIT_URL}
                      alt="Alhaji Yahaya Adoza Bello"
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[9px] font-bold">
                    f
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold font-heading text-sm text-[#102A43]">
                      Alhaji Yahaya Adoza Bello
                    </h3>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#1877F2] text-white inline-flex items-center justify-center text-[9px] font-bold" title="Verified Public Figure">✓</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Official Public Statements & Updates · @AlhajiYahayaBelloOfficial
                  </p>
                </div>
              </div>

              <a
                href={SOCIAL_CONFIG.officialFacebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008751] hover:text-[#064E3B] transition-colors"
              >
                <span>Visit Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mode A: CURATED_FEED */}
            {feedMode === 'CURATED_FEED' && (
              <div className="space-y-4 flex-1">
                {CURATED_SOCIAL_POSTS.map((post) => (
                  <article
                    key={post.id}
                    className="p-5 rounded-2xl bg-[#F8F7F2] border border-slate-200/80 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-300 bg-slate-800 shrink-0">
                          <img
                            src={GYB_PORTRAIT_URL}
                            alt={post.author}
                            className="w-full h-full object-cover object-top"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <span className="font-bold text-slate-800 block text-xs leading-none">{post.author}</span>
                          <span className="text-[10px] text-slate-400">{post.authorHandle}</span>
                        </div>
                      </div>
                      <span className="text-[11px]">{post.date}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {post.content}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3.5 h-3.5 text-[#008751]" />
                          {post.engagement.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                          {post.engagement.comments.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="w-3.5 h-3.5 text-slate-400" />
                          {post.engagement.shares.toLocaleString()}
                        </span>
                      </div>

                      <a
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#008751] font-semibold hover:underline"
                      >
                        View Original →
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Mode B: FACEBOOK_EMBED */}
            {feedMode === 'FACEBOOK_EMBED' && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#F8F7F2] rounded-2xl border border-slate-200">
                <div className="w-12 h-12 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="font-bold font-heading text-base text-[#102A43]">
                  Facebook Page Plugin Integration
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
                  The Facebook JavaScript SDK embed renders the confirmed public timeline. If third-party cookies or tracker protections block automatic loading, constituents can connect directly.
                </p>

                <div className="mt-6 w-full max-w-sm p-4 bg-white rounded-xl border border-slate-200 shadow-xs text-xs text-left">
                  <p className="font-semibold text-slate-800">Target Configured Page:</p>
                  <p className="text-slate-500 truncate mt-0.5">{SOCIAL_CONFIG.officialFacebookPageUrl}</p>
                </div>

                <a
                  href={SOCIAL_CONFIG.officialFacebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1877F2] text-white text-xs font-bold hover:bg-blue-700 transition-colors"
                >
                  <span>Open Facebook Official Timeline</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Mode C: PLACEHOLDER */}
            {feedMode === 'PLACEHOLDER' && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#F8F7F2] rounded-2xl border border-slate-200">
                <div className="w-12 h-12 rounded-full bg-[#008751]/10 text-[#008751] flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="font-bold font-heading text-base text-[#102A43]">
                  Direct Social Media Access
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
                  Official statements, live event broadcasts, and constituent responses are distributed continuously on confirmed social channels.
                </p>

                <a
                  href={SOCIAL_CONFIG.officialFacebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#008751] text-white text-xs font-bold hover:bg-[#064E3B] transition-colors"
                >
                  <span>Visit Confirmed Facebook Profile</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Featured Video & Key Statement */}
          <div className="lg:col-span-5 space-y-6">
            {/* Featured Video Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Video className="w-4 h-4 text-[#008751]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#008751] font-heading">
                  FEATURED BROADCAST
                </span>
              </div>

              {/* Video Player / Click-to-Play Card */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center group shadow-md">
                {isVideoPlaying ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${SOCIAL_CONFIG.featuredVideo.youtubeEmbedId}?autoplay=1`}
                    title="GYB Stewardship Broadcast"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <button
                      type="button"
                      onClick={() => setIsVideoPlaying(true)}
                      className="relative z-10 w-14 h-14 rounded-full bg-[#008751] text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-[#102A43] transition-all shadow-xl cursor-pointer"
                      aria-label="Play broadcast video"
                    >
                      <Play className="w-6 h-6 ml-0.5" />
                    </button>
                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs flex justify-between items-center z-10">
                      <span className="font-semibold truncate pr-2">
                        {SOCIAL_CONFIG.featuredVideo.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-black/60 font-mono text-[10px]">
                        {SOCIAL_CONFIG.featuredVideo.duration}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <h4 className="mt-4 font-bold font-heading text-base text-[#102A43]">
                {SOCIAL_CONFIG.featuredVideo.title}
              </h4>

              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {SOCIAL_CONFIG.featuredVideo.description}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Source: {SOCIAL_CONFIG.featuredVideo.videoSourceTitle}</span>
                <span className="text-[#008751] font-semibold">1080p HD Archive</span>
              </div>
            </div>

            {/* Quick Media Inquiries Box */}
            <div className="bg-[#E7F3EC] rounded-2xl p-6 border border-[#0B6B46]/20">
              <h4 className="font-bold font-heading text-sm text-[#064E3B] mb-1">
                Media Accreditation & Interviews
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Broadcast journalists, press representatives, and civic editors may request official footage and media interview scheduling via our press desk.
              </p>
              <a
                href="#contact"
                className="mt-3 inline-block text-xs font-bold text-[#008751] hover:underline"
              >
                Contact Press Directorate →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
