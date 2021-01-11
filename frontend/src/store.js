import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { bookingCreateReducer, bookingDeleteReducer, bookingDeliverReducer, bookingDetailsReducer, bookingListReducer, bookingMineListReducer, bookingPayReducer } from './reducers/bookingReducers';
import { cartReducer } from './reducers/cartReducers';
import { serviceListReducer, serviceDetailsReducer, serviceCreateReducer, serviceUpdateReducer, serviceDeleteReducer } from './reducers/serviceReducers';
import { userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducers';

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
    userUpdateProfile: userUpdateProfileReducer,
    serviceCreate: serviceCreateReducer,
    serviceUpdate: serviceUpdateReducer,
    serviceDelete: serviceDeleteReducer,
    bookingList : bookingListReducer,
    bookingDelete: bookingDeleteReducer,
    bookingDeliver: bookingDeliverReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;