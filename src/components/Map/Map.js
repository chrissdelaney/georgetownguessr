import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function Map(props) {
    const [mapCenter, setMapCenter] = useState({ lat: 38.90899666691537, lng: -77.067332462228 });
    const [markerPosition, setMarkerPosition] = useState(null);
    const minZoomLevel = 14;

    const onMapClick = (event) => {
        console.log(event.latLng.lat());
        console.log(event.latLng.lng());
        setMarkerPosition({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        });
    };

    const mapOptions = {
        mapTypeControl: false,
        fullscreenControl: false,
        clickableIcons: false,
        disableDoubleClickZoom: true,
        minZoom: minZoomLevel
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyBfr_271qEHFo2CUz8YAwlSmfAYIuocGdU">
            <GoogleMap
                mapContainerStyle={{ height: "50vh", width: "50%", outline: "none",}}
                zoom={14}
                center={mapCenter}
                onClick={onMapClick}
                options={mapOptions}
            >
                {markerPosition && <Marker position={markerPosition} />}
            </GoogleMap>
        </LoadScript>
    );
}
