import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer.js";
import cartReducer from "./reducers/CartReducers.js";
import cartItemsReducer from "./reducers/CartItemsReducer.js";
import logger from "redux-logger";
import OrderReducer from "./reducers/OrderReducer.js";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    cart: cartReducer,
    cartItems: cartItemsReducer,
    orders: OrderReducer,
  },
});

export default store;
