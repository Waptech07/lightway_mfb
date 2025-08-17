import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideBar from "@/components/sidebar/SideBar";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/assets/logo.svg";
import { HiOutlineMenu } from "react-icons/hi";

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check device type on mount and resize
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 960;

      setIsMobile(mobile);
      setIsTablet(tablet);

      // Collapse sidebar on mobile/tablet by default
      if (mobile || tablet) {
        setIsCollapsed(true);
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
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

  const isMobileOrTablet = isMobile || isTablet;

  return (
    <div className="flex h-screen">
      {/* Mobile/Tablet Overlay Backdrop */}
      <AnimatePresence>
        {isMobileOrTablet && !isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Always show sidebar on desktop/tablet, show when expanded on mobile */}
      {(!isMobile || !isCollapsed) && (
        <SideBar
          isCollapsed={isCollapsed}
          activePath={location.pathname}
          navigateTo={navigateTo}
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        <div className="w-full flex flex-row justify-between px-6 bg-white">
          <AnimatePresence>
            {(isCollapsed || isTablet) && (
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

          {/* Collapse Button for mobile*/}
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
        <div className="p-6 flex-1 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
