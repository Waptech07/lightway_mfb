import React, { useState } from "react";
import cardBg from "@/assets/card-bg.png";
import { FaRegCopy } from "react-icons/fa6";
import { PiEye, PiEyeSlash, PiTrashBold } from "react-icons/pi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "@/components/Header";

interface Account {
  id: string;
  accountNumber: string;
  availableBalance: number;
  accountName: string;
  bankName: string;
}

interface StatementsProps {
  accounts: Account[];
}

const Statements: React.FC<StatementsProps> = ({ accounts }) => {
  const [copied, setCopied] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<Account>(accounts[0]);
  const [startDate, setStartDate] = useState<Date>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date;
  });
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedAccount.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const toggleBalanceVisibility = () => setShowBalance((prev) => !prev);

  const handleAccountChange = (accountId: string) => {
    const account = accounts.find((acc) => acc.id === accountId);
    if (account) setSelectedAccount(account);
  };

  const handleSearch = async () => {
    setIsLoading(true);

    // Simulate API call
    try {
      // In a real app, this would be an actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate mock transactions based on date range
      const mockTransactions = generateMockTransactions(
        selectedAccount.availableBalance,
        startDate,
        endDate
      );

      setTransactions(mockTransactions);
      console.log("Fetched transactions:", mockTransactions);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (transactions.length === 0) {
      alert("No transactions to download. Please search first.");
      return;
    }

    const filename = `Statement_${selectedAccount.accountNumber}_${format(
      startDate,
      "yyyyMMdd"
    )}_to_${format(endDate, "yyyyMMdd")}.csv`;

    const headers = ["Date", "Description", "Amount", "Balance"];
    const rows = transactions.map((tx) => [
      format(tx.date, "dd/MM/yyyy"),
      tx.description,
      tx.amount,
      formatCurrency(tx.balance),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Custom date input component
  const CustomDateInput = React.forwardRef<
    HTMLButtonElement,
    { value?: string; onClick?: () => void }
  >(({ value, onClick }, ref) => (
    <button
      className="relative flex items-center w-[200px] py-3 px-2 bg-transparent border border-gray-300 rounded-lg text-sm text-black cursor-pointer"
      onClick={onClick}
      ref={ref}
      type="button"
    >
      <CalendarDays className="text-gray-400 mr-2 w-4 h-4" />
      <span className="appearance-none w-full bg-transparent outline-none text-left">
        {value}
      </span>
      <ChevronDown className="text-gray-400 absolute right-3 pointer-events-none w-4 h-4" />
    </button>
  ));

  // Generate mock transactions for demo purposes
  const generateMockTransactions = (
    startingBalance: number,
    fromDate: Date,
    toDate: Date
  ) => {
    const transactions = [];
    let currentBalance = startingBalance;
    const days = Math.floor(
      (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Generate transactions for each day in the range
    for (let i = 0; i <= days; i++) {
      const txDate = new Date(fromDate);
      txDate.setDate(txDate.getDate() + i);

      // Skip weekends
      if (txDate.getDay() === 0 || txDate.getDay() === 6) continue;

      // Randomly decide if we should generate a transaction for this day
      if (Math.random() > 0.3) {
        const amount =
          Math.random() > 0.5
            ? -Math.floor(Math.random() * 5000 + 1000)
            : Math.floor(Math.random() * 10000 + 5000);

        currentBalance += amount;

        transactions.push({
          id: `tx-${i}`,
          date: new Date(txDate),
          description:
            amount > 0
              ? `Deposit from ${
                  ["Client", "Partner", "Investor"][
                    Math.floor(Math.random() * 3)
                  ]
                }`
              : `Payment to ${
                  ["Vendor", "Supplier", "Service"][
                    Math.floor(Math.random() * 3)
                  ]
                }`,
          amount: formatCurrency(amount),
          rawAmount: amount,
          balance: currentBalance,
        });
      }
    }

    return transactions;
  };

  return (
    <div className="font-sf-pro">
      {/* Header */}
      <Header
        header=" Statements"
        detail="Quickly view and download your account statements."
      />

      {/* Account Card */}
      <div
        className="w-full border-2 border-primary/30 rounded-xl px-3 py-4 md:px-6 md:py-4 flex flex-col gap-6 bg-cover bg-center relative overflow-hidden sm:flex-row sm:gap-8"
        style={{ backgroundImage: `url(${cardBg})` }}
      >
        <div className="flex flex-col gap-4 w-full">
          {/* Top Section: Account number & selection */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:flex-wrap">
            {/* Account Number */}
            <div
              className="bg-primary/80 rounded-sm inline-flex items-center h-10 py-1 px-2 gap-1.5 cursor-pointer w-fit"
              onClick={handleCopy}
              title="Copy to clipboard"
            >
              <FaRegCopy className="text-white h-4 w-4" />
              <p className="bg-white text-black px-2 py-1 rounded-sm text-sm sm:text-base truncate max-w-[180px]">
                {copied ? "Copied!" : selectedAccount.accountNumber}
              </p>
            </div>

            {/* Account Selection */}
            <div className="min-w-[150px] w-full sm:w-auto">
              <Select
                onValueChange={handleAccountChange}
                value={selectedAccount.id}
              >
                <SelectTrigger className="bg-[#050C82] border-[#050C82] text-white [&>svg]:text-white w-full sm:w-auto">
                  <SelectValue placeholder="Choose an Account" />
                </SelectTrigger>
                <SelectContent className="bg-[#050C82] text-white border-[#050C82]">
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.accountName} • {account.bankName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Balance */}
          <div className="flex flex-col text-left">
            <h3 className="text-sm font-normal text-gray-600">
              Available Balance
            </h3>
            <p className="font-bold text-2xl sm:text-3xl flex items-center gap-2">
              <span>
                {showBalance
                  ? formatCurrency(selectedAccount.availableBalance)
                  : "₦••••••"}
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

      {/* Date Range + Search */}
      <div className="mt-10 flex flex-col gap-10">
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-col md:flex-row items-start gap-4">
            {/* From Date */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm font-medium">From Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => {
                  if (date) setStartDate(date);
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                maxDate={endDate}
                customInput={<CustomDateInput />}
                dateFormat="dd/MM/yyyy"
                popperPlacement="bottom-start"
              />
            </div>

            {/* To Date */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm font-medium">To Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => {
                  if (date) setEndDate(date);
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={new Date()}
                customInput={<CustomDateInput />}
                dateFormat="dd/MM/yyyy"
                popperPlacement="bottom-start"
              />
            </div>
          </div>

        </div>
        
        <div className="flex">

        </div>
          {/* Search Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            disabled={isLoading}
            className={`${
              isLoading
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-primary/5 hover:bg-primary/15 cursor-pointer"
            } text-primary/70 rounded-md px-6 py-2 font-medium border border-primary/70`}
          >
            {isLoading ? "Searching..." : "Search"}
          </motion.button>

        {/* Transactions Table (Hidden until search) */}
        {transactions.length > 0 && (
          <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  {["Date", "Description", "Amount", "Balance"].map(
                    (header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide select-none"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {transactions.map((tx, idx) => (
                  <tr
                    key={tx.id}
                    className={`transition-colors duration-150 cursor-default ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-primary/10 text-left`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                      {format(tx.date, "dd/MM/yyyy")}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-900 max-w-xs">
                      {tx.description}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                        tx.rawAmount < 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {tx.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {formatCurrency(tx.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={handleDownload}
            className="bg-[#050C82] hover:bg-[#0B0B75] text-white font-medium px-6 py-2 rounded-md w-fit cursor-pointer"
            disabled={isLoading || transactions.length === 0}
          >
            Download Statement
          </button>

          {transactions.length > 0 && (
            <button
              onClick={() => setTransactions([])}
              className="flex items-center justify-between bg-red-500 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-md w-fit cursor-pointer"
            >
              <PiTrashBold className="h-5 w-5 mr-2" />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Dummy data for accounts
const dummyAccounts: Account[] = [
  {
    id: "1",
    accountNumber: "3115679989",
    availableBalance: 50999.0,
    accountName: "Enoobong & Sons Business",
    bankName: "Lightway MFB",
  },
  {
    id: "2",
    accountNumber: "4102578890",
    availableBalance: 75000.5,
    accountName: "Enoobong Personal",
    bankName: "Lightway MFB",
  },
  {
    id: "3",
    accountNumber: "5500198723",
    availableBalance: 120000.75,
    accountName: "Enoobong Investment",
    bankName: "Lightway MFB",
  },
];

const StatementsWithData = () => <Statements accounts={dummyAccounts} />;

export default StatementsWithData;
