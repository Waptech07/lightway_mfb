import React from "react";
import Logo from "@/assets/logo.svg";
import { useForm, type SubmitHandler, } from 'react-hook-form';
import { useCustomMutation } from "@/hooks/useCustomQuery";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
type ForgotPasswordFormValueType = {
  username: string;
}
const ForgotPasswordForm = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { formState: { errors }, register, handleSubmit } = useForm<ForgotPasswordFormValueType>();
  //remember to change to appropriate route later and add error handler tomorrow
  const { mutate, isPending } = useCustomMutation<ForgotPasswordFormValueType, any>({ url: "auth/login", key: "login", });
  const onSubmit: SubmitHandler<ForgotPasswordFormValueType> = (data) => {
    mutate(data, {
      onError(error) {
        toast(`${error}`);
      },
    });
  };

  return (
    // min-h-screen
    <div className="flex flex-col items-start max-md:justify-center max-md:h-screen px-8 font-sans">
      {/* Logo */}

      <div className="mb-8">
        <img src={Logo} alt="Lightway MFB" className="h-10" />
      </div>

      {/* Back Button */}
      <button
        type="button" onClick={() => navigate(-1)}
        className="flex items-center space-x-2 mb-8 text-black border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
      >
        <span className="text-lg">←</span>
        <span>Back</span>
      </button>

      {/* Form */}
      <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-bold mb-2">Reset your Password</h1>
        <p className="text-gray-500 mb-8">
          Enter your correct email and we will send the process to your email
        </p>
        <div className="mb-8">
          <Label htmlFor="username" className="block mb-2 text-left font-medium">
            Username
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">@</span>
            <Input
              id="username"
              type="text"
              placeholder="enoobong_george"
              {...register("username", {
                required: 'Please enter your username',
                validate: (value) => {
                  if (value.length < 5 || value.length > 30) return "Username must be between 3-30 characters";
                }
              })}
              className="w-full pl-8 py-3 border border-blue-900 rounded outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
         {errors.username && <p className="text-red text-left pt-2">{errors.username.message}</p>}
        </div>  <Button
          type="submit" disabled={isPending}
          className="w-full bg-blue-900 text-white py-6 rounded hover:bg-blue-800 transition"
        >

          {!isPending ? "Send Password Reset Email" :
            <Loader2 className="animate-spin h-6 w-6 text-white" />
          }
        </Button>
      </form>
    </div>
  );
}

export default ForgotPasswordForm