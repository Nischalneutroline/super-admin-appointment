import React from "react"
import Image from "../../shared/Image"
import SignupForm from "../../components/Signup/SignupForm"

const Signup = () => {
  return (
    <div className=" flex flex-col justify-center  text-center gap-4 md:flex-row md:gap-10 ">
      <Image />
      <SignupForm />
    </div>
  )
}

export default Signup
