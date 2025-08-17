import React, { useEffect, useState } from 'react'
import AccountCard from '@/components/AccountCard';
import Header from '@/components/Header'
import LightwayAccount from '@/components/bulk-payment/LightWayAccount';
import OtherBanks from '@/components/bulk-payment/OtherBanks';
import { AnimatePresence, motion } from 'framer-motion';

const BulkPayments = (): React.JSX.Element => {
    const [activeTab, setActiveTab] = useState<"lightway-accounts" | "other-banks">("lightway-accounts");
    const [indicatorWidth, setIndicatorWidth] = useState(0);
    const [indicatorLeft, setIndicatorLeft] = useState(0);

    // Set initial positions after first render
    useEffect(() => {
        const activeButton = document.querySelector(
            `button[data-tab="${activeTab}"]`
        ) as HTMLElement;
        if (activeButton) {
            setIndicatorWidth(activeButton.offsetWidth);
            setIndicatorLeft(activeButton.offsetLeft);
        }
    }, [activeTab]);

    const handleTabClick = (
        tab: "lightway-accounts" | "other-banks",
        e: React.MouseEvent
    ) => {
        setActiveTab(tab);
        const target = e.target as HTMLElement;
        const button = target.closest("button") as HTMLElement;

        if (button) {
            setIndicatorWidth(button.offsetWidth);
            setIndicatorLeft(button.offsetLeft);
        }
    };
    return (
        <div className='text-left font-sf-pro'>

            <Header header="Bulk Payments" detail="Quickly move funds with a single payment to any supported account." />
            {/* Tabs */}
    
      <div className="border-b border-gray-200 mb-6 relative">
                <nav className="flex justify-start space-x-8">
                    {["lightway-accounts", "other-banks"].map((tab) => (
                        <button
                            key={tab}
                            data-tab={tab}
                            className={`relative py-2 px-2 text-base max-tab:text-sm max-mdPhone:text-xs font-semibold transition-colors duration-200 cursor-pointer ${activeTab === tab
                                ? "text-[#2563eb]"
                                : "text-gray-500 hover:text-[#2563eb]"
                                }`}
                            onClick={(e) => handleTabClick(tab as "lightway-accounts" | "other-banks", e)}
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

            <AccountCard />
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
                    {activeTab === "lightway-accounts" ? <LightwayAccount /> : <OtherBanks />}
                </motion.div>
            </AnimatePresence>

        </div>
    )
}

export default BulkPayments