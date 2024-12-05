"use client";

import React, { useRef, useState } from "react";
import { Map } from "react-map-gl/maplibre";
import { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import { useGetViewportPoints } from "../../../api/points/useGetViewportPoints";

interface Bounds {
  lat1: number;
  lng1: number;
  lat2: number;
  lng2: number;
}

export default function ViewportPoints() {
  const initialZoom = 2;
  const minZoomOut = 0;
  const [bounds, setBounds] = useState<Bounds>({
    lat1: 50.0,
    lng1: 10.0,
    lat2: 71.0,
    lng2: 2.0,
  });
  const [zoom, setZoom] = useState<number>(initialZoom);

  const geoControlRef = useRef<maplibregl.GeolocateControl>();
  const mapRef = useRef<any>(null);

  const { data: points, isLoading } = useGetViewportPoints({
    ...bounds,
  });

  if (isLoading) {
    return (
      <main className="min-h-[80vh] w-full flex items-center justify-center">
        <h1 className=" font-medium text-base md:text-2xl text-gray-800 ">
          Loading...
        </h1>
      </main>
    );
  }

  if (!points || !points.length) {
    return (
      <main className="min-h-[80vh] w-full flex items-center justify-center">
        <h1 className=" font-medium text-base md:text-2xl text-gray-800 ">
          No points found
        </h1>
      </main>
    );
  }

  return (
    <main className="flex w-full h-[80vh] ">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: points[0].region.geometry.coordinates[0][0][0],
          latitude: points[0].region.geometry.coordinates[0][0][1],
          zoom: zoom,
        }}
        minZoom={minZoomOut}
        style={{
          width: "100%",
          height: "100%",
          margin: "12px",
          borderRadius: "8px",
        }}
        onLoad={() => {
          if (geoControlRef.current) {
            geoControlRef.current.trigger();
          }
        }}
        onZoomEnd={() => {
          const zoom = mapRef.current.getZoom();
          const lat1 = mapRef.current.getBounds()._ne.lat;
          const lng1 = mapRef.current.getBounds()._ne.lng;
          const lat2 = mapRef.current.getBounds()._sw.lat;
          const lng2 = mapRef.current.getBounds()._sw.lng;

          setBounds({ lat1, lng1, lat2, lng2 });
          setZoom(zoom);
        }}
        interactive={true}
        mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=PxNXKzROtyvsq6oE4YKN"
      >
        {points?.map((point) => (
          <Marker
            key={point.id + Math.random()}
            latitude={point.region.geometry.coordinates[0][0][1]}
            longitude={point.region.geometry.coordinates[0][0][0]}
            color="red"
          />
        ))}
      </Map>
    </main>
  );
}
