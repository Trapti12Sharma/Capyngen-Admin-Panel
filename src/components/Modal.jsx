import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ open, onClose, title, children, footer }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative z-50 w-full max-w-2xl rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl"
          >
            <div className="p-5 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button onClick={onClose}>✖</button>
            </div>

            <div className="p-5 max-h-[70vh] overflow-y-auto">{children}</div>

            {footer && (
              <div className="p-4 border-t bg-neutral-50 dark:bg-neutral-950/40 flex justify-end gap-2">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
