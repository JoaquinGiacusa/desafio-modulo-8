import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { useRecoilValue, useRecoilState } from "recoil";
import { atom, selector } from "recoil";
import { getNearPets, checkEmailUser, getProfile, getMyPets } from "../lib/api";

//===>
const locPermission = atom({
  key: "locPermission",
  default: false,
});

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
      const res = await getMyPets(token);
      return res;
    }
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

//idPet para editer atom
const petInfoEdit = atom({
  key: "petInfoEdit",
  default: { id: 0, petName: "", coord: [], lastSeen: "", imageURL: "" },
});

export const usePetInfo = () => useRecoilState(petInfoEdit);

export function useRefreshPets() {
  return useRecoilRefresher_UNSTABLE(getMyLostPets);
}
