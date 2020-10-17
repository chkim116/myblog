const SHOW_CATEGORY = "category/SHOW_CATEGORY";
const CREATE_CATEGORY_LIST = "category/CREATE_CATEGORY_LIST";
const FILTER_CATEGORY = "category/FILTER_CATEGORY";

export const showCategory = (show) => ({
  type: SHOW_CATEGORY,
  payload: show,
});

export const createCategoryList = (data) => ({
  type: CREATE_CATEGORY_LIST,
  payload: data,
});

export const filterCategory = (filter) => ({
  type: FILTER_CATEGORY,
  payload: filter,
});

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
        filter: action.payload,
      };
    }
  }
  return state;
}

export default category;
