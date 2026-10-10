export interface Stat {
  value: number;
  suffix: string;
  label: string;
  note: string;
}


export interface Source {
  outlet: string;
  date: string;
  title: string;
  href: string;
}

export interface Achievement {
  tag: string;
  title: string;
  tone: 'red' | 'navy';
  highlight: string;
  highlightUnit: string;
  highlightLabel: string;
  summary: string;
  points: string[];
  sources: Source[];
}

export type NewsItem = Source;

export interface TimelineItem {
  year: string;
  text: string;
  sources: Source[];
}

export interface Role {
  label: string;
  note: string;
}

export interface Issue {
  title: string;
  area: string;
  body: string;
  quote: string;
  sources: Source[];
}

export interface SiteContent {
  mode: 'assembly' | 'campaign';
  placeholder: string;
  meta: { name: string; title: string; district: string; party: string; slogan: string; subcopy: string };
  nav: { label: string; href: string }[];
  stats: Stat[];
  roles: Role[];
  timeline: TimelineItem[];
  achievements: Achievement[];
  issues: Issue[];
  news: NewsItem[];
  video: { youtubeId: string; gallery: string[] };
  contact: { endpoint: string; phone: string; email: string; address: string; sourceNote: string; consentText: string };
  footer: { copyright: string; privacyHref: string; updated: string; sourceNote: string; sns: { label: string; href: string }[] };
  campaign: { enabled: boolean; note: string };
}
