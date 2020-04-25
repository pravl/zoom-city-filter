import React from 'react'
import "./index.css"

export const ImageContainer = ({ data }) => {
    return (
        <div className="ImageContainer">
            <img className="cityImage"  src={data.icon} alt={data.name}/>
            <div className="cityName">
                {data.name}
            </div>
        </div>
    )
}
