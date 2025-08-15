import React from 'react'
import { GoArrowRight } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const PendingTransactions = (): React.JSX.Element => {
    const users = [
        {
            id: 'ST5676058',
            name: 'Enoobong George',
            amount: '₦250,000.00',
            initials: 'EG',
            bgColor: 'bg-blue-600'
        },
        {
            id: 'ST5684012',
            name: 'Akintade Kemi',
            amount: '₦300,000.00',
            initials: 'AK',
            bgColor: 'bg-blue-600'
        },
        {
            id: 'ST5682145',
            name: 'Michael Ijeoma',
            amount: '₦180,000.00',
            initials: 'MI',
            bgColor: 'bg-blue-600'
        },
        {
            id: 'ST5698765',
            name: 'Chinonso Uche',
            amount: '₦500,000.00',
            initials: 'CU',
            bgColor: 'bg-blue-600'
        }
    ];
    return (
        <div className='flex-1 flex flex-col gap-4 min-w-80'>
            <div className="flex items-center justify-between">
                <div className="">
                    <h2 className="text-base font-medium">Pending Transactions</h2>
                    <p className="text-xs  font-normal text-muted-foreground">Transactions awaiting your Approval  / Rejection</p>
                </div>
                <Link to={""} className="text-primary flex items-center gap-1">View All <GoArrowRight /></Link>
            </div>
            <div className="w-full">
                <div
                    role="list"
                    aria-label="User list with account information"
                    className="space-y-0"
                >
                    {users.map((user) => (
                        <div
                            key={user.id}
                            role="listitem"
                            tabIndex={0}
                            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer"
                            aria-label={`${user.name}, ID ${user.id}, Amount ${user.amount}`}
                        >
                            <div className="flex items-center space-x-3">
                                <Avatar className="h-10 w-10" aria-hidden="true">
                                    <AvatarFallback className={`${user.bgColor} text-white text-sm font-medium`}>
                                        {user.initials}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col">
                                    <p className="text-sm font-medium text-gray-900 leading-tight">
                                        {user.name}
                                    </p>
                                    <span className="text-sm font-normal" aria-label={`Account ID ${user.id}`}>
                                        {user.id}
                                    </span>
                                </div>
                            </div>

                            <div className="text-right">
                                <p
                                    className="text-base font-medium text-gray-900"
                                    aria-label={`Amount ${user.amount}`}
                                >
                                    {user.amount}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
