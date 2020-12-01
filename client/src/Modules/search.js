const HASHTAG_SEARCH = "search/HASHTAG_SEARCH";
const SHOW_SEARCHBAR = "search/SHOW_SEARCHBAR";

export const hashTagSearch = (tags) => ({
    type: HASHTAG_SEARCH,
    payload: tags,
});

export const showSearchBar = (show) => ({
    type: SHOW_SEARCHBAR,
    payload: show ? show : false,
});

// 리듀서

function search(state = {}, action) {
    switch (action.type) {
        case HASHTAG_SEARCH:
            return {
                ...state,
                tags: action.payload,
            };

        case SHOW_SEARCHBAR:
            return {
                ...state,
                show: action.payload,
            };

        default:
            return state;
    }
}

export default search;
