import React, { useState } from "react";

import { TextField } from "../../ui/text-field";
import { MainText } from "../../ui/text-font";
import css from "./index.css";
import { DropZoneEl } from "../dropZone";
import { MapBoxEl } from "../map";
import { MainButton } from "../../ui/buttons";
import { createALostPet } from "../../lib/api";
import { useAuthToken } from "../../hooks";
import { Spinner } from "../../ui/spinner";
import { useNavigate } from "react-router-dom";

export function ReportForm() {
  const [petName, setPetName] = useState("");
  const [cords, setCords] = useState("");
  const [lastSeen, setLastSeen] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const [token, setToken] = useAuthToken();
  const [loader, setLoader] = useState(false);
  let navigate = useNavigate();

  function getName(val) {
    setPetName(val.target.value);
  }

  function getMapInfo(e) {
    setCords(e.cords);
    setLastSeen(e.lastSeen);
  }

  function getDropUrl(e) {
    setUrlImg(e);
  }

  function reportHandler() {
    //console.log("fff", petName, cords, lastSeen, urlImg);
    if (token && petName && urlImg && cords[1] && cords[0] && lastSeen) {
      const petRes = createALostPet(
        token,
        petName,
        urlImg,
        cords[1],
        cords[0],
        lastSeen
      );
      if (petRes) {
        setLoader(true);
        navigate("/my-pets");
      }
    } else {
      window.alert("Debes completar todos los datos solisitados");
      setLoader(false);
    }
  }

  return (
    <div>
      {loader && <Spinner></Spinner>}
      <div className={css.root}>
        <div className={css.inputContainer}>
          <div>
            <MainText>NOMBRE</MainText>
          </div>
          <input
            onChange={getName}
            className={css.inputName}
            type="text"
            name="name"
          />
        </div>
        <div>
          <DropZoneEl
            onChange={(e) => {
              getDropUrl(e);
            }}
          ></DropZoneEl>
        </div>
        <div>
          <MapBoxEl
            onChange={(e) => {
              getMapInfo(e);
            }}
          ></MapBoxEl>
        </div>
        <div onClick={reportHandler} className={css.reportBtn}>
          <MainButton colorBlue={true}>
            <MainText>Reportar como perdido</MainText>
          </MainButton>
        </div>
      </div>
    </div>
  );
}
