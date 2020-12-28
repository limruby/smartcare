import { CART_ADD_ITEM } from "../constants/cartConstants";

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

        default:
            return state;

    }
}