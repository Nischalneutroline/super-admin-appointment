import React from "react"
import { Link } from "react-router-dom"
import Neutrologo from "../../assets/Neutroline_logo 3.png"

const Header = () => (
  <nav className="">
    {/* <ul className="w-md border flex gap-2 ">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
    </ul> */}
    <div className="text-center  flex justify-center items-center mb-4 pt-2 ">
      <img
        className="w-[100px] h-[70px]"
        src={Neutrologo}
        alt="neutrosys"
      ></img>
      <h1 className="text-2xl text-black font-[600]">Neutroline Pvt. Ltd.</h1>
    </div>
  </nav>
)
export default Header
