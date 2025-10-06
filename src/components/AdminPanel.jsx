import React, { useEffect, useMemo, useState } from "react";
import StatsCards from "./StatsCards";
import BlogTable from "./BlogTable";
import BlogModal from "./BlogModal";
import EmptyState from "./EmptyState";
import { BlogService } from "../services/blogService";
import { useToast } from "../hooks/useToast";
import { getErrorMessage } from "../services/api";

export default function AdminPanel() {
  const { push } = useToast();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deletedCount, setDeletedCount] = useState(0);

  const adminName = "Admin"; // static name, can later come from auth session

  // ✅ Fetch all blogs (GET)
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await BlogService.list();
      console.log("Fetched blogs:", data);
      setBlogs(data);
    } catch (err) {
      console.error("Fetch error:", err);
      push("error", getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Create new blog (POST)
  const handleCreate = async (payload, errMsg) => {
    if (errMsg) return push("error", errMsg);
    try {
      const created = await BlogService.create(payload);
      setBlogs((b) => [created, ...b]);
      setOpenModal(false);
      push("success", "✅ Blog created successfully");
    } catch (err) {
      console.error("Create blog error:", err);
      push("error", getErrorMessage(err));
    }
  };

  // ✅ Update existing blog (PUT)
  const handleEdit = async (payload, errMsg) => {
    if (errMsg) return push("error", errMsg);
    try {
      console.log("Updating blog:", editing._id, payload);
      const updated = await BlogService.update(editing._id, payload);
      setBlogs((b) =>
        b.map((x) => (x._id === editing._id ? { ...x, ...updated } : x))
      );
      setEditing(null);
      setOpenModal(false);
      push("success", "✏️ Blog updated successfully");
    } catch (err) {
      console.error("Update blog error:", err);
      push("error", getErrorMessage(err));
    }
  };

  // ✅ Delete blog (DELETE)
  const handleDelete = async (blog) => {
    if (!confirm(`Are you sure you want to delete "${blog.title}"?`)) return;
    try {
      console.log("Deleting blog:", blog._id);
      await BlogService.remove(blog._id);
      setBlogs((b) => b.filter((x) => x._id !== blog._id));
      setDeletedCount((c) => c + 1);
      push("success", "🗑️ Blog deleted successfully");
    } catch (err) {
      console.error("Delete blog error:", err);
      push("error", getErrorMessage(err));
    }
  };

  // ✅ Derived state
  const totalBlogs = useMemo(() => blogs.length, [blogs]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* 🔹 Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Blog Admin Panel</h1>
            <p className="text-sm text-neutral-500">
              Manage, edit, and delete your blogs easily
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                setEditing(null);
                setOpenModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-neutral-900 text-white hover:bg-black shadow-sm transition"
            >
              + Create Blog
            </button>
          </div>
        </div>

        {/* 🔹 Stats */}
        <StatsCards
          totalBlogs={totalBlogs}
          adminName={adminName}
          deletedCount={deletedCount}
        />

        {/* 🔹 Table */}
        <div className="mt-6">
          {loading ? (
            <div className="animate-pulse h-40 rounded-2xl bg-neutral-200/60 dark:bg-neutral-800/40" />
          ) : blogs.length === 0 ? (
            <EmptyState
              action={
                <button
                  onClick={() => setOpenModal(true)}
                  className="px-4 py-2 rounded-xl bg-neutral-900 text-white hover:bg-black transition"
                >
                  Create your first blog
                </button>
              }
            />
          ) : (
            <BlogTable
              blogs={blogs}
              onEdit={(b) => {
                setEditing(b);
                setOpenModal(true);
              }}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {/* 🔹 Modal for Create / Edit */}
      <BlogModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditing(null);
        }}
        onSave={editing ? handleEdit : handleCreate}
        initial={editing}
      />
    </div>
  );
}
