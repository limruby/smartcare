import {compose, applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { serviceListReducer } from './reducers/serviceReducers';

const initialState = {};
const reducer = combineReducers({
    serviceList: serviceListReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;