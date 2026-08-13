import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  labelledBy: string;
  /**
   * One value per screen. When it changes the sheet is treated as a new page:
   * scrolled back to the top with focus on its first control, so a multi-step
   * flow can be driven from the keyboard without tabbing in again each time.
   */
  focusKey?: string;
  children: ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({ onClose, labelledBy, focusKey, children }: ModalProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  // Callers build onClose fresh on every render. Holding it in a ref keeps the
  // listener below - and the focus restore it cleans up with - tied to the
  // sheet being open rather than to the parent re-rendering.
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  // Taken during the first render rather than in an effect: by the time
  // effects run the sheet has been committed and an autoFocus inside it has
  // already taken over, so what we'd read back is a node about to be removed.
  const openerRef = useRef<HTMLElement | null>(null);
  if (openerRef.current === null) openerRef.current = document.activeElement as HTMLElement | null;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      // Wrap at both ends. Without this, Tab walks out of the sheet and into
      // the page behind the veil, where nothing is visible or clickable.
      const sheet = sheetRef.current;
      const items = sheet?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!sheet || !items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && (active === first || !sheet.contains(active))) {
        event.preventDefault();
        last.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    // The page behind shouldn't scroll while a sheet is open.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
      // Hand focus back to whatever opened the sheet, rather than dropping it
      // on <body> and restarting the tab order from the top of the page.
      const opener = openerRef.current;
      if (opener?.isConnected) opener.focus();
    };
  }, []);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    // A tall step followed by a short one otherwise leaves you scrolled into
    // the middle of the new screen. The veil is the scroller now, not the
    // sheet, so that is what has to go back to the top.
    (sheet.parentElement ?? sheet).scrollTop = 0;
    // A frame later, not now: the key that moved the step on is often still
    // being handled, and its default action would land on whatever this
    // focuses - pressing the next screen's first button on the way past.
    const frame = requestAnimationFrame(() => {
      // A step with a natural starting point - the cursor in a date grid -
      // marks it, since first-in-the-DOM would be a paging arrow instead.
      const target =
        sheet.querySelector<HTMLElement>("[data-autofocus]") ?? sheet.querySelector<HTMLElement>(FOCUSABLE);
      target?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [focusKey]);

  /* Portalled to the body because a sheet can now be opened from a star inside
     a city card, and a dialog nested in a link inherits the link's click. */
  return createPortal(
    <div
      className="veil"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby={labelledBy} ref={sheetRef}>
        <div className="airmail" />
        <div className="sheet-body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
