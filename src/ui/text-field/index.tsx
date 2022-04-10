import React from "react";

type PropsTextField = {
  inputType: string;
  inputName: string;
};

export function TextField(props: PropsTextField) {
  return (
    <input
      className="inputText"
      type={props.inputType}
      name={props.inputName}
    />
  );
}
