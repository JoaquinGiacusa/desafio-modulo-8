import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { atom, selector } from "recoil";
//import { idState } from "./atoms";

// export function useId() {
//   return useRecoilValue(idState);
// }

const queryState = atom({
  key: "query",
  default: "",
});

const resultsState = selector({
  key: "searchResults",
  get: async ({ get }) => {
    const valorDeQuery = get(queryState);
    if (valorDeQuery) {
      // hago la búsqueda usando la API de mercadolibre
      const res = await fetch(
        "https://api.mercadolibre.com/sites/MLA/search?q=" + valorDeQuery
      );
      const data = await res.json();
      return data.results;
    } else {
      return [];
    }
  },
});

// mi custom hook
export function useSearchResults() {
  const params = useParams();
  const query = params.query;

  const setQueryValue = useSetRecoilState(queryState);

  useEffect(() => {
    setQueryValue(query);
  }, [query]);

  const results = useRecoilValue(resultsState);

  return results;
}
