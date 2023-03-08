import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

const initialState = {
  id: null,
  userName: null,
  name: null,
  lastName: null,
  email: null,
  adress: null,
  celNumber: null,
  isAdmin: false,
};

export default createReducer(initialState, {
  [setUser]: (state, action) => action.payload,
});
