import site from './content/site.json';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Achievements from './components/Achievements';
import Issues from './components/Issues';
import News from './components/News';
import Media from './components/Media';
import Contact from './components/Contact';
import Footer from './components/Footer';
import type { SiteContent } from './types';

const content = site as SiteContent;

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
      >
        본문으로 건너뛰기
      </a>
      <Header content={content} />
      <main id="main">
        <Hero content={content} />
        <Stats items={content.stats} />
        <About items={content.timeline} />
        <Achievements items={content.achievements} />
        <Issues items={content.issues} placeholder={content.placeholder} />
        <News items={content.news} />
        <Media video={content.video} />
        <Contact contact={content.contact} />
      </main>
      <Footer content={content} />
    </>
  );
}
