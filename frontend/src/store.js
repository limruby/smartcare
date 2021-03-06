import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { bookingCreateReducer, bookingDetailsReducer, bookingMineListReducer, bookingPayReducer } from './reducers/bookingReducers';
import { cartReducer } from './reducers/cartReducers';
import { serviceDetailsReducer } from './reducers/serviceDetailsReducer';
import { serviceListReducer } from './reducers/serviceReducers';
import { userDetailsReducer, userRegisterReducer, userSigninReducer } from './reducers/userReducers';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        customerAddress: localStorage.getItem('customerAddress')
            ? JSON.parse(localStorage.getItem('customerAddress'))
            : {},
        paymentMethod: 'PayPal'
    },
};
const reducer = combineReducers({
    serviceList: serviceListReducer,
    serviceDetails: serviceDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    bookingCreate: bookingCreateReducer,
    bookingDetails: bookingDetailsReducer,
    bookingPay: bookingPayReducer,
    bookingMineList : bookingMineListReducer,
    userDetails: userDetailsReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;