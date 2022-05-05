//const API_BASE_URL = "http://localhost:3005";
const API_BASE_URL = "https://desafio-modulo7.herokuapp.com";

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

//mis mascotas publicadas
export async function getMyPets(token) {
  const res = await fetch(API_BASE_URL + "/my-pets", {
    headers: {
      "content-type": "application/json",
      Authorization: "bearer " + token,
    },
  });

  const data = await res.json();

  if (data != undefined) {
    // const petsLost = data.filter((pet) => {
    //   return pet.lostStatus == true;
    // });
    return data;
  } else {
    return false;
  }
}

export function createALostPet(
  token,
  petName,
  imageURL,
  lat,
  lng,
  lastSeen,
  callback
) {
  fetch(API_BASE_URL + "/pet", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "bearer " + token,
    },
    body: JSON.stringify({
      name: petName,
      imageURL: imageURL,
      last_location_lat: lat,
      last_location_lng: lng,
      lastSeen: lastSeen,
      lostStatus: "",
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      callback();
      //return data;
    });
}

//delete pet
export function deletPet(token, petId, callback) {
  fetch(API_BASE_URL + "/delet-pet/" + petId, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: "bearer " + token,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data) {
        callback();
      }
    });
}

//editar mascota
export function editLostPet(
  token,
  petId,
  petName,
  imageURL,
  lat,
  lng,
  lastSeen,
  callback?
) {
  fetch(API_BASE_URL + "/update-pet", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: "bearer " + token,
    },
    body: JSON.stringify({
      petId,
      updatedPetInfo: {
        name: petName,
        imageURL: imageURL,
        last_location_lat: lat,
        last_location_lng: lng,
        lastSeen: lastSeen,
        lostStatus: "",
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      callback();
    });
}

export function markFound(token, petId, callback?) {
  fetch(API_BASE_URL + "/mark-found/" + petId, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: "bearer " + token,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      callback();
    });
}

export function createUser(fullName, email, psw, callback) {
  fetch(API_BASE_URL + "/auth", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      fullName: fullName,
      email: email,
      password: psw,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      callback();
    });
}

export async function setReportInfo(
  fullName,
  phoneNum,
  lastSeen,
  petId,
  callback
) {
  const reportInfo = {
    fullName: fullName,
    phoneNum: phoneNum,
    lastSeen: lastSeen,
    petId: petId,
  };

  const res = await fetch(API_BASE_URL + "/report", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(reportInfo),
  });
  const data = await res.json();
  console.log(data);
  await callback();
}
