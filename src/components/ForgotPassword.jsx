import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

function ForgotPassword() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const [cooldown, setCooldown] = useState(20); // since emails take time to appear

    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setInterval(() => {
                setCooldown((prev) => {
                    if (prev <= 1) clearInterval(timer);
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [cooldown]);

    const forgotPassword = async (data) => {
        setIsLoading(true);
        try {
            const session = await authService.resetPassword(data.email);

            if (session) {
                Swal.fire({
                    icon: "success",
                    title: "Reset Link Sent!",
                    text: "Please check your email for password reset instructions.",
                    timer: 3000,
                    showConfirmButton: false,
                });

                setCooldown(30); // Set cooldown (30 seconds)
                setTimeout(() => navigate("/login"), 3000);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Reset Failed!",
                text: error.message || "An error occurred while sending reset link.",
                confirmButtonText: "Try Again",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-full p-8 bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto w-full max-w-lg bg-gray-100 dark:bg-gray-800 rounded-xl p-10 border border-black/10 dark:border-gray-700">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" className="justify-center" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100">
                    Reset Your Password
                </h2>
                <p className="mt-2 text-center text-base text-black/60 dark:text-gray-400">
                    Remembered your password?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary dark:text-orange-400 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                <form onSubmit={handleSubmit(forgotPassword)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Email :"
                            placeholder="Enter your email"
                            type="email"
                            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-orange-400"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                },
                            })}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading || cooldown > 0}
                            className="w-full bg-primary dark:bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-dark dark:hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-orange-400 transition-all"
                        >
                            {isLoading
                                ? "Sending..."
                                : cooldown > 0
                                ? `Wait ${cooldown}s`
                                : "Send Reset Link"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
