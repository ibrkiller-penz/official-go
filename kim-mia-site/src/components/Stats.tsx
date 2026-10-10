import { useEffect, useRef, useState } from 'react';
import type { Stat } from '../types';
import Reveal from './Reveal';

// 화면에 보일 때 0부터 목표 숫자까지 올라갑니다. 모션 줄이기 설정이면 바로 표시합니다.
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(to);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          setN(Math.round(to * (1 - Math.pow(1 - t, 3))));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return <span ref={ref}>{n.toLocaleString('ko-KR')}</span>;
}

export default function Stats({ items }: { items: Stat[] }) {
  return (
    <section aria-label="숫자로 보는 활동" className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-party/20 px-0 md:grid-cols-4">
        {items.map((s, i) => (
          <Reveal key={s.label} delay={i * 90}>
            <div className="flex h-full flex-col bg-ink px-6 py-10 md:px-8 md:py-14">
              <p className="font-display text-4xl text-party-soft md:text-5xl">
                <CountUp to={s.value} />
                <span className="ml-1 text-2xl font-semibold">{s.suffix}</span>
              </p>
              <p className="mt-3 text-base font-semibold">{s.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-cream/60">{s.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
