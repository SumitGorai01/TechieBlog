import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "../components/index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Loading from "../components/loaders/Loading.jsx";

function ChangePassword() {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const changePassword = async (data) => {
        try {
            setLoading(true);
            const session = await authService.changePassword(
                data.oldPassword,
                data.newPassword,
            );

            if (session) {
                Swal.fire({
                    icon: "success",
                    title: "Password Change Successful!",
                    text: "Your password has been changed successfully",
                    timer: 2000,
                    showConfirmButton: false,
                });

                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        } catch (error) {
            console.error("Change password error:", error);
            Swal.fire({
                icon: "error",
                title: "Change Failed!",
                text: error.message || "An error occurred while changing password.",
                confirmButtonText: "Try Again",
            });
        } finally {
            setLoading(false);
        }
    };

    const validatePassword = (value) => {
        if (value.length < 8) return "Password must be at least 8 characters long";
        if (!/\d/.test(value)) return "Password must contain at least one number";
        if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
        if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
        return true;
    };

    return (
        <div className="flex items-center justify-center w-full p-8">
            <div className="mx-auto w-full max-w-lg bg-gray-100 dark:bg-gray-800 rounded-xl p-10 border border-black/10 dark:border-gray-700">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" className="justify-center" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                    Change Password
                </h2>

                {loading ? (
                    <Loading />
                ) : (
                    <form onSubmit={handleSubmit(changePassword)} className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label className="inline-block mb-1 pl-1 font-medium text-gray-700 dark:text-gray-300">
                                    Old Password
                                </label>
                                <Input
                                    type="password"
                                    placeholder="Enter your current password"
                                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                                    {...register("oldPassword", {
                                        required: "Old password is required",
                                    })}
                                />
                                {errors.oldPassword && (
                                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                                        {errors.oldPassword.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="inline-block mb-1 pl-1 font-medium text-gray-700 dark:text-gray-300">
                                    New Password
                                </label>
                                <Input
                                    type="password"
                                    placeholder="Create a new strong password"
                                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                                    {...register("newPassword", {
                                        required: "New password is required",
                                        validate: validatePassword
                                    })}
                                />
                                {errors.newPassword && (
                                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                                        {errors.newPassword.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="inline-block mb-1 pl-1 font-medium text-gray-700 dark:text-gray-300">
                                    Confirm Password
                                </label>
                                <Input
                                    type="password"
                                    placeholder="Re-enter new password"
                                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: (val) =>
                                            val === watch('newPassword') || "Passwords do not match",
                                    })}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            <Button type="submit" className="w-full">
                                Change Password
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ChangePassword;
