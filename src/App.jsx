import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import AdminPanel from "./components/AdminPanel";
import CareerAdminPanel from "./components/CareerAdminPanel";
import AdminLanding from "./components/AdminLanding";
import ViewReports from "./components/ViewReports";
import Settings from "./components/Settings";
import AdminLogin from "./components/AdminLogin";
import AdminNavbar from "./components/AdminNavbar";

import { ToastProvider } from "./hooks/useToast";
import { isAdminLoggedIn } from "./services/authService";

// 🔐 Protected Route
const ProtectedRoute = ({ children }) => {
  const loggedIn = isAdminLoggedIn();

  if (!loggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

// ✅ Wrapper to control navbar visibility
function AppLayout() {
  const location = useLocation();
  const loggedIn = isAdminLoggedIn();

  // ❌ Navbar should NOT show on login page
  const hideNavbar = location.pathname === "/admin-login";

  return (
    <>
      {loggedIn && !hideNavbar && <AdminNavbar />}

      <Routes>
        {/* 🔓 PUBLIC */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* 🔐 PROTECTED */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLanding />
            </ProtectedRoute>
          }
        />

        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/careers"
          element={
            <ProtectedRoute>
              <CareerAdminPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ViewReports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <AppLayout />
      </Router>
    </ToastProvider>
  );
}
