import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideBar from "@/components/sidebar/SideBar";

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
      <SideBar
        isCollapsed={isCollapsed}
        activeItem={activeItem}
        navigateTo={navigateTo}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
