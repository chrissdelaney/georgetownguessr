import React from "react";

import "./Game.css";

import Map from "../Map/Map";

export default function Game(props) {
    return(
        <div className="game__wrapper">
            <Map />
        </div>
    )
}