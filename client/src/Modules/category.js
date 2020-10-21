const SHOW_CATEGORY = "category/SHOW_CATEGORY";
const CREATE_CATEGORY_LIST = "category/CREATE_CATEGORY_LIST";
const FILTER_CATEGORY = "category/FILTER_CATEGORY";

// 카테고리 보여주기
export const showCategory = (show) => ({
  type: SHOW_CATEGORY,
  payload: show,
});

// 카테고리 생성 및 카테고리 불러오기
export const createCategoryList = (data) => ({
  type: CREATE_CATEGORY_LIST,
  payload: data,
});

// 카테고리에 따른 post 필터
export const filterCategory = (filter, post) => ({
  type: FILTER_CATEGORY,
  payload: { filter, post },
});

// 리듀서

function category(state = {}, action) {
  switch (action.type) {
    case SHOW_CATEGORY: {
      return {
        ...state,
        show: action.payload ? action.payload : false,
      };
    }
    case CREATE_CATEGORY_LIST: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case FILTER_CATEGORY: {
      return {
        ...state,
        filter: action.payload.filter,
        post: action.payload.post,
      };
    }
  }
  return state;
}

export default category;
