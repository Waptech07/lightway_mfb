import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideBar from "@/components/sidebar/SideBar";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/assets/logo.svg";

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Transfer", path: "/transfer" },
    { name: "My Requests", path: "/requests" },
    { name: "Transaction History", path: "/transactions" },
    { name: "Statements", path: "/statements" },
    { name: "Settings", path: "/settings" },
    { name: "Logout", path: "/login" },
  ];

  const activeItem =
    menuItems.find((item) => location.pathname === item.path)?.name ||
    "Dashboard";

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    // Start with collapsed sidebar on mobile
    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    }

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const navigateTo = (path: string) => {
    if (path === "/login") {
      handleLogout();
    } else {
      navigate(path);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Mobile Overlay Backdrop */}
      <AnimatePresence>
        {isMobile && !isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      <SideBar
        isCollapsed={isCollapsed}
        activeItem={activeItem}
        navigateTo={navigateTo}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 overflow-auto flex flex-col">
        <AnimatePresence>
          {isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="pt-6 px-6"
            >
              <img src={Logo} alt="Lightway MFB" className="h-10" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <div className="p-6 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
