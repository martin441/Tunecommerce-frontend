import { createAction, createReducer } from "@reduxjs/toolkit";

export const setCartItems = createAction("SET_CART_ITEMS");
export const deleteCartItems = createAction("DELETE_CART_ITEMS");

const initialState = [];

export default createReducer(initialState, {
  [setCartItems]: (state, action) => [...state, action.payload],
  [deleteCartItems]: (state, action) => action.payload
});
