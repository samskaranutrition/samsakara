import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

type Props = {
  serviceChecked: boolean;
  healthChecked: boolean;
  onServiceChange: (checked: boolean) => void;
  onHealthChange: (checked: boolean) => void;
  idPrefix?: string;
};

export function BookingConsentFields({
  serviceChecked,
  healthChecked,
  onServiceChange,
  onHealthChange,
  idPrefix = "booking-consent",
}: Props) {
  const { t } = useTranslation();
  const copy = t("bookingConsent", { returnObjects: true }) as {
    serviceLabel: string;
    healthLabel: string;
    termsLink: string;
    privacyLink: string;
  };

  return (
    <div className="booking-consent-fields">
      <label className="booking-consent-field" htmlFor={`${idPrefix}-service`}>
        <input
          id={`${idPrefix}-service`}
          type="checkbox"
          name="service_consent"
          value="yes"
          required
          checked={serviceChecked}
          onChange={(e) => onServiceChange(e.target.checked)}
          className="booking-consent-checkbox"
        />
        <span>
          {copy.serviceLabel}{" "}
          <Link to="/terms" className="booking-consent-link">
            {copy.termsLink}
          </Link>
          .
        </span>
      </label>
      <label className="booking-consent-field" htmlFor={`${idPrefix}-health`}>
        <input
          id={`${idPrefix}-health`}
          type="checkbox"
          name="health_consent"
          value="yes"
          required
          checked={healthChecked}
          onChange={(e) => onHealthChange(e.target.checked)}
          className="booking-consent-checkbox"
        />
        <span>
          {copy.healthLabel}{" "}
          <Link to="/privacy" className="booking-consent-link">
            {copy.privacyLink}
          </Link>
          .
        </span>
      </label>
    </div>
  );
}
