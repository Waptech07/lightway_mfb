import React, { useState, useEffect, useMemo } from "react";
import cardBg from "@/assets/card-bg.png";
import { FaRegCopy } from "react-icons/fa6";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "@/components/Header";
import { CalendarDays, ChevronDown, Loader2, SearchIcon } from "lucide-react";
import { motion } from "framer-motion";

// Account type
type Account = {
  id: string;
  accountName: string;
  bankName: string;
  accountNumber: string;
  availableBalance: number;
};

// Transaction type
type Transaction = {
  id: string;
  accountName: string;
  noOfAccounts?: string;
  amount: number;
  date: Date;
  requestType: string;
  status: "Approved" | "Pending" | "Rejected";
  icon?: string;
  currency?: string;
};

// Mock accounts
const accounts: Account[] = [
  {
    id: "1",
    accountName: "HESS ES",
    bankName: "Sterling Bank",
    accountNumber: "0123456789",
    availableBalance: 1250000.75,
  },
  {
    id: "2",
    accountName: "RU",
    bankName: "GTBank",
    accountNumber: "9876543210",
    availableBalance: 875000.25,
  },
];

// Mock transactions
const mockTransactions: Transaction[] = [
  {
    id: "1",
    accountName: "Company Utility Bill",
    noOfAccounts: "4",
    amount: 125000,
    date: new Date(2025, 5, 21), // add time
    requestType: "Bulk Transfer",
    status: "Approved",
  },
  {
    id: "2",
    accountName: "House Domestic Bills",
    noOfAccounts: "5",
    amount: 87500,
    date: new Date(2025, 5, 22), // add time
    requestType: "Bulk Transfer",
    status: "Pending",
  },
  {
    id: "3",
    accountName: "Company Utility Bill",
    noOfAccounts: "4",
    amount: 350000,
    date: new Date(2025, 5, 23), // add time
    requestType: "Bulk Transfer",
    status: "Rejected",
  },
  {
    id: "4",
    accountName: "Enoobong George",
    amount: 12500,
    date: new Date(2025, 5, 24), // add time
    requestType: "Single Transfer",
    status: "Approved",
  },
  {
    id: "5",
    accountName: "Enoobong George",
    amount: 52500,
    date: new Date(2025, 5, 25), // add time
    requestType: "Single Transfer",
    status: "Approved",
  },
  {
    id: "6",
    accountName: "Company Utility Bill",
    amount: 52500,
    date: new Date(2025, 5, 26), // add time
    requestType: "Single Transfer",
    status: "Pending",
  },
  {
    id: "7",
    accountName: "Enoobong George",
    amount: 75000,
    date: new Date(2025, 5, 27), // add time
    requestType: "Single Transfer",
    status: "Pending",
  },
];

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

