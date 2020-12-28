import Axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstants";

export const addToCart = (serviceID, scheduleSlot) => async(dispatch, getState) =>{
    const {data} = await Axios.get(`api/services/${serviceID}`);
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
  };