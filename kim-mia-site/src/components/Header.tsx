import { useEffect, useState } from 'react';
import type { SiteContent } from '../types';

export default function Header({ content }: { content: SiteContent }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled || open ? 'bg-cream/95 shadow-[0_1px_0_var(--color-line)] backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20 md:px-8">
        <a
          href="#top"
          aria-label={`${content.meta.title} ${content.meta.name} 홈`}
          className={`flex items-center gap-3 transition md:gap-4 ${scrolled || open ? 'text-ink' : 'text-cream'}`}
        >
          {/* 당 로고: 어두운 배경에서는 흰색, 밝은 배경에서는 검정 버전 (여백 없는 파일) */}
          <img
            src={
              scrolled || open
                ? '/images/logo/logo-horizontal-black-tight.png'
                : '/images/logo/logo-horizontal-white-tight.png'
            }
            alt="국민의힘"
            className="h-5 w-auto md:h-6"
          />
          <span className="h-8 w-px bg-current opacity-25" aria-hidden />
          <span className="flex flex-col leading-none">
            <span className="text-[11px] font-medium tracking-wide opacity-75 md:text-xs">
              {content.meta.title} · {content.meta.district.replace('부산 ', '')}
            </span>
            <span className="mt-1 text-xl font-bold tracking-tight md:text-2xl">{content.meta.name}</span>
          </span>
        </a>

        <nav aria-label="주요 메뉴" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {content.nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className={`text-[15px] font-medium transition hover:text-party ${
                    scrolled ? 'text-ink' : 'text-cream/90'
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full border border-party px-5 py-2 text-sm font-semibold text-party transition hover:bg-party hover:text-ink md:inline-flex"
          >
            민원·제안
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-12 w-12 items-center justify-center rounded-full md:hidden ${
              scrolled || open ? 'text-ink' : 'text-cream'
            }`}
          >
            <span className="sr-only">메뉴 열기</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="모바일 메뉴" className="border-t border-line bg-cream md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-3">
            {content.nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-line text-lg font-medium text-ink"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
