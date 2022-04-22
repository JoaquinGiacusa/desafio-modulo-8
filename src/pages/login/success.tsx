import React from "react";
import { useNavigate } from "react-router-dom";
import { MainText } from "../../ui/text-font";
import css from "./index.css";

function SuccessPage() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/pets-around");
  }, 1200);

  return (
    <div className={css.root}>
      <MainText title={true}>Login correcto!</MainText>
    </div>
  );
}

export { SuccessPage };
