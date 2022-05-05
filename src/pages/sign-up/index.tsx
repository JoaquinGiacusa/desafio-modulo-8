import React from "react";
import { RegisterFrom } from "../../components/signupForm";
import css from "./index.css";
import { MainText } from "../../ui/text-font";

export function SignUp() {
  return (
    <div className={css.root}>
      <div className={css.titleContainer}>
        <MainText title={true}>
          Completa tus datos para terminar el registro
        </MainText>
      </div>
      <RegisterFrom></RegisterFrom>
    </div>
  );
}
