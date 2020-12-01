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

export const getToken = (isLogin) => ({
    type: GET_TOKEN,
    payload: { isLogin },
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
                isLogin: action.payload.isLogin,
            };
        default:
            return state;
    }
}

export default auth;
