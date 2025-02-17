import React from "react"
import { MdOutlineError } from "react-icons/md"

const ErrorMessage = ({ message }) => {
  return (
    <p className="text-sm text-red-600 text-left flex gap-1 items-center">
      <MdOutlineError />
      {message}
    </p>
  )
}

export default ErrorMessage
