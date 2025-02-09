import { useState } from "react";
import "./SignInUpForm.css";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const SignInUpForm = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //login
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


  // signup
  
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const create = async (data) => {
    setError("")
    try {
      const userData = await authService.createAccount(data)

      if (userData) {
        const userData = await authService.getCurrentUser()

        if (userData) dispatch(login(userData));

        // Show confirmation to log in or not
        Swal.fire({
          title: 'Account Created!',
          text: 'Would you like to log in now?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, log in',
          cancelButtonText: 'No, stay here',
        }).then((result) => {
          if (result.isConfirmed) {
            // Navigate to the login page if confirmed
            navigate('/login');
          } else {
            // You can navigate to a different page if needed or just stay on the current page
            navigate('/');
          }
        });
      }
    } catch (error) {
      setError(error.message)
      Swal.fire({
        icon: "error",
        title: "Registration Failed!",
        text: error.message || "An error occurred during registration.",
        confirmButtonText: "Try Again",
      });
    }
  }


  return (
    <div className="signup-signin-container">
      <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}>
        <div className="form-container sign-up-container">
          
        {error && <p className="text-red-600 dark:text-red-400 mt-8 text-center"> {error} </p>}
          <form onSubmit={handleSubmit(create)}>
            <h3>Create Account</h3>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" {...register("name", {
                required: true,
              })} />
            <input type="email" placeholder="Email" {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                },
              })} />
            <input type="password" placeholder="Password" {...register("password", {
                required: true,
              })} />
    <div className="terms-container">
  <input type="checkbox" required />
  <p>
    <Link to='/terms' className='terms'>Terms and conditions</Link>
  </p>
</div>

            <Button type="submit">Sign Up</Button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit(login)}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}/>
            <input type="password" placeholder="Password" {...register("password", {
                  required: true,
                })} />
            <a href="#">Forgot your password?</a>
            <Button type="submit">Sign In</Button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h3>Welcome Back!</h3>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(false)}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h3>Hello, Techie Bloger's!</h3>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default SignInUpForm;
