import { useState } from 'react';
import type { NewsItem } from '../types';
import Reveal from './Reveal';

const FIRST = 6;

export default function News({ items }: { items: NewsItem[] }) {
  const [all, setAll] = useState(false);
  const shown = all ? items : items.slice(0, FIRST);

  return (
    <section id="news" className="bg-ink py-24 text-cream md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Reveal>
          <p className="eyebrow text-party-soft">News</p>
          <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-4xl">언론에 비친 김미애</h2>
        </Reveal>
        <ul className="mt-12 divide-y divide-cream/15 border-y border-cream/15">
          {shown.map((n, i) => (
            <Reveal as="li" key={n.href} delay={(i % FIRST) * 60}>
              <a
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-6 py-6 transition hover:text-party-soft"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-base text-party-soft">
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
        {items.length > FIRST && (
          <div className="mt-10 text-center">
            <button type="button" onClick={() => setAll((v) => !v)} aria-expanded={all} className="btn-ghost">
              {all ? '접기' : `기사 ${items.length - FIRST}건 더 보기`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
