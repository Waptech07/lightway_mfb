import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { GoSearch } from "react-icons/go";
import BeneficiaryList from './BeneficiaryList'
const Beneficiaries = (): React.JSX.Element => {
    return (
        <>
            <Tabs defaultValue="transactions" className="bg-[rgba(246,246,246,1)] p-2 rounded-lg w-96 border-1 border-red-200">
                <TabsList className='border-b-1 p-0 w-full rounded-none'>
                    <TabsTrigger value="transactions" className='text-sm font-medium rounded-b-none shadow-none data-[state=active]:bg-primary data-[state=active]:text-white'>Recent Transactions</TabsTrigger>
                    <TabsTrigger value="beneficiaries" className='text-sm font-medium rounded-b-none shadow-none data-[state=active]:bg-primary data-[state=active]:text-white'>Beneficiaries</TabsTrigger>
                </TabsList>
                <TabsContent value="transactions">
                    <div className="">
                        
                        <div className="relative h-10 flex items-center">
                            <span className='absolute  text-muted-foreground left-2'>
                                <GoSearch className='h-4 w-5' />
                            </span>
                            <Input type="text" placeholder='Search' id='naration' className=' pl-8 rounded-lg' />
                        </div>

                    </div>
                    <BeneficiaryList />
                </TabsContent>
                <TabsContent value="beneficiaries">
                  
                        <div className="relative h-10 flex items-center">
                            <span className='absolute  text-muted-foreground left-2'>
                                <GoSearch className='h-4 w-5' />
                            </span>
                            <Input type="text" placeholder='Search' id='naration' className='bg-white pl-8 rounded-lg' />
                        </div>

                    <BeneficiaryList />
                </TabsContent>
            </Tabs>
        </>
    )
}

export default Beneficiaries