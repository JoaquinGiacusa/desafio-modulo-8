import React, { useEffect, useState } from "react";
import { MainText } from "../../ui/text-font";
import css from "./index.css";
import { Modal } from "../modal";
import editIcon from "../../img/editIcon.svg";

type PropsMyPets = {
  picture: string;
  name: string;
  lastSeen: string;
};

export function MyPetsCard(props: PropsMyPets) {
  return (
    <div className={css.card}>
      <img className={css["card-img"]} src={props.picture} />
      <div className={css["card-text"]}>
        <div>
          <div className={css.petName}>{props.name}</div>
          <div className={css.petLastSeen}>{props.lastSeen}</div>
        </div>
        <div className={css.editBtn}>
          <img src={editIcon} />
        </div>
      </div>
    </div>
  );
}
