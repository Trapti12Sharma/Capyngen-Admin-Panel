import React, { useState, useEffect } from "react";

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded-xl w-full max-w-lg space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {initial ? "Edit Job" : "Add Job"}
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <input
          placeholder="Job Title"
          className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Department"
          className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />
        <input
          placeholder="Location"
          className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          placeholder="Job Type (Full-time / Remote)"
          className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          value={form.jobType}
          onChange={(e) => setForm({ ...form, jobType: e.target.value })}
        />
        <textarea
          placeholder="Job Description"
          rows="3"
          className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <textarea
          placeholder="Requirements"
          rows="3"
          className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          value={form.requirements}
          onChange={(e) => setForm({ ...form, requirements: e.target.value })}
        />
        <input
          placeholder="Apply Link"
          className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
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
            className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
          >
            {initial ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
