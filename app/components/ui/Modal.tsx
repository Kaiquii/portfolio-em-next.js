"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  labelledBy?: string;
  closeLabel?: string;
  panelClassName?: string;
};

export default function Modal({
  children,
  isOpen,
  onClose,
  labelledBy,
  closeLabel = "Fechar modal",
  panelClassName = "",
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-99999 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
          onClick={onClose}
        >
          <motion.div
            className={`relative max-h-[88vh] w-full overflow-y-auto rounded-lg border border-white/10 bg-white text-left shadow-2xl shadow-black/30 dark:bg-[#111216] ${panelClassName}`}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-lg border border-black/10 bg-black/5 text-gray-700 hover:border-pink-500/35 hover:text-pink-600 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:text-pink-300"
            >
              <X aria-hidden="true" size={22} />
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
