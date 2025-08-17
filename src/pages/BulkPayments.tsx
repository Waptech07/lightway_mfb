import AccountCard from '@/components/AccountCard';
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'

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

    const handleTabClick = (tab: "lightway-accounts" | "other-banks", e: MouseEvent) => {
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
            <AccountCard />
        </div>
    )
}

export default BulkPayments