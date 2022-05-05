import React, { useState } from "react";
import { MainText } from "../../ui/text-font";
import css from "./index.css";
import { DropZoneEl } from "../dropZone";
import { MapBoxEl } from "../map";
import { MainButton } from "../../ui/buttons";
import { createALostPet } from "../../lib/api";
import { useAuthToken, useRefreshPets } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../ui/spinner";

export function ReportForm() {
  const [petName, setPetName] = useState("");
  const [cords, setCords] = useState("");
  const [lastSeen, setLastSeen] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const [token, setToken] = useAuthToken();
  const [loader, setLoader] = useState(false);
  var refresh = useRefreshPets();
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
    setLoader(true);
    if (token && petName && urlImg && cords[1] && cords[0] && lastSeen) {
      createALostPet(
        token,
        petName,
        urlImg,
        cords[1],
        cords[0],
        lastSeen,
        () => {
          refresh();
          navigate("/my-pets");
        }
      );
    }
  }

  return (
    <div className={css.root}>
      {loader && <Spinner></Spinner>}
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
          coord={[-60.7151117, -31.6441985]}
        ></MapBoxEl>
      </div>
      <div onClick={reportHandler} className={css.reportBtn}>
        <MainButton colorBlue={true}>
          <MainText>Reportar como perdido</MainText>
        </MainButton>
      </div>
    </div>
  );
}
