import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import {
  useRecoilValue,
  useRecoilState,
  useResetRecoilState,
  RecoilState,
} from "recoil";
import { atom, selector } from "recoil";
import {
  getNearPets,
  checkEmailUser,
  getProfile,
  updateUser,
  getMyPets,
} from "../lib/api";

//===>
const locPermission = atom({
  key: "locPermission",
  default: false,
});

// export function useLocPermiss() {
//   const [locPermiss, useLocPermiss] = useRecoilState(locPermission);
//   const navigate = useNavigate();
//   //si tengo la ubi paso a mostras los resultados directamente
//   useEffect(() => {
//     if (locPermiss) {
//       navigate("/near-lost-pets");
//     }
//   }, [locPermiss]);
// }
export const useGetLocPermiss = () => useRecoilState(locPermission);

//===>
const myLoc = atom({
  key: "location",
  default: {
    lat: "",
    lng: "",
  },
});
export const useMyLoc = () => useRecoilState(myLoc);

//===>
const modalReport = atom({
  key: "modal",
  default: false,
});
export const useModalAction = () => useRecoilState(modalReport);

///////
//get near lost pets
const searchNearPets = selector({
  key: "petsNear",
  get: async ({ get }) => {
    const myLastLocation = get(myLoc);
    const lat = myLastLocation.lat;
    const lng = myLastLocation.lng;

    if (lat == "" || lng == "") {
      return false;
    } else if (lat != "" && lng != "") {
      //retorna la llamada a la api
      const results = await getNearPets(lat, lng);
      const lostPets = results.filter((p) => {
        return p.lostStatus == true;
      });
      return lostPets;
    }
  },
});

export function useGetNearPets() {
  const results = useRecoilValue(searchNearPets);
  console.log(results);

  return results;
}

//si resive un parametro igual a false redirige al home
export function useRedirectHome(param) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!param) {
      navigate("/");
    }
  });
}

//si no tengo el token te manda a login
export function useCheckLog() {
  const navigate = useNavigate();
  const [token, setToken] = useAuthToken();
  useEffect(() => {
    if (token == "" || token == null) {
      navigate("/login");
    }
  }, [token]);
}

//////=>HEADER
// const headerStatus = atom({
//   key: "headerStatus",
//   default: false,
// });

// export const useHeaderStatus = () => useRecoilState(headerStatus);
/////

//////=> My info
const userEmail = atom({
  key: "userEmail",
  default: "",
});
export const useUserEmail = () => useRecoilState(userEmail);

const cheackUser = selector({
  key: "cheackUser",
  get: async ({ get }) => {
    const myEmail = get(userEmail);

    //retorna la llamada a la api
    const results = await checkEmailUser(myEmail);

    return results;
  },
});

//export const useCheackEmail = () => useRecoilValue(cheackUser);
export function useCheackEmail() {
  const results = useRecoilValue(cheackUser);
  return results;
}

//authToken atom
const authToken = atom({
  key: "authToken",
  default: sessionStorage.getItem("token"),
});
export const useAuthToken = () => useRecoilState(authToken);

//username atom
const userName = atom({
  key: "userName",
  default: "",
});

export const useUserName = () => useRecoilState(userName);

const getUserData = selector({
  key: "getUserData",
  get: async ({ get }) => {
    const token = get(authToken);
    //retorna la llamada a la api
    if (token) {
      const res = await getProfile(token);
      return res;
    } else {
      return false;
    }
  },
});

export function useProfileData() {
  const userData = useRecoilValue(getUserData);

  const [userName, setUserName] = useUserName();
  const [userEmail, setUserEmail] = useUserEmail();

  useEffect(() => {
    if (userData) {
      setUserName(userData.fullName);
      setUserEmail(userData.email);
    }
  }, [userData]);

  // return userName;
}

//mis mascotas publicadas
const myLostPets = atom({
  key: "myLostPets",
  default: [],
});

const getMyLostPets = selector({
  key: "getMyLostPets",
  get: async ({ get }) => {
    const token = get(authToken);
    if (token) {
      console.log("pase por aca");

      const res = await getMyPets(token);
      console.log("res", res);
      return res;
    }
    // else {
    //   return "xd";
    // }
  },
});

export function useMyLostPets() {
  const [myPets, setMyPets] = useRecoilState(myLostPets);
  const resGetMyPets = useRecoilValue(getMyLostPets);

  useEffect(() => {
    setMyPets(resGetMyPets);
    /////////////
  }, [resGetMyPets]);
  return myPets;
}

//ultima ruta
// const lastRoute = atom({
//   key: "lastRoute",
//   default: "",
// });
// export const useLastRoute = () => useRecoilState(lastRoute);

//idPet para editer atom
const petInfoEdit = atom({
  key: "petInfoEdit",
  default: { id: 0, petName: "", coord: [], lastSeen: "", imageURL: "" },
});

export const usePetInfo = () => useRecoilState(petInfoEdit);

/////////////////////////test
// export const getTest = selector({
//   key: "getTest",
//   get: async ({ get }) => {
//     const token = get(authToken);
//     console.log(token);

//     console.log("pase por aca test");

//     const res = await getMyPets(token);
//     console.log("res", res);
//     return res;

//     // else {
//     //   return "xd";
//     // }
//   },
// });
export function useRefreshPets() {
  // const resGetMyPets = useRecoilValue(gegetTesttTest);
  // return useRecoilRefresher_UNSTABLE(resGetMyPets);
  return useRecoilRefresher_UNSTABLE(getMyLostPets);
}

// export function useMyLostPetsTest() {
//   const resGetMyPets = useRecoilValue(getTest);
//   return resGetMyPets;
// }

// const updateUserData = selector({
//   key: "updateUserData",
//   get: async ({ get }) => {
//     const token = get(authToken);
//     //retorna la llamada a la api

//     const res = await updateUser("Josesito", token);
//     return res;
//   },
// });

// export function useTokenStatus() {
//   const [authToken, setAuthToken] = useAuthToken();
//   return authToken ? true : false;
// }

// //hook para borrar el token y cerrar sesion
// export function useLogout() {
//   const [token, setToken] = useRecoilState(authToken);
//   sessionStorage.clear();
//   console.log("puto el que lee", token);

//   const resetToken = useResetRecoilState(authToken);
//   //return resetToken;
// }
