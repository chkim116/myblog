import { createAction, handleActions } from "redux-actions";

export const green = createAction("green");
export const red = createAction("red");
export const blue = createAction("blue");

const initialState = { backgroundColor: "" };

const reducer = handleActions(
  {
    [green]: (state, action) => ({
      ...state,
      backgroundColor: "#00b894",
    }),
    [red]: (state, action) => ({
      ...state,
      backgroundColor: "#d63031",
    }),
    [blue]: (state, action) => ({
      ...state,
      backgroundColor: "#0984e3",
    }),
  },
  initialState
);

export default reducer;
