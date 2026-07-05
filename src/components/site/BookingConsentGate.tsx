import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { BookingConsentFields } from "@/components/site/BookingConsentFields";
import { useBookingConsent } from "@/hooks/useBookingConsent";

type Props = {
  children: ReactNode;
  className?: string;
  continueLabel?: string;
  onGranted?: () => void;
};

/** Required CCR + health-data checkboxes before Calendly or payment links. */
export function BookingConsentGate({
  children,
  className = "",
  continueLabel,
  onGranted,
}: Props) {
  const { t } = useTranslation();
  const { granted, grant } = useBookingConsent();
  const copy = t("bookingConsent", { returnObjects: true }) as {
    title: string;
    intro: string;
    continue: string;
  };
  const [serviceChecked, setServiceChecked] = useState(false);
  const [healthChecked, setHealthChecked] = useState(false);

  if (granted) return <>{children}</>;

  const canContinue = serviceChecked && healthChecked;

  return (
    <div
      className={
        "booking-consent-gate rounded border border-[color:var(--color-gold)]/60 bg-[color:var(--color-cream-deep)] p-6 sm:p-8 " +
        className
      }
    >
      <p className="font-serif text-xl text-[color:var(--color-forest)]">{copy.title}</p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[color:var(--color-ink)]/80">
        {copy.intro}
      </p>
      <BookingConsentFields
        serviceChecked={serviceChecked}
        healthChecked={healthChecked}
        onServiceChange={setServiceChecked}
        onHealthChange={setHealthChecked}
      />
      <button
        type="button"
        className="btn-primary mt-6"
        disabled={!canContinue}
        onClick={() => {
          grant();
          onGranted?.();
        }}
      >
        {continueLabel ?? copy.continue}
      </button>
    </div>
  );
}
