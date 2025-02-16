import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Icons
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineError } from "react-icons/md";

// React Hook Form
import { useForm } from "react-hook-form";

import { registerSuperAdmin } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // Auth error and loading state
  const [authError, setAuthError] = useState("");
  const { loading, error } = useSelector((state) => state.auth);

  // Password visibility state
  const [showPassword, setShowPassword] = React.useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  // Submit handler
  const onSubmit = async (data) => {
    console.log(data);
    setAuthError("");

    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      return setAuthError("Password doesn't match!");
    }

    // Check if all fields are filled
    if (
      !data.fullName ||
      !data.email ||
      !data.phoneNumber ||
      !data.password ||
      !data.confirmPassword
    ) {
      return setAuthError("All fields are required!");
    }

    const { phone, ...dataWithoutPhone } = data;

    // Dispatch the registerSuperAdmin action with cleaned data
    try {
      const result = await dispatch(
        registerSuperAdmin(dataWithoutPhone)
      ).unwrap();
      console.log("The result is", result);

      if (result?.isSuccess === false) {
        console.log("Entered error block");

        const errorMessage =
          result?.error?.error || // If error contains a direct error field
          result?.error?.message || // If error contains a message field
          result?.message || // If the message is in the top-level 'message' field
          "Unexpected error"; // Default error message

        console.log("Error message:", errorMessage);

        // Show the error in a toast notification
        toast.error(errorMessage);
        return;
      }

      toast.success("Account has been created successfully!");
      navigate("/login")
      reset();
    } catch (error) {
      setAuthError(error || "An error occurred during registration.");
    }
  };

  useEffect(() => {
    if (error) {
      setAuthError(error);
    }
  }, [error]);

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
          <label className="flex justify-start ml-2" htmlFor="phoneNumber">
            PhoneNumber
          </label>
          <input
            className="h-12 border border-[#e2e2e2] focus:border-[#b5b5b5] rounded-lg shadow-sm focus:shadow-md placeholder:text-sm pl-4 focus:outline-none focus:placeholder-transparent transition-all duration-300 "
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            {...register("phoneNumber", {
              required: "Phone number is required!",
            })}
            placeholder="(123) 456-7890"
          />
          {/* Error Message */}
          {errors.phoneNumber && (
            <p className="text-xs text-red-600 text-start pl-2">
              {errors.phoneNumber.message}
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
            placeholder="Confirm password"
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
            className="h-12 w-full bg-blue-600 rounded-lg text-white hover:opacity-90 hover:cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md active:scale-98 active:translate-y-1"
            disabled={loading || !isValid}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </div>
      </form>

      {/* ---------- Agreement || Admin Sign In */}
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
      </div>
    </div>
  );
};

export default SignupForm;
