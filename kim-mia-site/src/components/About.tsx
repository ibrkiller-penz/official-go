import type { TimelineItem } from '../types';
import Reveal from './Reveal';

export default function About({ items }: { items: TimelineItem[] }) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <p className="eyebrow">About</p>
          <h2 className="display mt-4 text-3xl leading-snug md:text-4xl">
            방직공장 여공에서
            <br />
            변호사로
          </h2>
          <div className="hairline mt-6" />
          <p className="mt-6 text-base text-ink-soft">
            생활의 현장을 거쳐 법의 자리에 선 경험이, 지금의 의정활동이 향하는 곳입니다.
          </p>
        </Reveal>

        <ol className="border-l border-line pl-8 md:col-span-8 md:pl-12">
          {items.map((t, i) => (
            <Reveal as="li" key={t.year} delay={i * 110} className="relative pb-10 last:pb-0">
              <span
                aria-hidden
                className="absolute top-2 -left-[calc(2rem+6.5px)] h-3 w-3 rounded-full border-2 border-party bg-cream md:-left-[calc(3rem+6.5px)]"
              />
              <p className="font-display text-lg text-party">{t.year}</p>
              <p className="mt-2 text-lg leading-relaxed text-ink">{t.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
