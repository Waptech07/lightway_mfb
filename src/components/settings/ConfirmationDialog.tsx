import { type ReactNode } from "react";

interface ConfirmationDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  icon?: ReactNode;
}

const ConfirmationDialog = ({
  open,
  onConfirm,
  onCancel,
  title,
  message,
  icon,
}: ConfirmationDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-opacity-30 p-4 text-left">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md sm:max-w-lg">
        <div className="flex flex-col text-left space-y-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full text-base border-8 border-[#D4F7E1] p-4 bg-[#D0FBED] mx-auto sm:mx-0">
            {icon}
          </div>
          <h2 className="text-2xl leading-7 font-bold">{title}</h2>
          <p className="text-sm text-gray-500 mt-4 font-normal">{message}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 w-full px-0 sm:px-14">
            <button
              onClick={onConfirm}
              className="bg-[#065F46] hover:opacity-90 cursor-pointer text-white px-6 py-3 rounded-2xl w-full sm:w-1/2"
            >
              Yes. I’m sure
            </button>
            <button
              onClick={onCancel}
              className="border border-gray-400 text-[#065F46] cursor-pointer px-6 py-3 rounded-2xl hover:bg-gray-200 w-full sm:w-1/2"
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
