import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const resetPassword = async (data) => {
        try {
            const userId = searchParams.get('userId');
            const secret = searchParams.get('secret');

            if (!userId || !secret) {
                throw new Error("Invalid reset password link. Please request a new one.");
            }
            
            const session = await authService.completeReset(
                userId,
                secret,
                data.password,
            );
            
            if (session) {
                Swal.fire({
                    icon: "success",
                    title: "Password Reset Successful!",
                    text: "You can now login with your new password",
                    timer: 3000,
                    showConfirmButton: false,
                });

                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
        } catch (error) {
            console.error("Reset password error:", error);
            Swal.fire({
                icon: "error",
                title: "Reset Failed!",
                text: error.message || "An error occurred while resetting password.",
                confirmButtonText: "Try Again",
            });
        }
    };

    // Password validation function
    const validatePassword = (value) => {
        if (value.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/\d/.test(value)) {
            return "Password must contain at least one number";
        }
        if (!/[a-z]/.test(value)) {
            return "Password must contain at least one lowercase letter";
        }
        if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
        }
        return true;
    };

    return (
        <div className="flex items-center justify-center w-full p-8">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" className="justify-center" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Set New Password
                </h2>

                <form onSubmit={handleSubmit(resetPassword)} className="mt-8">
                    <div className="space-y-5">
                        <div>
                            <Input
                                label="New Password :"
                                type="password"
                                placeholder="Enter new password"
                                {...register("password", {
                                    required: "Password is required",
                                    validate: validatePassword
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Input
                                label="Confirm Password :"
                                type="password"
                                placeholder="Confirm new password"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (val) => {
                                        if (watch('password') != val) {
                                            return "Passwords do not match";
                                        }
                                    },
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                        <Button type="submit" className="w-full">
                            Reset Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;