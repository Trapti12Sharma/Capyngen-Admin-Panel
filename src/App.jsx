import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import CareerAdminPanel from "./components/CareerAdminPanel";
import { ToastProvider } from "./hooks/useToast";

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="p-4 flex gap-4 bg-neutral-100 dark:bg-neutral-900">
          <Link to="/blogs" className="text-blue-600">
            Blogs Admin
          </Link>
          <Link to="/careers" className="text-blue-600">
            Careers Admin
          </Link>
        </div>
        <Routes>
          <Route path="/blogs" element={<AdminPanel />} />
          <Route path="/careers" element={<CareerAdminPanel />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}
