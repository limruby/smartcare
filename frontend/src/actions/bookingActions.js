import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {
  BOOKING_CREATE_FAILURE,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_DETAILS_FAILURE,
  BOOKING_PAY_REQUEST,
  BOOKING_PAY_SUCCESS,
  BOOKING_PAY_FAILURE,
  BOOKING_MINE_LIST_REQUEST,
  BOOKING_MINE_LIST_SUCCESS,
  BOOKING_MINE_LIST_FAILURE,
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

export const payBooking = (booking, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: BOOKING_PAY_REQUEST, payload: { booking, paymentResult } });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(`/api/bookings/${booking._id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: BOOKING_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BOOKING_PAY_FAILURE, payload: message });
  }
};

export const listBookingMine = () => async (dispatch, getState) => {
  dispatch({ type: BOOKING_MINE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/bookings/mine', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: BOOKING_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BOOKING_MINE_LIST_FAILURE, payload: message });
  }
};