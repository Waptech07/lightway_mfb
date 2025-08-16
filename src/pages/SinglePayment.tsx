import React, { useState } from 'react'
import Header from '@/components/Header'
import AvailableBalance from '@/components/AvailableBalance'
import DestinationForm from '@/components/single-payment/DestinationForm'
import { motion, AnimatePresence } from "framer-motion";

const SinglePayments = (): React.JSX.Element => {
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
    const [activeTab, setActiveTab] = useState<"my-accounts" | "lightway-accounts" | "other-banks">("my-accounts");
    const [indicatorWidth, setIndicatorWidth] = useState(0);
    const [indicatorLeft, setIndicatorLeft] = useState(0);

    // Set initial positions after first render
    React.useEffect(() => {
        const activeButton = document.querySelector(
            `button[data-tab="${activeTab}"]`
        ) as HTMLElement;
        if (activeButton) {
            setIndicatorWidth(activeButton.offsetWidth);
            setIndicatorLeft(activeButton.offsetLeft);
        }
    }, [activeTab]);

    const handleTabClick = (tab: "my-accounts" | "lightway-accounts" | "other-banks", e: React.MouseEvent) => {
        setActiveTab(tab);
        const target = e.target as HTMLElement;
        const button = target.closest("button") as HTMLElement;

        if (button) {
            setIndicatorWidth(button.offsetWidth);
            setIndicatorLeft(button.offsetLeft);
        }
    };
    return (

        <div className="text-left font-sf-pro">
            {/* Header Section */}
            <Header header="Single Payment" detail="Quickly move funds with a single payment to any supported account." />

            {/* Tabs */}
            <div className="relative mb-4">
                <nav className="flex justify-start space-x-8">
                    {["my-accounts", "lightway-accounts", "other-banks"].map((tab) => (
                        <button
                            key={tab}
                            data-tab={tab}
                            className={`relative py-2 px-2 text-base font-semibold transition-colors duration-200 cursor-pointer ${activeTab === tab
                                ? "text-[#2563eb]"
                                : "text-gray-500 hover:text-[#2563eb]"
                                }`}
                            onClick={(e) => handleTabClick(tab as "my-accounts" | "lightway-accounts" | "other-banks", e)}
                        >
                            {tab === "my-accounts" ? "To My Accounts" : tab === "lightway-accounts" ? "To Lightway Accounts" : "To Other Banks"}
                        </button>
                    ))}
                </nav>




                {/* Underline indicator */}
                <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-[#2563eb] rounded-sm"
                    animate={{
                        width: indicatorWidth,
                        left: indicatorLeft,
                    }}
                    transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                    }}
                /></div>


            <AvailableBalance accountNumber={'3115679989'} availableBalance={50999} />
            {/* Tab Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="pt-2"
                >
                    {activeTab === "my-accounts" ? <DestinationForm /> : <>ho</>}
                </motion.div>
            </AnimatePresence>


        </div>)
}

export default SinglePayments