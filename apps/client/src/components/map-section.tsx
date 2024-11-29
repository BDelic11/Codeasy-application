"use client";
import { Suspense, useEffect, useState } from "react";

//Components
import GeoLocationMap from "./geolocation-map";

// API
import { useGetNearestRoutes } from "../../api/routes/useGetNearestRoutes";
import { Route } from "../../../api/src/routes/entities/route.entity";

const MapSection = () => {
  const [userLatitude, setUserLatitude] = useState<string>("");
  const [userLongitude, setUserLongitude] = useState<string>("");
  const [numberOfRoutes, setNumberOfRoutes] = useState(10);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: Number(userLatitude), longitude: Number(userLongitude) });

  useEffect(() => {
    // Fetch user's geolocation on component mount
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: userLat, longitude: userLon } = position.coords;
        setUserLatitude(String(userLat));
        setUserLongitude(String(userLon));
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
      <h1 className="text-gray-800 text-3xl font-bold  m-auto">
        Preparing routes..
      </h1>
    );
  }

  const handleOnClick = (route: Route) => {
    setSelectedLocation({
      latitude:
        route.pointsOnRoutes[0].point.region.geometry.coordinates[0][0][0],
      longitude:
        route.pointsOnRoutes[0].point.region.geometry.coordinates[0][0][1],
    });
  };

  return (
    <>
      <section className="flex flex-col w-1/3 p-10 ">
        <p className=" text-gray-800 font-bold text-left text-3xl md:text-3xl  ">
          Closest routes near you
          <div className="flex flex-row justify-left align-middle gap-2 text-base font-normal mt-4">
            <div className="rounded-full bg-blue-500 w-3 h-3 my-auto"></div>
            <p>User Location</p>
          </div>
          <div className="flex flex-row justify-left align-middle gap-2 text-base font-normal">
            <div className="rounded-full bg-red-500  w-3 h-3 my-auto"></div>
            <p>Nearest Routes</p>
          </div>
        </p>
        <div className="flex flex-col w-full pt-4 h-[400px]  overflow-hidden overflow-y-auto">
          {nearestRoutes.map((route) => (
            <div key={route.id} className="flex flex-row w-full">
              <button
                onClick={() => handleOnClick(route)}
                className="text-gray-600 font-medium text-left text-base md:text-base pl-2  py-2 hover:bg-gray-100 w-full "
              >
                <div className="flex flex-row justify-left align-middle gap-2 text-base font-normal my-1">
                  <div className="rounded-full bg-red-500 w-3 h-3 my-auto"></div>
                  <p> Route - ID {route.id}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <GeoLocationMap
          lat={userLatitude}
          setLatitude={setUserLatitude}
          lon={userLongitude}
          setLongitude={setUserLongitude}
          routes={nearestRoutes}
          selectedLocation={selectedLocation}
        />
      </Suspense>
    </>
  );
};

export default MapSection;
