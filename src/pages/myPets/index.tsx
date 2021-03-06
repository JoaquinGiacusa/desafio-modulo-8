import React from "react";
import { MyLostPets } from "../../components/myPetsLost";
import { MainText } from "../../ui/text-font";
import css from "./index.css";
import { useCheckLog } from "../../hooks";

export function MyPetsPage() {
  useCheckLog();
  return (
    <div className={css.root}>
      <div className={css.title}>
        <MainText title={true}>Mis mascotas reportadas</MainText>
      </div>
      <MyLostPets></MyLostPets>
    </div>
  );
}
