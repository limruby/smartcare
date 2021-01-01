import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {
  BOOKING_CREATE_FAILURE,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_DETAILS_FAILURE,
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

export const detailsBooking = (bookingId) => async (dispatch, getState) => {
  dispatch({ type: BOOKING_DETAILS_REQUEST, payload: bookingId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/bookings/${bookingId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: BOOKING_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BOOKING_DETAILS_FAILURE, payload: message });
  }
};