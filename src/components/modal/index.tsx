import React from "react";
import { MainButton } from "../../ui/buttons";
import { TextField } from "../../ui/text-field";
import { MainText } from "../../ui/text-font";
import css from "./index.css";

type PropsModal = {
  onSend?;
  closeModal;
};

export function Modal(props: PropsModal) {
  console.log("MODAL XD");

  return (
    <div className={css.modalBackground}>
      <div className={css.modalContainer}>
        <button onClick={props.closeModal}>X</button>
        <MainText title={true}>Reportar info de Bobby</MainText>
        <div>
          <MainText>TU NOMBRE</MainText>
          <TextField inputName="name" inputType="text"></TextField>
        </div>
        <div>
          <MainText>TU TELÉFONO</MainText>
          <TextField inputName="name" inputType="text"></TextField>
        </div>
        <div>
          <MainText>DONNDE LO VISTE?</MainText>
          <textarea></textarea>
        </div>
        <MainButton onClick={() => {}}>Enviar</MainButton>
      </div>
    </div>
  );
}
