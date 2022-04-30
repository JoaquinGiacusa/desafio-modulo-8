import React from "react";
import { MainButton } from "../../ui/buttons";
import { TextField } from "../../ui/text-field";
import { MainText } from "../../ui/text-font";
import css from "./index.css";

type PropsModal = {
  onSend?;
  closeModal;
  petName: string;
};

export function Modal(props: PropsModal) {
  return (
    <div className={css.modalBackground}>
      <div className={css.modalContainer}>
        <div className={css.closeBtnContainer}>
          <button className={css.closeBtn} onClick={props.closeModal}>
            X
          </button>
        </div>
        <div className={css.inputContainer}>
          <div className={css.title}>
            <p>
              Reportar info de <strong>{props.petName}</strong>
            </p>
          </div>
          <div>
            <MainText>TU NOMBRE</MainText>
            <TextField inputName="name" inputType="text"></TextField>
          </div>
          <div>
            <MainText>TU TELÉFONO</MainText>
            <TextField inputName="name" inputType="text"></TextField>
          </div>
          <div>
            <MainText>DÓNDE LO VISTE?</MainText>
            <textarea></textarea>
          </div>
        </div>
        <MainButton onClick={() => {}}>Enviar</MainButton>
      </div>
    </div>
  );
}
