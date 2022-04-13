import React from "react";
import css from "./index.css";

type PropsText = {
  children: string;
  title?;
};

export function MainText(props: PropsText) {
  return (
    <div className={props.title ? css.title : css.text}>{props.children}</div>
  );
}
