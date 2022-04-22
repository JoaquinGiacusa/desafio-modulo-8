import React from "react";
import css from "./index.css";

export function Spinner() {
  return (
    <div className={css.loaderBackground}>
      <div className={css.loader}></div>
    </div>
  );
}
