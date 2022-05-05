import React, { useState } from "react";

import css from "./index.css";
import { Modal } from "../modal";

type PropsNearPets = {
  picture: string;
  name: string;
  lastSeen: string;
  petId: string;
};

export function NearPetsCard(props: PropsNearPets) {
  const [modalStatus, setModalStatus] = useState(false);

  function openModal() {
    setModalStatus(true);
  }

  function closeModal() {
    setModalStatus(false);
  }

  return (
    <div className={css.card}>
      {modalStatus && (
        <Modal
          closeModal={closeModal}
          petName={props.name}
          petId={props.petId}
        />
      )}

      <img className={css["card-img"]} src={props.picture} />
      <div className={css["card-text"]}>
        <div>
          <div className={css.petName}>{props.name}</div>
          <div className={css.petLastSeen}>{props.lastSeen}</div>
        </div>
        <p className={css.linkReport} onClick={openModal}>
          REPORTAR INFORMACION
        </p>
      </div>
    </div>
  );
}
