import React from 'react'
import { GoSearch } from 'react-icons/go'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import formatCurrency from '@/lib/formatCurrency'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { BsPencilSquare } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
const TransferRecipients = (): React.JSX.Element => {

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

  //  
  return (
    <div className="bg-[rgba(246,246,246,1)] max-lg:w-full max-lg:min-w-full  min-w-[27rem] p-2 flex flex-col gap-2.5 rounded-lg  border-1 ">

      <div className='border-b-1 flex pb-2.5 gap-1'>
        <h2 className='text-base font-semibold'>Transfer Recipients</h2>
        {/* bg-white text-black border-1 border-gray-300 rounded-md px-2 py-1 text-sm */}
        <Badge className='text-xs ml-1 rounded-xl w-7 h-5.5 font-semibold bg-[rgba(255,65,18,1)]'>4</Badge>
      </div>
      <div className="relative h-10 flex items-center">
        <span className='absolute  text-muted-foreground left-2'>
          <GoSearch className='h-4 w-5' />
        </span>
        <Input type="text" placeholder='Search' id='naration' className='bg-white pl-8 rounded-lg' />
      </div>

      <div className='flex flex-col gap-2'>
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
            <div className="buttons flex items-center gap-2">

              <BsPencilSquare className='cursor-pointer text-lg' />
              <IoTrashOutline className='cursor-pointer text-lg text-red-500' />
            </div>
          </div>))}
      </div>
    </div>
  )
}

export default TransferRecipients