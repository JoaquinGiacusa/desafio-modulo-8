import React, { useEffect } from "react";
import { MainText } from "../../ui/text-font";
import { MainButton } from "../../ui/buttons";
import css from "./homePage.css";
import { useNavigate } from "react-router-dom";
import { useGetLocPermiss, useMyLoc } from "../../hooks";

function HomePage() {
  const [locPermiss, setlocPermiss] = useGetLocPermiss();
  const [myLoc, setMyLoc] = useMyLoc();
  const navigate = useNavigate();

  function handleUbiButton() {
    if (locPermiss) {
      navigate("/pets-around");
    } else {
      navigator.geolocation.getCurrentPosition(function (pos) {
        const lat = pos["coords"].latitude.toString();
        const lng = pos["coords"].longitude.toString();
        setlocPermiss(true);
        setMyLoc({ lat, lng });
        navigate("/pets-around");
      });
    }
  }

  return (
    <div className={css.root}>
      <div className={css.title}>
        <MainText title={true}>Mascotas perdidas cerca tuyo</MainText>
      </div>
      <div className={css.text}>
        <MainText>
          Para ver las mascotas reportadas cerca tuyo necesitamos permiso para
          conocer tu ubicación.
        </MainText>
        <div className={css.button}>
          <MainButton onClick={handleUbiButton}>
            <MainText>Dar mi ubicación</MainText>
          </MainButton>
        </div>
      </div>
    </div>
  );
}

export { HomePage };
