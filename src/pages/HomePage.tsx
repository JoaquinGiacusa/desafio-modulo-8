import React, { useState, useEffect, useContext, Suspense } from "react";
import { MainText } from "../ui/text-font";
import { GetLoc } from "../components/getLoc";
import css from "./homePage.css";
import { Link, useNavigate, useParams } from "react-router-dom";

function HomePage() {
  return (
    <div className={css.root}>
      <MainText title={true}>Mascotas perdidas cerca tuyo</MainText>
      <MainText>
        Para ver las mascotas reportadas cerca tuyo necesitamos permiso para
        conocer tu ubicación.
      </MainText>
      <GetLoc />
    </div>
  );
}

export { HomePage };
