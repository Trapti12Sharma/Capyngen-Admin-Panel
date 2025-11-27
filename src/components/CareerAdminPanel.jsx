import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import CareerTable from "./CareerTable";
import CareerModal from "./CareerModal";
import EmptyState from "./EmptyState";
import ConfirmModal from "./ConfirmModal";
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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);

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
      setCareers((prev) => [created, ...prev]);
      setOpenModal(false);
      push("success", "Job created successfully");
    } catch (err) {
      push("error", getErrorMessage(err));
    }
  };

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

  // ✅ PROFESSIONAL DELETE FLOW
  const handleDelete = (career) => {
    setSelectedCareer(career);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await CareerService.remove(selectedCareer._id);
      setCareers((prev) => prev.filter((x) => x._id !== selectedCareer._id));
      setDeletedCount((c) => c + 1);
      push("success", "Job deleted successfully");
    } catch (err) {
      push("error", getErrorMessage(err));
    } finally {
      setConfirmOpen(false);
      setSelectedCareer(null);
    }
  };

  const totalCareers = useMemo(() => careers.length, [careers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 p-8 shadow-xl mb-10 flex justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {adminName} 👋</h1>
            <p className="text-sm opacity-90 mt-1">
              Manage all job openings from one dashboard
            </p>
          </div>
          <button
            onClick={() => {
              setEditing(null);
              setOpenModal(true);
            }}
            className="px-6 py-2 rounded-xl bg-black/80 hover:bg-black"
          >
            + Create Job
          </button>
        </motion.div>

        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-[#111827] shadow-lg">
            <p>Total Jobs</p>
            <p className="text-3xl font-bold">{totalCareers}</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#111827] shadow-lg">
            <p>Deleted Jobs</p>
            <p className="text-3xl font-bold">{deletedCount}</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#111827] shadow-lg">
            <p>Status</p>
            <p className="text-green-400">Online ✅</p>
          </div>
        </div>

        <div className="mt-10 bg-[#020617] p-6 rounded-3xl shadow-2xl">
          {loading ? (
            <div className="animate-pulse h-52 bg-white/10 rounded-xl" />
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

      {/* ✅ PROFESSIONAL CONFIRM POPUP */}
      <ConfirmModal
        open={confirmOpen}
        title="Delete Job?"
        message={`Are you sure you want to delete "${selectedCareer?.title}"?`}
        confirmText="Yes, Delete"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
