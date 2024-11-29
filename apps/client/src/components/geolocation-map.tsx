// src/GeoLocationMap.js
"use client";

//mock data
import { Route } from "../../../api/src/routes/entities/route.entity";

import React, { use, useEffect, useRef } from "react";
import { Map, GeolocateControl, Popup, useMap } from "react-map-gl/maplibre";
import { Marker, Layer, LineLayer, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { FillLayer } from "react-map-gl";

interface GeoLocationMapProps {
  lat: string;
  setLatitude: (lat: string) => void;
  lon: string;
  setLongitude: (lon: string) => void;
  routes: Route[];
  selectedLocation: { latitude: number; longitude: number };
}

const GeoLocationMap = ({
  lat,
  lon,
  routes,
  selectedLocation,
}: GeoLocationMapProps) => {
  const initialZoom = 2;
  const minZoomOut = 0;
  const geoControlRef = useRef<maplibregl.GeolocateControl>();
  const mapRef = useRef<any>(null);

  if (!routes) {
    return <div>No routes near</div>;
  }

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedLocation.latitude, selectedLocation.longitude],
        zoom: 8,
        essential: true,
      });
    }
    console.log("Selected location:", selectedLocation);
  }, [selectedLocation]);

  // create geojson from routes
  const createGeoJSONFromRoutes = () => {
    return {
      type: "FeatureCollection",
      features: routes.flatMap((route) =>
        route.pointsOnRoutes.map((point: any) => ({
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: point.point.region.geometry.coordinates,
          },
          properties: {
            id: point.point.id,
            color: "#ff0000",
          },
        }))
      ),
    };
  };

  const geoJsonData = React.useMemo(() => createGeoJSONFromRoutes(), [routes]);

  const polygonLayer: FillLayer = {
    id: "polygons-layer",
    type: "fill",
    paint: {
      "fill-color": ["get", "color"],
      "fill-opacity": 0.8,
    },
  };

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: Number(lon),
        latitude: Number(lat),
        zoom: initialZoom,
      }}
      minZoom={minZoomOut}
      style={{
        width: "70%",
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
        trackUserLocation={true}
        showUserHeading={true}
      /> */}

      <Marker
        key={lat}
        latitude={Number(lat)}
        longitude={Number(lon)}
        color="blue"
      />
      <Source id="polygons-source" type="geojson" data={geoJsonData}>
        {routes.map((route) =>
          route.pointsOnRoutes.map((point) => (
            <Layer {...polygonLayer} />
            // <Marker
            //   key={point.point.id}
            //   latitude={Number(
            //     point.point.region.geometry.coordinates[0][0][1]
            //   )}
            //   longitude={Number(
            //     point.point.region.geometry.coordinates[0][0][0]
            //   )}
            //   color="red"
            // />
          ))
        )}
      </Source>
    </Map>
  );
};

export default GeoLocationMap;

{
  /*
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
    */
}
