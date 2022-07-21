import React from 'react'
import { formatToLocalTime } from '../../Utiliies/Utility'
import "./sun.css"

const Sun = ({weather:{sunrise,sunset,timezone}}) => {
  return (
    <>
    <div>
              <img className="image" src="https://www.suntoday.org/images/sunrise-sunset.png" alt=""/>
            

             </div>
             <div className="times">
              <p style={{ textAlign: "left",fontWeight:"200" }}>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</p>
              <p style={{ textAlign: "left",fontWeight:"200" }}>{formatToLocalTime(sunset, timezone, "hh:mm a")}</p>
             </div>
             </>       
  )
}

export default Sun