import { createAction, handleActions } from "redux-actions";

const ACTION = "auth/ACTION";

export const action = createAction(ACTION);

const initialState = {};

const auth = handleActions(
  {
    [ACTION]: (state, action) => state,
  },
  initialState
);

export default auth;
