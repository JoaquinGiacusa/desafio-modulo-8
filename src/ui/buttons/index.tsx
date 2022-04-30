import React from "react";
import css from "./index.css";

type PropsBoton = {
  children: any;
  onClick?;
  colorBlue?: boolean;
};

export function MainButton(props: PropsBoton) {
  return (
    <button
      onClick={props.onClick}
      className={props.colorBlue ? css.blue : css.root}
    >
      {props.children}
    </button>
  );
}
