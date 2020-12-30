import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_CUSTOMER_ADDRESS } from "../constants/cartConstants";

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
            scheduleSlot,
        },
    });
  // after adding service in cart, it will store in local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    console.log(data.schedule)
  };

  export const removeFromCart= (serviceId) => (dispatch, getState)=>{
    dispatch({type:CART_REMOVE_ITEM, payload:serviceId});
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };

  export const saveCustomerAddress = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_CUSTOMER_ADDRESS, payload:data});
    localStorage.setItem('customerAddress', JSON.stringify(data));
  }