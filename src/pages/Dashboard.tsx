import React from "react";
import DashboardBalance from "@/components/dashboard/DashboardBalance";
import DashboardQA from "@/components/dashboard/DashboardQA";
import { Button } from "@/components/ui/button";
import { MdNotifications } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
import transactionHistoryBg from "@/assets/transaction-card-bg.png";
import statementsBg from "@/assets/statements-card-bg.png";
import allRequestsBg from "@/assets/requests-card-bg.png";

const Dashboard = (): React.JSX.Element => {
  return (
    <div>
      <header className="flex text-left justify-between items-center mb-6 font-sf-pro">
        <div className="text-left">
          <h1 className="text-3xl font-bold mb-2 ">
            Hello, Enooobong & Sons 💼
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Wednesday, 23 July 2025
          </p>
        </div>
        <div className="flex items-center gap-1">
          <div className="relative h-8 w-8">
            <MdNotifications className="text-muted-foreground h-[inherit] w-[inherit]" />
            <div className="bg-red-500 absolute top-1 right-1 h-2 w-2 rounded-full"></div>
          </div>
          <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white">
            <p className="font-semibold text-md">EG</p>
          </div>
        </div>
      </header>
      <section className="flex flex-col gap-8 mb-6">
        <div className="justify-between flex items-center">
          <div className="text-left">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-0 gap-6">
          <DashboardBalance
            availableBalance={50999.0}
            ledgerBalance={50899.0}
            blockedBalance={5999.0}
            accountNumber="3115679989"
          />
          <DashboardBalance
            availableBalance={75000.5}
            ledgerBalance={73000.0}
            blockedBalance={2000.5}
            accountNumber="4102578890"
          />
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="mb-8">
        <div className="mb-4 text-left">
          <h2 className="text-lg font-medium text-[#050C82]">Quick Actions</h2>
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
    </div>
  );
};

export default Dashboard;
