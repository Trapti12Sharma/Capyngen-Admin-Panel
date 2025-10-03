import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((type, message) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => dismiss(id), 3000);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`min-w-[260px] rounded-xl shadow-lg px-4 py-3 text-sm flex items-start gap-2 border backdrop-blur bg-white/90 dark:bg-neutral-900/90 ${
              t.type === "success"
                ? "border-green-200 dark:border-green-900"
                : t.type === "error"
                ? "border-red-200 dark:border-red-900"
                : "border-neutral-200 dark:border-neutral-800"
            }`}
          >
            <span className="mt-0.5">
              {t.type === "success" ? "✅" : t.type === "error" ? "⚠️" : "ℹ️"}
            </span>
            <div className="text-neutral-800 dark:text-neutral-100">
              {t.message}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="ml-auto opacity-70 hover:opacity-100"
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx; // ✅ return it!
}
