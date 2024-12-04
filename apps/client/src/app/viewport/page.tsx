"use client";
import { Route } from "../../../../api/src/routes/entities/route.entity";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Map } from "react-map-gl/maplibre";
import { Marker, Layer, LineLayer, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import { useGetViewportPoints } from "../../../api/points/useGetViewportPoints";

export default function ViewportPoints() {
  const initialZoom = 2;
  const minZoomOut = 0;
  const [bounds, setBounds] = useState<any>({
    lat1: "50.0",
    lng1: "10.0",
    lat2: "71.0",
    lng2: "2.0",
  });
  const [userLatitude, setUserLatitude] = useState<string>("20");
  const [userLongitude, setUserLongitude] = useState<string>("2");
  const [zoom, setZoom] = useState<number>(initialZoom);

  const geoControlRef = useRef<maplibregl.GeolocateControl>();
  const mapRef = useRef<any>(null);

  const { data: points, isLoading } = useGetViewportPoints({
    lat1: Number(bounds.lat1),
    lng1: Number(bounds.lng1),
    lat2: Number(bounds.lat2),
    lng2: Number(bounds.lng2),
  });

  console.log("Points", points);

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
          longitude: Number(points[0].region.geometry.coordinates[0][0][0]),
          latitude: Number(points[0].region.geometry.coordinates[0][0][1]),
          zoom: zoom,
        }}
        minZoom={minZoomOut}
        style={{
          width: "100%",
          height: "100%",
          margin: "12px",
          borderRadius: "8px",
        }}
        // onMoveEnd={() => {}}
        onLoad={() => {
          if (geoControlRef.current) {
            geoControlRef.current.trigger();
            setUserLatitude(
              String(geoControlRef.current._lastKnownPosition.coords.latitude)
            );
            setUserLongitude(
              String(geoControlRef.current._lastKnownPosition.coords.longitude)
            );
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
        {/* <GeolocateControl
        ref={geoControlRef}
        trackUserLocation={true}
        showUserHeading={true}
      /> */}

        {points?.map((point) => (
          <Marker
            key={point.id + Math.random()}
            latitude={Number(point.region.geometry.coordinates[0][0][1])}
            longitude={Number(point.region.geometry.coordinates[0][0][0])}
            color="red"
          />
        ))}
      </Map>
    </main>
  );
}
