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

  const [preview, setPreview] = useState("");

  // Populate form if editing
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
      setPreview(initial.image || "");
    } else {
      setForm({
        title: "",
        author: "",
        description: "",
        content: "",
        image: "",
        tags: "",
      });
      setPreview("");
    }
  }, [initial, open]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // ✅ Handle image preview + upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // show instant local preview before uploading
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();

      if (data?.url) {
        setForm((f) => ({ ...f, image: data.url }));
      }
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  // ✅ Handle submit
  const handleSubmit = () => {
    if (!form.title || !form.author || !form.description || !form.content)
      return onSave(null, "Please fill all required fields");

    const payload = {
      title: form.title.trim(),
      author: form.author.trim(),
      description: form.description.trim(),
      content: form.content.trim(),
      image: form.image.trim(), // uploaded image URL
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    onSave(payload); // Pass data to parent for saving to DB
    setPreview("");
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
            className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
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
        {/* Title */}
        <div className="space-y-1">
          <label className="text-sm text-neutral-600">Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2"
            placeholder="Blog title"
          />
        </div>

        {/* Author */}
        <div className="space-y-1">
          <label className="text-sm text-neutral-600">Author *</label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2"
            placeholder="Your name"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2 space-y-1">
          <label className="text-sm text-neutral-600">
            Brief Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={2}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2"
            placeholder="Short summary"
          />
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-1">
          <label className="text-sm text-neutral-600">Content *</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={6}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2"
            placeholder="Full content (supports HTML)"
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-1">
          <label className="text-sm text-neutral-600">Upload Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2"
          />
          {/* ✅ Show preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-full h-40 object-cover rounded-lg border border-neutral-300"
            />
          )}
        </div>

        {/* Tags */}
        <div className="space-y-1">
          <label className="text-sm text-neutral-600">
            Tags (comma separated)
          </label>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2"
            placeholder="React, JavaScript"
          />
        </div>
      </div>
    </Modal>
  );
}
