import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Delete",
  cancelText = "Cancel",
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-[#020617] w-full max-w-md rounded-2xl p-6 shadow-2xl border border-neutral-700"
          >
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-sm text-neutral-400 mb-6">{message}</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 transition"
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
