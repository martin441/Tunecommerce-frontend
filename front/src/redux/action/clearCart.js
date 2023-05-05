import axios from "axios";
import { setCart } from "../reducers/CartReducers";
import env from "../../../config/env";

export const clearCart = (userId) => async (dispatch) => {
  try {
    await axios.delete(`${env.API_BASE_URL}/api/cart/${userId}`);
    dispatch(setCart([]));
  } catch (error) {
    console.log(error);
  }
};
