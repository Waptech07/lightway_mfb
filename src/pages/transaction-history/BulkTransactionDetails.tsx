import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Search as SearchIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDateInput from "@/components/CustomDateInput";
import Header from "@/components/Header";
import { PiUsersThreeBold } from "react-icons/pi";

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

// Types
type Initiator = {
  name: string;
  email: string;
};

type Transaction = {
  id: string;
  accountName: string;
  accountNumber: string;
  amount: number;
  bank: string;
  status: "Approved" | "Pending" | "Rejected";
  Initiator: Initiator;
};

type BulkTransfer = {
  id: string;
  bulkName: string;
  reference: string;
  date: Date;
  totalAmount: number;
  status: "Approved" | "Pending" | "Rejected";
  transactions: Transaction[];
};

// Mock Data
const mockBulkTransfers: BulkTransfer[] = [
  {
    id: "1",
    bulkName: "Company Utility Bill",
    reference: "Salary Payment June",
    date: new Date(2025, 5, 21, 10, 30),
    totalAmount: 125000,
    status: "Approved",
    transactions: [
      {
        id: "1-1",
        accountName: "John Doe",
        accountNumber: "1234567890",
        amount: 50000,
        bank: "Lightway MFB",
        status: "Approved",
        Initiator: {
          name: "Alice Johnson",
          email: "alice@company.com",
        },
      },
      {
        id: "1-2",
        accountName: "Jane Smith",
        accountNumber: "0987654321",
        amount: 35000,
        bank: "Lightway MFB",
        status: "Approved",
        Initiator: {
          name: "Alice Johnson",
          email: "alice@company.com",
        },
      },
      {
        id: "1-3",
        accountName: "Robert Johnson",
        accountNumber: "1122334455",
        amount: 40000,
        bank: "Lightway MFB",
        status: "Rejected",
        Initiator: {
          name: "Alice Johnson",
          email: "alice@company.com",
        },
      },
      {
        id: "1-5",
        accountName: "Michael Brown",
        accountNumber: "3344556677",
        amount: 25000,
        bank: "Lightway MFB",
        status: "Approved",
        Initiator: {
          name: "Admin User",
          email: "admin@company.com",
        },
      },
      {
        id: "1-6",
        accountName: "Emily Davis",
        accountNumber: "4455667788",
        amount: 32500,
        bank: "Lightway MFB",
        status: "Pending",
        Initiator: {
          name: "Admin User",
          email: "admin@company.com",
        },
      },
      {
        id: "1-7",
        accountName: "David Wilson",
        accountNumber: "5566778899",
        amount: 28000,
        bank: "Lightway MFB",
        status: "Approved",
        Initiator: {
          name: "Admin User",
          email: "admin@company.com",
        },
      },
      {
        id: "1-8",
        accountName: "Jennifer Taylor",
        accountNumber: "6677889900",
        amount: 32000,
        bank: "Lightway MFB",
        status: "Pending",
        Initiator: {
          name: "Admin User",
          email: "admin@company.com",
        },
      },
      {
        id: "1-9",
        accountName: "Christopher Anderson",
        accountNumber: "7788990011",
        amount: 29500,
        bank: "Lightway MFB",
        status: "Approved",
        Initiator: {
          name: "Admin User",
          email: "admin@company.com",
        },
      },
      {
        id: "1-10",
        accountName: "Amanda Thomas",
        accountNumber: "8899001122",
        amount: 31000,
        bank: "Lightway MFB",
        status: "Rejected",
        Initiator: {
          name: "Admin User",
          email: "admin@company.com",
        },
      },
      {
        id: "1-11",
        accountName: "James Jackson",
        accountNumber: "9900112233",
        amount: 26500,
        bank: "Lightway MFB",
        status: "Approved",
        Initiator: {
          name: "Admin User",
          email: "admin@company.com",
        },
      },
      {
        id: "1-12",
        accountName: "Elizabeth White",
        accountNumber: "0011223344",
        amount: 29000,
        bank: "Lightway MFB",
        status: "Approved",
        Initiator: {
          name: "Admin User",
          email: "admin@company.com",
        },
      },
    ],
  },
  {
    id: "2",
    bulkName: "House Domestic Bills",
    reference: "Vendor Payments",
    date: new Date(2025, 5, 22, 14, 15),
    totalAmount: 87500,
    status: "Pending",
    transactions: [
      {
        id: "2-1",
        accountName: "Supplier A",
        accountNumber: "2233445566",
        amount: 30000,
        bank: "Lightway MFB",
        status: "Pending",
        Initiator: {
          name: "Michael Green",
          email: "michael@company.com",
        },
      },
      {
        id: "2-2",
        accountName: "Supplier B",
        accountNumber: "3344556677",
        amount: 25000,
        bank: "Lightway MFB",
        status: "Pending",
        Initiator: {
          name: "Michael Green",
          email: "michael@company.com",
        },
      },
      {
        id: "2-3",
        accountName: "Supplier C",
        accountNumber: "4455667788",
        amount: 32500,
        bank: "Lightway MFB",
        status: "Pending",
        Initiator: {
          name: "Michael Green",
          email: "michael@company.com",
        },
      },
    ],
  },
];

const BulkTransactionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const bulkTransfer = mockBulkTransfers.find((transfer) => transfer.id === id);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(() => {
    const end = new Date();
    end.setDate(end.getDate() + 30);
    return end;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState<
    "All" | Transaction["status"]
  >("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (bulkTransfer) {
      const total = Math.ceil(filteredTransactions.length / rowsPerPage);
      setTotalPages(total || 1);
      if (currentPage > total) setCurrentPage(1);
    }
  }, [bulkTransfer, rowsPerPage, currentPage, searchTerm]);

  if (!bulkTransfer) {
    return (
      <div className="p-6 text-center">
        <p>Bulk transfer not found</p>
      </div>
    );
  }

  const filteredTransactions = useMemo(() => {
    return bulkTransfer.transactions.filter((t) => {
      if (filterStatus !== "All" && t.status !== filterStatus) {
        return false;
      }
      const search = searchTerm.toLowerCase();
      return (
        t.accountName.toLowerCase().includes(search) ||
        t.accountNumber.includes(search) ||
        t.Initiator.name.toLowerCase().includes(search) ||
        t.Initiator.email.toLowerCase().includes(search)
      );
    });
  }, [searchTerm, filterStatus, bulkTransfer.transactions]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredTransactions, currentPage, rowsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (value: string) => {
    const rows = parseInt(value.replace(/\D/g, ""), 10);
    if (!isNaN(rows)) {
      setRowsPerPage(rows);
      setCurrentPage(1);
    }
  };

  const generatePageNumbers = () => {
    if (totalPages <= 1) return [1];
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(value);

  return (
    <div className="font-sf-pro">
      <Header
        header="Transaction History"
        detail="Explore a comprehensive log of your transactions for easy navigation and audit tracking."
      />
      <div className="flex flex-row items-center mb-4">
        <button
          className="text-black hover:text-black/40 flex items-center gap-4 text-base font-bold"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>
      <div className="flex items-start justify-between mb-9">
        <div className="space-y-3">
          <div className="flex gap-4">
            <p className="font-bold text-2xl text-black">
              {bulkTransfer.bulkName}
            </p>
            <span className="bg-primary/10 text-primary border-[0.5px] border-primary text-xs leading-5 font-medium px-4 py-1 rounded-md">
              {bulkTransfer.transactions.length} Accounts
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-sm font-normal text-black leading-5">
              {bulkTransfer.date.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <span className="h-1 w-1 bg-black rounded-full"></span>
            <p className="text-sm font-normal text-black">
              {bulkTransfer.date.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <span className="inline-flex items-center px-4 py-1 rounded-full bg-green-100 text-green-700 border-[0.5px] border-green-700 text-xs font-medium leading-5">
              <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
              Approved
            </span>
            <button className="flex items-center gap-2 text-primary border border-primary hover:bg-primary/10 px-4 py-2 rounded-3xl text-sm font-medium leading-5">
              <PiUsersThreeBold className="text-primary" size={16} />
              Manual Upload
            </button>
          </div>
        </div>

        {/* Actions Dropdown */}
        <div>
          <Select>
            <SelectTrigger className="bg-[#050C82] border-[#050C82] text-white rounded-lg px-4 py-5 w-52 h-full">
              <SelectValue
                placeholder="Actions"
                className="placeholder:text-white/80 text-white"
              />
            </SelectTrigger>
            <SelectContent className="bg-[#050C82] text-white border-[#050C82]">
              <SelectItem value="Add" className="text-white cursor-pointer">
                Add
              </SelectItem>
              <SelectItem value="Delete" className="text-white cursor-pointer">
                Delete
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
            <div className="flex-2 max-w-full relative">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto flex-grow">
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
                  Bank
                </th>
                <th className="px-6 py-3 text-center text-xs sm:text-sm font-medium text-black capitalize tracking-wider">
                  Initiator
                </th>
                <th className="px-6 py-3 text-center text-xs sm:text-sm font-medium text-black capitalize tracking-wider">
                  Status
                </th>
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
                        <div className="flex items-center justify-center bg-[#050C82] rounded-full w-10 h-10 p-2 text-sm font-bold text-white">
                          {getInitials(transaction.accountName)}
                        </div>
                        <div className="flex flex-col">
                          <p className="text-base font-medium">
                            {transaction.accountName}
                          </p>
                          <p className="text-sm font-normal">
                            {transaction.accountNumber}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {transaction.bank}
                    </td>
                    <td className="flex flex-col px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-base">
                        {transaction.Initiator.name}
                      </p>
                      <p className="font-normal text-sm">
                        {transaction.Initiator.email}
                      </p>
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
                        <span
                          className={`h-2 w-2 rounded-full mr-2 ${
                            transaction.status === "Approved"
                              ? "bg-green-800"
                              : transaction.status === "Pending"
                              ? "bg-yellow-800"
                              : "bg-red-800"
                          }`}
                        ></span>
                          {transaction.status}
                        </span>
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
        {/* Pagination */}
        {bulkTransfer.transactions.length > 0 && (
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
                    value="Show 5 rows"
                    className="text-white cursor-pointer"
                  >
                    Show 5 rows
                  </SelectItem>
                  <SelectItem
                    value="Show 10 rows"
                    className="text-white cursor-pointer"
                  >
                    Show 10 rows
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

export default BulkTransactionDetails;
