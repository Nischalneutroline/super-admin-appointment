import React from "react"
import Image from "../../shared/Image"
import SignupForm from "../../components/Signup/SignupForm"

const Signup = () => {
  return (
    <div className="flex flex-col border   justify-center  text-center gap-4 md:flex-row md:gap-8 lg:gap-20 ">
      <Image />
      <SignupForm />
    </div>
  )
}

export default Signup
