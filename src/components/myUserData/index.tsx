import React, { useState } from "react";
import { MainButton } from "../../ui/buttons";
import { MainText } from "../../ui/text-font";
import { TextField } from "../../ui/text-field";
import { updateUser } from "../../lib/api";
import { useUserName, useAuthToken } from "../../hooks";
import css from "./index.css";
import { Spinner } from "../../ui/spinner";

export function MyUserData() {
  const [loader, setLoader] = useState(false);
  const [authToken, setAuthToken] = useAuthToken();
  const [userName, setUserName] = useUserName();

  function submitHandler(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const psw = e.target.password.value;
    const rePassword = e.target["re-password"].value;

    setLoader(true);
    if (name != userName && psw == "") {
      updateUser(name, authToken).then((res) => {
        setUserName(name);
        setLoader(false);
      });
    } else if (name == "" || psw == "") {
      setLoader(false);
      window.alert("Debes completar todos los campos");
    } else if (psw != rePassword) {
      setLoader(false);
      window.alert("Las contraseñas no coinciden");
    } else if (psw === rePassword) {
      updateUser(name, authToken, psw).then((res) => {
        setUserName(name);
        setLoader(false);
      });
    }
  }

  return (
    <form className={css.root} onSubmit={submitHandler}>
      {loader && <Spinner></Spinner>}
      <div className={css.inputNameContainer}>
        <MainText>NOMBRE</MainText>
        <TextField
          initialValue={userName}
          inputName="name"
          inputType="name"
        ></TextField>
      </div>
      <div>
        <div className={css.pswContainer}>
          <MainText>CONTRASEÑA</MainText>
          <TextField inputName="password" inputType="password"></TextField>
        </div>
        <div>
          <MainText>REPETIR CONTRASEÑA</MainText>
          <TextField inputName="re-password" inputType="password"></TextField>
        </div>
      </div>
      <div className={css.btnContainer}>
        <MainButton>
          <MainText>Guardar</MainText>
        </MainButton>
      </div>
    </form>
  );
}
