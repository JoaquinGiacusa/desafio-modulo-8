import React from "react";
import css from "./index.css";

type PropsBoton = {
  children: any;
  onClick?;
};

export function MainButton(props: PropsBoton) {
  return (
    <button onClick={props.onClick} className={css.root}>
      {props.children}
    </button>
  );
}
