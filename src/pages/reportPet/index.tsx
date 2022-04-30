import React from "react";
import { MainText } from "../../ui/text-font";
import css from "./index.css";
import { useCheckLog } from "../../hooks";
import { ReportForm } from "../../components/reportForm";

export function ReportPetPage() {
  useCheckLog();

  return (
    <div className={css.root}>
      <div className={css.title}>
        <MainText title={true}>Reportar mascota perdida</MainText>
      </div>
      <ReportForm></ReportForm>
    </div>
  );
}
