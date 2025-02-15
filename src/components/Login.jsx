import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import image from '../../src/assets/Computer.svg'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    try {
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

  return (
    <div class="font-[sans-serif]">
      <div class="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div class="grid md:grid-cols-2 items-center gap-2 max-w-6xl w-full">
        <div class="max-md:mt-8">
            <img src={image} class="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover" alt="Dining Experience" />
          </div>
          <div class="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form onSubmit={handleSubmit(login)}  class="space-y-4">
            <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" className="justify-center" />
          </span>
        </div>
              <div class="mb-8">
                <h3 class="text-orange-600 text-3xl font-bold">Sign in</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed dark:text-white">Sign in to your account and explore a world of possibilities. Your journey begins here.</p>
              </div>

              <div>
                <label class="text-gray-800 text-sm mb-2 block dark:text-white">Email</label>
                <div class="relative flex items-center">
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
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>
              <div>
                <label class="text-gray-800 text-sm mb-2 block dark:text-white">Password</label>
                <div class="relative flex items-center">
                  <Input name="password" type="password" required className="hover-input w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-orange-600" placeholder="Enter password" 
                   {...register("password", {
                    required: true,
                  })}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-4">
               
                <div class="text-sm">
                  <Link
                  to="/forgot-password"
                  className="text-sm text-primary dark:text-blue-400 hover:underline"
                >
                  Forgot Your Password?
                </Link>
                </div>
              </div>

              <div class="!mt-8">
                <Button type="submit" className="w-full l bg-orange-600 dark:bg-blue-500 text-white hover:opacity-90 hover:shadow-lg active:scale-95 transition-all dark:shadow-blue-500/50 shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg hover:bg-blue-700 focus:outline-none">
                  Sign in
                </Button>
              </div>

              <p class="text-sm !mt-8 text-center text-gray-500 dark:text-white">Don't have an account ?              
              <Link
            to="/signup"
            className="text-blue-600  font-semibold hover:underline ml-1 whitespace-nowrap dark:text-blue-400 transition-all duration-200"
          >
            Register here
          </Link>
              </p>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Login;