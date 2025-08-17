import cardBg from "@/assets/card-bg.png";
import { FaBusinessTime, FaLock, FaLockOpen, FaRegCopy } from "react-icons/fa6";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import ConfirmationDialog from "./ConfirmationDialog";

interface Account {
  id: string;
  accountNumber: string;
  AccountCard: number;
  accountName: string;
  bankName: string;
  transactionLimit: number;
}

// Mock accounts data
const mockAccounts: Account[] = [
  {
    id: "1",
    accountNumber: "3115679989",
    AccountCard: 50999.0,
    accountName: "John Doe",
    bankName: "Main Bank",
    transactionLimit: 500000,
  },
  {
    id: "2",
    accountNumber: "4112893456",
    AccountCard: 120450.0,
    accountName: "John Doe",
    bankName: "Savings Account",
    transactionLimit: 1000000,
  },
  {
    id: "3",
    accountNumber: "5678123490",
    AccountCard: 23780.5,
    accountName: "John Doe",
    bankName: "Investment Account",
    transactionLimit: 200000,
  },
];

const SecurityTab = () => {
  // Account state
  const [copied, setCopied] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showLimitConfirm, setShowLimitConfirm] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // Transaction limit state
  const [transactionLimit, setTransactionLimit] = useState("");
  const [transactionPin, setTransactionPin] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  // Initialize accounts and selected account
  useEffect(() => {
    try {
      setAccounts(mockAccounts);
      if (mockAccounts.length > 0) {
        setSelectedAccount(mockAccounts[0]);
        setTransactionLimit(mockAccounts[0].transactionLimit.toString());
      }
    } catch (error) {
      toast.error("Failed to load accounts");
      console.error("Account initialization error:", error);
    }
  }, []);

  // Update transaction limit when account changes
  useEffect(() => {
    if (selectedAccount) {
      try {
        setTransactionLimit(selectedAccount.transactionLimit.toString());
      } catch (error) {
        toast.error("Failed to update transaction limit");
        console.error("Transaction limit update error:", error);
      }
    }
  }, [selectedAccount]);

  const formatCurrency = useCallback((value: number) => {
    return formatCurrency(value);
  }, []);

  const handleCopy = async (text: string) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Account number copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy account number");
      console.error("Failed to copy: ", err);
    }
  };

  const toggleBalanceVisibility = () => setShowBalance((prev) => !prev);

  const handleAccountChange = (accountId: string) => {
    try {
      const account = accounts.find((acc) => acc.id === accountId);
      if (account) setSelectedAccount(account);
    } catch (error) {
      toast.error("Failed to change account");
      console.error("Account change error:", error);
    }
  };

  const handleUpdateLimit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!selectedAccount) {
        toast.error("No account selected");
        return;
      }

      if (!transactionLimit || !transactionPin) {
        toast.error("Please fill all required fields");
        return;
      }

      if (!agreeTerms) {
        toast.error("You must agree to the terms and conditions");
        return;
      }

      const newLimit = parseFloat(transactionLimit.replace(/,/g, ""));

      if (isNaN(newLimit) || newLimit <= 0) {
        toast.error("Please enter a valid transaction limit");
        return;
      }

      setShowLimitConfirm(true);
    } catch (error) {
      toast.error("Failed to process transaction limit update");
      console.error("Transaction limit error:", error);
    }
  };

  const confirmUpdateLimit = () => {
    try {
      if (!selectedAccount) {
        toast.error("No account selected");
        setShowLimitConfirm(false);
        return;
      }

      const newLimit = parseFloat(transactionLimit.replace(/,/g, ""));
      const updatedAccounts = accounts.map((acc) =>
        acc.id === selectedAccount.id
          ? { ...acc, transactionLimit: newLimit }
          : acc
      );

      setAccounts(updatedAccounts);
      setSelectedAccount(
        (prev) => prev && { ...prev, transactionLimit: newLimit }
      );

      toast.success("Transaction limit updated successfully");

      setTransactionPin("");
      setAgreeTerms(false);
      setShowLimitConfirm(false);
    } catch (error) {
      toast.error("Failed to confirm transaction limit update");
      console.error("Confirm transaction limit error:", error);
      setShowLimitConfirm(false);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!oldPassword || !newPassword || !confirmPassword) {
        toast.error("Please fill all password fields");
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      if (newPassword.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }

      setShowPasswordConfirm(true);
    } catch (error) {
      toast.error("Failed to process password change");
      console.error("Password change error:", error);
    }
  };

  const confirmChangePassword = () => {
    try {
      // In a real app, this would be an API call to change the password
      toast.success("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordConfirm(false);
    } catch (error) {
      toast.error("Failed to confirm password change");
      console.error("Confirm password error:", error);
      setShowPasswordConfirm(false);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const formatTransactionLimit = (value: string) => {
    try {
      // Remove non-numeric characters
      const numValue = value.replace(/[^0-9.]/g, "");

      // Format with commas
      if (numValue) {
        return parseInt(numValue, 10).toLocaleString("en-US");
      }
      return numValue;
    } catch (error) {
      console.error("Formatting error:", error);
      return value;
    }
  };

  // Prevent rendering if no accounts or no selected account
  if (accounts.length === 0 || !selectedAccount) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading accounts...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="font-sf-pro">
        {/* Transaction Limit Section */}
        <form onSubmit={handleUpdateLimit}>
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
                      <p className="bg-[#FAFAFA] text-black px-2 py-1 rounded-sm text-sm sm:text-base truncate max-w-[180px]">
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
                          ? formatCurrency(selectedAccount.AccountCard)
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
              <div className="mt-6 flex flex-col md:flex-row justify-between space-x-10 md:space-y-0 space-y-2 w-full">
                <div className="flex flex-col w-full md:w-1/2">
                  <label className="text-sm font-medium mb-2">
                    New Transaction Limit
                  </label>
                  <div className="flex items-center bg-[#FAFAFA] rounded-r-lg rounded-l-md overflow-hidden w-full max-w-md">
                    <div className="bg-gray-200 px-3 py-2.5">
                      <FaBusinessTime className="w-5 h-5 text-gray-600" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter new Transaction Limit"
                      className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent px-3 py-2"
                      value={transactionLimit}
                      onChange={(e) =>
                        setTransactionLimit(
                          formatTransactionLimit(e.target.value)
                        )
                      }
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Current limit:{" "}
                    {formatCurrency(selectedAccount.transactionLimit)}
                  </p>
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                  <label className="text-sm font-medium mb-2">
                    Transaction Pin
                  </label>
                  <div className="flex items-center bg-[#FAFAFA] rounded-r-lg rounded-l-md overflow-hidden w-full max-w-md">
                    <div className="bg-gray-200 px-3 py-2.5">
                      <FaLock className="w-5 h-5 text-gray-600" />
                    </div>
                    <input
                      type="password"
                      placeholder="Enter your Current Pin"
                      className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent px-3 py-2"
                      value={transactionPin}
                      onChange={(e) => setTransactionPin(e.target.value)}
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
              <button
                type="submit"
                className="bg-[#050C82] hover:bg-[#0B0B75] text-white font-medium px-6 py-2 mt-6 rounded-md w-fit cursor-pointer"
              >
                Update Limit
              </button>
            </div>
          </div>
        </form>

        {/* Change Password Section */}
        <form onSubmit={handleChangePassword}>
          <div className="w-full flex flex-col md:flex-row py-6 gap-10 border-b">
            <div className="md:w-1/4 text-left">
              <p className="text-lg font-bold">Change Password</p>
              <p className="text-sm text-gray-400 font-normal">
                Update your login password regularly to keep your account
                secure.
              </p>
            </div>
            <div className="md:w-3/4 text-left">
              <div className="grid grid-cols-1 tabmd:grid-cols-2 flex-wrap gap-x-10 gap-y-6 w-full">
                {/* Old Password */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2">
                    Old Password
                  </label>
                  <div className="flex items-center bg-[#FAFAFA] rounded-r-lg rounded-l-md overflow-hidden w-full max-w-md">
                    <div className="bg-gray-200 px-3 py-2.5">
                      <FaLockOpen className="w-5 h-5 text-gray-600" />
                    </div>
                    <input
                      type={showPasswords.old ? "text" : "password"}
                      placeholder="Enter your Current Password"
                      className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent px-3 py-2"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="px-3 text-gray-500 hover:text-gray-700"
                      onClick={() => togglePasswordVisibility("old")}
                    >
                      {showPasswords.old ? (
                        <PiEyeSlash className="w-5 h-5" />
                      ) : (
                        <PiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2">
                    New Password
                  </label>
                  <div className="flex items-center bg-[#FAFAFA] rounded-r-lg rounded-l-md overflow-hidden w-full max-w-md">
                    <div className="bg-gray-200 px-3 py-2.5">
                      <FaLock className="w-5 h-5 text-gray-600" />
                    </div>
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      placeholder="Enter your New Password"
                      className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent px-3 py-2"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="px-3 text-gray-500 hover:text-gray-700"
                      onClick={() => togglePasswordVisibility("new")}
                    >
                      {showPasswords.new ? (
                        <PiEyeSlash className="w-5 h-5" />
                      ) : (
                        <PiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <div className="flex items-center bg-[#FAFAFA] rounded-r-lg rounded-l-md overflow-hidden w-full max-w-md">
                    <div className="bg-gray-200 px-3 py-2.5">
                      <FaLock className="w-5 h-5 text-gray-600" />
                    </div>
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      placeholder="Confirm your New Password"
                      className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent px-3 py-2"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="px-3 text-gray-500 hover:text-gray-700"
                      onClick={() => togglePasswordVisibility("confirm")}
                    >
                      {showPasswords.confirm ? (
                        <PiEyeSlash className="w-5 h-5" />
                      ) : (
                        <PiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#050C82] hover:bg-[#0B0B75] text-white font-medium px-6 py-2 mt-8 rounded-md w-fit cursor-pointer"
              >
                Save changes
              </button>
            </div>
          </div>
        </form>
      </div>

      <ConfirmationDialog
        open={showLimitConfirm}
        onCancel={() => setShowLimitConfirm(false)}
        onConfirm={confirmUpdateLimit}
        title="Update Limit"
        message="Do you confirm that the new transaction limit you have entered is accurate?"
        icon={<div className="text-2xl font-bold">₦</div>}
      />

      <ConfirmationDialog
        open={showPasswordConfirm}
        onCancel={() => setShowPasswordConfirm(false)}
        onConfirm={confirmChangePassword}
        title="Save Changes"
        message="Do you confirm this change that you are performing on this feature?"
        icon={<div className="text-green-600 text-2xl font-bold">✓</div>}
      />
    </div>
  );
};

export default SecurityTab;
