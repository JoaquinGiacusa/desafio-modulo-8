import React from "react";
import css from "./index.css";

type PropsTextField = {
  inputType: string;
  inputName: string;
  initialValue?;
};

export function TextField(props: PropsTextField) {
  return (
    <input
      className={css.root}
      type={props.inputType}
      name={props.inputName}
      defaultValue={props.initialValue}
    />
  );
}
