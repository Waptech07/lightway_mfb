import { useState } from "react";
import Logo from "@/assets/logo.svg";

export default function ResetPasswordForm() {
  const [username, setUsername] = useState("");

  return (
    // min-h-screen
    <div className="flex flex-col items-start max-md:justify-center max-md:h-screen px-8 font-sans">
      {/* Logo */}
      
      <div className="mb-8">
        <img src={Logo} alt="Lightway MFB" className="h-10" />
      </div>

      {/* Back button */}
      <button
        type="button"
        className="flex items-center space-x-2 mb-8 text-black border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
      >
        <span className="text-lg">←</span>
        <span>Back</span>
      </button>

      {/* Form */}
      <form className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Reset your Password</h1>
        <p className="text-gray-500 mb-8">
          Enter your correct email and we will send the process to your email
        </p>

        <label htmlFor="username" className="block mb-2 text-left font-medium">
          Username
        </label>
        <div className="relative mb-8">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">@</span>
          <input
            id="username"
            type="text"
            placeholder="enoobong_george"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-8 py-3 border border-blue-900 rounded outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-3 rounded hover:bg-blue-800 transition"
        >
          Send Password Reset Email
        </button>
      </form>
    </div>
  );
}
