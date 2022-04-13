import React from "react";
import { MainText } from "../../ui/text-font";
import css from "./index.css";

type PropsNearPets = {
  //children: any;
  //onClick;
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
        <MainText>REPORTAR INFORMACION</MainText>
      </div>
    </div>
  );
}
