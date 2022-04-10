import React from "react";
import { MainButton } from "../ui/buttons";
import { TextField } from "../ui/text-field";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSearchResults } from "../hooks";
import "./search-form.css";

export function SearchForm() {
  let navigate = useNavigate();
  const results = useSearchResults();
  function handleSearch(e) {
    e.preventDefault();
    const search = e.target.search.value;
    navigate("/search/" + search, { replace: true });
  }

  return (
    <form
      className="root-search-form"
      onSubmit={(e) => {
        handleSearch(e);
      }}
    >
      <TextField inputType="text" inputName="search" />
      <MainButton>Buscar</MainButton>
      <h4>Resultados:{results.length}</h4>
    </form>
  );
}
