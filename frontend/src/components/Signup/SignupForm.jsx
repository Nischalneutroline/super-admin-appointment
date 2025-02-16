import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

// Icons
import { FaRegEye } from "react-icons/fa6"
import { FaRegEyeSlash } from "react-icons/fa6"
import { MdOutlineError } from "react-icons/md"

// React Hook Form
import { useForm } from "react-hook-form"

const SignupForm = () => {
  // Auth Error State
  const [authError, setAuthError] = useState("")

  // Password visibility state
  const [showPassword, setShowPassword] = React.useState(false)

  // React hook form
  // handleSubmit() is the callback for customer handleSubmit function
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" })

  // Submit handler
  const onSubmit = (data) => {
    console.log(data)
    setAuthError("") // Reset any previous errors

    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      return setAuthError("Password doesn't match!")
    }

    // Check if all fields are filled
    if (
      !data.fullName ||
      !data.email ||
      !data.phone ||
      !data.password ||
      !data.confirmPassword
    ) {
      return setAuthError("All fields are required!")
    }

    // If validation passes, proceed with success toast
    toast.success("Account has been created successfully!")

    return reset()
  }

  useEffect(() => {
    errors
  }, [errors])

  return (
    <div className="relative flex flex-col max-w-sm ">
      {/*------------ Heading */}
      <div>
        <p className="text-xl font-bold">SUPER ADMIN SINGUP</p>
        <p className="font-light text-[#575757] ">Please enter your details!</p>
      </div>

      {/*------------- Form */}

      <form className="space-y-4 mt-5" onSubmit={handleSubmit(onSubmit)}>
        {/* +++++++++ Full Name */}
        <div className="flex flex-col gap-0.5">
          <label className="flex justify-start ml-2" htmlFor="name">
            Full Name
          </label>
          <input
            className="h-12 border border-[#e2e2e2] focus:border-[#b5b5b5] rounded-lg shadow-sm focus:shadow-md placeholder:text-sm pl-4 focus:outline-none focus:placeholder-transparent transition-all duration-300 "
            type="name"
            name="name"
            id="name"
            {...register("fullName", { required: "Full Name is required!" })}
            placeholder="Enter your full name"
          />
          {/* Error */}
          {errors.fullName && (
            <p className="text-xs text-red-600 text-start pl-2">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* ++++++ Email */}
        <div className="flex flex-col gap-0.5">
          <label className=" flex justify-start ml-2" htmlFor="email">
            Email
          </label>
          <input
            className="h-12 border border-[#e2e2e2] focus:border-[#b5b5b5] rounded-lg shadow-sm focus:shadow-md placeholder:text-sm pl-4 focus:outline-none focus:placeholder-transparent transition-all duration-300 "
            type="email"
            name="email"
            id="email"
            {...register("email", { required: "Email is required!" })}
            placeholder="Enter your email"
          />
          {/* Error Message */}
          {errors.email && (
            <p className="text-xs text-red-600 text-start pl-2">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* +++++++++ Phone no */}
        <div className="flex flex-col gap-0.5">
          <label className="flex justify-start ml-2" htmlFor="phone">
            Phone
          </label>
          <input
            className="h-12 border border-[#e2e2e2] focus:border-[#b5b5b5] rounded-lg shadow-sm focus:shadow-md placeholder:text-sm pl-4 focus:outline-none focus:placeholder-transparent transition-all duration-300 "
            type="phone"
            name="phone"
            id="phone"
            {...register("phone", { required: "Phone is required!" })}
            placeholder="(123) 456-7890)"
          />
          {/* Error Message */}
          {errors.phone && (
            <p className="text-xs text-red-600 text-start pl-2">
              {errors.phone.message}
            </p>
          )}
        </div>
        {/* +++++++++ Password */}
        <div className="flex flex-col gap-0.5">
          <label className="flex justify-start" htmlFor="password">
            Password
          </label>
          <div className="relative ">
            <input
              className="w-full h-12 border border-[#e2e2e2] focus:border-[#b5b5b5] rounded-lg shadow-sm focus:shadow-md placeholder:text-sm pl-4 focus:outline-none focus:placeholder-transparent transition-all duration-300 "
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long!",
                },
                required: "Password is required!",
              })}
              placeholder="Enter your password"
            />
            {/* Eye Icon */}
            <span
              className="absolute top-4 right-2 opacity-50"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>

            {/* Error Message */}
            {errors.password && (
              <p className="text-xs text-red-600 text-start pl-2">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        {/* +++++++++ Confirm Password */}
        <div className="flex flex-col gap-0.5">
          <label className=" flex justify-start ml-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="h-12 border border-[#e2e2e2] focus:border-[#b5b5b5] rounded-lg shadow-sm focus:shadow-md placeholder:text-sm pl-4 focus:outline-none focus:placeholder-transparent transition-all duration-300 "
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            {...register("confirmPassword", {
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long!",
              },
              required: "Confirm Password is required!",
            })}
            placeholder="Confrim password"
          />
          {/* Error Message */}
          {errors.confirmPassword && (
            <p className="text-xs text-red-600 text-start pl-2">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* ++++++++++ Sign up Button */}
        <div>
          {authError && (
            <p className="text-sm text-red-600 text-left flex gap-1 items-center">
              <MdOutlineError />
              {authError}
            </p>
          )}
          <button
            type="submit"
            className="h-12 w-full bg-blue-600 rounded-lg text-white hover:opacity-90 hover:cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md active:scale-98 active:translate-y-1 "
            // disabled={!isValid}
          >
            Sign up
          </button>
        </div>
      </form>

      {/* ---------- Aggrement || admin sign in */}
      <div className="space-y-2 mt-1">
        <p className="text-xs">
          By signing up, you agree to the Neutroline User Agreement, Privacy
          Policy, and Cookie Policy.
        </p>
        {/* ++++++++++ Sign up Link */}
        <div className="flex justify-center gap-1">
          <p>Already have an account?</p>
          <Link to="/signin" className="text-blue-600 font-semibold">
            Sign in
          </Link>
        </div>
        {/* +++++++++++++ Admin Sign in */}
        <Link
          to="/signin"
          className="text-blue-600 font-medium hover:underline"
        >
          Admin Sign in
        </Link>
      </div>
    </div>
  )
}

export default SignupForm
