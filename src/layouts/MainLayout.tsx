import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideBar from "@/components/sidebar/SideBar";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/assets/logo.svg";
import { HiOutlineMenu } from "react-icons/hi";

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Collapse sidebar on mobile by default
      if (mobile) {
        setIsCollapsed(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigateTo = (path: string) => {
    if (path === "/login") {
      // Handle logout logic
      navigate("/login");
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

      {(!isMobile || (isMobile && !isCollapsed)) && (
        <SideBar
          isCollapsed={isCollapsed}
          activePath={location.pathname}
          navigateTo={navigateTo}
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 overflow-auto flex flex-col">
        <div className="w-full flex flex-row justify-between px-6">
          <AnimatePresence>
            {isCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="pt-6"
              >
                <img src={Logo} alt="Lightway MFB" className="h-10" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapse Button for mobile */}
          {isMobile && isCollapsed && (
            <button
              title="Toggle sidebar"
              onClick={toggleSidebar}
              className="fixed top-4 right-4 z-50 bg-white p-2 rounded-full shadow-md text-[#050C82]"
              aria-label="Open sidebar"
            >
              <HiOutlineMenu className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Page Content */}
        <div className="p-6 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
