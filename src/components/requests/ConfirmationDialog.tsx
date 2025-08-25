import { type ReactNode } from "react";
import { MessageSquareTextIcon } from "lucide-react";

type ConfirmationType = "success" | "error";

interface ConfirmationDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  reason?: string;
  setReason?: (value: string) => void;
  reasonFor?: string;
  icon: ReactNode;
  type?: ConfirmationType;
}

const ConfirmationDialog = ({
  open,
  onConfirm,
  onCancel,
  title,
  message,
  reason,
  setReason,
  reasonFor,
  icon,
  type = "success",
}: ConfirmationDialogProps) => {
  if (!open) return null;

  const styleVariants = {
    success: {
      iconBg: "bg-[#D0FBED]",
      iconBorder: "border-[#D4F7E1]",
      iconColor: "text-green-800",
      confirmBtn: "bg-[#065F46] hover:opacity-90 text-white",
      cancelBtn: "border border-gray-400 text-[#065F46] hover:bg-gray-200",
    },
    error: {
      iconBg: "bg-[#FBE6E6]",
      iconBorder: "border-[#F7D4D4]",
      iconColor: "text-red-800",
      confirmBtn: "bg-[#B91C1C] hover:opacity-90 text-white",
      cancelBtn: "border border-gray-400 text-[#B91C1C] hover:bg-gray-100",
    },
  };

  const styles = styleVariants[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/30 p-4 text-left">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md sm:max-w-lg">
        <div className="flex flex-col text-left space-y-4">
          {/* Icon */}
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full text-base border-8 p-4 mx-auto sm:mx-0 ${styles.iconBg} ${styles.iconColor} ${styles.iconBorder}`}
          >
            {icon}
          </div>

          {/* Title and Message */}
          <h2 className="text-2xl leading-7 font-bold">{title}</h2>
          <p className="text-sm text-gray-500 mt-4 font-normal font-sans">
            {message}
          </p>

          {/* Reason Input */}
          {reason !== undefined && setReason && (
            <div className="flex flex-col gap-3 my-6">
              <p className="text-sm text-black font-normal leading-5">
                Reason for {reasonFor}
              </p>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MessageSquareTextIcon className="w-5 h-5 text-black" />
                </div>
                <input
                  type="text"
                  placeholder={`Enter your reason for this ${reasonFor}`}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none "
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 w-full px-0 sm:px-14">
            <button
              onClick={onConfirm}
              className={`px-6 py-3 rounded-2xl w-full sm:w-1/2 ${styles.confirmBtn}`}
            >
              Yes. I’m sure
            </button>
            <button
              onClick={onCancel}
              className={`px-6 py-3 rounded-2xl w-full sm:w-1/2 ${styles.cancelBtn}`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
