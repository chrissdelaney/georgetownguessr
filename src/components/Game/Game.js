import React from "react";

import "./Game.css";

import Map from "../Map/Map";

export default function Game(props) {
    const [imgCoords, setImgCoords] = React.useState({latitude: 38.90768333333333, longitude: -77.07220555555556})
    return(
        <div className="game__wrapper">
            <Map 
                imgCoords={imgCoords}
            />
        </div>
    )
}