const TransactionHistory = () => {
  const [copied, setCopied] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<Account>(accounts[0]);
  const [startDate, setStartDate] = useState<Date>(new Date(2025, 6, 1)); // July 1, 2025
  const [endDate, setEndDate] = useState<Date>(new Date()); // Today
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "All" | Transaction["status"]
  >("All");
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  // Format currency with Naira symbol
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Copy account number to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedAccount.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Toggle balance visibility
  const toggleBalanceVisibility = () => setShowBalance((prev) => !prev);

  // Handle account change
  const handleAccountChange = (accountId: string) => {
    const account = accounts.find((acc) => acc.id === accountId);
    if (account) setSelectedAccount(account);
  };

  // Handle search
  const handleSearch = async () => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Filter by date range
      const filtered = mockTransactions.filter((transaction) => {
        return transaction.date >= startDate && transaction.date <= endDate;
      });

      setTransactionHistory(filtered);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Apply search and filter to transactions
  const filteredTransactions = useMemo(() => {
    return transactionHistory.filter((transaction) => {
      // Status filter
      if (filterStatus !== "All" && transaction.status !== filterStatus) {
        return false;
      }

      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          transaction.accountName.toLowerCase().includes(searchLower) ||
          transaction.requestType.toLowerCase().includes(searchLower) ||
          formatCurrency(transaction.amount)
            .toLowerCase()
            .includes(searchLower) ||
          transaction.date.toLocaleDateString("en-GB").includes(searchTerm)
        );
      }

      return true;
    });
  }, [transactionHistory, searchTerm, filterStatus]);

  // Load initial transactions
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="font-sf-pro">
      {/* Header */}
      <Header
        header="Transaction History"
        detail="Explore a comprehensive log of your transactions for easy navigation and audit tracking."
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

          {/* Filter Section */}
          <div className="w-full flex flex-col md:flex-row flex-wrap mt-4 space-x-20">
            {/* Search Input */}
            <div className="flex-1 max-w-[400px] relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                {/* Search Icon */}
                <SearchIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#050C82]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3">
              {/* Account Type Dropdown */}
              <Select
                onValueChange={(value) => console.log("Account Type:", value)}
              >
                <SelectTrigger className="bg-[#050C82] border-[#050C82] text-white [&>svg]:text-white rounded-lg px-4 py-3 min-w-[160px]">
                  <SelectValue
                    placeholder="Account Type"
                    className="placeholder:text-white/80 text-white [&>svg]:text-white"
                  />
                </SelectTrigger>
                <SelectContent className="bg-[#050C82] text-white border-[#050C82] [&>*]:text-white">
                  <SelectItem value="all" className="text-white">
                    All
                  </SelectItem>
                  <SelectItem value="personal" className="text-white">
                    Personal
                  </SelectItem>
                  <SelectItem value="business" className="text-white">
                    Business
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Request Type Dropdown */}
              <Select
                onValueChange={(value) => console.log("Request Type:", value)}
              >
                <SelectTrigger className="bg-[#050C82] text-white rounded-lg px-4 py-3 min-w-[160px] [&>svg]:text-white">
                  <SelectValue
                    placeholder="Request Type"
                    className="placeholder:text-white/80 text-white"
                  />
                </SelectTrigger>
                <SelectContent className="bg-[#050C82] text-white border-[#050C82] [&>*]:text-white">
                  <SelectItem value="all" className="text-white">
                    All
                  </SelectItem>
                  <SelectItem value="bulk" className="text-white">
                    Bulk Transfer
                  </SelectItem>
                  <SelectItem value="single" className="text-white">
                    Single Transfer
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Status Dropdown */}
              <Select
                onValueChange={(value) =>
                  setFilterStatus(value as Transaction["status"] | "All")
                }
              >
                <SelectTrigger className="bg-[#050C82] text-white rounded-lg px-4 py-3 min-w-[160px] [&>svg]:text-white">
                  <SelectValue
                    placeholder="Status"
                    className="placeholder:text-white/80 text-white"
                  />
                </SelectTrigger>
                <SelectContent className="bg-[#050C82] text-white border-[#050C82] [&>*]:text-white">
                  <SelectItem value="All" className="text-white">
                    All
                  </SelectItem>
                  <SelectItem value="Approved" className="text-white">
                    Approved
                  </SelectItem>
                  <SelectItem value="Pending" className="text-white">
                    Pending
                  </SelectItem>
                  <SelectItem value="Rejected" className="text-white">
                    Rejected
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-left">
                    <div className="flex justify-center">
                      <Loader2 className="animate-spin h-6 w-6 text-primary" />
                    </div>
                  </td>
                </tr>
              ) : filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {transaction.icon && (
                          <span className="mr-2">{transaction.icon}</span>
                        )}
                        {transaction.currency && (
                          <span className="mr-1">{transaction.currency}</span>
                        )}
                        {transaction.accountName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.date.toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.requestType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            transaction.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : transaction.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                        <button className="ml-2 text-primary hover:text-primary-dark">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
