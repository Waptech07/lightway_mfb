import LegalTab from "@/components/settings/LegalTab";
import SecurityTab from "@/components/settings/SecurityTab";
import React, { useState } from "react";
import { MdNotifications } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<"security" | "legal">("security");
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [indicatorLeft, setIndicatorLeft] = useState(0);

  // Set initial positions after first render
  React.useEffect(() => {
    const activeButton = document.querySelector(
      `button[data-tab="${activeTab}"]`
    ) as HTMLElement;
    if (activeButton) {
      setIndicatorWidth(activeButton.offsetWidth);
      setIndicatorLeft(activeButton.offsetLeft);
    }
  }, [activeTab]);

  const handleTabClick = (tab: "security" | "legal", e: React.MouseEvent) => {
    setActiveTab(tab);
    const target = e.target as HTMLElement;
    const button = target.closest("button") as HTMLElement;

    if (button) {
      setIndicatorWidth(button.offsetWidth);
      setIndicatorLeft(button.offsetLeft);
    }
  };

  return (
    <div className="font-sf-pro">
      {/* Header */}
      <Header
        header="Settings"
        detail="Customize your banking experience and security preferences."
      />

      {/* Tabs Header */}
      <div className="border-b border-gray-200 mb-6 relative">
        <nav className="flex justify-start space-x-8">
          {["security", "legal"].map((tab) => (
            <button
              key={tab}
              data-tab={tab}
              className={`relative py-2 px-2 text-base font-semibold transition-colors duration-200 cursor-pointer ${
                activeTab === tab
                  ? "text-[#2563eb]"
                  : "text-gray-500 hover:text-[#2563eb]"
              }`}
              onClick={(e) => handleTabClick(tab as "security" | "legal", e)}
            >
              {tab === "security" ? "Security" : "Legal"}
            </button>
          ))}
        </nav>

        {/* Underline indicator */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-[#2563eb] rounded-sm"
          animate={{
            width: indicatorWidth,
            left: indicatorLeft,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
          }}
        />
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="pt-2"
        >
          {activeTab === "security" ? <SecurityTab /> : <LegalTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Settings;
