import React, { useState } from "react";
import { GoogleMap, Marker } from '@react-google-maps/api';

import "./Map.css";

export default function Map(props) {
    const [mapCenter, setMapCenter] = useState({ lat: 38.90899666691537, lng: -77.067332462228 });
    const [markerPosition, setMarkerPosition] = useState(null);
    const minZoomLevel = 14;
    const [currentDistance, setCurrentDistance] = useState(null);
    const [currentScore, setCurrentScore] = useState(0);

    const onMapClick = (event) => {
        const dist = calculateDistance(props.currentImgData.lat, props.currentImgData.lng, event.latLng.lat(), event.latLng.lng());
        setCurrentDistance(dist);
        setCurrentScore(calculateExponentialScore(dist));
        console.log(`score: ${currentScore} pts`);
        

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
        streetViewControl: false,
        minZoom: minZoomLevel
    };

    const handleGuess = () => {

        props.setCurrentScore(currentScore);
    }

    return (
        <div className="map__wrapper">
            <GoogleMap
                mapContainerStyle={{ height: "80%", width: "100%", top: 0, outline: "none",}}
                zoom={14}
                center={mapCenter}
                onClick={onMapClick}
                options={mapOptions}
            >
                {markerPosition && <Marker position={markerPosition} />}
            </GoogleMap>
            <div className="guess__btn__wrapper">
                <button 
                    className="guess__btn"
                    onClick={handleGuess()}
                > Guess</button>
            </div>
        </div>
    );
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Radius of the Earth in meters
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    // Haversine formula
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters

    return Math.floor(distance);
}

function calculateExponentialScore(dist) {
    const maxDistance = 1000; // Maximum distance for scoring
    const minScore = 0; // Minimum score at or beyond max distance
    const maxScore = 1000; // Maximum score for being very close

    if (dist <= 10) {
        return maxScore;
    } else if (dist > 10 && dist <= maxDistance) {
        // Refined approach for exponential decay
        // Adjust the decay factor directly to shape the curve
        const decayFactor = -0.005; // Adjust this value to control the rate of decay
        const score = maxScore * Math.exp(decayFactor * (dist - 10));

        // Ensure score never drops below minScore
        return Math.floor(Math.max(score, minScore));
    } else {
        return minScore;
    }
}

function calculateLinearScore (dist) {
    if (dist < 10) {
        return 1000;
    }
    else {
        return Math.max(1010 - dist, 0);
    }
}
