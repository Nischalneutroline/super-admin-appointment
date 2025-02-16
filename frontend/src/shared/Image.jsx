import neutrosys from "../assets/neutrosys.png"
import React from "react"
// import "./Image.css"

function Image() {
  return (
    <div className="min-w-xs max-w-sm align-super ">
      <img
        className="mx-auto w-[300px] md:w-[600px] md:h-[600px] md:px-0 object-cover"
        // className=" object-cover"
        src={neutrosys}
        alt="neutrosys"
      ></img>
    </div>
  )
}

export default Image
