import type { NewsItem } from '../types';
import Reveal from './Reveal';
import SafeImage from './SafeImage';

export default function News({ items }: { items: NewsItem[] }) {
  return (
    <section id="news" className="bg-ink py-24 text-cream md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">News</p>
              <h2 className="font-serif mt-4 text-3xl font-bold md:text-4xl">최근 소식</h2>
            </div>
          </div>
        </Reveal>
        <ul className="mt-12 divide-y divide-cream/15 border-y border-cream/15">
          {items.map((n, i) => (
            <Reveal key={n.href} delay={i * 80}>
              <li>
                <a
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-6 py-6 transition hover:text-gold-soft"
                >
                  <SafeImage src={n.image} alt="" className="hidden h-20 w-28 shrink-0 rounded-lg sm:block" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm tracking-wider text-gold-soft">{n.date}</p>
                    <p className="mt-1 truncate text-lg font-semibold">{n.title}</p>
                  </div>
                  <span aria-hidden className="text-2xl transition group-hover:translate-x-1">→</span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
