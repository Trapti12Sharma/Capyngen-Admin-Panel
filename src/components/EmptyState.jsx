import React from "react";

export default function EmptyState({
  title = "No data",
  subtitle = "Start by creating a blog.",
  action,
}) {
  return (
    <div className="text-center py-16 border-2 border-dashed rounded-2xl border-neutral-200 dark:border-neutral-800">
      <div className="text-5xl mb-3">🗂️</div>
      <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </h4>
      <p className="text-neutral-500 mt-1">{subtitle}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
