
export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

// getContent acepta al token como argumento.
export const getUserInfo = (token) => {
  // Envía una solicitud GET a /users/me
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Especifica un encabezado de autorización con un valor formateado 
      // adecuadamente.
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

export const getInitialCards = () => {
  return fetch(`${BASE_URL}/cards`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};