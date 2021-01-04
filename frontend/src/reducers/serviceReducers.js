import { SERVICE_CREATE_FAILURE, SERVICE_CREATE_REQUEST, SERVICE_CREATE_RESET, SERVICE_CREATE_SUCCESS, SERVICE_DETAILS_FAIL, SERVICE_DETAILS_REQUEST, SERVICE_DETAILS_SUCCESS, SERVICE_LIST_FAIL, SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS } from "../constants/serviceConstants";

export const serviceListReducer = (state ={ loading: true, services: []}, action) => {
    switch(action.type){
        case SERVICE_LIST_REQUEST:
            return {loading: true};
        case SERVICE_LIST_SUCCESS:
            return {loading: false, services: action.payload };
        case SERVICE_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const serviceDetailsReducer = ( state = { loading: true }, action) => {
    switch (action.type) {
      case SERVICE_DETAILS_REQUEST:
        return { loading: true };
      case SERVICE_DETAILS_SUCCESS:
        return { loading: false, service: action.payload };
      case SERVICE_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const serviceCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case SERVICE_CREATE_REQUEST:
        return { loading: true };
      case SERVICE_CREATE_SUCCESS:
        return { loading: false, success: true, service: action.payload };
      case SERVICE_CREATE_FAILURE:
        return { loading: false, error: action.payload };
      case SERVICE_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };