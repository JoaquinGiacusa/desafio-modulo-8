import React, { useEffect } from "react";
import { MainButton } from "../../ui/buttons";
import { MainText } from "../../ui/text-font";
import { NearPetsCard } from "../nearPetsCard";
import { useMyLoc, uselocPermission, useGetNearPets } from "../../hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
//const params = useParams();

export function GetLoc() {
  const [myLoc, setMyLoc] = useMyLoc();
  const [locPermission, setlocPermission] = uselocPermission();
  const nearPets = useGetNearPets();

  function askLoc() {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  }

  async function handleLocation() {
    try {
      var position = await askLoc();
      const lat = position["coords"].latitude.toString();
      const lng = position["coords"].longitude.toString();
      console.log(lat, lng);
      setMyLoc({ lat, lng });
      setlocPermission(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {locPermission ? (
        nearPets.map((p) => {
          return (
            <div key={p.objectID}>
              <NearPetsCard
                picture={p.imageURL}
                name={p.name}
                lastSeen={p.lastSeen}
              />
            </div>
          );
        })
      ) : (
        <div>
          <MainButton onClick={handleLocation}>
            <MainText>Dar mi ubicación</MainText>
          </MainButton>
        </div>
      )}
    </div>
  );
}
