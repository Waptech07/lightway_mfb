import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Loader2 } from "lucide-react";
import Logo from "@/assets/logo.svg";
import { useForm, type SubmitHandler, } from 'react-hook-form';
import { useCustomMutation } from "@/hooks/useCustomQuery";
import { Link } from "react-router-dom";
import { toast } from "sonner";
type LoginFormValueType = {
  username: string;
  password: string
}

const LoginForm = (): React.JSX.Element => {
  const { formState: { errors }, register, handleSubmit } = useForm<LoginFormValueType>();
  //remember to change to appropriate route later and add error handler tomorrow
  const { mutate, isPending } = useCustomMutation<LoginFormValueType, any>({ url: "auth/login", key: "login", });
  const onSubmit: SubmitHandler<LoginFormValueType> = (data) => {
    mutate(data, {
      onError(error) {
        toast(`${error}`);
      }
    })
  };
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
        <p className="text-gray-500 text-base mt-[9px] text-left">
          Enter your credentials to access your account
        </p>
      </div>

      <form className="space-y-[26px]" onSubmit={handleSubmit(onSubmit)}>
        {/* Username Field */}
        <div>
          <Label
            htmlFor="username"
            className="block mb-[10px] text-base font-medium text-left"
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
              {...register("username", {
                required: 'Please enter your username',
                validate: (value) => {
                  if (value.length < 5 || value.length > 30) return "Username must be between 3-30 characters";
                }
              })} />
          </div>
          {errors.username && <p className="text-red text-left">{errors.username.message}</p>}
        </div>
        {/* Password Field */}
        <div>
          <Label
            htmlFor="password"
            className="block mb-[10px] text-base font-medium text-left"
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
              className="pl-11 h-[50px] border-2 border-[#050C82] rounded-lg text-left" {...register("password", {
                required: "Please enter your password.", maxLength: {
                  value: 20, message: "Password must have atleast 8-20 characters"
                }, minLength: {
                  value: 8, message: "Password must have atleast 8-20 characters"
                }
              })}
            />
          </div>
          {errors.password && <p className="text-red text-left">{errors.password?.message}</p>}
        </div>
        {/* Remember + Forgot Password */}
        <div className="flex items-center justify-between pt-[2px]">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" className="h-5 w-5 rounded-[4px]" />
            <Label htmlFor="remember" className="text-base text-gray-700">
              Remember me
            </Label>
          </div>
          <Link
            to="/forgot-password"
            className="text-base text-[#CC340E] font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-[#050C82] hover:bg-[#34399B] text-white rounded-lg h-[52px] text-[16px] font-semibold mt-[6px]"
          disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin h-6 w-6 text-white" />
            : "Log into your Account"}
        </Button>

        <p className="text-center text-base text-gray-800 pt-[10px]">
          Are you new here?{" "}
          <a href="#" className="text-[#CC340E] font-medium hover:underline ml-1">
            Create Account
          </a>
        </p>{" "}
      </form>
    </div>
  );
}

export default LoginForm