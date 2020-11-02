const API = "https://kormelon.herokuapp.com" || "http://localhost:4000";

//  basic path
const HOME = "/";
const GUESTBOOK = "/guestbook";
const POST = "/post";
const ABOUT = "/about";
const REGISTER = "/register";
const LOGIN = "/login";

// posting
const POSTWRITING = "/postwriting";
const POSTDETAIL = "/postdetail";

// port
const GUESTBOOKING = "/guestbooking";
const GUESTBOOKDETAIL = "/guestbookdetail";

// search
const SEARCH = "/search";

const routes = {
  home: HOME,
  guestbook: GUESTBOOK,
  post: POST,
  about: ABOUT,
  register: REGISTER,
  login: LOGIN,
  postwriting: POSTWRITING,
  postdetail: POSTDETAIL,
  guestbooking: GUESTBOOKING,
  guestbookdetail: GUESTBOOKDETAIL,
  search: SEARCH,
  api: API,
};

export default routes;
