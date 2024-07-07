"use client"

import React, { useState } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";

const CustomMap = () => {
  // shows marker on London by default
  const [markerLocation, setMarkerLocation] = useState({
    lat: 24.68067,
    lng: 46.74176,
  });

  return (
    <div className="h-full w-full border-2 border-white rounded-2xl overflow-hidden">
      <Map
        style={{ borderRadius: "20px", color:"currentcolor"}}
        defaultZoom={14}
        defaultCenter={markerLocation}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        <Marker position={markerLocation} />
      </Map>
    </div>
  );
};

export default CustomMap;
