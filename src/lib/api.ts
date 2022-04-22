const API_BASE_URL = "http://localhost:3005"; //"https://desafio-modulo7.herokuapp.com";

export async function getNearPets(lat, lng) {
  const res = await fetch(
    API_BASE_URL + "/mascotas-cerca-de" + "?lat=" + lat + "&lng=" + lng
  );
  const data = await res.json();
  return data;
}

//se fija en la BD si el email existe para iniciar secion
export async function checkEmailUser(email) {
  const res = await fetch(API_BASE_URL + "/users/" + email);
  const data = await res.json();
  if (data == "user doesn't exist") {
    console.error(data);
    return data;
  } else {
    console.log("aca si existe");

    return data;
  }
}

//para iniciar secion
export async function signIn(email, password) {
  const res = await fetch(API_BASE_URL + "/auth/token", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await res.json();
  if (data.token.hasOwnProperty("error")) {
    console.error("contraseña incorrecta");
    return false;
  } else {
    sessionStorage.setItem("token", data.token);
    return data.token;
  }
}

export async function getProfile(token) {
  const res = await fetch(API_BASE_URL + "/profile", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: "bearer " + token,
    },
  });
  const data = await res.json();
  return data;
}

//para actualizar nombre de usuario y/o contraseña
export async function updateUser(fullName, token, psw?) {
  const res = await fetch(API_BASE_URL + "/update-profile", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "bearer " + token,
    },
    body: JSON.stringify({
      fullName,
      password: psw,
    }),
  });
  const data = await res.json();
  return data;
}