import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
}

export function Modal({ onClose, labelledBy, children }: ModalProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    // The page behind shouldn't scroll while a sheet is open.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
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
    </div>
  );
}
