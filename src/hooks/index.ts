import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { atom, selector } from "recoil";
import { getNearPets } from "../lib/api";

const locPermission = atom({
  key: "locPermission",
  default: false,
});

// export function useGetLoc() {
//   const [locPermiss, setlocPermiss] = useRecoilState(locPermission);
//   const [myLoc, setMyLoc] = useMyLoc();
//   return "loc";
// }

const myLoc = atom({
  key: "location",
  default: {
    lat: "",
    lng: "",
  },
});

export const uselocPermission = () => useRecoilState(locPermission);

export const useMyLoc = () => useRecoilState(myLoc);
// export function useMyLoc() {
//   return useRecoilState(myLoc);
// }

//getLoc
const searchNearPets = selector({
  key: "petsNear",
  get: async ({ get }) => {
    const myLastLocation = get(myLoc);
    const lat = myLastLocation.lat;
    const lng = myLastLocation.lng;
    console.log("pase por aca");
    console.log("myLastLocation", myLastLocation);

    //retorna la llamada a la api
    if (lat != "" && lng != "") {
      const results = await getNearPets(lat, lng);

      return results;
    } else {
      return "";
    }
  },
});

export function useGetNearPets() {
  const results = useRecoilValue(searchNearPets);
  return results;
}
