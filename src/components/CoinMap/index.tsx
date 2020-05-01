import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const zoom: number = 10;

const CoinMap = ({ lat, long, name }: any) => {
  const latLang: any = [lat, long];
  return (
    <Map id="mapId" center={latLang} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      ></TileLayer>
      <Marker position={latLang} key={`marker_${name}`}>
        <Popup>
          <span>{name}</span>
        </Popup>
      </Marker>
    </Map>
  );
};

export default CoinMap;
