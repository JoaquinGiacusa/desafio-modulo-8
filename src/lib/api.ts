const API_BASE_URL = "http://localhost:3005"; //"https://desafio-modulo7.herokuapp.com";

export async function getNearPets(lat, lng) {
  console.log("HICE UNA LLAMADA", lat, lng);

  const res = await fetch(
    API_BASE_URL + "/mascotas-cerca-de" + "?lat=" + lat + "&lng=" + lng
  );
  const data = await res.json();
  return data;
}

// export async function auth(email, password) {
//   // obtiene un token
//   return {
//     token: "asdf1234",
//   };
// }
// export async function getMe() {
//   // obtiene la data del user vinculada al token
//   return {
//     token: 1234,
//   };
// }
