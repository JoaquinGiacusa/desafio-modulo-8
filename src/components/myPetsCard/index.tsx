import React from "react";
import css from "./index.css";
import editIcon from "../../img/editIcon.svg";
import { usePetInfo } from "../../hooks";
import { useNavigate } from "react-router-dom";

type PropsMyPets = {
  picture: string;
  name: string;
  lastSeen: string;
  petId: number;
  lat: "";
  lng: "";
};

export function MyPetsCard(props: PropsMyPets) {
  const [petInfo, setPetInfo] = usePetInfo();
  let navigate = useNavigate();

  function handleEditPet() {
    setPetInfo({
      id: props.petId,
      petName: props.name,
      coord: [props.lng, props.lat],
      lastSeen: props.lastSeen,
      imageURL: props.picture,
    });
    navigate("/edit-pet");
  }

  return (
    <div className={css.card}>
      <img className={css["card-img"]} src={props.picture} />
      <div className={css["card-text"]}>
        <div>
          <div className={css.petName}>{props.name}</div>
          <div className={css.petLastSeen}>{props.lastSeen}</div>
        </div>
        <div className={css.editBtn}>
          <img src={editIcon} onClick={handleEditPet} />
        </div>
      </div>
    </div>
  );
}
