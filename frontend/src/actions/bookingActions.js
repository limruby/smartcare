import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {
  BOOKING_CREATE_FAILURE,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
} from '../constants/bookingConstants';

export const createBooking = (booking) => async (dispatch, getState) => {
  dispatch({ type: BOOKING_CREATE_REQUEST, payload: booking });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post('/api/bookings', booking, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: BOOKING_CREATE_SUCCESS, payload: data.booking });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: BOOKING_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};