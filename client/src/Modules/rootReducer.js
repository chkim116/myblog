import { combineReducers } from "redux";
import search from "./search";
import auth from "./auth";
import post from "./post";

const rootReducer = combineReducers({
    search,
    auth,
    post,
});

export default rootReducer;
