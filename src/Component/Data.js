import React from 'react'
import { ImageContainer } from "./ImageContainer"
import "./index.css"

export const Data = ({ data}) => {
    return (
        <div className="data">
            <h2 className="heading">Popular</h2>
            <div className="image-wrapper">
                {
                    data.popular.map(city =>
                        <ImageContainer key={city.id} data={city} />)
                }
            </div>


            <h2 className="heading">Others</h2>
            <div className="image-wrapper">
                {
                    data.others.map(city =>
                        <ImageContainer key={city.id} data={city} />)
                }
            </div>
        </div>
    )
}
