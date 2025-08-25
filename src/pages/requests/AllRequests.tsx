import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
import { Loader2, SearchIcon, X } from "lucide-react";
import CustomDateInput from "@/components/CustomDateInput";
import { PiUsersThreeBold } from "react-icons/pi";
import { BsExclamationCircle, BsThreeDots } from "react-icons/bs";
import formatCurrency from "@/lib/formatCurrency";
import formatDate from "@/lib/formatDate";
import { Checkbox } from "@/components/ui/checkbox";
import Pagination from "@/lib/Pagination";
import ConfirmationDialog from "@/components/requests/ConfirmationDialog";
import { motion } from "framer-motion";

// Set this to "initiator" or "approver"
const userRole: "initiator" | "approver" = "approver";

// Request type
type Request = {
  id: string;
  accountName: string;
  accountNumbers?: string[];
  accountNumber?: string;
  noOfAccounts?: number;
  amount: number;
  date: Date;
  requestType: string;
  status: "Approved" | "Pending" | "Rejected";
  accountId: string;
};

// Helper to generate random account numbers
const generateAccountNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

// Mock requests with accountId
const mockRequests: Request[] = [
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

const AllRequests = () => {
  // Navigation, filters, pagination states
  const navigate = useNavigate();
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(() => {
    const start = new Date();
    start.setDate(start.getDate() - 120);
    return start;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | Request["status"]>(
    "All"
  );
  const [filterRequestType, setFilterRequestType] = useState<
    "All" | "Bulk Transfer" | "Single Transfer"
  >("All");

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Add selection state and confirmation dialog state
  const [selectedRequestIds, setSelectedRequestIds] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"success" | "error">("success");
  const [actionType, setActionType] = useState<
    "approve" | "reject" | "cancel" | null
  >(null);
  const [reason, setReason] = useState("");

  // Filtering logic (same as before)
  const filteredRequests = useMemo(() => {
    return mockRequests.filter((request) => {
      const requestDate = new Date(request.date);
      if (requestDate < startDate || requestDate > endDate) return false;
      if (filterStatus !== "All" && request.status !== filterStatus)
        return false;
      if (
        filterRequestType !== "All" &&
        request.requestType !== filterRequestType
      )
        return false;

      if (searchTerm) {
        const lower = searchTerm.toLowerCase();
        const amt = formatCurrency(request.amount).toLowerCase();
        const dat = formatDate(request.date);
        const matchAccount =
          request.requestType === "Single Transfer"
            ? request.accountNumber?.toLowerCase().includes(lower)
            : request.accountNumbers?.some((num) =>
                num.toLowerCase().includes(lower)
              );
        return (
          request.accountName.toLowerCase().includes(lower) ||
          request.requestType.toLowerCase().includes(lower) ||
          amt.includes(lower) ||
          dat.includes(lower) ||
          !!matchAccount
        );
      }
      return true;
    });
  }, [startDate, endDate, filterStatus, filterRequestType, searchTerm]);

  // Paginated data
  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredRequests.slice(start, start + rowsPerPage);
  }, [filteredRequests, currentPage, rowsPerPage]);

  // Update total pages & reset page if necessary
  useEffect(() => {
    const total = Math.ceil(filteredRequests.length / rowsPerPage) || 1;
    setTotalPages(total);
    if (currentPage > total) setCurrentPage(1);
  }, [filteredRequests, rowsPerPage]);

  // Pagination helpers (generatePageNumbers, handlers)
  const generatePageNumbers = () => {
    if (totalPages <= 1) return [1];
    const pages: (number | string)[] = [];
    const max = 5;
    let start = Math.max(1, currentPage - Math.floor(max / 2));
    let end = Math.min(totalPages, start + max - 1);
    if (end - start < max - 1) start = Math.max(1, end - max + 1);
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleRowsPerPageChange = (val: string) => {
    const num = parseInt(val.replace(/\D/g, ""), 10);
    if (!isNaN(num)) {
      setRowsPerPage(num);
      setCurrentPage(1);
    }
  };

  // Selection logic
  const toggleSelectRequest = (id: string) => {
    setSelectedRequestIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    paginatedRequests.length > 0 &&
    paginatedRequests.every((r) => selectedRequestIds.includes(r.id));
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRequestIds((prev) =>
        prev.filter((id) => !paginatedRequests.find((r) => r.id === id))
      );
    } else {
      setSelectedRequestIds((prev) => [
        ...prev,
        ...paginatedRequests
          .map((r) => r.id)
          .filter((id) => !prev.includes(id)),
      ]);
    }
  };

  // Action handlers
  const initiateAction = (type: "approve" | "reject" | "cancel") => {
    setActionType(type);
    setDialogType(type === "approve" ? "success" : "error");
    setDialogOpen(true);
  };

  const confirmAction = () => {
    selectedRequestIds.forEach((id) => {
      const req = mockRequests.find((r) => r.id === id);
      if (!req) return;
      if (actionType === "approve") req.status = "Approved";
      else if (actionType === "reject") req.status = "Rejected";
      else if (actionType === "cancel")
        mockRequests.splice(mockRequests.indexOf(req), 1);
    });
    setSelectedRequestIds([]);
    setReason("");
    setDialogOpen(false);
  };

  return (
    <div className="font-sf-pro">
      {/* Header */}
      <Header
        header="All Requests"
        detail="Monitor and manage all your submitted actions—such as approvals, mandates, and service requests."
      />
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
          <div className="w-full flex flex-col lg:flex-row flex-wrap items-stretch gap-y-4 lg:gap-10 xl:gap-40 mt-4">
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
                onValueChange={(value) =>
                  setFilterRequestType(
                    value as "All" | "Bulk Transfer" | "Single Transfer"
                  )
                }
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
                    value="Bulk Transfer"
                    className="text-white cursor-pointer"
                  >
                    Bulk Transfer
                  </SelectItem>
                  <SelectItem
                    value="Single Transfer"
                    className="text-white cursor-pointer"
                  >
                    Single Transfer
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Status Dropdown */}
              <Select
                onValueChange={(value) =>
                  setFilterStatus(value as Request["status"] | "All")
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

        {/* Request Table */}
        <div className="overflow-x-auto rounded-t-2xl">
          <motion.table
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, overflow: "hidden" }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
            className="min-w-full divide-y divide-gray-200"
          >
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-black">
                  <Checkbox
                    className="bg-white border border-[#AAAAA]"
                    checked={isAllSelected}
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
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
                  <td colSpan={7} className="px-6 py-8">
                    <div className="flex justify-center">
                      <Loader2 className="animate-spin h-6 w-6 text-primary" />
                    </div>
                  </td>
                </tr>
              ) : paginatedRequests.length > 0 ? (
                paginatedRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="py-3 text-black">
                      <Checkbox
                        className="bg-white border border-[#AAAAA]"
                        checked={selectedRequestIds.includes(request.id)}
                        onCheckedChange={() => toggleSelectRequest(request.id)}
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-left">
                      <div className="flex items-center gap-4">
                        {request.requestType === "Bulk Transfer" ? (
                          <div className="flex items-center justify-center bg-[#050C82] rounded-full w-10 h-10 p-2">
                            <PiUsersThreeBold
                              className="text-white"
                              size={18}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center bg-[#050C82] rounded-full w-10 h-10 p-2 text-sm font-bold text-white">
                            {getInitials(request.accountName)}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <p className="text-base font-medium">
                            {request.accountName}
                          </p>
                          {request.requestType === "Bulk Transfer" ? (
                            <p className="text-sm font-normal">
                              {request.noOfAccounts} Accounts
                            </p>
                          ) : (
                            <p className="text-sm font-normal">
                              {request.accountNumber}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base">
                      {formatCurrency(request.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {formatDate(request.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center mr-5">
                        <span
                          className={`inline-flex items-center px-4 py-0.5 rounded-full text-xs font-medium border-[0.5px] border-black text-black`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full mr-2 bg-gray-300`}
                          ></span>
                          {request.requestType}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center mr-5">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            request.status === "Approved"
                              ? "bg-green-100 text-green-800 border-green-800"
                              : request.status === "Pending"
                              ? "bg-amber-100 text-amber-800 border-amber-800"
                              : "bg-red-100 text-red-800 border-red-800"
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full mr-2 ${
                              request.status === "Approved"
                                ? "bg-green-800"
                                : request.status === "Pending"
                                ? "bg-amber-800"
                                : "bg-red-800"
                            }`}
                          ></span>
                          {request.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-center">
                      <span
                        onClick={() => {
                          if (request.requestType === "Bulk Transfer") {
                            navigate(`/bulk-request-details/${request.id}`);
                          } else {
                            navigate(`/single-request-details/${request.id}`);
                          }
                        }}
                        className="flex justify-center items-center text-black rounded-full w-5 h-5 p-0.5 text-xs font-normal border-[0.5px] border-black hover:bg-primary hover:text-white cursor-pointer"
                      >
                        <BsThreeDots />
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </motion.table>
        </div>

        {/* Pagination */}
        {filteredRequests.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            generatePageNumbers={generatePageNumbers}
          />
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 mt-12">
          {userRole === "approver" ? (
            <>
              <button
                disabled={!selectedRequestIds.length}
                onClick={() => initiateAction("approve")}
                className="w-full sm:w-auto rounded-lg text-white bg-green-700 hover:bg-green-800 px-10 py-3 text-center disabled:opacity-50"
              >
                {`Accept Request(s)`}
              </button>
              <button
                disabled={!selectedRequestIds.length}
                onClick={() => initiateAction("reject")}
                className="w-full sm:w-auto rounded-lg text-white bg-red-700 hover:bg-red-800 px-10 py-3 text-center disabled:opacity-50"
              >
                {`Reject Request(s)`}
              </button>
            </>
          ) : (
            <button
              disabled={!selectedRequestIds.length}
              onClick={() => initiateAction("cancel")}
              className="w-full sm:w-auto rounded-lg bg-red-600 text-white px-10 py-3 hover:bg-red-700 disabled:opacity-50"
            >
              Cancel Request
            </button>
          )}
        </div>

        {/* Confirmation Dialog */}
        <ConfirmationDialog
          open={dialogOpen}
          onConfirm={confirmAction}
          onCancel={() => setDialogOpen(false)}
          title={`${
            actionType === "cancel"
              ? "Cancel Request"
              : actionType === "approve"
              ? "Approve Request"
              : "Reject Request"
          }`}
          message={
            actionType === "cancel"
              ? "Are you sure you want to cancel this request? You would have to reinitiate this transaction again"
              : `Do you confirm that you want to ${actionType} this transaction request?`
          }
          reason={actionType === "cancel" ? undefined : reason}
          setReason={actionType === "cancel" ? undefined : setReason}
          reasonFor={actionType === "cancel" ? undefined : " rejection"}
          type={dialogType}
          icon={
            dialogType === "success" ? (
              <div className="text-green-800 text-2xl font-bold">✓</div>
            ) : actionType === "cancel" ? (
              <div className="text-red-600 font-bold">
                <BsExclamationCircle className="h-6 w-6" />
              </div>
            ) : (
              <div className="text-red-600 font-bold">
                <X className="h-6 w-6" />
              </div>
            )
          }
        />
      </div>
    </div>
  );
};

export default AllRequests;
