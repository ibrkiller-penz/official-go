import type { SiteContent } from '../types';

export default function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="bg-ink text-cream/80">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <img src="/images/logo/logo-horizontal-white.png" alt="국민의힘" className="mb-6 h-12 w-auto" />
            <p className="font-display text-2xl text-cream">{content.meta.name}</p>
            <p className="mt-2 text-sm">
              {content.meta.title} · {content.meta.district}
            </p>
            <p className="mt-2 text-sm text-cream/60">{content.meta.slogan}</p>
          </div>
          {content.footer.sns.length > 0 && (
            <ul className="flex gap-6 text-sm">
              {content.footer.sns.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-party-soft">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/15 pt-6 text-xs text-cream/60 md:flex-row md:justify-between">
          <p>{content.footer.copyright}</p>
          <a href={content.footer.privacyHref} className="hover:text-party-soft">
            개인정보처리방침
          </a>
        </div>
      </div>
    </footer>
  );
}
