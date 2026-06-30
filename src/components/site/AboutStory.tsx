import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type Chapter = {
  num: string;
  title: string;
  body: string;
  pull?: boolean;
};

const ACCENTS = ["sage", "gold", "terracotta"] as const;

export function AboutStory() {
  const { t } = useTranslation();
  const about = t("about", { returnObjects: true }) as {
    storyEyebrow: string;
    storyTitle: string;
    scrollHint: string;
    chapters: Chapter[];
  };

  const pinRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const pin = pinRef.current;
    const rail = railRef.current;
    const mobile = mobileRef.current;
    if (!pin || !rail) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    let raf = 0;

    const updateMobile = () => {
      if (!mobile) return;
      const max = mobile.scrollWidth - mobile.clientWidth;
      setProgress(max > 0 ? mobile.scrollLeft / max : 0);
    };

    const stickyEl = pin.querySelector<HTMLElement>(".about-story-sticky");

    const update = () => {
      raf = 0;
      if (!mq.matches) {
        rail.style.transform = "";
        updateMobile();
        return;
      }
      const rect = pin.getBoundingClientRect();
      const pinHeight = pin.offsetHeight;
      const viewH = window.innerHeight;
      const scrollRange = Math.max(pinHeight - viewH, 1);
      const next = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
      const viewW = stickyEl?.clientWidth ?? pin.clientWidth;
      const maxShift = Math.max(rail.scrollWidth - viewW, 0);
      rail.style.transform = `translate3d(${-next * maxShift}px, 0, 0)`;
      setProgress(next);
    };

    const onResize = () => {
      update();
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    const onMobileScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(updateMobile);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    mq.addEventListener("change", onResize);
    mobile?.addEventListener("scroll", onMobileScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", onResize);
      mobile?.removeEventListener("scroll", onMobileScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [about.chapters.length]);

  return (
    <section className="about-story">
      <div className="about-story-intro mx-auto max-w-6xl px-5 pb-6 pt-2 sm:px-6 lg:px-10">
        <p className="eyebrow">{about.storyEyebrow}</p>
        <h2 className="mt-3 max-w-xl font-serif text-3xl text-[color:var(--color-forest)] sm:text-4xl">
          {about.storyTitle}
        </h2>
        <p className="about-story-hint mt-4 text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink)]/55">
          {about.scrollHint}
        </p>
        <div className="about-story-progress" aria-hidden>
          <span className="about-story-progress-fill" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      <div ref={mobileRef} className="about-story-mobile about-story-stage lg:hidden">
        <div className="about-story-stage-grid" aria-hidden />
        <div className="about-story-stage-fade about-story-stage-fade--left" aria-hidden />
        <div className="about-story-stage-fade about-story-stage-fade--right" aria-hidden />
        <div className="about-story-mobile-track">
          {about.chapters.map((ch, i) => (
            <StoryPanel key={i} chapter={ch} index={i} />
          ))}
        </div>
      </div>

      <div ref={pinRef} className="about-story-pin hidden lg:block">
        <div className="about-story-sticky about-story-stage">
          <div className="about-story-stage-grid" aria-hidden />
          <div className="about-story-stage-fade about-story-stage-fade--left" aria-hidden />
          <div className="about-story-stage-fade about-story-stage-fade--right" aria-hidden />
          <div ref={railRef} className="about-story-rail">
            {about.chapters.map((ch, i) => (
              <StoryPanel key={i} chapter={ch} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryPanel({ chapter, index }: { chapter: Chapter; index: number }) {
  const accent = ACCENTS[index % ACCENTS.length];

  if (chapter.pull) {
    return (
      <article className="about-story-panel about-story-panel--pull">
        <span className="about-story-pull-mark" aria-hidden>
          "
        </span>
        <p className="about-story-pull">{chapter.title}</p>
      </article>
    );
  }

  return (
    <article className={"about-story-panel about-story-panel--" + accent} data-accent={accent}>
      <div className="about-story-panel-inner">
        <header className="about-story-panel-head">
          {chapter.num && <span className="about-story-num">{chapter.num}</span>}
          <h3 className="about-story-panel-title">{chapter.title}</h3>
        </header>
        <div className="about-story-panel-copy">
          <p className="about-story-panel-body">{chapter.body}</p>
        </div>
      </div>
    </article>
  );
}
