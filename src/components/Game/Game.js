import React from "react";
import "./Game.css";
import Map from "../Map/Map";
import StreetView from "../StreetView/StreetView";
import { LoadScript } from '@react-google-maps/api';

export default function Game(props) {
    const [imgCoords, setImgCoords] = React.useState({latitude: 38.90768333333333, longitude: -77.07220555555556});
    const googleMapsApiKey = "#####";

    return (
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <div className="game__wrapper">
                <div className="game">
                    <StreetView 
                        googleMapsApiKey={googleMapsApiKey}
                    />
                    <Map imgCoords={imgCoords} />
                </div>
            </div>
        </LoadScript>
    );
}
