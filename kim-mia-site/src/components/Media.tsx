import type { SiteContent } from '../types';
import Reveal from './Reveal';
import SafeImage from './SafeImage';

export default function Media({ video }: { video: SiteContent['video'] }) {
  // 영상도 사진도 없으면 빈 칸을 보여 주지 않고 섹션을 숨깁니다.
  if (!video.youtubeId && video.gallery.length === 0) return null;
  return (
    <section id="media" className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="eyebrow">Gallery</p>
        <h2 className="display mt-4 text-3xl md:text-4xl">현장에서</h2>
      </Reveal>

      {video.youtubeId && (
        <Reveal>
          <div className="mt-12 aspect-video overflow-hidden rounded-2xl bg-ink shadow-xl">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
              title="의정활동 영상"
              loading="lazy"
              allow="accelerometer; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Reveal>
      )}

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {video.gallery.map((src, i) => (
          <Reveal key={src} delay={i * 80}>
            <SafeImage
              src={src}
              alt={`현장 사진 ${i + 1}`}
              className="aspect-square w-full rounded-xl transition duration-500 hover:scale-[1.02]"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
