import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import image from '../../src/assets/Computer.svg';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from './loaders/Loading';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data) => {
    try {
      setIsLoading(true);
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(authLogin(userData));

          Swal.fire({
            icon: "success",
            title: "Login Successful!",
            text: "Redirecting to the Dashboard page...",

            timer: 3000,
            showConfirmButton: false,
          });

          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: error.message || "An error occurred during login.",
        confirmButtonText: "Try Again",
      });
    }
  };
  if (isLoading) return <Loading />;
  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-2 px-4">
        <div className="grid md:grid-cols-2 items-center gap-2 max-w-6xl w-full">
          <motion.div 
            initial={{ opacity: 0, x: -100 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1 }}
            className="max-md:mt-8"
          >
            <img src={image} className="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover" alt="Dining Experience" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1 }}
            className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto"
          >
            <form onSubmit={handleSubmit(login)} className="space-y-4">
              <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                  <Logo width="100%" className="justify-center" />
                </span>
              </div>
              <div className="mb-8">
                <h3 className="text-orange-600 text-3xl font-bold">Sign in</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed dark:text-white">Sign in to your account and explore a world of possibilities. Your journey begins here.</p>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block dark:text-white">Email</label>
                <div className="relative flex items-center">
                  <Input name="username" type="email" required className="hover-input w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600" placeholder="Enter email" 
                    {...register("email", {
                      required: true,
                      validate: {
                        matchPattern: (value) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                          "Email address must be a valid address",
                      },
                    })}
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block dark:text-white">Password</label>
                <div className="relative flex items-center">
                  <Input name="password" type="password" required className="hover-input w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600" placeholder="Enter password" 
                    {...register("password", {
                      required: true,
                    })}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm">
                  <Link to="/forgot-password" className="text-sm text-primary dark:text-blue-400 hover:underline">Forgot Your Password?</Link>
                </div>
              </div>

              <div className="!mt-8">
                <Button type="submit" className="w-full bg-orange-600 dark:bg-blue-500 text-white hover:opacity-90 hover:shadow-lg active:scale-95 transition-all dark:shadow-blue-500/50 shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg hover:bg-blue-700 focus:outline-none">
                  Sign in
                </Button>
              </div>

              <p className="text-sm !mt-8 text-center text-gray-500 dark:text-white">Don't have an account?               
                <Link to="/signup" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap dark:text-blue-400 transition-all duration-200">
                  Register here
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login;
