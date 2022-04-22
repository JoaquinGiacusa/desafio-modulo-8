import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/homePage";
import { Layout } from "../components/Layout";
import { LoginPage } from "../pages/login";
import { PasswordPage } from "../pages/login/password";
import { SuccessPage } from "../pages/login/success";
import { MyInfo } from "../pages/myInfo";
import { MyPetsPage } from "../pages/myPets";
import { PetsAroundPage } from "../pages/pets-around";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/pets-around" element={<PetsAroundPage />} />
        <Route path="/login">
          <Route index element={<LoginPage />} />
          <Route path="password" element={<PasswordPage />} />
          <Route path="success" element={<SuccessPage />} />
        </Route>
        <Route path="me" element={<MyInfo />} />
        <Route path="my-pets" element={<MyPetsPage />} />
      </Route>
    </Routes>
  );
}
