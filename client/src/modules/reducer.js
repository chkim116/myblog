import { createAction, handleActions } from "redux-actions";

export const increase = createAction("increase");
export const decrease = createAction("decrease");

const counter = { number: 0 };
const reducer = handleActions(
  {
    [increase]: (state, action) => ({ number: state.number + 1 }),
    [decrease]: (state, action) => ({ number: state.number - 1 }),
  },
  counter
);

export default reducer;
