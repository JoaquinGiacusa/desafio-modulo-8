import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Layout } from "../components/Layout";
import { SignIn } from "../pages/SignIn";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="/sign-in" element={<SignIn />}></Route>
        {/* <Route path="/search/:query" element={<Search />} />
        <Route path="item/:id" element={<Item />} /> */}
      </Route>
    </Routes>
  );
}
