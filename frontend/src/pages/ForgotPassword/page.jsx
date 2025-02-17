import React from "react"
import Image from "../../shared/Image"
import ForgorPasswordForm from "../../components/ForgotPassword/ForgotPasswordForm"

const ForgorPassword = () => {
  return (
    <div className="flex flex-col border   justify-center  text-center gap-4 md:flex-row md:gap-8 lg:gap-20 ">
      <Image />
      <ForgorPasswordForm />
    </div>
  )
}

export default ForgorPassword
