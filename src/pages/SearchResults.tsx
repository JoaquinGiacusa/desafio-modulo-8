import React, { useState, useEffect } from "react";
import { SearchResultItem } from "../components/SearchResultItem";
import { useSearchResults } from "../hooks";

function Search() {
  const results = useSearchResults();
  console.log("Del HOME:", results);

  return (
    <div>
      {results.map((r) => (
        <SearchResultItem
          key={r.title}
          title={r.title}
          price={r.price}
          picture={r.thumbnail}
          id={r.id}
        />
      ))}
    </div>
  );
}

export { Search };
