import { MdOutlineCheckCircle } from "react-icons/md"

const SuccessMessage = ({ message }) => {
  return (
    <p className="text-sm text-green-600 text-left flex gap-1 items-center">
      <MdOutlineCheckCircle />
      {message}
    </p>
  )
}

export default SuccessMessage
