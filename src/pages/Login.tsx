import AuthSidePanel from "@/components/auth/SidePanel";
import LoginForm from "@/components/auth/login/LoginForm";

export default function Login() {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Left Panel - Auth Side Panel */}
      <div className="hidden md:block md:w-3/5">
        <AuthSidePanel />
      </div>

      {/* Right Panel - Login Form */}
      {/* Had py-12 and added it back in max-md */}
      <div className="w-full md:w-2/5 max-md:py-12 flex items-center justify-center px-4">
        <LoginForm />
      </div>
    </div>
  );
}
