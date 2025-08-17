import React from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { TbRepeat } from "react-icons/tb";
import formatCurrency from '@/lib/formatCurrency';
const BeneficiaryList = (): React.JSX.Element => {

  const users = [
    {
      name: "Enoobong George",
      initials: "EG", accountNumber: "1234567890", amount: 125000
    },
    {
      name: "Akintade Kemi",
      initials: "AK", accountNumber: "3456789012", amount: 3200075
    },
    {
      name: "Michael Ijeoma",
      initials: "MI", accountNumber: "2345678901", amount: 75000.00
    },
    {
      name: "Chinonso Uche",
      initials: "CU", accountNumber: "4567890123", amount: 150000.25
    },
  ];

  return (
    <div className='mt-2   '>
      {users.map((user, id) => (
        <div
          key={id}
          role="listitem"
          className="flex flex-row items-center justify-between p-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors border-b-1 border-gray-300 last:border-b-0"
        >
          <div className="flex items-center space-x-3 mb-2 sm:mb-0">
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10" aria-hidden="true">
              <AvatarFallback
                className={`bg-primary text-white text-xs sm:text-sm font-medium`}
              >
                {user.initials}
              </AvatarFallback>
            </Avatar>

            <div className="">
              <p className="text-base max-tab:text-sm  font-medium text-gray-900 truncate">
                {user.name}
              </p>
              <p
                className="text-xs sm:text-sm font-normal"
              >
                <span className='font-semibold'>
                  {formatCurrency(user.amount)}
                </span> to <span>
                  {user.accountNumber}
                </span>
              </p>
            </div>
          </div>
          <Button className='max-mdPhone:text-xs bg-transparent border-primary text-primary cursor-pointer  hover:text-white border-1'>
            <TbRepeat /> <span className='max-mdPhone:hidden'>
              
              Repeat Transfer
              </span> 
              </Button>
        </div>
      ))}
    </div>
  )
}

export default BeneficiaryList