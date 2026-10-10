import type { SiteContent } from '../types';

export default function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="bg-ink text-cream/80">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <img src="/images/logo/logo-horizontal-white-tight.png" alt="국민의힘" className="mb-6 h-7 w-auto" />
            <p className="text-2xl font-bold text-cream">{content.meta.name}</p>
            <p className="mt-2 text-base">
              {content.meta.title} · {content.meta.district}
            </p>
            <p className="mt-2 text-base text-cream/60">{content.meta.slogan}</p>
          </div>
          {content.footer.sns.length > 0 && (
            <ul className="flex gap-6 text-base">
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

        <p className="mt-10 max-w-3xl text-base leading-relaxed text-cream/70">
          {content.footer.sourceNote} 최종 갱신 {content.footer.updated}.
        </p>

        <div className="mt-6 flex flex-col gap-3 border-t border-cream/15 pt-6 text-sm text-cream/60 md:flex-row md:justify-between">
          <p>{content.footer.copyright}</p>
          <a href="#privacy" className="hover:text-party-soft">
            개인정보처리방침
          </a>
        </div>

        <details id="privacy" className="mt-6 rounded-xl border border-cream/15 p-5 text-base text-cream/80">
          <summary className="cursor-pointer font-bold text-cream">개인정보처리방침</summary>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
            <li>이 사이트는 방문자의 개인정보를 저장하지 않으며, 쿠키나 방문 추적 도구를 쓰지 않습니다.</li>
            <li>
              민원·제안 양식에 적은 이름, 연락처, 거주 동, 내용은 방문자의 메일 앱을 통해 의원실 이메일(
              {content.contact.email})로 직접 전달됩니다.
            </li>
            <li>전달된 내용의 이용, 보관, 파기는 의원실의 개인정보 처리 기준을 따릅니다.</li>
            <li>문의: 국회 사무실 {content.contact.phone}</li>
          </ul>
        </details>
      </div>
    </footer>
  );
}
