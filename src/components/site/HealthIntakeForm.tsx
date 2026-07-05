import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BookingConsentFields } from "@/components/site/BookingConsentFields";

type FormState = "idle" | "submitting" | "done" | "error";

export function HealthIntakeForm() {
  const { t } = useTranslation();
  const copy = t("intake", { returnObjects: true }) as {
    nameLabel: string;
    emailLabel: string;
    programmeLabel: string;
    programmeOptions: Record<string, string>;
    appointmentLabel: string;
    healthLabel: string;
    medicationsLabel: string;
    goalsLabel: string;
    submit: string;
    submitting: string;
    doneTitle: string;
    doneBody: string;
    errorBody: string;
    privacyNote: string;
  };
  const [state, setState] = useState<FormState>("idle");
  const [serviceChecked, setServiceChecked] = useState(false);
  const [healthChecked, setHealthChecked] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(serviceChecked && healthChecked)) return;
    setState("submitting");
    const form = e.currentTarget;
    const body = new URLSearchParams(new FormData(form) as any).toString();

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!res.ok) throw new Error("submit failed");
      setState("done");
      form.reset();
      setServiceChecked(false);
      setHealthChecked(false);
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="intake-form-done">
        <p className="font-serif text-2xl text-[color:var(--color-forest)]">{copy.doneTitle}</p>
        <p className="mt-3 text-body">{copy.doneBody}</p>
      </div>
    );
  }

  return (
    <form
      name="health-intake"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="intake-form"
    >
      <input type="hidden" name="form-name" value="health-intake" />
      <p className="hidden" aria-hidden>
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className="intake-form-grid">
        <label className="intake-field">
          <span>{copy.nameLabel}</span>
          <input type="text" name="full_name" required autoComplete="name" />
        </label>
        <label className="intake-field">
          <span>{copy.emailLabel}</span>
          <input type="email" name="email" required autoComplete="email" />
        </label>
        <label className="intake-field">
          <span>{copy.programmeLabel}</span>
          <select name="programme" required defaultValue="">
            <option value="" disabled>
              —
            </option>
            {Object.entries(copy.programmeOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="intake-field">
          <span>{copy.appointmentLabel}</span>
          <input type="date" name="appointment_date" />
        </label>
      </div>

      <label className="intake-field">
        <span>{copy.healthLabel}</span>
        <textarea name="health_summary" rows={5} required />
      </label>
      <label className="intake-field">
        <span>{copy.medicationsLabel}</span>
        <textarea name="medications" rows={3} />
      </label>
      <label className="intake-field">
        <span>{copy.goalsLabel}</span>
        <textarea name="goals" rows={3} required />
      </label>

      <BookingConsentFields
        idPrefix="intake"
        serviceChecked={serviceChecked}
        healthChecked={healthChecked}
        onServiceChange={setServiceChecked}
        onHealthChange={setHealthChecked}
      />

      <p className="intake-form-note">
        {copy.privacyNote}{" "}
        <Link to="/privacy" className="booking-consent-link">
          {t("bookingConsent.privacyLink")}
        </Link>
        .
      </p>

      <button
        type="submit"
        className="btn-primary mt-6"
        disabled={state === "submitting" || !(serviceChecked && healthChecked)}
      >
        {state === "submitting" ? copy.submitting : copy.submit}
      </button>
      {state === "error" ? (
        <p className="mt-3 text-sm text-[color:var(--color-terracotta)]">{copy.errorBody}</p>
      ) : null}
    </form>
  );
}
