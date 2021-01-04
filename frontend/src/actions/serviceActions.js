import Axios from 'axios';
import {
    SERVICE_CREATE_FAILURE,
    SERVICE_CREATE_REQUEST,
    SERVICE_CREATE_SUCCESS,
    SERVICE_DETAILS_FAIL,
    SERVICE_DETAILS_REQUEST,
    SERVICE_DETAILS_SUCCESS, 
    SERVICE_LIST_FAIL,
    SERVICE_LIST_REQUEST, 
    SERVICE_LIST_SUCCESS,
    SERVICE_UPDATE_FAILURE,
    SERVICE_UPDATE_REQUEST,
    SERVICE_UPDATE_SUCCESS
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

export const createService = () => async (dispatch, getState) => {
    dispatch({ type: SERVICE_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        '/api/services',
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: SERVICE_CREATE_SUCCESS,
        payload: data.service,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SERVICE_CREATE_FAILURE, payload: message });
    }
  };

  export const updateService = (service) => async (dispatch, getState) => {
    dispatch({ type: SERVICE_UPDATE_REQUEST, payload: service });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(`/api/services/${service._id}`, service, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: SERVICE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SERVICE_UPDATE_FAILURE, error: message });
    }
  };