import React, { useEffect, useState } from "react";
import Modal from "./Modal";

export default function BlogModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    content: "",
    image: "",
    tags: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        author: initial.author || "",
        description: initial.description || "",
        content: initial.content || "",
        image: initial.image || "",
        tags: (initial.tags || []).join(", "),
      });
    } else {
      setForm({
        title: "",
        author: "",
        description: "",
        content: "",
        image: "",
        tags: "",
      });
    }
  }, [initial, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.title || !form.author || !form.description || !form.content)
      return onSave(null, "Please fill all required fields");
    const payload = {
      title: form.title.trim(),
      author: form.author.trim(),
      description: form.description.trim(),
      content: form.content.trim(),
      image: form.image.trim(),
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    console.log("Sajal", payload);

    onSave(payload);
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? "Edit Blog" : "Create Blog"}
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-xl bg-neutral-900 text-white hover:bg-black"
          >
            {initial ? "Save Changes" : "Save Blog"}
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm text-neutral-600">Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2"
            placeholder="Blog title"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-neutral-600">Author *</label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2"
            placeholder="Your name"
          />
        </div>
        <div className="md:col-span-2 space-y-1">
          <label className="text-sm text-neutral-600">
            Brief Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={2}
            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2"
            placeholder="Short summary"
          />
        </div>
        <div className="md:col-span-2 space-y-1">
          <label className="text-sm text-neutral-600">Content *</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={6}
            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2"
            placeholder="Full content (supports HTML)"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-neutral-600">Image URL</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2"
            placeholder="https://..."
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-neutral-600">
            Tags (comma separated)
          </label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2"
            placeholder="React, JavaScript"
          />
        </div>
      </div>
    </Modal>
  );
}
