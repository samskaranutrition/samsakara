import { useTranslation } from "react-i18next";

type Chapter = {
  num: string;
  title: string;
  body: string;
  pull?: boolean;
};

export function AboutStory() {
  const { t } = useTranslation();
  const about = t("about", { returnObjects: true }) as {
    storyEyebrow: string;
    storyTitle: string;
    chapters: Chapter[];
  };

  return (
    <section className="about-story">
      <div className="about-story-intro mx-auto max-w-3xl px-5 pb-10 pt-2 sm:px-6 lg:px-10">
        <p className="eyebrow">{about.storyEyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl text-[color:var(--color-forest)] sm:text-4xl">
          {about.storyTitle}
        </h2>
      </div>

      <ol className="about-story-timeline mx-auto max-w-3xl px-5 pb-20 sm:px-6 lg:px-10">
        {about.chapters.map((ch, i) => (
          <li key={i} className={"about-story-step" + (ch.pull ? " is-pull" : "")}>
            {ch.pull ? (
              <blockquote className="about-story-pull">
                <span className="about-story-pull-mark" aria-hidden>
                  "
                </span>
                {ch.title}
              </blockquote>
            ) : (
              <>
                {ch.num && <span className="about-story-num">{ch.num}</span>}
                <h3 className="about-story-step-title">{ch.title}</h3>
                {ch.body && <p className="about-story-step-body">{ch.body}</p>}
              </>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
