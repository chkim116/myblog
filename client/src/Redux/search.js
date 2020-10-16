const SEARCH_INPUT = "search/SEARCH_INPUT";
const SUBMIT_INPUT = "search/SUBMIT_INPUT";

export const searchingPost = (select, text) => ({
  type: SEARCH_INPUT,
  payload: {
    select,
    text,
  },
});

export const submitInput = {
  type: SUBMIT_INPUT,
};

function search(state = {}, action) {
  switch (action.type) {
    case SEARCH_INPUT:
      return {
        ...state,
        select: action.payload.select,
        text: action.payload.text,
      };
    case SUBMIT_INPUT:
      return {
        ...state,
        select: "",
        text: "",
      };
    default:
      return state;
  }
}

export default search;
