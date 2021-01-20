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
    SERVICE_UPDATE_SUCCESS,
    SERVICE_DELETE_REQUEST,
    SERVICE_DELETE_SUCCESS,
    SERVICE_DELETE_FAIL,
    SERVICE_CATEGORY_LIST_REQUEST,
    SERVICE_CATEGORY_LIST_SUCCESS,
    SERVICE_CATEGORY_LIST_FAILURE,
    SERVICE_REVIEW_CREATE_REQUEST,
    SERVICE_REVIEW_CREATE_SUCCESS,
    SERVICE_REVIEW_CREATE_FAILURE,
} from '../constants/serviceConstants';

export const listServices = ({
  seller='', 
  name='', 
  category='', 
  location='',
  order='',
  min=0, 
  max=0,
  rating =0,
}) => async (dispatch) =>{
    dispatch({
        type: SERVICE_LIST_REQUEST
    });
    try {
        const { data } = await Axios.get(
          `/api/services?seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}&location=${location}`
          );
        dispatch({type: SERVICE_LIST_SUCCESS, payload: data});

    }catch(error){
        dispatch({type: SERVICE_LIST_FAIL, payload: error.message });
    }
};

export const listServiceCategories = () => async (dispatch) => {
  dispatch({
    type: SERVICE_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/services/categories`);
    dispatch({ type: SERVICE_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SERVICE_CATEGORY_LIST_FAILURE, payload: error.message });
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

  export const deleteService = (serviceId) => async (dispatch, getState) => {
    dispatch({ type: SERVICE_DELETE_REQUEST, payload: serviceId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = Axios.delete(`/api/services/${serviceId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: SERVICE_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SERVICE_DELETE_FAIL, payload: message });
    }
  };

  export const createReview = (serviceId, review) => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: SERVICE_REVIEW_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `/api/services/${serviceId}/reviews`,
        review,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: SERVICE_REVIEW_CREATE_SUCCESS,
        payload: data.review,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SERVICE_REVIEW_CREATE_FAILURE, payload: message });
    }
  };