import cardBg from "@/assets/card-bg.png";
import {
  FaBusinessTime,
  FaLock,
  FaLockOpen,
  FaRegCopy,
  FaTimeline,
} from "react-icons/fa6";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface Account {
  id: string;
  accountNumber: string;
  availableBalance: number;
  accountName: string;
  bankName: string;
}

// Mock accounts data - in a real app this would come from props or API
const mockAccounts: Account[] = [
  {
    id: "1",
    accountNumber: "3115679989",
    availableBalance: 50999.0,
    accountName: "John Doe",
    bankName: "Main Bank",
  },
  {
    id: "2",
    accountNumber: "4112893456",
    availableBalance: 120450.0,
    accountName: "John Doe",
    bankName: "Savings Account",
  },
  {
    id: "3",
    accountNumber: "5678123490",
    availableBalance: 23780.5,
    accountName: "John Doe",
    bankName: "Investment Account",
  },
];

const SecurityTab = () => {
  const [copied, setCopied] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactionLimit, setTransactionLimit] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPin, setNewPin] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Initialize accounts and selected account
  useEffect(() => {
    // In a real app, this would come from an API or props
    setAccounts(mockAccounts);
    if (mockAccounts.length > 0) {
      setSelectedAccount(mockAccounts[0]);
    }
  }, []);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  const handleCopy = async (text: string) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
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

  // Prevent rendering if no accounts or no selected account
  if (accounts.length === 0 || !selectedAccount) {
    return <div>Loading accounts...</div>;
  }

  return (
    <div>
      <div className="font-sf-pro">
        <div className="w-full flex flex-col md:flex-row py-6 gap-10 border-b">
          <div className="md:w-1/4 text-left">
            <p className="text-lg font-bold">Transaction Limit</p>
            <p className="text-sm text-gray-400 font-normal">
              Update your transaction limit anytime to your preferences.
            </p>
          </div>
          <div className="md:w-3/4 text-left">
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
                    onClick={() => handleCopy(selectedAccount.accountNumber)}
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
            <div className="mt-6 flex flex-col md:flex-row justify-between space-x-10 w-full">
              <div className="flex flex-col w-full md:w-1/2">
                <label className="text-sm font-medium mb-2">
                  New Transaction Limit
                </label>
                <div className="flex items-center bg-white rounded-r-lg rounded-l-md overflow-hidden w-full max-w-md">
                  <div className="bg-gray-200 px-3 py-2.5">
                    <FaBusinessTime className="w-5 h-5 text-gray-600" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter new Transaction Limit"
                    className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent px-3 py-2"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <label className="text-sm font-medium mb-2">
                  Transaction Pin
                </label>
                <div className="flex items-center bg-white rounded-r-lg rounded-l-md overflow-hidden w-full max-w-md">
                  <div className="bg-gray-200 px-3 py-2.5">
                    <FaLock className="w-5 h-5 text-gray-600" />
                  </div>
                  <input
                    type="password"
                    placeholder="Enter your Current Pin"
                    className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent px-3 py-2"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center">
              <input
                type="checkbox"
                className="mt-1 mr-2 h-5 w-5 text-primary rounded-md focus:ring-primary"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                id="terms"
              />
              <label htmlFor="terms" className="text-base text-gray-700">
                I agree to the Terms and Conditions
              </label>
            </div>
            <button className="bg-[#050C82] hover:bg-[#0B0B75] text-white font-medium px-6 py-2 mt-6 rounded-md w-fit cursor-pointer">
              Update Limit
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row py-6 gap-10 border-b">
          <div className="md:w-1/4 text-left">
            <p className="text-lg font-bold">Change Password</p>
            <p className="text-sm text-gray-400 font-normal">
              Update your login password regularly to keep your account secure.
            </p>
          </div>
          <div className="md:w-3/4 text-left">
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 w-full">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">Old Password</label>
                <div className="flex items-center bg-white rounded-r-lg rounded-l-md overflow-hidden w-full max-w-md">
                  <div className="bg-gray-200 px-3 py-2.5">
                    <FaLockOpen className="w-5 h-5 text-gray-600" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter new Current Password"
                    className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent px-3 py-2"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">New Password</label>
                <div className="flex items-center bg-white rounded-r-lg rounded-l-md overflow-hidden w-full max-w-md">
                  <div className="bg-gray-200 px-3 py-2.5">
                    <FaLock className="w-5 h-5 text-gray-600" />
                  </div>
                  <input
                    type="password"
                    placeholder="Enter your New Password"
                    className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent px-3 py-2"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="flex items-center bg-white rounded-r-lg rounded-l-md overflow-hidden w-full max-w-md">
                  <div className="bg-gray-200 px-3 py-2.5">
                    <FaLock className="w-5 h-5 text-gray-600" />
                  </div>
                  <input
                    type="password"
                    placeholder="Confirm your New Password"
                    className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent px-3 py-2"
                  />
                </div>
              </div>
            </div>

            <button className="bg-[#050C82] hover:bg-[#0B0B75] text-white font-medium px-6 py-2 mt-8 rounded-md w-fit cursor-pointer">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
