import React from 'react'
import Logo from "@/assets/logo.svg";
import { useForm, type SubmitHandler, } from 'react-hook-form';
import { useCustomMutation } from "@/hooks/useCustomQuery";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Lock, Check, X } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { Loader2 } from "lucide-react";
const ResetPasswordForm = (): React.JSX.Element => {
    type ResetPasswordType = {
        password: string;
        confirmPassword: string
    }

    const navigate = useNavigate();
    const { formState: { errors }, register, handleSubmit, watch } = useForm<ResetPasswordType>();
    
    //remember to change to appropriate route later and add error handler tomorrow
    const { mutate, isPending } = useCustomMutation<ResetPasswordType, any>({ url: "auth/reset-password", key: "reset-password", });
    const password = watch("password") || "";

    const onSubmit: SubmitHandler<ResetPasswordType> = (data) => {
        mutate(data, {
            onSuccess() {
                // ✅ Better UX on success
                toast.success("Password updated successfully");
                navigate("/login");
            },
            onError(error) {
                // ✅ More robust error handling
                toast.error(error?.response?.data?.message || "Something went wrong");
            },
        });
    };

    const rules = [
        { label: "1 Uppercase", test: /[A-Z]/.test(password) },
        { label: "1 Lowercase", test: /[a-z]/.test(password) },
        { label: "1 Number", test: /[0-9]/.test(password) },
        { label: "1 Special Character", test: /[^A-Za-z0-9]/.test(password) },
        { label: "Password is Over 8 Characters", test: password.length > 8 },
    ];
    return (
        <div className='max-md:py-4 text-left'>
            {/* Logo */}

            <div className="mb-8">
                <img src={Logo} alt="Lightway MFB" className="h-10" />
            </div>

            {/* Back button */}
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

                <div>
                    <Label
                        htmlFor="password"
                        className="block mb-2.5 text-[15px] font-medium text-left"
                    >
                        Password
                    </Label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                            <label htmlFor="password">
                                <Lock size={18} />
                            </label>
                        </span>
                        <Input
                            id="password"
                            type="password"
                            placeholder="********"
                            {...register("password", {
                                required: "Please enter your password.", maxLength: {
                                    value: 20, message: "Password must have atleast 8-20 characters"
                                }, minLength: {
                                    value: 8, message: "Password must have atleast 8-20 characters"
                                }
                            })}
                            className="pl-11 h-[50px] border-2 border-[#0B0B75] rounded-lg text-left"
                        />
                    </div>
                    <p className="text-red">{errors.password?.message}</p>

                </div>
                <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    {rules.map((rule) => (
                        <span
                            key={rule.label}
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${rule.test
                                ? "bg-green-100 text-green-700 border-green-400"
                                : "bg-red-100 text-red-700 border-red-400"
                                }`}
                        >
                            {rule.test ? <Check size={14} /> : <X size={14} />}
                            {rule.label}
                        </span>
                    ))}
                </div>
                <div className='mb-8'>
                    <Label
                        htmlFor="confirmPassword"
                        className="block mb-3 text-[15px] font-medium text-left"
                    >
                        Confirm Password</Label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                            <label htmlFor="confirmPassword">
                                <Lock size={18} />
                            </label>
                        </span>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="********"
                            className="pl-11 h-12.5 border-2 border-[#0B0B75] rounded-lg text-left"
                            {...register("confirmPassword", {
                                validate: (value) => {
                                    if (value != password) {
                                        return "Password and confirm Password must be equal"
                                    }
                                }
                            })}
                        />
                    </div>
                    <p className="text-red">{errors.confirmPassword?.message}</p>

                </div>
                {/* // className="w-full pl-8 py-3 " */}
                <button
                    type="submit" disabled={isPending}
                    className="w-full bg-blue-900 text-white py-3 rounded hover:bg-blue-800 transition"
                >
                    {isPending ? (
                        <Loader2 className="animate-spin h-6 w-6 text-white mx-auto" />
                    ) : (
                        "Confirm Password Change"
                    )}</button>
            </form>
        </div>
    )
}

export default ResetPasswordForm