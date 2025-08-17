import React from "react";
import DashboardBalance from "@/components/dashboard/DashboardBalance";
import DashboardQA from "@/components/dashboard/DashboardQA";
import { Button } from "@/components/ui/button";
import { GoArrowRight } from "react-icons/go";
import transactionHistoryBg from "@/assets/transaction-card-bg.png";
import statementsBg from "@/assets/statements-card-bg.png";
import allRequestsBg from "@/assets/requests-card-bg.png";
import Header from "@/components/Header";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { PendingTransactions } from "@/components/dashboard/PendingTransactions";

const Dashboard = (): React.JSX.Element => {
  return (
    <div className="text-left font-sf-pro">
      {/* Header Section */}
      <Header header=" Hello, Enooobong & Sons 💼," detail="Wednesday, 23 July 2025" />
      <section className="flex flex-col gap-8 mb-6 ">
        <div className="justify-between flex items-center">
          <div>
            <h2 className="text-base font-medium">Overview</h2>
            <p className="text-muted-foreground font-normal text-xs">
              See your overall information regarding your courses and your
              activities
            </p>
          </div>
          <Button>
            View All
            <GoArrowRight />
          </Button>
        </div>

        {/* Balance Cards */}
        <div className="flex flex-col md:flex-row w-full gap-6">
          <DashboardBalance
            AccountCard={50999.0}
            ledgerBalance={50899.0}
            blockedBalance={5999.0}
            accountNumber="3115679989"
          />
          <DashboardBalance
            AccountCard={75000.5}
            ledgerBalance={73000.0}
            blockedBalance={2000.5}
            accountNumber="4102578890"
          />
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="mb-8">
        <div className="mb-4">
          {/* The color is not primary  */}
          <h2 className="text-lg font-medium">Quick Actions</h2>
          <p className="text-[#6B6B6B] text-xs md:text-sm">
            Perform common banking actions instantly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardQA
            header="Transaction History"
            details="Stay up to date with your latest financial activity and quickly identify any transactions that require your attention."
            bgImage={transactionHistoryBg}
          />
          <DashboardQA
            header="Statements"
            details="Generate and retrieve comprehensive statements for reconciliation, compliance, or business analysis."
            bgImage={statementsBg}
          />
          <DashboardQA
            header="All Requests"
            details="View and track the status of all your transaction and service requests in one place — pending, approved, or rejected."
            bgImage={allRequestsBg}
          />
        </div>
      </section>
      <section className="space-y-10 flex lg:flex-row flex-col gap-x-6">
        <RecentTransactions />
        <PendingTransactions />
      </section>
    </div>
  );
};

export default Dashboard;
