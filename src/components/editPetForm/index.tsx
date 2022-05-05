import React, { useEffect, useState } from "react";
import { MainText } from "../../ui/text-font";
import css from "./index.css";
import { DropZoneEl } from "../dropZone";
import { MapBoxEl } from "../map";
import { MainButton } from "../../ui/buttons";
import { deletPet, editLostPet, markFound } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { usePetInfo, useAuthToken, useRefreshPets } from "../../hooks";
import { Spinner } from "../../ui/spinner";

export function EditPetForm() {
  const [petInfo, setPetInfo] = usePetInfo();
  const [petName, setPetName] = useState(petInfo.petName);
  const [cords, setCords] = useState(petInfo.coord);
  const [lastSeen, setLastSeen] = useState(petInfo.lastSeen);
  const [urlImg, setUrlImg] = useState(petInfo.imageURL);
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

  function saveHandler() {
    setLoader(true);
    if (token && petName && urlImg && cords[1] && cords[0] && lastSeen) {
      editLostPet(
        token,
        petInfo.id,
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

  function handleDeletePet() {
    refresh();
    deletPet(token, petInfo.id, () => {
      navigate("/my-pets");
    });
  }
  function handleMarkFound() {
    markFound(token, petInfo.id, () => {
      navigate("/my-pets");
    });
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
          defaultValue={petName}
        />
      </div>
      <div>
        <DropZoneEl
          imageURL={petInfo.imageURL}
          onChange={(e) => {
            getDropUrl(e);
          }}
        ></DropZoneEl>
      </div>
      <div>
        <MapBoxEl
          coord={petInfo.coord}
          lastSeen={lastSeen}
          onChange={(e) => {
            getMapInfo(e);
          }}
        ></MapBoxEl>
      </div>
      <div onClick={saveHandler} className={css.saveBtn}>
        <MainButton colorBlue={true}>
          <MainText>Guardar</MainText>
        </MainButton>
      </div>
      <div onClick={handleMarkFound} className={css.reportFind}>
        <MainButton>
          <MainText>Reportar como encontrado</MainText>
        </MainButton>
      </div>
      <div onClick={handleDeletePet} className={css.deleteBtn}>
        DESPUBLICAR
      </div>
    </div>
  );
}
