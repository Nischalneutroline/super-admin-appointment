import React from "react"
import Image from "../../shared/Image"
import ForgotPasswordForm from "../../components/ForgotPassword/ForgotPasswordForm"

const ForgotPassword = () => {
  return (
    <div className="flex flex-col    justify-center  text-center gap-4 md:flex-row md:gap-8 lg:gap-20 ">
      <Image />
      <ForgotPasswordForm />
    </div>
  )
}

export default ForgotPassword
