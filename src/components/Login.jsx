import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import useCooldown from "../hooks/useCoolDown";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { cooldown, startCooldown } = useCooldown(3); // 3 second cooldown


  const login = async (data) => {
    if (cooldown > 0) return; 
    setIsLoading(true);
    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(authLogin(userData));

          Swal.fire({
            icon: "success",
            title: "Welcome Back!",
            text: "Login successful. Redirecting to dashboard...",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            backdrop: `rgba(0,0,0,0.4)`,
            customClass: {
              popup: 'rounded-2xl shadow-2xl',
            }
          });

          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Authentication Failed",
        text: error.message || "Please check your credentials and try again.",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#f97316",
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
        }
      });
    } finally {
      setIsLoading(false);
      startCooldown(); 
    }
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans">

      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-pink-400/10"></div>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center py-8 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="w-full"
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
              <form onSubmit={handleSubmit(login)} className="space-y-6">

                <motion.div
                  variants={itemVariants}
                  className="flex justify-center mb-8"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl blur opacity-75"></div>
                    <div className="relative bg-white rounded-2xl p-4">
                      <Logo width="80" className="justify-center" />
                    </div>
                  </div>
                </motion.div>


                <motion.div variants={itemVariants} className="text-center space-y-2">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Welcome Back
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Sign in to continue your journey
                  </p>
                </motion.div>


                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                    <Mail size={16} className="text-orange-500" />
                    Email Address
                  </label>
                  <div className="relative group">
                    <Input
                      type="email"
                      required
                      className={`w-full px-4 py-4 text-gray-900 dark:text-white bg-gray-50/50 dark:bg-gray-700/50 border-2 rounded-2xl transition-all duration-300 focus:border-orange-500 focus:bg-white dark:focus:bg-gray-700 focus:shadow-lg focus:shadow-orange-500/20 ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 dark:border-gray-600'
                        }`}
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "Email is required",
                        validate: {
                          matchPattern: (value) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Please enter a valid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-medium"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </motion.div>


                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                    <Lock size={16} className="text-orange-500" />
                    Password
                  </label>
                  <div className="relative group">
                    <Input
                      type={showPassword ? "text" : "password"}
                      required
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        }
                      })}
                      className={`w-full px-4 py-4 pr-12 text-gray-900 dark:text-white bg-gray-50/50 dark:bg-gray-700/50 border-2 rounded-2xl transition-all duration-300 focus:border-orange-500 focus:bg-white dark:focus:bg-gray-700 focus:shadow-lg focus:shadow-orange-500/20 ${errors.password ? 'border-red-400 focus:border-red-500' : 'border-gray-200 dark:border-gray-600'
                        }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff size={20} className="text-gray-500 dark:text-gray-400" />
                      ) : (
                        <Eye size={20} className="text-gray-500 dark:text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-medium"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </motion.div>


                <motion.div variants={itemVariants} className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors duration-200 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </motion.div>


                <motion.div variants={itemVariants} className="pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading || cooldown > 0}
                    className="relative w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-2">
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>{cooldown > 0 ? `Wait ${cooldown}s` : "Sign In"}</span>
                          {cooldown === 0 && (
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                          )}
                        </>
                      )}

                    </div>
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center pt-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors duration-200 hover:underline"
                    >
                      Create one now
                    </Link>
                  </p>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
export default Login;

