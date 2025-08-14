import React from "react";
import DashBalance from "@/components/dashboard/DashBalance";
import DashboardQA from "@/components/dashboard/DashboardQA";
import { Button } from "@/components/ui/button";
import { MdNotifications } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
const Dashboard = (): React.JSX.Element => {
  return (
    <div>
      <header className="flex text-left justify-between items-center mb-6 font-sf-pro">
        <div className="text-left">
          <h1 className="text-3xl font-bold mb-2 ">Hello, Enooobong & Sons 💼</h1>
          <p className="text-muted-foreground text-sm font-medium">Wednesday, 23 July 2025</p>
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
            <p className="text-muted-foreground font-normal text-xs">See your overall information regarding your courses and your activities</p>
          </div>
          <Button>View All
            <GoArrowRight />
          </Button>
        </div>



        <div className="flex gap-4 flex-wrap">
          <DashBalance />
          <DashBalance />
        </div>
      </section>
      <section className="text-left mb-6  flex flex-col gap-2">
        <div className="">

        <h2>Quick Actions</h2>
        <p className="text-muted-foreground font-normal">Perform common banking actions instantly</p>
        </div>
        <div className="flex gap-2">
          <DashboardQA header="Transaction History" details="Stay up to date with your latest financial activity and quickly identify any transactions that require your attention." />
          <DashboardQA header="Statements" details="Generate and retrieve comprehensive statements for reconciliation, compliance, or business analysis." />
          <DashboardQA header="All Requests" details="View and track the status of all your transaction and service requests in one place — pending, approved, or rejected." />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
