import type { NewsItem } from '../types';
import Reveal from './Reveal';

export default function News({ items }: { items: NewsItem[] }) {
  return (
    <section id="news" className="bg-ink py-24 text-cream md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Reveal>
          <p className="eyebrow">News</p>
          <h2 className="font-display mt-4 text-3xl md:text-4xl">언론에 비친 김미애</h2>
        </Reveal>
        <ul className="mt-12 divide-y divide-cream/15 border-y border-cream/15">
          {items.map((n, i) => (
            <Reveal as="li" key={n.href} delay={i * 80}>
              <a
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-6 py-6 transition hover:text-party-soft"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-party-soft">
                    {n.outlet} · {n.date}
                  </p>
                  <p className="mt-1 text-lg font-semibold leading-snug">{n.title}</p>
                </div>
                <span aria-hidden className="text-2xl transition group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
