import { CalendarDays, ChevronDown } from "lucide-react";
import React from "react";

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

export default CustomDateInput;