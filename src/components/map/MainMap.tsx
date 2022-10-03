import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import GitHub from "../../assets/images/githubPin.png";
import mapStyle from "./mapStyle";

import { GithubPostTitle, Button } from "../../utils/StyledComponent";

const markers = [
  {
    id: 1,
    name: "Chicago, Illinois",
    position: { lat: 17, lng: 8 },
  },
  {
    id: 2,
    name: "Denver, Colorado",
    position: { lat: 39.739235, lng: -104.99025 },
  },
  {
    id: 3,
    name: "Los Angeles, California",
    position: { lat: 34.052235, lng: -118.243683 },
  },
  {
    id: 4,
    name: "Appworks School",
    position: { lat: 25, lng: 121 },
  },
];

export const ShowMainMap = ({ markersFromDB, position }: any) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    libraries: ["places"],
    language: "en",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <MainMap position={position} markersFromDB={markersFromDB} />
    </>
  );
};

const MainMap = ({ markersFromDB }: any) => {
  const navigate = useNavigate();
  const [activeMarker, setActiveMarker] = useState(null);

  const handleOnLoad = (map: any) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }: any) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  const handleActiveMarker = (markersFromDB: any) => {
    if (markersFromDB === activeMarker) {
      return;
    }
    setActiveMarker(markersFromDB);
  };
  console.log(markersFromDB);
  // const center = useMemo(() => ({ lat: 25.0384803, lng: 121.5301824 }), []);

  return (
    <>
      <GoogleMap
        mapContainerStyle={{ width: "100vw", height: "80vh" }}
        // zoom={10}
        onLoad={handleOnLoad}
        mapContainerClassName="map-container"
        onClick={() => setActiveMarker(null)}
        options={{ styles: mapStyle }}
      >
        {markersFromDB.map(({ id, name, position }: any) => (
          <Marker
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
            icon={{
              url: GitHub,
              scaledSize: new window.google.maps.Size(25, 25),
            }}
          >
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <GithubPostTitle>
                  {name}
                  <br />
                  <Button
                    onClick={() => {
                      navigate("/branch/" + id);
                    }}
                  >
                    Click to branch
                  </Button>
                </GithubPostTitle>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
        {/* <Marker position={center} /> */}
      </GoogleMap>
    </>
  );
};
