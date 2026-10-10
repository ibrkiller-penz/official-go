import type { Achievement } from '../types';
import Reveal from './Reveal';
import SafeImage from './SafeImage';

export default function Achievements({ items }: { items: Achievement[] }) {
  return (
    <section id="achievements" className="bg-cream-deep py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Achievements</p>
              <h2 className="display mt-4 text-3xl md:text-4xl">대표 성과</h2>
            </div>
            <p className="text-sm text-muted">카드를 누르면 자세한 내용과 출처를 볼 수 있습니다.</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {items.map((a, i) => (
            <Reveal key={a.title} delay={(i % 2) * 120}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-cream shadow-[0_1px_0_rgba(20,32,58,0.04)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(20,32,58,0.35)]">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <SafeImage
                    src={a.image}
                    alt={`${a.title} 관련 사진`}
                    className="h-full w-full transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold tracking-wider text-ink">
                    {a.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-serif text-2xl font-bold text-ink">{a.title}</h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-ink-soft">{a.body}</p>
                  <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted">출처 · {a.source}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
