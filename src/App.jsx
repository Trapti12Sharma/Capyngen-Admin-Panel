import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import CareerAdminPanel from "./components/CareerAdminPanel";
import AdminLanding from "./components/AdminLanding";
import { ToastProvider } from "./hooks/useToast";
import ViewReports from "./components/ViewReports";
import Settings from "./components/Settings";

export default function App() {
  return (
    <ToastProvider>
      <Router>
        {/* ✅ TOP NAVBAR */}
        <div className="p-4 flex gap-6 bg-neutral-100 dark:bg-neutral-900">
          <Link to="/" className="text-blue-600">
            Admin Home
          </Link>

          <Link to="/blogs" className="text-blue-600">
            Blogs Admin
          </Link>

          <Link to="/careers" className="text-blue-600">
            Careers Admin
          </Link>
        </div>

        {/* ✅ ROUTES */}
        <Routes>
          {/* ✅ THIS MAKES YOUR DASHBOARD THE LANDING PAGE */}
          <Route path="/" element={<AdminLanding />} />

          <Route path="/blogs" element={<AdminPanel />} />
          <Route path="/careers" element={<CareerAdminPanel />} />
          <Route path="/reports" element={<ViewReports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}
