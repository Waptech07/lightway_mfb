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
import BulkTransactionDetails from "./pages/transaction-history/BulkTransactionDetails";
import SingleTransactionDetails from "./pages/transaction-history/SingleTransactionDetails";
import AllRequests from "./pages/requests/AllRequests";
import PendingRequests from "./pages/requests/PendingRequests";
import BulkRequestDetails from "./pages/requests/BulkRequestDetails";

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
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/view-all" element={<DashBoardViewAll />} />
          
          {/* Transfer Routes */}
          <Route path="/transfer/single-payments"element={<SinglePayments />} />
          <Route path="/transfer/bulk-payments" element={<BulkPayments />} />

          {/* Transaction History Routes */}
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/bulk-transaction-details/:id" element={<BulkTransactionDetails />} />
          <Route path="/single-transaction-details/:id" element={<SingleTransactionDetails />} />

          {/* Requests Routes */}
          <Route path="/requests/all-requests" element={<AllRequests />} />
          <Route path="/requests/pending-requests" element={<PendingRequests />} />
          <Route path="/bulk-request-details/:id" element={<BulkRequestDetails />} />
          <Route path="/single-request-details/:id" element={<SingleTransactionDetails />} />

          {/* Statements & Settings Routes */}
          <Route path="/statements" element={<Statements />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
