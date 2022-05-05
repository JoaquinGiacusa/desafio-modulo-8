import React, { useEffect, useState } from "react";
import { Login } from "../../components/loginForm";
import { useNavigate } from "react-router-dom";
import { MainText } from "../../ui/text-font";
import { MyUserData } from "../../components/myUserData";
import css from "./index.css";
import { useCheckLog } from "../../hooks";

export function MyInfo() {
  useCheckLog();

  return (
    <div className={css.root}>
      <div className={css.titleContainer}>
        <MainText title={true}>Mis datos</MainText>
      </div>
      <MyUserData></MyUserData>
    </div>
  );
}
