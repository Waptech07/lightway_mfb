import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MainLayout from "./layouts/MainLayout";
import Statements from "./pages/Statements";
import Settings from "./pages/Settings";
import SinglePayments from "./pages/SinglePayment";
import TransactionHistory from "./pages/TransactionHistory";
import DashBoardViewAll from "./pages/DashBoardViewAll";

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
