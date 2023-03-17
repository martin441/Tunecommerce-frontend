import { createAction, createReducer } from "@reduxjs/toolkit";

export const setCartItems = createAction("SET_CART_ITEMS");
export const deleteCartItems = createAction("DELETE_CART_ITEMS");
export const deleteCartId = createAction("DELETE_CART_ID");


// cartItems.filter((e) => e.id === id)
const initialState = [];

export default createReducer(initialState, {
  [setCartItems]: (state, action) => [...state, action.payload],
  [deleteCartItems]: (state, action) => action.payload,
  [deleteCartId]: (state, action) => state.filter((e) => e.id !== action.payload)
});
