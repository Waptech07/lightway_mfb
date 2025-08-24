import React from "react";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const PendingTransactions = (): React.JSX.Element => {
  const users = [
    {
      id: "ST5676058",
      name: "Enoobong George",
      amount: "₦250,000.00",
      initials: "EG",
      bgColor: "bg-blue-600",
    },
    {
      id: "ST5684012",
      name: "Akintade Kemi",
      amount: "₦300,000.00",
      initials: "AK",
      bgColor: "bg-blue-600",
    },
    {
      id: "ST5682145",
      name: "Michael Ijeoma",
      amount: "₦180,000.00",
      initials: "MI",
      bgColor: "bg-blue-600",
    },
    {
      id: "ST5698765",
      name: "Chinonso Uche",
      amount: "₦500,000.00",
      initials: "CU",
      bgColor: "bg-blue-600",
    },
  ];

  return (
    <div className="flex-1 flex flex-col gap-4 min-w-0 font-sf-pro">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="min-w-[200px] flex-1">
          <h2 className="text-base sm:text-lg font-medium">
            Pending Transactions
          </h2>
          <p className="text-xs sm:text-sm font-normal text-muted-foreground">
            Transactions awaiting your Approval / Rejection
          </p>
        </div>
        <Link
          to={"/dashboard/view-all"}
          className="text-primary flex items-center gap-1 text-sm sm:text-base"
        >
          View All <GoArrowRight className="mt-0.5" />
        </Link>
      </div>
      <div className="w-full">
        <div
          role="list"
          aria-label="User list with account information"
          className="space-y-0"
        >
          {users.map((user) => (
            <div
              key={user.id}
              role="listitem"
              tabIndex={0}
              className="flex flex-row items-center justify-between py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer"
              aria-label={`${user.name}, ID ${user.id}, Amount ${user.amount}`}
            >
              <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10" aria-hidden="true">
                  <AvatarFallback
                    className={`${user.bgColor} text-white text-xs sm:text-sm font-medium`}
                  >
                    {user.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-medium text-gray-900 leading-tight truncate">
                    {user.name}
                  </p>
                  <span
                    className="text-xs sm:text-sm font-normal truncate"
                    aria-label={`Account ID ${user.id}`}
                  >
                    {user.id}
                  </span>
                </div>
              </div>

              <div className="text-right sm:text-left sm:min-w-[100px]">
                <p
                  className="text-sm md:text-base font-medium text-gray-900 truncate"
                  aria-label={`Amount ${user.amount}`}
                >
                  {user.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
