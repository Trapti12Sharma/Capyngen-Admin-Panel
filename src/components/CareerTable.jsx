import React from "react";

export default function CareerTable({ careers, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-700">
      <table className="min-w-full text-sm">
        <thead className="bg-neutral-800 text-neutral-400">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Department</th>
            <th className="px-4 py-3 text-left">Location</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {careers.map((c) => (
            <tr key={c._id} className="border-t border-neutral-700">
              <td className="px-4 py-3 font-medium">{c.title}</td>
              <td className="px-4 py-3">{c.department}</td>
              <td className="px-4 py-3">{c.location}</td>
              <td className="px-4 py-3">{c.jobType}</td>
              <td className="px-4 py-3 line-clamp-2">{c.description}</td>
              <td className="px-4 py-3 text-right space-x-2">
                <button
                  onClick={() => onEdit(c)}
                  className="px-2 py-1 rounded-lg border border-neutral-600 hover:bg-neutral-800"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(c)}
                  className="px-2 py-1 rounded-lg border border-red-600 text-red-600 hover:bg-red-900"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
          {careers.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-6 text-neutral-400">
                No job openings yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
