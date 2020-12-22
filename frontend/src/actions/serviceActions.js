import Axios from 'axios';
import {SERVICE_LIST_FAIL, SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS} from '../constants/serviceConstants'

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
}