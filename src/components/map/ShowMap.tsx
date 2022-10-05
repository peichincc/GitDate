import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export const ShowMap = ({ center }: any) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    libraries: ["places"],
    language: "en",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Map center={center} />
    </>
  );
};

const Map = ({ center }: any) => {
  return (
    <>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        <Marker position={center} />
      </GoogleMap>
    </>
  );
};
