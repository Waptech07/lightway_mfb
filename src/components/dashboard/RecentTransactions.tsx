import React from 'react'
import { GoArrowRight } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { DataTable } from './DataTable'
import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from "@/components/ui/badge"

 type Transaction = {
        accountName: string
        accountNumber: string
        amount: string
        date: string
        time: string
        transferType: string
        status: "Successful" | "Failed"
    }
const RecentTransactions = (): React.JSX.Element => {
   
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
    ]
    // columns.tsx

    const columns: ColumnDef<Transaction>[] = [
      {
        accessorKey: "accountName",
        header: "Account",
        cell: ({ row }) => (
          <div>
            <div className="font-medium">{row.original.accountName}</div>
            <div className="text-sm text-gray-500">{row.original.accountNumber}</div>
          </div>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",     cell: ({ row }) => (
          <div className="text-[rgba(24,24,27,1)] font-medium">
            {row.original.amount}
          </div>
        ),
      },
      {
        accessorKey: "date",
        header: "Account",
        cell: ({ row }) => (
          <div className='text-center'>
            <p className='text-sm font-medium'>{row.original.date}</p>
            <p className="text-sm font-normal text-muted-foreground">{row.original.time}</p>
          </div>
        ),
      },
      {
        accessorKey: "transferType",
        header: "Transfer Type",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status
          return (
            <Badge
              className={
                status === "Successful"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : "bg-red-100 text-red-800 hover:bg-red-100"
              }
            >
              {status}
            </Badge>
          )
        },
      },
    ]


    return (
        <div className='flex-2 flex gap-4 flex-col'>
            <div className="flex items-center justify-between">
                <div className="">
                    <h2 className="text-base font-medium">Recent Transactions</h2>
                    <p className="text-xs  font-normal text-muted-foreground">Your recent transactions on the platform</p>
                </div>
                <Link to={""} className="text-primary flex items-center gap-1">View All <GoArrowRight /></Link>
            </div>
            <div className="">
                <DataTable columns={columns} data={transactions} />
            </div>
        </div>
    )
}

export default RecentTransactions