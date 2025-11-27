import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CareerModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "",
    jobType: "",
    description: "",
    requirements: "",
    applyLink: "",
  });

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#020617] p-6 rounded-2xl w-full max-w-lg space-y-4 shadow-2xl"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {initial ? "Edit Job" : "Add Job"}
              </h2>
              <button onClick={onClose}>✕</button>
            </div>

            {[
              ["title", "Job Title"],
              ["department", "Department"],
              ["location", "Location"],
              ["jobType", "Job Type"],
            ].map(([key, label]) => (
              <input
                key={key}
                placeholder={label}
                className="w-full p-2 rounded bg-neutral-900 border border-neutral-700"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            ))}

            <textarea
              placeholder="Description"
              rows="3"
              className="w-full p-2 rounded bg-neutral-900 border border-neutral-700"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <textarea
              placeholder="Requirements"
              rows="3"
              className="w-full p-2 rounded bg-neutral-900 border border-neutral-700"
              value={form.requirements}
              onChange={(e) =>
                setForm({ ...form, requirements: e.target.value })
              }
            />

            <input
              placeholder="Apply Link"
              className="w-full p-2 rounded bg-neutral-900 border border-neutral-700"
              value={form.applyLink}
              onChange={(e) => setForm({ ...form, applyLink: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-neutral-700 hover:bg-neutral-600"
              >
                Cancel
              </button>
              <button
                onClick={() => onSave(form)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700"
              >
                {initial ? "Update" : "Save"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
