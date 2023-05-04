import { createAction, createReducer } from "@reduxjs/toolkit";

export const setOrders = createAction("SET_ORDERS");

const initialState = [];

export default createReducer(initialState, {
  [setOrders]: (state, action) => action.payload,
});
