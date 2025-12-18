import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogService } from "../services/blogService";
import { CareerService } from "../services/careerService";
import { logoutAdmin } from "../services/authService";

export default function AdminLanding() {
  const adminName = "Admin";
  const navigate = useNavigate();

  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalCareers, setTotalCareers] = useState(0);

  // ✅ FETCH COUNTS
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const blogs = await BlogService.list();
        const careers = await CareerService.list();
        setTotalBlogs(blogs.length);
        setTotalCareers(careers.length);
      } catch (err) {
        console.error("Failed to fetch dashboard counts");
      }
    };

    fetchCounts();
  }, []);

  // ✅ LOGOUT
  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin-login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white">
      {/* ✅ MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* ✅ HERO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-700 p-8 shadow-xl mb-10 flex flex-col md:flex-row items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold">Welcome Back, {adminName} 👋</h1>
            <p className="text-sm opacity-90 mt-1">
              Manage blogs, careers, and system content from one powerful
              central dashboard.
            </p>

            <div className="flex gap-3 mt-4">
              <Link
                to="/blogs"
                className="px-5 py-2 rounded-xl bg-black text-white hover:scale-105 transition"
              >
                Manage Blogs
              </Link>

              <Link
                to="/careers"
                className="px-5 py-2 rounded-xl border border-white/40 hover:bg-white/10 transition"
              >
                Manage Careers
              </Link>
            </div>
          </div>

          <div className="text-white/90 font-medium mt-4 md:mt-0">
            📊 Admin Dashboard
          </div>
        </motion.div>

        {/* ✅ STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-[#111827] shadow-lg">
            <p className="text-sm text-white/70">Total Blogs</p>
            <p className="text-3xl font-bold mt-2">{totalBlogs}</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111827] shadow-lg">
            <p className="text-sm text-white/70">Total Careers</p>
            <p className="text-3xl font-bold mt-2">{totalCareers}</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111827] shadow-lg">
            <p className="text-sm text-white/70">System Status</p>
            <p className="text-2xl font-semibold text-green-400 mt-3">
              Online ✅
            </p>
          </div>
        </div>

        {/* ✅ QUICK ACTIONS */}
        <div className="bg-[#020617] p-6 rounded-3xl shadow-2xl">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/blogs"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700"
            >
              ➕ Add Blog
            </Link>

            <Link
              to="/careers"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700"
            >
              ➕ Add Career
            </Link>

            <Link
              to="/reports"
              className="px-5 py-2 rounded-xl border border-white/30 hover:bg-white/10"
            >
              📊 View Reports
            </Link>

            <Link
              to="/settings"
              className="px-5 py-2 rounded-xl border border-white/30 hover:bg-white/10"
            >
              ⚙️ Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
