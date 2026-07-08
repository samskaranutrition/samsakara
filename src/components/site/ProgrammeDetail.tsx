import { Link } from "@tanstack/react-router";
import type { ProgrammeDetail, ProgrammesPageContent } from "@/lib/i18n/programmes-types";
import { ProgrammeIcon, type ProgrammeIconVariant } from "@/components/site/ProgrammeIcon";
import { ProgrammeBookLink } from "@/components/site/ProgrammeBookLink";

const ICON_BY_ID: Record<string, ProgrammeIconVariant> = {
  artha: "clarity",
  setu: "bridge",
  samskara: "signature",
};

type OverviewProps = {
  items: ProgrammeDetail[];
  labels: ProgrammesPageContent["labels"];
  id?: string;
};

export function ProgrammeOverview({ items, labels, id }: OverviewProps) {
  return (
    <section className="programme-overview scroll-mt-24" id={id} aria-label={labels.overviewTitle}>
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        <h2 className="programme-overview-heading">{labels.overviewTitle}</h2>
        <div className="programme-overview-grid">
          {items.map((item, i) => {
            const icon = ICON_BY_ID[item.id] ?? "clarity";
            const featured = i === items.length - 1;
            return (
              <article
                key={item.id}
                className={"programme-overview-card" + (featured ? " is-featured" : "")}
              >
                {featured ? (
                  <div className="programme-overview-card-band">
                    <div className="programme-overview-card-top">
                      <ProgrammeIcon variant={icon} context="overview" onDark={featured} />
                      <div>
                        <h3 className="programme-overview-name">{item.name}</h3>
                        <p className="programme-overview-subtitle">{item.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="programme-overview-card-top">
                    <ProgrammeIcon variant={icon} context="overview" onDark={featured} />
                    <div>
                      <h3 className="programme-overview-name">{item.name}</h3>
                      <p className="programme-overview-subtitle">{item.subtitle}</p>
                    </div>
                  </div>
                )}
                <div className={"programme-overview-card-body" + (featured ? " is-below-band" : "")}>
                  <div className="programme-overview-price-row">
                    <p className="programme-overview-price">{item.price}</p>
                    <span className="programme-overview-duration">{item.duration}</span>
                  </div>
                  <p className="programme-overview-hook">{item.hook}</p>
                  <div className="programme-overview-actions">
                    <ProgrammeBookLink
                      programmeId={item.id}
                      className="programme-overview-btn programme-overview-btn--primary"
                    >
                      {labels.bookProgramme} <span aria-hidden>→</span>
                    </ProgrammeBookLink>
                    <a href={`#${item.id}`} className="programme-overview-btn programme-overview-btn--ghost">
                      {labels.viewDetails}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        {labels.payNote ? (
          <p className="programme-overview-pay-note">{labels.payNote}</p>
        ) : null}
      </div>
    </section>
  );
}

type DetailProps = {
  programme: ProgrammeDetail;
  labels: ProgrammesPageContent["labels"];
  featured?: boolean;
};

export function ProgrammeDetailSection({ programme: p, labels, featured }: DetailProps) {
  const icon = ICON_BY_ID[p.id] ?? "clarity";

  return (
    <article
      id={p.id}
      className={"programme-detail scroll-mt-28" + (featured ? " programme-detail--featured" : "")}
    >
      {featured ? (
        <div className="programme-detail-featured-band">
          <ProgrammeIcon variant={icon} context="detail" onDark />
          <div className="programme-detail-featured-band-text">
            <h2 className="programme-detail-name programme-detail-name--on-dark">{p.name}</h2>
            <p className="programme-detail-subtitle programme-detail-subtitle--on-dark">{p.subtitle}</p>
          </div>
        </div>
      ) : null}

      <header className={"programme-detail-header" + (featured ? " programme-detail-header--after-band" : "")}>
        {!featured ? (
          <>
            <div className="programme-detail-header-main">
              <ProgrammeIcon variant={icon} context="detail" />
              <div className="programme-detail-meta">
                <h2 className="programme-detail-name">{p.name}</h2>
                <p className="programme-detail-subtitle">{p.subtitle}</p>
              </div>
            </div>
            <div className="programme-detail-price-block">
              <p className="programme-detail-price">{p.price}</p>
              <span className="programme-detail-duration">{p.duration}</span>
              <ProgrammeBookLink programmeId={p.id} className="programme-detail-book">
                {labels.bookProgramme} <span aria-hidden>→</span>
              </ProgrammeBookLink>
            </div>
          </>
        ) : (
          <div className="programme-detail-price-block">
            <p className="programme-detail-price">{p.price}</p>
            <span className="programme-detail-duration">{p.duration}</span>
            <ProgrammeBookLink programmeId={p.id} className="programme-detail-book">
              {labels.bookProgramme} <span aria-hidden>→</span>
            </ProgrammeBookLink>
          </div>
        )}
      </header>

      {p.meaning ? <p className="programme-detail-meaning">{p.meaning}</p> : null}

      <div className="programme-detail-body">
        {p.paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className={p.highlight && paragraph === p.highlight ? "programme-detail-highlight" : undefined}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {p.blueprintHeading && p.blueprintItems ? (
        <section className="programme-detail-block">
          <h3 className="programme-detail-block-title">{p.blueprintHeading}</h3>
          {p.blueprintIntro ? <p className="programme-detail-block-intro">{p.blueprintIntro}</p> : null}
          <ul className="programme-detail-list">
            {p.blueprintItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {p.blueprintNote ? <p className="programme-detail-note">{p.blueprintNote}</p> : null}
        </section>
      ) : null}

      {p.evolvesHeading && p.evolvesItems ? (
        <section className="programme-detail-block">
          <h3 className="programme-detail-block-title">{p.evolvesHeading}</h3>
          {p.evolvesIntro ? <p className="programme-detail-block-intro">{p.evolvesIntro}</p> : null}
          <ul className="programme-detail-list">
            {p.evolvesItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="programme-detail-summary">
        <section className="programme-detail-summary-card">
          <h3 className="programme-detail-block-title">{p.journeyHeading}</h3>
          <ul className="programme-detail-list">
            {p.journeyItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="programme-detail-summary-card">
          <h3 className="programme-detail-block-title">{p.idealHeading}</h3>
          <p className="programme-detail-summary-prose">{p.idealIf}</p>
        </section>

        <section className="programme-detail-summary-card">
          <h3 className="programme-detail-block-title">{p.leaveHeading}</h3>
          <ul className="programme-detail-list">
            {p.leaveWith.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      {p.closing ? <p className="programme-detail-closing">{p.closing}</p> : null}
    </article>
  );
}

export function DiscoverySection({
  discovery,
}: {
  discovery: ProgrammesPageContent["discovery"];
}) {
  return (
    <section className="programme-discovery">
      <div className="programme-discovery-inner mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 lg:px-10 lg:py-20">
        <p className="eyebrow">{discovery.eyebrow}</p>
        <h2 className="programme-discovery-title">{discovery.title}</h2>
        <p className="programme-discovery-subtitle">{discovery.subtitle}</p>
        <div className="programme-discovery-copy mx-auto mt-8 max-w-2xl space-y-4">
          {discovery.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <p className="programme-discovery-note mx-auto mt-8 max-w-xl">{discovery.note}</p>
        <Link to="/programmes" hash="book" className="btn-primary mt-10 inline-flex">
          {discovery.cta} <span className="cta-arrow ml-2">→</span>
        </Link>
      </div>
    </section>
  );
}
