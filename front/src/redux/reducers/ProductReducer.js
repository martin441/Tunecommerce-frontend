import { createAction, createReducer } from "@reduxjs/toolkit";

export const setProducts = createAction("SET_PRODUCTS");

const initialState = [];

export default createReducer(initialState, {
    [setProducts]: (state, action) => {
        const category = action.payload;
        if (category === "All") return initialState;
        return initialState.filter((opt) => opt.category === category);
      },
});