import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";
import { useSelector, useDispatch } from "react-redux";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
  /* Goes to state and provides origin object from global store */
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    //Zoom and fit to markers
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      const URL =
        fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=IMPERIAL
      &origins=${origin.description}
      &destinations=${destination.description}
      &key=${GOOGLE_MAPS_APIKEY}`)
          .then((res) => res.json())
          .then((data) => {
            dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
            console.log("the data is: ", data);
          });
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  return (
    <MapView
      ref={mapRef}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      style={tw`flex-1`}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          title="You are here!"
          description={origin.description}
          identifier="origin"
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
        />
      )}
      {destination?.location && (
        <Marker
          title="Your Destination"
          description={destination.description}
          identifier="destination"
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

