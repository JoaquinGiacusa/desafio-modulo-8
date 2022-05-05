import React from "react";
import { MainButton } from "../../ui/buttons";
import { TextField } from "../../ui/text-field";
import { MainText } from "../../ui/text-font";
import css from "./index.css";
import { setReportInfo } from "../../lib/api";
import { useNavigate } from "react-router-dom";

type PropsModal = {
  onSend?;
  closeModal;
  petName: string;
  petId: string;
};

export function Modal(props: PropsModal) {
  const navigate = useNavigate();

  function handleReportSubmit(e) {
    e.preventDefault();
    const petName = e.target.name.value;
    const phoneNum = e.target.num.value;
    const lastSeen = e.target.lastSeen.value;
    const petId = props.petId;

    setReportInfo(petName, phoneNum, lastSeen, petId, () => {
      window.alert("Reporte enviado con éxito");
      navigate("/");
    });
  }

  return (
    <div className={css.modalBackground}>
      <form onSubmit={handleReportSubmit} className={css.modalContainer}>
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
            <TextField inputName="num" inputType="text"></TextField>
          </div>
          <div>
            <MainText>DÓNDE LO VISTE?</MainText>
            <textarea className={css.textLastSeen} name="lastSeen"></textarea>
          </div>
        </div>
        <div className={css.bntContainer}>
          <MainButton>Enviar</MainButton>
        </div>
      </form>
    </div>
  );
}
