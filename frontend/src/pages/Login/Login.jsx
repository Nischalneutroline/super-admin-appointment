import React from "react"
import Image from "../../shared/Image"
import SigninForm from "../../components/Signin/SigninForm"

const Login = () => {
  return (
    <div className=" flex flex-col h-full  justify-center  text-center gap-4 md:flex-row md:gap-8 lg:gap-20 ">
      <Image />
      <SigninForm />
    </div>
  )
}

export default Login
