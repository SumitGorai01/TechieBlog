import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Logo, Input } from './index'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Swal from "sweetalert2";

function Signup() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const create = async (data) => {
    setError("")
    try {
      const userData = await authService.createAccount(data)

    //   Swal.fire({
    //     icon: "success",
    //     title: "Registration Successful!",
    //     text: "Redirecting to the Dashboard page...",
    //     timer: 3000, // Auto-close after 3 seconds
    //     showConfirmButton: false,
    //   });

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
    <div className='flex items-center justify-center'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%' className="justify-center" />
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold leading-tight text-shadow">Sign up to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center"> {error} </p>}

        <form onSubmit={handleSubmit(create)}
          className="mt-8"
        >
          <div className='space-y-5'>
            <Input
              className="hover-input"
              label={<strong>Full Name:</strong>}
              placeholder="Enter your full Name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              className="hover-input"
              label={<strong>Email:</strong>}
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                }
              })}
            />
            <Input
              className="hover-input"
              label={<strong>Password:</strong>}
              type="password"
              placeholder="Enter Your Password "
              {
                ...register("password", {
                  required: true,
                })
              }
            />
            <Button
              type="submit"
              className="w-full"
            >Create Account</Button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Signup
