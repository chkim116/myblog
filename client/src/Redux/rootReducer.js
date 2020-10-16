import { combineReducers } from "redux";
import search from "./search";
import auth from "./auth";

const rootReducer = combineReducers({
  search,
  auth,
});

export default rootReducer;
