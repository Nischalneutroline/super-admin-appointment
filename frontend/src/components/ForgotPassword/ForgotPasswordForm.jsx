import React, { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

// Icons
import { FaRegEye } from "react-icons/fa6"
import { FaRegEyeSlash } from "react-icons/fa6"

// React hook form
import { set, useForm } from "react-hook-form"

//Error and Success Message
import ErrorMessage from "../../shared/ErrorMessage"
import SuccessMessage from "../../shared/SuccessMessage"
import cn from "../../utils/cn"

const ForgotPasswordForm = () => {
  // Track Email and Code Valid
  const [validEmail, setValidEmail] = useState(false)
  const [validCode, setValidCode] = useState(false)
  // Auth Error State
  const [authError, setAuthError] = useState("")
  const [authSuccess, setAuthSuccess] = useState("")

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = React.useState({
    email: "",
    code: "",
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
    setAuthError("")
    setAuthSuccess("")
    console.log(formData)

    // Form Input validation
    if (!formData.email) {
      setAuthError("Please enter your email!")
      return
    }

    if (!validEmail) {
      // TODO:
      // is email is invalide
      // check email in db and set send code to email
      // setisValid to true and authSuccess message

      setValidEmail(true)

      // Success message
      setAuthSuccess("Verification Code has been sent to you email!")
    }

    if (validEmail) {
      setValidCode(true)

      // TODO:
      // if email is valid
      // check for the both code and email in db
      // set the validcode and email to true
      // remove the code from db
    }
  }

  // Once validation of email and code is done open this
  if (validEmail && validCode) {
    return (
      <div className="relative flex flex-col justify-center min-w-sm ">
        {/*------------ Heading */}
        <div>
          <p className="text-xl font-bold">NEW PASSWORD</p>
          <p className="font-light text-[#575757] ">
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
                className={cn(
                  "w-full h-12 border border-[#e2e2e2] focus:border-[#b5b5b5] rounded-lg shadow-sm focus:shadow-md placeholder:text-sm pl-4 focus:outline-none focus:placeholder-transparent transition-all duration-300 ",
                  errors.password && "border-red-600"
                )}
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
              className={cn(
                "w-full h-12 border border-[#e2e2e2] focus:border-[#b5b5b5] rounded-lg shadow-sm focus:shadow-md placeholder:text-sm pl-4 focus:outline-none focus:placeholder-transparent transition-all duration-300 ",
                errors.password && "border-red-600"
              )}
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
          </div>

          {/* ++++++++++ Reset Button */}
          <div className="h-20 flex flex-col gap-2">
            {authError && <ErrorMessage message={authError} />}
            {authSuccess && <SuccessMessage message={authSuccess} />}
            <button
              type="submit"
              className="mt-auto h-12 w-full bg-blue-600 rounded-lg text-white hover:opacity-90 hover:cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md active:scale-98 active:translate-y-1 "
              // disabled={!isValid}
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
    <div className="px-2 relative flex flex-col justify-center md:min-w-sm ">
      {" "}
      {/*------------ Heading */}
      <div>
        <p className="text-xl font-bold">FORGOT PASSWORD?</p>
        <p className="font-light text-[#575757] ">Please enter your email!</p>
      </div>
      {/*------------- Form */}
      <form className="space-y-6 mt-6" onSubmit={onSubmitEmail}>
        {/* ++++++ Email */}
        <div className="flex flex-col gap-0.5">
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
        </div>{" "}
        {/* ++++++ Verification Code */}
        {validEmail && (
          <div className="flex flex-col gap-0.5">
            <label className="flex justify-start ml-2" htmlFor="code">
              Verification Code
            </label>
            <input
              className="h-12 rounded-lg shadow-sm placeholder:text-sm pl-4 focus:outline-none focus:placeholder-transparent  "
              type="text"
              name="code"
              id="code"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              placeholder="Enter your email"
            />
          </div>
        )}
        {/* ++++++++++ Reset Button */}
        <div className="h-20 flex flex-col gap-2">
          {authError && <ErrorMessage message={authError} />}
          {authSuccess && <SuccessMessage message={authSuccess} />}
          <button
            type="submit"
            className="mt-auto h-12 w-full bg-blue-600 rounded-lg text-white hover:opacity-90 hover:cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md active:scale-98 active:translate-y-1 "
            // disabled={!isValid}
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
