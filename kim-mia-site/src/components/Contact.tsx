import { useState, type FormEvent } from 'react';
import type { SiteContent } from '../types';
import Reveal from './Reveal';

// 개인정보는 이 사이트에 저장하지 않습니다.
// endpoint가 있으면 그 주소로 전달하고, 없으면 의원실 이메일로 보낼 메일을 사용자의 메일 앱에 채워 줍니다.
export default function Contact({ contact }: { contact: SiteContent['contact'] }) {
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'mail' | 'error'>('idle');
  const viaEndpoint = contact.endpoint.length > 0;
  const ready = viaEndpoint || contact.email.length > 0;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('website')) return; // honeypot: 봇이 채우면 무시

    if (!viaEndpoint) {
      const get = (k: string) => String(data.get(k) ?? '').trim();
      const subject = `[홈페이지 민원·제안] ${get('name')}${get('dong') ? ` (${get('dong')})` : ''}`;
      const body = [
        `이름: ${get('name')}`,
        `연락처: ${get('phone')}`,
        `거주 동: ${get('dong') || '-'}`,
        '',
        get('message'),
      ].join('\n');
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mail');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(contact.endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setAgree(false);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  const field =
    'mt-2 w-full min-h-12 rounded-xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted/70 focus:border-party focus:outline-none';

  return (
    <section id="contact" className="bg-cream-deep py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 md:grid-cols-12 md:px-8">
        <Reveal className="md:col-span-5">
          <p className="eyebrow">Contact</p>
          <h2 className="display mt-4 text-3xl leading-snug md:text-4xl">
            말씀을
            <br />
            끝까지 듣겠습니다
          </h2>
          <div className="hairline mt-6" />
          <p className="mt-6 text-lg text-ink-soft">
            민원, 제안, 도움이 필요한 일을 편하게 남겨 주세요. 접수된 내용은 의원실에서 확인합니다.
          </p>
          <dl className="mt-8 space-y-5 text-lg">
            {contact.phone && (
              <div>
                <dt className="text-base text-muted">국회 사무실 전화</dt>
                <dd>
                  <a href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`} className="text-2xl font-bold text-ink hover:text-party">
                    {contact.phone}
                  </a>
                </dd>
              </div>
            )}
            {contact.email && (
              <div>
                <dt className="text-base text-muted">이메일</dt>
                <dd>
                  <a href={`mailto:${contact.email}`} className="font-bold text-ink hover:text-party">
                    {contact.email}
                  </a>
                </dd>
              </div>
            )}
            {contact.address && (
              <div>
                <dt className="text-base text-muted">사무실</dt>
                <dd className="font-bold text-ink">{contact.address}</dd>
              </div>
            )}
          </dl>
          {contact.sourceNote && <p className="mt-6 text-sm text-muted">{contact.sourceNote}</p>}
        </Reveal>

        <Reveal delay={120} className="md:col-span-7">
          <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-cream p-6 shadow-sm md:p-10">
            {/* honeypot */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-base font-semibold">이름</span>
                <input name="name" required autoComplete="name" className={field} placeholder="홍길동" />
              </label>
              <label className="block">
                <span className="text-base font-semibold">연락처</span>
                <input name="phone" type="tel" required autoComplete="tel" className={field} placeholder="010-0000-0000" />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-base font-semibold">거주 동</span>
                <input name="dong" className={field} placeholder="예: 반송동" />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-base font-semibold">내용</span>
                <textarea name="message" required rows={5} className={`${field} py-3`} placeholder="민원 또는 제안 내용을 적어 주세요" />
              </label>
            </div>

            <label className="mt-6 flex items-start gap-3 text-base leading-relaxed text-ink-soft">
              <input
                type="checkbox"
                name="consent"
                required
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 h-5 w-5 accent-ink"
              />
              <span>[필수] {contact.consentText}</span>
            </label>

            <button
              type="submit"
              disabled={!ready || !agree || status === 'sending'}
              className="btn-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status === 'sending' ? '전송 중…' : viaEndpoint ? '접수하기' : '이메일로 보내기'}
            </button>

            <p role="status" className="mt-4 min-h-6 text-base text-ink-soft">
              {!ready && '접수 창구 연결을 준비 중입니다. 전화로 먼저 문의해 주세요.'}
              {ready && !viaEndpoint && status !== 'mail' && '버튼을 누르면 메일 앱에 내용이 채워집니다. 보내기를 눌러 주세요.'}
              {status === 'mail' && '메일 앱이 열렸습니다. 보내기를 누르면 의원실로 전달됩니다. 열리지 않으면 위 이메일 주소로 보내 주세요.'}
              {status === 'done' && '접수되었습니다. 감사합니다.'}
              {status === 'error' && '전송에 실패했습니다. 잠시 후 다시 시도하거나 전화로 문의해 주세요.'}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
