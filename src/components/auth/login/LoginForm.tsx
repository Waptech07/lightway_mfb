import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock } from "lucide-react";
import Logo from "@/assets/logo.svg";

export default function LoginForm() {
  return (
    // had py-12 b4
    <div className="w-full max-w-md px-8">
      {/* Logo - left aligned */}
      <div className="mb-8">
        <img src={Logo} alt="Lightway MFB" className="h-10" />
      </div>

      {/* Heading - left aligned */}
      <div className="mb-8">
        <h2 className="text-[26px] font-bold text-gray-900 leading-[1.2] text-left">
          Welcome, Please Login
        </h2>
        <p className="text-gray-500 text-[15px] mt-[9px] text-left">
          Enter your credentials to access your account
        </p>
      </div>

      <form className="space-y-[26px]">
        {/* Username Field */}
        <div>
          <Label
            htmlFor="username"
            className="block mb-[10px] text-[15px] font-medium text-left"
          >
            Username
          </Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <Mail size={18} />
            </span>
            <Input
              id="username"
              type="text"
              placeholder="enoobong_george"
              className="pl-11 h-[50px] border-2 border-[#050C82] rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 text-left"
            />
          </div>
        </div>
        {/* Password Field */}
        <div>
          <Label
            htmlFor="password"
            className="block mb-[10px] text-[15px] font-medium text-left"
          >
            Password
          </Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <Lock size={18} />
            </span>
            <Input
              id="password"
              type="password"
              placeholder="********"
              className="pl-11 h-[50px] border-2 border-[#050C82] rounded-lg text-left"
            />
          </div>
        </div>
        {/* Remember + Forgot Password */}
        <div className="flex items-center justify-between pt-[2px]">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" className="h-5 w-5 rounded-[4px]" />
            <label htmlFor="remember" className="text-[15px] text-gray-700">
              Remember me
            </label>
          </div>
          <a
            href="#"
            className="text-[15px] text-[#CC340E] font-medium hover:underline"
          >
            Forgot Password?
          </a>
        </div>
        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-[#050C82] hover:bg-[#34399B] text-white rounded-lg h-[52px] text-[16px] font-semibold mt-[6px]"
        >
          Log into your Account
        </Button>

        <p className="text-center text-[15px] text-gray-800 pt-[10px]">
          Are you new here?{" "}
          <a href="#" className="text-[#CC340E] font-medium hover:underline ml-1">
            Create Account
          </a>
        </p>{" "}
      </form>
    </div>
  );
}
