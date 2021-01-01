
import {
    BOOKING_CREATE_FAILURE,
    BOOKING_CREATE_REQUEST,
    BOOKING_CREATE_RESET,
    BOOKING_CREATE_SUCCESS,
    BOOKING_DETAILS_FAILURE,
    BOOKING_DETAILS_REQUEST,
    BOOKING_DETAILS_SUCCESS,
  } from '../constants/bookingConstants';
  
  export const bookingCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case BOOKING_CREATE_REQUEST:
        return { loading: true };
      case BOOKING_CREATE_SUCCESS:
        return { loading: false, success: true, booking: action.payload };
      case BOOKING_CREATE_FAILURE:
        return { loading: false, error: action.payload };
      case BOOKING_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const bookingDetailsReducer = (state = {loading: true, order:{}}, action) => {
    switch (action.type) {
      case BOOKING_DETAILS_REQUEST:
        return { loading: true };
      case BOOKING_DETAILS_SUCCESS:
        return { loading: false, booking: action.payload };
      case BOOKING_DETAILS_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };