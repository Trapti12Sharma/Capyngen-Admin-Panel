import React from "react";
import AdminPanel from "./components/AdminPanel";
import { ToastProvider } from "./hooks/useToast";

export default function App() {
  return (
    <ToastProvider>
      <AdminPanel />
    </ToastProvider>
  );
}
