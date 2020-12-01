const GET_CATEGORY_LIST = "post/GET_CATEGORY_LIST";

const GET_ALL_POST_FOR_LENGTH = "post/GET_ALL_POST_FOR_LENGTH";
const GET_POST_BY_FILTER = "post/GET_POST_BY_FILTER";
const DEL_POST_ON_CLICK = "post/DEL_POST_ON_CLICK";
const LAST_PAGE = "post/LAST_PAGE";

export const getAllPostForLength = (data) => ({
    type: GET_ALL_POST_FOR_LENGTH,
    payload: data,
});

export const getCategoryList = (data) => ({
    type: GET_CATEGORY_LIST,
    payload: data,
});

export const getPostByFilter = (filter, post) => ({
    type: GET_POST_BY_FILTER,
    payload: { filter, post },
});

export const delPostOnClick = (id) => ({
    type: DEL_POST_ON_CLICK,
    payload: id,
});

export const lastPage = (pageNum) => ({
    type: LAST_PAGE,
    payload: pageNum,
});

// 리듀서

function post(state = {}, action) {
    switch (action.type) {
        case GET_CATEGORY_LIST: {
            return {
                ...state,
                categoryList: action.payload,
            };
        }

        case GET_ALL_POST_FOR_LENGTH: {
            return {
                ...state,
                postLength: action.payload,
            };
        }
        case GET_POST_BY_FILTER: {
            return {
                ...state,
                filter: action.payload.filter,
                post: action.payload.post,
            };
        }
        case DEL_POST_ON_CLICK: {
            return {
                ...state,
                post: state.post.filter((p) => p._id !== action.payload),
            };
        }
        case LAST_PAGE: {
            return {
                ...state,
                lastPage: action.payload,
            };
        }
        default:
            return state;
    }
}

export default post;
