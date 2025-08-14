import ResetPasswordForm from '@/components/auth/reset-password/ResetPasswordForm';
import AuthSidePanel from '@/components/auth/SidePanel';
import React from 'react'

const ResetPassword = (): React.JSX.Element => {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Left Panel - Auth Side Panel */}
      <div className="hidden md:block md:w-3/5">
        <AuthSidePanel />
      </div>

      {/* Right Panel - Reset Password Form */}
      {/* had py-12 b4 */}
      <div className="w-full md:w-2/5 flex items-center justify-center px-4">
        <ResetPasswordForm />
      </div>
    </div>
  );
}

export default ResetPassword