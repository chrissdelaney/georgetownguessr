import React from 'react';
import GoogleStreetview from 'react-google-streetview';

import "./StreetView.css";

export default function StreetView(props) {
    const googleMapsApiKey = props.googleMapsApiKey;
    const streetViewPanoramaOptions = {
        position: {lat: 38.90768333333333 , lng: -77.07220555555556}, // Example coordinates
        pov: { heading: 250, pitch: 10 }, // Point of view: direction and angle
        zoom: 1,
        disableDefaultUI: true, // Disable the default UI to remove most controls
        addressControl: false, // Hide the address
        clickToGo: false,
        showRoadLabels: false, // Hide road labels
        enableCloseButton: false, // Hide close button
        motionTracking: false, // Disable motion tracking
        motionTrackingControl: false, // Disable motion tracking control
        linksControl: false // Disable links to other street views
    };

    return (
        <div className="streetview__wrapper">
            <GoogleStreetview
                apiKey={googleMapsApiKey}
                streetViewPanoramaOptions={streetViewPanoramaOptions}
                style={{
                    width: '100%', // Adjust these values based on your layout needs
                    height: '100%'
                }}
            />
        </div>
    );
}
