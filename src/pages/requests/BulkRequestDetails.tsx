import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Search as SearchIcon, X } from "lucide-react";
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
import formatCurrency from "@/lib/formatCurrency";
import Pagination from "@/lib/Pagination";
import { Checkbox } from "@/components/ui/checkbox";
import ConfirmationDialog from "@/components/requests/ConfirmationDialog";
import { BsExclamationCircle } from "react-icons/bs";

// Set this to "initiator" or "approver"
const userRole: "initiator" | "approver" = "approver";

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
type Initiator = { name: string; email: string };

type Request = {
  id: string;
  accountName: string;
  accountNumber: string;
  amount: number;
  bank: string;
  status: "Approved" | "Pending" | "Rejected";
  Initiator: Initiator;
};

type BulkRequest = {
  id: string;
  bulkName: string;
  reference: string;
  date: Date;
  totalAmount: number;
  status: "Approved" | "Pending" | "Rejected";
  requests: Request[];
};

// Mock Data
const mockBulkRequests: BulkRequest[] = [
  {
    id: "1",
    bulkName: "Company Utility Bill",
    reference: "Salary Payment June",
    date: new Date(2025, 5, 21, 10, 30),
    totalAmount: 125000,
    status: "Approved",
    requests: [
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
    requests: [
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

const BulkRequestDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const bulkRequest = mockBulkRequests.find((request) => request.id === id);

  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(() => {
    const start = new Date();
    start.setDate(start.getDate() - 120);
    return start;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState<"All" | Request["status"]>(
    "All"
  );
  const [selectedRequestIds, setSelectedRequestIds] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"success" | "error">("success");
  const [actionType, setActionType] = useState<
    "approve" | "reject" | "cancel" | null
  >(null);
  const [reason, setReason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (bulkRequest) {
      const total = Math.ceil(filteredRequests.length / rowsPerPage);
      setTotalPages(total || 1);
      if (currentPage > total) setCurrentPage(1);
    }
  }, [bulkRequest, rowsPerPage, currentPage, searchTerm]);

  if (!bulkRequest) {
    return (
      <div className="p-6 text-center">
        <p>Bulk request not found</p>
      </div>
    );
  }

  const filteredRequests = useMemo(() => {
    return bulkRequest.requests.filter((t) => {
      if (filterStatus !== "All" && t.status !== filterStatus) return false;

      const lowerSearch = searchTerm.toLowerCase();
      if (
        !(
          t.accountName.toLowerCase().includes(lowerSearch) ||
          t.accountNumber.includes(lowerSearch) ||
          t.Initiator.name.toLowerCase().includes(lowerSearch) ||
          t.Initiator.email.toLowerCase().includes(lowerSearch)
        )
      )
        return false;

      // Date filtering: using bulkRequest date
      const reqTime = bulkRequest.date;
      if (reqTime < startDate || reqTime > endDate)
        return false;
      return true;
    });
  }, [
    searchTerm,
    filterStatus,
    startDate,
    endDate,
    bulkRequest.requests,
    bulkRequest.date,
  ]);

  const paginatedRequests = useMemo(() => {
    const startIdx = (currentPage - 1) * rowsPerPage;
    return filteredRequests.slice(startIdx, startIdx + rowsPerPage);
  }, [filteredRequests, currentPage, rowsPerPage]);


  // Selection logic
  const isAllSelected =
    paginatedRequests.length > 0 &&
    paginatedRequests.every((r) => selectedRequestIds.includes(r.id));
  const toggleSelectAll = () => {
    const pageIds = paginatedRequests.map((r) => r.id);
    setSelectedRequestIds((prev) =>
      isAllSelected
        ? prev.filter((id) => !pageIds.includes(id))
        : [...prev, ...pageIds.filter((id) => !prev.includes(id))]
    );
  };
  const toggleSelectRequest = (id: string) =>
    setSelectedRequestIds((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );

  // Actions
  const initiateAction = (type: "approve" | "reject" | "cancel") => {
    setActionType(type);
    setDialogOpen(true);
    setDialogType(type === "approve" ? "success" : "error");
  };
  const confirmAction = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log(`Action "${actionType}" confirmed for:`, selectedRequestIds);
      setSelectedRequestIds([]);
      setDialogOpen(false);
      setIsLoading(false);
      setReason("");
    }, 1000);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
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

  return (
    <div className="font-sf-pro">
      <Header
        header="All Requests"
        detail="Monitor and manage all your submitted actions—such as approvals, mandates, and service requests."
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
              {bulkRequest.bulkName}
            </p>
            <span className="bg-primary/10 text-primary border-[0.5px] border-primary text-xs leading-5 font-medium px-4 py-1 rounded-md">
              {bulkRequest.requests.length} Accounts
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-sm font-normal text-black leading-5">
              {bulkRequest.date.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <span className="h-1 w-1 bg-black rounded-full"></span>
            <p className="text-sm font-normal text-black">
              {bulkRequest.date.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <div className="flex items-center justify-center">
              <span
                className={`inline-flex items-center px-4 py-1 rounded-full text-xs font-medium border ${
                  bulkRequest.status === "Approved"
                    ? "bg-green-100 text-green-800 border-green-800"
                    : bulkRequest.status === "Pending"
                    ? "bg-amber-100 text-amber-800 border-amber-800"
                    : "bg-red-100 text-red-800 border-red-800"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full mr-2 ${
                    bulkRequest.status === "Approved"
                      ? "bg-green-800"
                      : bulkRequest.status === "Pending"
                      ? "bg-amber-800"
                      : "bg-red-800"
                  }`}
                ></span>
                {bulkRequest.status}
              </span>
            </div>
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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
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
                  <td colSpan={6} className="px-6 py-8">
                    <div className="flex justify-center">
                      <Loader2 className="animate-spin h-6 w-6 text-primary" />
                    </div>
                  </td>
                </tr>
              ) : paginatedRequests.length > 0 ? (
                paginatedRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="py-3 px-6 text-black">
                      <Checkbox
                        className="bg-white border border-[#AAAAA]"
                        checked={selectedRequestIds.includes(request.id)}
                        onCheckedChange={() => toggleSelectRequest(request.id)}
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-left">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center bg-[#050C82] rounded-full w-10 h-10 p-2 text-sm font-bold text-white">
                          {getInitials(request.accountName)}
                        </div>
                        <div className="flex flex-col">
                          <p className="text-base font-medium">
                            {request.accountName}
                          </p>
                          <p className="text-sm font-normal">
                            {request.accountNumber}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base">
                      {formatCurrency(request.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {request.bank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <p className="font-medium text-base text-center">
                          {request.Initiator.name}
                        </p>
                        <p className="font-normal text-sm text-center">
                          {request.Initiator.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center mr-5">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            request.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : request.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full mr-2 ${
                              request.status === "Approved"
                                ? "bg-green-800"
                                : request.status === "Pending"
                                ? "bg-yellow-800"
                                : "bg-red-800"
                            }`}
                          ></span>
                          {request.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

export default BulkRequestDetails;
