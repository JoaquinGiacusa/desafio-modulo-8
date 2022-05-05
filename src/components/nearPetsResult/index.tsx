import React from "react";
import { MainText } from "../../ui/text-font";
import { NearPetsCard } from "../nearPetsCard";
import { useGetNearPets } from "../../hooks";

import css from "./index.css";

export function NearPetsResult() {
  const nearPets = useGetNearPets();

  return (
    <div className={css.root}>
      {nearPets.length > 0 ? (
        <div>
          <div className={css.title}>
            <MainText title={true}>Mascotas perdidas cerca tuyo</MainText>
          </div>

          <div className={css.cardsContaier}>
            {nearPets.map((p) => {
              return (
                <div key={p.objectID}>
                  <NearPetsCard
                    picture={p.imageURL}
                    name={p.name}
                    lastSeen={p.lastSeen}
                    petId={p.objectID}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <MainText>No hay mascotas cerca tuyo.</MainText>
        </div>
      )}
    </div>
  );
}
