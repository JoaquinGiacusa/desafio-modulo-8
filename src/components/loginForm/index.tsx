import React, { useState, useEffect } from "react";
// import { useUserEmail } from "hooks/hooks";
// import { checkEmail } from "lib/api";
import { useNavigate } from "react-router-dom";
import { useUserEmail, useCheackEmail } from "../../hooks";
import { TextField } from "../../ui/text-field";
import { MainText } from "../../ui/text-font";
import { MainButton } from "../../ui/buttons";
import css from "./index.css";
import { checkEmailUser } from "../../lib/api";
import { Spinner } from "../../ui/spinner";

function Login() {
  const [loader, setLoader] = useState(false);
  console.log(loader);

  const [userEmail, setUserEmail] = useUserEmail();
  const navigate = useNavigate();

  async function submitHandler(e) {
    setLoader(true);
    e.preventDefault();
    const email = e.target.email.value;

    const results = await checkEmailUser(email);
    if (results == "user doesn't exist") {
      console.log(results);
    } else {
      setUserEmail(email);
      navigate("/login/password");
    }
  }

  //useEffect(() => {}, [loader]);

  return (
    <form className={css.root} onSubmit={submitHandler}>
      {loader && <Spinner></Spinner>}
      <MainText>TU EMAIL</MainText>
      <TextField inputName="email" inputType="email"></TextField>
      <div className={css.btnContainer}>
        <MainButton>Ingresar</MainButton>
      </div>
    </form>
  );
}

export { Login };
