"use client";
import React, { useState, useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export const Map = () => {
  const mapContainer = useRef("");
  const [viewState, setViewState] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 3,
  });

  useEffect(() => {
    var map = new maplibregl.Map({
      container: mapContainer.current, // container id
      style:
        "https://api.maptiler.com/maps/streets-v2/style.json?key=PxNXKzROtyvsq6oE4YKN", // style URL
      center: [0, 0], // starting position [lng, lat]
      ...viewState,
    });
    return () => {
      map.remove();
    };
  }, []);
  return (
    <div
      ref={mapContainer}
      className="md:absolute md:right-0  md:w-1/2 md:min-h-[100vh]"
    >
      Map
    </div>
  );
};
