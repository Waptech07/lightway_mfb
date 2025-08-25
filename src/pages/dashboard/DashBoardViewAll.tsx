import Header from "@/components/Header";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, SearchIcon } from "lucide-react";
import { BsArrowLeftSquare } from "react-icons/bs";
import formatCurrency from "@/lib/formatCurrency";
import Pagination from "@/lib/Pagination";

const DashBoardViewAll = (): React.JSX.Element => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  type Account = {
    id: string;
    name: string;
    accountNumber: string;
    accountBalance: number;
    ledgerBalance: number;
    blockedFunds: number;
    accountType: string;
    initials: string;
  };

  const data: Account[] = [
    {
      id: "1",
      name: "Enoobong George",
      accountNumber: "3002930594",
      accountBalance: 250000,
      ledgerBalance: 250000,
      blockedFunds: 2000,
      accountType: "Current",
      initials: "EG",
    },
    {
      id: "2",
      name: "Aisha Tunde",
      accountNumber: "3002930595",
      accountBalance: 300000,
      ledgerBalance: 300000,
      blockedFunds: 3060,
      accountType: "Savings",
      initials: "AT",
    },
    {
      id: "3",
      name: "Kofi Sarpong",
      accountNumber: "3002930596",
      accountBalance: 350000,
      ledgerBalance: 350000,
      blockedFunds: 5530,
      accountType: "Savings",
      initials: "KS",
    },
    {
      id: "4",
      name: "Fatima Bello",
      accountNumber: "3002930597",
      accountBalance: 120000,
      ledgerBalance: 120000,
      blockedFunds: 1000,
      accountType: "Current",
      initials: "FB",
    },
    {
      id: "5",
      name: "John Doe",
      accountNumber: "3002930598",
      accountBalance: 50000,
      ledgerBalance: 50000,
      blockedFunds: 500,
      accountType: "Savings",
      initials: "JD",
    },
    {
      id: "6",
      name: "Mary Johnson",
      accountNumber: "3002930599",
      accountBalance: 80000,
      ledgerBalance: 80000,
      blockedFunds: 800,
      accountType: "Current",
      initials: "MJ",
    },
    {
      id: "7",
      name: "Samuel Okoro",
      accountNumber: "3002930600",
      accountBalance: 95000,
      ledgerBalance: 95000,
      blockedFunds: 950,
      accountType: "Savings",
      initials: "SO",
    },
    {
      id: "8",
      name: "Linda Eze",
      accountNumber: "3002930601",
      accountBalance: 110000,
      ledgerBalance: 110000,
      blockedFunds: 1100,
      accountType: "Current",
      initials: "LE",
    },
    {
      id: "9",
      name: "Peter Obi",
      accountNumber: "3002930602",
      accountBalance: 200000,
      ledgerBalance: 200000,
      blockedFunds: 2000,
      accountType: "Savings",
      initials: "PO",
    },
    {
      id: "10",
      name: "Grace Mensah",
      accountNumber: "3002930603",
      accountBalance: 175000,
      ledgerBalance: 175000,
      blockedFunds: 1750,
      accountType: "Current",
      initials: "GM",
    },
    {
      id: "11",
      name: "Ahmed Musa",
      accountNumber: "3002930604",
      accountBalance: 220000,
      ledgerBalance: 220000,
      blockedFunds: 2200,
      accountType: "Savings",
      initials: "AM",
    },
    {
      id: "12",
      name: "Chinwe Nwosu",
      accountNumber: "3002930605",
      accountBalance: 130000,
      ledgerBalance: 130000,
      blockedFunds: 1300,
      accountType: "Current",
      initials: "CN",
    },
    {
      id: "13",
      name: "Kwame Boateng",
      accountNumber: "3002930606",
      accountBalance: 90000,
      ledgerBalance: 90000,
      blockedFunds: 900,
      accountType: "Savings",
      initials: "KB",
    },
    {
      id: "14",
      name: "Sarah Williams",
      accountNumber: "3002930607",
      accountBalance: 160000,
      ledgerBalance: 160000,
      blockedFunds: 1600,
      accountType: "Current",
      initials: "SW",
    },
    {
      id: "15",
      name: "David Brown",
      accountNumber: "3002930608",
      accountBalance: 140000,
      ledgerBalance: 140000,
      blockedFunds: 1400,
      accountType: "Savings",
      initials: "DB",
    },
    {
      id: "16",
      name: "Esther Akpan",
      accountNumber: "3002930609",
      accountBalance: 155000,
      ledgerBalance: 155000,
      blockedFunds: 1550,
      accountType: "Current",
      initials: "EA",
    },
    {
      id: "17",
      name: "Paul Smith",
      accountNumber: "3002930610",
      accountBalance: 180000,
      ledgerBalance: 180000,
      blockedFunds: 1800,
      accountType: "Savings",
      initials: "PS",
    },
    {
      id: "18",
      name: "Ngozi Okafor",
      accountNumber: "3002930611",
      accountBalance: 210000,
      ledgerBalance: 210000,
      blockedFunds: 2100,
      accountType: "Current",
      initials: "NO",
    },
    {
      id: "19",
      name: "James King",
      accountNumber: "3002930612",
      accountBalance: 125000,
      ledgerBalance: 125000,
      blockedFunds: 1250,
      accountType: "Savings",
      initials: "JK",
    },
    {
      id: "20",
      name: "Blessing Uche",
      accountNumber: "3002930613",
      accountBalance: 135000,
      ledgerBalance: 135000,
      blockedFunds: 1350,
      accountType: "Current",
      initials: "BU",
    },
    {
      id: "21",
      name: "Henry Ford",
      accountNumber: "3002930614",
      accountBalance: 145000,
      ledgerBalance: 145000,
      blockedFunds: 1450,
      accountType: "Savings",
      initials: "HF",
    },
    {
      id: "22",
      name: "Victoria Adams",
      accountNumber: "3002930615",
      accountBalance: 155000,
      ledgerBalance: 155000,
      blockedFunds: 1550,
      accountType: "Current",
      initials: "VA",
    },
    {
      id: "23",
      name: "Emeka Nwankwo",
      accountNumber: "3002930616",
      accountBalance: 165000,
      ledgerBalance: 165000,
      blockedFunds: 1650,
      accountType: "Savings",
      initials: "EN",
    },
    {
      id: "24",
      name: "Ruth Adeyemi",
      accountNumber: "3002930617",
      accountBalance: 175000,
      ledgerBalance: 175000,
      blockedFunds: 1750,
      accountType: "Current",
      initials: "RA",
    },
    {
      id: "25",
      name: "Ibrahim Lawal",
      accountNumber: "3002930618",
      accountBalance: 185000,
      ledgerBalance: 185000,
      blockedFunds: 1850,
      accountType: "Savings",
      initials: "IL",
    },
    {
      id: "26",
      name: "Chidera Obi",
      accountNumber: "3002930619",
      accountBalance: 195000,
      ledgerBalance: 195000,
      blockedFunds: 1950,
      accountType: "Current",
      initials: "CO",
    },
    {
      id: "27",
      name: "Musa Abdullahi",
      accountNumber: "3002930620",
      accountBalance: 205000,
      ledgerBalance: 205000,
      blockedFunds: 2050,
      accountType: "Savings",
      initials: "MA",
    },
    {
      id: "28",
      name: "Helen Osei",
      accountNumber: "3002930621",
      accountBalance: 215000,
      ledgerBalance: 215000,
      blockedFunds: 2150,
      accountType: "Current",
      initials: "HO",
    },
    {
      id: "29",
      name: "Tunde Bakare",
      accountNumber: "3002930622",
      accountBalance: 225000,
      ledgerBalance: 225000,
      blockedFunds: 2250,
      accountType: "Savings",
      initials: "TB",
    },
    {
      id: "30",
      name: "Adaobi Nnamdi",
      accountNumber: "3002930623",
      accountBalance: 235000,
      ledgerBalance: 235000,
      blockedFunds: 2350,
      accountType: "Current",
      initials: "AN",
    },
  ];

  const filteredAccounts = useMemo(() => {
    return data.filter((account) => {
      const lowerSearch = searchTerm.toLowerCase();
      return (
        account.name.toLowerCase().includes(lowerSearch) ||
        account.accountNumber.includes(lowerSearch)
      );
    });
  }, [searchTerm, data]);

  const totalPages = Math.ceil(filteredAccounts.length / rowsPerPage);

  const paginatedAccounts = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredAccounts.slice(start, start + rowsPerPage);
  }, [currentPage, rowsPerPage, filteredAccounts]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (value: string) => {
    const rows = parseInt(value.replace(/\D/g, ""), 10);
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="text-left font-sf-pro">
      <Header
        header=" Hello, Enooobong & Sons 💼,"
        detail="Wednesday, 23 July 2025"
      />
      <div className="flex flex-row items-center mb-4">
        <button
          className="text-black hover:text-black/40 flex items-center gap-1 text-sm font-normal"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeftSquare className="h-5 w-5" />
          Back
        </button>
      </div>

      <p className="text-xl font-medium mb-10">My Accounts</p>

      <div className="w-full mb-4 relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="w-5 h-5 text-black" />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#050C82]"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Account Table */}
      <div className="overflow-x-auto rounded-t-xl mb-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-black capitalize tracking-wider">
                Account
              </th>
              <th className="px-6 py-3 text-center text-xs sm:text-sm font-medium text-black capitalize tracking-wider">
                Available Balance
              </th>
              <th className="px-6 py-3 text-center text-xs sm:text-sm font-medium text-black capitalize tracking-wider">
                Ledger Balance
              </th>
              <th className="px-6 py-3 text-center text-xs sm:text-sm font-medium text-black capitalize tracking-wider">
                Blocked Funds
              </th>
              <th className="px-6 py-3 text-center text-xs sm:text-sm font-medium text-black capitalize tracking-wider">
                Account Type
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
            ) : paginatedAccounts.length > 0 ? (
              paginatedAccounts.map((data) => (
                <tr key={data.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-left">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center bg-[#050C82] rounded-full w-10 h-10 p-2 text-sm font-bold text-white">
                        {data.initials}
                      </div>

                      <div className="flex flex-col">
                        <p className="text-base font-medium">{data.name}</p>
                        <p className="text-sm font-normal">
                          {data.accountNumber}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-center">
                    {formatCurrency(data.accountBalance)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-center">
                    {formatCurrency(data.ledgerBalance)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-red-800 text-center">
                    {formatCurrency(data.blockedFunds)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <span
                        className={`inline-flex items-center px-4 py-0.5 rounded-full text-xs font-medium border-[0.5px] border-black text-black`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full mr-2 bg-gray-300`}
                        ></span>
                        {data.accountType}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No Account Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredAccounts.length > 0 && (
         <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    generatePageNumbers={generatePageNumbers}
                  />
      )}
    </div>
  );
};

export default DashBoardViewAll;
