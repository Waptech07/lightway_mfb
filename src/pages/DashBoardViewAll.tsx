import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { IoIosArrowBack } from "react-icons/io";
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { DataTable } from '@/components/dashboard/DataTable';

const DashBoardViewAll = (): React.JSX.Element => {
    const navigate = useNavigate();

    const data = [
        {
            id: "1",
            name: "Enoobong George",
            accountNumber: "3002930594",
            availableBalance: 250000,
            ledgerBalance: 250000,
            blockedFunds: 2000,
            accountType: "Current",
        },
        {
            id: "2",
            name: "Aisha Tunde",
            accountNumber: "3002930595",
            availableBalance: 300000,
            ledgerBalance: 300000,
            blockedFunds: 3060,
            accountType: "Savings",
        },
        {
            id: "3",
            name: "Kofi Sarpong",
            accountNumber: "3002930596",
            availableBalance: 350000,
            ledgerBalance: 350000,
            blockedFunds: 5530,
            accountType: "Savings",
        },
    ]
    const columns = [
        { header: "Account Name", accessorKey: "name" },
        { header: "Account Number", accessorKey: "accountNumber" },
        { header: "Available Balance", accessorKey: "availableBalance" },
        { header: "Ledger Balance", accessorKey: "ledgerBalance" },
        { header: "Blocked Funds", accessorKey: "blockedFunds" },
        { header: "Account Type", accessorKey: "accountType" },

    ]
    return (
        <div className='text-left font-sf-pro'>

            <Header header=" Hello, Enooobong & Sons 💼," detail="Wednesday, 23 July 2025" />
            <Button className='mb-4 w-20' size={"sm"} onClick={() => navigate(-1)}>
                <IoIosArrowBack />   Back
            </Button>
            <DataTable
                data={data}
                columns={columns}
            />
        </div>
    )
}

export default DashBoardViewAll