import React, { useEffect } from "react";
import { useMyLostPets, useRefreshPets } from "../../hooks";
import { MainText } from "../../ui/text-font";
import { MyPetsCard } from "../myPetsCard";
import css from "./index.css";

export function MyLostPets() {
  const res = useMyLostPets();

  return (
    <div className={css.root}>
      {res.length > 0 ? (
        res.map((p) => {
          return (
            <div key={p.id}>
              <MyPetsCard
                lat={p.last_location_lat}
                lng={p.last_location_lng}
                petId={p.id}
                picture={p.imageURL}
                name={p.name}
                lastSeen={p.lastSeen}
              />
            </div>
          );
        })
      ) : (
        <div>
          <MainText>No tienes mascotas publicadas.</MainText>
        </div>
      )}
    </div>
  );
}
