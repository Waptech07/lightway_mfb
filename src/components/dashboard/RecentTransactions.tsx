import React from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "./DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { FaArrowRightLong } from "react-icons/fa6";
import { useCustomQuery } from "@/hooks/useCustomQuery";

type Transaction = {
  accountName: string;
  accountNumber: string;
  amount: string;
  date: string;
  time: string;
  transferType: string;
  status: "Successful" | "Failed";
};

const RecentTransactions = (): React.JSX.Element => {
  const navigate = useNavigate();
  const transactions: Transaction[] = [
    {
      accountName: "Enoobong George",
      accountNumber: "3002930594",
      amount: "₦250,000.00",
      date: "21st June 2024",
      time: "17:59pm",
      transferType: "Single",
      status: "Successful",
    },
    {
      accountName: "Amina Suleiman",
      accountNumber: "3002930595",
      amount: "₦250,000.00",
      date: "22nd June 2024",
      time: "09:15am",
      transferType: "Bulk",
      status: "Failed",
    },
    {
      accountName: "Jasper Lee",
      accountNumber: "3002930596",
      amount: "₦250,000.00",
      date: "23rd June 2024",
      time: "14:30pm",
      transferType: "Own Account",
      status: "Successful",
    },
  ];
  const {  isLoading } = useCustomQuery({ url: "", key: "recentTransactions", });

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "accountName",
      header: "Account",
      cell: ({ row }) => (
        <div className="min-w-[120px]">
          <div className="font-medium line-clamp-1">
            {row.original.accountName}
          </div>
          <div className="text-sm text-gray-500 truncate">
            {row.original.accountNumber}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <div className="text-[rgba(24,24,27,1)] font-medium min-w-[100px]">
          {row.original.amount}
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="text-left min-w-[100px]">
          <p className="text-sm font-medium line-clamp-1">
            {row.original.date}
          </p>
          <p className="text-sm font-normal text-muted-foreground">
            {row.original.time}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "transferType",
      header: "Transfer Type",
      cell: ({ row }) => (
        <div className="min-w-[80px]">{row.original.transferType}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge
            className={`min-w-[85px] justify-center ${
              status === "Successful"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : "bg-red-100 text-red-800 hover:bg-red-100"
            }`}
          >
            {status}
          </Badge>
        );
      },
    },
  ];

  return (
    <div className="flex-2 flex gap-4 flex-col min-w-0 font-sf-pro">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="min-w-[200px] flex-1">
          <h2 className="text-base font-medium mb-1">Recent Transactions</h2>
          <p className="text-xs font-normal text-muted-foreground">
            Your recent transactions on the platform
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-primary text-xs"
          onClick={() => {
            navigate("/dashboard/view-all");
          }}
        >
          View All
          <FaArrowRightLong />
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* change the transactions to the data gotten from the api */}
          <DataTable columns={columns} data={transactions} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
