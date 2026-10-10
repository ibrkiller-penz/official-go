import type { SiteContent } from '../types';
import SafeImage from './SafeImage';

export default function Hero({ content }: { content: SiteContent }) {
  const { meta } = content;
  return (
    <section id="top" className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-navy">
      <SafeImage
        src="/images/hero.webp"
        alt={`${meta.name} 의원 대표 사진`}
        className="absolute inset-0 -z-10 h-full w-full object-[center_20%]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />

      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-32 md:px-8 md:pb-24">
        <p className="mb-5 font-sans text-base font-medium text-party-soft">{meta.subcopy}</p>
        <h1 className="font-display text-[2.5rem] leading-[1.25] text-cream sm:text-6xl md:text-7xl">
          {meta.slogan}
        </h1>
        <div className="mt-8 h-px w-20 bg-party" />
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/85">
          땀과 생활의 무게를 아는 사람으로서, 주민 한 분 한 분의 이야기를 끝까지 듣겠습니다.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#contact" className="btn-primary bg-party text-white hover:bg-party/90">
            주민 제안하기
          </a>
          <a href="#achievements" className="btn-ghost">
            의정활동 보기
          </a>
        </div>
      </div>
    </section>
  );
}
