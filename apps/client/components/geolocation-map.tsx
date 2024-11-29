// src/GeoLocationMap.js
"use client";

//mock data
import { Route } from "../../api/src/routes/entities/route.entity";

import React, { useEffect, useRef } from "react";
import { Map, GeolocateControl, Popup } from "react-map-gl/maplibre";
import { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

interface GeoLocationMapProps {
  lat: string;
  setLatitude: (lat: string) => void;
  lon: string;
  setLongitude: (lon: string) => void;
  routes: Route[];
}

const GeoLocationMap = ({ lat, lon, routes }: GeoLocationMapProps) => {
  // Determine zoom level based on screen width
  const geoControlRef = useRef<maplibregl.GeolocateControl>();

  const initialZoom = 2;
  const minZoomOut = 0;
  if (!routes) {
    return <div>No routes near</div>;
  }

  return (
    <Map
      initialViewState={{
        longitude: Number(lon),
        latitude: Number(lat),
        zoom: initialZoom,
      }}
      minZoom={minZoomOut}
      style={{
        width: "100%",
        height: "calc(100vh - 24px)",
        margin: "12px",
        borderRadius: "8px",
      }}
      onLoad={() => {
        if (geoControlRef.current) {
          geoControlRef.current.trigger();
        }
      }}
      interactive={true}
      mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=PxNXKzROtyvsq6oE4YKN"
    >
      {/* <GeolocateControl
        ref={geoControlRef}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        showUserHeading={true}
        style={{ display: "none" }} // Hide the button
      /> */}
      {routes.map((route) =>
        route.pointsOnRoutes.map(
          (
            point // Loop through points
          ) => (
            <Marker
              key={point.point.id}
              latitude={Number(
                point.point.region.geometry.coordinates[0][0][1]
              )}
              longitude={Number(
                point.point.region.geometry.coordinates[0][0][0]
              )}
              color="red"
            />
          )
        )
      )}
      {/*
      {selectedLocation && (
        <Popup
          longitude={selectedLocation.longitude}
          latitude={selectedLocation.latitude}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setSelectedLocation(null)} // Close popup
          anchor="top"
        >
          <div>
            {selectedLocation.description || selectedLocation.city}
            {/* Show description or fallback 
          </div>
        </Popup>
      )} 
    */}
    </Map>
  );
};

export default GeoLocationMap;
