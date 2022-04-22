import React, { useEffect, useState } from "react";
import { MainText } from "../../ui/text-font";
import { NearPetsCard } from "../nearPetsCard";
import { useGetNearPets, useModalAction, useRedirectHome } from "../../hooks";
import { Modal } from "../modal";

export function NearPetsResult() {
  const nearPets = useGetNearPets();
  const [modalStatus, setModalStatus] = useModalAction();

  function openModal() {
    setModalStatus(true);
  }

  function closeModal() {
    setModalStatus(false);
  }

  return (
    <div>
      {nearPets.length > 0 ? (
        <div>
          {modalStatus && <Modal closeModal={closeModal} />}
          <div>
            {nearPets.map((p) => {
              return (
                <div key={p.objectID}>
                  <NearPetsCard
                    openModal={openModal}
                    picture={p.imageURL}
                    name={p.name}
                    lastSeen={p.lastSeen}
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
