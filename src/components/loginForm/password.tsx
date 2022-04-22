import React, { useState, useEffect } from "react";
import { useUserEmail, useUserName, useAuthToken } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../ui/text-field";
import { MainText } from "../../ui/text-font";
import { MainButton } from "../../ui/buttons";
import css from "./index.css";
import { signIn } from "../../lib/api";
import { Spinner } from "../../ui/spinner";

function Password() {
  const [userEmail, setUserEmail] = useUserEmail();
  const [authToken, setAuthToken] = useAuthToken();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userEmail == "") {
      navigate("/login");
    }
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    setLoader(true);
    const password = e.target.password.value;

    const token = await signIn(userEmail, password);
    if (token) {
      //seteo el token en el atom
      setAuthToken(token);
      navigate("/login/success");
    } else {
      setLoader(false);
      window.alert("Contraseña incorrecta!");
    }
  }

  return (
    <form className={css.root} onSubmit={submitHandler}>
      {loader && <Spinner></Spinner>}
      <MainText>CONTRASEÑA</MainText>
      <TextField inputName="password" inputType="password"></TextField>
      <div className={css.btnContainer}>
        <MainButton>Ingresar</MainButton>
      </div>
    </form>
  );
}

export { Password };
