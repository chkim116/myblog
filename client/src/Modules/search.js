const SEARCH_INPUT = "search/SEARCH_INPUT";
const SEARCH_RESULTS = "search/SEARCH_RESULTS";
const HASHTAG_SEARCH = "search/HASHTAG_SEARCH";
const SHOW_SEARCHBAR = "search/SHOW_SEARCHBAR";

export const searchingPost = (select, text) => ({
  type: SEARCH_INPUT,
  payload: {
    select,
    text,
  },
});

export const searchResults = (post) => ({
  type: SEARCH_RESULTS,
  payload: {
    post,
  },
});

export const hashTagSearch = (tags) => ({
  type: HASHTAG_SEARCH,
  payload: {
    tags,
  },
});

export const showSearchBar = (show) => ({
  type: SHOW_SEARCHBAR,
  payload: {
    show: show ? show : false,
  },
});

// 리듀서

function search(state = {}, action) {
  switch (action.type) {
    case SEARCH_INPUT:
      return {
        ...state,
        select: action.payload.select,
        text: action.payload.text,
      };
    case HASHTAG_SEARCH:
      return {
        ...state,
        tags: action.payload.tags,
      };
    case SEARCH_RESULTS:
      return {
        ...state,
        post: action.payload.post,
      };
    case SHOW_SEARCHBAR:
      return {
        ...state,
        show: action.payload.show,
      };

    default:
      return state;
  }
}

export default search;
