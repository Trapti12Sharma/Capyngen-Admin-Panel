import React from "react";

export default function BlogTable({ blogs, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
      <table className="min-w-full text-sm">
        <thead className="bg-neutral-50 dark:bg-neutral-900/60">
          <tr className="text-left text-neutral-600">
            <th className="px-4 py-3">Heading</th>
            <th className="px-4 py-3">Headline</th>
            <th className="px-4 py-3">Tags</th>
            <th className="px-4 py-3">Brief Description</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((b) => (
            <tr
              key={b._id}
              className="border-t border-neutral-100 dark:border-neutral-800"
            >
              <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                {b.title}
              </td>
              <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300 line-clamp-1">
                {b.author}
              </td>
              <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                {(b.tags || []).join(", ")}
              </td>
              <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300 max-w-[380px] line-clamp-2">
                {b.description}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="inline-flex gap-2">
                  <button
                    onClick={() => onEdit(b)}
                    className="px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    title="Edit"
                  >
                    {/* Pencil icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.713 0l-1.157 1.157 3.713 3.713 1.157-1.157a2.625 2.625 0 0 0 0-3.713Z" />
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.713-3.713L3 17.25Z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(b)}
                    className="px-2.5 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
                    title="Delete"
                  >
                    {/* Trash icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M9 3h6a1 1 0 0 1 1 1v1h4v2H4V5h4V4a1 1 0 0 1 1-1Zm1 7h2v8h-2v-8Zm4 0h2v8h-2v-8ZM7 10h2v8H7v-8Z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {blogs.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-8">
                <div className="text-center text-neutral-500">
                  No blogs yet.
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
