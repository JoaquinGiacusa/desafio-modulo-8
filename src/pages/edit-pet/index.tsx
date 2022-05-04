import React from "react";
import { MainText } from "../../ui/text-font";
import css from "./index.css";
import { EditPetForm } from "../../components/editPetForm";

export function EditPet() {
  return (
    <div className={css.root}>
      <div className={css.title}>
        <MainText title={true}>Editar mascota perdida</MainText>
      </div>
      <div>
        <EditPetForm></EditPetForm>
      </div>
    </div>
  );
}
