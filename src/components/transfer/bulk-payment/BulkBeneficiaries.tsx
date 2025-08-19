import React from 'react'
import { Input } from '@/components/ui/input'
import { GoSearch } from "react-icons/go";
import { PiUsersThreeBold } from "react-icons/pi";
import { Button } from '@/components/ui/button';
const BulkBeneficiaries = (): React.JSX.Element => {
    const services = [
        {
            name: "Company Utility Bill",
            accounts: 4,
        },
        {
            name: "Internet Service Provider",
            accounts: 3,
        },
        {
            name: "Mobile Phone Plan",
            accounts: 5,
        },
        {
            name: "Insurance Premiums",
            accounts: 2,
        },
        {
            name: "Subscription Services",
            accounts: 6,
        },
    ];

    return (
        <div className="max-mdLap:w-full min-w-96 max-mdPhone:min-w-full">
            <div className="relative h-10 flex items-center">
                <span className='absolute  text-muted-foreground left-2'>
                    <GoSearch className='h-4 w-5' />
                </span>
                <Input type="text" placeholder='Search' id='naration' className='bg-white pl-8 rounded-lg' />
            </div>
            <div className="flex flex-col gap-4">

           
            {services.map((service, index) => (
                <div key={index} className="flex justify-between items-center p-2 border-b">
                  <div className="flex gap-3">

                  
                    <div className="flex items-center justify-center bg-[#050C82] rounded-full w-10 h-10 p-2">
                        <PiUsersThreeBold
                            className="text-white"
                            size={18}
                        />
                    </div>
                    <div className="">
                        <h3 className="font-medium text-base">{service.name}</h3>
                        <p className="text-sm">{service.accounts} Accounts</p>
                    </div></div>
                    <Button className="text-sm h-7.5 bg-transparent border-primary text-primary cursor-pointer  hover:text-white border-1 ">Select</Button>
                </div>
            ))}
 </div>
        </div>
    )
}

export default BulkBeneficiaries