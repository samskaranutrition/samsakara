import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BookingConsentFields } from "@/components/site/BookingConsentFields";
import { BookingConsentModal } from "@/components/site/BookingConsentModal";
import { useBookingConsent } from "@/hooks/useBookingConsent";
import { programmeBookingUrl } from "@/lib/site";

type Props = {
  programmeId: string;
  className?: string;
  children: React.ReactNode;
};

export function ProgrammeBookLink({ programmeId, className = "", children }: Props) {
  const { t } = useTranslation();
  const { granted, grant } = useBookingConsent();
  const copy = t("bookingConsent", { returnObjects: true }) as {
    title: string;
    continueProgramme: string;
  };
  const [open, setOpen] = useState(false);
  const [serviceChecked, setServiceChecked] = useState(false);
  const [healthChecked, setHealthChecked] = useState(false);
  const url = programmeBookingUrl(programmeId);

  const proceed = () => {
    grant();
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  if (granted) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      <BookingConsentModal
        open={open}
        onClose={() => setOpen(false)}
        titleId="programme-book-consent-title"
      >
        <p id="programme-book-consent-title" className="booking-consent-modal-title">
          {copy.title}
        </p>
        <BookingConsentFields
          idPrefix={`programme-${programmeId}`}
          serviceChecked={serviceChecked}
          healthChecked={healthChecked}
          onServiceChange={setServiceChecked}
          onHealthChange={setHealthChecked}
        />
        <div className="booking-consent-modal-actions">
          <button
            type="button"
            className="btn-primary"
            disabled={!(serviceChecked && healthChecked)}
            onClick={proceed}
          >
            {copy.continueProgramme}
          </button>
          <button type="button" className="btn-outline" onClick={() => setOpen(false)}>
            {t("nav.close")}
          </button>
        </div>
      </BookingConsentModal>
    </>
  );
}
