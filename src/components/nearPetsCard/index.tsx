import React from "react";
import { MainText } from "../../ui/text-font";
import css from "./index.css";
import { Modal } from "../modal";

type PropsNearPets = {
  //children: any;
  openModal;
  picture: string;
  name: string;
  lastSeen: string;
};

export function NearPetsCard(props: PropsNearPets) {
  return (
    <div className={css.card}>
      <img className={css["card-img"]} src={props.picture} />
      <div className={css["card-text"]}>
        <div>
          <MainText title={true}>{props.name}</MainText>
          <MainText>{props.lastSeen}</MainText>
        </div>
        <p onClick={props.openModal}>REPORTAR INFORMACION</p>
      </div>
    </div>
  );
}
