import React from "react";

import "./Game.css";

import Map from "../Map/Map";
import mapData from "../../data/maps-locations";

import StreetView from "../StreetView/StreetView";
import { LoadScript } from '@react-google-maps/api';

export default function Game(props) {
    const currentImage = mapData[Math.floor((Math.random() * mapData.length))];

    const [currentImgData, setCurrentImgData] = React.useState({
        ...currentImage
    });

    console.log(currentImgData);

    const googleMapsApiKey = "AIzaSyBfr_271qEHFo2CUz8YAwlSmfAYIuocGdU";

    const [currentScore, setCurrentScore] = React.useState(0);

    return (
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <div className="game__wrapper">
                <div className="game">
                    <h1 className="top__score">
                        {currentScore}
                    </h1>
                    <StreetView 
                        googleMapsApiKey={googleMapsApiKey}
                        currentImgData={currentImgData}
                    />
                    <Map 
                        currentImgData={currentImgData} 
                        setCurrentScore={setCurrentScore}
                    />
                </div>
            </div>
        </LoadScript>
    );
}
