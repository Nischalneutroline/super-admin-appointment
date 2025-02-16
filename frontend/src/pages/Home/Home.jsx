import React from "react"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <div>
        {/* // build nav bar for loging and signup */}
        <nav className="flex justify-between py-4">
          <Link
            to="/signin"
            className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:opacity-90"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:opacity-90"
          >
            Sign up
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Home
