import React, { useState, useEffect } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Logo, Input } from "./index";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, User, Mail, Lock, Shield, ArrowRight, Check, CheckCircle, XCircle, X } from "lucide-react";

const ModernPopup = ({ isVisible, type, title, message, onClose, autoClose = false, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration, onClose]);

  const popupVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.4,
      rotateX: -15,
      y: -100
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotateX: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.4,
      rotateX: 15,
      y: 100,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    }
  };

  const getPopupStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-white/95 dark:bg-gray-900/95',
          border: 'border-green-200 dark:border-green-800/50',
          iconBg: 'bg-gradient-to-br from-green-400 to-emerald-500',
          icon: <CheckCircle className="text-white" size={32} />,
          accentColor: 'from-green-400 to-emerald-500',
          titleColor: 'text-gray-900 dark:text-white',
          messageColor: 'text-gray-600 dark:text-gray-300',
          buttonColor: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
        };
      case 'error':
        return {
          bg: 'bg-white/95 dark:bg-gray-900/95',
          border: 'border-red-200 dark:border-red-800/50',
          iconBg: 'bg-gradient-to-br from-red-400 to-rose-500',
          icon: <XCircle className="text-white" size={32} />,
          accentColor: 'from-red-400 to-rose-500',
          titleColor: 'text-gray-900 dark:text-white',
          messageColor: 'text-gray-600 dark:text-gray-300',
          buttonColor: 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700'
        };
      default:
        return {
          bg: 'bg-white/95 dark:bg-gray-900/95',
          border: 'border-blue-200 dark:border-blue-800/50',
          iconBg: 'bg-gradient-to-br from-blue-400 to-indigo-500',
          icon: <CheckCircle className="text-white" size={32} />,
          accentColor: 'from-blue-400 to-indigo-500',
          titleColor: 'text-gray-900 dark:text-white',
          messageColor: 'text-gray-600 dark:text-gray-300',
          buttonColor: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
        };
    }
  };

  const styles = getPopupStyles();

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-sm"
              style={{ perspective: 1000 }}
            >
              <div className={`${styles.bg} ${styles.border} border-2 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden`}>
                <div className={`h-1.5 bg-gradient-to-r ${styles.accentColor}`} />
                
                <div className="p-8">
                  <motion.div
                    variants={iconVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-center mb-6"
                  >
                    <div className={`relative p-4 rounded-2xl ${styles.iconBg} shadow-lg`}>
                      <div className="absolute inset-0 bg-white/20 rounded-2xl" />
                      <div className="relative">
                        {styles.icon}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center space-y-4"
                  >
                    <h3 className={`text-2xl font-bold ${styles.titleColor}`}>
                      {title}
                    </h3>
                    <p className={`text-base ${styles.messageColor} leading-relaxed`}>
                      {message}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 flex gap-3"
                  >
                    {type === 'error' && (
                      <button
                        onClick={onClose}
                        className={`flex-1 ${styles.buttonColor} text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95`}
                      >
                        Try Again
                      </button>
                    )}
                    
                    {type === 'success' && !autoClose && (
                      <button
                        onClick={onClose}
                        className={`flex-1 ${styles.buttonColor} text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95`}
                      >
                        Continue to Login
                      </button>
                    )}
                    
                    <button
                      onClick={onClose}
                      className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      <X size={20} className="text-gray-500 dark:text-gray-400" />
                    </button>
                  </motion.div>

                  {autoClose && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6"
                    >
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                        <span>Auto-redirecting...</span>
                        <span>{Math.ceil(duration / 1000)}s</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${styles.accentColor} rounded-full`}
                          initial={{ width: '100%' }}
                          animate={{ width: '0%' }}
                          transition={{ duration: duration / 1000, ease: "linear" }}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm();
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [popup, setPopup] = useState({
    isVisible: false,
    type: 'success',
    title: '',
    message: ''
  });

  const showPopup = (type, title, message, autoClose = false) => {
    setPopup({
      isVisible: true,
      type,
      title,
      message
    });
    
    if (autoClose && type === 'success') {
      setTimeout(() => {
        setPopup(prev => ({ ...prev, isVisible: false }));
        navigate("/login");
      }, 4000);
    }
  };

  const closePopup = () => {
    setPopup(prev => ({ ...prev, isVisible: false }));
    if (popup.type === 'success') {
      navigate("/login");
    }
  };

  const create = async (data) => {
    setSubmitError("");
    setIsLoading(true);

    if (data.password !== data.confirmPassword) {
      setSubmitError("Passwords do not match");
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      setIsLoading(false);
      return;
    }

    try {
      const userAccount = await authService.createAccount(data);
      if (userAccount) {
        showPopup(
          'success',
          'Welcome Aboard! 🎉',
          'Please check your email to verify your account before logging in.',
          true
        );
      }
    } catch (error) {
      setSubmitError(error.message);
      showPopup(
        'error',
        'Registration Failed',
        error.message || 'An error occurred during registration. Please try again.',
        false
      );
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch("password");

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

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 0, text: "", color: "" },
      { strength: 1, text: "Very Weak", color: "bg-red-500" },
      { strength: 2, text: "Weak", color: "bg-orange-500" },
      { strength: 3, text: "Fair", color: "bg-yellow-500" },
      { strength: 4, text: "Good", color: "bg-blue-500" },
      { strength: 5, text: "Strong", color: "bg-green-500" }
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans">
      <ModernPopup
        isVisible={popup.isVisible}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={closePopup}
        autoClose={popup.type === 'success'}
        duration={4000}
      />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-pink-400/10"></div>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center py-8 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-lg mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="w-full"
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl"
                >
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium">{submitError}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(create)} className="space-y-6">
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
                    Create Account
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Start your journey with us today
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                    <User size={16} className="text-orange-500" />
                    Full Name
                  </label>
                  <div className="relative group">
                    <Input
                      name="name"
                      type="text"
                      required
                      {...register("name", {
                        required: "Full name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters"
                        }
                      })}
                      className={`w-full px-4 py-4 text-gray-900 dark:text-white bg-gray-50/50 dark:bg-gray-700/50 border-2 rounded-2xl transition-all duration-300 focus:border-orange-500 focus:bg-white dark:focus:bg-gray-700 focus:shadow-lg focus:shadow-orange-500/20 ${
                        errors.name ? 'border-red-400 focus:border-red-500' : 'border-gray-200 dark:border-gray-600'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-medium"
                    >
                      {errors.name.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                    <Mail size={16} className="text-orange-500" />
                    Email Address
                  </label>
                  <div className="relative group">
                    <Input
                      name="email"
                      type="email"
                      required
                      {...register("email", {
                        required: "Email is required",
                        validate: {
                          matchPattern: (value) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Please enter a valid email address",
                        },
                      })}
                      className={`w-full px-4 py-4 text-gray-900 dark:text-white bg-gray-50/50 dark:bg-gray-700/50 border-2 rounded-2xl transition-all duration-300 focus:border-orange-500 focus:bg-white dark:focus:bg-gray-700 focus:shadow-lg focus:shadow-orange-500/20 ${
                        errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 dark:border-gray-600'
                      }`}
                      placeholder="Enter your email"
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
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        }
                      })}
                      className={`w-full px-4 py-4 pr-12 text-gray-900 dark:text-white bg-gray-50/50 dark:bg-gray-700/50 border-2 rounded-2xl transition-all duration-300 focus:border-orange-500 focus:bg-white dark:focus:bg-gray-700 focus:shadow-lg focus:shadow-orange-500/20 ${
                        errors.password ? 'border-red-400 focus:border-red-500' : 'border-gray-200 dark:border-gray-600'
                      }`}
                      placeholder="Create a password"
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

                  {password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          {passwordStrength.text}
                        </span>
                      </div>
                    </motion.div>
                  )}

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

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                    <Shield size={16} className="text-orange-500" />
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <Input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: value => value === password || "Passwords do not match"
                      })}
                      className={`w-full px-4 py-4 pr-12 text-gray-900 dark:text-white bg-gray-50/50 dark:bg-gray-700/50 border-2 rounded-2xl transition-all duration-300 focus:border-orange-500 focus:bg-white dark:focus:bg-gray-700 focus:shadow-lg focus:shadow-orange-500/20 ${
                        errors.confirmPassword ? 'border-red-400 focus:border-red-500' : 'border-gray-200 dark:border-gray-600'
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} className="text-gray-500 dark:text-gray-400" />
                      ) : (
                        <Eye size={20} className="text-gray-500 dark:text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-medium"
                    >
                      {errors.confirmPassword.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => setAcceptedTerms(!acceptedTerms)}
                      className={`mt-0.5 w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                        acceptedTerms
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'border-gray-300 dark:border-gray-600 hover:border-orange-400'
                      }`}
                    >
                      {acceptedTerms && <Check size={12} />}
                    </button>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      I accept the{" "}
                      <Link
                        to="/terms"
                        className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors duration-200 hover:underline"
                      >
                        Terms and Conditions
                      </Link>
                      {" "}and{" "}
                      <Link
                        to="/privacy"
                        className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors duration-200 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading || !acceptedTerms}
                    className="relative w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-2">
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Create Account</span>
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </>
                      )}
                    </div>
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center pt-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors duration-200 hover:underline"
                    >
                      Sign in here
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

export default Signup;