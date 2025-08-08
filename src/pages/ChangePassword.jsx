import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "../components/index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function ChangePassword() {
   const navigate = useNavigate();
   const { register, handleSubmit, watch, formState: { errors } } = useForm();

   const changePassword = async (data) => {
       try {
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
                   background: '#1f2937',
                   color: '#f9fafb',
                   iconColor: '#f97316',
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
               background: '#1f2937',
               color: '#f9fafb',
               confirmButtonColor: '#f97316',
           });
       }
   };

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
       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
           <div className="w-full max-w-md">
               <div className="text-center mb-8">
                   <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mb-4 shadow-lg">
                       <Logo width="32" className="text-white" />
                   </div>
                   <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                       Change Password
                   </h1>
                   <p className="text-gray-600 dark:text-gray-400">
                       Secure your account with a new password
                   </p>
               </div>

               <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 dark:border-gray-700 p-8">
                   <form onSubmit={handleSubmit(changePassword)} className="space-y-6">
                       <div className="group">
                           <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                               Current Password
                           </label>
                           <div className="relative">
                               <Input
                                   type="password"
                                   placeholder="Enter your current password"
                                   className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-900/50 transition-all duration-200 outline-none"
                                   {...register("oldPassword", {
                                       required: "Current password is required",
                                   })}
                               />
                               {errors.oldPassword && (
                                   <div className="absolute -bottom-6 left-0 flex items-center text-red-500 dark:text-red-400 text-xs font-medium">
                                       <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                           <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                       </svg>
                                       {errors.oldPassword.message}
                                   </div>
                               )}
                           </div>
                       </div>

                       <div className="group">
                           <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                               New Password
                           </label>
                           <div className="relative">
                               <Input
                                   type="password"
                                   placeholder="Enter your new password"
                                   className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-900/50 transition-all duration-200 outline-none"
                                   {...register("newPassword", {
                                       required: "New password is required",
                                       validate: validatePassword
                                   })}
                               />
                               {errors.newPassword && (
                                   <div className="absolute -bottom-6 left-0 flex items-center text-red-500 dark:text-red-400 text-xs font-medium">
                                       <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                           <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                       </svg>
                                       {errors.newPassword.message}
                                   </div>
                               )}
                           </div>
                       </div>

                       <div className="group">
                           <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                               Confirm New Password
                           </label>
                           <div className="relative">
                               <Input
                                   type="password"
                                   placeholder="Confirm your new password"
                                   className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-900/50 transition-all duration-200 outline-none"
                                   {...register("confirmPassword", {
                                       required: "Please confirm your password",
                                       validate: (val) => {
                                           if (watch('newPassword') != val) {
                                               return "Passwords do not match";
                                           }
                                       },
                                   })}
                               />
                               {errors.confirmPassword && (
                                   <div className="absolute -bottom-6 left-0 flex items-center text-red-500 dark:text-red-400 text-xs font-medium">
                                       <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                           <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                       </svg>
                                       {errors.confirmPassword.message}
                                   </div>
                               )}
                           </div>
                       </div>

                       <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
                           <h4 className="text-sm font-semibold text-orange-800 dark:text-orange-300 mb-2">
                               Password Requirements:
                           </h4>
                           <ul className="text-xs text-orange-700 dark:text-orange-400 space-y-1">
                               <li className="flex items-center">
                                   <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                   </svg>
                                   At least 8 characters long
                               </li>
                               <li className="flex items-center">
                                   <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                   </svg>
                                   Contains uppercase & lowercase letters
                               </li>
                               <li className="flex items-center">
                                   <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                   </svg>
                                   Contains at least one number
                               </li>
                           </ul>
                       </div>

                       <Button 
                           type="submit" 
                           className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-700"
                       >
                           <span className="flex items-center justify-center">
                               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                               </svg>
                               Update Password
                           </span>
                       </Button>
                   </form>

                   <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                       <button
                           onClick={() => navigate("/")}
                           className="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 font-medium transition-colors duration-200"
                       >
                           ← Back to Dashboard
                       </button>
                   </div>
               </div>
           </div>
       </div>
   );
}

export default ChangePassword;