import React, { useEffect, useMemo, useState } from "react";
import StatsCards from "./StatsCards";
import CareerTable from "./CareerTable";
import CareerModal from "./CareerModal";
import EmptyState from "./EmptyState";
import { CareerService } from "../services/careerService";
import { useToast } from "../hooks/useToast";
import { getErrorMessage } from "../services/api";

export default function CareerPanel() {
  const { push } = useToast();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deletedCount, setDeletedCount] = useState(0);
  const adminName = "Admin";

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

  const handleCreate = async (payload, errMsg) => {
    if (errMsg) return push("error", errMsg);
    try {
      const created = await CareerService.create(payload);
      setCareers((c) => [created, ...c]);
      setOpenModal(false);
      push("success", "Career created successfully");
    } catch (err) {
      push("error", getErrorMessage(err));
    }
  };

  const handleEdit = async (payload, errMsg) => {
    if (errMsg) return push("error", errMsg);
    try {
      const updated = await CareerService.update(editing._id, payload);
      setCareers((c) => c.map((x) => (x._id === editing._id ? updated : x)));
      setEditing(null);
      setOpenModal(false);
      push("success", "Career updated successfully");
    } catch (err) {
      push("error", getErrorMessage(err));
    }
  };

  const handleDelete = async (career) => {
    if (!confirm(`Delete job "${career.title}"?`)) return;
    try {
      await CareerService.remove(career._id);
      setCareers((c) => c.filter((x) => x._id !== career._id));
      setDeletedCount((n) => n + 1);
      push("success", "Career deleted successfully");
    } catch (err) {
      push("error", getErrorMessage(err));
    }
  };

  const totalCareers = useMemo(() => careers.length, [careers]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-100">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Career Admin Panel</h1>
            <p className="text-sm text-neutral-400">
              Create, edit, and manage career openings
            </p>
          </div>
          <button
            onClick={() => {
              setEditing(null);
              setOpenModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-neutral-900 text-white hover:bg-black shadow-sm"
          >
            + Add Job Opening
          </button>
        </div>

        <StatsCards
          totalBlogs={totalCareers}
          adminName={adminName}
          deletedCount={deletedCount}
        />

        <div className="mt-6">
          {loading ? (
            <div className="animate-pulse h-40 rounded-2xl bg-neutral-800/40" />
          ) : careers.length === 0 ? (
            <EmptyState
              action={
                <button
                  onClick={() => setOpenModal(true)}
                  className="px-4 py-2 rounded-xl bg-neutral-900 text-white hover:bg-black"
                >
                  Add your first job
                </button>
              }
            />
          ) : (
            <CareerTable
              careers={careers}
              onEdit={(c) => {
                setEditing(c);
                setOpenModal(true);
              }}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

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
