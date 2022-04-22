import React from "react";
import { Password } from "../../components/loginForm/password";
import { MainText } from "../../ui/text-font";
import css from "./index.css";

function PasswordPage() {
  return (
    <div className={css.root}>
      <div className={css.titleContainer}>
        <MainText title={true}>Ingresar</MainText>
      </div>
      <Password />
    </div>
  );
}

export { PasswordPage };
