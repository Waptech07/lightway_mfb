import React, { useCallback, useState } from 'react'
import bg from "@/assets/card-bg.png";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { FaRegCopy } from "react-icons/fa6";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import formatCurrency from '@/lib/formatCurrency';
type AccountCardType = {
    accountNumber?: string, AccountCard?: number
}
const AccountCard = ({
    accountNumber = '3115679989',
    AccountCard = 50999
}: AccountCardType): React.JSX.Element => {
    type Account = {
        id: string;
        accountName: string;
        bankName: string;
        accountNumber: string;
        AccountCard: number;
    };
    // Mock accounts
    const accounts: Account[] = [
        {
            id: "1",
            accountNumber: "3115679989",
            AccountCard: 50999.0,
            accountName: "Enoobong & Sons Business",
            bankName: "Lightway MFB",
        },
        {
            id: "2",
            accountNumber: "4102578890",
            AccountCard: 75000.5,
            accountName: "Enoobong Personal",
            bankName: "Lightway MFB",
        },
        {
            id: "3",
            accountNumber: "5500198723",
            AccountCard: 120000.75,
            accountName: "Enoobong Investment",
            bankName: "Lightway MFB",
        },
    ];
    const [copied, setCopied] = useState(false);
    const [showBalance, setShowBalance] = useState(true);
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(accountNumber as string);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset copied after 2s
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };
    const [selectedAccount, setSelectedAccount] = useState<Account>();

    const handleAccountChange = useCallback((accountId: string) => {
        const account = accounts.find((acc) => acc.id === accountId);
        if (account) setSelectedAccount(account);
    }, []);
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
                                {showBalance ? formatCurrency(AccountCard as number) : "₦••••••"}
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
            <Select
                onValueChange={handleAccountChange}
            // value={selectedAccount.id}
            >
                <SelectTrigger className="bg-primary text-white max-mdPhone:text-xs max-[470px]:w-full [&_svg:not([class*='text-'])]:text-white  data-[placeholder]:text-white">
                    <SelectValue placeholder="Choose an Account" className='text-white' />
                </SelectTrigger>

                <SelectContent className="bg-[#050C82] text-white border-[#050C82] cursor-pointer">
                    {accounts.map((account) => (
                        <SelectItem
                            key={account.id}
                            value={account.id}
                            className="cursor-pointer"
                        >
                            {account.accountName} • {account.bankName}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default AccountCard