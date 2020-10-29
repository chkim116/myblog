const GET_USER = "auth/GET_USER";
const GET_TOKEN = "auth/GET_TOKEN";

export const getAuth = (user) => ({
  type: GET_USER,
  payload: {
    id: user.id,
    username: user.username,
    admin: user.admin,
  },
});

export const getToken = (token) => ({
  type: GET_TOKEN,
  payload: { token },
});

function auth(state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        admin: action.payload.admin,
      };
    case GET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
    default:
      return state;
  }
}

export default auth;
