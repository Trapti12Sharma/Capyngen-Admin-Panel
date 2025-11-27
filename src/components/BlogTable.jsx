import React from "react";
import { motion } from "framer-motion";

export default function BlogTable({ blogs, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-700 bg-[#020617]">
      <table className="min-w-full text-sm">
        <thead className="bg-neutral-900 text-neutral-400">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Author</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Group</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Tags</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {blogs.map((b, i) => (
            <motion.tr
              key={b._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="border-t border-neutral-800 hover:bg-neutral-800/40 transition"
            >
              <td className="px-4 py-3 font-medium">{b.title || "NA"}</td>
              <td className="px-4 py-3">{b.author || "NA"}</td>
              <td className="px-4 py-3">{b.category || "NA"}</td>
              <td className="px-4 py-3">{b.group || "NA"}</td>
              <td className="px-4 py-3">{b.date || "NA"}</td>
              <td className="px-4 py-3">
                {b.tags && b.tags.length > 0 ? b.tags.join(", ") : "NA"}
              </td>
              <td className="px-4 py-3">
                {b.description && b.description.trim() !== ""
                  ? b.description
                  : "NA"}
              </td>

              <td className="px-4 py-3 text-right space-x-2">
                <button
                  onClick={() => onEdit(b)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(b)}
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </motion.tr>
          ))}

          {blogs.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center py-6 text-neutral-400">
                No blogs yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
