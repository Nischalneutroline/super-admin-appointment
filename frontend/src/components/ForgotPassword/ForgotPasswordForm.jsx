import React, { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

// Icons
import { FaRegEye } from "react-icons/fa6"
import { FaRegEyeSlash } from "react-icons/fa6"
import { MdOutlineError } from "react-icons/md"

// React hook form
import { useForm } from "react-hook-form"

const ForgotPasswordForm = () => {
  // Track Email and Code Valid
  const [validEmail, setValidEmail] = useState(false)
  const [validCode, setValidCode] = useState(false)
  // Auth Error State
  const [authError, setAuthError] = useState("")

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = React.useState({
    email: "",
  })

  // React hook form
  // handleSubmit() is the callback for customer handleSubmit function
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" })

  const onSubmitPassword = (data) => {
    console.log(data)
    setAuthError("") // Reset any previous errors

    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      return setAuthError("Password doesn't match!")
    }

    // Check if all fields are filled
    if (!data.password || !data.confirmPassword) {
      return setAuthError("All fields are required!")
    }

    // If validation passes, proceed with success toast
    toast.success("Password has been changed successfully!")

    return reset()
  }

  // Email Check Submit handler
  // TODO: Add validation
  // send code to email
  // open the code field
  // end the code and email for validation
  // if validation passes, proceed with new password form
  const onSubmitEmail = (e) => {
    e.preventDefault()
    console.log(formData)

    // Form Input validation
    if (!formData.email) {
      toast.error("Please enter your email!")
      return
    }

    // Success message
    toast.success("Reset Link has been sent to you email!")

    //Clear form data
    setFormData({ email: "" })
  }

  // Once validation of email and code is done open this
  if (validEmail && validCode) {
    return (
      <div className="relative flex flex-col min-w-sm ">
        {/*------------ Heading */}
        <div>
          <p className="m-[-5px] text-[18px]  tracking-wide font-[650] font-sans">
            New Password
          </p>
          <p
            className="m-2.5 text-[13px] tracking-normal font-[50] font-sans text-[#575757] "
            style={{
              fontStyle: "normal",
              fontWeight: "400",
            }}
          >
            Please enter your new password!
          </p>
        </div>

        {/*------------- Form */}

        <form
          className="space-y-6 mt-6"
          onSubmit={handleSubmit(onSubmitPassword)}
        >
          {/* ++++++ Email */}

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
            <label
              className=" flex justify-start ml-2"
              htmlFor="confirmPassword"
            >
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
              className="h-12 w-full bg-blue-600 rounded-lg text-white hover:opacity-90 hover:cursor-pointer transition-all duration-200 shadow-sm active:scale-98 active:translate-y-1"
            >
              Reset
            </button>
          </div>
        </form>

        {/* ---------- Link to sign up || admin sign in */}
        <div className="space-y-4 mt-5 ">
          {/* ++++++++++ Sign up Link */}
          <div className="flex justify-center gap-2">
            <p>Don't have an account?</p>
            <Link to="/signup" className="text-blue-600 font-semibold">
              Sign up
            </Link>
          </div>

          {/* +++++++++++++ Admin Sign in */}

          {/* <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Admin Sign in
          </Link> */}
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex flex-col min-w-sm ">
      {/*------------ Heading */}
      <div>
        <p className="m-[-5px] text-[18px]  tracking-wide font-[650] font-sans">
          FORGOT PASSWORD?
        </p>
        <p
          className="m-2.5 text-[13px] tracking-normal font-[50] font-sans text-[#575757] "
          style={{
            fontStyle: "normal",
            fontWeight: "400",
          }}
        >
          Please enter your email!
        </p>
      </div>

      {/*------------- Form */}

      <form className="space-y-6 mt-6" onSubmit={onSubmitEmail}>
        {/* ++++++ Email */}
        <div className="flex flex-col gap-1">
          <label className="flex justify-start ml-2" htmlFor="email">
            Email
          </label>
          <input
            className="h-12 rounded-lg shadow-sm placeholder:text-sm pl-4 focus:outline-none focus:placeholder-transparent  "
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter your email"
          />
        </div>

        {/* ++++++++++ Sign up Button */}
        <div>
          <button
            type="submit"
            className="h-12 w-full bg-blue-600 rounded-lg text-white hover:opacity-90 hover:cursor-pointer transition-all duration-200 shadow-sm active:scale-98 active:translate-y-1"
          >
            Reset
          </button>
        </div>
      </form>

      {/* ---------- Link to sign up || admin sign in */}
      <div className="space-y-4 mt-5 ">
        {/* ++++++++++ Sign up Link */}
        <div className="flex justify-center gap-2">
          <p>Don't have an account?</p>
          <Link to="/signup" className="text-blue-600 font-semibold">
            Sign up
          </Link>
        </div>

        {/* +++++++++++++ Admin Sign in */}

        {/* <Link
          to="/signup"
          className="text-blue-600 font-medium hover:underline"
        >
          Admin Sign in
        </Link> */}
      </div>
    </div>
  )
}

export default ForgotPasswordForm
