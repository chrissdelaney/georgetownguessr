import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import "./Map.css";

export default function Map(props) {
    const mapStyles = {        
        height: "50vh",
        width: "50%"
    };

    const [markerPosition, setMarkerPosition] = useState({
        lat: 41.3851,
        lng: 2.1734
    });

    const onMapClick = (event) => {
        setMarkerPosition({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        });
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyCnBKASLNJoWMGVatxoo456e7WO9ELADAw">
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={markerPosition}
                onClick={onMapClick}
            >
                <Marker position={markerPosition}/>
            </GoogleMap>
        </LoadScript>
    );
}
