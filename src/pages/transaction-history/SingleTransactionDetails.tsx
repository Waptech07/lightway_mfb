import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowLeftRight } from "lucide-react";
import Header from "@/components/Header";

// Transaction type
type Transaction = {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  amount: number;
  date: Date;
  reference: string;
  requestType: string;
  status: "Approved" | "Pending" | "Rejected";
  description: string;
  sourceName: string;
  sourceBankName: string;
  sourceAccountNumber: string;
  sourceAccountName: string;
  Initiator: {
    name: string;
    email: string;
  };
};

// Mock transactions
const mockTransactions: Transaction[] = [
  {
    id: "6",
    accountName: "Enoobong George",
    accountNumber: "0123456789",
    bankName: "Lightway MFB",
    amount: 12500,
    date: new Date(2025, 5, 24),
    reference: "TRX-2025-001",
    requestType: "Single Transfer",
    status: "Approved",
    description: "Payment for services rendered",
    sourceName: "Company Wallet",
    sourceBankName: "Lightway MFB",
    sourceAccountNumber: "0001122334",
    sourceAccountName: "Lightway Ltd",
    Initiator: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
  },
  {
    id: "9",
    accountName: "Office Rent",
    accountNumber: "6677889900",
    bankName: "Lightway MFB",
    amount: 85000,
    date: new Date(2025, 5, 29),
    reference: "TRX-2025-002",
    requestType: "Single Transfer",
    status: "Approved",
    description: "Monthly office rent payment",
    sourceName: "Operations Account",
    sourceBankName: "Lightway MFB",
    sourceAccountNumber: "0002233445",
    sourceAccountName: "Lightway Ltd",
    Initiator: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
  },
  {
    id: "6",
    accountName: "Client Refund",
    accountNumber: "7788990011",
    bankName: "Lightway MFB",
    amount: 45000,
    date: new Date(2025, 5, 30),
    reference: "TRX-2025-003",
    requestType: "Single Transfer",
    status: "Pending",
    description: "Refund for canceled order",
    sourceName: "Customer Support Wallet",
    sourceBankName: "Lightway MFB",
    sourceAccountNumber: "0003344556",
    sourceAccountName: "Lightway Ltd",
    Initiator: {
      name: "Amaka Uche",
      email: "amaka.uche@example.com",
    },
  },
  {
    id: "4",
    accountName: "John Doe",
    accountNumber: "1234567890",
    bankName: "Lightway MFB",
    amount: 50000,
    date: new Date(2025, 5, 21),
    reference: "BULK-2025-001-01",
    requestType: "Bulk Transfer",
    status: "Approved",
    description: "Salary payment for June",
    sourceName: "Payroll Wallet",
    sourceBankName: "Lightway MFB",
    sourceAccountNumber: "0004455667",
    sourceAccountName: "Lightway Ltd",
    Initiator: {
      name: "Chinedu Obi",
      email: "chinedu.obi@example.com",
    },
  },
];

const SingleTransactionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const transaction = mockTransactions.find((txn) => txn.id === id);

  if (!transaction) {
    return (
      <div className="p-6 text-center">
        <p>Transaction not found</p>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="font-sf-pro">
      <div className="flex flex-row items-center mb-4">
        <button
          className="text-black hover:text-black/40 flex items-center gap-4 text-base font-bold"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>
      <Header header={`Transaction Details`} detail="" />
      <div className="flex flex-col">
        <div className="mb-10 border rounded-2xl py-2 px-4 flex items-start justify-between">
          <div className="flex gap-4 items-center">
            <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center p-2">
              <ArrowLeftRight className="text-red" />
            </div>
            <div className="flex flex-col gap-1 items-start">
              <span className="font-medium text-base">
                {transaction.sourceName}
              </span>
              <span className="font-normal text-sm">
                {transaction.sourceBankName}
              </span>
            </div>
          </div>
          <div>
            <span className="font-bold text-sm">
              {formatCurrency(transaction.amount)}
            </span>
          </div>
        </div>
        <div className="bg-[#FAFAFA] rounded-2xl mb-6">
          <div className="flex justify-between border-b p-4">
            <span className="text-black text-sm font-normal">
              Transaction Status
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                transaction.status === "Approved"
                  ? "bg-green-100 text-green-800 border-green-800"
                  : transaction.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800 border-yellow-800"
                  : "bg-red-100 text-red-800 border-red-800"
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
          <div className="flex justify-between border-b p-4">
            <span className="text-black text-sm font-normal">
              Transaction Type
            </span>
            <span className="font-medium">{transaction.requestType}</span>
          </div>
          <div className="flex justify-between border-b p-4">
            <span className="text-black text-sm font-normal">
              Source Account
            </span>
            <span className="font-medium">
              {transaction.sourceAccountNumber}
            </span>
          </div>
          <div className="flex justify-between border-b p-4">
            <span className="text-black text-sm font-normal">
              Source Account Name
            </span>
            <span className="font-medium">{transaction.sourceAccountName}</span>
          </div>
          <div className="flex justify-between border-b p-4">
            <span className="text-black text-sm font-normal">
              Beneficiary Account
            </span>
            <span className="font-medium">{transaction.accountNumber}</span>
          </div>
          <div className="flex justify-between border-b p-4">
            <span className="text-black text-sm font-normal">
              Beneficiary Name
            </span>
            <span className="font-medium">{transaction.accountName}</span>
          </div>
          <div className="flex justify-between border-b p-4">
            <span className="text-black text-sm font-normal">Bank Name</span>
            <span className="font-medium">{transaction.bankName}</span>
          </div>
          <div className="flex justify-between border-b p-4">
            <span className="text-black text-sm font-normal">
              Transaction ID
            </span>
            <span className="font-medium">{transaction.reference}</span>
          </div>
          <div className="flex justify-between p-4">
            <span className="text-black text-sm font-normal">
              Transaction Date
            </span>
            <span className="font-medium">{formatDate(transaction.date)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col border rounded-2xl py-2 px-4">
        <div className="flex justify-between border-b px-4 py-2">
          <span className="text-black text-sm font-normal">Initiated By</span>
          <span className="font-medium">{transaction.Initiator.name}</span>
        </div>
        <div className="flex justify-between px-4 py-2">
          <span className="text-black text-sm font-normal">
            Initiator Email
          </span>
          <span className="font-medium">{transaction.Initiator.email}</span>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button className="rounded-lg text-white bg-primary px-10 py-3 text-center">
          Download Receipt
        </button>
      </div>
    </div>
  );
};

export default SingleTransactionDetails;
