const GET_AUTH = "auth/GET_AUTH";
const GET_TOKEN = "auth/GET_TOKEN";

export const getAuth = (user) => ({
    type: GET_AUTH,
    payload: {
        id: user.id,
        username: user.username,
        admin: user.admin,
    },
});

export const getToken = ({ id, token }) => ({
    type: GET_TOKEN,
    payload: { id, token },
});

function auth(state = {}, action) {
    switch (action.type) {
        case GET_AUTH:
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                admin: action.payload.admin,
            };
        case GET_TOKEN:
            return {
                ...state,
                isLogin: action.payload.id === true,
                token: action.payload.token,
            };
        default:
            return state;
    }
}

export default auth;
