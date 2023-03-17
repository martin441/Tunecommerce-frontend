
import axios  from 'axios';
import { setCart } from '../reducers/CartReducers';

export const clearCart = (userId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3001/api/cart/${userId}`);
    dispatch(setCart([]));
  } catch (error) {
    console.log(error);
  }
};
