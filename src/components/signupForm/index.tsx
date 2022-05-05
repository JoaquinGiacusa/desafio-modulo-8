import React, { useEffect, useState } from "react";
import { MainButton } from "../../ui/buttons";
import { MainText } from "../../ui/text-font";
import { TextField } from "../../ui/text-field";
import { createUser, signIn } from "../../lib/api";
import {
  useUserName,
  useProfileData,
  useAuthToken,
  useUserEmail,
} from "../../hooks";
import css from "./index.css";
import { Spinner } from "../../ui/spinner";
import { useNavigate } from "react-router-dom";

export function RegisterFrom() {
  const [loader, setLoader] = useState(false);
  const [userName, setUserName] = useUserName();
  const [userEmail, setUserEmail] = useUserEmail();
  const [authToken, setAuthToken] = useAuthToken();

  const navigate = useNavigate();

  useEffect(() => {
    if (userEmail == "") {
      navigate("/login");
    }
  }, [userEmail]);

  //const userName = "anashei";
  function submitHandler(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const psw = e.target.password.value;
    const rePassword = e.target["re-password"].value;

    setLoader(true);
    if (name == "" || psw == "") {
      setLoader(false);
      window.alert("Debes completar todos los campos");
    } else if (psw != rePassword) {
      setLoader(false);
      window.alert("Las contraseñas no coinciden");
    } else if (name != "" && psw === rePassword) {
      //  setLoader(true);
      createUser(name, userEmail, psw, async () => {
        window.alert("usuario creado exitosamente");
        const token = await signIn(userEmail, psw);
        if (token) {
          setAuthToken(token);
          navigate("/login/success");
        }
        navigate("/");
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
