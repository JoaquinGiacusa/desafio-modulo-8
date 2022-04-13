import React from "react";
import { Link } from "react-router-dom";
import css from "./header.css";
import burger from "../../img/burger.svg";
import petHand from "../../img/petHand.svg";

export function Header() {
  function handleBurger() {
    console.log("hola");
  }

  return (
    <div className={css.header}>
      <Link to={"/"}>
        <img src={petHand} />
      </Link>
      <img onClick={handleBurger} src={burger} />
    </div>
  );
}
