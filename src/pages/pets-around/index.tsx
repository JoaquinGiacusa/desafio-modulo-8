import React from "react";
import { NearPetsResult } from "../../components/nearPetsResult";
import { useGetLocPermiss, useRedirectHome } from "../../hooks";
import { MainText } from "../../ui/text-font";
import css from "./index.css";

export function PetsAroundPage() {
  const [locPermiss, setlocPermiss] = useGetLocPermiss();
  useRedirectHome(locPermiss);

  return (
    <div className={css.root}>
      <NearPetsResult />
    </div>
  );
}
