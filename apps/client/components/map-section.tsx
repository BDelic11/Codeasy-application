"use client";
import { useEffect, useState } from "react";
//Components
// import LayoutContainer from "@/components/ui/layout-container";
import GeoLocationMap from "./geolocation-map";
import { useGetNearestRoutes } from "../api/routes/useGetNearestRoutes";

const MapSection = () => {
  const [userLatitude, setUserLatitude] = useState<string>("");
  const [userLongitude, setUserLongitude] = useState<string>("");
  const [numberOfRoutes, setNumberOfRoutes] = useState(10);

  useEffect(() => {
    // Fetch user's geolocation on component mount
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: userLat, longitude: userLon } = position.coords;
        setUserLatitude(String(userLat)); // Set latitude
        setUserLongitude(String(userLon)); // Set longitude
        console.log("User location:", { userLat, userLon });
      },
      (error) => {
        console.error("Error fetching geolocation:", error);
      }
    );
  }, []);

  const { data: nearestRoutes, isLoading } = useGetNearestRoutes({
    lat: userLatitude,
    lon: userLongitude,
    count: numberOfRoutes,
  });

  if (isLoading) <div>Loading...</div>;

  if (!nearestRoutes) {
    return (
      <div>
        <main>
          <h1>No routes </h1>
        </main>
      </div>
    );
  }
  return (
    <section
      id="map"
      className=" flex md:pl-10 md:flex-row h-screen w-full bg-hero-background-color"
    >
      <div className="w-1/2">
        <p className="text-seawind-grey font-medium text-left text-xl md:text-3xl pt-24 py-12 ">
          Closest routes near you
        </p>
        {/* <div className="flex flex-col w-full">
          {nearestRoutes.map((route) => (
            <div key={route.id} className="flex flex-row w-full">
              <div className="w-1/2">
                <p className="text-seawind-grey font-medium text-left text-xl md:text-3xl pt-24 py-12 ">
                  {route.pointsOnRoutes.map(
                    (point) => point.point.region.geometry.coordinates[0]
                  )}
                </p>
              </div>
            </div>
          ))}
        </div> */}
      </div>
      <GeoLocationMap
        lat={userLatitude}
        setLatitude={setUserLatitude}
        lon={userLongitude}
        setLongitude={setUserLongitude}
        routes={nearestRoutes}
      />
    </section>
  );
};

export default MapSection;
