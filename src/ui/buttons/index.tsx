import React from "react";
import css from "./index.css";

type PropsBoton = {
  children: string;
};

export function MainButton(props: PropsBoton) {
  return <button className={css.root}>{props.children}</button>;
}
