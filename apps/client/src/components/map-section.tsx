"use client";
import { useEffect, useState } from "react";

//Components
import GeoLocationMap from "./geolocation-map";

// API
import { useGetNearestRoutes } from "../../api/routes/useGetNearestRoutes";
import { Route } from "../../../api/src/routes/entities/route.entity";

const MapSection = () => {
  const [userLatitude, setUserLatitude] = useState<number>(0);
  const [userLongitude, setUserLongitude] = useState<number>(0);
  // left as 10 for now, but can be changed to any number wiht set number of routes
  const [numberOfRoutes, setNumberOfRoutes] = useState(80);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: Number(userLatitude), longitude: Number(userLongitude) });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: userLat, longitude: userLon } = position.coords;
      setUserLatitude(userLat);
      setUserLongitude(userLon);
    });
  }, []);

  const {
    data: nearestRoutes,
    isLoading,
    error,
  } = useGetNearestRoutes({
    lat: userLatitude,
    lng: userLongitude,
    count: numberOfRoutes,
  });

  const handleOnClick = (route: Route) => {
    setSelectedLocation({
      latitude:
        route.pointsOnRoutes[0].point.region.geometry.coordinates[0][0][0],
      longitude:
        route.pointsOnRoutes[0].point.region.geometry.coordinates[0][0][1],
    });
  };

  if (error) {
    return (
      <div>
        <p>error: {String(error)}</p>
      </div>
    );
  }

  return (
    <>
      <section className="flex flex-col w-1/3 p-10  ">
        <p className=" text-gray-800 font-bold text-left text-3xl md:text-3xl  ">
          Closest routes near you ({numberOfRoutes})
        </p>

        <div className="flex flex-row justify-around align-middle gap-4 my-6 ">
          <div className="flex flex-row justify-left align-middle gap-2 text-base font-normal ">
            <div className="rounded-full bg-blue-500 w-3 h-3 my-auto"></div>
            <p>User Location</p>
          </div>
          <div className="flex flex-row justify-left align-middle gap-2 text-base font-normal">
            <div className="rounded-full bg-red-500  w-3 h-3 my-auto"></div>
            <p>Nearest Routes</p>
          </div>
        </div>
        {!isLoading && nearestRoutes ? (
          <div className="flex flex-col w-full pt-4 h-[400px]  overflow-y-auto overflow-visible ">
            {nearestRoutes?.map((route) => (
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
        ) : (
          <div>
            <p>Preparing your routes...</p>
          </div>
        )}
      </section>
      {!isLoading && nearestRoutes ? (
        <GeoLocationMap
          lat={userLatitude}
          lon={userLongitude}
          routes={nearestRoutes}
          selectedLocation={selectedLocation}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default MapSection;
