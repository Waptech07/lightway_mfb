import AuthSidePanel from "@/components/auth/SidePanel";

export default function ResetPassword() {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Left Panel - Auth Side Panel */}
      <div className="hidden md:block md:w-3/5">
        <AuthSidePanel />
      </div>

      {/* Right Panel - Reset Password Form */}
      <div className="w-full md:w-2/5 flex items-center justify-center px-4 py-12">
        <ResetPassword />
      </div>
    </div>
  );
}
