import React, { useState } from "react";
import bg from "@/assets/card-bg.png";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { FaRegCopy } from "react-icons/fa6";

interface DashboardBalanceProps {
  availableBalance: number;
  ledgerBalance: number;
  blockedBalance: number;
  accountNumber: string;
}

const DashboardBalance: React.FC<DashboardBalanceProps> = ({
  availableBalance,
  ledgerBalance,
  blockedBalance,
  accountNumber,
}) => {
  const [copied, setCopied] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied after 2s
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const toggleBalanceVisibility = () => {
    setShowBalance((prev) => !prev);
  };

  return (
    <div
      className="w-full border-2 border-primary/30 rounded-xl p-4 md:p-6 flex flex-col gap-6 md:gap-8 bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex flex-col flex-wrap sm:flex-row text-left justify-between gap-4 z-10">
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
      </div>

      <div className="z-10">
        <div className="flex justify-between gap-2 mb-2">
          <p className="text-sm text-gray-600">Ledger Balance</p>
          <p className="text-sm text-red-600">Blocked Balance</p>
        </div>
        <div className="flex justify-between gap-2">
          <p className="text-lg md:text-xl font-medium">
            {formatCurrency(ledgerBalance)}
          </p>
          <p className="text-lg md:text-xl font-medium text-red-600">
            {formatCurrency(blockedBalance)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardBalance;
