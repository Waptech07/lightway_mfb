import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BeneficiaryList from './BeneficiaryList'
import RecentTransactions from './RecentTransactions';
const Beneficiaries = (): React.JSX.Element => {
    return (
        <><div className="flex-none self-start">
            <Tabs defaultValue="transactions" className="bg-[rgba(246,246,246,1)] p-2 rounded-lg min-w-[30rem] border-1 max-lg:w-full max-lg:min-w-full">
                <TabsList className='border-b-1 p-0 w-full rounded-none'>
                    <TabsTrigger value="transactions" className='cursor-pointer text-sm max-mdPhone:text-xs  font-medium rounded-b-none shadow-none data-[state=active]:bg-primary data-[state=active]:text-white'>Recent Transactions</TabsTrigger>
                    <TabsTrigger value="beneficiaries" className='cursor-pointer text-sm max-mdPhone:text-xs  font-medium rounded-b-none shadow-none data-[state=active]:bg-primary data-[state=active]:text-white'>Beneficiaries</TabsTrigger>
                </TabsList>
                <TabsContent value="transactions">
                    <RecentTransactions />
                </TabsContent>
                <TabsContent value="beneficiaries">
                    <BeneficiaryList />
                </TabsContent>
            </Tabs>
        </div>
        </>
    )
}

export default Beneficiaries