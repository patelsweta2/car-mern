let baseUrl;

if (process.env.NODE_ENV === "development") {
  baseUrl = "http:/localhost:8000/api";
}

if (process.env.NODE_ENV === "production") {
  baseUrl = "http:/localhost:8000/api";
}

export { baseUrl };

const ENDPOINTS = {
  SIGNIN: `${baseUrl}/users/signup`,
  SIGNUP: `${baseUrl}/users/login`,
  LOGOUT: `${baseUrl}/users/logout`,
  ADDCAR: `${baseUrl}/cars/add`,
  GETALLCARS: `${baseUrl}/cars/all`,
  SEARCH_CARS: `${baseUrl}/cars/`,
  GET_CAR_DETAILS: `${baseUrl}/cars`,
  UPDATE_CARS: `${baseUrl}/cars`,
  DELETE_CARS: `${baseUrl}/cars`,
};

export default ENDPOINTS;
