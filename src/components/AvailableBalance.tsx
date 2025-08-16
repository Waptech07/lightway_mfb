import React, { useState } from 'react'
import bg from "@/assets/card-bg.png";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { FaRegCopy } from "react-icons/fa6";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { formatCurrency } from '@/utils/formatCurrency'; // Assuming you have a utility function for formatting currency

const AvailableBalance = ({ accountNumber, availableBalance }: { accountNumber: string, availableBalance: number }):React.JSX.Element => {

    const [copied, setCopied] = useState(false);
    const [showBalance, setShowBalance] = useState(true);
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(accountNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset copied after 2s
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };
    // Format currency values
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };
    const toggleBalanceVisibility = () => {
        setShowBalance((prev) => !prev);
    };
    return (
        <div
            className="w-full flex max-[470px]:flex-col max-[470px]:gap-2 justify-between border-2 border-primary/30 rounded-xl p-4 md:p-6 bg-cover bg-center relative overflow-hidden"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="flex flex-col gap-4">
                <div
                    className="bg-primary/80 rounded-sm inline-flex items-center h-10 py-1 px-2 gap-1.5 min-w-max cursor-pointer w-fit"
                    onClick={handleCopy}
                    title="Copy to clipboard"
                >
                    <FaRegCopy className="text-white h-4 w-4" />
                    <p className="bg-white text-black px-2 py-1 rounded-sm text-sm sm:text-base truncate max-w-[120px] sm:max-w-[160px]">
                        {copied ? "Copied!" : accountNumber}
                    </p>
                </div>
                <div className="">
                    <div>
                        <h3 className="text-sm font-normal text-gray-600">
                            Available Balance
                        </h3>
                        <p className="font-bold text-2xl md:text-3xl flex items-center gap-2">
                            <span>
                                {showBalance ? formatCurrency(availableBalance) : "₦••••••"}
                            </span>
                            {showBalance ? (
                                <PiEyeSlash
                                    className="text-primary/70 h-5 w-5 cursor-pointer"
                                    onClick={toggleBalanceVisibility}
                                />
                            ) : (
                                <PiEye
                                    className="text-primary/70 h-5 w-5 cursor-pointer"
                                    onClick={toggleBalanceVisibility}
                                />
                            )}
                        </p>
                    </div>
                </div>



            </div>
            <Select>
                <SelectTrigger className="bg-primary max-mdPhone:text-xs max-[470px]:w-full [&_svg:not([class*='text-'])]:text-white  data-[placeholder]:text-white">
                    <SelectValue placeholder="Choose an Account" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value={accountNumber}>{accountNumber}</SelectItem>
                    <SelectItem value={accountNumber}>{accountNumber}</SelectItem>
                    <SelectItem value={accountNumber}>{accountNumber}</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default AvailableBalance