import { useState, useEffect } from "react";
import {
  HiOutlineHome,
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineCog,
  HiOutlineLogout,
  HiChevronDown,
  HiChevronUp,
  HiOutlineMenu,
  HiX,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/assets/logo.svg";
import { RiArrowLeftRightLine, RiBankLine } from "react-icons/ri";
import { ArrowLeftToLine, CornerDownRight } from "lucide-react";

interface SideBarProps {
  isCollapsed: boolean;
  activeItem: string;
  navigateTo: (path: string) => void;
  toggleSidebar: () => void;
  isMobile: boolean;
}

export default function SideBar({
  isCollapsed,
  activeItem,
  navigateTo,
  toggleSidebar,
  isMobile,
}: SideBarProps) {
  const [transferOpen, setTransferOpen] = useState(false);
  const [requestsOpen, setRequestsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const topMenuItems = [
    {
      name: "Dashboard",
      icon: HiOutlineHome,
      path: "/dashboard",
    },
    {
      name: "Transfer",
      icon: RiArrowLeftRightLine,
      path: "/transfer",
      subItems: [
        { name: "Internal Transfer", path: "/transfer/internal" },
        { name: "External Transfer", path: "/transfer/external" },
        { name: "Bulk Transfer", path: "/transfer/bulk" },
      ],
    },
    {
      name: "My Requests",
      icon: RiBankLine,
      path: "/requests",
      subItems: [
        { name: "Pending Requests", path: "/requests/pending" },
        { name: "Approved Requests", path: "/requests/approved" },
        { name: "Rejected Requests", path: "/requests/rejected" },
      ],
    },
    {
      name: "Transaction History",
      icon: HiOutlineClock,
      path: "/transactions",
    },
    {
      name: "Statements",
      icon: HiOutlineDocumentText,
      path: "/statements",
    },
  ];

  const bottomMenuItems = [
    {
      name: "Settings",
      icon: HiOutlineCog,
      path: "/settings",
    },
    {
      name: "Logout",
      icon: HiOutlineLogout,
      path: "/login",
      color: "#CC340E",
    },
  ];

  const toggleDropdown = (menu: string) => {
    if (menu === "transfer") {
      setTransferOpen(!transferOpen);
      setRequestsOpen(false);
    } else if (menu === "my requests") {
      setRequestsOpen(!requestsOpen);
      setTransferOpen(false);
    }
  };

  // Close dropdowns when sidebar collapses
  useEffect(() => {
    if (isCollapsed) {
      setTransferOpen(false);
      setRequestsOpen(false);
    }
  }, [isCollapsed]);

  return (
    <motion.div
      className={`bg-[#FAFAFA] text-[#050C82] flex flex-col h-full w-full px-3 relative 
        ${isMobile && !isCollapsed ? "fixed inset-0 z-50 shadow-xl" : ""}`}
      initial={false}
      animate={{
        width: isMobile && !isCollapsed ? "100%" : isCollapsed ? 80 : 272,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Mobile Close Button */}
      {isMobile && !isCollapsed && (
        <button
          title="toggle sidebar"
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-[#050C82] p-2 rounded-full hover:bg-[#050C82]/10"
        >
          <HiX className="w-6 h-6" />
        </button>
      )}

      {/* Collapse Button */}
      <button
        onClick={toggleSidebar}
        className={`absolute cursor-pointer top-4 z-20 text-[#050C82] p-2 rounded-full hover:bg-[#050C82]/10 transition-transform ${
          isCollapsed ? "left-1/2 transform -translate-x-1/2" : "right-4"
        } ${isMobile && !isCollapsed ? "hidden" : ""}`}
      >
        {isCollapsed ? (
          <HiOutlineMenu className="w-6 h-6" />
        ) : (
          <ArrowLeftToLine className="w-5 h-5" />
        )}
      </button>

      {/* Logo */}
      <div className="py-6 min-h-[120px] px-2">
        <AnimatePresence mode="wait">
          {isCollapsed ? null : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <img src={Logo} alt="Lightway MFB" className="h-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Top Menu Items */}
      <nav className="flex-1 py-4 space-y-1">
        <ul className="space-y-1">
          {topMenuItems.map((item) => (
            <li key={item.name}>
              <div className="flex flex-col">
                <div
                  className="relative group"
                  onMouseEnter={() => isCollapsed && setShowTooltip(item.name)}
                  onMouseLeave={() => isCollapsed && setShowTooltip(null)}
                >
                  <button
                    onClick={() => {
                      navigateTo(item.path);
                      // if (isMobile) toggleSidebar();
                    }}
                    className={`cursor-pointer flex items-center justify-between w-full px-4 py-3 text-left transition-colors rounded-md ${
                      activeItem === item.name
                        ? "bg-[#050C82] text-white"
                        : "hover:bg-[#050C82] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon
                        className={`flex-shrink-0 ${
                          isCollapsed ? "w-6 h-6" : "w-5 h-5"
                        }`}
                      />

                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="ml-3 font-medium"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </div>

                    {item.subItems && !isCollapsed && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(item.name.toLowerCase());
                        }}
                        className="cursor-zoom-in p-1 ml-2 hover:bg-[#050C82]/20 rounded-full"
                      >
                        {(item.name === "Transfer" && transferOpen) ||
                        (item.name === "My Requests" && requestsOpen) ? (
                          <HiChevronUp className="w-4 h-4" />
                        ) : (
                          <HiChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </button>

                  {/* Tooltip for collapsed sidebar */}
                  {isCollapsed && showTooltip === item.name && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-gray-800 text-white text-sm rounded shadow-lg z-50 whitespace-nowrap"
                    >
                      {item.name}
                    </motion.div>
                  )}
                </div>

                {/* Dropdown Items */}
                {!isCollapsed && item.subItems && (
                  <AnimatePresence>
                    {(item.name === "Transfer" && transferOpen) ||
                    (item.name === "My Requests" && requestsOpen) ? (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-2 mt-1 space-y-1 overflow-hidden"
                      >
                        {item.subItems.map((subItem) => (
                          <li key={subItem.name}>
                            <button
                              onClick={() => {
                                navigateTo(subItem.path);
                                if (isMobile) toggleSidebar();
                              }}
                              className={`cursor-pointer flex items-center w-full py-3 px-3 text-left transition-colors rounded-lg ${
                                activeItem === subItem.path
                                  ? "bg-[#050C82] text-[#050C82] font-medium"
                                  : "hover:bg-[#050C82] hover:text-white"
                              }`}
                            >
                              <CornerDownRight className="flex-shrink-0 w-5 h-5 ml-4" />
                              <span className="ml-3">{subItem.name}</span>
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    ) : null}
                  </AnimatePresence>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto py-4">
        <ul className="space-y-1">
          {bottomMenuItems.map((item) => (
            <li key={item.name}>
              <div
                className="relative group"
                onMouseEnter={() => isCollapsed && setShowTooltip(item.name)}
                onMouseLeave={() => isCollapsed && setShowTooltip(null)}
              >
                <button
                  onClick={() => {
                    navigateTo(item.path);
                    if (isMobile) toggleSidebar();
                  }}
                  className={`flex items-center w-full px-4 py-3 text-left transition-colors rounded-lg ${
                    activeItem === item.path
                      ? item.name === "Logout"
                        ? "bg-[#CC340E] text-[#CC340E] hover:text-white font-medium"
                        : "bg-[#050C82] text-white"
                      : item.name === "Logout"
                      ? "hover:bg-[#CC340E] hover:text-white text-[#CC340E]"
                      : "hover:bg-[#050C82] hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`flex-shrink-0 ${
                      isCollapsed ? "w-6 h-6" : "w-5 h-5"
                    }`}
                  />

                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="ml-3 font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </button>

                {/* Tooltip for collapsed sidebar */}
                {isCollapsed && showTooltip === item.name && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-gray-800 text-white text-sm rounded shadow-lg z-50 whitespace-nowrap"
                  >
                    {item.name}
                  </motion.div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
