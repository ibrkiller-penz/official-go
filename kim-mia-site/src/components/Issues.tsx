import type { Issue } from '../types';
import Reveal from './Reveal';

// 현안 데이터가 비어 있으면 섹션 전체를 숨깁니다. (README 참고)
export default function Issues({ items }: { items: Issue[] }) {
  if (items.length === 0) return null;
  return (
    <section id="issues" className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="eyebrow">Haeundae-eul</p>
        <h2 className="display mt-4 text-3xl md:text-4xl">해운대을과 함께</h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          지역 주민의 삶과 맞닿은 일들입니다. 보도로 확인된 내용만 싣습니다.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={(i % 2) * 100}>
            <article className="flex h-full flex-col rounded-2xl border border-line bg-white/60 p-7 md:p-8">
              <p className="text-sm font-bold text-party">{it.area}</p>
              <h3 className="mt-2 text-2xl font-bold text-ink">{it.title}</h3>
              <p className="mt-4 flex-1 text-lg leading-relaxed text-ink-soft">{it.body}</p>
              {it.quote && (
                <blockquote className="mt-6 border-l-4 border-party pl-4 text-lg font-medium leading-relaxed text-ink">
                  “{it.quote}”
                </blockquote>
              )}
              <ul className="mt-6 border-t border-line pt-4">
                {it.sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-party">
                      {s.outlet} · {s.date} · {s.title} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
