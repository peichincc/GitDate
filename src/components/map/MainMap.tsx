import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import GitHub from "../../assets/images/githubPin.png";
import mapStyle from "./mapStyle";
import { GithubPostTitle, Button } from "../../utils/styledComponent";
import { LocationType } from "../../utils/interface";

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

const libraries = ["places"] as (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[];

interface LocationTypes {
  id: string;
  name: string;
  position: { lat: number; lng: number };
}

export const ShowMainMap = ({
  markersFromDB,
}: {
  markersFromDB: LocationTypes[];
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    libraries,
    language: "en",
  });

  const navigate = useNavigate();
  const [activeMarker, setActiveMarker] = useState("");

  const handleOnLoad = (map: {
    fitBounds: (arg0: google.maps.LatLngBounds) => void;
  }) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }: { position: LocationType }) =>
      bounds.extend(position)
    );
    map.fitBounds(bounds);
  };

  const handleActiveMarker = (id: string) => {
    setActiveMarker(id);
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <GoogleMap
        mapContainerStyle={{ width: "100vw", height: "80vh" }}
        onLoad={handleOnLoad}
        mapContainerClassName="map-container"
        options={{ styles: mapStyle }}
      >
        {markersFromDB.map(
          ({
            id,
            name,
            position,
          }: {
            id: string;
            name: string;
            position: LocationType;
          }) => (
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
                <InfoWindow onCloseClick={() => setActiveMarker("")}>
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
          )
        )}
      </GoogleMap>
    </>
  );
};
