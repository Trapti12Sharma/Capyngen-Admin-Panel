import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // ✅ STATIC AUTH (FIXED KEY)
    if (email === "admin@capyngen.com" && password === "Admin@123") {
      localStorage.setItem("adminLoggedIn", "true"); // 🔥 FIX
      navigate("/", { replace: true });
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#020617] to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl bg-[#020617]/90 backdrop-blur-xl border border-white/10 shadow-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Admin Sign In
        </h1>
        <p className="text-center text-neutral-400 mb-8">
          Login to access admin dashboard
        </p>

        <div className="mb-5">
          <label className="block text-sm text-neutral-400 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter admin email"
            autoComplete="off"
            className="w-full rounded-xl bg-black/60 border border-neutral-700 px-4 py-3 text-white outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-neutral-400 mb-1">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="new-password"
              className="w-full rounded-xl bg-black/60 border border-neutral-700 px-4 py-3 text-white outline-none focus:border-indigo-500 pr-12"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold text-lg"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
