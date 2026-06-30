import { useTranslation } from "react-i18next";
import { BUSINESS_ADDRESS, GOOGLE_MAPS_EMBED, GOOGLE_MAPS_URL } from "@/lib/brand";

type Props = {
  className?: string;
  /** Full-width map for the Contact page */
  compact?: boolean;
  /** Small map card for the footer */
  footer?: boolean;
};

export function GoogleMap({ className = "", compact = false, footer = false }: Props) {
  const { t } = useTranslation();
  const mapTitle = t("clinic.mapTitle");
  const directions = footer ? t("footer.clinicDirections") : t("clinic.directions");

  return (
    <div
      className={
        "location-map" +
        (compact ? " is-compact" : "") +
        (footer ? " is-footer" : "") +
        (className ? " " + className : "")
      }
    >
      <div className="location-map-frame">
        <iframe
          title={mapTitle}
          src={GOOGLE_MAPS_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="location-map-meta">
        {!footer && (
          <div className="location-map-address-block">
            <p className="location-map-address-label">Samskara Nutrition</p>
            <p className="location-map-address">{BUSINESS_ADDRESS}</p>
          </div>
        )}
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="location-map-link"
        >
          {directions} <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
