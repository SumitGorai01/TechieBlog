import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

function ForgotPassword() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    // cooldown countdown effect
    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const forgotPassword = async (data) => {
        if (cooldown > 0) return; // prevent extra clicks during cooldown
        setIsSubmitting(true);
        setCooldown(3); // start cooldown

        try {
            const session = await authService.resetPassword(data.email);

            if (session) {
                Swal.fire({
                    icon: "success",
                    title: "Reset Link Sent!",
                    text: "Please check your email for password reset instructions.",
                    timer: 3000,
                    showConfirmButton: false,
                    background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
                    color: document.documentElement.classList.contains('dark') ? '#f9fafb' : '#111827',
                    customClass: {
                        popup: 'rounded-2xl shadow-2xl border border-orange-100 dark:border-orange-900/20'
                    }
                });

                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Reset Failed!",
                text: error.message || "An error occurred while sending reset link.",
                confirmButtonText: "Try Again",
                background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
                color: document.documentElement.classList.contains('dark') ? '#f9fafb' : '#111827',
                confirmButtonColor: '#ea580c',
                customClass: {
                    popup: 'rounded-2xl shadow-2xl border border-red-100 dark:border-red-900/20'
                }
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-100 dark:bg-orange-900/10 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 dark:bg-orange-800/10 rounded-full blur-3xl opacity-40"></div>
            </div>

            <div className="relative w-full max-w-md">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20 dark:border-gray-700/50 hover:shadow-orange-500/10 transition-all duration-500">
                    
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl blur opacity-20"></div>
                            <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-2xl border border-orange-200/50 dark:border-orange-700/30">
                                <Logo width="60" className="justify-center filter brightness-110" />
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-3">
                            Reset Your Password
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                            Enter your email address and we'll send you a link to reset your password
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(forgotPassword)} className="space-y-6">
                        <div className="space-y-2">
                            <Input
                                label="Email Address"
                                placeholder="Enter your email address"
                                type="email"
                                className={`w-full px-4 py-3.5 bg-gray-50/50 dark:bg-gray-700/50 border ${
                                    errors.email 
                                        ? 'border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-500/20' 
                                        : 'border-gray-200 dark:border-gray-600 focus:border-orange-400 focus:ring-orange-500/20'
                                } rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-200 backdrop-blur-sm`}
                                {...register("email", {
                                    required: "Email address is required",
                                    validate: {
                                        matchPattern: (value) =>
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Please enter a valid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 dark:text-red-400 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col items-center">
                            <Button
                                type="submit"
                                disabled={isSubmitting || cooldown > 0}
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-400 disabled:to-orange-500 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-orange-500/25 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Sending Reset Link...
                                    </div>
                                ) : cooldown > 0 ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Send Reset Link
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Send Reset Link
                                    </div>
                                )}
                            </Button>
                            {cooldown > 0 && (
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Wait {cooldown}s
                                </p>
                            )}
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                        <p className="text-center text-gray-600 dark:text-gray-400">
                            Remember your password?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-200 hover:underline decoration-2 underline-offset-2"
                            >
                                Sign in instead
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
