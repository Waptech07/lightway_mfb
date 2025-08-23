import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import DashBoardViewAll from "./pages/dashboard/DashBoardViewAll";
import SinglePayments from "./pages/transfer/SinglePayment";
import BulkPayments from "./pages/transfer/BulkPayments";
import TransactionHistory from "./pages/transaction-history/TransactionHistory";
import Statements from "./pages/Statements";
import Settings from "./pages/Settings";

function App(): React.JSX.Element {
  return (
    <>
    
      <Toaster position="bottom-right" richColors />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* MainLayout routes*/}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/view-all" element={<DashBoardViewAll />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/statements" element={<Statements />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/transfer/single-payments"
            element={<SinglePayments />}
          />
          <Route path="/transfer/bulk-payments" element={<BulkPayments />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
