import Axios from 'axios';
import {
    SERVICE_DETAILS_FAIL,
    SERVICE_DETAILS_REQUEST,
    SERVICE_DETAILS_SUCCESS, 
    SERVICE_LIST_FAIL,
    SERVICE_LIST_REQUEST, 
    SERVICE_LIST_SUCCESS
} from '../constants/serviceConstants';

export const listServices = () => async (dispatch) =>{
    dispatch({
        type: SERVICE_LIST_REQUEST
    });
    try {
        const { data } = await Axios.get('/api/services');
        dispatch({type: SERVICE_LIST_SUCCESS, payload: data});

    }catch(error){
        dispatch({type: SERVICE_LIST_FAIL, payload: error.message });
    }
};

export const detailsServices = (serviceID) => async (dispatch) =>{
    dispatch({type: SERVICE_DETAILS_REQUEST, payload: serviceID,});
    try {
        const { data } = await Axios.get(`/api/services/${serviceID}`);
    dispatch({ type: SERVICE_DETAILS_SUCCESS, payload: data });
    
    }catch(error){
        dispatch({
            type: SERVICE_DETAILS_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

