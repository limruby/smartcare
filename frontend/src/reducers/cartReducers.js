import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_CUSTOMER_ADDRESS } from "../constants/cartConstants";

export const cartReducer = (state = {cartItems: []}, action) =>{
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            console.log(action.payload)
            const existItem = state.cartItems.find(x => x.service === item.service);
            console.log(item.service)
            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map( x => 
                        x.service === existItem.service? item: x
                        ),
                };
            } else {
                return {...state, cartItems: [...state.cartItems, item]};
            }
        case CART_REMOVE_ITEM:
            return{
                ...state, 
                cartItems: state.cartItems.filter( x=> x.service !== action.payload),
            };
        case CART_SAVE_CUSTOMER_ADDRESS:
            return{
                ...state,
                customerAddress:action.payload
            }
        default:
            return state;

    }
}