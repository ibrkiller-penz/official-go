import { useEffect, useRef, useState } from 'react';
import type { Achievement } from '../types';
import Reveal from './Reveal';

// 카드 윗부분: 당 매뉴얼의 사선 패턴을 살린 숫자 강조 블록
function Highlight({ a }: { a: Achievement }) {
  const red = a.tone === 'red';
  return (
    <div className={`relative flex h-40 flex-col justify-end overflow-hidden p-6 ${red ? 'bg-party text-white' : 'bg-ink text-cream'}`}>
      <span
        aria-hidden
        className={`absolute -right-6 -bottom-6 h-28 w-28 rotate-45 ${red ? 'bg-sky' : 'bg-party'}`}
      />
      <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink">{a.tag}</span>
      <p className="relative font-display text-5xl leading-none">
        {a.highlight}
        {a.highlightUnit && <span className="ml-1 text-2xl">{a.highlightUnit}</span>}
      </p>
      <p className="relative mt-2 text-sm opacity-90">{a.highlightLabel}</p>
    </div>
  );
}

export default function Achievements({ items }: { items: Achievement[] }) {
  const [active, setActive] = useState<Achievement | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (active && !d.open) d.showModal();
    if (!active && d.open) d.close();
  }, [active]);

  return (
    <section id="achievements" className="bg-cream-deep py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Achievements</p>
              <h2 className="display mt-4 text-3xl md:text-4xl">대표 성과</h2>
            </div>
            <p className="text-sm text-muted">카드를 누르면 자세한 내용과 관련 기사를 볼 수 있습니다.</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 100}>
              <button
                type="button"
                onClick={() => setActive(a)}
                aria-haspopup="dialog"
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-cream text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(17,44,86,0.4)]"
              >
                <Highlight a={a} />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl text-ink">{a.title}</h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-base leading-relaxed text-ink-soft">{a.summary}</p>
                  <p className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-party">
                    자세히 보기 <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
        aria-labelledby="achv-title"
        className="m-auto w-[min(640px,calc(100%-2rem))] max-h-[88vh] overflow-y-auto rounded-2xl bg-cream p-0 text-ink shadow-2xl backdrop:bg-ink/70"
      >
        {active && (
          <article>
            <Highlight a={active} />
            <div className="p-6 md:p-8">
              <h3 id="achv-title" className="font-display text-3xl">
                {active.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">{active.summary}</p>

              <ul className="mt-6 space-y-3">
                {active.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] leading-relaxed">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-party" />
                    {p}
                  </li>
                ))}
              </ul>

              <h4 className="mt-8 text-sm font-semibold text-muted">관련 기사</h4>
              <ul className="mt-3 divide-y divide-line border-y border-line">
                {active.sources.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 py-4 transition hover:text-party"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted">
                          {s.outlet} · {s.date}
                        </p>
                        <p className="mt-1 font-semibold leading-snug">{s.title}</p>
                      </div>
                      <span aria-hidden className="mt-4">↗</span>
                    </a>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setActive(null)}
                className="btn-primary mt-8 w-full"
              >
                닫기
              </button>
            </div>
          </article>
        )}
      </dialog>
    </section>
  );
}
