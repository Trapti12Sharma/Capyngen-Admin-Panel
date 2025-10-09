import React, { useEffect, useMemo, useState } from "react";
import StatsCards from "./StatsCards";
import CareerTable from "./CareerTable";
import CareerModal from "./CareerModal";
import EmptyState from "./EmptyState";
import { CareerService } from "../services/careerService";
import { useToast } from "../hooks/useToast";
import { getErrorMessage } from "../services/api";

export default function CareerAdminPanel() {
  const { push } = useToast();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deletedCount, setDeletedCount] = useState(0);

  const adminName = "Admin";

  // 🔹 Fetch all career openings
  const fetchCareers = async () => {
    try {
      setLoading(true);
      const data = await CareerService.list();
      setCareers(data);
    } catch (err) {
      push("error", getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  // 🔹 Create new job opening
  const handleCreate = async (payload, errMsg) => {
    if (errMsg) return push("error", errMsg);
    try {
      const created = await CareerService.create(payload);
      setCareers((prev) => [created, ...prev]);
      setOpenModal(false);
      push("success", "Job created successfully");
    } catch (err) {
      push("error", getErrorMessage(err));
    }
  };

  // 🔹 Edit existing job
  const handleEdit = async (payload, errMsg) => {
    if (errMsg) return push("error", errMsg);
    try {
      const updated = await CareerService.update(editing._id, payload);
      setCareers((prev) =>
        prev.map((item) => (item._id === editing._id ? updated : item))
      );
      setEditing(null);
      setOpenModal(false);
      push("success", "Job updated successfully");
    } catch (err) {
      push("error", getErrorMessage(err));
    }
  };

  // 🔹 Delete job opening
  const handleDelete = async (career) => {
    if (!confirm(`Delete job "${career.title}"?`)) return;
    try {
      await CareerService.remove(career._id);
      setCareers((prev) => prev.filter((x) => x._id !== career._id));
      setDeletedCount((c) => c + 1);
      push("success", "Job deleted successfully");
    } catch (err) {
      push("error", getErrorMessage(err));
    }
  };

  const totalCareers = useMemo(() => careers.length, [careers]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Top header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Career Admin Panel</h1>
            <p className="text-sm text-neutral-500">
              Manage, edit, and delete job openings easily
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
              + Create Job
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <StatsCards
          totalBlogs={totalCareers}
          adminName={adminName}
          deletedCount={deletedCount}
        />

        {/* Job Listings Table */}
        <div className="mt-6">
          {loading ? (
            <div className="animate-pulse h-40 rounded-2xl bg-neutral-200/60 dark:bg-neutral-800/40" />
          ) : careers.length === 0 ? (
            <EmptyState
              action={
                <button
                  onClick={() => setOpenModal(true)}
                  className="px-4 py-2 rounded-xl bg-neutral-900 text-white hover:bg-black"
                >
                  Create your first job
                </button>
              }
            />
          ) : (
            <CareerTable
              careers={careers}
              onEdit={(career) => {
                setEditing(career);
                setOpenModal(true);
              }}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      <CareerModal
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
