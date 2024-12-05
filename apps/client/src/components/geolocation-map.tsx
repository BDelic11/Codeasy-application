"use client";

import { Route } from "../../../api/src/routes/entities/route.entity";
import React, { useEffect, useRef } from "react";
import { Map } from "react-map-gl/maplibre";
import { Marker, Layer, LineLayer, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { FillLayer, MapRef } from "react-map-gl";

interface GeoLocationMapProps {
  lat: number;
  lon: number;
  routes: Route[];
  selectedLocation: { latitude: number; longitude: number };
}

const GeoLocationMap = ({
  lat,
  lon,
  routes,
  selectedLocation,
}: GeoLocationMapProps) => {
  const INITIAL_ZOOM = 2;
  const MIN_ZOOM_OUT = 0;

  const geoControlRef = useRef<maplibregl.GeolocateControl>();
  const mapRef = useRef<any>(null);

  if (!routes) {
    return <div>No routes near </div>;
  }

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedLocation.latitude, selectedLocation.longitude],
        zoom: 8,
        essential: true,
      });
    }
  }, [selectedLocation]);

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
        longitude: lon,
        latitude: lat,
        zoom: INITIAL_ZOOM,
      }}
      minZoom={MIN_ZOOM_OUT}
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
      <Marker key={lat} latitude={lat} longitude={lon} color="blue" />
      <Source id="polygons-source" type="geojson" data={geoJsonData}>
        {/* @ts-expect-error layer type*/}
        <Layer {...polygonLayer} />
      </Source>
    </Map>
  );
};

export default GeoLocationMap;
