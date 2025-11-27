import { useState } from "react";
import { motion } from "framer-motion";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotify, setEmailNotify] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white p-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold mb-6">⚙️ Admin Settings</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* ✅ PROFILE */}
          <div className="bg-[#020617] p-6 rounded-2xl shadow">
            <h2 className="text-xl mb-4 font-semibold">Profile Settings</h2>
            <input
              className="w-full mb-3 px-4 py-2 rounded bg-black/40"
              placeholder="Admin Name"
            />
            <input
              className="w-full mb-3 px-4 py-2 rounded bg-black/40"
              placeholder="Email"
            />
            <input
              className="w-full px-4 py-2 rounded bg-black/40"
              placeholder="New Password"
            />
          </div>

          {/* ✅ SYSTEM */}
          <div className="bg-[#020617] p-6 rounded-2xl shadow">
            <h2 className="text-xl mb-4 font-semibold">System Settings</h2>

            <label className="flex items-center gap-3 mb-3">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              Enable Dark Mode
            </label>

            <label className="flex items-center gap-3 mb-3">
              <input
                type="checkbox"
                checked={emailNotify}
                onChange={() => setEmailNotify(!emailNotify)}
              />
              Email Notifications
            </label>

            <button className="mt-4 px-5 py-2 rounded-xl bg-red-600">
              Reset Cache
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
