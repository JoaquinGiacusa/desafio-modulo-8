import React, { useEffect, useState } from "react";
import { Login } from "../../components/loginForm";
import { useNavigate } from "react-router-dom";
import { MainText } from "../../ui/text-font";
import { MyUserData } from "../../components/myUserData";
import css from "./index.css";
import { useAuthToken } from "../../hooks";

// /me
export function MyInfo() {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useAuthToken();
  console.log("authToken", authToken);

  useEffect(() => {
    if (authToken == "" || authToken == null) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div className={css.root}>
      <div className={css.titleContainer}>
        <MainText title={true}>Mis datos</MainText>
      </div>

      {authToken && <MyUserData></MyUserData>}
    </div>
  );
}
