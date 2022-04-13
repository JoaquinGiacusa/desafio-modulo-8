import React, { useState, useEffect } from "react";
//import { SearchForm } from "./SearchForm";
import { Outlet } from "react-router-dom";
import { Header } from "./header";
import css from "/layout.css";

function Layout() {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
}

export { Layout };
