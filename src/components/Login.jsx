import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    try {
      const session = await authService.login(data);

      if (session) {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Redirecting to the Dashboard page...",
          timer: 3000,
          showConfirmButton: false,
        });

        const userData = await authService.getCurrentUser();
        
        if (userData) {
          dispatch(authLogin(userData));

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

  return (
    <div className="flex items-center justify-center w-full p-8">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" className="justify-center" />
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold leading-tight text-shadow">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              className="hover-input"
              label={<strong>Email:</strong>}
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <div className="space-y-2">
              <Input
                className="hover-input"
                label={<strong>Password:</strong>}
                type="password"
                placeholder="Enter Your Password"
                {...register("password", {
                  required: true,
                })}
              />
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div className="mt-8">
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;