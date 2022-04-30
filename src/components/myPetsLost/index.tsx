import React from "react";
import { useMyLostPets } from "../../hooks";
import { MyPetsCard } from "../myPetsCard";

export function MyLostPets() {
  const res = useMyLostPets();

  return (
    <div>
      {res.map((p) => {
        return (
          <div key={p.id}>
            <MyPetsCard
              picture={p.imageURL}
              name={p.name}
              lastSeen={p.lastSeen}
            />
          </div>
        );
      })}
    </div>
  );
}
