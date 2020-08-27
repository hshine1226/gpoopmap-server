// Global routes
const HOME = "/";

// API routes
const API = "/api";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const GET_USER_BY_EMAIL = "/users/user";
const USER = "/users/user/:id";
const POST_TOILET = "/toilets/toilet";
const GET_TOILET = "/toilets/toilet/:id";
const NEAR_TOILETS = "/toilets/nearby";

const routes = {
  // Global routes
  home: HOME,

  // Api routes
  api: API,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  postToilet: POST_TOILET,
  getToilet: GET_TOILET,
  nearToilets: NEAR_TOILETS,
  getUserByEmail: GET_USER_BY_EMAIL,
  user: USER,
};

export default routes;
