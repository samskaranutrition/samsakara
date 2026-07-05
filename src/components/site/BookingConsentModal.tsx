import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  titleId: string;
  children: ReactNode;
};

/** Full-viewport consent dialog — portaled so fixed positioning is not clipped by cards. */
export function BookingConsentModal({ open, onClose, titleId, children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="booking-consent-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button
        type="button"
        className="booking-consent-modal-backdrop"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div className="booking-consent-modal-panel">{children}</div>
    </div>,
    document.body,
  );
}
