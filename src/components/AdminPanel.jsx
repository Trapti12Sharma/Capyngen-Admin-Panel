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

  const adminName = "Admin"; // You can replace with real session/user name

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await BlogService.list();
      setBlogs(data);
    } catch (err) {
      push("error", getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreate = async (payload, errMsg) => {
    if (errMsg) return push("error", errMsg);
    try {
      const created = await BlogService.create(payload);
      setBlogs((b) => [created, ...b]);
      setOpenModal(false);
      push("success", "Blog created successfully");
    } catch (err) {
      push("error", getErrorMessage(err));
    }
  };

  const handleEdit = async (payload, errMsg) => {
    if (errMsg) return push("error", errMsg);
    try {
      const updated = await BlogService.update(editing._id, payload);
      setBlogs((b) => b.map((x) => (x._id === editing._id ? updated : x)));
      setEditing(null);
      setOpenModal(false);
      push("success", "Blog updated");
    } catch (err) {
      push("error", getErrorMessage(err));
    }
  };

  const handleDelete = async (blog) => {
    if (!confirm(`Delete blog \"${blog.title}\"?`)) return;
    try {
      await BlogService.remove(blog._id);
      setBlogs((b) => b.filter((x) => x._id !== blog._id));
      setDeletedCount((c) => c + 1);
      push("success", "Blog deleted");
    } catch (err) {
      push("error", getErrorMessage(err));
    }
  };

  const totalBlogs = useMemo(() => blogs.length, [blogs]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Blog Admin</h1>
            <p className="text-sm text-neutral-500">
              Create, edit and manage blogs
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditing(null);
                setOpenModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-neutral-900 text-white hover:bg-black shadow-sm"
            >
              Create Blog
            </button>
          </div>
        </div>

        {/* Stats */}
        <StatsCards
          totalBlogs={totalBlogs}
          adminName={adminName}
          deletedCount={deletedCount}
        />

        {/* Table */}
        <div className="mt-6">
          {loading ? (
            <div className="animate-pulse h-40 rounded-2xl bg-neutral-200/60 dark:bg-neutral-800/40" />
          ) : blogs.length === 0 ? (
            <EmptyState
              action={
                <button
                  onClick={() => setOpenModal(true)}
                  className="px-4 py-2 rounded-xl bg-neutral-900 text-white hover:bg-black"
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

      {/* Modal */}
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
