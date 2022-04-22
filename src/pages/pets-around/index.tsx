import React from "react";
import { NearPetsResult } from "../../components/nearPetsResult";
import { useGetLocPermiss, useRedirectHome } from "../../hooks";

export function PetsAroundPage() {
  const [locPermiss, setlocPermiss] = useGetLocPermiss();
  useRedirectHome(locPermiss);

  return (
    <div>
      <NearPetsResult />
    </div>
  );
}
