import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import css from "./header.css";
import burger from "../../img/burger.svg";
import petHand from "../../img/petHand.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserEmail, useAuthToken, useProfileData } from "../../hooks";
import { MainText } from "../../ui/text-font";
import { SesionComp } from "./sesion";

export function Header() {
  const [authToken, setAuthToken] = useAuthToken();
  const [headerStatus, setHeaderStatus] = useState(false);
  const [lastRoute, setLastRoute] = useState("");
  let navigate = useNavigate();
  var location = useLocation();
  useProfileData();

  function handleBurger() {
    setLastRoute(location.pathname);
    openHeader();
  }

  function openHeader() {
    setHeaderStatus(true);
  }

  function closeHeader() {
    setHeaderStatus(false);
    navigate(lastRoute);
  }

  function handleLogout() {
    console.log("antes", authToken);
    setAuthToken(null);
    console.log("despues", authToken);
    sessionStorage.clear();
  }

  return (
    <div>
      {headerStatus && (
        <div className={css.openHeaderContainer}>
          <div className={css.closeHeaderBtnContainer}>
            <button className={css.closeHeaderBtn} onClick={closeHeader}>
              X
            </button>
          </div>
          <div className={css.headerLinksContainer}>
            <div className={css.headerLinks}>
              <Link onClick={closeHeader} className={css.link} to={"/me"}>
                Mis datos
              </Link>
              <Link onClick={closeHeader} className={css.link} to={"/my-pets"}>
                Mis mascotas reportadas
              </Link>
              <Link
                onClick={closeHeader}
                className={css.link}
                to={"/report-pet"}
              >
                Reportar mascota
              </Link>
            </div>
          </div>
          {authToken && <SesionComp handleLogout={handleLogout}></SesionComp>}
          {/* <div className={css.secionContainer}>
            <MainText>{authToken ? userEmail : ""}</MainText>
            <div onClick={handleLogout} className={css.logout}>
              CERRAR SESIÓN
            </div>
          </div> */}
        </div>
      )}
      <div className={css.header}>
        <Link className={css.icons} to={"/pets-around"}>
          <img src={petHand} />
        </Link>

        <Link className={css.icons} to={"/"}>
          <img onClick={handleBurger} src={burger} />
        </Link>
      </div>
    </div>
  );
}
