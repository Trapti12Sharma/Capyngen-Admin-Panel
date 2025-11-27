import React from "react";
import { motion } from "framer-motion";

export default function CareerTable({ careers, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-700 bg-[#020617]">
      <table className="min-w-full text-sm">
        <thead className="bg-neutral-900 text-neutral-400">
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
          {careers.map((c, i) => (
            <motion.tr
              key={c._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border-t border-neutral-800 hover:bg-neutral-800/50 transition"
            >
              <td className="px-4 py-3 font-medium">{c.title}</td>
              <td className="px-4 py-3">{c.department}</td>
              <td className="px-4 py-3">{c.location}</td>
              <td className="px-4 py-3">{c.jobType}</td>
              <td className="px-4 py-3 line-clamp-2">{c.description}</td>
              <td className="px-4 py-3 text-right space-x-2">
                <button
                  onClick={() => onEdit(c)}
                  className="px-2 py-1 rounded-lg bg-blue-600 hover:scale-105 transition"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(c)}
                  className="px-2 py-1 rounded-lg bg-red-600 hover:scale-105 transition"
                >
                  🗑️
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
