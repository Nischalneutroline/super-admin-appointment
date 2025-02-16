import React, { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

// Icons
import { MdOutlineError } from "react-icons/md"

const SigninForm = () => {
  // Auth Error State
  const [authError, setAuthError] = useState("")

  // Form data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  // Submit handler
  const onSubmit = (e) => {
    e.preventDefault()
    setAuthError("") // Reset any previous errors

    const { email, password } = formData // Destructuring directly from formData

    // Check if all fields are filled
    if (!email || !password) {
      return setAuthError("Please Enter valid Credentials!")
    }

    // If validation passes, proceed with success toast
    toast.success("Logged in successfully!")
  }

  return (
    <div className="relative flex flex-col min-w-sm ">
      {/*------------ Heading */}
      <div>
        <p className="text-xl font-bold">ADMIN SIGNIN</p>
        <p className="font-light text-[#575757] ">
          Welcome! Please enter your details.
        </p>
      </div>

      {/*------------- Form */}

      <form className="space-y-4 mt-5" onSubmit={onSubmit}>
        {/* ++++++ Email */}
        <div className="flex flex-col gap-0.5">
          <label className="flex justify-start ml-1" htmlFor="email">
            Email
          </label>
          <input
            className="h-12 border border-[#e2e2e2] focus:border-[#b5b5b5] rounded-lg shadow-sm focus:shadow-md placeholder:text-sm pl-4 focus:outline-none focus:placeholder-transparent transition-all duration-300 "
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
        {/* +++++++++ Password */}
        <div className="flex flex-col gap-0.5">
          <label className="flex justify-start ml-1" htmlFor="password">
            Password
          </label>
          <input
            className="h-12 border border-[#e2e2e2]  focus:border-[#b5b5b5] rounded-lg shadow-sm focus:shadow-md placeholder:text-sm pl-4 focus:outline-none focus:placeholder-transparent transition-all duration-300"
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Enter your password"
          />
        </div>
        {/* +++++++++ Remeber && Forgot Password */}
        <div className="flex justify-between">
          <div className="flex gap-2 ">
            <input type="checkbox" id="remember" />
            <label
              htmlFor="remember"
              className="text-gray-500 text-sm cursor-pointer"
            >
              Remember me
            </label>
          </div>
          <Link to={"/forgot-password"}>
            <p className="text-sm text-gray-500 hover:text-black text-right">
              Forgot password?
            </p>
          </Link>
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
            className="h-12 w-full bg-blue-600 rounded-lg text-white hover:opacity-90 hover:cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md active:scale-98 active:translate-y-1"
          >
            Sign in
          </button>
        </div>
      </form>

      {/* ---------- Link to sign up || admin sign in */}
      <div className="space-y-4 mt-4 ">
        {/* ++++++++++ Sign up Link */}
        <div className="flex justify-center gap-2">
          <p>Don't have an account?</p>
          <Link to="/signup" className="text-blue-600 font-semibold">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SigninForm
