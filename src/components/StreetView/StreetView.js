import React, { useState } from 'react';
import GoogleStreetview from 'react-google-streetview';

import "./StreetView.css";

export default function StreetView(props) {
    const googleMapsApiKey = props.googleMapsApiKey;
    const streetViewPanoramaOptions = {
        position: {lat: props.currentImgData.lat , lng: props.currentImgData.lng}, // Example coordinates
        pov: { heading: props.currentImgData.heading, pitch: props.currentImgData.pitch }, // Point of view: direction and angle
        zoom: 1,
        disableDefaultUI: true, // Disable the default UI to remove most controls
        addressControl: false, // Hide the address
        clickToGo: false,
        keyboardShortcuts: false,
        showRoadLabels: false, // Hide road labels
        enableCloseButton: false, // Hide close button
        motionTracking: false, // Disable motion tracking
        motionTrackingControl: false, // Disable motion tracking control
        linksControl: false // Disable links to other street views
    };

    const [locData, setLocData] = useState({
        lat: 38.90768333333333,
        lng: -77.07220555555556,
        heading: 250,
        pitch: 10,
        zoom: 1,
    })

    const handlePositonChange = (pos) => {
        setLocData(oldData => {
            return {
                ...oldData,
                lat: pos.lat(),
                lng: pos.lng(),
            }
        })
        logLocData();
    }

    const handlePovChange = (pov) => {
        setLocData(oldData => {
            return {
                ...oldData,
                heading: pov.heading,
                pitch: pov.pitch,
                zoom: pov.zoom,
            }
        });
        //logLocData();
    }

    const logLocData = () => {
        console.log(`
lat: ${locData.lat},
lng: ${locData.lng},
heading: ${locData.heading},
pitch: ${locData.pitch},
zoom: ${locData.zoom},
        `)
    }



    return (
        <div className="streetview__wrapper">
            <GoogleStreetview
                apiKey={googleMapsApiKey}
                streetViewPanoramaOptions={streetViewPanoramaOptions}
                style={{
                    width: '100%', // Adjust these values based on your layout needs
                    height: '100%'
                }}
                onPositionChanged={handlePositonChange}
                onPovChanged={handlePovChange}
            />
        </div>
    );
}
