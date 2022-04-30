import React from "react";
import { MainText } from "../../ui/text-font";
import css from "./header.css";
import { useUserEmail, useProfileData } from "../../hooks";

export function SesionComp(props) {
  const [userEmail, setUserEmail] = useUserEmail();

  return (
    <div className={css.secionContainer}>
      <MainText>{userEmail}</MainText>
      <div onClick={props.handleLogout} className={css.logout}>
        CERRAR SESIÓN
      </div>
    </div>
  );
}
