import { SocialPost } from '../types';

export type FacebookFeedMode = 'CURATED_FEED' | 'FACEBOOK_EMBED' | 'PLACEHOLDER';

export const SOCIAL_CONFIG = {
  defaultMode: 'CURATED_FEED' as FacebookFeedMode,
  officialFacebookPageUrl: 'https://www.facebook.com/AlhajiYahayaBelloOfficial', // Configurable official channel
  facebookPageName: 'Alhaji Yahaya Adoza Bello — Official Updates',
  featuredVideo: {
    title: 'The GYB Stewardship Stewardship Documentary (2016–2024)',
    description: 'An in-depth documentary chronicling the construction of the Reference Hospital Okene, CUSTECH Osara, security stabilization, and democratic transition in Kogi State.',
    duration: '18:45',
    youtubeEmbedId: 'dQw4w9WgXcQ', // Configurable YouTube video id
    videoSourceTitle: 'Official Documentary Archive',
  },
};

export const CURATED_SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    platform: 'facebook',
    author: 'Alhaji Yahaya Adoza Bello',
    authorHandle: '@AlhajiYahayaBelloOfficial',
    date: '3 days ago',
    content: 'Leadership is fundamentally about service, accountability, and the courage to lay foundations that will outlive our tenure. Our thoughts and prayers remain with the resilient, hardworking people of Kogi Central. Together, we continue moving our homeland forward.',
    permalink: 'https://www.facebook.com',
    engagement: {
      likes: 1840,
      shares: 320,
      comments: 412,
    },
  },
  {
    id: 'post-2',
    platform: 'facebook',
    author: 'Alhaji Yahaya Adoza Bello',
    authorHandle: '@AlhajiYahayaBelloOfficial',
    date: '1 week ago',
    content: 'Education remains the greatest equalizer. Watching the faculties of CUSTECH Osara thrive and produce young engineers and tech innovators confirms that our investments in science and technology were not in vain. May our youth continue to break boundaries.',
    permalink: 'https://www.facebook.com',
    engagement: {
      likes: 2450,
      shares: 512,
      comments: 630,
    },
  },
  {
    id: 'post-3',
    platform: 'facebook',
    author: 'Alhaji Yahaya Adoza Bello',
    authorHandle: '@AlhajiYahayaBelloOfficial',
    date: '2 weeks ago',
    content: 'Heartfelt appreciation to our community leaders, women cooperative groups, and youth across Okene, Adavi, Okehi, Ajaokuta, and Ogori-Magongo for your sustained solidarity. Our dedication to the prosperity of Kogi Central remains steadfast and unwavering.',
    permalink: 'https://www.facebook.com',
    engagement: {
      likes: 3120,
      shares: 740,
      comments: 890,
    },
  },
];
