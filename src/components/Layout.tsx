import React, { useState, useEffect } from "react";
import { SearchForm } from "./SearchForm";
import { Outlet } from "react-router-dom";

//
import css from "./layout.css";
// const marce: UserApx = {
//   name: "Joaquin",
// };
console.log(css);

function Layout() {
  return (
    <div className={css["root-layout"]}>
      <header>
        <SearchForm></SearchForm>
      </header>
      <Outlet></Outlet>
      <footer>Footer</footer>
    </div>
  );
}

export { Layout };
