import React, { useState } from 'react'
import Header from '@/components/Header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AvailableBalance from '@/components/AvailableBalance'

const SinglePayment = (): React.JSX.Element => {
    type Tab = {
        id: string;
        label: string;
        value: string;
    }[]
    const tabs: Tab = [
        {
            id: 'my-accounts',
            label: 'To My Accounts',
            value: 'my-accounts'
        },
        {
            id: 'lightway-accounts',
            label: 'To Lightway Accounts',
            value: 'lightway-accounts'
        },
        {
            id: 'other-banks',
            label: 'To Other Banks',
            value: 'other-banks'
        }
    ];
    const [showTabs, setShowTabs] = useState<string>(tabs[0].value);
    // const handleTabChange = (value: string) => {
    //     setShowTabs(value);
    // }
    return (

        <div className="text-left font-sf-pro">
            {/* Header Section */}
            <Header header="Single Payment" detail="Quickly move funds with a single payment to any supported account." />

            {/* Tabs */}

            <div className='w-full flex bg-transparent p-0 text-center h-auto border-b border-gray-400 rounded-none mb-4'>
                {tabs.map((tab) => (
                    <button key={tab.id} type='button' className={`${showTabs === tab.value ? "border-b-2 border-[rgba(28,100,242,1)] text-[rgba(28,100,242,1)]" : "border-b-2 border-transparent"}  p-4 cursor-pointer`}
                        onClick={() => {
                            setShowTabs(tab.value);
                            console.log(showTabs);
                        }}
                    >{tab.label}</button>))}
            </div>
            <AvailableBalance accountNumber={'3115679989'} availableBalance={50999} />

        </div>)
}

export default SinglePayment