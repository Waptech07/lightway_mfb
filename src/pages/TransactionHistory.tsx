import React, { useState, useEffect, useMemo, useCallback } from "react";
import cardBg from "@/assets/card-bg.png";
import { FaRegCopy } from "react-icons/fa6";
import { PiEye, PiEyeSlash, PiUsersThreeBold } from "react-icons/pi";
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
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Loader2,
  SearchIcon,
} from "lucide-react";
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
  accountNumbers?: string[]; // For bulk transfers
  accountNumber?: string; // For single transfers
  noOfAccounts?: number; // For bulk transfers
  amount: number;
  date: Date;
  requestType: string;
  status: "Approved" | "Pending" | "Rejected";
  accountId: string;
};

// Mock accounts
const accounts: Account[] = [
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

// Helper to generate random account numbers
const generateAccountNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

// Mock transactions with accountId
const mockTransactions: Transaction[] = [
  {
    id: "1",
    accountName: "Company Utility Bill",
    accountNumbers: Array(4).fill(null).map(generateAccountNumber),
    noOfAccounts: 4,
    amount: 125000,
    date: new Date(2025, 5, 21),
    requestType: "Bulk Transfer",
    status: "Approved",
    accountId: "1",
  },
  {
    id: "2",
    accountName: "House Domestic Bills",
    accountNumbers: Array(5).fill(null).map(generateAccountNumber),
    noOfAccounts: 5,
    amount: 87500,
    date: new Date(2025, 5, 22),
    requestType: "Bulk Transfer",
    status: "Pending",
    accountId: "1",
  },
  {
    id: "3",
    accountName: "Company Utility Bill",
    accountNumbers: Array(4).fill(null).map(generateAccountNumber),
    noOfAccounts: 4,
    amount: 350000,
    date: new Date(2025, 5, 23),
    requestType: "Bulk Transfer",
    status: "Rejected",
    accountId: "1",
  },
  {
    id: "4",
    accountName: "Enoobong George",
    accountNumber: "0123456789",
    amount: 12500,
    date: new Date(2025, 5, 24),
    requestType: "Single Transfer",
    status: "Approved",
    accountId: "2",
  },
  {
    id: "5",
    accountName: "Enoobong George",
    accountNumber: "0987654321",
    amount: 52500,
    date: new Date(2025, 5, 25),
    requestType: "Single Transfer",
    status: "Approved",
    accountId: "2",
  },
  {
    id: "6",
    accountName: "Company Utility Bill",
    accountNumber: "1122334455",
    amount: 52500,
    date: new Date(2025, 5, 26),
    requestType: "Single Transfer",
    status: "Pending",
    accountId: "1",
  },
  {
    id: "7",
    accountName: "Enoobong George",
    accountNumber: "5544332211",
    amount: 75000,
    date: new Date(2025, 5, 27),
    requestType: "Single Transfer",
    status: "Pending",
    accountId: "2",
  },
  {
    id: "8",
    accountName: "Supplier Payment",
    accountNumbers: Array(3).fill(null).map(generateAccountNumber),
    noOfAccounts: 3,
    amount: 120000,
    date: new Date(2025, 5, 28),
    requestType: "Bulk Transfer",
    status: "Approved",
    accountId: "1",
  },
  {
    id: "9",
    accountName: "Office Rent",
    accountNumber: "6677889900",
    amount: 85000,
    date: new Date(2025, 5, 29),
    requestType: "Single Transfer",
    status: "Approved",
    accountId: "1",
  },
  {
    id: "10",
    accountName: "Client Refund",
    accountNumber: "7788990011",
    amount: 45000,
    date: new Date(2025, 5, 30),
    requestType: "Single Transfer",
    status: "Pending",
    accountId: "2",
  },
  {
    id: "11",
    accountName: "Salary Payments",
    accountNumbers: Array(12).fill(null).map(generateAccountNumber),
    noOfAccounts: 12,
    amount: 650000,
    date: new Date(2025, 6, 1),
    requestType: "Bulk Transfer",
    status: "Approved",
    accountId: "1",
  },
  {
    id: "12",
    accountName: "Vendor Payment",
    accountNumber: "8899001122",
    amount: 78000,
    date: new Date(2025, 6, 2),
    requestType: "Single Transfer",
    status: "Rejected",
    accountId: "1",
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
    <span className="appearance-none w-full bg-transparent outline-none text-left font-mono">
      {value}
    </span>
    <ChevronDown className="text-gray-400 absolute right-3 pointer-events-none w-4 h-4" />
  </button>
));

// Helper to get initials from account name
const getInitials = (name: string): string => {
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return "??";

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  // For single words, take first 2 characters or duplicate first character
  if (name.length >= 2) {
    return name.substring(0, 2).toUpperCase();
  }
  return (name[0] + name[0]).toUpperCase();
};

const TransactionHistory = () => {
  const [copied, setCopied] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<Account>(accounts[0]);
  const [startDate, setStartDate] = useState<Date>(new Date(2025, 5, 1)); // June 1, 2025
  const [endDate, setEndDate] = useState<Date>(new Date(2025, 5, 30)); // June 30, 2025
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "All" | Transaction["status"]
  >("All");
  const [isLoading, setIsLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Format currency with Naira symbol
  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }, []);

  // Format date to string
  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString("en-GB");
  }, []);

  // Copy account number to clipboard
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(selectedAccount.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }, [selectedAccount]);

  // Toggle balance visibility
  const toggleBalanceVisibility = useCallback(
    () => setShowBalance((prev) => !prev),
    []
  );

  // Handle account change
  const handleAccountChange = useCallback((accountId: string) => {
    const account = accounts.find((acc) => acc.id === accountId);
    if (account) setSelectedAccount(account);
  }, []);

  // Apply all filters to transactions
  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      // Account filter
      if (transaction.accountId !== selectedAccount.id) {
        return false;
      }

      // Date range filter
      const transactionDate = new Date(transaction.date);
      if (transactionDate < startDate || transactionDate > endDate) {
        return false;
      }

      // Status filter
      if (filterStatus !== "All" && transaction.status !== filterStatus) {
        return false;
      }

      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const amountString = formatCurrency(transaction.amount).toLowerCase();
        const dateString = formatDate(transaction.date);

        return (
          transaction.accountName.toLowerCase().includes(searchLower) ||
          transaction.requestType.toLowerCase().includes(searchLower) ||
          amountString.includes(searchLower) ||
          dateString.includes(searchTerm) ||
          (transaction.requestType === "Single Transfer" &&
            transaction.accountNumber?.toLowerCase().includes(searchLower)) ||
          (transaction.requestType === "Bulk Transfer" &&
            transaction.accountNumbers?.some((num) =>
              num.toLowerCase().includes(searchLower)
            ))
        );
      }

      return true;
    });
  }, [
    selectedAccount,
    startDate,
    endDate,
    filterStatus,
    searchTerm,
    formatCurrency,
    formatDate,
  ]);

  // Calculate paginated transactions
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredTransactions, currentPage, rowsPerPage]);

  // Update total pages when rows per page or transactions change
  useEffect(() => {
    const total = Math.ceil(filteredTransactions.length / rowsPerPage);
    setTotalPages(total || 1);

    // Reset to first page if current page is out of bounds
    if (currentPage > total) {
      setCurrentPage(1);
    }
  }, [filteredTransactions, rowsPerPage, currentPage]);

  // Generate page numbers
  const generatePageNumbers = () => {
    if (totalPages <= 1) return [1];

    const pages = [];
    const maxPagesToShow = 5;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxPagesToShow) {
      const half = Math.floor(maxPagesToShow / 2);
      startPage = Math.max(1, currentPage - half);
      endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (value: string) => {
    const rows = parseInt(value.replace(/\D/g, ""), 10);
    if (!isNaN(rows)) {
      setRowsPerPage(rows);
      setCurrentPage(1); // Reset to first page
    }
  };

  // Simulate loading state for search
  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
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
        className="w-full border-2 border-primary/30 rounded-xl px-3 py-4 md:px-6 md:py-4 flex flex-col gap-6 bg-cover bg-center relative overflow-hidden xs:flex-row xs:gap-8"
        style={{ backgroundImage: `url(${cardBg})` }}
      >
        <div className="flex flex-col gap-4 w-full">
          {/* Top Section: Account number & selection */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between xs:flex-wrap">
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
          <div className="flex flex-col sm:flex-row items-start gap-4">
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
          <div className="w-full flex flex-col lg:flex-row flex-wrap items-stretch gap-y-4 lg:gap-10 xl:gap-20 mt-4">
            {/* Search  */}
            <div className="flex-1 max-w-full relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#050C82]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto flex-grow">
              {/* Account Type Dropdown */}
              <Select
                onValueChange={(value) => console.log("Account Type:", value)}
              >
                <SelectTrigger className="bg-[#050C82] border-[#050C82] text-white rounded-lg px-4 py-5 w-full h-full">
                  <SelectValue
                    placeholder="Account Type"
                    className="placeholder:text-white/80 text-white"
                  />
                </SelectTrigger>
                <SelectContent className="bg-[#050C82] text-white border-[#050C82]">
                  <SelectItem value="all" className="text-white cursor-pointer">
                    All
                  </SelectItem>
                  <SelectItem
                    value="personal"
                    className="text-white cursor-pointer"
                  >
                    Personal
                  </SelectItem>
                  <SelectItem
                    value="business"
                    className="text-white cursor-pointer"
                  >
                    Business
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Request Type Dropdown */}
              <Select
                onValueChange={(value) => console.log("Request Type:", value)}
              >
                <SelectTrigger className="bg-[#050C82] border-[#050C82] text-white rounded-lg px-4 py-5 w-full h-full">
                  <SelectValue
                    placeholder="Request Type"
                    className="placeholder:text-white/80 text-white"
                  />
                </SelectTrigger>
                <SelectContent className="bg-[#050C82] text-white border-[#050C82]">
                  <SelectItem value="all" className="text-white cursor-pointer">
                    All
                  </SelectItem>
                  <SelectItem
                    value="bulk"
                    className="text-white cursor-pointer"
                  >
                    Bulk Transfer
                  </SelectItem>
                  <SelectItem
                    value="single"
                    className="text-white cursor-pointer"
                  >
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
                <SelectTrigger className="bg-[#050C82] border-[#050C82] text-white rounded-lg px-4 py-5 w-full h-full">
                  <SelectValue
                    placeholder="Status"
                    className="placeholder:text-white/80 text-white"
                  />
                </SelectTrigger>
                <SelectContent className="bg-[#050C82] text-white border-[#050C82]">
                  <SelectItem value="All" className="text-white cursor-pointer">
                    All
                  </SelectItem>
                  <SelectItem
                    value="Approved"
                    className="text-white cursor-pointer"
                  >
                    Approved
                  </SelectItem>
                  <SelectItem
                    value="Pending"
                    className="text-white cursor-pointer"
                  >
                    Pending
                  </SelectItem>
                  <SelectItem
                    value="Rejected"
                    className="text-white cursor-pointer"
                  >
                    Rejected
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
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
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto rounded-t-2xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-black capitalize tracking-wider">
                  Account Name
                </th>
                <th className="px-6 py-3 text-center text-xs sm:text-sm font-medium text-black capitalize tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-center text-xs sm:text-sm font-medium text-black capitalize tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-center text-xs sm:text-sm font-medium text-black capitalize tracking-wider">
                  Request Type
                </th>
                <th className="px-6 py-3 text-center text-xs sm:text-sm font-medium text-black capitalize tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs sm:text-sm font-medium text-black capitalize tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8">
                    <div className="flex justify-center">
                      <Loader2 className="animate-spin h-6 w-6 text-primary" />
                    </div>
                  </td>
                </tr>
              ) : paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-left">
                      <div className="flex items-center gap-4">
                        {transaction.requestType === "Bulk Transfer" ? (
                          <div className="flex items-center justify-center bg-[#050C82] rounded-full w-10 h-10 p-2">
                            <PiUsersThreeBold
                              className="text-white"
                              size={18}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center bg-[#050C82] rounded-full w-10 h-10 p-2 text-sm font-bold text-white">
                            {getInitials(transaction.accountName)}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <p className="text-base font-medium">
                            {transaction.accountName}
                          </p>
                          {transaction.requestType === "Bulk Transfer" ? (
                            <p className="text-sm font-normal">
                              {transaction.noOfAccounts} Accounts
                            </p>
                          ) : (
                            <p className="text-sm font-normal">
                              {transaction.accountNumber}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.requestType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center mr-5">
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
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-center">
                      <button className="text-primary/70 rounded px-2 py-1 text-xs font-normal border-[0.5px] border-primary/70 hover:bg-primary hover:text-white cursor-pointer">
                        View
                      </button>
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
        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="flex flex-wrap gap-y-4 justify-between items-center">
            <div className="flex gap-4">
              <button
                title="navigate-left"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center justify-center w-12 h-9 py-2 px-[14px] rounded-lg border ${
                  currentPage === 1
                    ? "border-gray-300 text-gray-400 cursor-not-allowed"
                    : "border-[#050C82] text-[#050C82] hover:text-white hover:bg-[#050C82] cursor-pointer"
                }`}
              >
                <ArrowLeft size={18} />
              </button>
              <div className="flex items-center justify-center text-center gap-0.5">
                {generatePageNumbers().map((page, index) =>
                  typeof page === "number" ? (
                    <button
                      key={`page-${page}`}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 text-sm font-medium rounded-lg p-3 cursor-pointer ${
                        currentPage === page
                          ? "bg-[#050C82] text-white"
                          : "text-black hover:bg-[#050C82] hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  ) : (
                    <span
                      key={`ellipsis-${index}`}
                      className="w-10 h-10 text-sm font-medium text-black rounded-lg p-3"
                    >
                      ...
                    </span>
                  )
                )}
              </div>
              <button
                title="navigate-right"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center w-12 h-9 py-2 px-[14px] rounded-lg border ${
                  currentPage === totalPages
                    ? "border-gray-300 text-gray-400 cursor-not-allowed"
                    : "border-[#050C82] text-[#050C82] hover:text-white hover:bg-[#050C82] cursor-pointer"
                }`}
              >
                <ArrowRight size={18} />
              </button>
            </div>
            <div>
              <Select
                onValueChange={handleRowsPerPageChange}
                value={`Show ${rowsPerPage} rows`}
              >
                <SelectTrigger className="bg-[#050C82] border-[#050C82] text-white rounded-lg p-3 h-full">
                  <SelectValue placeholder={`Show ${rowsPerPage} rows`} />
                </SelectTrigger>
                <SelectContent className="bg-[#050C82] text-white border-[#050C82]">
                  <SelectItem
                    value="Show 10 rows"
                    className="text-white cursor-pointer"
                  >
                    Show 10 rows
                  </SelectItem>
                  <SelectItem
                    value="Show 15 rows"
                    className="text-white cursor-pointer"
                  >
                    Show 15 rows
                  </SelectItem>
                  <SelectItem
                    value="Show 20 rows"
                    className="text-white cursor-pointer"
                  >
                    Show 20 rows
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
