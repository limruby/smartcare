import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_CUSTOMER_ADDRESS, CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstants";

export const addToCart = (serviceID, scheduleSlot) => async(
  dispatch, 
  getState
  ) =>{

    const {data} = await Axios.get(`/api/services/${serviceID}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            name: data.name,
            image: data.image,
            price: data.price,
            schedule: data.schedule,
            service: data._id,
            // make sure user can only book service from one seller
            seller: data.seller,
            scheduleSlot,
        },
    });
  // after adding service in cart, it will store in local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };

  export const removeFromCart= (serviceId) => (dispatch, getState)=>{
    dispatch({type:CART_REMOVE_ITEM, payload:serviceId});
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };

  export const saveCustomerAddress = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_CUSTOMER_ADDRESS, payload:data});
    localStorage.setItem('customerAddress', JSON.stringify(data));
  }

  export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT_METHOD, payload:data});
    localStorage.setItem('paymentMethod', JSON.stringify(data));
  }