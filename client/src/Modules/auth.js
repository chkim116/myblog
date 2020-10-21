const GET_USER = "auth/GET_USER";

export const getAuth = (user) => ({
  type: GET_USER,
  payload: {
    id: user.id,
    username: user.username,
    admin: user.admin,
  },
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

    default:
      return state;
  }
}

export default auth;
