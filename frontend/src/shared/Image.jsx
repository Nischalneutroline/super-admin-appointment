import neutrosys from "../assets/neutrosys.png"
import React from "react"
// import "./Image.css"

function Image() {
  return (
    <div className="min-w-xs max-w-sm ">
      <img
        // className="mx-auto w-[300px] md:w-[600px] md:h-[500px] md:px-0 object-cover"
        className="mx-auto md:py-14 w-[300px] md:w-[700px] md:h-[650px] md:px-0 object-cover"
        // className=" object-cover"
        src={neutrosys}
        alt="neutrosys"
      ></img>
    </div>
  )
}

export default Image
