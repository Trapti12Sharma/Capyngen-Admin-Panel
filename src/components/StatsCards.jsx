import React from "react";

export default function StatsCards({ totalBlogs, adminName, deletedCount }) {
  const Card = ({ label, value, icon }) => (
    <div className="flex-1 min-w-[220px] rounded-2xl p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="text-xs uppercase tracking-wide text-neutral-500">
            {label}
          </div>
          <div className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            {value}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card label="Total Blogs" value={totalBlogs} icon="📝" />
      <Card label="Admin" value={adminName} icon="👩‍💻" />
      <Card label="Deleted (this session)" value={deletedCount} icon="🗑️" />
    </div>
  );
}
