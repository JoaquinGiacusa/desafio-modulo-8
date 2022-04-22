import React from "react";
import { Login } from "../../components/loginForm";
import { MainText } from "../../ui/text-font";
import css from "./index.css";

function LoginPage() {
  return (
    <div className={css.root}>
      <div className={css.titleContainer}>
        <MainText title={true}>Ingresar</MainText>
      </div>
      <Login />
    </div>
  );
}

export { LoginPage };
