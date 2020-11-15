const SHOW_CATEGORY = "post/SHOW_CATEGORY";
const GET_CATEGORY_LIST = "post/GET_CATEGORY_LIST";
const GET_POST_BY_FILTER = "post/GET_POST_BY_FILTER";
const LAST_PAGE = "post/LAST_PAGE";

// 카테고리 보여주기
export const showCategory = (show) => ({
    type: SHOW_CATEGORY,
    payload: show,
});

// 카테고리 생성 및 카테고리 불러오기
export const getCategoryList = (data) => ({
    type: GET_CATEGORY_LIST,
    payload: data,
});

// 카테고리에 따른 post 필터
export const getPostByFilter = (filter, post) => ({
    type: GET_POST_BY_FILTER,
    payload: { filter, post },
});

export const lastPage = (pageNum) => ({
    type: LAST_PAGE,
    payload: pageNum,
});

// 리듀서

function post(state = {}, action) {
    switch (action.type) {
        case SHOW_CATEGORY: {
            return {
                ...state,
                show: action.payload ? action.payload : false,
            };
        }
        case GET_CATEGORY_LIST: {
            return {
                ...state,
                data: action.payload,
            };
        }
        case GET_POST_BY_FILTER: {
            return {
                ...state,
                filter: action.payload.filter,
                post: action.payload.post,
            };
        }
        case LAST_PAGE: {
            return {
                ...state,
                lastPage: action.payload,
            };
        }
    }
    return state;
}

export default post;
