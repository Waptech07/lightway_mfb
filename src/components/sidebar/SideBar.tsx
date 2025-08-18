import { useState, useEffect, useMemo, useCallback } from "react";
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

interface MenuItem {
  name: string;
  icon: React.ElementType;
  path: string;
  subItems?: SubMenuItem[];
  color?: string;
}

interface SubMenuItem {
  name: string;
  path: string;
}

interface SideBarProps {
  isCollapsed: boolean;
  activePath: string;
  navigateTo: (path: string) => void;
  toggleSidebar: () => void;
  isMobile: boolean;
  isTablet: boolean;
}

export default function SideBar({
  isCollapsed,
  activePath,
  navigateTo,
  toggleSidebar,
  isMobile,
  isTablet,
}: SideBarProps) {
  const [transferOpen, setTransferOpen] = useState(false);
  const [requestsOpen, setRequestsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const isMobileOrTablet = isMobile || isTablet;

  // Memoize menu items to prevent recreating on every render
  const topMenuItems = useMemo<MenuItem[]>(
    () => [
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
          { name: "Single Payments", path: "/transfer/single-payments" },
          { name: "Bulk Payments", path: "/transfer/bulk-payments" },
        ],
      },
      {
        name: "My Requests",
        icon: RiBankLine,
        path: "/requests",
        subItems: [
          { name: "All Requests", path: "/requests/all-requests" },
          { name: "Pending Requests", path: "/requests/pending-requests" },
        ],
      },
      {
        name: "Transaction History",
        icon: HiOutlineClock,
        path: "/transaction-history",
      },
      {
        name: "Statements",
        icon: HiOutlineDocumentText,
        path: "/statements",
      },
    ],
    []
  );

  const bottomMenuItems = useMemo<MenuItem[]>(
    () => [
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
    ],
    []
  );

  // Check if a menu item is active
  const isItemActive = useCallback(
    (item: MenuItem) => {
      return (
        activePath === item.path ||
        (item.subItems?.some((sub) => sub.path === activePath) ?? false)
      );
    },
    [activePath]
  );

  // Check if a subitem is active
  const isSubItemActive = useCallback(
    (path: string) => {
      return activePath === path;
    },
    [activePath]
  );

  // Toggle dropdowns
  const toggleDropdown = useCallback((menu: string) => {
    if (menu === "transfer") {
      setTransferOpen((prev) => !prev);
      setRequestsOpen(false);
    } else if (menu === "my requests") {
      setRequestsOpen((prev) => !prev);
      setTransferOpen(false);
    }
  }, []);

  // Close dropdowns when sidebar collapses
  useEffect(() => {
    if (isCollapsed) {
      setTransferOpen(false);
      setRequestsOpen(false);
    }
  }, [isCollapsed]);

  // Expand dropdown when subitem is active
  useEffect(() => {
    if (!isCollapsed) {
      // Check transfer subitems
      const transferItem = topMenuItems.find(
        (item) => item.name === "Transfer"
      );
      if (transferItem?.subItems?.some((sub) => sub.path === activePath)) {
        setTransferOpen(true);
      }

      // Check requests subitems
      const requestsItem = topMenuItems.find(
        (item) => item.name === "My Requests"
      );
      if (requestsItem?.subItems?.some((sub) => sub.path === activePath)) {
        setRequestsOpen(true);
      }
    }
  }, [activePath, isCollapsed, topMenuItems]);

  const handleKeyDown = (
    e: React.KeyboardEvent,
    item: MenuItem | SubMenuItem,
    isSubItem = false
  ) => {
    const key = e.key;

    if (key === "Enter" || key === " ") {
      e.preventDefault();
      navigateTo(item.path);
      if (isMobileOrTablet && !isCollapsed) toggleSidebar();
    } else if (
      !isSubItem &&
      "subItems" in item &&
      item.subItems &&
      key === "ArrowRight"
    ) {
      e.preventDefault();
      toggleDropdown(item.name.toLowerCase());
    } else if (key === "Escape") {
      e.preventDefault();
      if (isMobileOrTablet && !isCollapsed) toggleSidebar();
    }
  };

  // Calculate sidebar width based on device
  const getSidebarWidth = () => {
    if ((isMobile || isTablet) && !isCollapsed) return "100%";
    return isCollapsed ? 80 : 272;
  };

  return (
    <motion.aside
      className={`bg-[#FAFAFA] text-[#050C82] flex flex-col h-full w-full px-3 relative 
             ${
               (isMobile || isTablet) && !isCollapsed
                 ? "fixed inset-0 z-50 shadow-xl"
                 : ""
             }`}
      initial={false}
      animate={{
        width: getSidebarWidth(),
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      aria-label="Main navigation"
    >
      {/* Mobile/Tablet Close Button */}
      {isMobileOrTablet && !isCollapsed && (
        <button
          title="Close sidebar"
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-[#050C82] p-2 rounded-full hover:bg-[#050C82]/10"
          aria-label="Close sidebar"
        >
          <HiX className="w-6 h-6" />
        </button>
      )}

      {/* Collapse Button */}
      <button
        onClick={toggleSidebar}
        className={`absolute cursor-pointer top-4 z-20 text-[#050C82] p-2 rounded-full hover:bg-[#050C82]/10 transition-transform ${
          isCollapsed ? "left-1/2 transform -translate-x-1/2" : "right-4"
        } ${isMobileOrTablet && !isCollapsed ? "hidden" : ""}`}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
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
        <ul className="space-y-1" role="menu">
          {topMenuItems.map((item) => {
            const isExpanded =
              (item.name === "Transfer" && transferOpen) ||
              (item.name === "My Requests" && requestsOpen);

            return (
              <li key={item.name} role="none">
                <div className="flex flex-col">
                  <div
                    className="relative group"
                    onMouseEnter={() =>
                      isCollapsed && setShowTooltip(item.name)
                    }
                    onMouseLeave={() => isCollapsed && setShowTooltip(null)}
                  >
                    <button
                      role="menuitem"
                      aria-haspopup={item.subItems ? "menu" : undefined}
                      aria-expanded={item.subItems ? isExpanded : undefined}
                      onClick={() => {
                        if (item.subItems) {
                          toggleDropdown(item.name.toLowerCase());
                          isCollapsed && navigateTo(item.subItems[0].path);
                        } else {
                          navigateTo(item.path);
                          if (isMobileOrTablet && !isCollapsed) toggleSidebar();
                        }
                      }}
                      onKeyDown={(e) => handleKeyDown(e, item)}
                      className={`cursor-pointer flex items-center justify-between w-full px-4 py-3 text-left transition-colors rounded-md ${
                        isItemActive(item)
                          ? "bg-[#050C82] text-white"
                          : "hover:bg-[#050C82] hover:text-white"
                      }`}
                      tabIndex={0}
                    >
                      <div className="flex items-center">
                        <item.icon
                          className={`flex-shrink-0 ${
                            isCollapsed ? "w-6 h-6" : "w-5 h-5"
                          }`}
                          aria-hidden="true"
                        />

                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="ml-3 text-base font-normal"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </div>

                      {item.subItems && !isCollapsed && (
                        <span
                          className="p-1 ml-2 hover:bg-[#050C82]/20 rounded-full cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(item.name.toLowerCase());
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.stopPropagation();
                              toggleDropdown(item.name.toLowerCase());
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          aria-label={`${isExpanded ? "Collapse" : "Expand"} ${
                            item.name
                          } menu`}
                        >
                          {isExpanded ? (
                            <HiChevronUp
                              className="w-4 h-4"
                              aria-hidden="true"
                            />
                          ) : (
                            <HiChevronDown
                              className="w-4 h-4"
                              aria-hidden="true"
                            />
                          )}
                        </span>
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
                      {isExpanded && (
                        <motion.ul
                          role="menu"
                          aria-label={`${item.name} submenu`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-2 mt-1 space-y-1 overflow-hidden"
                        >
                          {item.subItems.map((subItem) => (
                            <li key={subItem.name} role="none">
                              <button
                                role="menuitem"
                                onClick={() => {
                                  navigateTo(subItem.path);
                                  if (isMobileOrTablet) toggleSidebar();
                                }}
                                onKeyDown={(e) =>
                                  handleKeyDown(e, subItem, true)
                                }
                                className={`cursor-pointer flex items-center w-full py-3 px-3 text-left transition-colors rounded-lg ${
                                  isSubItemActive(subItem.path)
                                    ? "bg-[#050C82] text-white"
                                    : "hover:bg-[#050C82] hover:text-white"
                                }`}
                                tabIndex={0}
                              >
                                <CornerDownRight
                                  className="flex-shrink-0 w-5 h-5 ml-4"
                                  aria-hidden="true"
                                />
                                <span className="ml-3 text-base font-normal">
                                  {subItem.name}
                                </span>
                              </button>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto py-4">
        <ul className="space-y-1" role="menu">
          {bottomMenuItems.map((item) => (
            <li key={item.name} role="none">
              <div
                className="relative group"
                onMouseEnter={() => isCollapsed && setShowTooltip(item.name)}
                onMouseLeave={() => isCollapsed && setShowTooltip(null)}
              >
                <button
                  role="menuitem"
                  onClick={() => {
                    navigateTo(item.path);
                    if (isMobileOrTablet && !isCollapsed) toggleSidebar();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigateTo(item.path);
                      if (isMobileOrTablet && !isCollapsed) toggleSidebar();
                    }
                  }}
                  className={`flex cursor-pointer items-center w-full px-4 py-3 text-left transition-colors rounded-lg ${
                    activePath === item.path
                      ? item.name === "Logout"
                        ? "bg-[#CC340E] text-[#CC340E] hover:text-white"
                        : "bg-[#050C82] text-white"
                      : item.name === "Logout"
                      ? "hover:bg-[#CC340E] hover:text-white text-[#CC340E]"
                      : "hover:bg-[#050C82] hover:text-white"
                  }`}
                  tabIndex={0}
                >
                  <item.icon
                    className={`flex-shrink-0 ${
                      isCollapsed ? "w-6 h-6" : "w-5 h-5"
                    }`}
                    aria-hidden="true"
                  />

                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="ml-3 text-base font-normal"
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
    </motion.aside>
  );
}
