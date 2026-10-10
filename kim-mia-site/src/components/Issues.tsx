import type { SiteContent } from '../types';
import Reveal from './Reveal';

// 현안 데이터가 비어 있으면 섹션 전체를 숨깁니다. (README 참고)
export default function Issues({ items, placeholder }: { items: SiteContent['issues']; placeholder: string }) {
  if (items.length === 0) return null;
  return (
    <section id="issues" className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="eyebrow">Local Issues</p>
        <h2 className="display mt-4 text-3xl md:text-4xl">해운대을 지역 현안</h2>
        <p className="mt-3 text-base text-muted">관할 동 정보 {placeholder}</p>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={(i % 2) * 100}>
            <div className="h-full rounded-2xl border border-line bg-cream p-7">
              <h3 className="text-xl font-bold">{it.title}</h3>
              <p className="mt-3 text-base text-ink-soft">{it.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
