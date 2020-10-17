import { combineReducers } from "redux";
import search from "./search";
import auth from "./auth";
import category from "./category";

const rootReducer = combineReducers({
  search,
  auth,
  category,
});

export default rootReducer;
