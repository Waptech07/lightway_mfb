import React from 'react'
import TabRow from './TabRow';
import { GoSearch } from "react-icons/go";
import { Input } from '@/components/ui/input'

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
    <div>
      <div className="relative h-10 flex items-center ">
        <span className='absolute  text-muted-foreground left-2'>
          <GoSearch className='h-4 w-5' />
        </span>
        <Input type="text" placeholder='Search' id='naration' className='bg-white pl-8 rounded-lg' />
      </div>
      <TabRow list={users} isBeneficiary={true} onClickFn={undefined} />

    </div>)
}

export default BeneficiaryList