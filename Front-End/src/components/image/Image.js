import './Image.css'
import Marker from '../../resources/map-marker.png'

// // Initialize and add the map
// function initMap() {
//     // The location of Uluru
//     const uluru = { lat: -25.344, lng: 131.036 };
//     // The map, centered at Uluru
//     const map = new google.maps.Map(document.getElementById("map"), {
//       zoom: 4,
//       center: uluru,
//     });
//     // The marker, positioned at Uluru
//     const marker = new google.maps.Marker({
//       position: uluru,
//       map: map,
//     });
//   }

// function ain() {
//     return (
//         <div className="image-container">
//             <h3>My Google Maps Demo</h3>
//         <div id="map" ></div>
//         </div>

//     )
// }

import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
class Main extends Component {
    render() {
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                defaultCenter={{ lat: 9.9312, lng: 76.2673 }}
                defaultZoom={13}>
            </GoogleMap>
        ));
        return (
            <div className="image-container">
                <div className="map-container">
                    <GoogleMapExample
                        containerElement={<div className="map-element" />}
                        mapElement={<div className="map-height" />}
                    />
                    <div className="map-header">
                        <div className="logo-service-wrapper">
                            <img src={Marker} width="100" height="100" />
                            <div> <span id="small-caption">Services available at:</span> <br/>Kochi Only.</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Main;
