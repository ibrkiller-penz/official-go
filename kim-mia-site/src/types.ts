export interface Stat {
  value: number;
  suffix: string;
  label: string;
  note: string;
}

export interface TimelineItem {
  year: string;
  text: string;
}

export interface Achievement {
  tag: string;
  title: string;
  body: string;
  source: string;
  image: string;
}

export interface NewsItem {
  date: string;
  title: string;
  href: string;
  image: string;
}

export interface SiteContent {
  mode: 'assembly' | 'campaign';
  placeholder: string;
  meta: { name: string; title: string; district: string; party: string; slogan: string; subcopy: string };
  nav: { label: string; href: string }[];
  stats: Stat[];
  timeline: TimelineItem[];
  achievements: Achievement[];
  issues: { title: string; body: string }[];
  news: NewsItem[];
  video: { youtubeId: string; gallery: string[] };
  contact: { endpoint: string; phone: string; address: string; consentText: string };
  footer: { copyright: string; privacyHref: string; sns: { label: string; href: string }[] };
  campaign: { enabled: boolean; note: string };
}
