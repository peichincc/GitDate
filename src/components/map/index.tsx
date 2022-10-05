import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { FormControl } from "../../utils/styledComponent";
import styled from "styled-components";

const PlacesContainer = styled.div`
  position: absolute;
  top: 180px;
  left: 225px;
  transform: translateX(-50%);
  z-index: 10;
  width: 150px;
  background-color: white;
`;
const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const LocationInput = styled(FormControl)`
  width: 150px;
`;
const RenderSuggestion = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const MapHome = ({ setLocation, setFormatAddress }: any) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    libraries: ["places"],
    language: "en",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map setLocation={setLocation} setFormatAddress={setFormatAddress} />;
};

const Map = ({ setLocation, setFormatAddress }: any) => {
  const [center, setCenter] = useState<any>({
    lat: 25.0384803,
    lng: 121.5301824,
  });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setCenter(selected);
  }, [selected]);

  return (
    <>
      <PlacesContainer>
        <PlacesAutocomplete
          setSelected={setSelected}
          setLocation={setLocation}
          setFormatAddress={setFormatAddress}
        />
      </PlacesContainer>
      <MapContainer>
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          {selected && <Marker position={selected} />}
        </GoogleMap>
      </MapContainer>
    </>
  );
};

const PlacesAutocomplete = ({
  setLocation,
  setSelected,
  setFormatAddress,
}: any) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSelect =
    ({ description }: any) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setSelected({ lat, lng });
        setLocation({ lat, lng });
        setFormatAddress(results[0].formatted_address);
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <RenderSuggestion>
          <li key={place_id} onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        </RenderSuggestion>
      );
    });

  return (
    <div ref={ref}>
      <LocationInput
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
      />
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default MapHome;
